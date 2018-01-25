#define BITS 16.0
#define THR 0.5
#define LOOPFREQ 2.0
#define SCALE 12.0
#define MARGIN 7.0
#define LIMIT 500.0

#define PI 3.14159265

// ------

#extension GL_EXT_frag_depth : require
#extension GL_EXT_draw_buffers : require
precision highp float;

varying float vLen;
varying vec3 vPos;

uniform float time;
uniform float frames;
uniform vec4 bgColor;
uniform vec4 color;
uniform float morpher;
uniform float killer;
uniform vec3 cameraPos;

// ------

vec3 catColor( float _p ) {
  return 0.5 + 0.5 * vec3(
    cos( _p ),
    cos( _p + PI / 3.0 * 2.0 ),
    cos( _p + PI / 3.0 * 4.0 )
  );
}

float v2random( vec2 co ) {
    return fract( sin( dot( co.xy, vec2( 2.9898, 7.233 ) ) ) * 4838.5453 );
}

// ayyy: https://www.shadertoy.com/view/XsfBzj
vec4 draw( vec2 p ) {
	float r = length( p ) * SCALE * 0.1;
	float layer = floor( r );
	
	if ( MARGIN < layer && layer < LIMIT ) {
		float theta = ( atan( p.y, p.x ) + PI ) / 2.0 / PI;
		float vel = ( v2random( vec2( layer, 3.155 ) ) - 0.5 );
		float freq = 1.0 + floor( layer * 4.0 * pow( v2random( vec2( layer, 2.456 ) ), 2.0 ) );
		
		float phase = fract( ( theta + time * vel ) * LOOPFREQ ) * freq;
		float phase0 = floor( phase );
		float phasec = fract( phase );
		
		float state = v2random( vec2( layer, phase0 ) ) < THR ? 0.0 : 1.0;
		
		vec3 col = vec3( state );
    col *= phasec < 1.0 - exp( -max( 0.0, time - 0.03 - layer / 200.0 ) * 20.0 ) ? 1.0 : 0.0;
    col *= 0.0 < cos( PI * clamp( frames * ( time - 0.9 ) + layer / 3.0, 0.0, 5.0 ) ) ? 1.0 : 0.0;
		
		float layerc = mod( r, 1.0 );
		col *= smoothstep( 0.0, 0.0 + 0.1, layerc );
		col *= smoothstep( 0.5, 0.5 - 0.1, layerc );
		
		return vec4( col, 1.0 );
	} else {
		return vec4( 0.0, 0.0, 0.0, 1.0 );
	}
}

void main() {
  float fuck = 0.0;

  vec2 p = vPos.xy;

  fuck += draw( p.xy ).x;

  if ( abs( abs( p.y ) - 8.0 ) < morpher + 0.5 ) { fuck = 0.0; }
  if (
    abs( abs( p.y ) - 8.0 ) < morpher &&
    sin( ( p.x - p.y ) * 5.0 + time * PI * 8.0 ) < 0.0 - killer
  ) { fuck = 1.0; }

  if ( fuck < 0.5 ) { discard; }

  float depth = length( vPos - cameraPos );

  gl_FragData[ 0 ] = color;
  gl_FragData[ 1 ] = vec4( depth, 0.0, 0.0, 1.0 );
}