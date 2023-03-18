import { Application, Router } from "https://deno.land/x/oak@v12.0.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Dinosaur } from "../types/Dinosaur.ts"


const app = new Application();
const router = new Router();

const data = await Deno.readFile('./data/data.json');
const decoder = new TextDecoder('utf-8');
const dinosaurs = JSON.parse(decoder.decode(data)) as Dinosaur[];

router
  .get('/', (ctx) => {
    ctx.response.body = "Welcome to Jurassic API 🦖";
  })
  .get('/dinosaur', (ctx) => {
    ctx.response.body = dinosaurs;
  })
  .get('/dinosaur/:name', (ctx) => {
    if(!ctx.params.name) {
      ctx.response.body = "No ID provided";
      return;
    }

    const dinosaur = dinosaurs.find((dino) => 
      dino.name.toLowerCase() 
        === String(ctx.params.name).toLowerCase());

    if(!dinosaur) {
      ctx.response.body = "No dinosaur with that name :(";
      return;
    }

    ctx.response.body = dinosaur;
  })
  .post('/dinosaur', async (ctx) => {
    const { name, diet, lenght, period, mya, info } = 
      await ctx.request.body({ type: "json" }).value;

    const newDino = {
      id: dinosaurs.length+1, name, diet, lenght, period, mya, info
    } as Dinosaur;
  
    dinosaurs.push(newDino);

    const encoder = new TextEncoder();
    Deno.writeFile(
      './data/data.json', encoder.encode(JSON.stringify(dinosaurs)) 
    );

    ctx.response.body = "person added ;)";
  });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
  'listen', () => console.log('App running on http://localhost:8000')
)

await app.listen({ port: 8000 });

