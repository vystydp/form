import * as orderActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ButtonPlus extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.onPlusButtonClick = this.onPlusButtonClick.bind(this);
    }

    onPlusButtonClick() {
        const {plusCleaningHour} = this.props;
        plusCleaningHour(this.props.cleaningType);
        return;
    }

    render() {
        const {msg} = this.props;
        return (
            <button
                className="orderform__content__product__hourStepper__button orderform__content__product__hourStepper__button--left"
                onClick={this.onPlusButtonClick.bind(this)}
            >{msg.plusHourLabel}</button>
        );
    }
}

export default connect(state => ({
    msg: state.intl.msg.orderCleaning,
}), orderActions)(ButtonPlus);
