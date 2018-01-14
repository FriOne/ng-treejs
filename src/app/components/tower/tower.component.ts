import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Group, ObjectLoader } from 'three';

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
    private objectLoader: ObjectLoader,
  ) {}

  ngOnInit() {
    this.objectLoader.load(
      '/assets/models/cube.json',
      (model) => this.onModelLoad(model),
    );
  }

  ngOnDestroy() {
    this.scene.removeFromScene(this.tower);
  }

  onModelLoad(model: Group) {
    this.tower = model;
    this.tower.position.x = this.x;
    this.tower.position.y = this.y;
    this.tower.position.z = this.z;
    this.scene.addOnScene(this.tower);
  }
}
