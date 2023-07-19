import * as url from "url";
import {useRef} from "react";
import jwtDecode from "jwt-decode";

export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body,
  });

  const data = await response.json();

  localStorage.setItem('user', JSON.stringify(data))

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  const decodedData = jwtDecode(data.token)

  return decodedData;
};
