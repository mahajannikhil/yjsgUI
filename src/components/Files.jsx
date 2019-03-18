import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as shortid from 'shortid';
import { Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Button from './commonComponents/Button';
import {
  getSecretKey,
} from '../reducers/studentRegistrationReducer';
import {
  getFileData,
  getFilesConfig,
  isLoading,
} from '../reducers/assetFilesReducer';
import {
  fetchFilesAction,
  fetchFilesConfigAction,
} from '../actions/assetFilesActions';


class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToFileDetails: false,
    };
  }

  componentDidMount() {
    this.props.fetchFilesConfigAction();
  }

  onClickViewFile = (file) => {
    console.log(file);
    this.setState({
      redirectToFileDetails: true,
    });
    this.props.fetchFilesAction(file);
  };

  renderFileList = () => {
    if (!isEmpty(this.props.filesConfig)) {
      return (
        this.props.filesConfig.files.map(file => (
          <div key={shortid.generate()}>
            file.fileLable
            <Button
              buttonText="View"
              onClick={() => this.onClickViewFile(file)}
            />
            <Button
              buttonText="Download"
              onClick={() => {
                console.log('Download');
              }}
            />
          </div>
        ))
      );
    }
    return null;
  };

  redirectToFileDetails = () => {
    if (this.state.redirectToFileDetails) {
      return <Redirect to="/fileDetails" />;
    }
    return null;
  };

  render() {
    if (this.props.isLoading) {
      return <div>Loading.....</div>;
    }
    return (
      <div className="display-inline mar-right-10">
        Files................
        {this.renderFileList()}
        {this.redirectToFileDetails()}
      </div>
    );
  }
}

Files.propsType = {
};

Files.defaultProps = {
  fetchFilesAction: () => {},
  fetchFilesConfigAction: () => {},
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  fileData: getFileData(state),
  filesConfig: getFilesConfig(state),
  isLoading: isLoading(state),
});

export default connect(mapStateToProps, {
  fetchFilesAction,
  fetchFilesConfigAction,
})(Files);
