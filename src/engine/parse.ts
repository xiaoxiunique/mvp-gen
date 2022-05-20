import {Config, Model} from "../config";

export abstract class Parse {
  public abstract name: string;

  public abstract generate(config: Config): Model[];
}