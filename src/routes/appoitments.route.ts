import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppoitmentsRepository from '../repositories/AppoitmentsRepository';

const appoitmentsRouter = Router();
const appoitmentsRepository = new AppoitmentsRepository();

appoitmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppoitmentInSameDate = appoitmentsRepository.findByDate(parsedDate);

  if (findAppoitmentInSameDate) {
    return response.status(400).json({ error: 'Day/Hour already booked!' });
  }

  const appoitment = appoitmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json({ appoitment });
});

appoitmentsRouter.get('/', (request, response) => {
  const appoitments = appoitmentsRepository.all();

  return response.json(appoitments);
});

export default appoitmentsRouter;
