import * as path from 'path'
import * as fs from 'fs'
import yaml from 'yaml'


export type kv = {[k: string]: unknown}
export type templateNames = 'bsc-backend'

export type Config = {
  db: {
    type: string
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