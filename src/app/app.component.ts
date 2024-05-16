import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface MagicWords {
  words: string[];
  emoji: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  magicsWords: MagicWords[] = [
    {
      words: ['poule', 'poules', 'poulette', 'poulettes', 'poupoule', 'poupoules'],
      emoji: ' :chicken: ',
    },
    {
      words: ['lunette', 'lunettes'],
      emoji: ' :eyeglasses: ',
    },
    {
      words: ['<3', 'love', 'coeur', 'cœur', 'aime'],
      emoji: ' :purple_heart: ',
    },
    {
      words: ['soleil'],
      emoji: ' :sun_with_face: ',
    },
    {
      words: ['lapin'],
      emoji: ' :rabbit: ',
    },
    {
      words: ['chou', 'choux'],
      emoji: ' :leafy_green: ',
    },
  ];

  result: string = '';
  letterEmoji: string = ' :regional_indicator_{letter}: ';
  inputText: FormControl = new FormControl('');

  copy() {
    navigator.clipboard.writeText(this.result);
  }

  convertTextToEmojis(text: string): string {
    let result: string = '';
    const inputArrray: string[] = text.split('');
    inputArrray.forEach((letter: string) => {
      let emoji: string = '';

      switch (letter) {
        case ' ':
          emoji = ' :blue_square: ';
          break;

        case "'":
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
      result += emoji;
    });

    return result;
  }

  ngOnInit(): void {
    const magicsTriggersWords: string[] = this.magicsWords.reduce(
      (allWords: string[], magic: MagicWords) => {
        return (allWords = [...allWords, ...magic.words]);
      },
      []
    );

    this.inputText.valueChanges.subscribe((input: string) => {
      this.result = ''
      let parts: string[] = [input];

      if (magicsTriggersWords.some((w: string) => input.includes(w))) {
        magicsTriggersWords.forEach((w: string) => {
          if (input.indexOf(w) >= 0) {
            console.log(input.indexOf(w));
            const magicWord: MagicWords = this.magicsWords.filter(
              (mw: MagicWords) => mw.words.includes(w)
            )[0];

            if(parts.length <= 1){
              parts = [
                input.slice(0, input.indexOf(w)),
                magicWord.emoji,
                input.slice(input.indexOf(w) + w.length, input.length),
              ];
            } else {
              parts = [
              ...parts,
                magicWord.emoji,
                input.slice(input.indexOf(w) + w.length, input.length),
              ];
            }
          }
        });
      }


      parts.forEach((part:string) => {

        const isMagicEmoji = this.magicsWords.some((mw: MagicWords) => mw.emoji.trim() === part.trim());


        if(!isMagicEmoji){
          this.result += this.convertTextToEmojis(part)
        } else {          
          this.result += part
        }
      })

    });
  }
}
