import { Controller, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@monitor/shared/guards/jwt-auth.guard';
import { BaseController } from '@monitor/shared/common/base.controller';
import { <$ model.Name $>Service } from '@/services/<$ model.name $>.service';

@UseGuards(JwtAuthGuard)
@Controller('<$ model.name $>s')
export class <$ model.Name $>Controller extends BaseController {
  @Inject()
  private readonly <$ model.name $>Service: <$ model.Name $>Service;

  init() {
    super.service = this.<$ model.name $>Service;
  }
}