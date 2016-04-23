import * as orderActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {fields} from '../../common/lib/redux-fields';
import ButtonPlus from './ButtonPlus.react.js';
import ButtonMinus from './ButtonMinus.react.js';
import {Link} from 'react-router';
import {Map} from 'immutable';

const CLEANING_TYPE_CLEANING = 'CLEANING';
const CLEANING_TYPE_IRONING = 'IRONING';
const CLEANING_TYPE_WINDOW_WASHING = "CLEANING_TYPE_WINDOW_WASHING";

class CleaningServices extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired
    };

    render() {
        const {fields, msg} = this.props;
        var placeholderCleaning = msg.howCleningHoursPlaceholder
            .replace('%s', this.props.order.get("cleaningHours"))
            .replace('%s', (this.props.order.get("cleaningHours") * 20) - 10); // 3.5hod = 50m2
        var placeholderIroning = msg.howFlatIronHoursPlaceholder
            .replace('%s', this.props.order.get("ironingHours"));
        var placeholderWindowCleaning = msg.placeholderWindowCleaning
            .replace('%s', this.props.order.get("windowWashingHours"));
        return (
            <div className="row">
                <div className="orderform__content__product col-xs-12 col-lg-6">
                    <div className="orderform__content__product__image">
                        <img src="/images/orderform/cleaning-type-cleaning.png"/>
                    </div>
                    <span>{msg.howCleningHoursLabel}</span>
                    <div className="orderform__content__product__hourStepper">
                        <ButtonMinus cleaningType={CLEANING_TYPE_CLEANING}/>
                        <input
                            readOnly
                            className="orderform__content__product__hourStepper__input"
                            maxLength={100}
                            placeholder={placeholderCleaning}
                        />
                        <ButtonPlus cleaningType={CLEANING_TYPE_CLEANING}/>
                    </div>
                    <span><Link to="#">{msg.howManyHelp}</Link></span>
                </div>
                <div className="orderform__content__product col-xs-12 col-lg-6">
                    <div className="orderform__content__product__image">
                        <img src="/images/orderform/cleaning-type-ironing.png"/>
                    </div>
                    <span>{msg.howFlatIronHoursLabel}</span>
                    <div className="orderform__content__product__hourStepper">
                        <ButtonMinus cleaningType={CLEANING_TYPE_IRONING}/>
                        <input
                            readOnly
                            className="orderform__content__product__hourStepper__input"
                            maxLength={100}
                            placeholder={placeholderIroning}
                        />
                        <ButtonPlus cleaningType={CLEANING_TYPE_IRONING}/>
                    </div>
                    <span><Link to="#">{msg.howManyHelp}</Link></span>
                </div>
                <div className="orderform__content__product col-xs-12 col-lg-6 col-lg-offset-3">
                    <div className="orderform__content__product__image">
                        <img src="/images/orderform/cleaning-type-window-washing.png"/>
                    </div>
                    <span>{msg.howWashingWindowHoursLabel}</span>
                    <div className="orderform__content__product__hourStepper">
                        <ButtonPlus cleaningType={CLEANING_TYPE_WINDOW_WASHING}/>
                        <input
                            readOnly
                            className="orderform__content__product__hourStepper__input"
                            maxLength={100}
                            placeholder={placeholderWindowCleaning}
                        />
                        <ButtonMinus cleaningType={CLEANING_TYPE_WINDOW_WASHING}/>

                    </div>
                    <span><Link to="#">{msg.howManyHelp}</Link></span>
                </div>
            </div>
        );
    }

}

export default connect(state => ({
    msg:   state.intl.msg.orderCleaning,
    order: state.orderCleaning.map
}), orderActions)(CleaningServices);
