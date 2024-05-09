import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InforService {
private name$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
private email$ = new BehaviorSubject<string>("");

  constructor() { }
  public getRole(){
    return this.role$.asObservable();
  }

  public setRole(role:string){
    this.role$.next(role);
  }

  public getName(){
    return this.name$.asObservable();
  }

  public setName(name:string){
    this.name$.next(name);
  }

  public getEmail(){
    return this.email$.asObservable();
  }

  public setEmail(email:string){
    this.email$.next(email);
  }
}
