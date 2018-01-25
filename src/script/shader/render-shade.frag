#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

#extension GL_EXT_draw_buffers : require
precision highp float;

varying vec3 vPos;
varying vec3 vNor;

uniform vec4 color;
uniform vec4 bgColor;
uniform vec3 cameraPos;

// ------

void main() {
  vec3 col = mix(
    bgColor.xyz,
    color.xyz,
    0.5 + 0.5 * dot( vNor, normalize( vec3( 1.0 ) ) )
  );
  float depth = length( vPos - cameraPos );

  gl_FragData[ 0 ] = vec4( col, 1.0 );
  gl_FragData[ 1 ] = vec4( depth, 0.0, 0.0, 1.0 );
}