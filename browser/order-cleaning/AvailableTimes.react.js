import * as orderCleaningActions from '../../common/order-cleaning/actions'
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CalendarDay from './CalendarDay.react.js';
import fetch from '../../common/components/fetch';

class AvailableTimes extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
    };

    constructor(props) {
        console.log("Calendar component init!");
        super(props);
        this.onAvailableItemClick = this.onAvailableItemClick.bind(this);
    }

    onAvailableItemClick(val){
    }

    render() {
        console.log("Available times component render!");
        const {minusCleaningHour , msg, order} = this.props;
        let calendar = order.get("calendar");
        let days = calendar.get("currentMonthDays");
        let availableTimes = calendar.get("availableTimes");
        if (!days.length) {
            return <p>Loading...</p>
        }
        return (
            <div className="orderform__content__calendar__grid">
                {availableTimes.map(function (val, index) {
                    if ((index + 1) % 7 == 0) {
                        var cssClass = "orderform__content__calendar__grid__slot orderform__content__calendar__grid__slot--last"
                    } else {
                        var cssClass = "orderform__content__calendar__grid__slot"
                    }
                    return (
                        <div
                            className={cssClass}
                            key={index}
                            onClick={this.onAvailableItemClick}
                            >
                            {val.time}
                        </div>
                    )
                },this)}
            </div>
        );
    }
}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
AvailableTimes = fetch(orderCleaningActions.fetchAvailableTimes)(AvailableTimes);


export default connect(state => ({
    msg: state.intl.msg.orderCleaning,
    order: state.orderCleaning.map

}), orderCleaningActions)(AvailableTimes);
