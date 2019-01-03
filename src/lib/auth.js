export const getToken = () => {
  return localStorage.getItem('eb-app');
};

export const deleteToken = () => {
  return localStorage.removeItem('eb-app');
};

export const setToken = token => {
  return localStorage.setItem('eb-app', token);
};
