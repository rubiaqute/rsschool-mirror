import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  backgroundImage: { background: string } = { background: '1' };
  imageTree: string = '';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.backgroundImage = this.returnBackground('1');
    this.imageTree = this.returnTreeImage('1');
  }
  returnBackground(num: string): { background: string } {
    return {
      background: `url(assets/bg/${num}.jpg) center/cover no-repeat `,
    };
  }
  returnTreeImage(num: string): string {
    return `assets/tree/${num}.png`;
  }
  rewriteBg(num: string):void {
    this.backgroundImage = this.returnBackground(num);
  }
  rewriteTree(num: string):void {
    this.imageTree = this.returnTreeImage(num)
  }
}
