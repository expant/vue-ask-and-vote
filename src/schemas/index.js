import { object, string } from 'yup'

const emailRules = string().required('Обязательное поле').email('Неверный формат email')
const passwordRules = string()
  .required('Обязательное поле')
  .min(8, 'Пароль должен быть не менее 8 символов')
  .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
  .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
  .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
  .matches(/[\W_]/, 'Пароль должен содержать хотя бы один специальный символ')
  .matches(/^\S*$/, 'Пароль не должен содержать пробелов')

const userSchema = object({
  email: emailRules,
  password: passwordRules,
})

export { userSchema, emailRules, passwordRules }
