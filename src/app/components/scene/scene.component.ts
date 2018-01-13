import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import {
  AmbientLight,
  Color, DirectionalLight,
  Fog,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';
import OrbitControls from 'orbit-controls-es6';

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
})
export class SceneComponent implements AfterViewInit, OnInit {
  @Input() fieldOfView = 30;
  @Input() nearClippingPane = 1;
  @Input() farClippingPane = 10000;

  scene: Scene;
  controls: OrbitControls;

  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private host: HTMLCanvasElement;
  private canvas: HTMLCanvasElement;

  @ViewChild('canvas')
  private set canvasRef(el: ElementRef) {
    this.canvas = el.nativeElement;
  }

  constructor(hostRef: ElementRef) {
    this.host = hostRef.nativeElement;
  }

  ngOnInit() {
    this.createScene();
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
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    const color = new Color(0xffffff);
    this.renderer.setClearColor(color, 1);
    this.renderer.autoClear = true;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.host.clientWidth,
      this.host.clientHeight,
    );
    this.render();
    // this.initScene();
  }

  private createScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0xcce0ff);
    this.scene.fog = new Fog(0xcce0ff, 500, 15000);
  }

  private initScene() {
    this.createLight();
    this.createCamera();
    this.createControls();
  }

  private createCamera() {
    const aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane,
    );
    this.camera.position.x = 1000;
    this.camera.position.y = 50;
    this.camera.position.z = 1500;
    this.camera.zoom = 0;
  }

  private createControls() {
    this.controls = new OrbitControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;
    this.controls.addEventListener('change', () => this.render());
  }

  private createLight() {
    const d = 300;
    const light = new DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.far = 1000;
    this.scene.add(light);
    this.scene.add(new AmbientLight(0x666666));
  }

  private getAspectRatio() {
    const height = this.host.clientHeight;
    return (height === 0) ? 0 : this.host.clientWidth / height;
  }
}
