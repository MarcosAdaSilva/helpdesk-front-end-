import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Credenciais } from "src/app/models/credenciais";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  creds: Credenciais = {
    email: "",
    senha: "",
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logar() {
    this.service
      .authenticate(this.creds)
      .subscribe((resposta: { headers: { get: (arg0: string) => string } }) => {
        this.service.successfulLogin(
          resposta.headers.get("authorizaton").substring(7)
        );
        this.router.navigate([""]);
      });
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
