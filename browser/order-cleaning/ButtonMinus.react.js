import * as orderCleaningActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ButtonMinus extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.onMinusButtonClick = this.onMinusButtonClick.bind(this);
    }

    onMinusButtonClick() {
        const {minusCleaningHour} = this.props;
        minusCleaningHour(this.props.cleaningType);
        return;
    }

    render() {
        const {minusCleaningHour , msg} = this.props;
        return (
            <button
                className="orderform__content__product__hourStepper__button orderform__content__product__hourStepper__button--right"
                onClick={this.onMinusButtonClick}
            >{msg.minusHourLabel}</button>
        );
    }
}

export default connect(state => ({
    msg: state.intl.msg.orderCleaning,
}), orderCleaningActions)(ButtonMinus);
