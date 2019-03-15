import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';

import {
  clearAssetFilesAction,
  fetchFilesAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
} from '../reducers/studentRegistrationReducer';
import { getFileData, isLoading } from '../reducers/assetFilesReducer';

/* assetsFileConfig.files.map(file => (
  `import New${file.fileLabel} from '../assets/files/${file.fileName}.csv;`
));*/

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
      });
    }

    console.log(header);
    return metaData;
  }

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
  clearAssetFilesAction: () => {},
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  fileData: getFileData(state),
  isLoading: isLoading(state),
});

export default connect(mapStateToProps, {
  fetchFilesAction,
  clearAssetFilesAction,
})(FileDetials);
