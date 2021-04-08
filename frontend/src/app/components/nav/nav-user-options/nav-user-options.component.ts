import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/types";

@Component({
  selector: "app-nav-user-options",
  templateUrl: "./nav-user-options.component.html",
  styleUrls: ["./nav-user-options.component.scss"],
})
export class NavUserOptionsComponent implements OnInit {
  public showOptions = false;
  @Input()
  user: User | null;

  ngOnInit(): void {}

  get avatar() {
    return this.user?.avatarUrl || "/assets/avatar.jpg";
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
}
