import { z } from "zod";

const TokenManagerSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expirationTime: z.number(),
});

const ProviderData = z.object({
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  providerId: z.string().nullable(),
  uid: z.string().nullable(),
});

const FirebaseUserSchema = z.object({
  uid: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  displayName: z.string().optional(),
  isAnonymous: z.boolean(),
  photoURL: z.string().optional(),
  phoneNumber: z.string().optional(),
  tenantId: z.string().optional(),
  _redirectEventId: z.string().optional(),
  createdAt: z.string(),
  lastLoginAt: z.string(),
  apiKey: z.string(),
  appName: z.string(),
  stsTokenManager: TokenManagerSchema,
  providerData: z.array(ProviderData).nullish(),
});

type TFirebaseUser = z.infer<typeof FirebaseUserSchema>;
type TTokenManager = z.infer<typeof TokenManagerSchema>;
type TProviderData = z.infer<typeof ProviderData>;

export { FirebaseUserSchema, TFirebaseUser, TTokenManager, TProviderData };
