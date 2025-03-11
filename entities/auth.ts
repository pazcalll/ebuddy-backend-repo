import { z } from "zod";

const validationOptions = {
  required_error: "This field is required",
};

const BaseAuthSchema = z.object({
  email: z.string(validationOptions).email().min(6).max(64),
  password: z.string(validationOptions).min(6).max(64),
  confirmPassword: z.string(validationOptions).min(6).max(64),
});

const RegisterSchema = BaseAuthSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
  }
);

const AuthenticatedUserSchema = z.object({
  uid: z.string(),
  email: z.string(),
  refreshToken: z.string(),
  token: z.string(),
});

const LoginSchema = BaseAuthSchema.omit({ confirmPassword: true });

type TAuth = z.infer<typeof RegisterSchema>;
type TAuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;
type TLogin = z.infer<typeof LoginSchema>;

export {
  RegisterSchema,
  TAuth,
  AuthenticatedUserSchema,
  TAuthenticatedUser,
  LoginSchema,
  TLogin,
};
