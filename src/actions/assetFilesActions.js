export const fetchFilesAction = fileDetails => ({
  type: 'FETCH_FILES_ACTION',
  fileDetails,
});

export const fetchFilesSuccessAction = file => ({
  type: 'FETCH_FILES_SUCCESS_ACTION',
  file,
});

export const fetchFilesFailedAction = errorMessage => ({
  type: 'FETCH_FILES_FAIL_ACTION',
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
