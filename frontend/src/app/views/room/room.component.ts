import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CodeReviewsService } from "src/app/services/code-reviews/code-reviews.service";
import { RoomsService } from "src/app/services/rooms/rooms.service";
import { Review, Room } from "src/types";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"],
})
export class RoomComponent implements OnInit {
  room?: Room;
  codeReviews?: Review[] | [];

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private codeReviewService: CodeReviewsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ roomId }) => {
      this.roomsService.fetchOneRoom(roomId).subscribe(({ room }) => {
        console.log(room);
        this.room = room;
      });
      this.codeReviewService.getAllCodeReviews(roomId).subscribe(
        ({ codeReviews }) => {
          console.log("Code Reviews", codeReviews);
          this.codeReviews = codeReviews;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}