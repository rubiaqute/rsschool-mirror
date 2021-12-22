import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICard } from './../../app_models/interfaces';
import { treesImages, bgImages } from './../../app_mocks/tree-data';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
})
export class SettingsBarComponent {
  @Output() bgChoice = new EventEmitter<string>();
  @Output() treeChoice = new EventEmitter<string>();
  treesToChoose: ICard[] = [];
  bgToChoose: ICard[] = [];
  constructor() {}

  ngOnInit(): void {
    this.treesToChoose = treesImages;
    this.bgToChoose = bgImages;
  }
  returnBackground(number: string) {
    return {
      background: `url(assets/bg/${number}.jpg) center/cover no-repeat`,
    };
  }
  changeBg(num: string) {
    this.bgChoice.emit(num);
  }
  changeTree(num:string) {
    this.treeChoice.emit(num);
  }
}
