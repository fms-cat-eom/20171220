import xorshift from './xorshift';
xorshift( 13487134006 );
import GLCat from './glcat';
import CatMath from './catmath';
import Path from './glcat-path';
import step from './step';
import Tweak from './tweak';
import Automaton from './automaton.min';
import octahedron from './octahedron';

const glslify = require( 'glslify' );

// ------

const clamp = ( _value, _min, _max ) => Math.min( Math.max( _value, _min ), _max );
const saturate = ( _value ) => clamp( _value, 0.0, 1.0 );

// ------

let automaton = new Automaton( {
  gui: divAutomaton,
  data: `
  {"rev":20170418,"length":1,"resolution":1000,"params":{"fillColor":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]}],"jpegLofi":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.45,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.7,"value":0.06,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.798311444652908,"value":0.01,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":7.105427357601002e-15,"mode":2,"params":{},"mods":[false,false,false,false]}],"pixelsortThreshold":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"jpegHigh":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.45,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.699812382739212,"value":0.3822774578069317,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]}],"どうするよ":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"cameraZ":[{"time":0,"value":18,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":10,"mode":1,"params":{},"mods":[false,false,false,false]}],"altColor":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]}],"cameraRot":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":4,"params":{"rate":500,"damp":1},"mods":[false,false,false,false]}],"loadingScaleX":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.5013477088948787,"value":3.3333333333333393,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.54177897574124,"value":2.142857142857146,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]}],"loadingScaleY":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.375,"value":1,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.4690026954177898,"value":-0.5952380952380913,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5390835579514824,"value":-2.499999999999991,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":0.5983827493261457,"value":0,"mode":0,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"blockSize":[{"time":0,"value":8,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.45,"value":8,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.699812382739212,"value":128,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":64,"mode":0,"params":{},"mods":[false,false,false,false]}],"focus":[{"time":0,"value":14.285714285714274,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":8,"mode":1,"params":{},"mods":[false,false,false,false]}],"charShuffle":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.3427767354596623,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.7,"value":0.4758417038690459,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":0.800187617260788,"value":0,"mode":2,"params":{},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]}],"octSize":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":5,"mode":4,"params":{"rate":1000,"damp":1},"mods":[false,false,false,false]}],"morpher":[{"time":0,"value":1,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.875,"value":1,"mode":4,"params":{"rate":1000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":-0.2,"mode":4,"params":{"rate":3000,"damp":1},"mods":[false,false,false,false]}],"killer":[{"time":0,"value":1.5,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.09615384615384616,"value":1.5,"mode":4,"params":{"rate":2000,"damp":1},"mods":[false,false,false,false]},{"time":1,"value":0,"mode":4,"params":{"rate":2000,"damp":1},"mods":[false,false,false,false]}],"octY":[{"time":0,"value":0,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":0.8038461538461539,"value":7.105427357601002e-15,"mode":5,"params":{"gravity":70,"bounce":0.3},"mods":[false,false,false,false]},{"time":1,"value":-56.14285714285714,"mode":5,"params":{"gravity":2200.064,"bounce":0.3},"mods":[false,false,false,false]}],"cameraX":[{"time":0,"value":3,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":2,"mode":1,"params":{},"mods":[false,false,false,false]}],"cameraY":[{"time":0,"value":-4,"mode":1,"params":{},"mods":[false,false,false,false]},{"time":1,"value":-8,"mode":1,"params":{},"mods":[false,false,false,false]}]},"gui":{"snap":{"enable":false,"bpm":120,"offset":0}}}
`
} );
let auto = automaton.auto;

// ------

let width = 640;
let height = 640;
canvas.width = width;
canvas.height = height;

let gl = canvas.getContext( 'webgl' );
let glCat = new GLCat( gl );
let path = new Path( glCat );

// ------

let tweak = new Tweak( divTweak );

// ------

let totalFrame = 0;
let frame = 0;
let frames = 120;
let time = 0.0;
let init = true;
let secs = 1.0;
let deltaTime = 0.0;

let updateTime = () => {
  let reset = false;

  totalFrame ++;
  frame ++;
  if ( frames <= frame ) {
    frame = 0;
    reset = true;
  }
  
  let prevTime = time;
  time = secs * frame / frames;
  deltaTime = ( time + ( reset ? secs : 0.0 ) ) - prevTime;

  init = false;
};

// ------

let particlePixels = 4;
let particlesSqrt = 40;
let particles = particlesSqrt * particlesSqrt;
let vertsPerParticle = 1;

let vboQuad = glCat.createVertexbuffer( [ -1, -1, 1, -1, -1, 1, 1, 1 ] );
let vboQuad3 = glCat.createVertexbuffer( [ -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0 ] );

let oct = octahedron( 3 );
let vboOctPos = glCat.createVertexbuffer( oct.pos );
let vboOctNor = glCat.createVertexbuffer( oct.nor );

let vboParticle = glCat.createVertexbuffer( ( () => {
  let ret = [];
  for ( let i = 0; i < particlesSqrt * particlesSqrt * vertsPerParticle; i ++ ) {
    let ix = Math.floor( i / vertsPerParticle ) % particlesSqrt;
    let iy = Math.floor( i / particlesSqrt / vertsPerParticle );
    let iz = i % vertsPerParticle;
    
    ret.push( ix * particlePixels );
    ret.push( iy );
    ret.push( iz );
  }
  return ret;
} )() );

// ------

let textureRandomSize = 256;

let textureRandomUpdate = ( _tex ) => {
  glCat.setTextureFromArray( _tex, textureRandomSize, textureRandomSize, ( () => {
    let len = textureRandomSize * textureRandomSize * 4;
    let ret = new Uint8Array( len );
    for ( let i = 0; i < len; i ++ ) {
      ret[ i ] = Math.floor( xorshift() * 256.0 );
    }
    return ret;
  } )() );
};

let textureRandomStatic = glCat.createTexture();
glCat.textureWrap( textureRandomStatic, gl.REPEAT );
textureRandomUpdate( textureRandomStatic );

let textureRandom = glCat.createTexture();
glCat.textureWrap( textureRandom, gl.REPEAT );

// ------

let renderA = document.createElement( 'a' );

let saveFrame = () => {
  renderA.href = canvas.toDataURL( 'image/jpeg' );
  renderA.download = ( '0000' + totalFrame ).slice( -5 ) + '.jpg';
  renderA.click();
};

// ------

let mouseX = 0.0;
let mouseY = 0.0;

// ------

let cameraPos = [ 0.0, 0.0, 0.0 ];
let cameraRot = 0.0;
let cameraFov = 90.0;

let matP;
let matV;

let updateMatrices = () => {
  matP = CatMath.mat4Perspective( cameraFov, width / height, 0.01, 1000.0 );
  matV = CatMath.mat4LookAt( cameraPos, [ 0.0, 0.0, 0.0 ], [ 0.0, 1.0, 0.0 ], cameraRot );
};
updateMatrices();

// ------

let bgColor = [ 0.01, 0.01, 0.02, 1.0 ];

// ------

path.setGlobalFunc( () => {
  glCat.uniform1i( 'init', init );
  glCat.uniform1f( 'time', time );
  glCat.uniform1f( 'deltaTime', deltaTime );
  glCat.uniform3fv( 'cameraPos', cameraPos );
  glCat.uniform1f( 'cameraRot', cameraRot );
  glCat.uniform1f( 'cameraFov', cameraFov );
  glCat.uniform1f( 'particlesSqrt', particlesSqrt );
  glCat.uniform1f( 'particlePixels', particlePixels );
  glCat.uniform1f( 'frame', frame % frames );
  glCat.uniform1f( 'frames', frames );
  glCat.uniform1i( 'blockSize', 8 );
  glCat.uniform1f( 'vertsPerParticle', vertsPerParticle );
  glCat.uniformMatrix4fv( 'matP', matP );
  glCat.uniformMatrix4fv( 'matV', matV );
  glCat.uniform4fv( 'bgColor', bgColor );
} );

path.add( {
  こんにちは: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/render-bg.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 1.0 ],
    drawbuffers: 2,
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },

  octTriangle: {
    width: width,
    height: height,
    vert: glslify( './shader/object.vert' ),
    frag: glslify( './shader/render-shade.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    drawbuffers: 2,
    func: () => {
      glCat.attribute( 'pos', vboOctPos, 3 );
      glCat.attribute( 'nor', vboOctNor, 3 );
      glCat.uniform4fv( 'color', [ 0.64, 0.74, 0.78, 1.0 ] );
      let matM = CatMath.mat4Identity();
      matM = CatMath.mat4Apply( CatMath.mat4Translate( [ 0.0, 0.0, auto( "octY" ) ] ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4ScaleXYZ( 0.93 * auto( "octSize" ) ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4RotateX( time * 1.0 ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4RotateY( time * 2.0 ), matM );
      glCat.uniformMatrix4fv( 'matM', matM );
      gl.drawArrays( gl.TRIANGLES, 0, oct.pos.length / 3 );
    }
  },
    
  octPoint: {
    width: width,
    height: height,
    vert: glslify( './shader/point.vert' ),
    frag: glslify( './shader/render-point.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    drawbuffers: 2,
    func: () => {
      glCat.attribute( 'pos', vboOctPos, 3 );
      glCat.uniform1f( 'pointSizeIGuess', height / 50.0 * auto( "octSize" ) );
      glCat.uniform4fv( 'color', [ 0.97, 0.14, 0.02, 1.0 ] );
      let matM = CatMath.mat4Identity();
      matM = CatMath.mat4Apply( CatMath.mat4Translate( [ 0.0, 0.0, auto( "octY" ) ] ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4ScaleXYZ( auto( "octSize" ) ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4RotateX( time * 1.0 ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4RotateY( time * 2.0 ), matM );
      glCat.uniformMatrix4fv( 'matM', matM );
      gl.drawArrays( gl.POINT, 0, oct.pos.length / 3 );
    }
  },
  
  monitor: {
    width: width,
    height: height,
    vert: glslify( './shader/object.vert' ),
    frag: glslify( './shader/render-monitor.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    drawbuffers: 2,
    func: () => {
      glCat.attribute( 'pos', vboQuad3, 3 );
      glCat.uniform1f( 'morpher', auto( 'morpher' ) );
      glCat.uniform1f( 'killer', auto( 'killer' ) );
      
      let matM = CatMath.mat4Identity();
      matM = CatMath.mat4Apply( CatMath.mat4Translate( [ 0.0, 0.0, 0.2 ] ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4ScaleXYZ( 100.0 ), matM );
      glCat.uniformMatrix4fv( 'matM', matM );
      glCat.uniform4fv( 'color', [ 1.8, 1.9, 2.0, 1.0 ] );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
            
      matM = CatMath.mat4Identity();
      matM = CatMath.mat4Apply( CatMath.mat4Translate( [ 0.0, 0.0, -0.2 ] ), matM );
      matM = CatMath.mat4Apply( CatMath.mat4ScaleXYZ( 100.0 ), matM );
      glCat.uniformMatrix4fv( 'matM', matM );
      glCat.uniform4fv( 'color', [ 0.9, 0.1, 0.04, 1.0 ] );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },

  particlesComputeReturn: {
    width: particlesSqrt * particlePixels,
    height: particlesSqrt,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/return.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'texture', path.fb( "particlesCompute" ).texture, 0 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  dof: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/dof.frag' ),
    blend: [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: ( p ) => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniform1f( 'focus', auto( 'focus' ) );
      glCat.uniformTexture( 'sampler0', path.fb( "こんにちは" ).textures[ 0 ], 0 );
      glCat.uniformTexture( 'samplerDepth', path.fb( "こんにちは" ).textures[ 1 ], 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
  
  "Gowrock - bloom": {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/bloom.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    tempFb: glCat.createFloatFramebuffer( width, height ),
    func: ( p ) => {
      for ( let i = 0; i < 3; i ++ ) {
        let gaussVar = [ 5.0, 12.0, 30.0 ][ i ];
        gl.bindFramebuffer( gl.FRAMEBUFFER, p.tempFb.framebuffer );
        glCat.clear( ...p.clear );

        glCat.attribute( 'p', vboQuad, 2 );
        glCat.uniform1i( 'isVert', false );
        glCat.uniform1f( 'gaussVar', gaussVar );
        glCat.uniformTexture( 'sampler0', path.fb( "dof" ).texture, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
        
        gl.bindFramebuffer( gl.FRAMEBUFFER, p.framebuffer.framebuffer );

        glCat.attribute( 'p', vboQuad, 2 );
        glCat.uniform1i( 'isVert', true );
        glCat.uniform1f( 'gaussVar', gaussVar );
        glCat.uniformTexture( 'sampler0', p.tempFb.texture, 0 );
        glCat.uniformTexture( 'samplerDry', path.fb( "dof" ).texture, 1 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      }
    }
  },
  
  おたくはすぐポストエフェクトを挿す: {
    width: width,
    height: height,
    vert: glslify( './shader/quad.vert' ),
    frag: glslify( './shader/post.frag' ),
    blend: [ gl.ONE, gl.ONE ],
    clear: [ 0.0, 0.0, 0.0, 0.0 ],
    func: () => {
      glCat.attribute( 'p', vboQuad, 2 );
      glCat.uniformTexture( 'sampler0', path.fb( "dof" ).texture, 0 );
      glCat.uniformTexture( 'samplerBloom', path.fb( "Gowrock - bloom" ).texture, 1 );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
  },
} );

// ------

let updateUI = () => {
  let now = new Date();
  let deadline = new Date( 2017, 11, 20, 0, 0 );

  divCountdown.innerText = "Deadline: " + Math.floor( ( deadline - now ) / 1000 );

  divFrame.innerText = "Frames: " + totalFrame;
};

// ------

let update = () => {
  if ( frame % frames === 0 ) { xorshift( 79017846734887343443 ); }

  if ( !tweak.checkbox( 'play', { value: true } ) ) {
    setTimeout( update, 10 );
    return;
  }
  
  textureRandomUpdate( textureRandom );
  
  automaton.update( time );

  path.render( "こんにちは" )
  path.render( "octTriangle", path.fb( "こんにちは" ) );
  path.render( "octPoint", path.fb( "こんにちは" ) );
  path.render( "monitor", path.fb( "こんにちは" ) );
  path.render( "dof" );
  path.render( "Gowrock - bloom" );
  path.render( "おたくはすぐポストエフェクトを挿す", null );

  cameraPos = [
    auto( "cameraX" ), // 2
    auto( "cameraY" ), // -8
    auto( "cameraZ" ) // 10
  ];
  cameraRot = 0.2;

  updateUI();

  updateTime();
  updateMatrices();

  if ( tweak.checkbox( 'save', { value: false } ) ) {
    saveFrame();
  }
  
  requestAnimationFrame( update );
};

// ------

step( {
  0: ( done ) => {
    update();
  }
} );

window.addEventListener( 'keydown', ( _e ) => {
  if ( _e.which === 27 ) {
    tweak.checkbox( 'play', { set: false } );
  }
} );

window.addEventListener( 'mousemove', event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
} );