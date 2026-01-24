import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Model from "./model";
import Camera from "./camera";
import Animation from "./animation";

import assets from "../json/assets.json"
import AnimationQueue from "./animQueue";

export default class Main {
    private element!: HTMLElement;
    private loadingManager?: THREE.LoadingManager;

    private scene!: THREE.Scene;
    private renderer!: THREE.WebGLRenderer;
    private camera!: THREE.PerspectiveCamera;

    private controls!: OrbitControls;
    private loader!: GLTFLoader;
    private clock: THREE.Clock;

    private animation!: Animation;

    constructor(htmlelement: HTMLElement, loadingManager?: THREE.LoadingManager) {
        this.element = htmlelement;
        this.loadingManager = loadingManager;
        this.clock = new THREE.Clock();

        this.init();
    }

    private async init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,                                                     // fov
            this.element.clientWidth / this.element.clientHeight,   // aspect
            0.1, 1000                                               // near, far
        );

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(
            this.element.clientWidth,
            this.element.clientHeight
        );
        this.element.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        this.controls = new OrbitControls(this.camera, this.element);
        this.controls.minPolarAngle = Math.PI / 2;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;

        this.renderer.domElement.style.touchAction = 'pan-y';

        this.loader = new GLTFLoader(this.loadingManager);

        window.addEventListener("resize", () => {
            const WIDTH = window.innerWidth;
            const HEIGHT = window.innerHeight;

            this.camera.aspect = WIDTH / HEIGHT;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(WIDTH, HEIGHT);
        });

        const MODEL = await (new Model(this.loader)).init(assets.model, this.scene);

        const CAMERA = new Camera(this.camera, MODEL);
        CAMERA.centerCamera((_box: any, size: any, center: any) => {
            MODEL.position.sub(center);
            MODEL.position.y -= size.y * 0.3;
        });
        CAMERA.positionCamera();

        // Animation
        this.animation = new Animation(MODEL, this.loader, assets.idle_animation);

        const ANIMATION_QUEUE = new AnimationQueue(this.animation);
        ANIMATION_QUEUE.onqueue(await this.animation.loadAnimation(assets.welcome_animation));
        ANIMATION_QUEUE.startRandom();

        this.animate();
    }

    // animate must be an arrow key so that "this" 
    // can be pointed to the Main instance
    private animate = () => {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        if (this.animation) this.animation.update(delta);

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}