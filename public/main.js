var scene = new THREE.Scene()

const earth_texture = new THREE.TextureLoader().load('textures/earth.jpg');
const sphereGeom = new THREE.SphereGeometry(1, 32, 16)
const sphereMaterial = new THREE.MeshBasicMaterial({map: earth_texture})
const sphere = new THREE.Mesh(sphereGeom, sphereMaterial)
sphere.position.x = 0
sphere.position.x = 0
sphere.position.x = 0
sphere.castShadow = true;

var pointLight = new THREE.PointLight(0xffffff, 0.4)
pointLight.castShadow = true;

pointLight.position.z = 5

const nightsky_texture = new THREE.TextureLoader().load('textures/nightsky.jpg');
scene.background = nightsky_texture

var gui = new dat.GUI()
gui.add(pointLight.position, 'z', 0, 3)
gui.add(pointLight.position, 'x', -3, 3)
gui.add(pointLight, 'intensity', 0, 5)

scene.add(pointLight)
scene.add(sphere)


var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
)

camera.position.x = 1
camera.position.y = 2
camera.position.z = 5

camera.lookAt(new THREE.Vector3(0, 0, 0))
camera.rotation.z = Math.PI/180 * 90

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('grey') // sets background color, black by default
document.getElementById("webgl").appendChild(renderer.domElement)

var controls = new THREE.OrbitControls(camera, renderer.domElement)

// Request animation Frame is for continuous rendering
// Note the recursive structure here, (won't work otherwise)
function update(renderer, scene, camera, controls) {
        renderer.render(
                scene,
                camera
        );
        controls.update()
        requestAnimationFrame(function() {
                update(renderer, scene, camera, controls);
        })
}

update(renderer, scene, camera, controls)