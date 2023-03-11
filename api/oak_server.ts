import { Application, Router } from "https://deno.land/x/oak@v12.0.1/mod.ts";

type Person = {
  id: number,
  slug: string,
  name: string,
  homeWorld: string
}

const app = new Application();
const router = new Router();

const data = await Deno.readFile('./data/data.json');
const decoder = new TextDecoder('utf-8');
const people = JSON.parse(decoder.decode(data)) as Person[];

router
  .get('/', (ctx) => {
    ctx.response.body = "hello from the API";
  })
  .get('/people', (ctx) => {
    ctx.response.body = people;
  })
  .get('/people/:id', (ctx) => {
    ctx.response.body = people[Number(ctx.params.id)];
  })
  .post('/people', async (ctx) => {
    const { slug, name, homeWorld } = 
      await ctx.request.body({ type: "json" }).value;

    const newPerson = {
      id: people.length+1, slug, name, homeWorld
    } as Person;
  
    people.push(newPerson);

    const encoder = new TextEncoder();
    Deno.writeFile(
      './data/data.json', encoder.encode(JSON.stringify(people)) 
    );

    ctx.response.body = "person added ;)";
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
  'listen', () => console.log('App running on http://localhost:8000')
)

await app.listen({ port: 8000 });

