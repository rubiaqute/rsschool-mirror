import Results from './results.js';

export default class Settings {
  constructor() {
    this.settings = {};
    this.settingsDefault = {
      'sound-mode': 'true',
      'music-mode': 'false',
      'time-mode': 'false',
      'volume-sound': '40',
      'volume-music': '40',
      'track-number': '0',
      'time-left': '10',
    };
    this.switchers = document.querySelectorAll('.switch-button');
    this.range = document.querySelectorAll('.volume-range');
    this.musicSelection = document.querySelector('.music-select');
    this.timeModeSelection = document.querySelector('.time-select');
    this.defaultSettingsButton = document.querySelector('.default');
    this.clearResultsButton = document.querySelector('.clean-results');
  }

  static setSettingstoLocalStorage() {
    localStorage.setItem('settingsRubiaqute', JSON.stringify(this.settings));
  }

  static changeTimeModeTimeLeft() {
    this.settings['time-left'] = new Settings().timeModeSelection.value.toString();
    Settings.setSettingstoLocalStorage();
  }

  static playMusic() {
    const audio = document.querySelector('.audio-music');
    const musicSelection = document.querySelector('.music-select');
    const numberTrack = musicSelection.value;
    this.settings['track-number'] = musicSelection.value.toString();
    if (this.settings['music-mode'] === 'true') {
      audio.src = `./sounds/${numberTrack}.mp3`;
      audio.volume = new Settings().range[1].value / 100;
      audio.play();
    }
    Settings.setSettingstoLocalStorage();
  }

  static stopMusic() {
    const audio = document.querySelector('.audio-music');
    audio.pause();
  }

  static updateSettingsView(button, index) {
    let type;
    if (index === 0) type = 'sound-mode';
    if (index === 1) type = 'music-mode';
    if (index === 2) type = 'time-mode';
    if (this.settings[type] === 'true') button.classList.add('switch-on');
    else button.classList.remove('switch-on');
  }

  static updateTrack() {
    const musicSelection = document.querySelector('.music-select');
    musicSelection.value = +this.settings['track-number'];
  }

  static updateTimeLeft() {
    new Settings().timeModeSelection.value = Number(this.settings['time-left']);
  }

  static updateRanges(index) {
    if (index === 0) new Settings().range[index].value = this.settings['volume-sound'];
    else new Settings().range[index].value = this.settings['volume-music'];
    const volumeValue = new Settings().range[index].value;
    Settings.changeProgressColor(index, volumeValue);
  }

  static changeProgressColor(index, volumeValue) {
    new Settings().range[index].style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${volumeValue}%, rgba(80, 80, 80, 0.5) ${volumeValue}%, rgba(80, 80, 80, 0.5) 100%)`;
  }

  static switchSettings(button, index) {
    let type;
    if (index === 0) type = 'sound-mode';
    if (index === 1) type = 'music-mode';
    if (index === 2) type = 'time-mode';
    if (button.classList.contains('switch-on')) {
      button.classList.remove('switch-on');
      this.settings[type] = 'false';
      if (index === 1) Settings.stopMusic();
    } else {
      button.classList.add('switch-on');
      this.settings[type] = 'true';
      if (index === 1) Settings.playMusic();
    }
    Settings.setSettingstoLocalStorage();
  }

  static changeVolume(rangeBar, index) {
    const audio = document.getElementsByTagName('audio');
    audio[index].volume = rangeBar.value / 100;
    if (index === 0) this.settings['volume-sound'] = rangeBar.value;
    else this.settings['volume-music'] = rangeBar.value;
    Settings.changeProgressColor(index, rangeBar.value);
    Settings.setSettingstoLocalStorage();
  }

  static rewriteSettings(array) {
    if (array) {
      this.settings = { ...array };
    } else this.settings = { ...this.settingsDefault };
    return this.settings;
  }

  static returnSettings() {
    return this.settings;
  }

  static makeSettingsDefault() {
    Settings.rewriteSettings(new Settings().settingsDefault);
    Settings.setSettingstoLocalStorage();
    Settings.updateSettingsPage();
    window.location.reload();
  }

  static updateSettingsPage() {
    new Settings().switchers.forEach((button, index) => Settings.updateSettingsView(button, index));
    new Settings().range.forEach((el, index) => Settings.updateRanges(index));
    Settings.updateTrack();
    Settings.updateTimeLeft();
  }
}
new Settings().range.forEach((el, index) => el.addEventListener('change', () => Settings.changeVolume(el, index)));
new Settings().musicSelection.addEventListener('change', () => Settings.playMusic());
new Settings().timeModeSelection.addEventListener('change', () => Settings.changeTimeModeTimeLeft());
new Settings().defaultSettingsButton.addEventListener('click', () => Settings.makeSettingsDefault());
new Settings().switchers.forEach((button, index) => button.addEventListener('click', (e) => {
  e.preventDefault();
  Settings.switchSettings(button, index);
}));

new Settings().clearResultsButton.addEventListener('click', () => Results.cleanResults());
