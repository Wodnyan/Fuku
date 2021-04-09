import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { NavBarService } from "src/app/services/nav-bar/nav-bar.service";

type Input = "email" | "password" | "fetch";

interface ValidationError {
  input: Input;
  errors: any;
}

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  providers: [AuthService],
})
export class LoginPageComponent implements OnInit {
  credentials = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  errors: ValidationError[] = [
    { input: "password", errors: null },
    { input: "email", errors: null },
    { input: "fetch", errors: null },
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private nav: NavBarService
  ) {}

  public getErrors(input: Input): ValidationError["errors"] {
    return this.errors.find((error) => error.input === input).errors || {};
  }

  public get email() {
    return this.credentials.get("email");
  }

  public get password() {
    return this.credentials.get("password");
  }

  public async onSubmit() {
    this.errors = [
      { input: "email", errors: this.email.errors },
      { input: "password", errors: this.email.errors },
      { input: "fetch", errors: null },
    ];
    if (this.credentials.valid) {
      this.auth.login(this.credentials.value).subscribe(
        ({ accessToken }) => {
          localStorage.setItem("accessToken", accessToken);
          this.router.navigate(["/rooms"]);
        },
        (error) => {
          if (
            error.error.status === 401 &&
            error.error.message === "Invalid credentials"
          ) {
            this.errors = this.errors.map((error) => {
              if (error.input === "fetch") {
                error.errors = {
                  ...error.errors,
                  invalid: true,
                };
              }
              return error;
            });
          }
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.nav.hide();
  }
}
