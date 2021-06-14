import React, { Component } from 'react'

const baseURL = 'http://localhost:3003'

export default class NewSubTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            completed: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    // handleSubmit method will go here.  It needs to connect to the object of the Task it appears on, send a fetch to that object to create a new object within the subtask Array.

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} />

                    <label htmlFor="completed">Completed?</label>
                    <input type="checkbox" id="completed" name="completed" onChange={this.handleChange} />

                    <input type="submit" />
                </form>
            </div>
        )
    }
}
