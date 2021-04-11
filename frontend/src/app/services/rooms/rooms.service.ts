import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";

interface RoomDetails {
  name: string;
  description: string;
}
interface FetchAllParams {
  orderBy?: "asc" | "desc";
  limit?: number;
  skip?: number;
  name?: string;
}

@Injectable({
  providedIn: "root",
})
export class RoomsService {
  private API_ENDPOINT = `${API_V1_ENDPOINT}/rooms`;

  constructor(private http: HttpClient) {}

  fetchAllRooms(params?: FetchAllParams): Observable<any> {
    let temp = new HttpParams();

    if (params !== undefined) {
      temp = params.name ? temp.append("name", params.name) : temp;
      temp = params.skip ? temp.append("skip", params.skip.toString()) : temp;
      temp = params.limit
        ? temp.append("limit", params.limit.toString())
        : temp;
      temp = params.orderBy ? temp.append("orderBy", params.orderBy) : temp;
    }

    return this.http.get(this.API_ENDPOINT, {
      params: temp,
    });
  }

  fetchOneRoom(id: number): Observable<any> {
    return this.http.get(`${this.API_ENDPOINT}/${id}`);
  }

  postRoom(roomDetails: RoomDetails): Observable<any> {
    return this.http.post(this.API_ENDPOINT, roomDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
}
