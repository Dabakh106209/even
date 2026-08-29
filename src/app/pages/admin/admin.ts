import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  name = '';
  age: number | null = null;
  message = '';

  slug = '';

  generatedLink = '';
  generatedJson = '';

  copied = false;
  eventCreated = false;


  /**
   * Transforme le nom en slug propre.
   *
   * Exemple :
   * "Fatou Diop" -> "fatou-diop"
   * "Aïssatou Fall" -> "aissatou-fall"
   */
  generateSlug(): void {

    this.slug = this.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    this.eventCreated = false;
    this.generatedLink = '';
    this.generatedJson = '';
    this.copied = false;
  }


  /**
   * Génère le lien et les données JSON.
   */
  generateEvent(): void {

    this.generateSlug();

    if (!this.name.trim() || !this.slug) {
      return;
    }

    this.generatedLink =
      `${window.location.origin}/#/birthday/${this.slug}`;


    const birthdayData = {
      slug: this.slug,
      name: this.name.trim(),
      age: this.age || undefined,

      message: this.message.trim(),

      photo: `assets/events/birthdays/${this.slug}/photo.jpg`,

      photos: [],

      music: `assets/events/birthdays/${this.slug}/music.mp3`
    };


    this.generatedJson =
      JSON.stringify(
        birthdayData,
        null,
        2
      );


    this.eventCreated = true;
    this.copied = false;

  }


  /**
   * Copie le lien.
   */
  async copyLink(): Promise<void> {

    if (!this.generatedLink) {
      return;
    }

    try {

      await navigator.clipboard.writeText(
        this.generatedLink
      );

      this.copied = true;

    } catch (error) {

      console.error(
        'Impossible de copier le lien :',
        error
      );

    }

  }


  /**
   * Ouvre la page anniversaire.
   */
  openPreview(): void {

    if (!this.generatedLink) {
      return;
    }

    window.open(
      this.generatedLink,
      '_blank'
    );

  }


  /**
   * Télécharge le fichier JSON.
   */
  downloadJson(): void {

    if (!this.generatedJson || !this.slug) {
      return;
    }


    const blob = new Blob(
      [this.generatedJson],
      {
        type: 'application/json'
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement('a');

    link.href = url;

    link.download =
      `${this.slug}.json`;


    link.click();


    URL.revokeObjectURL(url);

  }

}