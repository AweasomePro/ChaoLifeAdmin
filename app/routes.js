import React from 'react';
import App from './components/App';
import FilterableTable from './containers/FilterableTable';
import About from './components/About';

// 引入React-Router模块
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入Antd的导航组件
import {Menu, Icon, Switch} from 'antd'
const SubMenu = Menu.SubMenu

// 引入Ant-Design样式 & Animate.CSS样式
import 'antd/dist/antd.css';
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'

// 引入主体样式文件
import './assets/css/main.css'

// 引入单个页面（包括嵌套的子页面）
import myTable from './components/table.js'
import myForm from './components/form.js'
import myChart from './components/chart.js'
import myAnimate from './components/animate.js'
import myCalendar from './components/calendar.js'
import myCard from './components/fetch.js'
import Login from './components/login'
import logo from './assets/images/logo.png'

const ACTIVE = {color: 'red'}


export default (
    <Route path="/">
        <Route path="/admin" component={App}>
            <IndexRoute component={myCard}/>
            <Route path="myTable" component={myTable}/>
            <Route path="myForm" component={myForm}/>
            <Route path="myChart" component={myChart}/>
            <Route path="myCalendar" component={myCalendar}/>
            <Route path="myAnimate" component={myAnimate}/>
            <Route path="myCard" component={myCard}/>
        </Route>
        <Route path="login" component={Login}/>
    </Route>
);
