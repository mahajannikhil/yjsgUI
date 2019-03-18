import { takeLatest, put } from 'redux-saga/effects';
import csv from 'csvtojson';

import { fetchCSVFile, fetchFileConfig, fetchXLSXFile } from '../utils/http';
import { formatXlsxToJson } from '../utils/fileUtils';
import {
  fetchFileConfigFailedAction,
  fetchFileConfigSuccessAction,
  fetchFilesFailedAction,
  fetchFilesSuccessAction,
} from '../actions/assetFilesActions';

export default function* rootSaga() {
  yield takeLatest(['FETCH_FILES_ACTION'], fetchFilesSaga);
  yield takeLatest(['FETCH_FILES_CONFIG_ACTION'], fetchFilesConfigSaga);
}
/**
 * fetchFilesSaga fetch csv/excel files to show them in a tabular form.
 * @param {Object} action
 */
export function* fetchFilesSaga(action) {
  const { fileDetails } = action;
  const errorMessage = 'Unable to fetch file.';
  let fileData;
  let response;
  try {
    if (fileDetails.fileType === 'csv') {
      response = yield fetchCSVFile(fileDetails);
    } else if (fileDetails.fileType === 'xlsx') {
      response = yield fetchXLSXFile(fileDetails);
    }
    if (response) {
      if (fileDetails.fileType === 'csv') {
        fileData
          = yield new Promise((resolve) => {
            csv()
              .fromString(response)
              .then(csvRow => resolve(csvRow));
          });
      } else if (fileDetails.fileType === 'xlsx') {
        fileData = formatXlsxToJson(response);
      }
      yield put(fetchFilesSuccessAction(fileData));
    } else {
      yield put(fetchFilesFailedAction(errorMessage));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* fetchFilesConfigSaga() {
  const errorMessage = 'Unable to fetch file config.';
  try {
    const response = yield fetchFileConfig();
    if (response) {
      yield put(fetchFileConfigSuccessAction(response));
    } else {
      yield put(fetchFileConfigFailedAction(errorMessage));
    }
  } catch (e) {
    console.log(e);
  }
}
