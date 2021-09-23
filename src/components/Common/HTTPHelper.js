import axios from 'axios';

const getDataListApi = async (
  AxiosInstance,
  method,
  baseURL,
  data,
  headers
) => {
  try {
    const result =
      AxiosInstance === null
        ? await axios({
            method: method,
            baseURL: baseURL,
            data: data,
            headers: headers,
          })
        : await AxiosInstance({
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

export const getDataList = async (
  AxiosInstance,
  method,
  baseURL,
  data,
  headers
) => {
  const response = await getDataListApi(
    AxiosInstance,
    method,
    baseURL,
    data,
    headers
  );
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
  
  levels.forEach((level) => {
    _reponse = _reponse[level];
  });
  return _reponse;
};