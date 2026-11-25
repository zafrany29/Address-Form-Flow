# Address form flow

A small Angular application with a NestJS mock API. Enter a name and city, review the values, and send them.

## Run locally

Requires Node.js 22.22.3 or newer (or a version supported by Angular 22) and npm. From the project directory:

```sh
npm install
npm run start:api
```

In a second terminal:

```sh
npm start
```

Open http://localhost:4200. The API listens at http://localhost:3000. Port 3000 is used because browsers block port 123 as unsafe. Run `npm run build` for a production build and `npm test -- --watch=false` for the unit test.


## Mock data and API

The API uses 20 fixed city objects. Local development runs NestJS on port 3000.
The hosted build uses a Cloudflare Worker at the same site's `/api` path.
Both implementations share the city list and validation in `server/mock-data.ts`.


- `GET /cities` returns the fixed array as JSON. The Angular page fetches it asynchronously and offers a retry if it fails.
- `POST /submit` accepts `{ "username": "John", "city": "Jerusalem" }`. It rejects a missing or whitespace-only username and a city outside the mock list with HTTP 400. On success it returns `{ "success": true }` (HTTP 201). It does not save or log the submitted personal data.

## Cloudflare deployment

The Cloudflare Worker serves the production Angular build and handles `/api/cities`
and `/api/submit`. It simulates the API; it does not run NestJS in the Worker or
persist submissions. The deployed address is
https://address-form-flow.city-displayer.workers.dev. Cloudflare may need time
to provision HTTPS for a newly registered workers.dev subdomain.

To preview the hosted version locally, run `npm run preview:cloudflare` and open
the URL printed by Wrangler. To deploy, sign in with `npx wrangler login`, then
run `npm run deploy:cloudflare`. A Cloudflare account and an enabled Workers
subdomain are required. Cloudflare's free plan has usage limits.
