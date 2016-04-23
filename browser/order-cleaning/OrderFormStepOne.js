import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import CleaningServices from './CleaningServices.react.js';
import CleaningServiceTerms from './CleaningServiceTerms.react.js';
import React, {PropTypes} from 'react';
import Calendar from './Calendar.react';
import Ticket from './Ticket.react';
import fetch from '../../common/components/fetch';
import {connect} from 'react-redux';
import * as orderCleaningActions from '../../common/order-cleaning/actions';

const STEP_1 = 1;

class OrderFormStep1 extends Component {

    static propTypes = {
        msg: PropTypes.object
    };

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(orderCleaningActions.onStepChange(1));
        this.validateStepOne = this.validateStepOne.bind(this.STEP_1);
    }

    validateStepOne(e){
        console.log(this);
        //e.preventDefault();
        orderCleaningActions.validateStepOne(e);
    }

    render() {
        const {msg, order} = this.props;
        return (
            <div className="row">
                <div className="col-xs-12 col-lg-8">
                    <div className="orderform__content container-fluid">
                        <CleaningServices />
                    </div>
                    <div className="orderform__content container-fluid">
                        <Calendar />
                    </div>
                    <div className="orderform__content container-fluid">
                        <h2 className="orderform__content__title">{msg.howOftenDoUNeedCleaning}</h2>
                        <div className="row">
                            <div className="col-xs-12">
                                <CleaningServiceTerms order="order"/>
                                <p>
                                    {msg.howOftenInfo1}
                                    <br/>
                                    {msg.howOftenInfo2}<Link to="#"> {msg.contactUsLinkTitle}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="orderform__content container-fluid">
                        <h2 className="orderform__content__title">{msg.cleaningNeedles}</h2>
                        <textarea className="orderform__content__note" cols="60" placeholder={msg.infoForWorkerPlaceholder}></textarea>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-lg-12 bottom20">
                                <span className="lsCheckbox">
                                    <input type="checkbox" id="haveCleanser" className="form-control"/>
                                    <label htmlFor="haveCleanser">
                                        {msg.haveCleanser}
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <button className="orderform__button">
                                <Link to="/uklid/krok2" onClick={this.validateStepOne}><strong>{msg.nestStep}</strong></Link>
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
    order: state.orderCleaning.map
}))(OrderFormStep1);
