const initialState = {
  fileData: '',
  isLoading: false,
  errorMessage: '',
  filesConfig: {},
};

export const assetFilesReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_FILES_CONFIG_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        filesConfig: action.config,
      };
    case 'FETCH_FILES_CONFIG_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    case 'FETCH_FILES_CONFIG_ACTION':
    case 'FETCH_FILES_ACTION':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_FILES_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        fileData: action.file,
      };
    case 'FETCH_FILES_FAIL_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getFileData = state => state.assetFilesReducer.fileData;

export const isLoading = state => state.assetFilesReducer.isLoading;

export const getFilesConfig = state => state.assetFilesReducer.filesConfig;
