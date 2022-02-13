import './App.scss';

import React, { useEffect, useState } from 'react';

import { getCompanies } from './api/getCompanies';
import { Company } from './components/Company';
import { TimeslotState, useTimeslotsStore } from './stores/timeslotsStore';
import { getCompanyWithGroupedDates, ICompanyWithGroupedTimeslots } from './util/getCompanyWithGroupedDates';

const getInitTimeslotsStore = (state: TimeslotState) => state.initTimeslotsStore;
function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [companies, setCompanies] = useState<Array<ICompanyWithGroupedTimeslots>>([]);

    const initTimeslotsStore = useTimeslotsStore(getInitTimeslotsStore);

    useEffect(() => {
        async function loadCompanies() {
            setLoading(true);
            const { companies, error } = await getCompanies();

            if (error) {
                setCompanies([]);
                setError(error);
            } else if (companies) {
                setCompanies(companies.map(getCompanyWithGroupedDates));
                initTimeslotsStore(companies);
                setError('');
            }
            setLoading(false);
        }

        loadCompanies();
    }, []);

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className='App font-mono'>
            <div className='w-screen text-2xl text-center bg-amber-500 p-20 shadow-md'>Timeslot Selection</div>
            <div className='content-wrapper'>
                {loading && 'Loading'}
                <div className='flex flex-row'>
                    {companies.map((company) => (
                        <Company key={company.id} company={company} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
