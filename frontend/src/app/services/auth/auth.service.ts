import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";
import { Tokens } from "../../../types";

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
      `${API_V1_ENDPOINT}/users/register`,
      credentials,
      {
        withCredentials: true,
      }
    );
  }
}
