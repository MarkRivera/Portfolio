import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactMe.css";

const axios = require("axios");

export default class ContactMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOpen: false,
      value: "",
      msg: "",
      isLengthOk: false,
      isEmailValid: false,
      captcha: null,
      subText: "Submit",
      responseStatus: null,
      responseMessage: null
    };

    this.myRef = React.createRef();

    this.emptyMessageState = this.emptyMessageState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleMsgOnBlur = this.handleMsgOnBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    let response = new Promise((resolve, reject) => {
      resolve(value);
    });

    response.then(response => {
      this.setState({ captcha: "valid" });
    });
  }

  validateEmailAddress(email) {
    const emailInput = document.querySelector(".email-input");
    const validityBox = document.querySelector(".validity-box");

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      emailInput.classList.remove("invalid");
      validityBox.classList.remove("open-invalid-text");
      validityBox.classList.add("closed-invalid-text");
      emailInput.classList.add("valid");

      this.setState({ isEmailValid: true });
      return;
    }

    emailInput.classList.remove("valid");
    emailInput.classList.add("invalid");
    validityBox.classList.remove("closed-invalid-text");
    validityBox.classList.add("open-invalid-text");
    this.setState({ isEmailValid: false });
  }

  validateMessageLength(message) {
    const msgBox = document.querySelector(".msg");
    const validityBox = document.querySelector(".validity-msg-box");

    if (message.length < 10) {
      msgBox.classList.add("invalid");

      validityBox.classList.remove("closed-invalid-text");
      validityBox.classList.add("open-invalid-text");
      this.setState({ isLengthOk: false });
      return;
    }

    msgBox.classList.remove("invalid");
    msgBox.classList.add("valid");
    validityBox.classList.remove("open-invalid-text");
    validityBox.classList.add("closed-invalid-text");
    this.setState({ isLengthOk: true });
  }

  emptyMessageState() {
    this.setState({
      value: "",
      msg: ""
    });
  }

  setResponse(data, status) {
    this.setState({
      responseStatus: status.status,
      responseMessage: data.successMessage
    })
  }

  removeOverlayClass() {
    setTimeout(() => {
      document.querySelector('.overlay').classList.remove('overlay-open');
    }, 5000)
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
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.captcha) {
      if (this.state.isLengthOk && this.state.isEmailValid) {
        this.setState({
          responseMessage: 'Sending your message...'
        });

        document.querySelector('.overlay').classList.add('overlay-open');

        axios
          .post("/contact", {
            contact: {
              email: this.state.value,
              message: this.state.msg,
              "g-recaptcha-response": this.state.captcha
            }
          })
          .then(response => {
            this.setResponse(response.data, response.status);
            this.emptyMessageState();
            this.removeOverlayClass();
          })
          .catch(error => {
            this.setState({
              responseMessage: 'Something went wrong, sorry about that!' 
            }, this.removeOverlayClass());
          });
      }
    } else {
      this.setState({
        subText: "Please verify before sending"
      });

      setTimeout(() => {
        this.setState({
          subText: "Submit"
        });
      }, 2000);
    }
  }

  handleClick(e) {
    e.persist();
    let toggleBox = document.querySelector(".toggle-box");

    if (!this.state.isToggleOpen) {
      toggleBox.classList.add("toggle-open");
      this.setState({
        isToggleOpen: !this.state.isToggleOpen
      });
    } else {
      toggleBox.classList.remove("toggle-open");
      this.setState({
        isToggleOpen: !this.state.isToggleOpen
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="toggle-box">
          <form className="contact-form">
            <div className="overlay">
              <h1> {this.state.responseMessage} </h1>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.value}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
              className="email-input"
            />
            <p className="closed-invalid-text validity-box">
              Please enter a valid email address!
            </p>

            <textarea
              name="msg"
              placeholder="Feel free to send me a message!"
              className="msg"
              onChange={this.handleMsgChange}
              value={this.state.msg}
              onBlur={this.handleMsgOnBlur}
            />
            <p className="closed-invalid-text validity-msg-box">
              Be sure that your message is longer than 10 characters!
            </p>

            <ReCAPTCHA
              sitekey={process.env.REACT_APP_PUBLIC_KEY}
              onChange={this.onChange}
            />

            <button
              type="submit"
              className="submit-btn"
              value="Submit"
              onClick={this.handleSubmit}
            >
              {this.state.subText}
            </button>
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
    );
  }
}
