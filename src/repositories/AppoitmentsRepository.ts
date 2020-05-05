import { isEqual } from 'date-fns';
import Appoitment from '../models/Appoitment';

class AppoitmentsRepository {
  private appoitments: Appoitment[];

  constructor() {
    this.appoitments = [];
  }

  public findByDate(date: Date): Appoitment | null {
    const findAppoitment = this.appoitments.find(appoitment =>
      isEqual(date, appoitment.date),
    );

    return findAppoitment || null;
  }

  public create(provider: string, date: Date): Appoitment {
    const appoitment = new Appoitment(provider, date);

    this.appoitments.push(appoitment);

    return appoitment;
  }
}

export default AppoitmentsRepository;
