/**
 * Created by nimdanoob on 2016/11/25.
 */
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd';
const FormItem = Form.Item
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {login} from '../../actions/user'

import './login.css'

const propTypes = {
    user: PropTypes.string,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};


class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loginErrors;
        const isLoggingIn = nextProps.loggingIn;
        const user = nextProps.user;

        if (error != this.props.loginErrors && error) {
            notification.error({
                message: 'Login Fail',
                description: error
            })
        }

        if (!isLoggingIn && !error && user) {
            notification.error({
                message: 'Login Fail',
                description: error
            })
        }
        if (user) {
            this.context.router.replace('/admin');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        notification.success({
            message:this
        })
        const data = this.props.form.getFieldsValue();
        this.props.login(data.username, data.password)
    };

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input addonBefore={<Icon type="user"/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a>register now!</a>
                </FormItem>
            </Form>
        )
    }
}

Login.contextTypes = contextTypes;
Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {
    console.log('state is ' + state.auth);
    const user = state.auth;
    if (user && user.user) {
        return {user: user.user, loggingIn: user.loggingIn, loginErrors: ''};
    }
    return {user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors};
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)