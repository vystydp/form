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
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
    }

    onNextButtonClick() {
        const {nextMonth} = this.props;
        nextMonth(this.props.cleaningType);
        return;
    }

    render() {
        const {msg} = this.props;
        return (
            <button
                className="orderform__content__calendar__months__button orderform__content__calendar__months__button--right"
                onClick={this.onNextButtonClick}
            >&nbsp;</button>
        );
    }
}

export default connect(state => ({
    msg: state.intl.msg.orderCleaning,
}), orderCleaningActions)(ButtonNextMonth);
