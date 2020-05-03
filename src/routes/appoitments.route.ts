import { Router } from "express";
import { uuid } from "uuidv4";

const appoitmentsRouter = Router();

const appoitments: { id: string; provider: any; date: any }[] = [];

appoitmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const appoitment = {
    id: uuid(),
    provider,
    date,
  };

  appoitments.push(appoitment);

  return response.json({ appoitments });
});

appoitmentsRouter.get("/", (request, response) => {
  return response.json({ message: "GET..." });
});

export default appoitmentsRouter;
