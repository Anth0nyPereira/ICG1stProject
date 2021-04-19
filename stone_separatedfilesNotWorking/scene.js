
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

function generatePoints() {    
    var points = [];
    for (var i = 0; i < 25; i++) {
    var randomX = Math.round(Math.random() * 4);
    var randomY = Math.round(Math.random() * 25);
    var randomZ = Math.round(Math.random() * 4);
    
    points.push(new THREE.Vector3(randomX, randomY, randomZ));
    //console.log(new THREE.Vector3(randomX, randomY, randomZ));
}
return points;
}

function goodPointsArray(array) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        var point = array[i];
        if (point.y == 0) {
        count = count + 1;
        }
    }
    if (count >= 3) {
        return true;
    } else {
        return false;
    }
}

function makeStone() {

    var points = generatePoints();
    var bool = goodPointsArray(points);

    while (!bool) {
        points = generatePoints();
        bool = goodPointsArray(points);
    }

    var material = new THREE.MeshBasicMaterial({
    color: "rgb(128,128,128)",
    transparent: true,

    });

    var material2 = new THREE.MeshLambertMaterial(material);

    // use the same points to create a convexgeometry
    const convexGeometry = new THREE.ConvexGeometry(points);
    convexGeometry.computeVertexNormals();
    convexGeometry.computeFaceNormals();
    convexGeometry.normalsNeedUpdate = true;
    var stone = new THREE.Mesh(convexGeometry, material2);
    return stone;
}

// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {
    const geometry = new THREE.BufferGeometry();

    // ************************** //
    // Create a ground plane
    // ************************** //
    const pgeometry = new THREE.PlaneGeometry( 100, 100, 32 );
    const pmaterial = new THREE.MeshBasicMaterial( {color: 0x567d46, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( pgeometry, pmaterial );
    plane.rotation.x = Math.PI / 2;
    sceneGraph.add(plane);

    // Add an axis helper
    var axis = new THREE.AxisHelper(500);  
    sceneGraph.add(axis);


    // Add stones on the coordinate axes of the plane

    var stone = makeStone();
    stone.position.set(0,0,30);
    sceneGraph.add(stone);

    var stone2 = makeStone();
    stone2.position.set(0,0,-30);
    sceneGraph.add(stone2);

    var stone3 = makeStone();
    stone3.position.set(30,0,0);
    sceneGraph.add(stone3);

    var stone4 = makeStone();
    stone4.position.set(-30,0,0);
    sceneGraph.add(stone4);

}

// Displacement value

var delta = 0.1;

var dispX = 0.2, dispZ = 0.2;

function computeFrame(time) {

    // THE SPOT LIGHT

    // Can extract an object from the scene Graph from its name
    const light = sceneElements.sceneGraph.getObjectByName("light");

    // Apply a small displacement

    if (light.position.x >= 10) {
        delta *= -1;
    } else if (light.position.x <= -10) {
        delta *= -1;
    }
    light.translateX(delta);

    // CONTROLING THE CUBE WITH THE KEYBOARD

    const cube = sceneElements.sceneGraph.getObjectByName("cube");

    if (keyD && cube.position.x < 2.5) {
        cube.translateX(dispX);
    }
    if (keyW && cube.position.z > -2.5) {
        cube.translateZ(-dispZ);
    }
    if (keyA && cube.position.x > -2.5) {
        cube.translateX(-dispX);
    }
    if (keyS && cube.position.z < 2.5) {
        cube.translateZ(dispZ);
    }

    // Rendering
    helper.render(sceneElements);

    // NEW --- Update control of the camera
    sceneElements.control.update();

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}