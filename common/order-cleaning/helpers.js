/**
 * Created by vystydp on 2/29/16.
 */

"use strict";


const TOTAL_CALENDAR_DAYS = 35;
const BEFORE = "BEFORE";
const AFTER = "AFTER";

/**
 * @param {int} month number, 0 based
 * @param {int} year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
export function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    var totalMonthDays = days.length;
    var itemsToAdd = TOTAL_CALENDAR_DAYS - totalMonthDays;
    days = getAdditionalDays(itemsToAdd, totalMonthDays, month, year, BEFORE).concat(days);
    var additionalAfterDays = getAdditionalDays(itemsToAdd, totalMonthDays, month, year, AFTER).reverse();
    days = days.concat(additionalAfterDays);
    return days;
}

/**
 *
 * @param itemsToAdd
 * @param total
 * @param month
 * @param year
 * @param beforeAfter
 * @returns {Array}
 */
export function getAdditionalDays(itemsToAdd, total, month, year, beforeAfter) {
    var beforeDays = [];
    if ( itemsToAdd == 6) {
        var time = 1000 * 60 * 60 * 24 * 3;
    } else if(itemsToAdd == 5) {
        if(beforeAfter == BEFORE)
            var time = 1000 * 60 * 60 * 24 * 3;
        else
            var time = 1000 * 60 * 60 * 24 * 2;
    }else{
        var time = 1000 * 60 * 60 * 24 * 2;
    }
    beforeAfter = (beforeAfter == BEFORE) ? 1 : total;
    var date = new Date(year, month, beforeAfter);
    if(beforeAfter > 1)
        var start = new Date(date.getTime() + time);
    else
        var start = new Date(date.getTime() - time);
    while (start.getMonth() != month) {
        beforeDays.push(new Date(start));
        if(beforeAfter > 1)
            start.setDate(start.getDate() - 1);
        else
            start.setDate(start.getDate() + 1);
    }
    //console.log(beforeDays);
    return beforeDays;
}

/**
 *
 * @param availableTimes
 * @returns {Array}
 */
export function reviveServerAvailableTimes(availableTimes){
    return availableTimes.map((item) => {
        return {'time': item,disabled: false}
        }
    );
}
