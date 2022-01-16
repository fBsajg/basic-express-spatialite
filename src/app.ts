import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  getTables,
  getPoints,
  getLines,
  getPolys
} from './queries';

dotenv.config();

const app: Application = express();

const port: number | string | undefined = process.env.PORT || 9003;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '20mb'
}));
app.use(cors());

app.use(function (request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
  response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
  next();
});

app.get('/', (request: Request, response: Response) => {
  response.send(`Server running.`)
})

app.listen(port, () => console.log(`Server running on port ${port}.`))


app.get('/api/tables', getTables)
app.get('/api/points', getPoints)
app.get('/api/lines', getLines)
app.get('/api/polys', getPolys)


