import * as Yup from 'yup'

export const schema = Yup.object().shape({
  user: Yup.string('Formato inválido').required('Operador é necessário'),
  password: Yup.string('Formato inválido')
    .min(8, 'Precisa de no minimo 8 digitos')
    .required('Senha não encontrada!')
})
