import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  alertMessage: string|null = null;
  constructor(private formbuilder: FormBuilder, private route: ActivatedRoute, private router: Router, 
    private authService: AuthService
  ){
    this.loginform = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params =>{
      this.alertMessage = params['message']|| null;
      });
  }

  get email(){
    return this.loginform.controls['email'];
  }
  get password(){
    return this.loginform.controls['password'];
  }
  dismissAlert(): void{
    this.alertMessage = null;
  }

  userlogin(){
    const {email, password} = this.loginform.value;

    this.authService.getUserByEmail(email).subscribe(
    (response) =>{
      if(response.length > 0 && response[0].password === password){
        sessionStorage.setItem('email', email);
        this.router.navigate(['/home'])
      }else{
      this.router.navigate(['/login'], { queryParams: { message: 'Incorrect password or email' } });

      }
    },
    error => {
      this.router.navigate(['/login'], { queryParams: { message: 'incorrect password or email' } });

    }
    )

  }
}
