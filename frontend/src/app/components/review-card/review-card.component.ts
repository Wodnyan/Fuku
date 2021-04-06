import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Review } from "src/types";
import { format } from "timeago.js";

@Component({
  selector: "app-review-card",
  templateUrl: "./review-card.component.html",
  styleUrls: ["./review-card.component.scss"],
})
export class ReviewCardComponent implements OnInit {
  @Input()
  review!: Review;

  numberOfComment = 15;

  roomId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params.roomId;
    });
  }

  get createdAt() {
    return format(new Date(this.review.createdAt));
  }

  get reviewLink() {
    return `/rooms/${this.roomId}/reviews/${this.review.id}`;
  }
}
