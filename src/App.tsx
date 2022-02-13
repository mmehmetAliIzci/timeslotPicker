import React, {useEffect, useState} from 'react';
import './App.scss';
import {getCompanies} from "./api/getCompanies";
import {Company} from "./components/Company";
import {getCompanyWithGroupedDates, ICompanyWithGroupedTimeslots} from "./util/getCompanyWithGroupedDates";
import {TimeslotState, useTimeslotsStore} from "./stores/timeslotsStore";

const getInitTimeslotsStore = (state:TimeslotState) => state.initTimeslotsStore;
function App() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [companies, setCompanies] = useState<Array<ICompanyWithGroupedTimeslots>>([]);

    const initTimeslotsStore = useTimeslotsStore(getInitTimeslotsStore);

    useEffect(() => {
        async function loadCompanies (){
            setLoading(true);
            const {companies, error} = await getCompanies();

            if (error) {
                setCompanies([]);
                setError(error);
            } else if (companies){
                setCompanies(companies.map(getCompanyWithGroupedDates));
                initTimeslotsStore(companies)
                setError("");
            }
            setLoading(false);
        }

        loadCompanies();
    },[])

    if (error) {
        return <div>Error</div>
    }

    return (
        <div className="App">
            Timeslot Selection
            <div className="content-wrapper">
                {loading && "Loading"}
                <div className="flex flex-row">
                    {companies.map(company => <Company key={company.id} company={company}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
