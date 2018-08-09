import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, CardPanel, Input, Button} from 'react-materialize';
import { createPost } from '../../../redux/actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
     const post = {
        title: this.state.title,
        body: this.state.body
      };
      
      this.props.createPost(post);
      e.preventDefault();
  }

  render() {
    return (
      <div className="container">
         <br/>
         <Row>
            <Col s={12}>
               <CardPanel>
                  <Row>
                     <h5 className="center">New Post</h5>
                  </Row>
                  <form onSubmit={this.onSubmit}>
                     <Row>
                        <Input s={12} name="title" onChange={this.onChange} defaultValue={this.state.title} placeholder="Titulo" label="Title"/>                  
                     </Row>
                     <Row>
                        <Input s={12} name="body" onChange={this.onChange} defaultValue={this.state.body} type="textarea" placeholder="Cuerpo" label="Body"/>                  
                     </Row>
                     <Row className="center">
                        <Button waves='light'>Save</Button>             
                     </Row>
                  </form>
               </CardPanel>
            </Col>
         </Row>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(PostForm);