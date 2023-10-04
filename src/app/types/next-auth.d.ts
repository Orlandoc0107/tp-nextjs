// next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      refresh_token: string;
      iat: number;
      exp: number;
      jti: string;
      expires: string;
    };
  }
}
