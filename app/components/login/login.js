/**
 * Created by nimdanoob on 2016/11/25.
 */
import React from 'react'
import './login.css'

export default class Login extends React.Component {
    componentDidMount() {
        $('body').particleground({
            dotColor: '#5cbdaa',
            lineColor: '#5cbdaa'
        })
    }

    render() {
        return (
            <div>
                <canvas className="pg-canvas" width="955" height="561"/>
                <h1>login page</h1>
            </div>
        )
    }
}