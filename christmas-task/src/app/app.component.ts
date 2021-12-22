import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selfEstimation } from 'src/app_mocks/self-estimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['']);
    console.log(selfEstimation);
  }
}
