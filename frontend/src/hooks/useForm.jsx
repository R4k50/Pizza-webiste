import { useState } from "react";

export default function useForm() {
  const [data, setData] = useState({});

  const handleChange = ({ target }) => {
    if (target.value)
      setData(prev => ({
        ...prev,
        [target.name]: target.value
      }));
  }

  return { data, handleChange };
}