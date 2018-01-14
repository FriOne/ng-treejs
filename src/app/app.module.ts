import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ObjectLoader, JSONLoader, TextureLoader } from 'three';

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
    {provide: ObjectLoader, useFactory: () => {
      const loader = new ObjectLoader();
      loader.setTexturePath('/assets/textures/');
      return loader;
    }},
    {provide: JSONLoader, useFactory: () => {
      const loader = new JSONLoader();
      loader.setTexturePath('/assets/textures/');
      return loader;
    }},
    {provide: TextureLoader, useFactory: () => {
      const loader = new TextureLoader();
      loader.setPath('/assets/textures/');
      return loader;
    }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
