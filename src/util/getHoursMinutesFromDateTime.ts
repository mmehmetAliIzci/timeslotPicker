export function getHoursMinutesFromDateTime(date: Date) {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
    let s = date.toLocaleDateString('en-GB',options);
    return s.slice(s.indexOf(',') + 1, s.length)
}
