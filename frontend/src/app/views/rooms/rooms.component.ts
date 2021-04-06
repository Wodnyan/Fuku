import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";
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
  isAuth = false;

  constructor(
    private roomsService: RoomsService,
    private auth: AuthService,
    private nav: NavBarService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    this.auth.getUserInfo().subscribe(
      () => {
        this.isAuth = true;
      },
      (error) => {
        console.log(error);
        this.isAuth = false;
      }
    );
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
