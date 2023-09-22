import { useCallback, useState } from "react";

const ERROR_DEFUALT_MSG = "Something went wrong";
const DEFUALT_REQUEST_METHOD = "GET";
const REQUEST_ERROR_MSG = "Request failed";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method
          ? requestConfig.method
          : DEFUALT_REQUEST_METHOD,
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!response.ok) {
        throw new Error(REQUEST_ERROR_MSG);
      }

      const data = await response.json();
      applyData(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || ERROR_DEFUALT_MSG);
    }
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
