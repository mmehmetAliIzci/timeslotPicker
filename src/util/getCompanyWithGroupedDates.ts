import {ICompany} from "../api/types";
import {groupTimeslotsByDay, IGroupedTimeslots} from "./groupTimeslotsByDay";

export interface ICompanyWithGroupedTimeslots extends Omit<ICompany, 'time_slots'>{
    "time_slots": Array<IGroupedTimeslots>;
}

export function getCompanyWithGroupedDates(company: ICompany): ICompanyWithGroupedTimeslots {
    let groupedTimeslots = groupTimeslotsByDay(company.time_slots);
    return {...company, time_slots: groupedTimeslots};
}
