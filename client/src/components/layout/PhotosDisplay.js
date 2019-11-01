import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fileType from 'file-type';

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
          return <img key={index} src={data} />;
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

const mapStateToProps = state => ({
  photos: state.photo.photos[0]
});

export default connect(
  mapStateToProps,
  {}
)(PhotosDisplay);
