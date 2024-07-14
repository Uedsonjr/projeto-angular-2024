import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TipoPerfil } from '../interfaces/tipo.perfil';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<TipoPerfil[]> {
    return this.http.get<TipoPerfil[]>(this.api);
  }
  cadastrarPerfil(newProfile: TipoPerfil): Observable<TipoPerfil> {
    return this.http.post<TipoPerfil>(this.api, newProfile);
  }
  editarPerfil(updateProfile: TipoPerfil): Observable<TipoPerfil> {
    return this.http.put<TipoPerfil>(`${this.api}${updateProfile.id}`, updateProfile);
  }
  deletarProfile(profileId: string): Observable<TipoPerfil> {
    return this.http.delete<TipoPerfil>(`${this.api}${profileId}`);
  }
}

