import {ReactElement} from "react";
import {IParsedTimeslot} from "../../util/groupTimeslotsByDay";
import {getHoursMinutesFromDateTime} from "../../util/getHoursMinutesFromDateTime";

export function Timeslot (props: { timeslot: IParsedTimeslot }): ReactElement {
    const {start_time, end_time} = props.timeslot;
    return (
        <div>
            {getHoursMinutesFromDateTime(start_time)}
            {` - `}
            {getHoursMinutesFromDateTime(end_time)}
        </div>);
}
