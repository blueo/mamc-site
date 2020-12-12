import { keyBy, partial, isEmpty } from "lodash";

export function getPropOrDefault(template, field) {
  const value = this[field];
  if (typeof value === 'boolean' || !isEmpty(value)) {
    return value;
  }
  const templates = this.$themeConfig.contentTemplates;
  // get defaults from config
  const {
    data: { fields },
  } = templates[template];
  const fieldObject = keyBy(fields, "name");
  const selectField = fieldObject[field];
  return selectField.default;
}

export function getFrontMatterField(template) {
    return partial(getPropOrDefault, template);
}