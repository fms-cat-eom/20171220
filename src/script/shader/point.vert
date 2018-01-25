#define HUGE 9E16
#define PI 3.14159265
#define V vec3(0.,1.,-1.)
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,m) (floor((i)/(m))*(m))

// ------

attribute vec3 pos;

varying vec3 vPos;

uniform float time;
uniform vec2 resolution;
uniform vec3 cameraPos;
uniform float cameraRot;
uniform float cameraFov;
uniform float pointSizeIGuess;

uniform mat4 matP;
uniform mat4 matV;
uniform mat4 matM;

// ------

void main() {
  vec4 p = matM * vec4( pos, 1.0 );
  vPos = p.xyz;

  vec4 outPos = matP * matV * p;
  gl_Position = outPos;
  gl_PointSize = pointSizeIGuess / outPos.z;
}