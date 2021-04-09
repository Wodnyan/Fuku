import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CodeReviewsService } from "src/app/services/code-reviews/code-reviews.service";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";
import { Review } from "src/types";
import { format } from "timeago.js";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit, OnDestroy {
  public reviewId: number;
  public roomId: number;
  public codeReview: Review;
  public isLoading = true;
  private timeoutIds: Array<any> = [];

  constructor(
    private codeReviewService: CodeReviewsService,
    private nav: NavBarService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    clearTimeout(...this.timeoutIds);
  }

  private delayIsLoading() {
    const id = setTimeout(() => {
      this.isLoading = false;
    }, 200);
    this.timeoutIds.push(id);
  }

  ngOnInit(): void {
    this.nav.show();
    this.route.params.subscribe(({ reviewId, roomId }) => {
      this.reviewId = reviewId;
      this.roomId = roomId;
      this.codeReviewService.getOneCodeReview(roomId, reviewId).subscribe(
        (data) => {
          this.codeReview = data.codeReview;
          this.delayIsLoading();
        },
        (error) => {
          console.log(error);
          this.delayIsLoading();
        }
      );
    });
  }

  get createdAt() {
    return format(this.codeReview?.createdAt);
  }
}
