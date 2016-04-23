import * as orderCleaningActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ButtonNextMonth extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.onPrevButtonClick = this.onPrevButtonClick.bind(this);
    }

    onPrevButtonClick() {
        const {prevMonth} = this.props;
        prevMonth(this.props.cleaningType);
        return;
    }

    render() {
        const {minusCleaningHour , msg} = this.props;
        return (
            <button
                className="orderform__content__calendar__months__button orderform__content__calendar__months__button--left"
                onClick={this.onPrevButtonClick}
            >&nbsp;</button>
        );
    }
}

export default connect(state => ({
    msg: state.intl.msg.orderCleaning,
}), orderCleaningActions)(ButtonNextMonth);
