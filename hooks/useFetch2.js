import { useState } from "react";

const useFetch2 = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (method, body, token) => {
    try {
      setLoading(true);
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      setError(null);
      setLoading(false);
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};

export default useFetch2;
