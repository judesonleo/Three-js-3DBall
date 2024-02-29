import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
//Scene
const scene = new THREE.Scene()

//Sphere
const geomentry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})

//Mesh
const mesh = new THREE.Mesh(geomentry, material)
scene.add(mesh)


//Sizes
const sizes={
  width:innerWidth,
  height:innerHeight,
}
//light
const light = new THREE.PointLight(0xffffff,1,100)
light.position.set(1,10,10)
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height, 1)
camera.position.z = 20
scene.add(camera)




//Render in html
const canvas =  document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2);
renderer.render(scene, camera)

// Resize

window.addEventListener('resize',()=>{
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera
  camera.aspect= sizes.width/sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})


//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan=false
controls.enableZoom =false;
controls.autoRotate=true;
controls.autoRotateSpeed =4;


const loop=()=>{
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Drag Animations
let mouseDown=false;
let rgb=[]
window.addEventListener("mousedown",()=>(mouseDown=true))
window.addEventListener("mouseup",()=>(mouseDown=false))
window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
rgb =[
  Math.round((e.pageX / sizes.width) * 255),
  Math.round((e.pageX / sizes.width) * 255 ),
      200,
    ]
  
  
  //Animation
  let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
//gsap.to(mesh.material.color,{r:rgb[0],g:rgb[1],b:rgb[2]})
console.log(newColor.r,newColor.g,newColor.b)
gsap.to(mesh.material.color,{
  r:newColor.r,
  g:newColor.g,
  b:newColor.b})
console.log(newColor.r,newColor.g,newColor.b)
console.log(Math.round((e.pageX / sizes.width) *255))
console.log(Math.round((e.pageX / sizes.width) *255))
  }
})
