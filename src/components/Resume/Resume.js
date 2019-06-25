import React, { Component } from 'react'

export default class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.resumePageStateTrue()
    this.props.changeHomePageState()
  }

  render() {
    return <main>I'm the resume page!</main>
  }
}
