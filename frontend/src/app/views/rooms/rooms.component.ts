import { Component, OnInit } from "@angular/core";
import { RoomsService } from "src/app/services/rooms/rooms.service";
import { Room } from "src/types";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] | [];
  createRoomOverlay = false;

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.fetchAllRooms().subscribe(
      (data) => {
        console.log(data.rooms);
        this.rooms = data.rooms;
      },
      (error) => console.log(error)
    );
  }

  toggleCreateRoomOverlay() {
    this.createRoomOverlay = !this.createRoomOverlay;
  }
}
