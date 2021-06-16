import React, { Component } from 'react'

export default class AffirmationsApi extends Component {
    constructor(props) {
        super(props)

        this.state = {
            affirmation: null,
            isLoaded: false,
        }
    }

    getAffirmation = () => {
        fetch('https://www.affirmations.dev/')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                affirmation: json,
            })
        })
    }

    componentDidMount() {
        this.getAffirmation()
    }

    render() {

        // let { isLoaded, affirmation } = this.state

        return (
            <div>
                <div>
                    {this.state.isLoaded || !this.state.affirmation ? (
                        <div>Loading...</div>
                    ) : (
                        <div>{this.state.affirmation}</div>
                        )}
                </div>
                {/* data has been loaded */}
            </div>
        )
    }
}
