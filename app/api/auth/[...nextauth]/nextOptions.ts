import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        if (!username || !password) return null;

        if (username === "ammar" && password === "password")
          return {
            email: "ammar.web.mobile@gmail.com",
            name: "ammar",
            id: "raya",
          };
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};
