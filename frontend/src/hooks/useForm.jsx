import { useState } from "react";

export default function useForm() {
  const [data, setData] = useState({});

  const handleChange = ({ target }) => {
    setData(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  return { data, handleChange };
}