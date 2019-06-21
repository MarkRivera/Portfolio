import React, { Component } from 'react';
import './ContactMe.css';

export default class ContactMe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOpen: false,
			value: '',
			msg: ''
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleMsgChange = this.handleMsgChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	handleMsgChange(e) {
		this.setState({
			msg: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
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
				<form className="contact-form" onSubmit={this.handleSubmit}>
					<input type="text" name="email" placeholder="Email" value={this.state.value} onChange={this.handleChange}></input>
					<textarea name="msg" placeholder="Feel free to send me a message!"  className="msg" onChange={this.handleMsgChange} value={this.state.msg} />
					<div className="g-recaptcha" data-sitekey="6LdPxKkUAAAAAKPVRuRTVH2VE3oicvo1f5mahmBr"></div>
					<input type="submit" className="submit-btn" value="Submit" />
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