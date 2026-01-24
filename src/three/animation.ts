import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Animation {
    private mixer: THREE.AnimationMixer;
    private loader: GLTFLoader;

    private actions: Map<string, THREE.AnimationAction> = new Map();
    private basicAction!: THREE.AnimationAction;

    private fadein: number;
    private fadeout: number;

    constructor(
        model: THREE.Object3D,
        loader: GLTFLoader,
        basicAction_url: string,
        fadein: number = 0.5, fadeout: number = 0.8) {
        this.mixer = new THREE.AnimationMixer(model);
        this.loader = loader;

        this.fadein = fadein;
        this.fadeout = fadeout;

        this.setBasicAction(basicAction_url);
    }

    public loadAnimation(url: string): Promise<THREE.AnimationAction> {
        url = `https://guezoloic.com/data/${url}`;
        return new Promise((resolve, reject) => {
            if (this.actions.has(url)) return resolve(this.actions.get(url)!);
            this.loader.load(
                url,
                (gltf: GLTF) => {
                    if (!gltf.animations.length) return reject(new Error(`${url} has no animations`));
                    let clip = gltf.animations[0];

                    if (clip.tracks.some(track => track.name.endsWith('.position'))) {
                        clip = clip.clone();
                        clip.tracks = clip.tracks.filter(track => !track.name.endsWith('.position'));
                    }

                    const action = this.mixer.clipAction(clip);
                    action.stop();

                    this.actions.set(url, action);

                    resolve(action);
                },
                undefined,
                reject
            );
        });
    }

    public setBasicAction(url: string) {
        this.loadAnimation(url).then(action => {
            this.basicAction = action;
        });
    }

    public getBasicAction(): THREE.AnimationAction {
        const clipClone = this.basicAction.getClip().clone();
        const action = this.mixer.clipAction(clipClone);
        (action as any).isBasicClone = true;
        return action;
    }

    public getFadein(): number { return this.fadein; }

    public getFadeout(): number { return this.fadeout; }

    public update(delta: number) {
        this.mixer?.update(delta);
    }

    public getMixer(): THREE.AnimationMixer { 
        if (!this.mixer) throw new Error("Mixer not initialized yet!"); 
        return this.mixer 
    }
}