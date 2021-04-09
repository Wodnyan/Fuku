import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";
import { User } from "src/types";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  public user: User | null = null;
  public user$: Observable<User | null>;
  public navMobileMenu = false;

  constructor(
    public nav: NavBarService,
    private store: Store<{ user: User | null }>
  ) {
    this.user$ = store.select("user");
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isAuth() {
    return this.user !== null;
  }

  toggleNavMobileMenu() {
    this.navMobileMenu = !this.navMobileMenu;
  }
}
