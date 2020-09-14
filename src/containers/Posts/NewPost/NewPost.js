import React, { Component } from "react";

import "./NewPost.css";

import axios from "axios";
import { Redirect } from "react-router";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
    submitted: false,
  };

  componentDidMount() {
    console.log(this.props);
  }
  handleSendData = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };

    axios({
      method: "POST",
      url: "/posts",
      data,
    }).then((response) => {
      // this.setState({ submitted: true });
      this.props.history.push("/posts");
      console.log(response);
    });
  };

  render() {
    let redirect = null;
    return (
      <div className="NewPost">
        {/* {(redirect = this.state.submitted ? <Redirect to="/posts" /> : null)} */}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.handleSendData}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
