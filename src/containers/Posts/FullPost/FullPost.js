import React, { Component } from "react";

import "./FullPost.css";

import axios from "axios";
import { withRouter } from "react-router-dom";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };
  componentDidMount = () => {
    console.log(this.props);
    this.loadPost();
  };

  componentDidUpdate = () => {
    console.log(this.props);
    this.loadPost();
  };

  loadPost = () => {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios({
          method: "get",
          url: "/posts/" + this.props.match.params.id,
        }).then((response) => {
          this.setState({ loadedPost: response.data });
        });
      }
    }
  };

  handleDeletePost = () => {
    axios({
      method: "delete",
      url: "/posts/" + this.props.match.params.id,
    }).then((response) => console.log(response));
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.handleDeletePost}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default withRouter(FullPost);
