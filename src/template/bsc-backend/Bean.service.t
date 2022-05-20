import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { <$ model.Name $>, <$ model.Name $>Document } from '@monitor/shared/schemas/<$ model.name $>.schema';
import { BaseService } from './base.service';

@Injectable()
export class <$ model.Name $>Service extends BaseService<<$ model.Name $>Document, <$ model.Name $>> {
  @InjectModel(<$ model.Name $>.name)
  private readonly <$ model.name $>Model: Model<<$ model.Name $>Document>;

  public init() {
    super.model = this.<$ model.name $>Model;
  }
}