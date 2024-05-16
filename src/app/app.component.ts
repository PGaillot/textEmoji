import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'textEmoji';
  result: string = '';

  letterEmoji: string = ' :regional_indicator_{letter}: ';

  inputText: FormControl = new FormControl('');

  ngOnInit(): void {
    this.inputText.valueChanges.subscribe((input: string) => {
      this.result = '';
      const inputArrray: string[] = input.split('');
      let res: string = '';
      inputArrray.forEach((letter: string) => {
        let emoji: string = '';

        switch (letter) {
          case ' ':
            emoji = ' :blue_square: ';
            break;

            case '\'':
            emoji = ' :blue_square: ';
            break;

            case '?':
            emoji = ' :question: ';
            break;

            case '!':
            emoji = ' :exclamation: ';
            break;

          default:
            emoji = this.letterEmoji.replace('{letter}', letter.toLowerCase());
            break;
        }
        this.result += emoji;
      });
    });
  }
}
