import BaseAPI from './BaseAPI';
import { getIdToken } from '../utils/StorageUtil';
class UsersAPI extends BaseAPI {
  constructor() {
    super('/users');
  }

  login(email, password) {
    return this.post('login', { email, password });
  }

  logOut() {
    const token = getIdToken();
    return this.post('logout', { token });
  }

  getCurrentLoggedInUser() {
    return this.get('getCurrentLoggedInUser');
  }

  resetPassword(obj) {
    obj.email = obj.email.toLowerCase();
    return this.post('resetPassword', obj);
  }

  signup(user) {
    return this.post('signup', user);
  }

  updateUser(id, user) {
    // return this.put(`${user.id}`, user);
    return this.post(`updateuser/${id}`, user);
    
  }

  fetchList(searchTerm) {
    return this.get(`list`, {searchTerm});
  }

  removeUser(userId) {
    return this.get(`remove/${userId}`);
  }
  
}

const instance = new UsersAPI();
export default instance;
