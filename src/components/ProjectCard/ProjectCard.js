import React, { Component } from 'react';
import './ProjectCard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


export default class ProjectCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		return (
				<div className="item">
					<div className="img-container">
						<img src={this.props.img} className="item-img"/>
					</div>
					<h2>
						<a href={this.props.link} className="item-link"> 
							{this.props.name} 
						</a>
						<a href={this.props.gitLink}>
							<FontAwesomeIcon icon={ faGithub } className="git-link" />
						</a>
					</h2>
					<p>{this.props.desc}</p>
				</div>
		)
	}
}