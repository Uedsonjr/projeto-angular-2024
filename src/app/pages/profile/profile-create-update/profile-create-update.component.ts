import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { profileForm } from 'src/app/interfaces/ProfileForm';
import { ProfilesChanges, ValidateInputs } from 'src/app/validates/validateprofile';

@Component({
  selector: 'app-profile-create-update',
  templateUrl: './profile-create-update.component.html',
  styleUrls: ['./profile-create-update.component.css']
})
export class ProfileCreateUpdateComponent implements OnInit {
  constructor(
    private profileService: ProfileService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  profileForm: profileForm = {
    name: '',
    id: '',
    role: '',
    age: NaN,
    email: '',
    isActive: false,
    country: '',
    experience: '',
  };

  isEdit: boolean = false;

  oldProfileForm: profileForm = {
    id: '',
    name: '',
    role: '',
    age: 0,
    email: ''
  };

  isProfileOld: boolean = true;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.profileForm.name = params["name"];
        this.profileForm.age = params["age"];
        this.profileForm.country = params["country"];
        this.profileForm.email = params["email"];
        this.profileForm.role = params["role"];
        this.profileForm.id = params["id"]; 
        this.profileForm.experience = params["experience"];
        this.profileForm.isUpdate = params["isUpdate"]
    });
    const profileId = this.route.snapshot.paramMap.get('id');
    if (profileId) {
      this.isEdit = true;
      this.buscarPerfilPorId(profileId);
    }
  }

  get isUpdate() { 
    return this.profileForm.isUpdate;
  }

  onProfileChange() {
    this.isProfileOld = ProfilesChanges(this.oldProfileForm, this.profileForm);
  }

  cadastrarPerfil(profile: profileForm) {
    this.profileService.cadastrarPerfil(profile).subscribe((newProfile: profileForm) => {
      Swal.fire('Perfil criado com sucesso!', '', 'success').then(() => {
        this.router.navigate(['/profile']);
      });
    }, error => {
      Swal.fire('Erro ao criar perfil!', error.message, 'error');
    });
  }

  buscarPerfilPorId(profileId: string) {
    this.profileService.buscarPerfilPorId(profileId).subscribe((profile: profileForm) => {
      this.profileForm = profile;
      this.oldProfileForm = { ...profile };
    }, error => {
      Swal.fire('Erro ao buscar perfil!', error.message, 'error');
    });
  }

  editarPerfil(updateProfile: profileForm) {
    console.log('chamou aqui tbm');
     
    if (!updateProfile) 
      return; 
    this.profileForm = updateProfile; 
    console.log(`Profile: ${this.profileForm}`);
    
    return this.profileService.editarPerfil(updateProfile)
      .subscribe(updated => {
        console.log('Perfil atualizado:', updated);
        this.profileForm = updated;
        Swal.fire('Perfil atualizado com sucesso!', '', 'success').then(() => {
          this.router.navigate(['/profiles']);
        });
      }, error => {
        Swal.fire('Erro ao atualizar perfil!', error.message, 'error');
      });
  }

  onSubmit() {
    console.log('Submetendo formulário:', this.profileForm);
    if (!ValidateInputs(this.profileForm)) {
      return;
    }

    if (this.profileForm.isUpdate) { 
      this.editarPerfil(this.profileForm);
      return;
    }

    if (this.isEdit) {
      if (!this.isProfileOld) {
        Swal.fire({
          title: "Você quer realmente atualizar?",
          showDenyButton: true,
          confirmButtonText: "Sim",
          denyButtonText: `Não`
        }).then((result) => {
          if (result.isConfirmed) {
            this.editarPerfil(this.profileForm);
          }
        });
      } else {
        this.editarPerfil(this.profileForm);
      }
    } else {
      this.cadastrarPerfil(this.profileForm);
    }
  }
}
