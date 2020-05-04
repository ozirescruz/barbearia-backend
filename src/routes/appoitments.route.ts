import { Router } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns";

import Appoitment from "../models/Appoitment";

const appoitmentsRouter = Router();

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

  const appoitment = new Appoitment(provider, parsedDate);

  appoitments.push(appoitment);

  return response.json({ appoitments });
});

appoitmentsRouter.get("/", (request, response) => {
  return response.json({ message: "GET..." });
});

export default appoitmentsRouter;
