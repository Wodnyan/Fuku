import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingPageComponent } from "./views/landing-page/landing-page.component";
import { SignUpPageComponent } from "./views/auth/sign-up-page/sign-up-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PasswordInputComponent } from "./components/password-input/password-input.component";
import { RoomsComponent } from "./views/rooms/rooms.component";
import { RoomCardComponent } from "./components/room-card/room-card.component";
import { RoomComponent } from './views/room/room.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
