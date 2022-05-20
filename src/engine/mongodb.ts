import {Config, Model} from "../config";
import {Parse} from "./parse";
import * as lodash from 'lodash';

export class MongoDB extends Parse {
  public readonly name = 'MONGODB';

  public generate(config: Config): Model[] {
    return config.tables.map((table) => ({name: lodash.lowerFirst(table), Name: lodash.upperFirst(table)}))
  }

}