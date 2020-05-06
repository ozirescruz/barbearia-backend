import { startOfHour } from 'date-fns';

import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import Appoitment from '../models/Appoitment';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppoitmentService {
  private appoitmentsRepository: AppoitmentsRepository;

  constructor(appoitmentsRepository: AppoitmentsRepository) {
    this.appoitmentsRepository = appoitmentsRepository;
  }

  public execute({ provider, date }: Request): Appoitment {
    const appoitmentDate = startOfHour(date);

    const findAppoitmentInSameDate = this.appoitmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppoitmentInSameDate) {
      throw Error('Day/Hour already booked!');
    }

    const appoitment = this.appoitmentsRepository.create({
      provider,
      date: appoitmentDate,
    });

    return appoitment;
  }
}

export default CreateAppoitmentService;
