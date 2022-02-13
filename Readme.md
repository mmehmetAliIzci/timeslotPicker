# How to run

First Install dependencies
`npm install`

## Run
### API
As suggested in challenge JSON server will be running in port 3001 by default. If you wish to change it, Provide `API_BASE_URL` to give different port.

`npx json-server --watch data.json --port portnumber`

### React

Run `npm start`



## What is important for this challange ?

-   How you would structure your code,
-   Clean code and best practices (like reusable components and separation of concerns)
-   Possibly tests
-   Create a good user experience,

It is safe to assume that code quality and problem-solving are 70% and ui / ux is 30% weighted.

## Thought process

### How is the data structure

First i would like to know what kind of data we are getting from the JSON. Key points to think about:

-   Does all timeslots has same time frame ?
-   Does all companies has the same time slots ?
-   Does every day has the same time slots ?
-   Does BE provides timeslots that are already picked ?

After investigating these questions we can safely say that:

-   Every timeslot has 1,5 time frame
-   No it differs from company to company
-   No it differs from day by day
-   No but I guess we can alter that somehow

### How do we want to present the layout and what should be the components

Looking at design and some drawings I made, it is clear to me that following is necessary to create clean code:

-   CompanyComponent
-   TimeslotComponent 

**Bussiness logic says:** Every company will have only one selected timeslot. That selected timeslot should block same timeslots in other companies. This means one TimeslotComponent should be able to change the selectability of other TimeslotComponents. This can be solved more practically via global store. 

### Structuring date data

We want to re-structure given date data to make it more meaningful.

_First approach:_

```js
    {
      Monday: [Ascending{start_time: xx, end_time}, {start_time: xx, end_time}],
      Wednesday: [Ascending{start_time: xx, end_time}, {start_time: xx, end_time}]
    }
```

-   What if there is two months in the response ?
-   What if there is two years in the response ?
-   What if start time is in 2022 but end time is in 2023 ?

_Second approach:_

```js
    {
      "20-01-2022": [Ascending{start_time: xx, end_time}, {start_time: xx, end_time}],
      "21-01-2022": [Ascending{start_time: xx, end_time}, {start_time: xx, end_time}]
    }
```

Getting which day is 20-01-2022 is eas

### Folder structure

It is a good convention to do the following in my experience

```
Components
----ComponentA
--------__tests__
------------componentA.spec.ts
--------index.tsx
--------styles.scss
----ComponentB
--------index.tsx
--------styles.scss
Api
----getStuff.ts
----getStuff.spec.ts
Hooks
----useTimeSlot.ts
Pages
----Page.ts
index.tsx
```

### Libraries that has been used
- `tailwind` for design
- `classnames` for easy conditional class names
- `zustand` for global store
- `jest` `prettier` `eslint` for easy development and linting

