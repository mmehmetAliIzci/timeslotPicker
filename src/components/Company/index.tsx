import { ReactElement, useCallback } from 'react';

import { ICompanyTimeslot, TimeslotState, useTimeslotsStore } from '../../stores/timeslotsStore';
import { locale } from '../../util/constants';
import { ICompanyWithGroupedTimeslots } from '../../util/getCompanyWithGroupedDates';
import { IGroupedTimeslots, IParsedTimeslot } from '../../util/groupTimeslotsByDay';
import { isTimeslotsEqual } from '../../util/utils';
import { Timeslot } from '../Timeslot';

const getToggleTimeslots = (state: TimeslotState) => state.toggleTimeslots;
const getTimeslots = (state: TimeslotState) => state.timeslots;
export function Company(props: { company: ICompanyWithGroupedTimeslots }): ReactElement {
    const { name: companyName, availableTimeslots } = props.company;
    const toggleTimeslots = useTimeslotsStore(getToggleTimeslots);
    const selectedTimeslotsAcrossCompanies = useTimeslotsStore(getTimeslots);
    const selectedTimeslot = getSelectedTimeslot(companyName, selectedTimeslotsAcrossCompanies);

    const handleTimeslotClick = useCallback(
        (timeslot?: IParsedTimeslot) => {
            toggleTimeslots({ company: companyName, selectedTimeslot: timeslot });
        },
        [companyName, toggleTimeslots]
    );

    const renderTimeslots = useCallback(
        (group: IGroupedTimeslots) =>
            group.timeSlots.map((timeslot, index) => {
                const isSelected = isTimeslotsEqual(selectedTimeslot, timeslot);
                const isBlocked = isTimeslotSelectedAcrossCompanies(
                    timeslot,
                    companyName,
                    selectedTimeslotsAcrossCompanies
                );
                return (
                    <Timeslot
                        key={index}
                        disabled={isBlocked}
                        isSelected={isSelected}
                        timeslot={timeslot}
                        handleClick={handleTimeslotClick}
                    />
                );
            }),
        [handleTimeslotClick, selectedTimeslot, selectedTimeslotsAcrossCompanies]
    );

    const renderDays = useCallback(
        () =>
            availableTimeslots.map((group: IGroupedTimeslots) => {
                const dayHeader = (
                    <div className='text-lg my-5'>
                        {new Date(group.date).toLocaleDateString(locale, {
                            weekday: 'long',
                            month: 'short',
                            day: '2-digit',
                        })}
                    </div>
                );

                const timeslots = renderTimeslots(group);
                return (
                    <div key={group.date}>
                        {dayHeader}
                        {timeslots}
                    </div>
                );
            }),
        [availableTimeslots, renderTimeslots]
    );

    return (
        <div className='flex-[1_0] flex-col p-3 m-5 ' key={companyName}>
            <div className='text-2xl text-center'>{companyName}</div>
            <div>
                <span>Selected Timeslot :</span>
                <Timeslot
                    isHeader
                    timeslot={selectedTimeslot}
                    handleClick={() => handleTimeslotClick(selectedTimeslot)}
                />
            </div>
            <div className='overflow-auto' style={{ height: '67vh' }}>
                {renderDays()}
            </div>
        </div>
    );
}

function getSelectedTimeslot(
    companyName: string,
    selectedTimeslots: Array<ICompanyTimeslot>
): IParsedTimeslot | undefined {
    return selectedTimeslots.find((t) => t.company === companyName)?.selectedTimeslot;
}

function isTimeslotSelectedAcrossCompanies(
    timeslot: IParsedTimeslot,
    currentCompany: string,
    selectedTimeslots: Array<ICompanyTimeslot>
): boolean {
    const foundCompanyTimeslot = selectedTimeslots.find((val) => isTimeslotsEqual(val.selectedTimeslot, timeslot));
    if (foundCompanyTimeslot) {
        return foundCompanyTimeslot.company !== currentCompany;
    }
    return false;
}
