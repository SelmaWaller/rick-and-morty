import React, {useState} from 'react';

import Collapsible from 'react-collapsible';
const minMessageCount = 15;

export default function Contact() {
  const [firstnameError, setFirstnameError] = useState(true);
  const [surnameError, setSurnameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [messageError, setMessageError] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [count, setCount] = useState(minMessageCount);

  let handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^[a-zA-Zæøå -]+$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let phonePattern = /^[49]{1}[0-9]{7}$/;
    let messagePattern = /^(.{15,})$/;

    switch (name) {
      case 'firstname':
        namePattern.test(value)
          ? setFirstnameError(false)
          : setFirstnameError(true);
        break;
      case 'surname':
        namePattern.test(value)
          ? setSurnameError(false)
          : setSurnameError(true);
        break;
      case 'email':
        emailPattern.test(value) ? setEmailError(false) : setEmailError(true);
        break;
      case 'phone':
        phonePattern.test(value) ? setPhoneError(false) : setPhoneError(true);
        break;
      case 'message':
        setCount(minMessageCount - value.length);
        setMessageError(!messagePattern.test(value));
        break;
      default:
        break;
    }
  };

  let submitForm = event => {
    event.preventDefault();
    setShowResponse(true);
  };

  let removeResponse = () => {
    window.location.reload();
  };

  return (
    <div className="mediumCardContainer blogSpecific">
      <div className="innerCard boxShadow contact textLeft">
        <div className="contactForm">
          <form onSubmit={submitForm}>
            <label htmlFor="firstname">
              First name<span className="required">* </span>
              <span className={firstnameError ? 'error' : 'error__hide'}>
                {' '}
                Please use a valid name
              </span>
            </label>
            <input
              autoFocus
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              id="email"
              type="text"
              name="email"
              placeholder="john@doe.com"
            />

            <label htmlFor="phone">
              Phone<span className="required">* </span>
              <span className={phoneError ? 'error' : 'error__hide'}>
                {' '}
                8 digits starting with 9 or 4
              </span>
            </label>
            <input
              onChange={handleChange}
              id="phone"
              type="text"
              name="phone"
              placeholder="98765432"
            />

            <label htmlFor="message">
              Message<span className="required">* </span>
              <span className={messageError ? 'error' : 'error__hide'}>
                {' '}
                Requires {count} more characters
              </span>
            </label>
            <textarea
              onChange={handleChange}
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
            <div className={showResponse ? 'messageSent' : 'messageSent__hide'}>
              <input readOnly type="text" value="Thank you!" />
              <input
                readOnly
                type="text"
                value="Send another message"
                onClick={removeResponse}
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
