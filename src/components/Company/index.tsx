import {ReactElement} from "react";
import './styles.scss';
import {ICompanyWithGroupedTimeslots} from "../../util/getCompanyWithGroupedDates";

export function Company (props: { company: ICompanyWithGroupedTimeslots }): ReactElement {
    const {name, time_slots} = props.company;
    return (
        <div className="flex-1 flex-col p-3">
            <h3>{name}</h3>
            {time_slots}
        </div>);
}
