import axios from "axios";
import { useEffect, useState } from "react"

const useAxios = (param, int) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

  const fetchData = async (param) => {
    try {
        setLoading(true);
      const result = await axios(param);
      setResponse(result.data);
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(param);
  }, [int]);

  return {
    response, loading, error
  }
}

export default useAxios