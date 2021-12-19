import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.scss'],
  animations: [
    trigger('popUp', [
      transition('void => *', [
        style({ opacity: 0.2, transform: 'scale(0)' }),
        animate('800ms ease-in'),
      ]),
      transition('* => void', [
        animate(
          '800ms ease-in',
          style({ opacity: 0.2, transform: 'scale(0)' })
        ),
      ]),
    ]),
  ],
})
export class ModalServiceComponent {
  toggleModal: boolean = false;
  constructor() {}
  toggleSwitchers() {
    this.toggleModal = !this.toggleModal;
  }
  public switchModal() {
    let event = new Event('click');
    document.getElementById('faked1')!.dispatchEvent(event);
  }
}
