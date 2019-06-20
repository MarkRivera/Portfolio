import React, { Component } from 'react';
import './ContactMe.css';

export default class ContactMe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOpen: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.persist();
		let toggleBox = document.querySelector('.toggle-box');

		if(!this.state.isToggleOpen) {
			toggleBox.classList.add('toggle-open');
			this.setState({
				isToggleOpen: !this.state.isToggleOpen
			})
		}

		else {
			toggleBox.classList.remove('toggle-open');
			this.setState({
				isToggleOpen: !this.state.isToggleOpen
			})
		}
	}

	render(){
		return (
			<React.Fragment>
			<div className="toggle-box"> 
				<form className="contact-form" method="POST">
					<input type="text" name="email" placeholder="Email"></input>
					<textarea name="msg" placeholder="Feel free to send me a message!"  className="msg"/>
					<div className="g-recaptcha" data-sitekey="6LdPxKkUAAAAAKPVRuRTVH2VE3oicvo1f5mahmBr"></div>
					<button type="submit" className="submit-btn">Send</button>
				</form>
			</div>
			<section className="contact">
				<span className="title" onClick={this.handleClick}>
					Contact Me 
					<span role="img" aria-label="smiling-emoji">
						&#128522;
					</span>
				</span>
			</section>
			</React.Fragment>
		)
	}
}