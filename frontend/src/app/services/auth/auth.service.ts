import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";
import { Tokens, User } from "../../../types";

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(
    credentials: SignUpCredentials
  ): Observable<{ accessToken: keyof Tokens }> {
    return this.http.post<any>(
      `${API_V1_ENDPOINT}/auth/register`,
      credentials,
      {
        withCredentials: true,
      }
    );
  }

  login(credentials: LoginCredentials): Observable<{ accessToken: string }> {
    return this.http.post<any>(`${API_V1_ENDPOINT}/auth/login`, credentials, {
      withCredentials: true,
    });
  }

  fetchUserInfo(): Observable<{ user?: User }> {
    return this.http.get(`${API_V1_ENDPOINT}/auth/check`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
}
