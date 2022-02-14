import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PlayersByScore } from './models/PlayersByScore';
import { Tournament } from './models/Tournament';
import { PlayerByScoreService } from './services/player-by-score/player-by-score.service';
import { TournamentsService } from './services/tournaments/tournaments.service';

// interface Country {
//   name: string;
//   flag: string;
//   area: number;
//   population: number;
// }

// const COUNTRIES: Country[] = [
//   {
//     name: 'Russia',
//     flag: 'f/f3/Flag_of_Russia.svg',
//     area: 17075200,
//     population: 146989754,
//   },
//   {
//     name: 'Canada',
//     flag: 'c/cf/Flag_of_Canada.svg',
//     area: 9976140,
//     population: 36624199,
//   },
//   {
//     name: 'United States',
//     flag: 'a/a4/Flag_of_the_United_States.svg',
//     area: 9629091,
//     population: 324459463,
//   },
//   {
//     name: 'China',
//     flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
//     area: 9596960,
//     population: 1409517397,
//   },
// ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public playersByScore: PlayersByScore[] = [];
  public tournaments: Tournament[] = [];
  public loadingMessage: string = 'Loading...';
  public isResponseReturned: boolean = false;
  public maxNoOfPlayers = 0;
  public alertType = 'info';

  constructor(
    private playersService: PlayerByScoreService,
    private tournamentsService: TournamentsService
  ) {
    this.getData();
  }

  getData() {
    forkJoin([
      this.playersService.getPlayersByScore(),
      this.tournamentsService.getTournaments(),
    ]).subscribe(
      (res) => {
        if (res.length > 0) {
          this.isResponseReturned = true;
          this.playersByScore = res[0];
          this.tournaments = res[1];
          //sort array
          this.playersByScore.sort((a, b) => (a.score > b.score ? -1 : 1));

          const players = this.playersByScore.map((object) => {
            return object.players;
          });

          this.maxNoOfPlayers = Math.max.apply(null, players);
        } else {
          this.loadingMessage = 'Something went wrong while getting data!';
          this.alertType = 'danger';
        }
      },
      (err) => {
        this.alertType = 'danger';
        this.loadingMessage = 'Something went wrong while getting data!';
        console.log('error', err);
      }
    );
  }

  resetIndex(i: number) {
    return i % this.tournaments[0].prizeData.length;
  }

  mapCurrencyToSymbol(currencyName: string) {
    const currencySymbols: any = {
      USDT: '$', // US Dollar
      EUR: '€', // Euro
      CRC: '₡', // Costa Rican Colón
      GBP: '£', // British Pound Sterling
      ILS: '₪', // Israeli New Sheqel
      INR: '₹', // Indian Rupee
      JPY: '¥', // Japanese Yen
      KRW: '₩', // South Korean Won
      NGN: '₦', // Nigerian Naira
      PHP: '₱', // Philippine Peso
      PLN: 'zł', // Polish Zloty
      PYG: '₲', // Paraguayan Guarani
      THB: '฿', // Thai Baht
      UAH: '₴', // Ukrainian Hryvnia
      VND: '₫', // Vietnamese Dong
    };

    if (currencySymbols[currencyName] !== undefined) {
      return currencySymbols[currencyName];
    }
  }
}
