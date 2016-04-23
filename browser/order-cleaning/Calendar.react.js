import * as orderCleaningActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ButtonNextMonth from './ButtonNextMonth.react.js';
import ButtonPrevMonth from './ButtonPrevMonth.react.js';
import CalendarDay from './CalendarDay.react.js';
import AvailableTimes from './AvailableTimes.react.js';

class Calendar extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
    };

    constructor(props) {
        console.log("Calendar component init!");
        super(props);
    }

    render() {
        console.log("Calendar component render!");
        const {minusCleaningHour , msg, order} = this.props;
        let calendar = order.get("calendar");
        let months = calendar.get("months");
        let days = calendar.get("currentMonthDays");
        let availableTimes = calendar.get("availableTimes");
        let currentDayStatus = calendar.get("currentDay").status;
        var times;
        if (!days.length) {
            return <p>Loading...</p>
        }
        if(currentDayStatus != "default"){
            times = <AvailableTimes />;
        }else{
            times = <p>{msg.selectDayNotice}</p>;
        }
        return (
            <div>
                <h2 className="orderform__content__title">{msg.calendarTitle}</h2>
                <div className="row">
                    <div className="col-xs-12 col-lg-6">
                        <div className="orderform__content__calendar orderform__content__calendar--dates">
                            <div className="orderform__content__calendar__months clearfix">
                                <ButtonPrevMonth />
                                <strong className="orderform__content__calendar__months__current">{months[calendar.get('currentMonth')]}</strong>
                                <ButtonNextMonth />
                            </div>
                            <div className="orderform__content__calendar__grid">
                                {days.map((val, index) => (
                                    <CalendarDay key={new Date(val)} day={new Date(val)}
                                                 isLast={((index+1)%7 == 0)}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-6" id="available-hours">
                        <div className="orderform__content__calendar orderform__content__calendar--times">
                            {times}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    msg:   state.intl.msg.orderCleaning,
    order: state.orderCleaning.map
}), orderCleaningActions)(Calendar);
