import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_V1_ENDPOINT } from "src/constants";

interface RoomDetails {
  name: string;
  code: string;
}

@Injectable({
  providedIn: "root",
})
export class RoomsService {
  private API_ENDPOINT = `${API_V1_ENDPOINT}/rooms`;

  constructor(private http: HttpClient) {}

  fetchAllRooms(): Observable<any> {
    return this.http.get(this.API_ENDPOINT);
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
