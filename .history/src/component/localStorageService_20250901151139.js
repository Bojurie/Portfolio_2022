// localStorageService.js
const AUTH_KEYS = {
  TOKEN: "authToken",
  USER: "authUser",
  TOKEN_EXPIRY: "authTokenExpiry",
};

// Generic storage functions with proper type handling
const storage = {
  set: (key, value) => {
    try {
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        // For tokens, store as plain string; for objects, stringify
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

      // For tokens, return raw string; for objects, parse JSON
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

// Token management - tokens are stored as plain strings
export const saveToken = (token) => storage.set(AUTH_KEYS.TOKEN, token);
export const getToken = () => storage.get(AUTH_KEYS.TOKEN, false); // Don't parse as JSON
export const removeToken = () => storage.remove(AUTH_KEYS.TOKEN);

// User management - users are stored as JSON objects
export const saveUser = (user) => storage.set(AUTH_KEYS.USER, user);
export const getUser = () => storage.get(AUTH_KEYS.USER, true); // Parse as JSON
export const removeUser = () => storage.remove(AUTH_KEYS.USER);

// Token expiry management - stored as number/string
export const setTokenExpiry = (expiry) =>
  storage.set(AUTH_KEYS.TOKEN_EXPIRY, expiry);
export const getTokenExpiry = () => {
  const expiry = storage.get(AUTH_KEYS.TOKEN_EXPIRY, false); // Get as string
  return expiry ? Number(expiry) : null;
};
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

// Migration function for existing localStorage data
export const migrateAuthData = () => {
  try {
    // Check if old format exists (token stored as JSON)
    const oldToken = window.localStorage.getItem(AUTH_KEYS.TOKEN);
    if (oldToken && oldToken.startsWith('"') && oldToken.endsWith('"')) {
      try {
        // This was stored as JSON string, migrate to plain string
        const parsedToken = JSON.parse(oldToken);
        if (typeof parsedToken === "string") {
          saveToken(parsedToken);
          console.log("Migrated token to new storage format");
        }
      } catch (e) {
        // If parsing fails, keep the old format or remove it
        console.warn("Failed to migrate token:", e);
      }
    }
  } catch (error) {
    console.warn("Migration failed:", error);
  }
};
