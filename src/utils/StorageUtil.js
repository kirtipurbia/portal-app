import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
const { REACT_APP_BASE_PATH } = process.env;
const path = `${REACT_APP_BASE_PATH || '/'}`;

let _idToken;

export function saveToken(tokenData) {
  cookie.save('id_token', JSON.stringify(tokenData.id_token), {
    path
  });
  _idToken = tokenData.id_token;
  getIdToken();
}

export function verifyToken() {
  const idToken = getIdToken();
  try {
    return idToken && Date.now() < jwtDecode(idToken).exp * 1000;
  } catch (err) {}
  return false;
}

export function saveUser(user) {
  cookie.save('me', encodeURIComponent(JSON.stringify(user)), {
    path
  });
}

const getIdToken = () => {
  if (!_idToken) {
    _idToken = (cookie.load('id_token') || '').slice(1, -1);
  }
  return _idToken;
};

export { getIdToken };

export async function removeCookies() {
  return new Promise((resolve, reject) => {
    _idToken = null;
    const cook = cookie.loadAll();
    Object.keys(cook).map(k => {
      return cookie.remove(k, {
        path
      });
    });
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}