import { API_BASE_URL } from '../util/constants';
import { ICompany } from './types';

const TIMESLOT_URL = `${API_BASE_URL}/data`;

interface IGetCompanies {
    companies: Array<ICompany> | null;
    error?: string;
}

export async function getCompanies(): Promise<IGetCompanies> {
    try {
        const res = await fetch(TIMESLOT_URL);
        if (res.ok) {
            return { companies: await res.json() };
        } else {
            return {
                companies: null,
                error: 'Something went wrong while parsing results',
            };
        }
    } catch (e) {
        return {
            companies: null,
            error: 'Something went wrong while fetching companies',
        };
    }
}
