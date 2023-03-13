import { Server } from "https://deno.land/std@0.178.0/http/server.ts";

const data = await Deno.readFile('./data.json');
const decoder = new TextDecoder("utf-8");

const handler = (request: Request) => {

  return new Response(decoder.decode(data), { status: 200 });
};

const server = new Server({ handler });
const listener = Deno.listen({ port: 8080 });

console.log("server listening on http://localhost:8080");

await server.serve(listener);