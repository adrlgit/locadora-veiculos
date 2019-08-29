import { Component } from "@angular/core"
import {
  NavController,
  LoadingController,
  AlertController
} from "ionic-angular"
import { Carro } from "../../modelos/carro"
import { HttpErrorResponse } from "@angular/common/http"
import { CarrosServiceProvider } from "../../providers/carros-service/carros-service";
import { NavLifecycles } from "../../utils/ionic/nav/nav-lifecycles";
import { EscolhaPage } from "../escolha/escolha";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements NavLifecycles {

  public carros: Carro[]

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private carrosService: CarrosServiceProvider,
  ) {}
  
  ionViewDidLoad() {
    let carregando = this.loadingCtrl.create({
      content: "Carregando veículos..."
    })

    carregando.present()

    this.carrosService.lista()
      .subscribe(
        (carros) => {
          this.carros = carros
          carregando.dismiss()
        },
        (err: HttpErrorResponse) => {
          console.log(err)

          carregando.dismiss()

          this.alertCtrl.create({
            title: "Falha na conexão",
            subTitle: "Não foi possivel carregar a lista de carros tente novamente mais tarde",
            buttons: [{ text: 'ok' }]
          }).present();
        }
      )
  }
  // deleteItem(car) {
  //   this.carros.splice(this.carros.indexOf(car))
  // }
  selecionaCarro(carro: Carro) {
    console.log(carro);
    this.navCtrl.push(EscolhaPage, {carroSelecionado: carro});
  }
}
