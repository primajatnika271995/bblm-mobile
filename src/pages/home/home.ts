import { DashboardPage } from './../dashboard/dashboard';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { } from '@angular/compiler/src/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.loadMap();
  }

  bdgAlert() {
    let alert = this.alertCtrl.create({
      title: 'Info Produksi Wilayah Bandung',
      subTitle: 'Bandung Main Server',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  bgrAlert() {
    let alert = this.alertCtrl.create({
      title: 'Info Produksi Wilayah Bogor',
      subTitle: 'Terigu : 56/100%',
      buttons: [{
        text: 'Cancel',
        handler: () => {
          console.log("Cancel Button");
        }
      },{
        text: 'Lihat Dashboard',
        handler: () => {
          console.log("Link Ke dashboard");
          this.navCtrl.push(DashboardPage);
        }
      }]
    });
    alert.present();
  }

  ionViewDidEnter(){

  }

  loadMap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'tabeldata',
      maxZoom: 8
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let bdg: any = leaflet.marker([-6.9120498, 107.5926868]).on('click', () => {
        this.bdgAlert();
      })
      let bogor: any = leaflet.marker([-6.5950181, 106.7218508]).on('click', () => {
        this.bgrAlert();
      })

      markerGroup.addLayer(bdg);
      markerGroup.addLayer(bogor);
      this.map.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
    })
  }

}
