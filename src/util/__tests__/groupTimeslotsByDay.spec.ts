import { groupTimeslotsByDay } from '../groupTimeslotsByDay';

const timeslots = [
    {
        start_time: '2018-07-09T08:00:00.000+02:00',
        end_time: '2018-07-09T09:30:00.000+02:00',
    },
    {
        start_time: '2018-07-09T08:30:00.000+02:00',
        end_time: '2018-07-09T10:00:00.000+02:00',
    },
    {
        start_time: '2018-07-10T13:00:00.000+02:00',
        end_time: '2018-07-10T14:30:00.000+02:00',
    },
    {
        start_time: '2018-07-12T10:30:00.000+02:00',
        end_time: '2018-07-12T12:00:00.000+02:00',
    },
    {
        start_time: '2018-07-12T17:00:00.000+02:00',
        end_time: '2018-07-12T18:30:00.000+02:00',
    },
    {
        start_time: '2018-07-12T17:30:00.000+02:00',
        end_time: '2018-07-12T19:00:00.000+02:00',
    },
    {
        start_time: '2018-07-13T08:00:00.000+02:00',
        end_time: '2018-07-13T09:30:00.000+02:00',
    },
];

const expectedTimeslots = [
    {
        date: '7/9/2018',
        timeSlots: [
            {
                start_time: '2018-07-09T06:00:00.000Z',
                end_time: '2018-07-09T07:30:00.000Z',
            },
            {
                start_time: '2018-07-09T06:30:00.000Z',
                end_time: '2018-07-09T08:00:00.000Z',
            },
        ],
    },
    {
        date: '7/10/2018',
        timeSlots: [
            {
                start_time: '2018-07-10T11:00:00.000Z',
                end_time: '2018-07-10T12:30:00.000Z',
            },
        ],
    },
    {
        date: '7/12/2018',
        timeSlots: [
            {
                start_time: '2018-07-12T08:30:00.000Z',
                end_time: '2018-07-12T10:00:00.000Z',
            },
            {
                start_time: '2018-07-12T15:00:00.000Z',
                end_time: '2018-07-12T16:30:00.000Z',
            },
            {
                start_time: '2018-07-12T15:30:00.000Z',
                end_time: '2018-07-12T17:00:00.000Z',
            },
        ],
    },
    {
        date: '7/13/2018',
        timeSlots: [
            {
                start_time: '2018-07-13T06:00:00.000Z',
                end_time: '2018-07-13T07:30:00.000Z',
            },
        ],
    },
];

describe('grouping', () => {
    it('should return sorted timeslots', () => {
        const groupedTimeslots = groupTimeslotsByDay(timeslots);
        expect(new Date(groupedTimeslots[0].date).getTime()).toBeLessThan(new Date(groupedTimeslots[1].date).getTime());
    });
    it('should group timeslots by date', () => {
        const groupedTimeslots = groupTimeslotsByDay(timeslots);
        expect(JSON.stringify(groupedTimeslots)).toBe(JSON.stringify(expectedTimeslots));
    });
});
