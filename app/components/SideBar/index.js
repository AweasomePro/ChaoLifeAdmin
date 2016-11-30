import React from 'react';
import App from '../App';

// 引入React-Router模块
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入Antd的导航组件
import {Menu, Icon, Switch} from 'antd'
const SubMenu = Menu.SubMenu;

// 引入Ant-Design样式 & Animate.CSS样式
import 'antd/dist/antd.css';
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'

// 引入主体样式文件
// import './main.css'

// 引入单个页面（包括嵌套的子页面）

import logo from '../../assets/images/logo.png'
// 引入主体样式文件
import './main.css'

// 配置导航
export  default class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            username: ''
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    };

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        this.setState({
            username: 'luozh'
        })
    };

    render() {
        return (
            <div>
                <div id="leftMenu">
                    <img src={logo} width="50" id="logo"/>
                    <Menu theme="dark"
                          onClick={this.handleClick}
                          style={{width: 185}}
                          defaultOpenKeys={['sub1', 'sub2']}
                          defaultSelectedKeys={[this.state.current]}
                          mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail"/><span>导航一</span></span>}>
                            <Menu.Item key="1"><Link to="/admin/myTable">表格</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/admin/myForm">表单</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/admin/myChart">图表</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/admin/myCalendar">日历</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>导航二</span></span>}>
                            <Menu.Item key="5"><Link to="/admin/myCard">导航</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/admin/myAnimate">关注</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user"/>{ this.state.username }</span>}>
                            <Menu.Item key="setting:1"><a href="/login">退出</a></Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}