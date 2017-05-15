export default {
  makeFieldsRequired: (schema) => {
    Object.keys(schema.paths).forEach((field) => {
      if (schema.paths[field].isRequired == undefined) {
        schema.paths[field].required(true)
      }
    })
  }
}
