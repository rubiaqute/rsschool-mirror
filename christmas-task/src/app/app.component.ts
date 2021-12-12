import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public hideStartPage:boolean =true;
  hide() {
    this.hideStartPage = false;
  }
  @HostListener('window:popstate') onPopState() {
    this.hideStartPage = true;
  }
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate([''])
  }
}
