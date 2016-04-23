import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onAppComponentDidMount} from '../../common/app/actions';

class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    };

    static gridBreakpoints = {
        xs: 0,
        sm: 544,
        md: 768,
        lg: 992,
        xl: 1200
    };

    // Note pattern how actions related to app start are dispatched.
    // componentDidMount is not called in ReactDOMServer.renderToString, so it's
    // the right place to dispatch client only (e.g. Firebase) actions.
    // Firebase can be used on the server as well, but it's over of this example.
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(onAppComponentDidMount());
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        //TODO don't do when window.width < gridBreakpoints.lg
        let el = document.getElementById('ticket');
        var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
        if (el && top) {
            //TODO 230 is not dynamic
            if (top > 230) {
                //TODO handle on resize
                var parentWidth = el.parentElement.offsetWidth;
                el.style = "top: 0;position: fixed; width: " + parentWidth + "px";
            } else {
                el.style = "";
            }
        }
    }

    render() {
        const {children, location} = this.props;
        return (
            // Pass data-pathname to allow route specific styling.
            <div className="container-fluid" data-pathname={location.pathname}>
                <Header
                    // TODO: Use react-router-redux, then connect location.
                    pathname={location.pathname}
                />
                {children}
                <Footer />
            </div>
        );
    }

}

// Just inject dispatch and don't listen to store.
export default connect()(App);
