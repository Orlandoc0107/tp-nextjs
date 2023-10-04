import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
          username: { label: "username", type: "username", placeholder: "username" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/login/`,
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();

          if (user.error) throw user
          console.log(user)
          return user;
        },
      }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Aquí puedes personalizar el token si es necesario
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Aquí puedes personalizar la sesión si es necesario
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};