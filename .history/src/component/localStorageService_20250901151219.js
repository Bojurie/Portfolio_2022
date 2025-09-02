const AUTH_KEYS = {
  TOKEN: "authToken",
  USER: "authUser",
  TOKEN_EXPIRY: "authTokenExpiry",
};

const storage = {
  set: (key, value) => {
    try {
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        if (typeof value === "string") {
          window.localStorage.setItem(key, value);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      }
    } catch (error) {
      console.warn("Failed to access localStorage:", error);
    }
  },

  get: (key, isJson = true) => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return null;

      if (!isJson) return item;

      return JSON.parse(item);
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

export const saveToken = (token) => storage.set(AUTH_KEYS.TOKEN, token);
export const getToken = () => storage.get(AUTH_KEYS.TOKEN, false); // Don't parse as JSON
export const removeToken = () => storage.remove(AUTH_KEYS.TOKEN);

export const saveUser = (user) => storage.set(AUTH_KEYS.USER, user);
export const getUser = () => storage.get(AUTH_KEYS.USER, true); 
export const removeUser = () => storage.remove(AUTH_KEYS.USER);

export const setTokenExpiry = (expiry) =>
  storage.set(AUTH_KEYS.TOKEN_EXPIRY, expiry);
export const getTokenExpiry = () => {
  const expiry = storage.get(AUTH_KEYS.TOKEN_EXPIRY, false); // Get as string
  return expiry ? Number(expiry) : null;
};
export const removeTokenExpiry = () => storage.remove(AUTH_KEYS.TOKEN_EXPIRY);

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

export const migrateAuthData = () => {
  try {
    const oldToken = window.localStorage.getItem(AUTH_KEYS.TOKEN);
    if (oldToken && oldToken.startsWith('"') && oldToken.endsWith('"')) {
      try {
        const parsedToken = JSON.parse(oldToken);
        if (typeof parsedToken === "string") {
          saveToken(parsedToken);
          console.log("Migrated token to new storage format");
        }
      } catch (e) {
        console.warn("Failed to migrate token:", e);
      }
    }
  } catch (error) {
    console.warn("Migration failed:", error);
  }
};
