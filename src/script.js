import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


console.log(window.devicePixelRatio);

// Canvas
const canvas = document.querySelector('canvas.webgl')


//Create a Scene
const scene = new THREE.Scene()

// scene.background = new THREE.Color( 0xffffff )
// scene.fog = new THREE.Fog( 0xffffff, 0, 750 )

const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 2.5 )
light.position.set( 0.5, 1, 0.75 )
scene.add( light )


//Create a Mesh
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material  = new THREE.MeshBasicMaterial({color: 0x00ff22,wireframe:false})
const mesh = new THREE.Mesh(boxGeometry,material)
mesh.position.set(1,1,1)
scene.add(mesh)

//create a Camera
const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(0,0,10)
scene.add(camera)


//Create a renderer
const renderer = new THREE.WebGLRenderer( { antialias: true,canvas:canvas } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


var sizes = {
	width: window.innerWidth,
	height:window.innerHeight

}

window.addEventListener('dblclick',()=>{

	const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;


	
	if(!fullscreenElement)
	{
		if(canvas.requestFullscreen)
		{
			canvas.requestFullscreen()
		}
		else if(canvas.webkitRequestFullscreen)
		{
			canvas.webkitRequestFullscreen()
		}
	}
	else{
		if(document.exitFullscreen)
		{
			document.exitFullscreen()
		}
		else if(document.webkitExitFullscreen)
		{
			document.webkitExitFullscreen()
		}

		
	}
})

window.addEventListener('resize',()=>{
	sizes.width= window.innerWidth
	sizes.height=window.innerHeight

	camera.aspect = sizes.width/sizes.height
	camera.updateProjectionMatrix()

	renderer.setSize( sizes.width, sizes.height )
	renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

})

renderer.setSize( sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const controls = new OrbitControls( camera, renderer.domElement )
controls.update()




function animate() {

	requestAnimationFrame( animate )


	camera.lookAt(mesh.position)
	
	renderer.render( scene, camera )

}

animate()
