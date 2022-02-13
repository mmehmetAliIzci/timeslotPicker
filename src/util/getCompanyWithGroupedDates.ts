import { ICompany } from '../api/types';
import { groupTimeslotsByDay, IGroupedTimeslots } from './groupTimeslotsByDay';

export interface ICompanyWithGroupedTimeslots extends Omit<ICompany, 'time_slots'> {
    availableTimeslots: Array<IGroupedTimeslots>;
}

export function getCompanyWithGroupedDates(company: ICompany): ICompanyWithGroupedTimeslots {
    const groupedTimeslots = groupTimeslotsByDay(company.time_slots);
    return { ...company, availableTimeslots: groupedTimeslots };
}
