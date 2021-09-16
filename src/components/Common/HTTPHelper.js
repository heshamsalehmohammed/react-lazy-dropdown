import axios from 'axios';

const getDataListApi = async (method, baseURL, data, headers) => {
  try {
    const result = await axios({
      method: method,
      baseURL: baseURL,
      data: data,
      headers: headers,
    });
    return result;
  } catch (exception) {
    return exception;
  }
};

export const getDataList = async (method, baseURL, data, headers) => {
  const response = await getDataListApi(method, baseURL, data, headers);
  if (response.status === 200) {
    return {data: response, success: true};
  }
  return {
    success: false,
    errorMessage: 'An error occurred. Could not retrieve options',
  };
};

export const parseResponseResultsHierarchy = (
  responseResultsHierarchy,
  response
) => {
    let _reponse = response;
    let levels = responseResultsHierarchy.split('/');
    levels.forEach(level => {
        _reponse = _reponse[level];
    });
    return _reponse;
};
