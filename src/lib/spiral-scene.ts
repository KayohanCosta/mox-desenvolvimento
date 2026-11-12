import * as THREE from "three";
import { publishedProjects } from "@/lib/projects";

/** Independent implementation of the observed radial-conveyor behavior. */
export async function createSpiralScene(
  root: HTMLElement,
  options: { paused: () => boolean; focused: () => number | null },
) {
  const hero = root.closest("section")!;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  const mobile = window.innerWidth < 1024;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.2 : 1.5));
  renderer.setClearColor(0x09090b, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = "spiral-webgl";
  renderer.domElement.setAttribute("aria-hidden", "true");
  root.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 1, 6000);
  const loader = new THREE.TextureLoader();
  const textures = await Promise.all(
    publishedProjects.map((project) =>
      loader.loadAsync(
        `/_next/image?url=${encodeURIComponent(project.image!)}&w=640&q=75`,
      ),
    ),
  );
  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  });
  const geometry = new THREE.PlaneGeometry(1, 1, 10, 6);
  const slots = Array.from(root.querySelectorAll<HTMLElement>(".orbit-slot"));
  const count = mobile ? 15 : window.innerWidth >= 1600 ? 30 : 24;
  const arms = mobile ? 3 : 6;
  const vertex = `varying vec2 vUv; uniform float uCurve;uniform vec2 uPointer;uniform float uHover;void main(){vUv=uv;vec3 p=position;vec2 c=uv-.5;p.z-=dot(c,c)*uCurve;float d=length((uv-uPointer)*vec2(1.65,1.));p.z+=exp(-d*d*12.)*uHover*32.;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
  const fragment = `uniform sampler2D uMap;uniform float uOpacity;uniform float uBlur;uniform vec2 uCrop;uniform float uHover;varying vec2 vUv;void main(){vec2 p=abs(vUv-.5)-vec2(.485,.472);float corner=length(max(p,0.))+min(max(p.x,p.y),0.)-.012;float mask=1.-smoothstep(-.003,.003,corner);vec2 uv=vec2((vUv.x-.5)*uCrop.x+.5,1.-(1.-vUv.y)*uCrop.y);vec2 d=vec2(uBlur);vec4 col=texture2D(uMap,uv)*.4;col+=(texture2D(uMap,uv+vec2(d.x,0.))+texture2D(uMap,uv-vec2(d.x,0.))+texture2D(uMap,uv+vec2(0.,d.y))+texture2D(uMap,uv-vec2(0.,d.y)))*.15;float frame=smoothstep(-.012,-.003,corner);col.rgb=mix(col.rgb,vec3(.55,.4,.7),frame*.4);col.rgb*=.88+uHover*.12;gl_FragColor=vec4(col.rgb,mask*uOpacity);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>}`;
  const meshes = Array.from({ length: count }, (_, index) => {
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uMap: { value: textures[index % textures.length] },
        uOpacity: { value: 1 },
        uBlur: { value: 0 },
        uCrop: { value: new THREE.Vector2(1, 1) },
        uCurve: { value: 24 },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.project = index % publishedProjects.length;
    scene.add(mesh);
    return mesh;
  });
  let width = 1,
    height = 1,
    distance = 1,
    time = 0,
    travel = 0,
    last = performance.now(),
    frame = 0,
    dead = false,
    hover = -1,
    speed = 1,
    px = -9999,
    py = -9999,
    scrollOffset = 0;
  let particlePositions = meshes.map(() => ({ x: 0, y: 0, w: 1, h: 1, p: 0 }));
  const pointer = new THREE.Vector2(-99, -99);
  const raycaster = new THREE.Raycaster();
  const projectPoint = new THREE.Vector3();
  const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const smooth = (a: number, b: number, n: number) => {
    const t = clamp((n - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const resize = () => {
    width = root.clientWidth;
    height = root.clientHeight;
    distance = height / (2 * Math.tan(THREE.MathUtils.degToRad(20)));
    camera.aspect = width / height;
    camera.position.z = distance;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(root);
  const updatePointer = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    px = event.clientX - rect.left - width / 2;
    py = height / 2 - (event.clientY - rect.top);
    pointer.set(
      ((event.clientX - rect.left) / width) * 2 - 1,
      (-(event.clientY - rect.top) / height) * 2 + 1,
    );
  };
  const leave = () => {
    pointer.set(-99, -99);
    px = -9999;
    py = -9999;
    hover = -1;
    renderer.domElement.style.cursor = "";
  };
  const click = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes)[0];
    if (hit) {
      const project = publishedProjects[hit.object.userData.project];
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };
  renderer.domElement.addEventListener("pointermove", updatePointer);
  renderer.domElement.style.touchAction = "pan-y";
  renderer.domElement.addEventListener("pointerleave", leave);
  renderer.domElement.addEventListener("click", click);
  const lost = (event: Event) => {
    event.preventDefault();
    delete root.dataset.orbitReady;
    root.dataset.renderer = "fallback";
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  const guides = root.querySelector<SVGSVGElement>(".spiral-guides");
  const pulses = root.querySelectorAll<SVGPathElement>(".spiral-pulse");
  let previousPaint = 0;
  let lastHitTest = 0;
  const paint = (now: number) => {
    if (dead) return;
    frame = requestAnimationFrame(paint);
    if (now - previousPaint < 1000 / 30) return;
    previousPaint = now;
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    const bounds = hero.getBoundingClientRect();
    if (document.hidden || bounds.bottom < 0 || bounds.top > innerHeight)
      return;
    time += delta;
    const holding = hover >= 0 || options.focused() !== null;
    speed +=
      (holding ? 0 : 1 - speed) *
      (1 - Math.exp(-delta / (holding ? 0.25 : 0.8)));
    if (holding) speed *= Math.exp(-delta / 0.3);
    if (!options.paused())
      travel += delta * 0.009 * speed * (1 + 1.6 * Math.exp(-time / 1.2));
    scrollOffset = -bounds.top * 0.00018;
    const diagonal = Math.hypot(width, height) / 2;
    const spin = -time * 0.012;
    const journey = travel + scrollOffset;
    particlePositions = meshes.map((mesh, index) => {
      const arm = index % arms;
      const row = Math.floor(index / arms);
      const rows = Math.ceil(count / arms);
      const p = ((row + 0.55 + arm * 0.39) / rows + journey) % 1;
      const radius = diagonal * (0.055 + Math.pow(p, 0.92) * 1.5);
      const theta =
        (arm * Math.PI * 2) / arms +
        (radius / (diagonal * 0.74)) * Math.PI * 2 * 0.85 +
        spin;
      const wobble = 5 * Math.sin(time * 0.9 + index * 2.4);
      let x = Math.cos(theta) * radius + wobble;
      let y =
        Math.sin(theta) * radius * 0.95 + 5 * Math.cos(time * 0.8 + index);
      const near = Math.max(0, 1 - Math.hypot(x - px, y - py) / 300);
      if (near > 0 && px > -9000) {
        x += (px - x) * near * 0.025;
        y += (py - y) * near * 0.025;
      }
      return { x, y, w: 0, h: 0, p };
    });
    particlePositions.forEach((point, index) => {
      const mesh = meshes[index],
        p = point.p;
      const aspect = 1.1 + 0.55 * smooth(0, 0.35, p);
      let safeHeight = 1000;
      particlePositions.forEach((other, j) => {
        if (index !== j)
          safeHeight = Math.min(
            safeHeight,
            Math.max(
              Math.abs(point.x - other.x) / aspect,
              Math.abs(point.y - other.y),
            ) * 0.88,
          );
      });
      const base =
        Math.min(height * 0.25, 250) * (0.25 + 1.05 * Math.pow(p, 0.75));
      const h = Math.min(base, Math.max(24, safeHeight));
      point.h = h;
      point.w = h * aspect;
      mesh.position.set(point.x, point.y, p * 45);
      mesh.scale.set(point.w, point.h, 1);
      mesh.rotation.set(
        Math.sin(index + time * 0.1) * 0.05,
        Math.cos(index + time * 0.1) * 0.11,
        Math.sin(index) * 0.018,
      );
      const center = Math.hypot(
        point.x / (width * 0.26),
        point.y / (height * 0.29),
      );
      const reveal = smooth(0, 0.75, time - p * 0.4);
      mesh.material.uniforms.uOpacity.value =
        smooth(0, 0.12, p) * (0.22 + 0.78 * smooth(0.45, 1.3, center)) * reveal;
      mesh.material.uniforms.uBlur.value = 0.025 * (1 - smooth(0, 0.24, p));
      const crop = mesh.material.uniforms.uCrop.value as THREE.Vector2;
      const imageAspect = 1.44;
      crop.set(
        Math.min(1, aspect / imageAspect),
        Math.min(1, imageAspect / aspect),
      );
      mesh.material.uniforms.uCurve.value = 46 + 16 * Math.sin(index);
      mesh.material.uniforms.uHover.value +=
        (Number(hover === index) - mesh.material.uniforms.uHover.value) *
        (1 - Math.exp(-delta * 8));
      if (index < slots.length) {
        projectPoint.copy(mesh.position).project(camera);
        const factor = distance / (distance - mesh.position.z);
        const slot = slots[index];
        slot.style.transform = `translate3d(${((projectPoint.x + 1) * width) / 2}px,${((1 - projectPoint.y) * height) / 2}px,0) translate(-50%,-50%)`;
        slot.style.width = `${Math.max(44, point.w * factor)}px`;
        slot.style.height = `${Math.max(32, point.h * factor)}px`;
      }
    });
    scene.updateMatrixWorld();
    camera.updateMatrixWorld();
    if (px > -9000 && now - lastHitTest > 100) {
      lastHitTest = now;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes)[0];
      hover = hit ? meshes.indexOf(hit.object as (typeof meshes)[number]) : -1;
      renderer.domElement.style.cursor = hover >= 0 ? "pointer" : "";
      if (hit?.uv) meshes[hover].material.uniforms.uPointer.value.copy(hit.uv);
    }
    if (guides) guides.style.transform = `rotate(${(spin * 180) / Math.PI}deg)`;
    pulses.forEach((path, i) => {
      path.style.strokeDashoffset = String(-time * 60 - i * 220);
    });
    renderer.render(scene, camera);
    root.dataset.orbitReady = "true";
    root.dataset.renderer = "webgl";
  };
  frame = requestAnimationFrame(paint);
  return () => {
    dead = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    renderer.domElement.removeEventListener("pointermove", updatePointer);
    renderer.domElement.removeEventListener("pointerleave", leave);
    renderer.domElement.removeEventListener("click", click);
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    delete root.dataset.orbitReady;
    delete root.dataset.renderer;
    slots.forEach((slot) => {
      slot.style.transform = "";
      slot.style.width = "";
      slot.style.height = "";
    });
    textures.forEach((texture) => texture.dispose());
    meshes.forEach((mesh) => mesh.material.dispose());
    geometry.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
