import { switchers, range, timeModeSelection } from './navigation_functions.js';

export default class Settings {
  constructor() {
    this.settings = [];
    this.settingsDefault = ['true', 'false', 'false', '40', '40', '0', '10'];
  }

  static setSettingstoLocalStorage() {
    localStorage.setItem('settingsRubiaqute', JSON.stringify(this.settings));
  }

  static changeTimeModeTimeLeft() {
    this.settings[6] = timeModeSelection.value;
    Settings.setSettingstoLocalStorage();
  }

  static playMusic() {
    const audio = document.querySelector('.audio-music');
    const musicSelection = document.querySelector('.music-select');
    const numberTrack = musicSelection.value;
    this.settings[5] = musicSelection.value.toString();
    if (this.settings[1] === 'true') {
      audio.src = `./sounds/${numberTrack}.mp3`;
      audio.volume = range[1].value / 100;
      audio.play();
    }
    Settings.setSettingstoLocalStorage();
  }

  static stopMusic() {
    const audio = document.querySelector('.audio-music');
    audio.pause();
  }

  static updateSettingsInterface(button, index) {
    if (this.settings[index] === 'true') button.classList.add('switch-on');
    else button.classList.remove('switch-on');
  }

  static updateTrack() {
    const musicSelection = document.querySelector('.music-select');
    musicSelection.value = +this.settings[5];
  }

  static updateTimeLeft() {
    timeModeSelection.value = +this.settings[6];
  }

  static updateRanges(index) {
    range[index].value = this.settings[index + 3];
    const volumeValue = range[index].value;
    Settings.changeProgressColor(index, volumeValue);
  }

  static changeProgressColor(index, volumeValue) {
    range[index].style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${volumeValue}%, rgba(80, 80, 80, 0.5) ${volumeValue}%, rgba(80, 80, 80, 0.5) 100%)`;
  }

  static switchSettings(button, index) {
    if (button.classList.contains('switch-on')) {
      button.classList.remove('switch-on');
      this.settings[index] = 'false';
      if (index === 1) Settings.stopMusic();
    } else {
      button.classList.add('switch-on');
      this.settings[index] = 'true';
      if (index === 1) Settings.playMusic();
    }
    Settings.setSettingstoLocalStorage();
  }

  static changeVolume(rangeBar, index) {
    const audio = document.getElementsByTagName('audio');
    audio[index].volume = rangeBar.value / 100;
    this.settings[index + 3] = rangeBar.value;
    Settings.changeProgressColor(index, rangeBar.value);
    Settings.setSettingstoLocalStorage();
  }

  static rewriteSettings(array) {
    if (array) {
      this.settings = array;
    } else this.settings = this.settingsDefault;
    return this.settings;
  }

  static returnSettings() {
    return this.settings;
  }

  static makeSettingsDefault() {
    Settings.rewriteSettings(new Settings().settingsDefault);
    console.log(this.settings);
    Settings.setSettingstoLocalStorage();
    Settings.updateSettingsPage();
    window.location.reload();
  }

  static updateSettingsPage() {
    switchers.forEach((button, index) => Settings.updateSettingsInterface(button, index));
    range.forEach((el, index) => Settings.updateRanges(index));
    Settings.updateTrack();
    Settings.updateTimeLeft();
  }
}
