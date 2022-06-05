import * as path from 'path'
import * as fs from 'fs'
import yaml from 'yaml'


export type kv = {[k: string]: unknown}
export type templateNames = 'bsc-backend'

export type Config = {
  db: {
    type: string,
    config: {
      user: string
      host: string
      database: string
      password: string
      port: number
    }
  }
  debugger: boolean
  onlineTable: boolean
  tables: Array<string>
  enable: templateNames
  template: {[k in templateNames]: {
    out: string
    ext: string
    path: kv
  }}
  output: any
}

export interface Model {
  name: string
  Name: string
  fieldName?: string
  tableName?: string
  fields: unknown[]
}

/**
 * load yml config
 */
export function load(): Config {
  const r = fs.readFileSync(path.join(__dirname, 'dev.yml'))
  return yaml.parse(r.toString())
}

const r = load();
console.log(r)