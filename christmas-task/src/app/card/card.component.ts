// import {Component, OnInit, Input} from '@angular/core';
// // import { Card } from '../app.component';


// @Component({
//   selector: 'app-card',
//   templateUrl: './card.componenent.html',
//   styleUrls: ['./card.component.scss'],
// })

// export class CardComponent implements OnInit {
//   @Input() card: Card = {
//     title:'',
//     text:''
//   }
//   @Input() index: number | undefined;
//   cardDate: Date = new Date();
  
//   // title: string = 'My Card Title'
//   // text: string = 'My simple text'
//   number = 42
//   imgUrl: string = 'https://img1.pnghut.com/0/12/2/J7tA0RX6PL/logo-directive-data-binding-web-application-brand.jpg'
//   disabled:boolean = false;
//   textColor:string = 'black'
//   getInfo(): string {
//     return 'This is my info'
//   }
//   changeTitle() {
//     this.card.title = "This title has been changed"
//   }
//   inputHandler(value: any) {
//     this.card.title = value
//   }
//   changeHandler() {
//     console.log(this.card.title)
//   }
//   ngOnInit(): void {
//     setTimeout ( () => {
//       this.imgUrl = 'https://pluspng.com/img-png/angular-logo-png-javascript-logo-png-img-512-512-free-transparent-900x520.jpg'
//       this.disabled = true;
    
//     }, 3000)
    
//   }
// }