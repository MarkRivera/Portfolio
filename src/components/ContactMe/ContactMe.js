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
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleMsgOnBlur = this.handleMsgOnBlur.bind(this);
	}

	validateEmailAddress(email) {
		const emailInput = document.querySelector('.email-input');
		const validityBox = document.querySelector('.validity-box');

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		  {
	  		emailInput.classList.remove('invalid');
	  		validityBox.classList.remove('open-invalid-text');
	  		validityBox.classList.add('closed-invalid-text');		  	
		    emailInput.classList.add('valid');
		    return
		  }
		  
		  emailInput.classList.remove('valid');
		  emailInput.classList.add('invalid');
		  validityBox.classList.remove('closed-invalid-text');
		  validityBox.classList.add('open-invalid-text');
	}

	validateMessageLength(message) {
		const msgBox = document.querySelector('.msg');
		const validityBox = document.querySelector('.validity-msg-box');

		if(message.length < 10) {
			msgBox.classList.add('invalid');

		  validityBox.classList.remove('closed-invalid-text');
		  validityBox.classList.add('open-invalid-text');

			return
		}

		msgBox.classList.remove('invalid');
    msgBox.classList.add('valid');

		validityBox.classList.remove('open-invalid-text');
	  validityBox.classList.add('closed-invalid-text');		  	
	}

	handleOnBlur(e) {
		this.validateEmailAddress(this.state.value);
	}

	handleMsgOnBlur(e) {
		this.validateMessageLength(this.state.msg);
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
		console.log('server stuff')
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
				<form className="contact-form">
					
					<input 
						type="text" 
						name="email" 
						placeholder="Email" 
						value={this.state.value} 
						onChange={this.handleChange} 
						onBlur={this.handleOnBlur} 
						className="email-input" />
						<p className="closed-invalid-text validity-box">
							Please enter a valid email address!
						</p>

					<textarea 
						name="msg" 
						placeholder="Feel free to send me a message!"  
						className="msg" 
						onChange={this.handleMsgChange} 
						value={this.state.msg} 
						onBlur={this.handleMsgOnBlur} />
						<p className="closed-invalid-text validity-msg-box">
							Be sure that your message is longer than 10 characters!
						</p>

					<div className="g-recaptcha" data-sitekey="6LdPxKkUAAAAAKPVRuRTVH2VE3oicvo1f5mahmBr"></div>
					<button type="submit" className="submit-btn" value="Submit" onClick={this.handleSubmit}>Submit</button>
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