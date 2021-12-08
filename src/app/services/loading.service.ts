import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }
  async presentLoadingWithOptions(message) {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: message,
    });
    await loading.present();
    return loading;
  }
}
