import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LandingPageComponent } from "./views/landing-page/landing-page.component";
import { SignUpPageComponent } from "./views/auth/sign-up-page/sign-up-page.component";
import { RoomsComponent } from "./views/rooms/rooms.component";
import { RoomComponent } from "./views/room/room.component";
import { LoginPageComponent } from "./views/auth/login-page/login-page.component";
import { ReviewComponent } from "./views/review/review.component";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
  },
  {
    path: "auth/sign-up",
    component: SignUpPageComponent,
  },
  {
    path: "auth/login",
    component: LoginPageComponent,
  },
  {
    path: "rooms",
    component: RoomsComponent,
  },
  {
    path: "rooms/:roomId",
    component: RoomComponent,
  },
  {
    path: "rooms/:roomId/reviews/:reviewId",
    component: ReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
