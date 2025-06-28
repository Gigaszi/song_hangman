import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChorusService } from '../../services/chorus.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  originalChorus: string[] = [];
  maskedChorus: string[] = [];
  guess: string = '';
  guessedWords: Set<string> = new Set();

  constructor(private chorusService: ChorusService) {}

  ngOnInit(): void {
    this.loadRandomChorus();
  }

  submitGuess() {
    const trimmed = this.guess.trim().toLowerCase();
    if (!trimmed) return;

    this.guessedWords.add(trimmed);
    this.updateMaskedChorus();
    this.guess = '';
  }

  updateMaskedChorus() {
    this.maskedChorus = this.originalChorus.map(word =>
      this.guessedWords.has(word.toLowerCase()) ? word : '_____'
    );
  }

  get sortedGuesses(): string[] {
    return Array.from(this.guessedWords).sort();
  }

  loadRandomChorus() {
    const chorus = this.chorusService.getRandomChorus();
    this.originalChorus = chorus.split(' ');
    this.maskedChorus = this.originalChorus.map(() => '_____');
    this.guessedWords.clear();
    this.guess = '';
  }
}
