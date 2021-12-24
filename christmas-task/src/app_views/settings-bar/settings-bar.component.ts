import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { ICard, ISettings } from './../../app_models/interfaces';
import { treesImages, bgImages, settings } from './../../app_mocks/tree-data';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
})
export class SettingsBarComponent {
  @Input() treeForDrop!:HTMLElement
  @Output() bgChoice = new EventEmitter<string>();
  @Output() treeChoice = new EventEmitter<string>();
  interval:ReturnType<typeof setInterval>=setInterval(this.createSnowflakes,100)
  treesToChoose: ICard[] = [];
  bgToChoose: ICard[] = [];
  settingsObject: ISettings[] = [];
  constructor() {
    console.log(this.treeForDrop)
  }
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
    if(i==1) this.toggleSnow(this.settingsObject[i].isOn);
    console.log(this.settingsObject);
  }
  toggleMusic(){
    if (this.audioplayer.nativeElement.paused) this.audioplayer.nativeElement.play()
    else this.audioplayer.nativeElement.pause();
    
  }
  toggleSnow(flag:boolean){
    console.log(flag)
    if (flag) this.interval = setInterval(this.createSnowflakes,100)
    else clearInterval(this.interval);
     
      }
  createSnowflakes(){
    const snowFlake =new Image();
    snowFlake.src='assets/svg/snowflake.svg';
    const tree:HTMLElement=document.getElementById('mainTree')!;
    tree.append(snowFlake)
    snowFlake.style.animation="fall linear forwards"
    snowFlake.style.position="absolute";
    snowFlake.style.top="-20%";
    snowFlake.style.animationDuration=(Math.random()*4+1)+ 's'
    snowFlake.style.opacity=String(Math.random());
    const dimension=Math.random()*3+1+'rem';
    snowFlake.style.width=dimension;
    snowFlake.style.height=dimension;
    // snowFlake.classList.add("fa-snowflake");
    snowFlake.style.left=Math.random()*tree.offsetWidth+ 'px';
       setTimeout(()=>{
         snowFlake.remove()
       },3000)
  }
  
  ngOnInit(): void {
    this.treesToChoose = treesImages;
    this.bgToChoose = bgImages;
    this.settingsObject = settings;
    clearInterval(this.interval)
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
