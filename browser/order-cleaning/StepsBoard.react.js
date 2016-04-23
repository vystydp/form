import Component from '../../../node_modules/react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class StepsBoard extends Component {

    static propTypes = {
        msg: PropTypes.object.isRequired,
    };

    render() {
        const {msg, step} = this.props;
        let cssClass = step == 1
            ? ["orderform__nav__item--active","",""] : cssClass = step == 2
            ? ["","orderform__nav__item--active",""] : ["","","orderform__nav__item--active"];
        cssClass = cssClass.map((val) => ("col-xs-12 col-md-4 orderform__nav__item "+val));
        console.log(cssClass);
        return (
            <div className="col-xs-12 col-lg-12">
                <ul className="orderform__nav clearfix no-style">
                    <li className={cssClass[0]}>{msg.stepOneTitle}</li>
                    <li className={cssClass[1]}>{msg.stepTwoTitle}</li>
                    <li className={cssClass[2]}>{msg.stepDoneTitle}</li>
                </ul>
            </div>
        );
    }

}

export default connect(state => ({
    msg: state.intl.msg.app.titles,
}))(StepsBoard);
