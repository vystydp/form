import { Record, Map } from 'immutable';
import {getDaysInMonth} from "./helpers"

const DEFAULT_CLEANING_HOURS = 3.5;
const DEFAULT_IRONING_HOURS = 2;
const DEFAULT_WINDOW_WASHING_HOURS = 2;

const Order = Record({
  cleaningHours: DEFAULT_CLEANING_HOURS,
  ironingHours: DEFAULT_IRONING_HOURS,
  windowWashingHours: DEFAULT_WINDOW_WASHING_HOURS,
  cleaningServiceIntervals: [
    Map({id: 0, type: 'everyWeek', price: 140}),
    Map({id: 1, type: 'everyTwoWeek', price: 155}),
    Map({id: 2, type: 'once', price: 169})
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
      "prosinec"
    ],
    availableTimes:[
    ],
    currentMonth: new Date().getMonth(),
    currentDay: new Date().getDate(),
    currentYear: new Date().getFullYear(),
    currentMonthDays: getDaysInMonth(new Date().getMonth(), new Date().getFullYear())
  })
});

export default Order;
