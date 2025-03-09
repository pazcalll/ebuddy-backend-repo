export type TFirebaseUser = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string | undefined;
  isAnonymous: boolean;
  photoURL: string | undefined;
  phoneNumber: string | undefined;
  tenantId: string | undefined;
  _redirectEventId: undefined | string | number;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
};

export type TTokenManager = {
  accessToken: string;
  refreshToken: string;
  expirationTime: number;
};
