import { cities, isValidAddress } from '../server/mock-data';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/cities' && request.method === 'GET') {
      return Response.json(cities);
    }

    if (url.pathname === '/api/submit' && request.method === 'POST') {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return Response.json({ message: 'Invalid JSON.' }, { status: 400 });
      }

      if (!isValidAddress(body)) {
        return Response.json({ message: 'A name and a valid city are required.' }, { status: 400 });
      }
      return Response.json({ success: true }, { status: 201 });
    }

    return Response.json({ message: 'Not found.' }, { status: 404 });
  },
};
