
//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
//  And from an example by Pedro Iglésias
//
// 		J. Madeira - April 2021


// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,  // NEW
    renderer: null,
    textGeometry: null,
};


// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event)
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	event.preventDefault();

	// update the mouse variable
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

//////////////////////////////////////////////////////////////////

function makeHead() {
    const radius =  1.0;  
    const tubeRadius =  4.4;  
    const radialSegments = 30;  
    const tubularSegments = 100;  
    const geometry = new THREE.TorusGeometry(radius, tubeRadius,radialSegments, tubularSegments);
    const material = new THREE.MeshBasicMaterial({color: 0xf7e7ce});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.1, 0.1, 0.1);
    return mesh;
}
function createLathe() {
    const points = [];
    for (var i = 0; i < 5; i+=0.5) {
        points.push(new THREE.Vector3(i + 4, 0.5*i*i, 0));
    }

    for (var i = 11.125; i < 16; i++ ) {
        points.push(new THREE.Vector3(8.5, i + 0.1*i, 0));
    }

    
    points.push(new THREE.Vector3(8, 18.25, 0));
    points.push(new THREE.Vector3(7.5, 20.125, 0));
    points.push(new THREE.Vector3(7, 21.75, 0));
    points.push(new THREE.Vector3(6.5, 23.125, 0));
    points.push(new THREE.Vector3(6, 24.25, 0));
    points.push(new THREE.Vector3(5.5, 25.125, 0));
    points.push(new THREE.Vector3(5, 25.75, 0));
    points.push(new THREE.Vector3(4.5, 26.125, 0));
    points.push(new THREE.Vector3(4, 26.25, 0));

    
    //console.log(points);

    const segments = 50;  
    const phiStart = Math.PI * 2.00;  
    const phiLength = Math.PI * 2.00;  
    const geometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
        const material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true} );
    const lathe = new THREE.Mesh( geometry, material );
    return lathe;

}

function createEdges(geometry) {
    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    return line;
}

function createPiece(color) {
    const shape = new THREE.Shape();
    const x = -0.5;
    const y = 0;
    shape.moveTo(-0.5, 0);
    shape.lineTo(0, 1);
    shape.lineTo(0.5, 0);
    shape.bezierCurveTo(0.2, -0.1, -0.2, -0.1, -0.5, 0);
    
    const extrudeSettings = {
        steps: 2,  
        depth: 0.05,  
        bevelEnabled: true,  
        bevelThickness: 0.1,  
        bevelSize: 0.1,  
        bevelSegments: 0,  
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var material = new THREE.MeshBasicMaterial( {color: color} );
    var mesh = new THREE.Mesh( geometry, material);
    return mesh;
}

function loadFont(url) {
    const loader = new THREE.FontLoader();
    return new Promise((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
  }

  async function doit() {
    const font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');  
    const geometry = new THREE.TextGeometry('three.js', {
      font: font,
      size: 3.0,
      height: .2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: .3,
      bevelSegments: 5,
    });
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00ff00}));
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
    sceneElements.sceneGraph.add(mesh);
  }

function createText() {
    
var loader = new THREE.FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.js', function ( font ) {

  var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );

  var geometry = new THREE.TextGeometry( 'Hello three.js!', {
    font: font,
    size: 20000000000,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  } );

  var mesh = new THREE.Mesh( geometry, material );

  sceneElements.sceneGraph.add(mesh);

  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 1 ).normalize();
  sceneElements.sceneGraph.add(light);


  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  renderer.render(  sceneElements.sceneGraph, sceneElements.camera );

} );
console.log(loader);
  }


// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {
    // ************************** //
    // Create a ground plane
    // ************************** //
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 'rgb(200, 200, 200)', side: THREE.DoubleSide });
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);

    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

    var center = new THREE.Object3D();
    center.name = "center";

    for (var i=0; i<100; i++) {
        var piece = createPiece(0x00472a);
        center.add(piece);
        piece.position.y = 1;
        piece.position.x = Math.cos(1 + i*0.1);
        piece.position.z = Math.sin(1 + i*0.1);
        //console.log(piece);
    }
    var randomNumber = Math.random();
    for (var i=0; i<100; i++) {
        var piece = createPiece(0x00472a);
        //piece.scale.set(0.5,0.5,0.5);
        center.add(piece);
        piece.position.y = 2;
        piece.position.x = Math.cos(1 + i*0.1)/1.1;
        //piece.rotation.y = Math.PI * randomNumber;
        piece.position.z = Math.sin(1 + i*0.1)/1.1;
    }

    var randomNumber = Math.random();
    for (var i=0; i<100; i++) {
        var piece = createPiece(0x00472a);
        //piece.scale.set(0.5,0.5,0.5);
        center.add(piece);
        piece.position.y = 3;
        piece.position.x = Math.cos(1 + i*0.1)/1.2;
        //piece.rotation.y = Math.PI * randomNumber;
        piece.position.z = Math.sin(1 + i*0.1)/1.2;
    }
    var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    var randomNumber = Math.random();
    for (var i=0; i<100; i++) {
        var piece = createPiece(0x00472a);
        //piece.scale.set(0.5,0.5,0.5);
        center.add(piece);
        piece.position.y = 4;
        piece.position.x = Math.cos(1 + i*0.1)/1.3;
        //piece.rotation.y = Math.PI * randomNumber;
        piece.position.z = Math.sin(1 + i*0.1)/1.3;
    }
    var randomNumber = Math.random();
    for (var i=0; i<400; i++) {
        var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        var piece = createPiece(randomColor);
        piece.scale.set(1.3, 1.3, 1.3);
        center.add(piece);
        piece.position.y = 5.2;
        //piece.position.x = Math.cos(i)/3;
        piece.rotation.y = THREE.Math.degToRad(i);
        //piece.position.z = Math.sin(i)/3;
    }

    var lathe1 = createLathe();
    sceneGraph.add(lathe1);
    lathe1.position.x = -2;
    lathe1.position.y = 10;

    var head1 = makeHead();
    head1.position.y = 2;
    head1.position.x = 5;
    sceneGraph.add(head1);
    /*
        NICE IDEA TO MAKE A NEW KIND OF TREE!! :)
    for (var i=0; i<100; i++) {
        var piece = createPiece(0x000000);
        //piece.scale.set(0.5,0.5,0.5);
        center.add(piece);
        piece.position.y = 4;
        piece.position.x = Math.cos(1 + i*0.1)/1.3;
        piece.rotation.y = Math.PI * Math.random() * 10;
        piece.position.z = Math.sin(1 + i*0.1)/1.3;
    }
    */


    sceneGraph.add(center);

    /*
    var piece1 = createPiece();
    sceneGraph.add(piece1);
    piece1.position.y = 1;
    var edges1 = createEdges(piece1.geometry);
    sceneGraph.add(edges1);
    edges1.position.y = 1;
    var piece2 = createPiece();
    sceneGraph.add(piece2);
    piece2.position.y = 1;
    piece2.position.x = 1.2;
    var edges2 = createEdges(piece2.geometry);
    sceneGraph.add(edges2);
    edges2.position.y = 1;
    edges2.position.x = 1.2;
    var piece3 = createPiece();
    sceneGraph.add(piece3);
    piece3.position.y = 1;
    piece3.position.x = -1.2;
    var edges3 = createEdges(piece3.geometry);
    sceneGraph.add(edges3);
    edges3.position.y = 1;
    edges3.position.x = -1.2;
    var piece4 = createPiece();
    sceneGraph.add(piece4);
    piece4.position.y = 1.2;
    piece4.position.x = 0.6;
    var edges4 = createEdges(piece4.geometry);
    sceneGraph.add(edges4);
    edges4.position.y = 1.2;
    edges4.position.x = 0.6;
    */
    
    // Create raycaster (for tree color change)
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2(1, 1);

    // Create text (lyrics of the Skye Boat Song, from the Outlander series)
    doit();
}

// Displacement value

var delta = 0.1;

var dispX = 0.2, dispZ = 0.2;

function computeFrame(time) {
    
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, sceneElements.camera );
	
	// calculate objects intersecting the picking ray
    var array = sceneElements.sceneGraph.getObjectByName("center").children;
    
    // for (var i = 0; i < array.length; )

    var intersects = raycaster.intersectObjects( sceneElements.sceneGraph.getObjectByName("center").children);
    //console.log(intersects);

        

    if ( intersects.length > 0 && array.includes(intersects[0].object)) {
        intersects[0].object.material.color.set( 0xff0000 );
        
    
    } else {
        for (var k = 0; k < array.length; k++) {
            array[k].material.color.set( 0x00472a);
        }
        
    
    }
    /*
    for (var k = 0; k < array.length; k++) {
		if ( intersects.length > 0 && array.includes(intersects[0].object)) {
	
            array[k].material.color.set( 0xff0000 );
        
        } else {
        
            array[k].material.color.set( 0x00472a);
        
        }
    }
    */



	

	

    // Rendering
    helper.render(sceneElements);

    // NEW --- Update control of the camera
    sceneElements.control.update();

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}