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

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(
    credentials: SignUpCredentials
  ): Observable<{ accessToken: keyof Tokens }> {
    return this.http.post<any>(
      `${API_V1_ENDPOINT}/users/auth/register`,
      credentials,
      {
        withCredentials: true,
      }
    );
  }

  getUserInfo(): Observable<{ user?: User }> {
    console.log(localStorage.getItem("accessToken"));
    return this.http.get(`${API_V1_ENDPOINT}/users/auth/check`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
}
