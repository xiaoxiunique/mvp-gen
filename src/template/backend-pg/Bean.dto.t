import { IsOptional, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { BasePage } from 'src/common/base.page';


export class Create<$ model.Name $>Req {<% for param in model.fields %>
  <% if param.fieldName !== "id" %>
      <% if param.fieldName !== "updated_at" %>
          <% if param.fieldName !== "created_dt" %>
              <% if param.fieldName !== "deleted_at" %>
                @IsOptional()
                <$ param.fieldName $>: <$ param.jsType $>;
              <% endif %>
          <% endif %>
      <% endif %>
  <% endif %>
<% endfor %>}

export class Update<$ model.Name $>Req extends PartialType(Create<$ model.Name $>Req) {
  @IsUUID()
  @IsOptional()
  id: string;
}

export class Query<$ model.Name $>Req extends BasePage {}