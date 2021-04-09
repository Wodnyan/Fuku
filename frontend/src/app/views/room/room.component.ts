import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CodeReviewsService } from "src/app/services/code-reviews/code-reviews.service";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";
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
  openCreateCodeReview = false;

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private codeReviewService: CodeReviewsService,
    private nav: NavBarService
  ) {}

  toggleOpenCreateCodeReview() {
    this.openCreateCodeReview = !this.openCreateCodeReview;
  }

  onNewRoom(item: Review) {
    this.codeReviews = [item, ...this.codeReviews];
    this.openCreateCodeReview = false;
  }

  ngOnInit(): void {
    this.nav.show();
    this.route.params.subscribe(({ roomId }) => {
      this.roomsService.fetchOneRoom(roomId).subscribe(({ room }) => {
        this.room = room;
      });
      this.codeReviewService.getAllCodeReviews(roomId).subscribe(
        ({ codeReviews }) => {
          this.codeReviews = codeReviews;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
