import create, {SetState} from 'zustand'
import {IParsedTimeslot} from "../util/groupTimeslotsByDay";
import {isTimeslotsEqual} from "../util/utils";


export interface ICompanyTimeslot {
    company: string;
    selectedTimeslot: IParsedTimeslot;
}

export interface TimeslotState {
    timeslots: Array<ICompanyTimeslot>
    toggleTimeslots: (timeslot:ICompanyTimeslot, company: string, get: any, set: any) => void
}

function handleToggleTimeslot(timeslotWithCompany: ICompanyTimeslot, get: any, set: any) {
    let currentTimeslots: Array<ICompanyTimeslot> = [...get().timeslots];
    let foundTimeslotIndex = currentTimeslots.findIndex((t) => isTimeslotsEqual(t.selectedTimeslot, timeslotWithCompany.selectedTimeslot) && t.company === timeslotWithCompany.company );
    if (foundTimeslotIndex > -1) {
        currentTimeslots.splice(foundTimeslotIndex,1);
    } else {
        currentTimeslots.push(timeslotWithCompany);
    }
    set({timeslots: currentTimeslots});
}

export const useTimeslotsStore = create<TimeslotState>((set:SetState<any>,get) => ({
    timeslots: [],
    toggleTimeslots: ((timeslot) => {handleToggleTimeslot(timeslot, get, set)}),
}))
