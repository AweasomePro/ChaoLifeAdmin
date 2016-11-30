import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';
import configureStore from '../store/configureStore';
import Root from '../containers/Root';
import '../styles/main.scss';
import '../assets/css/login-style.css'
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <div>test login</div>
    </AppContainer>
    , document.getElementById('root'))