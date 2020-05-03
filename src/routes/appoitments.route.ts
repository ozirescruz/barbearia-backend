import { Router } from "express";
import { uuid } from "uuidv4";
import { startOfHour, parseISO, isEqual } from "date-fns";

const appoitmentsRouter = Router();

interface Appoitment {
  id: string;
  provider: string;
  date: Date;
}

const appoitments: Appoitment[] = [];

appoitmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppoitmentInSameDate = appoitments.find((appoitment) =>
    isEqual(parsedDate, appoitment.date)
  );

  if (findAppoitmentInSameDate) {
    return response.status(400).json({ error: "Day/Hour already booked!" });
  }

  const appoitment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appoitments.push(appoitment);

  return response.json({ appoitments });
});

appoitmentsRouter.get("/", (request, response) => {
  return response.json({ message: "GET..." });
});

export default appoitmentsRouter;
