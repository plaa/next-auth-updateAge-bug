# Example repo to demonstrate the need for JWT to honor updateAge parameter

Steps to reproduce:

1. Start the app according to instructions below
2. Open the page and sign in with any username
3. View network panel while reloading the page

--> On every page load a ~2kB `Set-Cookie` header is present, even though token is nowhere near expiry.

## Overview

NextAuth.js is a complete open source authentication solution.

This is an example application that shows how `next-auth` is applied to a basic Next.js app.

The deployed version can be found at [`next-auth-example.vercel.app`](https://next-auth-example.vercel.app)

### About NextAuth.js

NextAuth.js is an easy to implement, full-stack (client/server) open source authentication library originally designed for [Next.js](https://nextjs.org) and [Serverless](https://vercel.com). Our goal is to [support even more frameworks](https://github.com/nextauthjs/next-auth/issues/2294) in the future.

Go to [next-auth.js.org](https://authjs.dev) for more information and documentation.

> _NextAuth.js is not officially associated with Vercel or Next.js._

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/nextauthjs/next-auth-example.git
cd next-auth-example
pnpm install
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Add details for one or more providers (e.g. Google, Twitter, GitHub, Email, etc).

#### Database

A database is needed to persist user accounts and to support email sign in. However, you can still use NextAuth.js for authentication without a database by using OAuth for authentication. If you do not specify a database, [JSON Web Tokens](https://jwt.io/introduction) will be enabled by default.

You **can** skip configuring a database and come back to it later if you want.

For more information about setting up a database, please check out the following links:

- Docs: [authjs.dev/reference/core/adapters](https://authjs.dev/reference/core/adapters)

### 3. Configure Authentication Providers

1. Review and update options in `auth.ts` as needed.

2. When setting up OAuth, in the developer admin page for each of your OAuth services, you should configure the callback URL to use a callback path of `{server}/api/auth/callback/{provider}`.

e.g. For Google OAuth you would use: `http://localhost:3000/api/auth/callback/google`

A list of configured providers and their callback URLs is available from the endpoint `api/auth/providers`. You can find more information at https://authjs.dev/getting-started/providers/oauth-tutorial

1. You can also choose to specify an SMTP server for passwordless sign in via email.

### 4. Start the application

To run your site locally, use:

```
pnpm run dev
```

To run it in production mode, use:

```
pnpm run build
pnpm run start
```

### 5. Preparing for Production

Follow the [Deployment documentation](https://authjs.dev/getting-started/deployment)

## Acknowledgements

<a href="https://vercel.com?utm_source=nextauthjs&utm_campaign=oss">
<img width="170px" src="https://raw.githubusercontent.com/nextauthjs/next-auth/main/docs/public/img/etc/powered-by-vercel.svg" alt="Powered By Vercel" />
</a>
<p align="left">Thanks to Vercel sponsoring this project by allowing it to be deployed for free for the entire NextAuth.js Team</p>

## License

ISC
