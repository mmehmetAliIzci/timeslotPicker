import cn from 'classnames';
import { ReactElement } from 'react';

import { getHoursMinutesFromDateTime } from '../../util/getHoursMinutesFromDateTime';
import { IParsedTimeslot } from '../../util/groupTimeslotsByDay';
interface TimeslotParams {
    timeslot?: IParsedTimeslot;
    handleClick: (timeslot?: IParsedTimeslot) => void;
    disabled?: boolean;
    isSelected?: boolean;
    isHeader?: boolean;
}

export function Timeslot(props: TimeslotParams): ReactElement {
    const timeslotClass = cn('bg-cyan-500 shadow-lg p-10 my-3 rounded-2xl w-full', {
        'bg-slate-400': props.disabled,
        'bg-blue-500': props.isSelected,
        'bg-red-400': props.isHeader,
        'cursor-pointer hover:bg-blue-500 hover:text-white': !props.disabled,
    });
    return (
        <button className={timeslotClass} disabled={props.disabled} onClick={() => props.handleClick(props.timeslot)}>
            {getHoursMinutesFromDateTime(props.timeslot?.start_time)}
            {` - `}
            {getHoursMinutesFromDateTime(props.timeslot?.end_time)}
        </button>
    );
}
