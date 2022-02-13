import {ReactElement} from "react";
import {IParsedTimeslot} from "../../util/groupTimeslotsByDay";
import {getHoursMinutesFromDateTime} from "../../util/getHoursMinutesFromDateTime";
import cn from "classnames";
interface TimeslotParams {
    timeslot?: IParsedTimeslot;
    handleClick: (timeslot?: IParsedTimeslot) => void;
    isBlocked?: boolean;
    isReserved?: boolean;
}

export function Timeslot (props: TimeslotParams): ReactElement {
    let timeslotClass = cn("bg-cyan-500 shadow-lg p-10 my-3 rounded-2xl cursor-pointer hover:bg-sky-700 hover:bg-sky-700 hover:text-white",{
        'bg-slate-400': props.isBlocked,
        'bg-indigo-500': props.isReserved,
    })
    return (
        <div className={timeslotClass}
            onClick={() => props.handleClick(props.timeslot)}>
            {getHoursMinutesFromDateTime(props.timeslot?.start_time)}
            {` - `}
            {getHoursMinutesFromDateTime(props.timeslot?.end_time)}
        </div>);
}
