This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

This repository has a comprehensive test suite covering:

- **Unit and integration tests** with Vitest combined with React Testing Library for components, hooks, and context providers.
- **End-to-end tests** with Playwright, exercising the full UI and mocking network calls via MSW.

The data layer (services) is intentionally *not* tested in isolation. All requests made by `phoneService` are intercepted by the MSW handlers defined under `tests/fixtures`, and every component and hook that uses the service is covered by either unit, integration or E2E tests. This approach keeps the test maintenance burden low and ensures the service logic is exercised in realistic usage scenarios. Should the service grow more complex (caching, error handling, etc.) it would be trivial to add a small set of dedicated unit tests at that time.

Story files (`*.stories.tsx`) are excluded from coverage to keep the report focused on executable application code.
