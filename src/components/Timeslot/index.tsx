import {ReactElement} from "react";
import {IParsedTimeslot} from "../../util/groupTimeslotsByDay";
import {getHoursMinutesFromDateTime} from "../../util/getHoursMinutesFromDateTime";

export function Timeslot (props: { timeslot: IParsedTimeslot }): ReactElement {
    const {start_time, end_time} = props.timeslot;
    return (
        <div className="bg-cyan-500 shadow-lg p-10 my-3 rounded-2xl cursor-pointer hover:bg-sky-700 hover:bg-sky-700 hover:text-white">
            {getHoursMinutesFromDateTime(start_time)}
            {` - `}
            {getHoursMinutesFromDateTime(end_time)}
        </div>);
}
