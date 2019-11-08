import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uploadPhoto } from '../../actions/photo';
import {Button, Row, Col,Form} from 'react-bootstrap';
const UploadPhoto = ({ uploadPhoto, history }) => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState([]);

  const onChangeCaption = event =>
    setCaption({ ...caption, [event.target.name]: event.target.value });

  const onChangePhoto = event => {
    console.log(event.target.files[0]);
    setPhoto({ ...photo, [event.target.name]: event.target.files[0] });
  };

  const onSubmit = event => {
    event.preventDefault();

    const form = new FormData();
    form.append('myPhoto', photo.myPhoto);
    form.append('caption', caption.caption);

    console.log(photo.myPhoto);
    for (let pair of form.entries()){
      console.log(pair[0] + ' ' + pair[1]);
    }
    uploadPhoto(form, history);

    window.location.replace('/profile');
  };

  return (
    <Fragment>
    <div className="upload-div">
      <h3>Upload Photo</h3>
    <Form onSubmit={event => onSubmit(event)}>
    <Row>
      <Col>
          <Form.Group controlId="formImageUpload">
            <Form.Control type="file"  accept="image/*" name='myPhoto'
            onChange={event => onChangePhoto(event)}  required/>
        </Form.Group>
     </Col>
     <Col>
          <Form.Group controlId="formCaption">
            <Form.Control type="text" name="caption" placeholder="Enter Caption" value={caption.caption}
            onChange={event => onChangeCaption(event)}/>
          </Form.Group>
    </Col>
    <Col>
    <Button className="populate-btn" type="submit">
      Upload
    </Button>
    </Col>
    </Row>

      </Form>
      </div>
    </Fragment>
  );
  // return (
  //   <Fragment>
  //     <form
  //       className='form'
  //       action='http://localhost:5000/api/photo'
  //       method='POST'
  //       encType='multipart/form-data'
  //     >
  //       <input type='file' name='myPhoto' />

  //       <input type='submit' value='Upload' />
  //     </form>
  //   </Fragment>
  // );
};

UploadPhoto.propTypes = {
  uploadPhoto: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  null,
  { uploadPhoto }
)(withRouter(UploadPhoto));
