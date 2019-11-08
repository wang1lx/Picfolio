import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fileType from 'file-type';
import {Carousel} from 'react-bootstrap';
const PhotosDisplay = ({ photos }) => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  let photoBuffer;
  let b64encoded;
  let data;
  let mime;

  return (
    <Fragment>
      {photos !== undefined? (
        photos.map((photo, index) => {
          photoBuffer = photo.photo.data;
          console.log(photo);
          b64encoded = btoa(new Uint8Array(photoBuffer).reduce(function(data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));
          // b64encoded = btoa(String.fromCharCode.apply(null, photoBuffer));
          mime = fileType(Buffer.from(photoBuffer)).mime;
          data = 'data:' + mime + ';base64,' + b64encoded;
          return <div key={index+'div'}><img height="300" width="400" key={index} src={data} /></div>;
        })
      ) : (
        <p>Loading</p>
      )}

    </Fragment>
  );
};

PhotosDisplay.propTypes = {
  photos: PropTypes.array
};

const mapStateToPropsPrivate = state => ({
  photos: state.photo.photos
});

const mapStateToPropsPublic = state => ({
  photos: state.view.viewPhoto
})

export const PhotosDisplayPrivate = connect(
  mapStateToPropsPrivate,
  {}
)(PhotosDisplay);

export const PhotosDisplayPublic = connect(
  mapStateToPropsPublic,
  {}
)(PhotosDisplay);