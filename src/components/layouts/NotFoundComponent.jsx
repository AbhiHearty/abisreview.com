import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NotFoundComponent extends Component {
    render() {
        return (
            <div >
                <p>{this.props.locale.common.pagenotavaliable}</p>
                <a onClick={(e)=>{e.preventDefault();this.props.history.goBack();}}><span>{this.props.locale.common.GO_BACK}</span></a>
            </div>
        )
    }
}

export default NotFoundComponent;