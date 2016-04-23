import * as OrderActions from '../../common/order-cleaning/actions';
import {Link} from 'react-router';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Ticket extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onMinusButtonClick = this.onMinusButtonClick.bind(this);
  }

  onMinusButtonClick(e) {
    const {minusCleaningHour} = this.props;
    minusCleaningHour();
    return;
  }

  render() {
    console.log("Ticket component render!");
    const {msg, order, step} = this.props;
    let totalHours = order.get("ironingHours") + order.get("cleaningHours") + order.get("windowWashingHours");
    let currentFullYear = order.get("calendar").get("currentYear");
    let serviceTerm = msg.serviceTerms[order.get('currentServiceInterval')];
    let price = order.get('cleaningServiceIntervals')[order.get('currentServiceInterval')].get('price');
    let currentMonth = order.get("calendar").get("currentMonth");
    let currentDay = order.get("calendar").get("currentDay").date;
    let czDays = ["pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota", "neděle"];    //todo
    let buttonPlaceholder = step == 1 ? msg.nestStep : msg.stepDone;
    if (order.get("ironingHours") > 0) {
      var ironingHours =
      <tr>
        <td>
          {msg.ironing} <span>{order.get("ironingHours")} {msg.hour}</span>
        </td>
        <td>{order.get("ironingHours") * price} {msg.currency}</td>
      </tr>;
    }
    if (order.get("windowWashingHours") > 0) {
      var windowWashingHours =
        <tr>
          <td>
            {msg.ironing} <span>{order.get("windowWashingHours")} {msg.hour}</span>
          </td>
          <td>{order.get("windowWashingHours") * price} {msg.currency}</td>
        </tr>;
    }
    return (
      <div className="orderform__ticket__wrap">
        <div className="orderform__ticket" id="ticket">
          <div className="orderform__ticket__summary">
            <table className="table table-condensed">
              <tbody>
              <tr>
                <td>Datum</td>
                <td>{czDays[new Date(currentFullYear, currentMonth, currentDay).getDay() - 1]} {currentDay}. {currentMonth + 1}. {currentFullYear}</td>
              </tr>
              <tr>
                <td>Čas úklidu</td>
                <td></td>
              </tr>
              <tr>
                <td>Jak často</td>
                <td>{serviceTerm}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="orderform__ticket__orderitems">
            <table className="table table-condensed">
              <tbody>
              <tr>
                <td>
                  {msg.cleaning} <span>{order.get("cleaningHours")} {msg.hour}</span>
                </td>
                <td>{order.get("cleaningHours") * price} {msg.currency}</td>
              </tr>
              {ironingHours}
              {windowWashingHours}
              <tr className="orderform__ticket__orderitems__total">
                <td><strong>{msg.total} {totalHours} hod</strong></td>
                <td><strong>{totalHours * price} Kč</strong></td>
              </tr>
              </tbody>
            </table>

            <button className="orderform__button">
              <Link to="/uklid/krok2"><strong>{buttonPlaceholder}</strong></Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.orderCleaning,
  order: state.orderCleaning.map,
  step: state.orderCleaning.map.get('step'),
}), OrderActions)(Ticket);
