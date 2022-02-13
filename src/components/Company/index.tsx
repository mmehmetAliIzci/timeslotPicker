import {ReactElement} from "react";
import './styles.scss';
import {ICompanyWithGroupedTimeslots} from "../../util/getCompanyWithGroupedDates";
import {IGroupedTimeslots} from "../../util/groupTimeslotsByDay";
import {Timeslot} from "../Timeslot";
import {locale} from "../../util/constants";

export function Company (props: { company: ICompanyWithGroupedTimeslots }): ReactElement {
    const {name, time_slots} = props.company;
    return (
        <div className="flex-1 flex-col p-3">
            <h3>{name}</h3>
            {time_slots.map((val:IGroupedTimeslots) => {
                let dayHeader = <div>{new Date(val.date).toLocaleDateString(locale, { weekday: 'long' })}</div>
                let timeslots = val.timeSlots.map((timeslot) => <Timeslot timeslot={timeslot}/>)
                return (
                    <div key={val.date}>
                        {dayHeader}
                        {timeslots}
                    </div>
                )
            })}
        </div>);
}
