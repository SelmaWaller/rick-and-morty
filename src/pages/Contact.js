import React, {Component} from 'react';

import Collapsible from 'react-collapsible';

const minMessageLength = 15;

export default class Contact extends Component {
  state = {
    firstname: '',
    surname: '',
    email: '',
    message: '',
    firstnameError: true,
    surnameError: true,
    emailError: true,
    messageError: true,
    count: minMessageLength,
    showResponse: false,
  };

  handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^[a-zA-Zæøå -]+$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let messagePattern = /^(.{15,})$/;

    switch (name) {
      case 'firstname':
        namePattern.test(value)
          ? this.setState({firstnameError: false})
          : this.setState({firstnameError: true});
        break;
      case 'surname':
        namePattern.test(value)
          ? this.setState({surnameError: false})
          : this.setState({surnameError: true});
        break;
      case 'email':
        emailPattern.test(value)
          ? this.setState({emailError: false})
          : this.setState({emailError: true});
        break;
      case 'message':
        this.setState({
          count: minMessageLength - value.length,
          messageError: !messagePattern.test(value),
        });
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.setState({
      showResponse: true,
    });
  };

  removeResponse = () => {
    window.location.reload();
  };

  render() {
    const {
      firstnameError,
      surnameError,
      emailError,
      messageError,
      count,
      showResponse,
    } = this.state;

    return (
      <div className="mediumCardContainer blogSpecific">
        <div className="innerCard boxShadow contact textLeft">
          <div className="contactForm">
            <form onSubmit={this.submitForm}>
              <label htmlFor="firstname">
                First name<span className="required">* </span>
                <span className={firstnameError ? 'error' : 'error__hide'}>
                  {' '}
                  Please use a valid name
                </span>
              </label>
              <input
                onChange={this.handleChange}
                id="firstname"
                type="text"
                name="firstname"
                placeholder="John"
              />

              <label htmlFor="surname">
                Last name<span className="required">* </span>
                <span className={surnameError ? 'error' : 'error__hide'}>
                  {' '}
                  Please use a valid name
                </span>
              </label>
              <input
                onChange={this.handleChange}
                id="surname"
                type="text"
                name="surname"
                placeholder="Doe"
              />

              <label htmlFor="email">
                Email<span className="required">* </span>
                <span className={emailError ? 'error' : 'error__hide'}>
                  {' '}
                  Please enter a valid email
                </span>
              </label>
              <input
                onChange={this.handleChange}
                id="email"
                type="text"
                name="email"
                placeholder="john@doe.com"
              />

              <label htmlFor="message">
                Message<span className="required">* </span>
                <span className={messageError ? 'error' : 'error__hide'}>
                  {' '}
                  Requires {count} more characters
                </span>
              </label>
              <textarea
                onChange={this.handleChange}
                id="message"
                type="text"
                name="message"
              />

              <button
                className={'submitButton'}
                type="submit"
                disabled={
                  firstnameError || surnameError || emailError || messageError
                }
              >
                Send
              </button>
              <div
                className={showResponse ? 'messageSent' : 'messageSent__hide'}
              >
                <input readOnly type="text" value="Thank you!" />
                <input
                  readOnly
                  type="text"
                  value="Send another message"
                  onClick={this.removeResponse}
                />
              </div>
            </form>
          </div>
          <Collapsible trigger="Contact info">
            <p>
              <span className="boldText">Name: </span>Selma Waller
            </p>
            <p>
              <span className="boldText">Phone: </span>+47 941 41 118
            </p>
            <p>
              <span className="boldText">Email: </span>
              <a href="mailto:selmawaller@gmail.com">selmawaller@gmail.com</a>
            </p>
          </Collapsible>
        </div>
      </div>
    );
  }
}
