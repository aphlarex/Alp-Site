import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { BloomPass } from "three/addons/postprocessing/BloomPass.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { DotScreenPass } from "three/addons/postprocessing/DotScreenPass.js";
import { MaskPass, ClearMaskPass } from "three/addons/postprocessing/MaskPass.js";
import { TexturePass } from "three/addons/postprocessing/TexturePass.js";

import { BleachBypassShader } from "three/addons/shaders/BleachBypassShader.js";
import { ColorifyShader } from "three/addons/shaders/ColorifyShader.js";
import { HorizontalBlurShader } from "three/addons/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/addons/shaders/VerticalBlurShader.js";
import { SepiaShader } from "three/addons/shaders/SepiaShader.js";
import { VignetteShader } from "three/addons/shaders/VignetteShader.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";

// import { BokehPass } from "three/addons/postprocessing/BokehPass.js";

/////
// function

const rgb = function (r, g, b) {
  return new THREE.Vector3(r, g, b);
};
const randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/////////////////////////////////////////////////////////////////////////
//// SHADER CODE
const shader_noise = `
#define NUM_OCTAVES 5

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(float p){
    float fl = floor(p);
  float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}
float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
const mat2 m2 = mat2(0.8,-0.6,0.6,0.8);

#define NB_OCTAVES 8
#define LACUNARITY 10.0
#define GAIN 0.5

float fbm(in vec2 p) {
    float total = 0.0,
        frequency = 1.0,
        amplitude = 1.0;
    
    for (int i = 0; i < NB_OCTAVES; i++) {
        total += snoise(p * frequency) * amplitude;
        frequency *= LACUNARITY;
        amplitude *= GAIN;
    }    
    return total;
}
`;

const shader_vertex = `
uniform float u_time;
uniform float u_height;
uniform vec2 u_rand;

float xDistortion;
float yDistortion;

varying float vDistortion;
varying vec2 vUv;

void main() {
    vUv = uv;
    vDistortion = snoise(vUv.xx * 3. - vec2(u_time / u_rand.x, -u_time / u_rand.x) + cos(vUv.yy) * u_rand.y) * u_height*0.65;
    xDistortion = snoise(vUv.xx * 1.5  - vec2(-u_time / u_rand.x, u_time / u_rand.x)*0.5 ) * u_height * u_rand.x / 15.;
    vec3 pos = position;
    pos.z += (vDistortion * 55.);
    pos.x += (xDistortion * 55.);
    pos.y += (sin(vUv.y) * 55.);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const shader_fragment = `
vec3 rgb(float r, float g, float b) {
  return vec3(r / 255., g / 255., b / 255.);
}
vec3 rgb(float c) {
  return vec3(c / 255., c / 255., c / 255.);
}

uniform vec3 u_lowColor;
uniform vec3 u_highColor;
uniform float u_time;

varying vec2 vUv;
varying float vDistortion;
varying float xDistortion;

void main() {
  vec3 highColor = rgb(u_highColor.r*vDistortion, u_highColor.g*vDistortion, u_highColor.b*vDistortion);
  
  vec3 colorMap = rgb(u_lowColor.r, u_lowColor.g, u_lowColor.b);

  colorMap = mix(colorMap, highColor, vDistortion);
  
  gl_FragColor = vec4(colorMap, 1.);
}
`;

//////////////////////////////////////
//SHADER CODE 2
const shader_vertex2 = `
//
  // GLSL textureless classic 3D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-10-11
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license. See LICENSE file.
  // https://github.com/ashima/webgl-noise
  //
  
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  
  // Classic Perlin noise
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
  
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
  
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
  
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
  
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }
  
  // Classic Perlin noise, periodic variant
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
  
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
  
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
  
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
  
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 1.5 * n_xyz;
  }
  
  // Turbulence By Jaume Sanchez => https://codepen.io/spite/
  
  varying vec2 vUv;
  varying float noise;
  varying float qnoise;
  varying float displacement;
  
  uniform float time;
  uniform float pointscale;
  uniform float decay;
  uniform float complex;
  uniform float waves;
  uniform float eqcolor;
  uniform bool fragment;
  
  float turbulence( vec3 p) {
    float t = - 0.1;
    for (float f = 1.0 ; f <= 3.0 ; f++ ){
      float power = pow( 2.0, f );
      t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }
    return t;
  }
  
  void main() {
  
    vUv = uv;
  
    noise = (1.0 *  - waves) * turbulence( decay * abs(normal + time));
    qnoise = (2.0 *  - eqcolor) * turbulence( decay * abs(normal + time));
    float b = pnoise( complex * (position) + vec3( 1.0 * time ), vec3( 100.0 ) );
    
    if (fragment == true) {
      displacement = - sin(noise) + normalize(b * 0.5);
    } else {
      displacement = - sin(noise) + cos(b * 0.5);
    }
  
    vec3 newPosition = (position) + (normal * displacement);
    gl_Position = (projectionMatrix * modelViewMatrix) * vec4( newPosition, 1.0 );
    gl_PointSize = (pointscale);
    //gl_ClipDistance[0];
  
  }
`;

const shader_fragment2 = `
varying float qnoise;
  
  uniform float time;
  uniform bool redhell;
  uniform float r_color;
  uniform float g_color;
  uniform float b_color;
  
  void main() {
    float r, g, b;
  
    r = cos(qnoise + (r_color));
    g = cos(qnoise + g_color);
    b = cos(qnoise + (b_color));
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

var container;

var options = {
  perlin: {
    vel: 0.002,
    speed: 0.00015,
    perlins: 1.0,
    decay: 0.25,
    complex: 0.0,
    waves: 20,
    eqcolor: 3.0,
    fragment: false,
    redhell: true,
  },
  rgb: {
    r_color: 7.5,
    g_color: 7.8,
    b_color: 5,
  },
  cam: {
    x: 0,
    y: 0,
    z: 300,
  },
  position: {
    x: 50,
    y: -80,
    z: 50,
  },
  position2: {
    x: -100,
    y: 90,
    z: -40,
  },
  position3: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: {
    x: 5,
    y: 5,
    z: 5,
  },
  scale2: {
    x: 4,
    y: 4,
    z: 4,
  },
  scale3: {
    x: 1,
    y: 1,
    z: 1,
  },
  rotate3: {
    x: 0,
    y: 0,
    z: 0,
  },
  blur: {
    h: 0,
    v: 0,
  },
};

var renderer;
var composer;
var scene;
var camera;
var mesh = {};
function init_threeBG(el) {
  container = document.querySelector(el);

  /////////////////////////////////////////////////////////////////////////
  //// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
  const dracoLoader = new DRACOLoader();
  const loader = new GLTFLoader();
  // dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  // dracoLoader.setDecoderConfig({ type: "js" });
  // loader.setDRACOLoader(dracoLoader);

  /////////////////////////////////////////////////////////////////////////
  ///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
  // const container = document.querySelector(".three-bg");
  // document.body.appendChild(container);
  container.classList.add("threejs");
  var width = container.clientWidth;
  var height = container.clientHeight;

  /////////////////////////////////////////////////////////////////////////
  ///// SCENE CREATION
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.00025);
  scene.background = new THREE.Color(0x000000);

  /////////////////////////////////////////////////////////////////////////
  ///// RENDERER CREATION
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  }); // turn on antialias
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); //set pixel ratio
  renderer.setSize(width, height); // make it full screen
  renderer.shadowMap.enabled = true; // enable shadow
  renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
  renderer.toneMapping = THREE.LinearToneMapping; // set the toneMapping
  renderer.toneMappingExposure = 1; // set the toneMappingExposure
  container.appendChild(renderer.domElement); // append the renderer to container div element

  /////////////////////////////////////////////////////////////////////////
  ///// CAMERAS CONFIG
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
  scene.add(camera);
  camera.position.set(options.cam.x, options.cam.y, options.cam.z);

  /////////////////////////////////////////////////////////////////////////
  ///// CREATING LIGHT
  const light = new THREE.PointLight(0xffff00, 1, 100);
  light.position.set(0, -6, 8);
  // scene.add(light);

  /////////////////////////////////////////////////////////////////////////
  ///// CREATE ORBIT CONTROLS
  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.target.set(0, 0, 0);
  //   // controls.autoRotate = true;
  //   controls.enableDamping = true;

  /////////////////////////////////////////////////////////////////////////
  ///// LOADING THE TEXTURE FOR THE ENVIRONMENT
  // new RGBELoader().load("../assets/envmap2.hdr", function (texture) {
  //   texture.mapping = THREE.EquirectangularReflectionMapping;
  //   scene.environment = texture;
  //   //   screen.background = texture;
  // });

  /////////////////////////////////////////////////////////////////////////
  ///// LOADING GLB/GLTF MODEL FROM BLENDER
  let model_loaded = false;
  // let model_one = "";
  // loader.load("../assets/model/wolf.glb", function (gltf) {
  //   model_one = gltf.scene.children[0].children[0];
  //   console.log(model_one);
  //   model_one.geometry.computeBoundingBox();
  //   model_one.geometry.computeBoundingSphere();
  //   model_one.position.set(0, 0, 0);
  //   model_one.scale.set(0.8, 0.8, 0.8);
  //   model_one.geometry.center();
  //   scene.add(model_one);

  //   // model_one set material
  //   model_one.material = new THREE.MeshStandardMaterial({
  //     color: 0xffffff,
  //     metalness: 1,
  //     roughness: 0.1,
  //     envMapIntensity: 1,
  //   });

  //   model_loaded = true;
  // });

  /////////////////////////////////////////////////////////////////////////
  ///// generate a sphere
  // const sphere_one = new THREE.Mesh(
  //   new THREE.SphereGeometry(50, 100, 100),
  //   new THREE.MeshStandardMaterial({
  //     color: 0xffffff,
  //     metalness: 1,
  //     roughness: 0.1,
  //     envMapIntensity: 1,
  //   })
  // );
  // sphere_one.position.set(0, 0, 0);
  // sphere_one.material.envMap = scene.environment;
  // scene.add(sphere_one);

  /////////////////////////////////////////////////////////////////////////
  ///// CREATE A PLANE
  mesh.plane_one = new THREE.Mesh(
    new THREE.PlaneGeometry(600, 400, 100, 100),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 1,
    })
  );
  mesh.plane_one.position.set(0, 0, -120);
  scene.add(mesh.plane_one);

  /////////////////////////////////////////////////////////////////////////
  ///// CREATE A SHADER MATERIAL
  const config = {
    colors: [
      // Define colors for each item. If more items than colors, then first color will be used as default
      // Format { low: rgb(), high: rgb() for each color }
      { low: rgb(10, 10, 10), high: rgb(100, 100, 100) },
      { low: rgb(236, 166, 15), high: rgb(233, 104, 0) },
      { low: rgb(43, 75, 235), high: rgb(213, 51, 248) },
      { low: rgb(175, 49, 49), high: rgb(123, 16, 16) },
    ],
  };

  let shader_material = new THREE.ShaderMaterial({
    uniforms: {
      u_lowColor: { type: "v3", value: config.colors[0].low },
      u_highColor: { type: "v3", value: config.colors[0].high },
      u_time: { type: "f", value: 0 },
      u_height: { type: "f", value: 1 },
      u_rand: { type: "f", value: new THREE.Vector2(randomInteger(5, 8), randomInteger(8, 10)) },
    },
    fragmentShader: shader_noise + shader_fragment,
    vertexShader: shader_noise + shader_vertex,
  });

  mesh.plane_one.material = shader_material;

  // //////////////////////////////
  // ///// CREATE A SHADER MATERIAL 2
  var uniforms = {
    time: {
      type: "f",
      value: 1.0,
    },
    pointscale: {
      type: "f",
      value: 1.0,
    },
    decay: {
      type: "f",
      value: 2.0,
    },
    complex: {
      type: "f",
      value: 2.0,
    },
    waves: {
      type: "f",
      value: 3.0,
    },
    eqcolor: {
      type: "f",
      value: 3.0,
    },
    fragment: {
      type: "i",
      value: false,
    },
    dnoise: {
      type: "f",
      value: 2.0,
    },
    qnoise: {
      type: "f",
      value: 2.0,
    },
    r_color: {
      type: "f",
      value: 0.0,
    },
    g_color: {
      type: "f",
      value: 0.0,
    },
    b_color: {
      type: "f",
      value: 0.0,
    },
  };

  // //////////////////////////////////
  // sphere_two

  var geo_two = new THREE.IcosahedronGeometry(20, 80);

  // Other Geometry
  // var geometry_torus = new THREE.TorusGeometry(10, 3, 30, 160);

  var shader_mat2 = new THREE.ShaderMaterial({
    wireframe: false,
    uniforms: uniforms,
    vertexShader: shader_vertex2,
    fragmentShader: shader_fragment2,
  });

  mesh.sphere_two = new THREE.Mesh(geo_two, shader_mat2);
  mesh.sphere_two.position.set(options.position.x, options.position.y, options.position.z);
  mesh.sphere_two.scale.set(options.scale.x, options.scale.y, options.scale.z);
  // scene.add(mesh.sphere_two);

  mesh.sphere_two_b = new THREE.Mesh(geo_two, shader_mat2);
  mesh.sphere_two_b.position.set(options.position2.x, options.position2.y, options.position2.z);
  mesh.sphere_two_b.scale.set(options.scale2.x, options.scale2.y, options.scale2.z);
  // scene.add(mesh.sphere_two_b);

  const group = new THREE.Group();
  group.add(mesh.sphere_two);
  group.add(mesh.sphere_two_b);
  scene.add(group);

  // GUI
  function createGUI() {
    var gui = new dat.GUI();
    //gui.close();

    var configGUI = gui.addFolder("Setup");
    configGUI.add(options.perlin, "speed", 0.0, 0.001);
    //   configGUI.add(options.cam, "zoom", 0, 30);
    configGUI.open();

    var perlinGUI = gui.addFolder("Perlin");
    perlinGUI.add(options.perlin, "decay", 0.0, 20.0).name("Decay").listen();
    //perlinGUI.add(options.perlin, 'complex', 0.0, 100.0).name('Complex').listen();
    perlinGUI.add(options.perlin, "waves", 0.0, 60.0).name("Waves").listen();
    perlinGUI.open();

    var colorGUI = gui.addFolder("Color");
    colorGUI.add(options.perlin, "eqcolor", 3.0, 50.0).name("Color").listen();
    colorGUI.add(options.rgb, "r_color", 0.0, 10.0).name("Red").listen();
    colorGUI.add(options.rgb, "g_color", 0.0, 10.0).name("Green").listen();
    colorGUI.add(options.rgb, "b_color", 0.0, 10.0).name("Blue").listen();
    colorGUI.open();
  }
  // createGUI();

  // //////////////////////////////////
  // Preset Effects - Post Processing
  const shaderBleach = BleachBypassShader;
  const shaderSepia = SepiaShader;
  const shaderVignette = VignetteShader;

  const effectBleach = new ShaderPass(shaderBleach);
  const effectSepia = new ShaderPass(shaderSepia);
  const effectVignette = new ShaderPass(shaderVignette);
  const gammaCorrection = new ShaderPass(GammaCorrectionShader);

  effectBleach.uniforms["opacity"].value = 0.95;
  effectSepia.uniforms["amount"].value = 0.25;
  effectVignette.uniforms["offset"].value = 0.95;
  effectVignette.uniforms["darkness"].value = 1.6;

  const effectBloom = new BloomPass(0.5);
  const effectFilm = new FilmPass(0.35, 0.025, 648, true);
  const effectFilmBW = new FilmPass(0.35, 0.5, 2048, true);
  const effectDotScreen = new DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);

  const effectHBlur = new ShaderPass(HorizontalBlurShader);
  const effectVBlur = new ShaderPass(VerticalBlurShader);
  effectHBlur.uniforms["h"].value = (2 / (width / 2)) * options.blur.h;
  effectVBlur.uniforms["v"].value = (2 / (height / 2)) * options.blur.v;

  const effectColorify1 = new ShaderPass(ColorifyShader);
  const effectColorify2 = new ShaderPass(ColorifyShader);
  effectColorify1.uniforms["color"] = new THREE.Uniform(new THREE.Color(1, 0.8, 0.8));
  effectColorify2.uniforms["color"] = new THREE.Uniform(new THREE.Color(1, 0.75, 0.5));

  // Boken Effect
  // const bokehPass = new BokehPass(scene, camera, {
  //   focus: 150.0,
  //   aperture: 0.0001,
  //   maxblur: 1.0,
  //   width: width,
  //   height: height,
  // });

  // RGB Shift Effect
  const RgbShift = new ShaderPass(RGBShiftShader);
  RgbShift.uniforms["amount"].value = 0.002;

  // Effect Composer
  composer = new EffectComposer(renderer);
  // set size
  composer.setSize(width, height);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Create an instance of FilmPass and add it to the composer
  composer.addPass(effectFilm);
  composer.addPass(effectSepia);
  // composer.addPass(effectVignette);
  composer.addPass(RgbShift);
  composer.addPass(effectHBlur);

  /////////////////////////////////////////////////////////////////////////
  //// RENDER LOOP FUNCTION

  // group.rotateY(THREE.MathUtils.degToRad(0));

  var start = Date.now();
  function renderLoop() {
    // rotate
    if (model_loaded) {
      // model_one.rotation.y += 0.001;
    }
    // sphere_one.rotation.y += 0.001;
    mesh.plane_one.material.uniforms.u_time.value += 0.005;

    mesh.sphere_two.rotation.x -= 0.001;
    //   shader effect 2
    shader_mat2.uniforms["time"].value = options.perlin.speed * (Date.now() - start);
    shader_mat2.uniforms["pointscale"].value = options.perlin.perlins;
    shader_mat2.uniforms["decay"].value = options.perlin.decay;
    shader_mat2.uniforms["complex"].value = options.perlin.complex;
    shader_mat2.uniforms["waves"].value = options.perlin.waves;
    shader_mat2.uniforms["eqcolor"].value = options.perlin.eqcolor;
    shader_mat2.uniforms["r_color"].value = options.rgb.r_color;
    shader_mat2.uniforms["g_color"].value = options.rgb.g_color;
    shader_mat2.uniforms["b_color"].value = options.rgb.b_color;
    shader_mat2.uniforms["fragment"].value = options.perlin.fragment;

    effectHBlur.uniforms["h"].value = (2 / (width / 2)) * options.blur.h;

    mesh.sphere_two.position.set(options.position.x, options.position.y, options.position.z);
    mesh.sphere_two.scale.set(options.scale.x, options.scale.y, options.scale.z);

    mesh.sphere_two_b.position.set(options.position2.x, options.position2.y, options.position2.z);
    mesh.sphere_two_b.scale.set(options.scale2.x, options.scale2.y, options.scale2.z);

    // group.rotation.y += 0.001;
    group.position.set(options.position3.x, options.position3.y, options.position3.z);
    group.scale.set(options.scale3.x, options.scale3.y, options.scale3.z);
    group.rotation.y = (Math.PI / 180) * options.rotate3.y;
    group.rotation.x = (Math.PI / 180) * options.rotate3.x;
    group.rotation.z = (Math.PI / 180) * options.rotate3.z;

    camera.position.set(options.cam.x, options.cam.y, options.cam.z);
    camera.lookAt(scene.position);

    // controls.update(); // update orbit controls
    // renderer.render(scene, camera); //render the scene without the composer
    composer.render(); //render the scene with the composer
    requestAnimationFrame(renderLoop); //loop the render function
  }

  renderLoop(); //start rendering

  /////////////////////////////////////////////////////////////////////////
  ///// MAKE EXPERIENCE FULL SCREEN
  window.addEventListener("resize", () => {
    width = container.clientWidth;
    height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  });

  console.log("ThreeBG Initialized");
}

function ThreeBGAllDispose() {
  renderer.dispose();
  renderer.forceContextLoss();
  // renderer.context = null;
  // renderer.domElement = null;
  // renderer = null;
  composer.dispose();
  mesh.plane_one.geometry.dispose();
  mesh.plane_one.material.dispose();
  mesh.sphere_two.geometry.dispose();
  mesh.sphere_two_b.geometry.dispose();
  mesh.sphere_two.material.dispose();
  mesh.sphere_two_b.material.dispose();

  // scene.dispose();
  // camera.dispose();
  // controls.dispose();
  console.log("ThreeBG Disposed");
}

export { options, init_threeBG, ThreeBGAllDispose };
