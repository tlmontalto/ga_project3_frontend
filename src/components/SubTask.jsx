import React, { Component } from 'react'

export default class SubTask extends Component {
    render() {
        return (
            <li>
                {this.props.subtaskName}: {this.props.subtaskDesc}
            </li>
        )
    }
}
