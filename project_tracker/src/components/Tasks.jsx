import React, { Component } from 'react'
import NewSubTask from './NewSubTask'
import SubTask from './SubTask'

export default class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }
    }

    render() {
        return (
            <div>
                < SubTask />
            </div>
        )
    }
}
