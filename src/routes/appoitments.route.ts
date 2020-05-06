import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppoitmentService from '../services/CreateAppoitmentService';

const appoitmentsRouter = Router();
const appoitmentsRepository = new AppoitmentsRepository();

appoitmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppoitmentService = new CreateAppoitmentService(
    appoitmentsRepository,
  );

  let appoitment = null;

  try {
    appoitment = createAppoitmentService.execute({
      provider,
      date: parsedDate,
    });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  return response.json({ appoitment });
});

appoitmentsRouter.get('/', (request, response) => {
  const appoitments = appoitmentsRepository.all();

  return response.json(appoitments);
});

export default appoitmentsRouter;
