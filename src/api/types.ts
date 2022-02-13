export interface ITimeslot {
    "start_time": string;
    "end_time": string;
}

export interface ICompany {
    "id": number;
    "name": string;
    "type": string;
    "time_slots": Array<ITimeslot>;
}

