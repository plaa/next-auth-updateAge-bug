import NextAuth from "next-auth";
import "next-auth/jwt";

import Apple from "next-auth/providers/apple";
// import Atlassian from "next-auth/providers/atlassian"
import Auth0 from "next-auth/providers/auth0";
import AzureB2C from "next-auth/providers/azure-ad-b2c";
import BankIDNorway from "next-auth/providers/bankid-no";
import BoxyHQSAML from "next-auth/providers/boxyhq-saml";
import Cognito from "next-auth/providers/cognito";
import Coinbase from "next-auth/providers/coinbase";
import Discord from "next-auth/providers/discord";
import Dropbox from "next-auth/providers/dropbox";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";
import Google from "next-auth/providers/google";
import Hubspot from "next-auth/providers/hubspot";
import Keycloak from "next-auth/providers/keycloak";
import LinkedIn from "next-auth/providers/linkedin";
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id";
import Netlify from "next-auth/providers/netlify";
import Okta from "next-auth/providers/okta";
import Passage from "next-auth/providers/passage";
import Passkey from "next-auth/providers/passkey";
import Pinterest from "next-auth/providers/pinterest";
import Reddit from "next-auth/providers/reddit";
import Slack from "next-auth/providers/slack";
import Salesforce from "next-auth/providers/salesforce";
import Spotify from "next-auth/providers/spotify";
import Twitch from "next-auth/providers/twitch";
import Twitter from "next-auth/providers/twitter";
import Vipps from "next-auth/providers/vipps";
import WorkOS from "next-auth/providers/workos";
import Zoom from "next-auth/providers/zoom";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import vercelKVDriver from "unstorage/drivers/vercel-kv";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
        url: process.env.AUTH_KV_REST_API_URL,
        token: process.env.AUTH_KV_REST_API_TOKEN,
        env: false,
      })
    : memoryDriver(),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: "foobar",
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    {
      id: "mock",
      name: "MockProvider",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
      },
      async authorize(credentials) {
        // Instantly sign in any user with a username
        if (credentials?.username && typeof credentials.username === "string") {
          return {
            id: credentials.username,
            name: credentials.username,
            email: credentials.username + "@mock.dev",
            data: "A".repeat(1000),
          };
        }
        return null;
      },
    },
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account, user }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      // Add the large data string to the JWT token when user first signs in
      if (user?.data) {
        token.data = user.data;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;
      if (token?.data) session.data = token.data;

      return session;
    },
  },
  experimental: { enableWebAuthn: true },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    data?: string;
  }

  interface User {
    data?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    data?: string;
  }
}
