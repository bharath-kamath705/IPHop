function latLongToXYZ(geoLoc)
{
        let pos = {x:0, y:0, z:0};
        let geoLoc_radian = {lat: 0, long: 0}
        for(var coordinate in geoLoc)
        {
                geoLoc_radian[coordinate] =  geoLoc[coordinate] * Math.PI/180
                geoLoc_radian[coordinate] *= -1 // Correction due to inverted texture wrap
        }
        pos.x = Math.cos(geoLoc_radian.long)
        pos.y = Math.sin(geoLoc_radian.lat) * Math.sin(geoLoc_radian.long)
        pos.z = Math.cos(geoLoc_radian.lat) * Math.sin(geoLoc_radian.long)
        return pos
}
var scene = new THREE.Scene()

const earth_texture = new THREE.TextureLoader().load('textures/earth.jpg');
const sphereGeom = new THREE.SphereGeometry(1, 32, 16)
const sphereMaterial = new THREE.MeshBasicMaterial({map: earth_texture})
const sphere = new THREE.Mesh(sphereGeom, sphereMaterial)
sphere.position.x = 0
sphere.position.y = 0
sphere.position.z = 0
sphere.castShadow = true;

const markerGeom = new THREE.SphereGeometry(0.025, 32, 16)
const markerMaterial = new THREE.MeshBasicMaterial({color: 'red'})
const marker = new THREE.Mesh(markerGeom, markerMaterial)

pos = latLongToXYZ({lat: -25.27, long: 133.77})

marker.position.x = pos.x
marker.position.y = pos.y
marker.position.z = pos.z

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
scene.add(marker)


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