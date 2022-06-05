import {Parse} from "./parse";
import {MongoDB} from "./mongodb";
import {Postgres} from "./postgres";


export class Factory {
  private static readonly FACTORY: Map<string, Parse> = new Map();

  public static getHandler(type: string): Parse | undefined {
    const handler = this.FACTORY.has(type);
    if (handler) {
      return this.FACTORY.get(type)
    }
    return undefined
  }

  public static register(handler: Parse) {
    this.FACTORY.set(handler.name, handler)
  }


  public static init() {
    const mongoDB = new MongoDB();
    const postgresDB = new Postgres()
    this.FACTORY.set(mongoDB.name, mongoDB)
    this.FACTORY.set(postgresDB.name, postgresDB)
  }

}