import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import Swal from 'sweetalert2';
import { ProfileCreateUpdateComponent } from '../profile-create-update/profile-create-update.component';
import { profileForm } from 'src/app/interfaces/ProfileForm';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent implements OnInit {
  @ViewChild('profile')
  profileCreate!: ProfileCreateUpdateComponent;
  p: profileForm = {
    id: '',
    name: '',
    role: '',
    age: 0,
    email: ''
  };
  isEdited: boolean = false;
  profiles: profileForm[] = [];
  keys: string[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.buscarTodos()
      .subscribe((profiles: profileForm[]) => {
        this.profiles = profiles.map(this.normalizeProfile);
        this.keys = this.extractKeys(profiles);
    });
  }

  editar($event: profileForm) { 
    this.isEdited = true;
    if ($event) { 
      this.p = $event;
      this.profileCreate.editarPerfil($event);
    } 

  }

  private normalizeProfile(profile: profileForm): profileForm {
    return {
      ...profile,
      email: profile.email || 'REQUIRED',
      name: profile.name || 'REQUIRED',
      role: profile.role || 'REQUIRED',
      isActive: profile.isActive || false,
      isUpdate: true,
    };
  }

  private extractKeys(profiles: profileForm[]): string[] {
    if (profiles.length === 0) return [];
    const keys = Object.keys(profiles[0])
      .map(key => key.charAt(0).toUpperCase() + key.slice(1))
      .map(key => key === 'Id' ? '#' : key)
      .map(key => key === 'IsActive' ? 'Active' : key);
    return keys;
  }

  deleteProfile(profileId: string) {
    const profile = this.profiles.find(profile => profile.id === profileId);

    if (!profile) return;

 Swal.fire({
      title: `Tem certeza que quer deleta o perfil: ${profile.name}?`,
      text: 'Não será possível retornar ao estado anterior!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4172d6',
      cancelButtonColor: '#d45',
      confirmButtonText: 'Eu desejo deletar!',
    }).then((result) => {
      if (!result.isDismissed) {

        this.profileService.deletarProfile(profileId).subscribe(() => {
          this.profiles = this.profiles.filter(profile => profile.id !== profileId);
          
          Swal.fire({
            title: 'Excluído com sucesso!',
            text: `Você excluiu o perfil: ${profile.name}.`,
            icon: 'success',
          });
        });
      }
    });
  }
}
