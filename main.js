import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x1A202C, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

camera.position.z = 10;

var glbS

const loader = new GLTFLoader();
loader.load('dog2.glb', function (gltf) {
    glbS = gltf.scene;
    scene.add(glbS)
    console.log(glbS);

    glbS.castShadow = false
    glbS.receiveShadow = false

    glbS.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = false
            child.receiveShadow = false
        }
    })
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 10
//sc10ne.add(light);

const light2 = new THREE.AmbientLight(0xcccccc, 1)
light2.position.x = 100000
scene.add(light2)

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();