import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Mesh, MeshLambertMaterial, PlaneBufferGeometry, RepeatWrapping, Texture, TextureLoader } from 'three';

import { SceneComponent } from '../scene/scene.component';

@Component({
  selector: 'app-ground',
  template: '',
})
export class GroundComponent implements OnInit, OnDestroy {
  @Input() texture: string;
  @Input() y: number;
  private mesh: Mesh;

  constructor(
    @Inject(forwardRef(() => SceneComponent)) private scene: SceneComponent,
    private textureLoader: TextureLoader,
  ) {}

  ngOnInit() {
    this.textureLoader.load(
      this.texture,
      texture => this.onTextureLoad(texture),
    );
  }

  ngOnDestroy() {
    this.scene.removeFromScene(this.mesh);
  }

  onTextureLoad(texture: Texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(25, 25);
    texture.anisotropy = 16;

    const groundMaterial = new MeshLambertMaterial({map: texture});
    const geometry = new PlaneBufferGeometry(20000, 20000);

    this.mesh = new Mesh(geometry, groundMaterial);
    this.mesh.position.y = this.y;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.scene.addOnScene(this.mesh);
  }
}
