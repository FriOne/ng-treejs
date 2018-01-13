import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ObjectLoader, TextureLoader } from 'three';

import { AppComponent } from './app.component';
import { SceneComponent } from './components/scene/scene.component';
import { GroundComponent } from './components/ground/ground.component';
import { TowerComponent } from './components/tower/tower.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    GroundComponent,
    TowerComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    {provide: TextureLoader, useFactory: () => new TextureLoader()},
    {provide: ObjectLoader, useFactory: () => new ObjectLoader()},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
