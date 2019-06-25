import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFile, faDesktop } from '@fortawesome/free-solid-svg-icons'

export default class NavigationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [
        {
          name: 'Home',
          link: '/',
          id: '1',
          icon: faHome,
        },
        {
          name: 'Resume',
          link: '/Resume',
          id: '2',
          icon: faFile,
        },
      ],

      navToggle: false,
    }
    this.toggleNav = this.toggleNav.bind(this)
    this.handleProjectLink = this.handleProjectLink.bind(this)
  }

  toggleNav(e) {
    e.preventDefault()
    e.persist()

    let navBlock = document.querySelector('.nav-block').classList
    // Toggle nav open or closed:
    if (this.state.navToggle) {
      navBlock.remove('open')
      navBlock.add('closed')

      this.setState({
        navToggle: !this.state.navToggle,
      })
    } else {
      navBlock.remove('closed')
      navBlock.add('open')

      this.setState({
        navToggle: !this.state.navToggle,
      })
    }
  }

  handleProjectLink(e) {
    e.persist()

    if (window.location.pathname === '/Resume') {
      this.props.projectClicked()
    } else {
      if (this.props.onHomePage) {
        this.props.scrollPage()
      }
    }
  }

  render() {
    return (
      <nav>
        <div className="controller">
          <a href="/" className="left">
            Mark Rivera
          </a>
          <a href="/" className="nav-toggle" onClick={this.toggleNav}>
            <div className="pattie"></div>
            <div className="pattie"></div>
            <div className="pattie"></div>
          </a>
        </div>

        <ul className="nav-block">
          <a href="/" className="large-logo link">
            Mark Rivera
          </a>

          {this.state.links.map((element, index) => {
            return (
              <li key={element.id}>
                <Link
                  to={element.link}
                  className={`link ${element.name}`}
                  onClick={this.props.pageState}
                >
                  <FontAwesomeIcon icon={element.icon} className="icons" />
                  {element.name}
                </Link>
              </li>
            )
          })}
          <li className="link" onClick={this.handleProjectLink}>
            <FontAwesomeIcon icon={faDesktop} className="icons" />
            Projects
          </li>
        </ul>
      </nav>
    )
  }
}
