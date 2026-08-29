import { Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Birthday as BirthdayModel } from '../../models/birthday.model';
import { BirthdayService } from '../../services/birthday';

@Component({
  selector: 'app-birthday',
  imports: [],
  templateUrl: './birthday.html',
  styleUrl: './birthday.css',
})
export class Birthday implements OnInit {

  @ViewChild('birthdayAudio')
birthdayAudio?: ElementRef<HTMLAudioElement>;

isMusicPlaying = signal(false);

  private route = inject(ActivatedRoute);
  private birthdayService = inject(BirthdayService);

  isOpened = signal(false);
  isLoading = signal(true);
  notFound = signal(false);

  birthday = signal<BirthdayModel | undefined>(undefined);

  ngOnInit(): void {

    const slug = this.route.snapshot.paramMap.get('slug');

    console.log('Slug récupéré :', slug);

    if (!slug) {

      this.isLoading.set(false);
      this.notFound.set(true);

      return;
    }

    this.birthdayService.getBirthday(slug).subscribe({

      next: (birthday) => {

        console.log('Données reçues :', birthday);

        this.birthday.set(birthday);
        this.isLoading.set(false);

      },

      error: (error) => {

        console.error(
          'Erreur lors du chargement :',
          error
        );

        this.isLoading.set(false);
        this.notFound.set(true);

      }

    });

  }

  openSurprise(): void {
    this.isOpened.set(true);
  }
  toggleMusic(): void {

  const audio = this.birthdayAudio?.nativeElement;

  if (!audio) {
    return;
  }

  if (audio.paused) {

    audio.play()
      .then(() => {
        this.isMusicPlaying.set(true);
      })
      .catch((error) => {

        console.error(
          'Impossible de démarrer la musique :',
          error
        );

      });

  } else {

    audio.pause();

    this.isMusicPlaying.set(false);

  }

}

}