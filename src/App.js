import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationContainer from './components/Navigation/NavigationContainer'
import Home from './components/Home/Home'
import Resume from './components/Resume/Resume'
import ContactMe from './components/ContactMe/ContactMe'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onResumePage: false,
      onHomePage: true,
      projectClicked: false,
    }
    this.changeResumeStateToTrue = this.changeResumeStateToTrue.bind(this)
    this.changeResumeStateToFalse = this.changeResumeStateToFalse.bind(this)
    this.changeHomeStateToFalse = this.changeHomeStateToFalse.bind(this)
    this.changeHomeStateToTrue = this.changeHomeStateToTrue.bind(this)
    this.scrollPage = this.scrollPage.bind(this)
    this.projectClicked = this.projectClicked.bind(this)
  }

  changeResumeStateToTrue(e) {
    this.setState({
      onResumePage: true,
    })
  }

  changeResumeStateToFalse(e) {
    this.setState(
      {
        onResumePage: false,
      },
      () => {
        if (this.state.projectClicked) {
          this.scrollPage()
        }
      }
    )
  }

  changeHomeStateToFalse() {
    this.setState({
      onHomePage: false,
    })
  }

  changeHomeStateToTrue() {
    this.setState({
      onHomePage: true,
    })
  }

  scrollPage() {
    let project = document.querySelector('.project-intro').offsetTop
    window.scrollTo(0, project)
    this.setState({
      projectClicked: false,
    })
  }

  projectClicked() {
    this.setState(
      {
        projectClicked: true,
      },
      () => {
        document.querySelector('.Home').click()
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationContainer
            onHomePage={this.state.onHomePage}
            projectClicked={this.projectClicked}
            scrollPage={this.scrollPage}
          />

          <Switch>
            <Route
              path="/"
              exact
              render={props => {
                return (
                  <Home
                    pageStateFalse={this.changeResumeStateToFalse}
                    scrollPage={this.scrollPage}
                    resumePageState={this.state.onResumePage}
                    changeHomePageState={this.changeHomeStateToTrue}
                  />
                )
              }}
            />
            <Route
              path="/Resume"
              render={props => (
                <Resume
                  resumePageStateTrue={this.changeResumeStateToTrue}
                  changeHomePageState={this.changeHomeStateToFalse}
                />
              )}
            />
          </Switch>
        </Router>
        <ContactMe />
      </React.Fragment>
    )
  }
}

export default App
