import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Model {
    private loader: GLTFLoader;

    constructor(loader: GLTFLoader) {
        this.loader = loader;
    }

    public async init(model_url: string, scene: THREE.Scene, isVisible: boolean = true): Promise<THREE.Object3D> {
        const MODEL = await this.loadModel(`https://web-bucket.s3.fr-par.scw.cloud/${model_url}`);
        MODEL.visible = isVisible;
        scene.add(MODEL);
        return MODEL;
    }

    public loadModel(model_url: string): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            this.loader.setCrossOrigin('anonymous');
            this.loader.load(
                model_url,
                (gltf: GLTF) => resolve(gltf.scene),
                undefined,
                reject
            );
        });
    }
}