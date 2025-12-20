import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

const getAController = (req:Request,res:Response)=>{
  res.send("Server is Running ....")
}

app.get('/',getAController);

export default app;
