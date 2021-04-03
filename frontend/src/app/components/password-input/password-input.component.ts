import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-password-input",
  templateUrl: "./password-input.component.html",
  styleUrls: ["./password-input.component.scss"],
})
export class PasswordInputComponent implements OnInit {
  @Input()
  errors: any;

  @Input()
  password!: string;

  @Input()
  formGroup: FormGroup;

  showPassword = false;

  constructor() {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
