import * as actions from './actions';
import Order from './order';
import { Map, Record } from 'immutable';
import {getDaysInMonth, reviveServerAvailableTimes} from "./helpers"


const DEFAULT_RAISE_AMOUNT = 0.5;
const DEFAULT_CLEANING_HOURS = 3.5;
const DEFAULT_IRONING_HOURS = 2;
const DEFAULT_WINDOW_WASHING_HOURS = 2;
const UP_TO_RAISE_AMOUNT = 1;
const UP_TO = 5;

const InitialState = Record({
    map: Map({
        cleaningHours: DEFAULT_CLEANING_HOURS,
        ironingHours: DEFAULT_IRONING_HOURS,
        windowWashingHours: DEFAULT_WINDOW_WASHING_HOURS,
        step: 1,
        cleaningServiceIntervals: [
            Map({id: 0, type: 'everyWeek', price: 140}),
            Map({id: 1, type: 'everyTwoWeek', price: 155}),
            Map({id: 2, type: 'once', price: 169}),
        ],
        currentServiceInterval: 1,
        calendar: Map({
            months: [
                "leden",
                "únor",
                "březen",
                "duben",
                "květen",
                "červen",
                "červenec",
                "srpen",
                "září",
                "říjen",
                "listopad",
                "prosinec",
            ],
            availableTimes:[
            ],
            currentMonth: new Date().getMonth(),
            currentDay: {date: new Date().getDate(), status: 'default'},
            currentYear: new Date().getFullYear(),
            currentMonthDays: getDaysInMonth(new Date().getMonth(), new Date().getFullYear())
        })
    })
});

const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ map }) => initialState.merge({
    map: Map(map).map(order => new Order(order))
});

export default function orderCleaningReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return revive(state);
    var key = (action.payload && action.payload.inputType == "CLEANING") ? "cleaningHours"
        : (action.payload && action.payload.inputType == "CLEANING_TYPE_WINDOW_WASHING") ? "windowWashingHours" :"ironingHours"
    var currentCleaningHours = state.map.get(key) ? state.map.get(key) : DEFAULT_CLEANING_HOURS;
    var amount = (currentCleaningHours >= UP_TO) ? UP_TO_RAISE_AMOUNT : DEFAULT_RAISE_AMOUNT;

    switch (action.type) {
        case actions.PLUS_CLEANING_HOUR:
        {
            return state
                .update('map', map => map.set(key, currentCleaningHours + amount));
        }
        case actions.MINUS_CLEANING_HOUR:
        {
            if (currentCleaningHours <= 3 && key == "cleaningHours") return state;
            if (currentCleaningHours == 0.5 && (key == "ironingHours" || key == "windowWashingHours" )){
              amount = 0;
              currentCleaningHours = 0;
            };
            return state
                .update('map', map => map.set(key, currentCleaningHours - amount));
        }
        case   actions.CALENDAR_PREV_MONTH:
        {
            return state
                .update('map', map => map.updateIn(['calendar'], function (val) {
                    let prevMonth = ((val.get('currentMonth')) < 1) ? 11 : (val.get('currentMonth') - 1);
                    val = val.set('currentMonth', prevMonth);
                    val = val.set('currentYear', (prevMonth == 11) ? (val.get('currentYear') - 1) : val.get('currentYear'));
                    val = val.set('currentMonthDays', getDaysInMonth(prevMonth, val.get('currentYear')));
                    return val;
                }));
        }
        case actions.CALENDAR_NEXT_MONTH:
        {
            return state
                .update('map', map => map.updateIn(['calendar'], function (val) {
                    let nextMonth = ((val.get('currentMonth')) >= 11) ? 0 : (val.get('currentMonth') + 1);
                    val = val.set('currentMonth', nextMonth);
                    val = val.set('currentYear', (nextMonth == 0) ? (val.get('currentYear') + 1) : val.get('currentYear'));
                    val = val.set('currentMonthDays', getDaysInMonth(nextMonth, val.get('currentYear')));
                    return val;
                }));
        }
        case actions.CALENDAR_DAY_CLICKED:
            let selectedDate = new Date(action.payload);
            return state
                .update('map', map => map.updateIn(['calendar'], function (val) {
                    val = val.set('currentMonth', selectedDate.getMonth());
                    val = val.set('currentYear', selectedDate.getFullYear());
                    val = val.set('currentDay', {date: selectedDate.getDate(), status: 'selected'});
                    val = val.set('currentMonthDays', getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear()));
                    return val;
                }));
        case actions.SERVICE_TERM_CHANGED:
            let selectedTermId = action.payload.id;
            return state
                .update('map', map => map.set('currentServiceInterval', selectedTermId));
        case actions.FETCH_AVAILABLE_TIMES_SUCCESS:
            let times = reviveServerAvailableTimes(action.payload.times);
            return state
                .update('map', map => map.updateIn(['calendar'], function (val) {
                    val = val.set('availableTimes',times);
                    return val;
                }));
        case actions.STEP_CAHNGE:
            return state
                .update('map', map => map.set('step', action.payload.step));
        default:
            return state;
    }
    return state;
}
