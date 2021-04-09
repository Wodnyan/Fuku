import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";
import { Review } from "src/types";

interface PostData {
  title: string;
  description: string;
  code: string;
}

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

  getOneCodeReview(
    roomId: number,
    reviewId
  ): Observable<{ codeReview: Review }> {
    return this.http.get<{ codeReview: Review }>(
      this.apiEndpoint(roomId, reviewId)
    );
  }

  postCodeReview(roomId: number, data: PostData) {
    return this.http.post<{ codeReview: Review }>(
      this.apiEndpoint(roomId),
      data,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  }
}
