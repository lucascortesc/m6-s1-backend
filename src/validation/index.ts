import * as yup from "yup";

export const userSchema = yup
  .object()
  .shape({
    name: yup.string().required("Nome é obrigatório").max(128, "Permitido no máximo 128 caracteres"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Sua senha deve conter pelo menos 8 caracteres")
      .max(16, "Sua senha deve conter no máximo 16 caracteres")
      .matches(/[a-z]/, "Sua senha deve conter pelo menos uma letra minúcula")
      .matches(/[A-Z]/, "Sua senha deve conter pelo menos uma letra maiúscula")
      .matches(/[0-9]/, "Sua senha deve conter pelo menos um número")
      .matches(/\W/, "Sua senha deve conter pelo menos um caractere especial")
      .matches(/^(?!.*\s).{0,}$/, "Sua senha não pode conter espaços"),
  })
  .noUnknown(true);

export const loginSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});
