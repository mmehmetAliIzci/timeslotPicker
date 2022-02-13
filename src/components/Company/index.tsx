import {ReactElement, useCallback} from "react";
import './styles.scss';
import {ICompanyWithGroupedTimeslots} from "../../util/getCompanyWithGroupedDates";
import {IGroupedTimeslots, IParsedTimeslot} from "../../util/groupTimeslotsByDay";
import {Timeslot} from "../Timeslot";
import {locale} from "../../util/constants";
import {ICompanyTimeslot, TimeslotState, useTimeslotsStore} from "../../stores/timeslotsStore";
import {isTimeslotsEqual} from "../../util/utils";

const getToggleTimeslots = (state:TimeslotState) => state.toggleTimeslots;
const getTimeslots = (state:TimeslotState) => state.timeslots;
export function Company (props: { company: ICompanyWithGroupedTimeslots }): ReactElement {
    const {name, availableTimeslots} = props.company;
    const toggleTimeslots = useTimeslotsStore(getToggleTimeslots);
    const selectedTimeslots = useTimeslotsStore(getTimeslots);
    const selectedTimeslot = getSelectedTimeslot(name, selectedTimeslots);

    const handleTimeslotClick = useCallback((timeslot?: IParsedTimeslot) => {
        toggleTimeslots({company: name, selectedTimeslot: timeslot})
    }, [name, toggleTimeslots])

    const renderTimeslots = useCallback((group: IGroupedTimeslots) => {
        return group.timeSlots.map((timeslot) => {
            let isSelected = isTimeslotsEqual(selectedTimeslot, timeslot);
            let isBlocked = isTimeslotSelectedAcrossCompanies(timeslot, name, selectedTimeslots)
            return <Timeslot disabled={isBlocked} isSelected={isSelected} timeslot={timeslot}
                             handleClick={handleTimeslotClick}/>
        });
    }, [handleTimeslotClick, selectedTimeslot, selectedTimeslots])

    const renderDays = useCallback(() => {
        return availableTimeslots.map((group: IGroupedTimeslots) => {
            let dayHeader = <div>{new Date(group.date).toLocaleDateString(locale, {weekday: 'long'})}</div>;

            let timeslots = renderTimeslots(group)
            return (
                <div key={group.date}>
                    {dayHeader}
                    {timeslots}
                </div>
            )
        });
    },[availableTimeslots, renderTimeslots])

    return (
        <div className="flex-[1_0] flex-col p-3 m-5 max-h-screen overflow-auto" key={name}>
            <span className="text-xl">{name}</span>
            <div>
                <span>Selected Timeslot :</span>
                <Timeslot isSelected={true} timeslot={selectedTimeslot} handleClick={() => handleTimeslotClick(selectedTimeslot)} />
            </div>
            {renderDays()}
        </div>);
}


function getSelectedTimeslot(companyName: string, selectedTimeslots: Array<ICompanyTimeslot>): IParsedTimeslot | undefined {
    return selectedTimeslots.find(t => t.company === companyName)?.selectedTimeslot;
}

function isTimeslotSelectedAcrossCompanies (timeslot: IParsedTimeslot, currentCompany: string, selectedTimeslots: Array<ICompanyTimeslot> ):boolean {
    let foundCompanyTimeslot = selectedTimeslots.find(val => isTimeslotsEqual(val.selectedTimeslot, timeslot));
    if (foundCompanyTimeslot) {
        return foundCompanyTimeslot.company !== currentCompany
    }
    return false;
}
