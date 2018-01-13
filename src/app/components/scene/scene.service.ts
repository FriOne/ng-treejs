import { Injectable } from '@angular/core';
import { AmbientLight, Color, DirectionalLight, Fog, Light, PerspectiveCamera, Scene } from 'three';
import OrbitControls from 'orbit-controls-es6';

@Injectable()
export class SceneService {

  createCamera({fieldOfView, aspectRatio, nearClippingPane, farClippingPane}: any): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearClippingPane,
      farClippingPane,
    );
    camera.position.x = 1000;
    camera.position.y = 50;
    camera.position.z = 1500;
    camera.zoom = 0;
    return camera;
  }

  createScene(): Scene {
    const scene = new Scene();
    scene.background = new Color(0xcce0ff);
    scene.fog = new Fog(0xcce0ff, 500, 15000);
    return scene;
  }

  createControls(camera): OrbitControls {
    const controls = new OrbitControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 5000;
    return controls;
  }

  createLight(): Light[] {
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
    const ambientLight = new AmbientLight(0x666666);
    return [ambientLight, light];
  }
}
