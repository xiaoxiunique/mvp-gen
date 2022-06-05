import {Parse} from './parse';
import {Config, Model} from '../config';
import {Pool} from 'pg';
import {camelCase, lowerFirst, upperFirst} from 'lodash'
import S from 'string';

export class Postgres extends Parse {
  public readonly name = 'POSTGRES';
  public config: Config | undefined;

  public async generate(config: Config): Promise<Model[]> {
    this.config = config;
    return this.getModelConfig(config.tables);
  }

  public async getModelConfig(tables = ['']): Promise<Model[]> {
    if (tables.length === 0) {
      console.error('table is empty');
      return [];
    }

    const pool = new Pool({
      ...this.config?.db.config,
    });
    await pool.connect();

    const r = await pool.query(this.tables())
    if (this.config?.onlineTable) {
      tables = r.rows.map(e => e.table_name);
    }

    const config: Model[] = [] as Model[];
    for (const table of tables) {
      const cct = camelCase(table);
      const res = await pool.query(this.getTableFieldSQL(table));
      const fields = res.rows;
      const fieldsStr = res.rows.map((f) => `"${f.field}"`);
      const model = fields.reduce(
          (acc, field) => {
            // insert fields
            if (!['id', 'deleted_at'].some(f => f === field.field)) {
              acc.fields.push({
                fieldName: camelCase(field.field),
                originName: field.field,
                type: field.type,
                jsType: this.getJsType(field.type),
                length: field.length,
                notnull: field.notnull,
                comment: field.comment,
              });
            }

            if (!['id', 'created_at', 'updated_at', 'deleted_at'].some(f => f === field.field)) {
              acc.insertFields.push({
                fieldName: camelCase(field.field),
                originName: field.field,
                type: field.type,
                jsType: this.getJsType(field.type),
                length: field.length,
                notnull: field.notnull,
                comment: field.comment,
              });
            }

            // update fields
            if (!['created_at', 'updated_at', 'deleted_at'].some(f => f === field.field)) {
              acc.updateFields.push({
                fieldName: camelCase(field.field),
                originName: field.field,
                type: field.type,
                jsType: this.getJsType(field.type),
                length: field.length,
                notnull: field.notnull,
                comment: field.comment,
              });
            }

            return acc;
          },
          {
            name: lowerFirst(cct),
            Name: upperFirst(cct),
            controllerName: S(lowerFirst(cct)).dasherize().s ,
            tableName: table,
            columns: fieldsStr.join(','),
            fields: [],
            insertFields: [],
            updateFields: [],
          }
      );
      config.push(model);
    }

    let types: string[] = [];
    for (const conf of config) {
      let type = [];
      for (const field of conf.fields) {
        // @ts-ignore
        type.push(field.type);
      }
      types = [...types, ...type];
    }
    return config;
  }

  public getTableFieldSQL(fieldName = 'member') {
    return `SELECT 
                a.attnum, 
                a.attname AS field, 
                t.typname AS type, 
                a.attlen AS length, 
                a.atttypmod AS lengthvar, 
                a.attnotnull AS notnull, 
                b.description AS comment
            FROM pg_class c, pg_attribute a
                LEFT JOIN pg_description b ON a.attrelid = b.objoid
                AND a.attnum = b.objsubid, pg_type t
            WHERE c.relname = '${fieldName}'
                AND a.attnum > 0
                AND a.attrelid = c.oid
                AND a.atttypid = t.oid
                ORDER BY a.attnum;`;
  }

  private tables(tableSchema = 'public') {
    return `SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;`;
  }

  private getJsType(sqlType: string): string {
    const r = {
      "varchar": "string",
      "text": "string",
      "uuid": "string",
      "timestamptz": "Date",
      "timestamp": "Date",
      "date": "Date",
      "bool": "boolean",
      "int2": "number",
      "int4": "number",
      "int8": "number",
      "float2": "number",
      "float4": "number",
      "float8": "number",
      "bit": "number",
      "bigint": "number",
      "smallint": "number",
      "smallserial": "number",
      "numeric": "number",
      "jsonb": "any",
      "json": "any"
    }

    // @ts-ignore
    return r[sqlType] || 'default';
  }
}