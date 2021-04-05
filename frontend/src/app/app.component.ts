import { Component, OnInit } from "@angular/core";
import { TokenService } from "./services/token/token.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Fuku";

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.tokenService.refreshAccessToken().subscribe(({ accessToken }) => {
      localStorage.setItem("accessToken", accessToken);
    }, console.log);
    // Every minute get a new access token
    setInterval(() => {
      this.tokenService.refreshAccessToken().subscribe(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
      }, console.log);
    }, 60000);
  }
}
