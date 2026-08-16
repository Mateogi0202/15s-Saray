import { useEffect, useRef } from "react";
import * as THREE from "three";

const CROWN_TEXTURE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuANzMk4555smBtcVGD3iwk0peJMdn3v0l1yWmc1B3YnT6Lvg8nbhRnWM_PinXV1DIENf6pEoRkCKUY_7YoYXXm9leDJOhoz4TVbe2irg7L2g3a6mhGzI6_9LaTnYmseFkTegHDk1yqypTFMtY4i_6kYx28ktxzTx9-DXJ-Nib2_0Pazyi-cvjJOP7EubeP6JzP8lpFlyD8KUfAwMQ37yPloOp5XVyUKyIU3Hi2BuMr93K2ouWUD8mcRkWfLGuunplb_O1s";

export default function CrownParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const crownCount = 15;
    const crowns = [];

    const textureLoader = new THREE.TextureLoader();
    const crownTexture = textureLoader.load(CROWN_TEXTURE_URL);

    function createCrown() {
      const geometry = new THREE.PlaneGeometry(0.2, 0.2);
      const material = new THREE.MeshBasicMaterial({
        map: crownTexture,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      return new THREE.Mesh(geometry, material);
    }

    for (let i = 0; i < crownCount; i++) {
      const crown = createCrown();
      crown.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      crown.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      crown.userData = {
        baseX: crown.position.x,
        baseY: crown.position.y,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speedX: 0.0005 + Math.random() * 0.001,
        speedY: 0.0005 + Math.random() * 0.001,
        ampX: 0.2 + Math.random() * 0.3,
        ampY: 0.2 + Math.random() * 0.3,
        rotSpeedX: (Math.random() - 0.5) * 0.002,
        rotSpeedY: (Math.random() - 0.5) * 0.002,
      };
      scene.add(crown);
      crowns.push(crown);
    }

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 5;

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      crowns.forEach((crown) => {
        crown.position.x =
          crown.userData.baseX +
          Math.sin(now * crown.userData.speedX + crown.userData.phaseX) *
            crown.userData.ampX;
        crown.position.y =
          crown.userData.baseY +
          Math.cos(now * crown.userData.speedY + crown.userData.phaseY) *
            crown.userData.ampY;
        crown.rotation.x += crown.userData.rotSpeedX;
        crown.rotation.y += crown.userData.rotSpeedY;
      });
      renderer.render(scene, camera);
    }

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -5,
        pointerEvents: "none",
      }}
    />
  );
}
