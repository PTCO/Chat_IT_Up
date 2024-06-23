import React, { Component } from 'react';

export default class ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({hasError: true})
    }

    render(){
        if(this.state.hasError) {
            if(this.props.type === "Account") return <h1 className='colorFullBorders p-2 mt-2 rounded'>Account Settings currently unavailable</h1>
        }
        return this.props.children;
    }
}