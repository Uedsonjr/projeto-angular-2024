import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { profileForm } from '../interfaces/ProfileForm';
import { gerarIdAleatorio } from '../validates/generateID';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<profileForm[]> {
    return this.http.get<profileForm[]>(this.api);
  }
  buscarPerfilPorId(profileId: string): Observable<profileForm> {
    return this.http.get<profileForm>(`${this.api}${profileId}`);
  }
  cadastrarPerfil(newProfile: profileForm): Observable<profileForm> {
    let {id} = newProfile;
    id = gerarIdAleatorio();
    return this.http.post<profileForm>(this.api, newProfile);
  }
  editarPerfil(updateProfile: profileForm): Observable<profileForm> {
    return this.http.put<profileForm>(`${this.api}/${updateProfile.id}`, updateProfile);
  }
  deletarProfile(profileId: string): Observable<profileForm> {
    return this.http.delete<profileForm>(`${this.api}/${profileId}`);
  }
}

