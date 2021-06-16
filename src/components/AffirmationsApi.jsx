import React, { Component } from 'react'

export default class affirmationsApi extends Component {
    constructor(props) {
        super(props)

        this.state = {
            affirmation: null,
            isLoaded: false,
        }
    }

    // getAffirmation = () => {
    //     fetch('https://www.affirmations.dev/')
    //     .then(res => res.json())
    //     .then(json => {
    //         this.setState({
    //             isLoaded: true,
    //             affirmation: json,
    //         })
    //     })
    // }

    componentDidMount() {
        const url = 'https://www.affirmations.dev/'
        const response = await fetch(url)
        const data = await response.json()
        this.setState({affirmation: data})
        console.log(data);
    }

    render() {
        return (
            <div>
                {this.state.isLoaded || !this.state.affirmation ? (
                    <div>Loading...</div>
                ) : (
                    <div>{this.state.affirmation}</div>
                    )}
            </div>
        )
    }
}
