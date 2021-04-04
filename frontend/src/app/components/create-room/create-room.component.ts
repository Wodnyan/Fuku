import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { RoomsService } from "src/app/services/rooms/rooms.service";

@Component({
  selector: "app-create-room",
  templateUrl: "./create-room.component.html",
  styleUrls: ["./create-room.component.scss"],
})
export class CreateRoomComponent implements OnInit {
  roomDetails = new FormGroup({
    name: new FormControl(""),
    code: new FormControl(""),
  });

  constructor(private roomsService: RoomsService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.roomsService
      .postRoom({
        code: this.roomDetails.get("code").value,
        name: this.roomDetails.get("name").value,
      })
      .subscribe(
        ({ room: { id } }) => {
          this.router.navigate([`/rooms/${id}`]);
        },
        (error) => console.log(error)
      );
  }
}
