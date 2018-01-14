import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Group, MaterialCreator } from 'three';
import OBJLoader from 'three-react-obj-loader';
import MTLLoader from 'three-react-mtl-loader';

import { SceneComponent } from '../scene/scene.component';

@Component({
  selector: 'app-tower',
  template: '',
})
export class TowerComponent implements OnInit, OnDestroy {
  @Input() model: string;
  @Input() x: number;
  @Input() y: number;
  @Input() z: number;
  @Input() height: number;
  tower: any;

  constructor(
    @Inject(forwardRef(() => SceneComponent)) private scene: SceneComponent,
    private objectLoader: OBJLoader,
    private mtlLoader: MTLLoader,
  ) {}

  ngOnInit() {
    this.mtlLoader.load('cube.mtl', (materials => this.onMaterialsLoad(materials)));
  }

  ngOnDestroy() {
    this.scene.removeFromScene(this.tower);
  }

  onMaterialsLoad(creator: MaterialCreator) {
    creator.preload();
    this.objectLoader.setMaterials(creator);
    this.objectLoader.load(this.model, (model) => this.onModelLoad(model));
  }

  onModelLoad(model: Group) {
    this.tower = model;
    this.tower.position.x = this.x;
    this.tower.position.y = this.y;
    this.tower.position.z = this.z;
    this.scene.addOnScene(this.tower);
  }
}
