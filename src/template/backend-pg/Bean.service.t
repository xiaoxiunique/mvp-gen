import { Injectable } from '@nestjs/common';
import { BaseService } from '@shared/utils/base.service';
import { getRepository } from 'typeorm';
import { <$ model.Name $>Entity } from '@shared/entities';

@Injectable()
export class <$ model.Name $>Service extends BaseService {
  initEntity() {
    super.entity = getRepository(<$ model.Name $>Entity);
  }
}