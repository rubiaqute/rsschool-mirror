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
import { TreeComponent } from 'src/app_pages/tree/tree.component';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
  providers: [GarlandComponent],
})
export class SettingsBarComponent {
  [x: string]: any;
  @Input() treeForDrop!: HTMLElement;
  @Output() bgChoice = new EventEmitter<string>();
  @Output() treeChoice = new EventEmitter<string>();
  @Output() garlandSwitch = new EventEmitter<boolean>();
  @Output() garLandColorChoice = new EventEmitter<string>();
  interval: ReturnType<typeof setInterval> = setInterval(
    this.createSnowflakes,
    100
  );
  garlandColorChoosed: string = '';
  garlandIsOn: boolean = false;
  garlandColors: string[] = [];
  treesToChoose: ICard[] = [];
  bgToChoose: ICard[] = [];
  settingsObject: ISettings[] = [];
  // toggleGarland: boolean = false;

  @ViewChild('audioplayer', { static: false })
  audioplayer!: ElementRef<HTMLAudioElement>;
  @Output() congratsWritten = new EventEmitter<string>();
  congratsInput: string = 'С Новым Годом!';
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
    this.garlandIsOn = false;
    this.garlandColorChoosed = this.garlandColors[0];
    this.toggleSnow(this.settingsObject[1].isOn);
    this.checkMusic();
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
  updateSettingsObject() {
    if (this.storageService.getObject('christmasTreeSettings'))
      return this.storageService.getObject('christmasTreeSettings');
    else return settings;
  }
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
    console.log(this.interval);
    if (flag)
      this.interval = setInterval(() => {
        this.createSnowflakes();
        console.log(this.interval);
      }, 100);
    else {
      console.log(this.interval);
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
    // snowFlake.classList.add("fa-snowflake");
    snowFlake.style.left = Math.random() * tree.offsetWidth + 'px';
    setTimeout(() => {
      snowFlake.remove();
    }, 3000);
  }
  garlandToggle() {
    if (this.garlandIsOn) this.garlandIsOn = false;
    else this.garlandIsOn = true;
    this.garlandSwitch.emit(this.garlandIsOn);
  }
  changeGarlandColor(color: string) {
    this.garlandColorChoosed = color;
    if (!this.garlandIsOn) this.garlandIsOn = true;
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
