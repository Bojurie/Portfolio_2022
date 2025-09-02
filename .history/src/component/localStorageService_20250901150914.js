// localStorageService.js
const AUTH_KEYS = {
  TOKEN: "authToken",
  USER: "authUser",
  TOKEN_EXPIRY: "authTokenExpiry",
};

// Generic storage functions
const storage = {
  set: (key, value) => {
    try {
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
    }
  },

  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
      return null;
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
    }
  },
};

// Token management
export const saveToken = (token) => storage.set(AUTH_KEYS.TOKEN, token);
export const getToken = () => storage.get(AUTH_KEYS.TOKEN);
export const removeToken = () => storage.remove(AUTH_KEYS.TOKEN);

// User management
export const saveUser = (user) => storage.set(AUTH_KEYS.USER, user);
export const getUser = () => storage.get(AUTH_KEYS.USER);
export const removeUser = () => storage.remove(AUTH_KEYS.USER);

// Token expiry management
export const setTokenExpiry = (expiry) =>
  storage.set(AUTH_KEYS.TOKEN_EXPIRY, expiry);
export const getTokenExpiry = () => storage.get(AUTH_KEYS.TOKEN_EXPIRY);
export const removeTokenExpiry = () => storage.remove(AUTH_KEYS.TOKEN_EXPIRY);

// Clear all auth data
export const clearAuthData = () => {
  removeToken();
  removeUser();
  removeTokenExpiry();
};

// Check if token is expired
export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;

  const now = Date.now();
  return now >= expiry;
};

// Check if user is authenticated (has valid token)
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  return !isTokenExpired();
};
