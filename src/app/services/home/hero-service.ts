import { ElementRef, Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private ambientLight!: THREE.AmbientLight;

  private model!: THREE.Object3D;
  private gltfLoader!: GLTFLoader;

  private PI = Math.PI;
  private floatAmplitude = .1;
  private floatSpeed = 1.5;


  public constructor(){
    this.gltfLoader = new GLTFLoader();
    gsap.registerPlugin(ScrollTrigger);
  }
  

  public createScene(canvas: ElementRef<HTMLCanvasElement>){

    // Scene
    this.scene = new THREE.Scene();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      antialias: true,
      alpha: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      40, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      100
    );

    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // Lights
    this.ambientLight = new THREE.AmbientLight(0xffffff, 5);
    this.scene.add(this.ambientLight);

    // Load 3d model
    this.loadModel();
  }

  private loadModel(){
    this.gltfLoader.load('/models/shoe.glb', (gltf) =>{

      this.model = gltf.scene;

      this.model.scale.set(.4, .4, .4);
      this.model.position.set(5, 0, 0);
      this.model.rotation.y = 0;

      this.scene.add(this.model);

      this.playInitialAnimation();

      // Setup scroll trigger after model is loaded
      this.setupScrollTrigger();

    });
  }

  private playInitialAnimation(){
    let tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'elastic.out(.7, .3)'
      }
    });

    tl
      .to(this.model.position, {x: 0})
      .to(this.model.rotation, {y: this.PI * 2}, '-=1');
  }


  public setupScrollTrigger(){
    ScrollTrigger.create({
      trigger: '#hero-1',
      start: 'top top',
      end: 'bottom top',
      scrub: .1,
      onUpdate: (self) => {
        if (this.model) {
          // Rotate based on scroll progress (0 to 1)
          const rotation = self.progress * this.PI * 2;
          this.model.rotation.x = rotation;
        }
      }
    });

    ScrollTrigger.create({
      trigger: '#hero-2',
      start: 'top top',
      end: `${window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
    })
  }

  public animate(){
    this.tick();

    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  private onResize(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  private tick(){
    if(this.scene && this.camera && this.renderer)
      this.renderer.render(this.scene, this.camera);

    if(this.model){
        const floatOffset = Math.sin(Date.now() * .001 * this.floatSpeed) * this.floatAmplitude;
        this.model.position.y = floatOffset;
    }

    window.requestAnimationFrame(() => this.tick());
  }

  public cleanup() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.scene) {
      this.scene.clear();
    }
  }
}
