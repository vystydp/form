import * as orderCleaningActions from '../../common/order-cleaning/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class CleaningServiceTerms extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
    };

    constructor(props) {
        console.log("CleaningServiceTerm component init!");
        super(props);
        this.onCleaningServiceItemClick = this.onCleaningServiceItemClick.bind(this);
    }

    onCleaningServiceItemClick(id) {
        const {calendarServiceTermClicked} = this.props;
        calendarServiceTermClicked(id);
        return;
    }

    render() {
        console.log("CleaningServiceTerm component render");
        const {msg,order} = this.props;
        return (
            <ul className="orderform__content__radio">
                {order.get('cleaningServiceIntervals').map(function (map) {
                    let listItemClass = "orderform__content__radio__list-item" + ((map.get('id') == order.get('currentServiceInterval')) ? ' orderform__content__radio__list-item--active' : '');
                    return (
                        <li onClick={this.onCleaningServiceItemClick.bind(null, map.get('id'))} className={listItemClass}
                            key={map.get('id')}>
                            <div>
                                <strong>{msg.serviceTerms[map.get('id')]}</strong><br />
                                <small>{map.get('price')} {msg.currency}</small>
                            </div>
                        </li>)
                }, this)
                }
            </ul>
        )
    }
}

export default connect(state => ({
    msg: state.intl.msg.orderCleaning,
    order: state.orderCleaning.map
}), orderCleaningActions)(CleaningServiceTerms);
