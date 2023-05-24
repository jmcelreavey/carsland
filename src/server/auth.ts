import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type UserRole } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    // ...other properties
    userRoleId: string;
  }
}

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userRoleId = user.userRoleId;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      const details = user ?? token;
      const role = await prisma.userRole.findUnique({
        where: {
          id: details.userRoleId,
        },
      });

      if (!role) {
        throw new Error("User role not found");
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: details.id,
          name: details.name,
          email: details.email,
          role,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      // @ts-expect-error - weird issue around awaitable promise expected
      authorize: async (credentials) => {
        if (!credentials?.email) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Although we return the user here, it doesn't actually get exposed to the frontend. We
        // use the jwt and session callback above to expose only relative non-sensitive data.
        return user;
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],
  debug: isDevelopment,
  session: {
    // Set to jwt in order to CredentialsProvider works properly.
    strategy: "jwt",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
