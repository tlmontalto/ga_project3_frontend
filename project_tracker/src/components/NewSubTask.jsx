import React, { Component } from 'react'

export default class NewSubTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            completed: false
        }
    }
    render() {
        return (
            <div>
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />

                    <label htmlFor="completed">Completed?</label>
                    <input type="checkbox" id="completed" name="completed" />

                    <input type="submit" />
                </form>
            </div>
        )
    }
}
