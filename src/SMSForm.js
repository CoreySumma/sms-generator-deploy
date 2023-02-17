import React, { Component } from "react";
import "./SMSForm.css";

const accountSid = 'ACb63d51513aa4208cb4c5f14101057149';
const authToken = '064f2121e70fa810d3b006d2ff82934b';
const phoneNumber = '+18444920353';


export default class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: "",
        body: "",
      },
      submitting: false,
      error: false,
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandleChange(event) {
    const name = event.target.getAttribute("name");
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    console.log('Request Payload:', JSON.stringify(this.state.message));
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: '',
            },
          });
        } else {
          this.setState({
            error: true,
            submitting: false,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          error: true,
          submitting: false,
        });
      });

    const { to, body } = this.state.message;

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages`;

    const data = {
      To: to,
      Body: body,
      From: phoneNumber,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      },
      body: new URLSearchParams(data),
    })
      .then((res) => {
        if (res.ok) {
          console.log('SMS sent successfully');
        } else {
          console.error('Error sending SMS');
        }
      })
      .catch((error) => {
        console.error('Error sending SMS:', error);
      });
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? "error sms-form" : "sms-form"}
      >
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Message:</label>
          <textarea
            name="body"
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </div>
        <button type="submit" disabled={this.state.submitting}>Send</button>
      </form>
    );
  }
}
