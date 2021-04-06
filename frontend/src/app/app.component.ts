import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavBarService } from "./services/nav-bar/nav-bar.service";
import { TokenService } from "./services/token/token.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Fuku";

  constructor(private tokenService: TokenService, public nav: NavBarService) {}

  ngOnInit() {
    this.tokenService.refreshAccessToken().subscribe(({ accessToken }) => {
      localStorage.setItem("accessToken", accessToken);
    }, console.log);
    // Every 10 minutes get a new access token
    setInterval(() => {
      this.tokenService.refreshAccessToken().subscribe(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
      }, console.log);
    }, 600000);
  }
}
