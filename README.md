# Verbose meme

Real-time webchat application. The following technologies are used in the development process:

- [Next.js](https://nextjs.org/) for frontend and server-side rendering
- tRPC for efficient, strongly typed API calls
- MongoDB as a NoSQL database for storing chat logs

## Getting Started

#### Prerequisites

- free MongoDB Atlas account
- [Google OAuth 2.0 Client ID](https://console.cloud.google.com/apis/credentials)
- `.env.local` file with following contents:
```bash
MONGODB_URI=mongodb-connection-string
MONGODB_DB=database-name

GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=something-secret-here-used-to-sign-session-tokens
```

#### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

#### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
