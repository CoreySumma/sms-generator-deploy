import React, { Component } from "react";
import "./SMSForm.css";

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

  componentDidUpdate(prevProps) {
    if (prevProps.result !== this.props.result) {
      this.setState({
        message: {
          ...this.state.message,
          body: this.props.result,
        },
      });
    }
  }

  onHandleChange(event) {
    const name = event.target.getAttribute("name");
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    });
  }

  
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    console.log("Request Payload:", JSON.stringify(this.state.message));
    
    fetch('/api/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
              to: "",
              body: "",
            },
          });
          alert("SMS sent successfully!");
        } else {
          this.setState({
            error: true,
            submitting: false,
          });
          alert("SMS failed to send :(");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({
          error: true,
          submitting: false,
        });
      });
  }
  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? "error sms-form" : "sms-form"}
      >
        <div>
          <label htmlFor="to">Phone Number:</label>
          <input
            className="poppins"
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
            cols={30}
            rows={10}
            name="body"
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </div>
        <button type="submit" disabled={this.state.submitting}>
          Send
        </button>
      </form>
    );
  }
}