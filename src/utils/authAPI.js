const baseURL = "https://notes-api.dicoding.dev/v1";

const register = async (name, email, password) => {
  const response = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return response.json();
};

const login = async (email, password) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

const getUser = async () => {
  const response = await fetch(`${baseURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.json();
};

const getAccessToken = () => {
  return localStorage.getItem("access-token");
};

const putAccessToken = (token) => {
  return localStorage.setItem("access-token", token);
};

export { register, login, getUser, getAccessToken, putAccessToken };
