/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

THREE.DotScreenShader = {
  uniforms: {
    tDiffuse: { value: null },
    tSize: { value: new THREE.Vector2(256, 256) },
    center: { value: new THREE.Vector2(0.5, 0.5) },
    angle: { value: 1.57 },
    scale: { value: 0.1 }
  },

  vertexShader: [
    'varying vec2 vUv;',

    'void main() {',

    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform vec2 center;',
    'uniform float angle;',
    'uniform float scale;',
    'uniform vec2 tSize;',

    'uniform sampler2D tDiffuse;',

    'varying vec2 vUv;',

    'float pattern() {',

    'float s = sin( angle ), c = cos( angle );',

    'vec2 tex = vUv * tSize - center;',
    'vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;',

    'return ( sin( point.x ) * sin( point.y ) ) * 4.0;',

    '}',

    'float random (vec2 st) {',
    ' return fract(sin(dot(st.xy,',
    '  vec2(12.9898,78.233)))* ',
    '  43758.5453123);  ',
    '}',  

    'void main() {',
    'vec4 color = texture2D( tDiffuse, vec2( vUv.x - scale * random( floor(vUv*100.0)) - 0.03 , vUv.y - scale * random( floor(vUv*100.0) ) - 0.03   ) );',
    'gl_FragColor = color;',

    '}'
  ].join('\n')
}
