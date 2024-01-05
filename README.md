# Moishi Netzer - Hotel List Web App

<!-- Flex: -->
<p float="left" style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
  <img src="public/Screenshot-hotels.png" width="40%" />
  <img src="public/Screenshot-single-hotel.png" width="40%" />
</p>

## Installation

First, install dependencies:

```sh
npm install
# I love bun in which case try:
bun install
```

Generate the Prisma client for DB access and type-safety:

```sh
npx prisma migrate dev
# bun:
bunx prisma migrate dev
```

Then, run the project:

```sh
npm run dev
# Again, I implore you to try bun:
bun run dev
```

That's it!

## Overview

The solution I have opted for is a full-stack application using the following technologies:

- [Remix](https://remix.run/docs) as the main full-stack driving framework for React
  - Remix acts as both the backend and the frontend
  - Running off of a [Vite](https://vitejs.dev/) server
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) as an ORM for both generating the DB client and accessing the DB in a type-safe fashion
- [SQLite](https://www.sqlite.org/index.html) is the database being used for this application for reasons listed below
- [Prettier](https://prettier.io/docs) for formatting
- [ESLint](https://eslint.org/) for linting with sensible defaults provided

## Backend

The backend is provided by Remix. Whilst this may seem counter-intuitive it allows strong typing between the server and client, and it balances the problem of colocating server-side with client-side but it also provides great paradigms for providing the data.

> Quick Intro

In Remix, you use loaders to define endpoints so for the following:

```tsx
// > mysite.com/hotels
export function loader() {
  return json({
    hotels: await getHotels(),
  });
}
```

This prompts Remix to create an endpoint at the `/hotels` route. exporting a `loader` creates a `GET` handler, and exporting an `action` creates a `POST` handler.

Remix uses this `loader` to fetch the data BEFORE the page loads, essentially blocking page load until the data is available for the client to use. This means no need to handle a pending state whatsoever. When you load the page it is fully hydrated with your data.

Using the data looks like this:

```tsx
export function loader() {
  // ...
}

export default function HotelsRoute() {
  // `hotels` is now fully typed and always available
  // on the page load to be used across the component
  const { hotels } = useLoaderData<typeof loader>();
}
```

Sometimes however you want the page to load first and stream the result in later, this is where Remix `defer` comes in. It's an implementation of React's `Suspense` component.

I have implemented an alternative index route which implements this behaviour in [`/app/routes/deferred.tsx`](app/routes/deferred.tsx)

The beauty of using Remix is that your routes provide the HTML but can also deliver the raw JSON to be reused in your native apps and can be a backend for any frontend you wish to hook up!

For example, whilst running this app, try a GET request with the following:

```sh
# Don't worry too much about the "?index&_data" part - that's a remix implementation that's being improved soon
# Get all hotels
curl "localhost:5173/?index&_data"

# Get a specific hotel id=3
curl "localhost:5173/3?_data"
```

Notice how all the hotels are being sent as a JSON response! This is the beauty of remix. Even using this to proxy to another API, e.g. Laravel 😉 allows you to use this as your central API hander if you want a single source of truth for all of your frontends, React, React Native - anything really.

## Frontend

As for the frontend you will notice there is no `fetch` anywhere because Remix handles all of that logic for us. (Mind you, they don't stub `fetch` either, which is a common NextJS footgun)

Notice how few `useState` and `useEffect` calls there are throughout the whole application. It is beautiful in its simplicity, UX and legibility of code.

## Database

Just a quick note about the DB and the decisions I made for this project.

I decided to go with SQLite, because not only is it lightweight and simple which is perfect for this task, but because I have it saved to a file, there is no installation step required for you to run this project locally such as hooking up a database. Prisma hooks up all the calls from the locally saved DB which I have pushed to GitLab, (Of course I would deploy a DB in a production setting and not track it in version control)

You will notice at the bottom of my `package.json` that I have the following:

```json
{
  // ...
  "prisma": {
    "seed": "npx tsx scripts/import-data.ts"
  }
}
```

When Prisma generates the initial data it seeds the database. The beauty of running a ts script is that the file can be run manually and after you look at it you will see it is implemented with flexibility in mind so that seeding new/more data is easily possible when needed.

For the future of course it would be easier to implement full CRUD into this app, however, I believe this was out of the scope of the requested task.

## Fin

Thank you very much for reviewing this, and I hope you enjoy it as much as I enjoyed creating it!

Best regards,
Moishi.
