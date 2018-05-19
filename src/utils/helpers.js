export const isProdEnv = () => !window.location.href.includes('localhost');

export const setHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

const not = (fn) => (...args) => !fn(...args);

export const isSuccess = (response) => response.status === 200;

export const isError = not(isSuccess);

export const isUserError = (response) => response.data.error;
