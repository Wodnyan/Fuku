import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NavBarService {
  visible: boolean;

  constructor() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
