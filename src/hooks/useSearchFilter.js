import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useSearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") || "");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    setSearchParams({ title });
  }, [title]);

  return [title, titleChangeHandler];
}

export default useSearchFilter;
