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

export const clientSchema = yup
  .object()
  .shape({
    name: yup.string().required("Nome obrigatório").max(128, "Permitido no máximo 128 caracteres"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    phone: yup
      .string()
      .matches(
        /^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/,
        "Telefone inválido, use o formato (xx)xxxxx-xxxx"
      )
      .required("Telefone obrigatório"),
  })
  .noUnknown(true);

export const updateClientSchema = yup
  .object()
  .shape({
    name: yup.string().max(128, "Permitido no máximo 128 caracteres"),
    email: yup.string().email("E-mail inválido"),
    phone: yup
      .string()
      .matches(
        /^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/,
        "Telefone inválido, use o formato (xx)xxxxx-xxxx"
      ),
  })
  .noUnknown(true);
