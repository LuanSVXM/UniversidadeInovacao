import { CPFValidation } from '@/helpers/validations.helper'
import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string('Formato inválido')
    .min(2, 'Minimo 2 digitos')
    .max(250, 'Máximo 250 caracteres')
    .required('Nome é necessário'),
  email: Yup.string('Formato inválido').email('Email não valido').required('Email é necessário'),
  cpf: Yup.string('Formato inválido')
    .test('cpf_valid', 'CPF inválido', (value) => CPFValidation(value))
    .required('CPF é necessário'),
  registration_number: Yup.number('Registro academico deve ser um numero')
    .typeError('Registro deve ser apenas numero.')
    .min(1)
    .required('Numero de registro é necessário')
})
