import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RoomsService } from "src/app/services/rooms/rooms.service";

@Component({
  selector: "app-search-rooms",
  templateUrl: "./search-rooms.component.html",
  styleUrls: ["./search-rooms.component.scss"],
})
export class SearchRoomsComponent implements OnInit {
  name: string = "";
  @Output() roomsEventEmitter = new EventEmitter();

  constructor(private roomsService: RoomsService) {}

  onSubmit() {
    this.roomsService
      .fetchAllRooms({
        name: this.name,
      })
      .subscribe(
        ({ rooms }) => {
          this.roomsEventEmitter.emit(rooms);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {}
}
