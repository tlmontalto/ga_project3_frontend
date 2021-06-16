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
        fetch('http://localhost:3003/affirmations')
            // .then((res) => {console.log(res)})
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                affirmation: json.affirmation,
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
                    {!this.state.affirmation ? (
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
