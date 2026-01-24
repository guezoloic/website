import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Main from "../three/main";

export default function Three() {
    const mountRef = useRef<HTMLDivElement>(null);  // Parent canva element
    const [loading, setLoading] = useState(true);   // Loading boolean element
    useEffect(() => {
        if (!window.WebGL2RenderingContext) return;

        const loadingManager = new THREE.LoadingManager(() => setLoading(false));
        new Main(mountRef.current!, loadingManager);
    }, []);

    // canva must exist before loading so that Main doesn't crash
    return (
        <div className="fixed w-full h-full inset-0 z-0 overflow-hidden">
            {window.WebGL2RenderingContext ?
                <>
                    <div ref={mountRef} className="top-0 left-0 w-full h-full" />
                    {loading && (
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                </>
                :
                <div className="text-white text-center mt-10">
                    WebGL2 is not supported.
                </div>
            }
        </div>
    );
};