import React, { Component } from 'react'
import NewSubTask from './NewSubTask'

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
                {/* < SubTasks /> */}
                < NewSubTask />
            </div>
        )
    }
}
