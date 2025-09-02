const KEY_TOKEN = "authToken";
const KEY_USER = "authUser";
const KEY_EXP = "authTokenExpiry";

const APP_PREFIXES = [

];

function lsSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}
function lsGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {}
}

export const saveToken = (token) => {
  if (typeof token === "string" && token) {
    lsSet(KEY_TOKEN, token);
  }
};
export const getToken = () => lsGet(KEY_TOKEN);
export const removeToken = () => lsRemove(KEY_TOKEN);

export const saveUser = (user) => {
  try {
    if (user) {
      lsSet(KEY_USER, JSON.stringify(user));
    } else {
      lsRemove(KEY_USER);
    }
  } catch {}
};

export const getUser = () => {
  const raw = lsGet(KEY_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    lsRemove(KEY_USER);
    return null;
  }
};

export const removeUser = () => lsRemove(KEY_USER);

export const setTokenExpiry = (timestampMs) => {
  lsSet(KEY_EXP, String(timestampMs ?? ""));
};

export const getTokenExpiry = () => {
  const v = lsGet(KEY_EXP);
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export const removeTokenExpiry = () => lsRemove(KEY_EXP);

export function clearAuthData({ clearAppCache = true } = {}) {
  removeToken();
  removeUser();
  removeTokenExpiry();

  try {
    window.sessionStorage.removeItem("csrf");
    window.sessionStorage.removeItem("search:q");
    window.sessionStorage.removeItem("lastVisited");
  } catch {}

  if (!clearAppCache) return;
  try {
    const keys = Object.keys(window.localStorage);
    for (const k of keys) {
      if (APP_PREFIXES.some((p) => k.startsWith(p))) {
        window.localStorage.removeItem(k);
      }
    }
  } catch {}
}
