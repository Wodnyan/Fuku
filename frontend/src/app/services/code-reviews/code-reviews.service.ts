import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";

@Injectable({
  providedIn: "root",
})
export class CodeReviewsService {
  private apiEndpoint(roomId: number, codeReviewId?: number) {
    return `${API_V1_ENDPOINT}/rooms/${roomId}/code-reviews/${
      codeReviewId || ""
    }`;
  }

  constructor(private http: HttpClient) {}

  getAllCodeReviews(roomId: number): Observable<any> {
    const endpoint = this.apiEndpoint(roomId);
    return this.http.get(endpoint);
  }
}
