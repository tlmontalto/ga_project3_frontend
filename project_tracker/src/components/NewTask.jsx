import React, { Component } from 'react'

export default class NewTask extends Component {
    constructor(props) {
        super(props)

        this.state={
            name: "",
            dueDate: "",
            description: ""
        }
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="name" placeholder="Name" />

                    <label htmlFor="date"></label>
                    <input type="text" id="duedate" name="duedate" placeholder="Due Date"/>

                    <label htmlFor="description"></label>
                    <input type="text" id="description" name="description" placeholder="Description" />

                    <input type="submit" value="Add Task"/>

                </form>
            </div>
        )
    }
}
