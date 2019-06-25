import React, { Component } from 'react'
import './Skills.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHtml5,
  faReact,
  faCss3,
  faSass,
  faBootstrap,
  faJs,
  faNpm,
} from '@fortawesome/free-brands-svg-icons'

export default class Skills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skills: [
        {
          tech: 'html',
          skill: ['Html5', 'JSX'],
          icons: [faHtml5, faReact],
        },

        {
          tech: 'css',
          skill: ['CSS3', 'Sass', 'Bootstrap'],
          icons: [faCss3, faSass, faBootstrap],
        },

        {
          tech: 'javascript',
          skill: ['Javascript', 'React', 'Npm'],
          icons: [faJs, faReact, faNpm],
        },
      ],
    }
  }

  render() {
    return (
      <section className="skill-container">
        <div className="skill-intro">
          <h1>Skills</h1>
        </div>

        {this.state.skills.map((element, index) => {
          return (
            <div
              key={`${element.skill + ' ' + [index]}`}
              className=" skill-box"
            >
              <div
                className={element.tech}
                key={`${element.tech + ' ' + index}`}
              >
                <h1 className={`${element.tech}-title skill-title`}>
                  {element.tech.toUpperCase()}
                </h1>
              </div>

              <div className="divider"></div>

              <div className="skills">
                {element.skill.map((item, index) => {
                  return (
                    <div className="tech" key={`${item + ' ' + index}`}>
                      <FontAwesomeIcon
                        icon={element.icons[index]}
                        size="6x"
                        className={`skill-icons ${item}`}
                      />
                      <p className="skill-name">{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    )
  }
}
