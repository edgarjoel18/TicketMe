import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, {
        ...body, ...props
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (e) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Errors</h4>
          <ul>
            {e.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
