import {ICompany, ITimeslot} from "../api/types";
import {groupTimeslotsByDay} from "./groupTimeslotsByDay";

export interface ICompanyWithGroupedTimeslots extends Omit<ICompany, 'time_slots'>{
    "time_slots": { [key: string]: Array<ITimeslot> };
}

export function getCompanyWithGroupedDates(company: ICompany): ICompanyWithGroupedTimeslots {
    let groupedTimeslots = groupTimeslotsByDay(company.time_slots);
    return {...company, time_slots: groupedTimeslots};
}
