import {ReactElement} from "react";
import './styles.scss';
import {ICompanyWithGroupedTimeslots} from "../../util/getCompanyWithGroupedDates";
import {IGroupedTimeslots, IParsedTimeslot} from "../../util/groupTimeslotsByDay";
import {Timeslot} from "../Timeslot";
import {locale} from "../../util/constants";
import {ICompanyTimeslot, useTimeslotsStore} from "../../stores/timeslotsStore";

const getToggleTimeslots = (state:any) => state.toggleTimeslots;
const getTimeslots = (state:any) => state.timeslots;
export function Company (props: { company: ICompanyWithGroupedTimeslots }): ReactElement {
    const {name, availableTimeslots} = props.company;
    const toggleTimeslots = useTimeslotsStore(getToggleTimeslots);
    const selectedTimeslots = useTimeslotsStore(getTimeslots);

    const handleTimeslotClick = (timeslot?: IParsedTimeslot) => {
        toggleTimeslots({company: name, selectedTimeslot: timeslot})
    }

    let selectedTimeslot = getSelectedTimeslot(name, selectedTimeslots);
    console.log(selectedTimeslot);
    return (
        <div className="flex-[1_0] flex-col p-3 m-5 max-h-screen overflow-auto" key={name}>
            <span className="text-xl">{name}</span>
            <br/>
            <span>Selected Timeslot :</span>
            <Timeslot isReserved={true} timeslot={selectedTimeslot} handleClick={() => handleTimeslotClick(selectedTimeslot)} />
            {availableTimeslots.map((group:IGroupedTimeslots) => {
                let dayHeader = <div>{new Date(group.date).toLocaleDateString(locale, { weekday: 'long' })}</div>;

                let timeslots = group.timeSlots.map((timeslot) => {
                    return <Timeslot isBlocked={false} isReserved={false} timeslot={timeslot} handleClick={handleTimeslotClick}/>
                })
                return (
                    <div key={group.date}>
                        {dayHeader}
                        {timeslots}
                    </div>
                )
            })}
        </div>);
}


function getSelectedTimeslot(companyName: string, timeslots: Array<ICompanyTimeslot>): IParsedTimeslot | undefined {
    return timeslots.find(t => t.company === companyName)?.selectedTimeslot;
}
