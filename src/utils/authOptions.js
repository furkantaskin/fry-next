import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await axios.post(
          "https://firiyaapi-1-d9568468.deta.app/sign-in",
          {
            email: payload.email,
            password: payload.password,
          }
        );
        const user = res.data;
        console.log(user);
        return user || null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.auth_level = user.auth_level;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.auth_level = token.auth_level;
      }
      return session;
    },
  },
};
