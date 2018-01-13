import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextureLoader } from 'three';
import OBJLoader from 'three-react-obj-loader';

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
    {provide: OBJLoader, useFactory: () => new OBJLoader()},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
