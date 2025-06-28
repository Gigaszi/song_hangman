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
  usedChoruses: Set<string> = new Set();
  currentChorusText: string = '';

  constructor(private chorusService: ChorusService) {}

  ngOnInit(): void {
    this.loadRandomChorus();
  }

  loadRandomChorus() {
    const allChoruses = this.chorusService.getAllChoruses();
    console.log(`Total choruses available: ${allChoruses.length}`);
    const unusedChoruses = allChoruses.filter(c => !this.usedChoruses.has(c));

    if (unusedChoruses.length === 0) {
      alert('🎉 You’ve gone through all choruses!');
      this.usedChoruses.clear();
      return;
    }

    const randomChorus = unusedChoruses[Math.floor(Math.random() * unusedChoruses.length)];
    this.usedChoruses.add(randomChorus);
    this.currentChorusText = randomChorus.replace(/\[[^\]]*\]|\([^\)]*\)|\{[^\}]*\}/g, '');
    this.currentChorusText = JSON.stringify(this.currentChorusText );

    function extractWordsAndLinebreaks(text: string): string[] {
      const textWithLinebreaks = text.replace(/\\n/g, ' breaklinehere ');

      const tokens = textWithLinebreaks.split(/\s+/);

      const result: string[] = [];

      tokens.forEach(token => {
        if (token === '\n') {
          result.push('\n');
        } else {
          const word = token.replace(/[^a-zA-Z0-9\\]/g, '');
          if (word.length > 0) {
            result.push(word);
          }
        }
      });
      return result;
    }


    this.originalChorus = extractWordsAndLinebreaks(this.currentChorusText);

    this.maskedChorus = this.originalChorus.map(token => {
      if (token === 'breaklinehere') {
        return 'breaklinehere';
      } else {
        return '_____';
      }
    });

    this.guessedWords.clear();
    this.guess = '';
  }

  submitGuess() {
    const cleanGuess = this.guess.trim().toLowerCase();
    if (!cleanGuess) return;

    this.guessedWords.add(cleanGuess);

    this.maskedChorus = this.originalChorus.map(token => {
      if (token === 'breaklinehere') {
        return 'breaklinehere';
      } else {
        return this.guessedWords.has(token.toLowerCase()) ? token : '_____';
      }
    });

    this.guess = '';
  }

  get sortedGuesses(): string[] {
    return Array.from(this.guessedWords).sort();
  }
}
