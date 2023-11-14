import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')


//Create a Scene
const scene = new THREE.Scene()


//Create a Mesh
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material  = new THREE.MeshBasicMaterial({color: 0x0000FF})
const mesh = new THREE.Mesh(boxGeometry,material)
mesh.position.set(1,1,1)
scene.add(mesh)

//create a Camera
const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(0,0,10)
scene.add(camera)

//Create axes helper
var helper = new THREE.AxesHelper(0.5)
scene.add(helper)


//Create a renderer
const renderer = new THREE.WebGLRenderer({antialias:true, canvas:canvas})

renderer.setSize( window.innerWidth, window.innerHeight )

const controls = new OrbitControls( camera, renderer.domElement )
controls.update()

function animate() {

	requestAnimationFrame( animate )

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate()