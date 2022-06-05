import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { <$ model.Name $>Entity } from 'src/modules/entities/<$ model.name $>.entity';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class <$ model.Name $>Service extends BaseService {
  initEntity() {
    super.entity = getRepository(<$ model.Name $>Entity);
  }
}
