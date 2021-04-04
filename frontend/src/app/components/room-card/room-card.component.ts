import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-room-card",
  templateUrl: "./room-card.component.html",
  styleUrls: ["./room-card.component.scss"],
})
export class RoomCardComponent implements OnInit {
  @Input()
  id!: number;

  @Input()
  title!: string;

  @Input()
  description!: string;

  @Input()
  badges?: Array<string>;

  constructor() {}

  ngOnInit(): void {}

  get roomLink() {
    return `/rooms/${this.id}`;
  }
}
