
//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();


        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        sceneElements.camera = camera;
        camera.position.set(0, 50, 100);
        camera.lookAt(0, 0, 0);

        // ************************** //
        // NEW --- Control for the camera
        // ************************** //
        sceneElements.control = new THREE.OrbitControls(camera);
        sceneElements.control.screenSpacePanning = true;

        // ************************** //
        // Illumination
        // ************************** //

        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 1, 1 ).normalize();
        sceneElements.sceneGraph.add(light);

        const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
        sceneElements.sceneGraph.add( alight );

        // Give a name to each lights
        light.name = "light";
        alight.name = "alight";


        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};