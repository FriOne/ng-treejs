import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextureLoader } from 'three';

import { AppComponent } from './app.component';
import { SceneComponent } from './components/scene/scene.component';
import { GroundComponent } from './components/ground/ground.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    GroundComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    {provide: TextureLoader, useFactory: () => new TextureLoader()},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
