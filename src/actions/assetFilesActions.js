export const fetchFileAction = fileDetails => ({
  type: 'FETCH_FILE_ACTION',
  fileDetails,
});

export const fetchFileSuccessAction = file => ({
  type: 'FETCH_FILE_SUCCESS_ACTION',
  file,
});

export const fetchFileFailedAction = errorMessage => ({
  type: 'FETCH_FILE_FAIL_ACTION',
  errorMessage,
});

export const fetchFilesConfigAction = () => ({
  type: 'FETCH_FILES_CONFIG_ACTION',
});

export const fetchFileConfigSuccessAction = config => ({
  type: 'FETCH_FILES_CONFIG_SUCCESS_ACTION',
  config,
});

export const fetchFileConfigFailedAction = errorMessage => ({
  type: 'FETCH_FILES_CONFIG_FAILED_ACTION',
  errorMessage,
});
