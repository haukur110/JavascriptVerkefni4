let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {

	container = document.querySelector( '#scene-container' );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 'skyblue' );

	const fov = 35;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 1000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set( 0, 0, 10 );

	CreateBatman();

	Lighting();

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( container.clientWidth, container.clientHeight );
	renderer.setPixelRatio( window.devicePixelRatio );

	container.appendChild( renderer.domElement );

	//Næ ekki að láta orbit controls virka, búinn að kalla á það í html-inu og er með file-ið í js
	//controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function CreateBatman() {
	//Geometry
	const maskGeometry = new THREE.SphereGeometry( 1, 16, 16);
	const faceGeomentry = new THREE.SphereGeometry( 0.5, 3, 3);
	const eyeGeomentry = new THREE.SphereGeometry( 0.15, 9, 9);
	const earGeometry = new THREE.ConeBufferGeometry(0.6, 1.6, 3);

	//Materials
	const maskMaterial = new THREE.MeshStandardMaterial( { color: 0xf1f47 } );
	const faceMaterial = new THREE.MeshStandardMaterial( { color: 0xffbcaf } );
	const eyeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );

	//Mesh
	maskMesh = new THREE.Mesh( maskGeometry, maskMaterial);
	faceMesh = new THREE.Mesh( faceGeomentry, faceMaterial);
	eyeMeshL = new THREE.Mesh( eyeGeomentry, eyeMaterial);
	eyeMeshR = new THREE.Mesh( eyeGeomentry, eyeMaterial);
	earMeshL = new THREE.Mesh( earGeometry, maskMaterial);
	earMeshR = new THREE.Mesh( earGeometry, maskMaterial);

	//Munnur position og rotation
	faceMesh.translateZ( 1 );
	faceMesh.translateY( -0.25 );
	faceMesh.rotation.z = 1.55;

	//eyeL position
	eyeMeshL.translateZ(1);
	eyeMeshL.translateY(0.3);
	eyeMeshL.translateX(0.4);

	//eyeR position
	eyeMeshR.translateZ(1);
	eyeMeshR.translateY(0.3);
	eyeMeshR.translateX(-0.4);

	//earL position
	earMeshL.translateY(1);
	earMeshL.translateX(0.45);

	//earR position
	earMeshR.translateY(1);
	earMeshR.translateX(-0.45);

	//group-a öll mesh-in saman
	var batman = new THREE.Group();
	batman.add(maskMesh);
	batman.add(faceMesh);
	batman.add(eyeMeshL);
	batman.add(eyeMeshR);
	batman.add(earMeshL);
	batman.add(earMeshR);

	//Adda group-inu við senuna
	scene.add(batman);
}

function Lighting(){
	//Búa til directional light
	const light = new THREE.DirectionalLight( 0xffffff, 5.0 );

	//Breyta staðsettningu
	light.position.set( 2, 10, 10 );

	//Bæta lósinu við senuna
	scene.add( light );
}


function animate() {

	// kallar á sjálfan sig, til að spila á hverjum frame
	requestAnimationFrame( animate );

	//controls.Update();

	// render-a senuna á hverju, frame
	renderer.render( scene, camera );
}

//set everything up
init();
//render the scene
animate();