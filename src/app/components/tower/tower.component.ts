import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  BoxGeometry, DoubleSide,
  Mesh,
  MeshLambertMaterial, ObjectLoader,
  RepeatWrapping,
  Texture,
  TextureLoader,
} from 'three';

import { SceneComponent } from '../scene/scene.component';

@Component({
  selector: 'app-tower',
  template: '',
})
export class TowerComponent implements OnInit, OnDestroy {
  @Input() texture: string;
  @Input() x: number;
  @Input() y: number;
  @Input() z: number;
  @Input() height: number;
  tower: any;

  private size = 40;

  constructor(
    @Inject(forwardRef(() => SceneComponent)) private scene: SceneComponent,
    private textureLoader: TextureLoader,
    private objectLoader: ObjectLoader,
  ) {}

  ngOnInit() {
    this.textureLoader.load(
      this.texture,
      texture => this.onTextureLoad(texture),
    );
  }

  ngOnDestroy() {
    this.scene.removeFromScene(this.tower);
  }

  onTextureLoad(texture: Texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.anisotropy = 16;
    const topMaterial = new MeshLambertMaterial({map: texture, side: DoubleSide});

    const repeatCount = Math.ceil(this.height / this.size);
    const repeatedTexture = texture.clone();
    repeatedTexture.repeat.set(1, repeatCount);
    repeatedTexture.needsUpdate = true;

    const sideMaterial = new MeshLambertMaterial({map: repeatedTexture, side: DoubleSide});

    const geometry = new BoxGeometry(
      32,
      this.height,
      32,
    );
    this.tower = new Mesh(
      geometry,
      [
        sideMaterial,
        sideMaterial,
        topMaterial,
        topMaterial,
        sideMaterial,
        sideMaterial,
      ],
    );
    this.tower.position.x = this.x;
    this.tower.position.y = this.y + this.height / 2 - 1;
    this.tower.position.z = this.z;

    this.scene.addOnScene(this.tower);
  }
}
