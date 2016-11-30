import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import DevTools from './DevTools';
import {Router} from 'react-router';
import routes from '../routes';

export default class Root extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <div style={{height: '100%'}}>
                    <Router history={history} routes={routes}/>
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
