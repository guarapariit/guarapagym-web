import { addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { DatedTraining, Training } from '../types';

interface Props {
  studentAvailabilty: number[];
  trainings: Training[];
}

export default ({ studentAvailabilty, trainings }: Props) => {
  const datedTrainings: DatedTraining[] = [];
  const today = new Date();
  const monthLimit = today.getMonth() + (today.getDate() > 15 ? 1 : 0);
  const daysOfCurrentMonth: Date[] = [];
  let dateAux = today;

  while (dateAux.getMonth() <= monthLimit) {
    daysOfCurrentMonth.push(dateAux);
    dateAux = addDays(dateAux, 1);
  }

  let i = 0;
  daysOfCurrentMonth.forEach(day => {
    if (studentAvailabilty.includes(day.getDay())) {
      const parsedDate = format(day, "EEEEEE'.' dd MMMM", { locale: pt });
      datedTrainings.push({
        ...trainings[i],
        parsedDate,
      });
      i = trainings.length - 1 === i ? 0 : i + 1;
    }
  });

  return datedTrainings;
};
