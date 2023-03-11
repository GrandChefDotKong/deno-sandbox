// @deno-types="npm:@types/express@4"
import express, 
  { NextFunction, Request, Response } from 'npm:express@4.18.2';


type Person = {
  id: number,
  slug: string,
  name: string,
  homeWorld: string
}

const app = express();
const port: number = Number(Deno.env.get("APP_PORT")) || 8080;

const data = await Deno.readFile('./data/data.json');
const decoder = new TextDecoder('utf-8');
const people = JSON.parse(decoder.decode(data)) as Person[];

const reqLogger = 
  function(req: Request, _res:Response, next: NextFunction) {
    console.info(
      `${req.method} request to "${req.url}" by ${req.hostname}`
    );
    next();
  };

app.use(reqLogger);

app.get("/", (_req: Request, res: Response): void => {
  res.send("Hello from Deno & Express");
});

app.get("/users", (_req: Request, res: Response): void => {
  res.send(people);
});

app.get("/users/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const person = people.find((person) => person.id === id);

  if(!person) {
    res.sendStatus(400);
    return;
  }

  res.status(200).send(person);
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${ port } ...`);
})



