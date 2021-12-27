import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { ICard, ISettings } from './../../app_models/interfaces';
import {
  treesImages,
  bgImages,
  settings,
  garlandColors,
} from './../../app_mocks/tree-data';
import { GarlandComponent } from '../garland/garland.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';
import { TreeComponent } from './../../app_pages/tree/tree.component';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
  providers: [GarlandComponent],
})
export class SettingsBarComponent {
  @Input() treeForDrop!: HTMLElement;
  //transmit choosed settings:bg, tree, garland color, garland switch, input
  @Output() bgChoice = new EventEmitter<string>();
  @Output() treeChoice = new EventEmitter<string>();
  @Output() garlandSwitch = new EventEmitter<boolean>();
  @Output() garLandColorChoice = new EventEmitter<string>();
  @Output() justChangeGarLandColor = new EventEmitter<string>();
  @Output() congratsWritten = new EventEmitter<string>();
  congratsInput: string = 'С Новым Годом!';
  interval: ReturnType<typeof setInterval> = setInterval(
    this.createSnowflakes,
    100
  ); //interval for snowflakes to clean if snow toggle is saved as ON
  garlandColorChoosed: string = '';
  garlandIsOn: boolean = false;
  garlandColors: string[] = [];
  treesToChoose: ICard[] = [];
  bgToChoose: ICard[] = [];
  settingsObject: ISettings[] = []; //include music and snowflake

  @ViewChild('audioplayer', { static: false })
  audioplayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private storageService: StorageServiceComponent,
    private mainPage: TreeComponent
  ) {}
  ngOnInit(): void {
    this.treesToChoose = treesImages;
    this.bgToChoose = bgImages;
    this.settingsObject = this.updateSettingsObject();
    clearInterval(this.interval);
    this.garlandColors = garlandColors;
    this.garlandIsOn = this.updateGarlandSwitch();
    this.garlandColorChoosed = this.updateGarlandColor();
    this.garlandSwitch.emit(this.garlandIsOn);
    this.justChangeGarLandColor.emit(this.garlandColorChoosed); //this transmition only if color is saved
    this.toggleSnow(this.settingsObject[1].isOn);
    this.checkMusic(); //turn on the music if such toggled is saved as ON after first click
    this.congratsWritten.emit(this.congratsInput);
  }

  checkMusic() {
    if (this.settingsObject[0].isOn)
      document.addEventListener('click', () => this.toggleMusic(), {
        once: true,
      });
  }
  returnSettingsIcon(svgName: string): { background: string } {
    return {
      background: `url(assets/svg/${svgName}.svg) no-repeat center`,
    };
  }
  updateGarlandSwitch() {
    if (this.storageService.getObject('garlandSwitch'))
      return this.storageService.getObject('garlandSwitch');
    else return false;
  }
  updateGarlandColor() {
    if (this.storageService.getObject('garlandColor'))
      return this.storageService.getObject('garlandColor');
    else return this.garlandColors[0];
  }
  updateSettingsObject() {
    if (this.storageService.getObject('christmasTreeSettings'))
      return this.storageService.getObject('christmasTreeSettings');
    else return settings;
  }
  //for toggling music and snow
  toggle(i: number) {
    if (this.settingsObject[i].isOn == true)
      this.settingsObject[i].isOn = false;
    else this.settingsObject[i].isOn = true;
    this.storageService.setObject('christmasTreeSettings', this.settingsObject);
    if (i == 0) this.toggleMusic();
    if (i == 1) this.toggleSnow(this.settingsObject[i].isOn);
    console.log(this.settingsObject);
  }
  toggleMusic() {
    if (this.audioplayer.nativeElement.paused)
      this.audioplayer.nativeElement.play();
    else this.audioplayer.nativeElement.pause();
  }
  toggleSnow(flag: boolean) {
    if (flag)
      this.interval = setInterval(() => {
        this.createSnowflakes();
      }, 100);
    else {
      clearInterval(this.interval);
    }
  }
  createSnowflakes() {
    const snowFlake = new Image();
    snowFlake.src = 'assets/svg/snowflake.svg';
    const tree: HTMLElement = document.getElementById('mainTree')!;
    tree.append(snowFlake);
    snowFlake.style.animation = 'fall linear forwards';
    snowFlake.style.position = 'absolute';
    snowFlake.style.top = '-20%';
    snowFlake.style.animationDuration = Math.random() * 4 + 1 + 's';
    snowFlake.style.opacity = String(Math.random());
    const dimension = Math.random() * 3 + 1 + 'rem';
    snowFlake.style.width = dimension;
    snowFlake.style.height = dimension;
    snowFlake.style.left = Math.random() * tree.offsetWidth + 'px';
    setTimeout(() => {
      snowFlake.remove();
    }, 3000);
  }
  garlandToggle() {
    if (this.garlandIsOn) this.garlandIsOn = false;
    else this.garlandIsOn = true;
    this.storageService.setObject('garlandSwitch', this.garlandIsOn);
    this.garlandSwitch.emit(this.garlandIsOn);
  }
  changeGarlandColor(color: string) {
    this.garlandColorChoosed = color;
    if (!this.garlandIsOn) this.garlandIsOn = true;
    this.storageService.setObject('garlandSwitch', this.garlandIsOn);
    this.storageService.setObject('garlandColor', this.garlandColorChoosed);
    this.garLandColorChoice.emit(this.garlandColorChoosed);
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
  deleteCongratsInput() {
    this.congratsInput = '';
    this.congratsWritten.emit(this.congratsInput);
  }
  inputCongrat(input: string) {
    this.congratsInput = input;
    this.congratsWritten.emit(this.congratsInput);
  }
  makeScreen() {
    this.mainPage.makeScreen();
  }
}
