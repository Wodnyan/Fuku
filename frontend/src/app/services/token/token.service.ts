import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(private http: HttpClient) {}

  refreshAccessToken(): Observable<any> {
    return this.http.get(`${API_V1_ENDPOINT}/tokens/access-token/refresh`, {
      withCredentials: true,
    });
  }
}
