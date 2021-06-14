import React, { Component } from 'react'

export default class NewTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            dueDate: '',
            description: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />

                    <label htmlFor="dueDate"></label>
                    <input type="text" id="dueDate" name="dueDate" placeholder="Due Date" onChange={this.handleChange} value={this.state.dueDate} />

                    <label htmlFor="description"></label>
                    <input type="text" id="description" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} />

                    <input type="submit" value="Add Task"/>

                </form>
            </div>
        )
    }
}
