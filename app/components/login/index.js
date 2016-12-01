/**
 * Created by nimdanoob on 2016/11/25.
 */
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd';
const FormItem = Form.Item
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {login} from '../../actions/user'
import {Row, Col} from 'antd';
import './login.less'

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
        console.log('state is '+nextProps);
        // if (error != this.props.loginErrors && error) {
        //     notification.error({
        //         message: 'Login Fail',
        //         description: error
        //     })
        // }
        //
        // if (!isLoggingIn && !error && user) {
        //     notification.error({
        //         message: 'Login Fail',
        //         description: error
        //     })
        // }
        if (user) {
            this.context.router.replace('/admin');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        console.log('login data is '+data.username+':'+data.password)
        this.props.login(data.username, data.password)
    };

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Row className="login-row" type="flex" justify="space-around" align="middle">
                <Col span="8">
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input addonBefore={<Icon type="user"/>} placeholder="Username"
                                       className="login-form-input"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password"
                                       className="login-form-input"/>
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
                            <Button type="primary" htmlType="submit" className="login-form-block-btn">
                                Log in
                            </Button>
                            Or <a>register now!</a>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        )
    }
}

Login.contextTypes = contextTypes;
Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {

    console.log('state is ' + state);
    const user = state.admin;
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
