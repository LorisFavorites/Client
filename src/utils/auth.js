// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data from JSON web token by decoding it
  getProfile() {
    return decode(this.getToken());
  }

  // return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    // A user is logged in if a token is present and the token is not expired.
    return token && !this.isExpired(token) ? true : false;
  }

  getToken() {
    return localStorage.getItem('id_token'); // retrieve token from storage
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken); // Save user token
    window.location.assign('/'); // reload application for logged in user
  }

  logout() {
    localStorage.removeItem('id_token'); // Clear user token
    window.location.reload(); // Reload and reset application
  }

  isExpired(token) {
    // Make sure a valid token was passed into the program
    if(!token) {
        return true;
    }
    const decoded = decode(token); // Decode the token to get expiration time
    // Check expiration time is less than current time (in seconds)
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      // Return 'true' if token is expired
      return true;
    }
    // Return 'false' if token has not expired
    return false;
  }
}

export default new AuthService();
