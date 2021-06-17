import React, { Component } from 'react'
export default class SubTask extends Component {
    render() {
        return (
            <li className="" >
                <input className="form-check-input me-1" type="checkbox" value="" />
                {this.props.subtaskName}
                <ul>
                        <li>{this.props.subtaskDesc}</li>
                </ul>
                
            </li>
        )
    }
}