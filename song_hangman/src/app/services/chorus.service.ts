import { Injectable } from '@angular/core';
import * as chorusData from '../../assets/choruses.json';

@Injectable({
  providedIn: 'root'
})
export class ChorusService {
  private choruses: string[] = [];

  constructor() {
    const data: any = chorusData;
    this.choruses = data.default.map((c: any) => c.text);
  }

  getRandomChorus(): string {
    const index = Math.floor(Math.random() * this.choruses.length);
    return this.choruses[index];
  }

  getAllChoruses(): string[] {
    return this.choruses;
  }
}
