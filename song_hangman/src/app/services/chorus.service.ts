import { Injectable } from '@angular/core';
import * as chorusData from '../../assets/choruses.json';

@Injectable({
  providedIn: 'root'
})
export class ChorusService {
  getRandomChorus(): string {
    const data: any = chorusData;
    const index = Math.floor(Math.random() * data.default.length);
    return data.default[index].text;
  }
}
