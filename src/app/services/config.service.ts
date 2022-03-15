import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class ConfigService {
  getConfig() {
    return of({
      adminName: 'Roman',
      premissions: ['___', '...'],
    });
  }
}
