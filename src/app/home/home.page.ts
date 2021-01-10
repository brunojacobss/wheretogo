import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalplacePage } from '../modalplace/modalplace.page';
import { OpentripmapService } from '../services/opentripmap.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  placesFound: any[];
  places: any[];
  cityFound: any;
  countPlacesFound = 0;
  inputError: string;
  constructor(
    private openTripMapService: OpentripmapService,
    private modalController: ModalController
  ) {}

  async ionViewDidEnter() {
    await this.searchCity(environment.openTripMap.defaultCity);
  }

  async onSearchClick(city: string) {
    if (city === '') {
      this.inputError = 'Ingrese una ciudad';
      return;
    }
    if (this.inputError) {
      this.inputError = '';
    }
    this.placesFound = [];
    await this.searchCity(city);
  }

  async showDetailPlace(place: any) {
    const placeSelected = await this.openTripMapService.getDetailPlaceByXid(
      place.xid
    );
    const modal = await this.modalController.create({
      component: ModalplacePage,
      componentProps: {
        placeSelected: placeSelected,
      },
    });
    return await modal.present();
  }

  async searchCity(city: string) {
    try {
      this.cityFound = await this.openTripMapService.getCityFromSearch(city);
      if (this.cityFound) {
        this.places = await this.openTripMapService.getPlacesByLatLon(
          environment.openTripMap.radius,
          this.cityFound.lon,
          this.cityFound.lat,
          environment.openTripMap.rate,
          environment.openTripMap.formatJson
        );
        this.countPlacesFound = this.places.length;
        setTimeout(() => {
          this.placesFound = this.places;
          this.places = undefined;
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      this.inputError = err.message;
    }
  }
}
