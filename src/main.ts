import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {setupRxDevtools} from 'rx-devtools';
import 'rx-imports';

if (environment.production) {
  enableProdMode();
} else {
  setupRxDevtools();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

import 'rx-imports';
