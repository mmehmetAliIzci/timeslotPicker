import { locale } from './constants';

// Converts "10/02/2022, 08:10" to 08:10
export function getHoursMinutesFromDateTime(date: Date | undefined) {
    try {
        if (date) {
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h24',
            };
            const s = date.toLocaleDateString(locale, options);
            return s.slice(s.indexOf(',') + 1, s.length);
        }
        return '--:--';
    } catch (e) {
        console.error('Something went wrong while getting hours and minutes from DateTime');
        return '--:--';
    }
}
