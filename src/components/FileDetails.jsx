import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';

import {
  getSecretKey,
} from '../reducers/studentRegistrationReducer';
import { getFileData, isLoading } from '../reducers/assetFilesReducer';
import { fetchFilesAction } from '../actions/assetFilesActions';


class FileDetials extends Component {
  getDataGridHeaders = () => {
    const header = [];
    const metaData = {
      headerConfig: header,
    };

    for (const key in this.props.fileData[0]) {
      header.push({
        label: key,
        key,
        'disableFilter': true,
      });
    }
    return metaData;
  };

  render() {
    if (this.props.isLoading) {
      return <div>Loading.....</div>;
    }
    return (
      <div>
        <DataGrid data={this.props.fileData} metaData={this.getDataGridHeaders()} />
      </div>
    );
  }
}

FileDetials.propTypes = {

};

FileDetials.defaultProps = {
  fetchFilesAction: () => {},
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  fileData: getFileData(state),
  isLoading: isLoading(state),
});

export default connect(mapStateToProps, {
  fetchFilesAction,
})(FileDetials);
