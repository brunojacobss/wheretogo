import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  photo: SafeResourceUrl;
  urlAvatarDefaultImage = environment.urlAvatarDefaultImage;

  user: any;

  constructor(private sanitizer: DomSanitizer, private storage: Storage) {}

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    if (image) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.dataUrl);
    }
  }

  async ionViewDidEnter() {
    const { data } = await this.storage.get('loggedUser');
    this.user = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
    };
  }

  ngOnInit() {}
}
