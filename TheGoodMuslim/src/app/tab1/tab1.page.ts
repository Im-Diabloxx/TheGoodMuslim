import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  today_namaz: any
  qaza_namaz: any
  public data: DeviceOrientationCompassHeading = null;
  public currentLocation: Geoposition = null;
  // Initial Kaaba location that we've got from google maps
  private kaabaLocation: {lat:number,lng:number} = {lat: 21.42276, lng: 39.8256687};
  // Initial Qibla Location
  public qiblaLocation = 0;

  constructor(private _httpClient: HttpClient, public alertController: AlertController, public toastController: ToastController, private deviceOrientation: DeviceOrientation, private geolocation: Geolocation) {
    this.deviceOrientation.watchHeading().subscribe((res: DeviceOrientationCompassHeading) => {
      this.data = res;
      // Change qiblaLocation when currentLocation is not empty 
      if (!!this.currentLocation) {
        const currentQibla = res.magneticHeading-this.getQiblaPosition();
        this.qiblaLocation = currentQibla > 360 ? currentQibla%360 : currentQibla;
      }
    });
    // Watch current location
    this.geolocation.watchPosition().subscribe((res) => {
        this.currentLocation = res;
    });
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let longitude = "45.75541894677874"
    let latitude = "4.846963674619303"

    this._httpClient.get("http://api.aladhan.com/v1/calendar?latitude=" + latitude + "&longitude=" + 
    longitude + "&month=" + month +"&year=" + year + "&method=7").subscribe(res => {
      console.log(res)
    });

    this.today_namaz = [
      {
        namaz_id:         0,
        namaz_name:       "Namaz Soubh",
        namaz_time:       "00:00",
        namaz_image:      "./assets/soubh.png",
        namaz_description: "2 raka'ats",
        namaz_status:     false,
        namaz_style:      ""
      },
      {
        namaz_id:         1,
        namaz_name:       "Namaz Zohr",
        namaz_time:       "00:00",
        namaz_image:      "./assets/zohr.png",
        namaz_description: "4 raka'ats",
        namaz_status:     false,
        namaz_style:      "opacity: 0.1; pointer-events:none"
      },
      {
        namaz_id:         2,
        namaz_name:       "Namaz Asr",
        namaz_time:       "00:00",
        namaz_image:      "./assets/asr.png",
        namaz_description: "4 raka'ats",
        namaz_status:     false,
        namaz_style:      "opacity: 0.1; pointer-events:none"
      },
      {
        namaz_id:         3,
        namaz_name:       "Namaz Maghrib",
        namaz_time:       "00:00",
        namaz_image:      "./assets/maghrib.png",
        namaz_description: "3 raka'ats",
        namaz_status:     false,
        namaz_style:      "opacity: 0.1; pointer-events:none"
      },
      {
        namaz_id:         4,
        namaz_name:       "Namaz Isha",
        namaz_time:       "00:00",
        namaz_image:      "./assets/isha.png",
        namaz_description: "4 raka'ats",
        namaz_status:     false,
        namaz_style:      "opacity: 0.1; pointer-events:none"
      }
    ];

    this.qaza_namaz = [
      {
        namaz_id:         0,
        namaz_name:       "Namaz Soubh",
        namaz_image:      "./assets/soubh.png",
        namaz_status:     true,
        namaz_number:     6
      },
      {
        namaz_id:         1,
        namaz_name:       "Namaz Zohr",
        namaz_image:      "./assets/zohr.png",
        namaz_status:     false,
        namaz_number:     0
      },
      {
        namaz_id:         2,
        namaz_name:       "Namaz Asr",
        namaz_image:      "./assets/asr.png",
        namaz_status:     true,
        namaz_number:     13
      },
      {
        namaz_id:         3,
        namaz_name:       "Namaz Maghrib",
        namaz_image:      "./assets/maghrib.png",
        namaz_status:     false,
        namaz_number:     0
      },
      {
        namaz_id:         4,
        namaz_name:       "Namaz Isha",
        namaz_image:      "./assets/isha.png",
        namaz_status:     true,
        namaz_number:     5
      }
    ];
  }
  async toggleNamazCheck(event, namaz) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Avez-vous vraiment accomplit la salat?',
      buttons: [
      {
          text: 'Non',
          handler: () => {
            namaz.namaz_status = !namaz.namaz_status
            console.log('Confirm Cancel: blah')
            alert.dismiss()
          }
        }, {
          text: 'Oui, je confirme',
          handler: () => {
            if (event.detail.checked)
              namaz.namaz_status = true
            else
              namaz.namaz_status = false
            for (let n of this.today_namaz) {
              if (n.namaz_name == "Namaz Soubh")
                continue
              if (!(this.today_namaz[n.namaz_id - 1].namaz_status))
                n.namaz_style = "opacity: 0.1; pointer-events:none"
              else
                n.namaz_style = ""
            }
            this.presentToastWithOptions('Vous avez terminé votre ' + namaz.namaz_name + '. Inshallah, votre prière sera accepté.')
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  
  async presentToastWithOptions(text) {
    const toast = await this.toastController.create({
      header: 'Namaz accomplit !',
      message: text,
      position: 'top',
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  getQiblaPosition() {
    // Convert all geopoint degree to radian before jump to furmula
    const currentLocationLat = this.degreeToRadian(this.currentLocation.coords.latitude);
    const currentLocationLng = this.degreeToRadian(this.currentLocation.coords.longitude);
    const kaabaLocationLat = this.degreeToRadian(this.kaabaLocation.lat);
    const kaabaLocationLng = this.degreeToRadian(this.kaabaLocation.lng);

    // Use Basic Spherical Trigonometric Formula
    return this.radianToDegree(
      Math.atan2(
        Math.sin(kaabaLocationLng-currentLocationLng),
        (Math.cos(currentLocationLat) * Math.tan(kaabaLocationLat) - Math.sin(currentLocationLat) * Math.cos(kaabaLocationLng - currentLocationLng))
      )
    );
  }

  /**
   * Convert from Radian to Degree
   * @param radian 
   */
  radianToDegree(radian: number) {
    return radian * 180 / Math.PI;
  }

  /**
   * Convert from Degree to Radian
   * @param degree 
   */
  degreeToRadian(degree: number) {
    return degree * Math.PI / 180;
  }
}
