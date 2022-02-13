import create, {SetState} from 'zustand'
import {IParsedTimeslot} from "../util/groupTimeslotsByDay";
import {isTimeslotsEqual} from "../util/utils";
import {ICompany} from "../api/types";

// One company can have one timeslot
export interface ICompanyTimeslot {
    company: string;
    selectedTimeslot: IParsedTimeslot | undefined;
}

export interface TimeslotState {
    timeslots: Array<ICompanyTimeslot>;
    initTimeslotsStore: (companies: Array<ICompany>) => void;
    toggleTimeslots: (timeslot:ICompanyTimeslot) => void;
}

function handleToggleTimeslot(desiredTimeslot: ICompanyTimeslot, get: any, set: any) {
    let currentTimeslots: Array<ICompanyTimeslot> = [...get().timeslots];

    let companyTimeslot = currentTimeslots.find((t) => t.company === desiredTimeslot.company );
    if (companyTimeslot) {
        if (companyTimeslot.selectedTimeslot && isTimeslotsEqual(companyTimeslot.selectedTimeslot, desiredTimeslot.selectedTimeslot)){
            companyTimeslot.selectedTimeslot = undefined;
        } else {
            companyTimeslot.selectedTimeslot = desiredTimeslot.selectedTimeslot;
        }
    }

    set({timeslots: currentTimeslots});
}

export const useTimeslotsStore = create<TimeslotState>((set:SetState<any>,get) => ({
    timeslots: [],
    initTimeslotsStore: ((companies) => {
        let companyTimeslot = companies.map((company) => {
            return {company: company.name, selectedTimeslot: undefined}
        });
        set({timeslots: companyTimeslot});
    }),
    toggleTimeslots: ((timeslot) => {handleToggleTimeslot(timeslot, get, set)}),
}))
