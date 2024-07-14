import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent {

  constructor(private profileService: ProfileService, private router: Router) {}
  
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    age: new FormControl(0, [Validators.required, Validators.min(0)])
    
  });

  onSubmit() {
    const profile = this.profileForm.value;
    console.log(profile)
    this.profileService.cadastrarPerfil(this.profileForm).subscribe(result => {
      console.log(result)
      Swal.fire({
        title: 'Cadastro realizado com sucesso!',
        text: 'Pessoa inserida ao banco.',
        icon: 'success',
      })
      this.router.navigateByUrl('/profile')
    });
  }
}
