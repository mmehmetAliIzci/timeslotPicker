import {IParsedTimeslot} from "./groupTimeslotsByDay";

export function isTimeslotsEqual (a: IParsedTimeslot, b: IParsedTimeslot):boolean {
    return a.start_time.getTime() === b.start_time.getTime() && a.end_time.getTime() === b.end_time.getTime()
}
