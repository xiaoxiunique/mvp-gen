import { Request } from 'src/api/request';
import { <$ model.Name $>Schema } from '@/schemas';

export class <$ model.Name $> extends Request<<$ model.Name $>Schema>{
  constructor() {
    super('<$ model.controllerName $>');
  }
}