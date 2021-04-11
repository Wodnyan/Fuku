import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingPageComponent } from "./views/landing-page/landing-page.component";
import { SignUpPageComponent } from "./views/auth/sign-up-page/sign-up-page.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PasswordInputComponent } from "./components/password-input/password-input.component";
import { RoomsComponent } from "./views/rooms/rooms.component";
import { RoomCardComponent } from "./components/room-card/room-card.component";
import { RoomComponent } from "./views/room/room.component";
import { CreateRoomComponent } from "./components/create-room/create-room.component";
import { CreateCodeReviewComponent } from "./components/create-code-review/create-code-review.component";
import { ReviewCardComponent } from "./components/review-card/review-card.component";
import { NavComponent } from "./components/nav/nav.component";
import { NavUserOptionsComponent } from "./components/nav/nav-user-options/nav-user-options.component";
import { userReducer } from "./state/user/user.reducer";
import { LoginPageComponent } from "./views/auth/login-page/login-page.component";
import { ReviewComponent } from "./views/review/review.component";
import { SearchRoomsComponent } from "./components/search-rooms/search-rooms.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpPageComponent,
    PasswordInputComponent,
    RoomsComponent,
    RoomCardComponent,
    RoomComponent,
    CreateRoomComponent,
    CreateCodeReviewComponent,
    ReviewCardComponent,
    NavComponent,
    NavUserOptionsComponent,
    LoginPageComponent,
    ReviewComponent,
    SearchRoomsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighlightModule,
    FormsModule,
    StoreModule.forRoot(
      {
        user: userReducer,
      },
      {}
    ),
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import("highlight.js"),
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
