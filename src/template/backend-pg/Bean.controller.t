import { Controller, Inject } from '@nestjs/common';
import { BaseController } from '@shared/utils/base.controller';
import { <$ model.Name $>Service } from '@/services';

@Controller('/<$ model.controllerName $>')
export class <$ model.Name $>Controller extends BaseController {

  @Inject()
  private readonly <$ model.name $>Service: <$ model.Name $>Service;

  init() {
    super.service = this.<$ model.name $>Service;
  }
}