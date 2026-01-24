import * as THREE from "three";

export default class Camera {
    private camera: THREE.PerspectiveCamera;

    private box = new THREE.Box3();
    private size = new THREE.Vector3();
    private center = new THREE.Vector3();

    constructor(camera: THREE.PerspectiveCamera, model: THREE.Object3D) {
        this.camera = camera;
        this.box = this.box.setFromObject(model);
    }

    public centerCamera(
        mouvement: (box: THREE.Box3, size: THREE.Vector3, center: THREE.Vector3) => void
    ) {
        this.box.getSize(this.size);
        this.box.getCenter(this.center);

        mouvement(this.box, this.size, this.center);
    }

    public positionCamera() {
        const fov = this.camera.fov * (Math.PI / 180);
        const distance = this.size.y / (2 * Math.tan(fov / 2));
        this.camera.position.set(0, 0, distance * 1.2);
        this.camera.lookAt(0, 0, 0);
    }

    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }
}