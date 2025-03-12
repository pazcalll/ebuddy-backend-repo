import { z } from "zod";

const TokenManagerSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expirationTime: z.number(),
});

const ProviderDataSchema = z.object({
  displayName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  photoURL: z.string(),
  providerId: z.string(),
  uid: z.string(),
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
  providerData: z.array(ProviderDataSchema.nullish()).nullish(),
});

const FirebaseUserProfileSchema = z.object({
  uid: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  disabled: z.boolean(),
  metadata: z.object({
    lastSignInTime: z.string(),
    creationTime: z.string(),
    lastRefreshTime: z.string(),
  }),
  tokensValidAfterTime: z.string(),
  providerData: z
    .array(
      ProviderDataSchema.partial({
        phoneNumber: true,
        photoURL: true,
        displayName: true,
      })
    )
    .nullish(),
});

type TFirebaseUser = z.infer<typeof FirebaseUserSchema>;
type TTokenManager = z.infer<typeof TokenManagerSchema>;
type TProviderData = z.infer<typeof ProviderDataSchema>;
type TFirebaseUserProfile = z.infer<typeof FirebaseUserProfileSchema>;

export {
  FirebaseUserSchema,
  FirebaseUserProfileSchema,
  TFirebaseUser,
  TTokenManager,
  TProviderData,
  TFirebaseUserProfile,
};
