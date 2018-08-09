import React, { Component } from 'react'
import Posts from './post/Posts';
import PostForm from './post/PostForm';

class Home extends Component {
  render() {
    return (
       <div>
          <PostForm />
          <Posts />
       </div>
    )
  }
}

export default Home;
