import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";
import { User } from "src/types";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  user: User | null = null;
  user$: Observable<User | null>;
  temp: any;

  constructor(
    private nav: NavBarService,
    private store: Store<{ user: User | null }>
  ) {
    this.user$ = store.select("user");
  }

  ngOnInit(): void {
    this.nav.hide();
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isAuth() {
    return this.user !== null;
  }
}
