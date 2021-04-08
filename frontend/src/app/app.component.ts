import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/types";
import { AuthService } from "./services/auth/auth.service";
import { NavBarService } from "./services/nav-bar/nav-bar.service";
import { TokenService } from "./services/token/token.service";
import { addUser, removeUser } from "./state/user/user.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Fuku";

  constructor(
    private tokenService: TokenService,
    public nav: NavBarService,
    private auth: AuthService,
    private store: Store<{ user: User }>
  ) {}

  changeRoute() {
    this.auth.fetchUserInfo().subscribe(
      ({ user }) => {
        this.store.dispatch(addUser(user));
      },
      (error) => {
        this.store.dispatch(removeUser());
        console.log(error);
      }
    );
  }

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
