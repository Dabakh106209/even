import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Birthday } from '../models/birthday.model';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  private http = inject(HttpClient);

  getBirthday(slug: string): Observable<Birthday> {

    const url = `/data/birthdays/${slug}.json`;

    console.log('Chargement de :', url);

    return this.http.get<Birthday>(url);

  }

}