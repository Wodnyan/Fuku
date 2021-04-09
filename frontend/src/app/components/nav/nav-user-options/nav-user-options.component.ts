import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { User } from "src/types";

@Component({
  selector: "app-nav-user-options",
  templateUrl: "./nav-user-options.component.html",
  styleUrls: ["./nav-user-options.component.scss"],
  host: {
    "(document:click)": "onClick($event)",
  },
})
export class NavUserOptionsComponent implements OnInit {
  @Input()
  user: User | null;

  public showOptions = false;

  constructor(private _eref: ElementRef) {}

  onClick(event: MouseEvent) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showOptions = false;
    }
  }
  ngOnInit(): void {}

  get avatar() {
    return this.user?.avatarUrl || "/assets/avatar.jpg";
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
}
