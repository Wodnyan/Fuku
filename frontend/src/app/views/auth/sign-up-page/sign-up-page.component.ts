import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

type Input = "username" | "email" | "password";

interface ValidationError {
  input: Input;
  errors: any;
}

@Component({
  selector: "app-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.scss"],
  providers: [AuthService],
})
export class SignUpPageComponent implements OnInit {
  credentials = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.maxLength(100),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.maxLength(320),
      // Email validation pattern
      Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.maxLength(120),
    ]),
  });
  errors: ValidationError[] = [
    { input: "username", errors: null },
    { input: "password", errors: null },
    { input: "email", errors: null },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  public get username() {
    return this.credentials.get("username");
  }

  public get email() {
    return this.credentials.get("email");
  }

  public get password() {
    return this.credentials.get("password");
  }

  public getErrors(input: Input): ValidationError["errors"] {
    return this.errors.find((error) => error.input === input).errors || {};
  }

  private isErrorsEmpty() {
    return this.errors.every((error) => error.errors === null);
  }

  public async onSubmit() {
    this.errors = [
      { input: "password", errors: this.password.errors },
      { input: "username", errors: this.username.errors },
      { input: "email", errors: this.email.errors },
    ];
    console.log(this.credentials.value);
    if (this.isErrorsEmpty()) {
      this.auth.signUp(this.credentials.value).subscribe(
        ({ accessToken }) => {
          localStorage.setItem("accessToken", accessToken);
          this.router.navigate(["/"]);
        },
        ({ error }) => {
          const isEmailInvalid = error.errors?.some((error: string) => {
            return error.toLowerCase().includes("email");
          });
          if (error.status === 400 && isEmailInvalid) {
            this.errors = this.errors.map((error) => {
              if (error.input === "email") {
                return {
                  input: "email",
                  errors: {
                    pattern: true,
                  },
                };
              }
              return error;
            });
            // Username or Email taken
          } else if (error.status === 409) {
            if (error.message.toLowerCase().includes("email")) {
              this.errors = this.errors.map((error) => {
                if (error.input === "email") {
                  error.errors = {
                    notUnique: true,
                  };
                }
                return error;
              });
            } else {
              this.errors = this.errors.map((error) => {
                if (error.input === "username") {
                  error.errors = {
                    notUnique: true,
                  };
                }
                return error;
              });
            }
          }
        }
      );
    }
  }

  ngOnInit(): void {}
}
