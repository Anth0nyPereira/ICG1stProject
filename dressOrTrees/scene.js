"use strict";

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

    for (var i=0; i<100; i++) {
        var piece = createPiece(0x00472a);
        center.add(piece);
        piece.position.y = 1;
        piece.position.x = Math.cos(1 + i*0.1);
        piece.position.z = Math.sin(1 + i*0.1);
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
    for (var i=0; i<100; i++) {
        var piece = createPiece(0x000000);
        //piece.scale.set(0.5,0.5,0.5);
        center.add(piece);
        piece.position.y = 4.5;
        piece.position.x = Math.cos(1 + i*0.1)/3;
        //piece.rotation.y = Math.PI * randomNumber;
        piece.position.z = Math.sin(1 + i*0.1)/3;
    }

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



    
}

// Displacement value

var delta = 0.1;

var dispX = 0.2, dispZ = 0.2;

function computeFrame(time) {
    /*

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
    */

    // Rendering
    helper.render(sceneElements);

    // NEW --- Update control of the camera
    sceneElements.control.update();

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}