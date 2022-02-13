import {ITimeslot} from "../../api/types";
import {ReactElement} from "react";

export function Timeslot (props: { timeslot: ITimeslot }): ReactElement {
    const {start_time, end_time} = props.timeslot;
    return (<div>{start_time} {end_time}</div>);
}
