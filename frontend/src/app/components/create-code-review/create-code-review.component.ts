import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CodeReviewsService } from "src/app/services/code-reviews/code-reviews.service";

@Component({
  selector: "app-create-code-review",
  templateUrl: "./create-code-review.component.html",
  styleUrls: ["./create-code-review.component.scss"],
})
export class CreateCodeReviewComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>();

  codeReviewData = new FormGroup({
    title: new FormControl(""),
    code: new FormControl(""),
    description: new FormControl(""),
  });

  constructor(
    private codeReviewService: CodeReviewsService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.codeReviewData.value);
    this.routes.params.subscribe((params) => {
      this.codeReviewService
        .postCodeReview(params.roomId, this.codeReviewData.value)
        .subscribe(
          (data) => console.log(data),
          (error) => console.log(error)
        );
    });
    // this.codeReviewService.
  }

  closeOverlay() {
    this.closeEvent.emit(true);
  }
}
