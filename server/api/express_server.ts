// @deno-types="npm:@types/express@4"
import express, 
  { NextFunction, Request, Response } from 'npm:express@4.18.2';
import cors from 'npm:cors@2.8.5';
import { Dinosaur } from '../types/Dinosaur.ts';

const app = express();
app.use(cors());
const port: number = Number(Deno.env.get("APP_PORT")) || 8000;

const data = await Deno.readFile('./data/data.json');
const decoder = new TextDecoder('utf-8');
const dinosaurs = JSON.parse(decoder.decode(data)) as Dinosaur[];

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

app.get("/dinosaur", (_req: Request, res: Response): void => {
  res.send(dinosaurs);
});

app.get("/dinosaur/:name", (req: Request, res: Response): void => {
  const name = String(req.params.name);
  const dinosaur = dinosaurs.find(
    (dinosaur) => dinosaur.name.toLowerCase() === name.toLowerCase()
  );

  if(!dinosaur) {
    res.sendStatus(400);
    return;
  }

  res.status(200).send(dinosaur);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${ port } ...`);
})



