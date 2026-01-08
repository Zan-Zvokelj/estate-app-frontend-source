import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  api_url: string = 'https://estate-24ce884b10e6.herokuapp.com/';

  constructor(private http: HttpClient) {}

  // Store profile data in local storage
  storeProfileData(profileData: any) {
    const currentUser = this.getUsername();
    if (currentUser) {
      localStorage.setItem(
        `profileData_${currentUser}`,
        JSON.stringify(profileData)
      );
    }
  }

  getProfileData(): any {
    const currentUser = this.getUsername();
    if (currentUser) {
      const profileData = localStorage.getItem(`profileData_${currentUser}`);
      return profileData ? JSON.parse(profileData) : null;
    }
    return null;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        this.api_url + `accounts/api/auth/`,
        { username, password },
        httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loggedInStatus.next(true);
            console.log(`${user} logged in`);
          }
          return user;
        })
      );
  }

  getUsername(): string {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const parsedUser = JSON.parse(currentUser);
        // Check if username exists directly in the parsedUser object
        if (parsedUser && parsedUser.username) {
          return parsedUser.username;
        } else {
          console.error(
            'Username is missing in currentUser object:',
            parsedUser
          );
        }
      } catch (error) {
        console.error('Error parsing currentUser from localStorage:', error);
      }
    }
    return ''; // Return empty string if no username found
  }

  logout() {
    localStorage.removeItem('currentUser');
    console.log(`logout`);
    this.loggedInStatus.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    this.loggedInStatus.next(!!currentUser);
  }

  registerUser(userData: any): Observable<any> {
    const url = `${this.api_url}accounts/api/register/`;
    return this.http.post(url, userData);
  }
}
