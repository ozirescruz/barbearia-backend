import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import Appoitment from '../models/Appoitment';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppoitmentService {
  public async execute({ provider_id, date }: Request): Promise<Appoitment> {
    const appoitmentsRepository = getCustomRepository(AppoitmentsRepository);
    const appoitmentDate = startOfHour(date);

    const findAppoitmentInSameDate = await appoitmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppoitmentInSameDate) {
      throw Error('Day/Hour already booked!');
    }

    const appoitment = appoitmentsRepository.create({
      provider_id,
      date: appoitmentDate,
    });

    await appoitmentsRepository.save(appoitment);

    return appoitment;
  }
}

export default CreateAppoitmentService;
