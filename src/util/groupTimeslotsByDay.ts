import {ITimeslot} from "../api/types";
import groupBy from "lodash.groupby";

/* Will return
{
    "13/07/2018": [
        {
            "start_time": "2018-07-13T08:00:00.000+02:00",
            "end_time": "2018-07-13T09:30:00.000+02:00"
        },
    ],
    "14/07/2018": [
        {
            "start_time": "2018-07-13T08:00:00.000+02:00",
            "end_time": "2018-07-13T09:30:00.000+02:00"
        },
    ],
}
*/
export function groupTimeslotsByDay(timeslots: Array<ITimeslot>): { [key: string]: Array<ITimeslot> } {
    // sort the date ascending
    let sortedTimeslots = timeslots.sort((a, b) =>
        new Date(a.start_time).getTime() < new Date(b.start_time).getTime() ? -1 : 1);

    // group the timeslots by date
    return groupBy(sortedTimeslots, (timeslot: ITimeslot) =>
        new Date(timeslot.start_time).toLocaleDateString('en-gb',
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })
    );
}


