import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextureLoader } from 'three';
import OBJLoader from 'three-react-obj-loader';
import MTLLoader from 'three-react-mtl-loader';

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
    {provide: TextureLoader, useFactory: () => {
      const loader = new TextureLoader();
        loader.setPath('/assets/textures/');
        return loader;
    }},
    {provide: OBJLoader, useFactory: () => {
      const loader = new OBJLoader();
      loader.setPath('/assets/models/');
      return loader;
    }},
    {provide: MTLLoader, useFactory: () => {
        const loader = new MTLLoader();
        loader.setPath('/assets/models/');
        return loader;
    }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
