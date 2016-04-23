import * as orderCleaningActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class CalendarDay extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
        location: PropTypes.object,
        params: PropTypes.object
    };

    constructor(props) {
        console.log("Calendar day component init!");
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onCalendarDayClick = this.onCalendarDayClick.bind(this);
    }

    componentDidMount(){
        console.log("CalendarDay component did mount!!!!!");
    }

    onCalendarDayClick() {
        const {calendarDayClicked, day} = this.props;
        calendarDayClicked(day);
    }

    render() {
        console.log("Calendar component render!");
        const {day , msg, order, isLast} = this.props;
        let calendar = order.get("calendar");
        let months = calendar.get("months");
        let lastClass = isLast ? " orderform__content__calendar__grid__slot--last" : "";
        let isDisabled = ( (new Date().setHours(0, 0, 0, 0) > new Date(day).setHours(0, 0, 0, 0))
        || (new Date().getMonth() > new Date(day).getMonth())
        || (new Date(calendar.get('currentYear'), calendar.get('currentMonth')).getMonth() != new Date(day).getMonth())) ? 'orderform__content__calendar__grid__slot--disabled' : '';
        let cssClass = "orderform__content__calendar__grid__slot" + lastClass + " " + isDisabled;
        return (
            <div
                ref={day.getTime()}
                onClick={this.onCalendarDayClick}
                className={cssClass}>{day.getDate()}</div>
        )

    }
}

export default connect(state => ({
    msg:   state.intl.msg.orderCleaning,
    order: state.orderCleaning.map
}), orderCleaningActions)(CalendarDay);
