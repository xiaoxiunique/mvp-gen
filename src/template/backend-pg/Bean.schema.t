
export interface <$ model.Name $>Schema {
  id: string
<% for param in model.fields %> <% if param.fieldName !== "id" %> <$ param.fieldName $>: <$ param.jsType $>
<% endif %> <% endfor %>
  [k: string]: unknown
}