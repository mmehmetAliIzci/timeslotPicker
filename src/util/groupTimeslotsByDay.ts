import {ITimeslot} from "../api/types";
import {locale} from "./constants";

export interface IParsedTimeslot {
    start_time: Date;
    end_time: Date;
}

export interface IGroupedTimeslots {
    date: string;
    timeSlots: Array<IParsedTimeslot>
}

/* Will return
[
    {
        date: "13/07/2018";
        timeSlots: [
            {
                "start_time": Date,
                "end_time": Date
            },
        ],
    },
    {
        date: "13/07/2018";
        timeSlots: [
            {
                "start_time": Date,
                "end_time": Date
            },
        ],
    }
]
*/
export function groupTimeslotsByDay(timeslots: Array<ITimeslot>): Array<IGroupedTimeslots> {
    // sort the date ascending
    let sortedTimeslots = timeslots.sort((a, b) =>
        new Date(a.start_time).getTime() < new Date(b.start_time).getTime() ? -1 : 1);

    let groupedTimeslots: Array<{date: string, timeSlots: Array<IParsedTimeslot>}> = [];

    sortedTimeslots.forEach((timeslot: ITimeslot) => {
        let parsedTimeslot: IParsedTimeslot = {
            start_time: new Date(timeslot.start_time),
            end_time: new Date(timeslot.end_time)
        }

        let dateKey = parsedTimeslot.start_time.toLocaleDateString(locale,
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            });

        let datePosition = groupedTimeslots.findIndex(date => date.date === dateKey);
        if (datePosition > -1){
            groupedTimeslots[datePosition].timeSlots.push(parsedTimeslot)
        } else {
            groupedTimeslots.push({date: dateKey, timeSlots: [parsedTimeslot]})
        }
    })
    return groupedTimeslots;
}


