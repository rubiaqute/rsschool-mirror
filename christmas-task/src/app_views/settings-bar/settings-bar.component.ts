import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ICard, ISettings } from './../../app_models/interfaces';
import { treesImages, bgImages, settings } from './../../app_mocks/tree-data';

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
  settingsObject: ISettings[] = [];
  constructor() {}
  @ViewChild ('audioplayer', {static: false}) audioplayer!: ElementRef<HTMLAudioElement>
  returnSettingsIcon(svgName: string): { background: string } {
    return {
      background: `url(assets/svg/${svgName}.svg) no-repeat center`,
    };
  }
  toggle(i:number) {
    if (this.settingsObject[i].isOn == true)
      this.settingsObject[i].isOn = false;
    else this.settingsObject[i].isOn = true;
    if(i==0) this.toggleMusic();
    console.log(this.settingsObject);
  }
  toggleMusic(){
    console.log(this.audioplayer.nativeElement)
    if (this.audioplayer.nativeElement.paused) this.audioplayer.nativeElement.play()
    else this.audioplayer.nativeElement.pause();
    
  }
  
  ngOnInit(): void {
    this.treesToChoose = treesImages;
    this.bgToChoose = bgImages;
    this.settingsObject = settings;
  }
  returnBackground(number: string) {
    return {
      background: `url(assets/bg/${number}.jpg) center/cover no-repeat`,
    };
  }
  changeBg(num: string) {
    this.bgChoice.emit(num);
  }
  changeTree(num: string) {
    this.treeChoice.emit(num);
  }
}
