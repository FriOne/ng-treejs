import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import {
  Color,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer
} from 'three';

import { SceneService } from './scene.service';

@Component({
  selector: 'app-scene',
  template: '<canvas #canvas><ng-content></ng-content></canvas>',
  styles: [`
    :host {
      display: block;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `],
  providers: [SceneService],
})
export class SceneComponent implements AfterViewInit, OnInit {
  @Input() fieldOfView = 30;
  @Input() nearClippingPane = 1;
  @Input() farClippingPane = 10000;

  private mouse: Vector2;
  private scene: Scene;
  private raycaster: Raycaster;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private host: HTMLCanvasElement;
  private canvas: HTMLCanvasElement;

  @ViewChild('canvas')
  private set canvasRef(el: ElementRef) {
    this.canvas = el.nativeElement;
  }

  constructor(
    hostRef: ElementRef,
    private sceneService: SceneService,
  ) {
    this.host = hostRef.nativeElement;
  }

  ngOnInit() {
    this.scene = this.sceneService.createScene();
  }

  ngAfterViewInit() {
    this.createRenderer();
    this.initScene();
    this.render();
  }

  addOnScene(...object: Object3D[]) {
    this.scene.add(...object);
    this.render();
  }

  removeFromScene(object: Object3D) {
    this.scene.remove(object);
    this.render();
  }

  createRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.host.clientWidth, this.host.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    const color = new Color(0xffffff);
    this.renderer.setClearColor(color, 1);
    this.renderer.autoClear = true;
  }

  render() {
    this.sceneService.requestAnimationFrame(() => this.renderer.render(this.scene, this.camera));
  }

  private initScene() {
    const {
      fieldOfView,
      nearClippingPane,
      farClippingPane,
    } = this;
    const aspectRatio = this.getAspectRatio();
    this.camera = this.sceneService.createCamera({
      fieldOfView,
      nearClippingPane,
      farClippingPane,
      aspectRatio,
    });

    const controls = this.sceneService.createControls(this.camera);
    controls.addEventListener('change', () => this.render());

    const lights = this.sceneService.createLight();
    this.scene.add(...lights);

    this.mouse = new Vector2();
    this.raycaster = new Raycaster();
  }

  private getAspectRatio() {
    const height = this.host.clientHeight;
    return (height === 0) ? 0 : this.host.clientWidth / height;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    this.renderer.setSize(
      this.host.clientWidth,
      this.host.clientHeight,
    );
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.render();
  }

  @HostListener('window:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    for (const object of intersects) {

    }
  }
}
