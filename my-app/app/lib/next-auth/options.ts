import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";

import { NextAuthOptions } from "next-auth";
import prisma from "@prisma/client";

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "Ov23li5fbCEmeGLV1UWZ",
      clientSecret: process.env.GITHUB_SECRET ?? "3a8b919cb30e31ed1238529f5d22df58a7d45734",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};

