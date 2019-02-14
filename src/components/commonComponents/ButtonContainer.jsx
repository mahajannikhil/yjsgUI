import React from 'react';
import PropTypes from 'prop-types';

const ButtonContainer = props => (
  <div style={props.style} className="buttonContainer">
    {props.children}
  </div>
);

ButtonContainer.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

ButtonContainer.defaultProps = {
  style: {},
  children: '',
};

export default ButtonContainer;
