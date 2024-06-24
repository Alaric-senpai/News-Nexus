import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { passwordMatchValidator } from '../../shared/passwordmatch.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerform!: FormGroup;

  constructor(private formbuilder: FormBuilder, private authservice: AuthService, private router:Router){
    this.registerform = this.formbuilder.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    },
    {
      validators: passwordMatchValidator
    })
  }

  get fullname(){
    return this.registerform.controls['fullname'];
  }

  get email(){
    return this.registerform.controls['email'];
  }

  get password(){
    return this.registerform.controls['password'];
  }

  get cpassword(){
    return this.registerform.controls['cpassword'];
  }

  registeruser() {
    const submitdata = { ...this.registerform.value };
    delete submitdata.cpassword;
    this.authservice.registeruser(submitdata).subscribe({
      next: (response) => {
        console.log(response);
        // this.router.navigate(['/login']), { queryParams}
        this.router.navigate(['/login'], { queryParams: { message: 'Registration successful! Please log in.' } });

      },
      error: (error) => {console.error(error);
      this.router.navigate(['/login'], { queryParams: { message: 'Something went wrong . try again' } });
      }
    });
  }
}
