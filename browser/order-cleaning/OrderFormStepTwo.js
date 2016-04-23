import Component from 'react-pure-render/component';
import * as orderCleaningActions from '../../common/order-cleaning/actions';
import {Link} from 'react-router';
import Ticket from './Ticket.react';

import React, {PropTypes} from 'react';
import fetch from '../../common/components/fetch';
import {connect} from 'react-redux';

class OrderFormStepTwo extends Component {

    static propTypes = {
        msg: PropTypes.object
    };

    componentDidMount() {
        console.log('STEP 2');
        const {dispatch} = this.props;
        dispatch(orderCleaningActions.onStepChange(2));
    }

    render() {
        const {msg, order} = this.props;
        let totalHours = order.get("ironingHours") + order.get("cleaningHours");
        let price = order.get('cleaningServiceIntervals')[order.get('currentServiceInterval')].get('price');
        return (
            <div className="row">
                <div className="col-xs-12 col-lg-8">
                    <div className="orderform__content container-fluid">
                        <p>{msg.areURegisteredNotice}
                            <Link to="#"> {msg.loginLinkTitle}</Link>
                        </p>
                        <div className="form-group row-grid">
                            <div className="col-xs-12 col-md-4">
                                <input className="form-control form-control-lg" placeholder={msg.inputFullNamePlaceholder}/>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <input className="form-control form-control-lg" placeholder={msg.inputEmailPlaceholder}/>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <input className="form-control form-control-lg" placeholder={msg.inputPhonePlaceholder}/>
                            </div>
                        </div>
                    </div>
                    <div className="orderform__content container-fluid">
                        <h2 className="orderform__content__title">{msg.infoHome}</h2>
                        <div className="row">
                            <div className="col-xs-12 col-lg-12">
                                <input className="form-control form-control-lg" placeholder={msg.inputAddressPlaceholder}/>
                                <p className="text-xs-left">
                                    <small>{msg.inputAddressNotice}</small>
                                </p>
                            </div>
                            <div className="col-xs-12 col-lg-12">
                                <input className="form-control form-control-lg" placeholder={msg.inputAddressDetailPlaceholder}/>
                                <p className="text-xs-left">
                                    <small>{msg.inputAddressDetailNotice}</small>
                                </p>
                            </div>
                        </div>
                        <h3 className="orderform__content__subtitle">{msg.doUHavePets}</h3>
                        <div className="row text-sm-left">
                            <div className="col-xs-12 col-sm-4">
                                <span className="lsCheckbox">
                                    <input type="checkbox" id="petDog"/>
                                    <label htmlFor="petDog">{msg.petLabelDog}</label>
                                </span>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <span className="lsCheckbox">
                                    <input type="checkbox" id="petCat"/>
                                    <label htmlFor="petCat">{msg.petLabelCat}</label>
                                </span>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <span className="lsCheckbox">
                                    <input type="checkbox" id="petOther"/>
                                    <label htmlFor="petOther">{msg.petLabelOthers}</label>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <input className="form-control form-control-lg" type="text" placeholder={msg.upresnete}/>
                            </div>
                        </div>
                    </div>
                    <div className="orderform__content container-fluid">
                        <h2 className="orderform__content__title">{msg.discountVoucherTitle}</h2>
                        <div className="row">
                            <div className="col-xs-12">
                                <input className="form-control form-control-lg" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="orderform__content container-fluid">
                        <h2 className="orderform__content__title">{msg.paymentTypeTitle}</h2>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <ul className="orderform__content__radio">
                                    <li className="orderform__content__radio__list-item">
                                        {msg.paymentType1}<br/>
                                        <small>Visa and shit</small>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xs-12 col-sm-6 text-sm-left">
                                <span className="lsCheckbox">
                                    <input type="checkbox" id="useCredits"/>
                                    <label htmlFor="useCredits">Uplatnit X kreditů (fetch user, get credits amount)
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <button className="orderform__button">
                                <Link to="#"><strong>{msg.stepDone} {totalHours * price} Kč</strong></Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-lg-4">
                    <Ticket />
                </div>
            </div>
        );
    }

}

export default connect(state => ({
    msg:   state.intl.msg.orderCleaning,
    order: state.orderCleaning.map,
}))(OrderFormStepTwo);
