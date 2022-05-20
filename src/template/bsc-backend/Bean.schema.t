import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type <$ model.Name $>Document = <$ model.Name $> & Document;

@Schema({ toObject: { getters: true }, timestamps: true })
export class <$ model.Name $> {

  createdAt: Date;

  updatedAt: Date;
}

export const <$ model.Name $>Schema = SchemaFactory.createForClass(<$ model.Name $>);