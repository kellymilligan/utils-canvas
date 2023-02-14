export const rotate2d = /*glsl*/ `mat2 r2d(float t) {return mat2(cos(t),sin(t),-sin(t),cos(t));}`;
export const rotateUv = /*glsl*/ `vec2 rUV(vec2 st,float t){float sr=sin(t),cr=cos(t); return vec2(cr*(st.x-.5)+sr*(st.y-.5)+.5,cr*(st.y-.5)-sr*(st.x-.5)+.5);}`;

export const random = /*glsl*/ `float rand(vec2 st) { 
	return fract(sin(dot(st,vec2(12.9898,4.1414)))*43758.5453);
}`;

export const circle = /*glsl*/ `
float circle(vec2 st, vec2 o, float r){
  vec2 d = st-o;
  return 1.-smoothstep(r-(r*0.01),r+(r*0.01),dot(d,d)*4.0);
}
`;

export const rect = /*glsl*/ `
float rect(vec2 st, vec2 origin, vec2 dimensions, float theta) {
  float f = F * 0.33;
  vec2 xy = vec2((1.0-dimensions.x)/2.0,(1.0-dimensions.y)/2.0);
  st = rUV(st, theta, origin);
  st -= vec2(-0.5) + origin;
  vec2 bl = smoothstep(xy-f,xy+f,st); 
  vec2 tr = smoothstep(xy-f,xy+f,1.0-st);
  return bl.x*bl.y*tr.x*tr.y;
}`;
