import {ReactElement} from "react";
import {IParsedTimeslot} from "../../util/groupTimeslotsByDay";
import {getHoursMinutesFromDateTime} from "../../util/getHoursMinutesFromDateTime";
import cn from "classnames";
interface TimeslotParams {
    timeslot?: IParsedTimeslot;
    handleClick: (timeslot?: IParsedTimeslot) => void;
    disabled?: boolean;
    isSelected?: boolean;
}

export function Timeslot (props: TimeslotParams): ReactElement {
    let timeslotClass = cn("bg-cyan-500 shadow-lg p-10 my-3 rounded-2xl w-full",{
        'bg-slate-400': props.disabled,
        'bg-indigo-500': props.isSelected,
        'cursor-pointer hover:bg-sky-700 hover:text-white': !props.disabled
    })
    return (
        <button className={timeslotClass} disabled={props.disabled}
            onClick={() => props.handleClick(props.timeslot)}>
            {getHoursMinutesFromDateTime(props.timeslot?.start_time)}
            {` - `}
            {getHoursMinutesFromDateTime(props.timeslot?.end_time)}
        </button>);
}
