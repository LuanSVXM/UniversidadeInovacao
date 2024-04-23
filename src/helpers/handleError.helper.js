import * as Yup from 'yup'

const handleErrorYup = async (field, value, schema) => {
  try {
    await Yup.reach(schema, field).validate(value)
    return true
  } catch (error) {
    return error.message
  }
}

export default handleErrorYup
