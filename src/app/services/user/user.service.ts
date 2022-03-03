import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

const ENDPOINT = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public create(user: User): Observable<User> {
    return this.http.post<User>(`${env.apiUrl}/${ENDPOINT}`, user);
  }

  public get(id: string): Observable<User> {
    return this.http.get<User>(`${env.apiUrl}/${ENDPOINT}/${id}`);
  }

  public list(): Observable<User[]> {
    return this.http.get<User[]>(`${env.apiUrl}/${ENDPOINT}`);
  }

  public update(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${env.apiUrl}/${ENDPOINT}/${id}`, user);
  }

  public delete(id: string): Observable<User> {
    return this.http.delete<User>(`${env.apiUrl}/${ENDPOINT}/${id}`);
  }
}
