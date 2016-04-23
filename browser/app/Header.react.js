import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import StepsBoard from './../order-cleaning/StepsBoard.react.js';

class Header extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    const {msg, step} = this.props;
    return (
        <header className="row">
        <StepsBoard step={step}/>
      </header>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.app.titles,
  step: state.orderCleaning.map.get('step'),
}))(Header);
