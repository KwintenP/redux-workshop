import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {SwapiModule} from './modules/swapi/swapi.module';
import {META_REDUCERS, StoreModule} from '@ngrx/store';
import {reducerProvider, reducerToken} from './statemanagement/root-reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SwapiModule,
    StoreModule.forRoot(reducerToken),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    reducerProvider,
    {
      provide: META_REDUCERS,
      useFactory: getMetaReducers
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
