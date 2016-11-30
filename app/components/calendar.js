import React from 'react'
import {Calendar} from 'antd';
import moment from 'moment';

function onPanelChange(value, mode) {
    console.log(value, mode);
}

export default class myCalendar extends React.Component {
    dateCellRender = function (value) {
        return <div>Custom date {value.date()}</div>;
    }

    monthCellRender = (value) => {
        return <div>Custom monthly {value.month()}</div>;
    }

    render() {
        return (
            <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')}
                      dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}
            />
        )
    }
}