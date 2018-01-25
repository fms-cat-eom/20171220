#define PARTICLE_LIFE_SPEED 2.0

#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

#extension GL_EXT_draw_buffers : require
precision highp float;

varying vec3 vPos;

uniform vec4 color;
uniform vec4 bgColor;
uniform vec3 cameraPos;

// ------

void main() {
  if ( 0.5 < length( gl_PointCoord - 0.5 ) ) { discard; }

  float depth = length( vPos - cameraPos );

  gl_FragData[ 0 ] = color;
  gl_FragData[ 1 ] = vec4( depth, 0.0, 0.0, 1.0 );
}