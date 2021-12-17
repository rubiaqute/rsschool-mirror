import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-storage-service',
  templateUrl: './storage-service.component.html',
  styleUrls: ['./storage-service.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class StorageServiceComponent {

  constructor() { }
  setObject(key:string, object:{}):void{
    try{
    localStorage.setItem(`${key}Rubiaqute`, JSON.stringify(object));
    } catch (e){
      console.log('Error saving data to localStorage')
    }
  }
  getObject(key:string) {
    try{
    return JSON.parse(localStorage.getItem(`${key}Rubiaqute`)!)
    } catch(e){
      console.log('Error getting data from localStorage')
      return null;
    }
  
  }

}
