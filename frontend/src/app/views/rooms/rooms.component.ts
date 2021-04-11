import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";
import { RoomsService } from "src/app/services/rooms/rooms.service";
import { Room, User } from "src/types";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] | [] = [];

  user$: Observable<User | null>;
  isAuth = false;

  createRoomOverlay = false;

  constructor(
    private roomsService: RoomsService,
    private nav: NavBarService,
    public store: Store<{ user: User | null }>
  ) {
    this.user$ = store.select("user");
  }

  onRoomSearch(rooms: any) {
    this.rooms = rooms;
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.isAuth = user ? true : false;
    });
    this.nav.show();
    this.roomsService.fetchAllRooms().subscribe(
      (data) => {
        this.rooms = data.rooms;
      },
      (error) => console.log(error)
    );
  }

  toggleCreateRoomOverlay() {
    this.createRoomOverlay = !this.createRoomOverlay;
  }
}
