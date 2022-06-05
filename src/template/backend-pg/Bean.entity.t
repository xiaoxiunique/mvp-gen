import { Column, DeleteDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity('<$ model.tableName $>')
export class <$ model.Name $>Entity {
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id: string;
<% for param in model.fields %>
 <% if param.fieldName !== "id" %>
  @Column({ type: '<$ param.type $>', name: '<$ param.originName $>' })
  <$ param.fieldName $>: <$ param.jsType $>;
  <% endif %>
<% endfor %>
}