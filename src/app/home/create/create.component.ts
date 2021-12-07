import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  constructor(private modalController: ModalController) {

  }

  ngOnInit() { }

  private close(): void {
    this.modalController.dismiss();
  }

}
