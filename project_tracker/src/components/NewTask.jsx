import React, { Component } from 'react'

export default class NewTask extends Component {
    render() {
        return (
            <div>
                <form>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="date"></label>
                    <input type="text" id="date" name="date" />

                    <label htmlFor="description"></label>
                    <input type="text" id="description" name="description" />

                    <input type="submit">Add Task</input>

                </form>
            </div>
        )
    }
}
