import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      usuario: string;
      nombre: string;
      apellido: string;
      email: string;
    };
  }
}
