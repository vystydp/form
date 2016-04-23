export const PLUS_CLEANING_HOUR = 'PLUS_CLEANING_HOUR';
export const MINUS_CLEANING_HOUR = 'MINUS_CLEANING_HOUR';
export const CALENDAR_NEXT_MONTH = 'CALENDAR_NEXT_MONTH';
export const CALENDAR_PREV_MONTH = 'CALENDAR_PREV_MONTH';
export const CALENDAR_DAY_CLICKED = 'CALENDAR_DAY_CLICKED';
export const SERVICE_TERM_CHANGED = 'SERVICE_TERM_CHANGED';
export const FETCH_AVAILABLE_TIMES = 'FETCH_AVAILABLE_TIMES';
export const FETCH_AVAILABLE_TIMES_SUCCESS = 'FETCH_AVAILABLE_TIMES_SUCCESS';
export const STEP_CAHNGE = 'STEP_CAHNGE';

export function plusCleaningHour(inputType) {
    return ({getUid, now}) => ({
        type: PLUS_CLEANING_HOUR,
        payload: {
            inputType: inputType
        }
    });
}

export function minusCleaningHour(inputType) {
    return ({getUid, now}) => ({
        type: MINUS_CLEANING_HOUR,
        payload: {
            inputType: inputType
        }
    });
}

export function nextMonth(){
    return () => ({
        type: CALENDAR_NEXT_MONTH,
        payload: {}
    })
}

export function prevMonth(){
    return () => ({
        type: CALENDAR_PREV_MONTH,
        payload: {}
    })
}

export function calendarDayClicked(day){
    return () => ({
        type: CALENDAR_DAY_CLICKED,
        payload: day
    })
}

export function calendarServiceTermClicked(selectedTermId){
    return () => ({
        type: SERVICE_TERM_CHANGED,
        payload: {id: selectedTermId}
    })
}

export function onStepChange(step){
    return () => ({
        type: STEP_CAHNGE,
        payload: {step: step}
    })
}


export function onAvailableTimeItemClick(){
    console.log("q");
}

export function validateStepOne(e){
    console.log(e);
}

/**
 *
 * @param props
 * @returns {function(): {type: string, payload: {promise: *}}}
 */
export function fetchAvailableTimes(props) {
    let cal = props.order.get("calendar");
    var url = '/api/v1/products/cleaning_home/availability?city=%city&date=%date&length=4'
        .replace(/%city|%date/gi,(match) => match == '%city' ?
            'Praha' : cal.get("currentYear")+'-'+(cal.get("currentMonth") + 1)+'-'+cal.get("currentDay").date);

    return ({ fetch }) => ({
        type: 'FETCH_AVAILABLE_TIMES',
        payload: {
            promise: fetch(url)
                .then(response => response.json())
        }
    });
}
