(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`TURBO KART RUSH`,t=1/120,n=1/20,r=.85,i=1.6,a=1e3,o=1001,s=1002,c=1003,l=1004,u=1005,d=1006,f=1007,p=1008,m=1009,h=1010,g=1011,_=1012,v=1013,y=1014,b=1015,x=1016,S=1017,C=1018,w=1020,T=35902,E=35899,D=1021,O=1022,k=1023,A=1026,ee=1027,te=1028,j=1029,M=1030,ne=1031,re=1033,ie=33776,ae=33777,oe=33778,se=33779,ce=35840,le=35841,ue=35842,N=35843,de=36196,fe=37492,pe=37496,me=37488,he=37489,ge=37490,_e=37491,ve=37808,ye=37809,be=37810,xe=37811,Se=37812,Ce=37813,we=37814,Te=37815,Ee=37816,De=37817,Oe=37818,ke=37819,Ae=37820,je=37821,Me=36492,Ne=36494,Pe=36495,P=36283,Fe=36284,Ie=36285,Le=36286,F=2300,Re=2301,I=2302,ze=2303,Be=2400,Ve=2401,He=2402,Ue=3200,We=`srgb`,Ge=`srgb-linear`,Ke=`linear`,qe=`srgb`,Je=7680,Ye=35044,Xe=35048,Ze=2e3;function Qe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function $e(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function et(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function tt(){let e=et(`canvas`);return e.style.display=`block`,e}var nt={};function rt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function it(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function L(...e){e=it(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function R(...e){e=it(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function at(...e){let t=e.join(` `);t in nt||(nt[t]=!0,L(...e))}function ot(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var st={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},ct=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},lt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ut=1234567,dt=Math.PI/180,ft=180/Math.PI;function pt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(lt[e&255]+lt[e>>8&255]+lt[e>>16&255]+lt[e>>24&255]+`-`+lt[t&255]+lt[t>>8&255]+`-`+lt[t>>16&15|64]+lt[t>>24&255]+`-`+lt[n&63|128]+lt[n>>8&255]+`-`+lt[n>>16&255]+lt[n>>24&255]+lt[r&255]+lt[r>>8&255]+lt[r>>16&255]+lt[r>>24&255]).toLowerCase()}function mt(e,t,n){return Math.max(t,Math.min(n,e))}function ht(e,t){return(e%t+t)%t}function gt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function _t(e,t,n){return e===t?0:(n-e)/(t-e)}function vt(e,t,n){return(1-n)*e+n*t}function yt(e,t,n,r){return vt(e,t,1-Math.exp(-n*r))}function bt(e,t=1){return t-Math.abs(ht(e,t*2)-t)}function xt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function St(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Ct(e,t){return e+Math.floor(Math.random()*(t-e+1))}function wt(e,t){return e+Math.random()*(t-e)}function Tt(e){return e*(.5-Math.random())}function Et(e){e!==void 0&&(ut=e);let t=ut+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Dt(e){return e*dt}function Ot(e){return e*ft}function kt(e){return!(e&e-1)&&e!==0}function At(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function jt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Mt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:L(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Nt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Pt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Ft={DEG2RAD:dt,RAD2DEG:ft,generateUUID:pt,clamp:mt,euclideanModulo:ht,mapLinear:gt,inverseLerp:_t,lerp:vt,damp:yt,pingpong:bt,smoothstep:xt,smootherstep:St,randInt:Ct,randFloat:wt,randFloatSpread:Tt,seededRandom:Et,degToRad:Dt,radToDeg:Ot,isPowerOfTwo:kt,ceilPowerOfTwo:At,floorPowerOfTwo:jt,setQuaternionFromProperEuler:Mt,normalize:Pt,denormalize:Nt},z=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},It=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:L(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lt.copy(this).projectOnVector(e),this.sub(Lt)}reflect(e){return this.sub(Lt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Lt=new B,Rt=new It,zt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return at(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Bt.makeScale(e,t)),this}rotate(e){return at(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Bt.makeRotation(-e)),this}translate(e,t){return at(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Bt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Bt=new zt,Vt=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ht=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ut(){let e={enabled:!0,workingColorSpace:Ge,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Gt(e.r),e.g=Gt(e.g),e.b=Gt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Kt(e.r),e.g=Kt(e.g),e.b=Kt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ke:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return at(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return at(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ge]:{primaries:t,whitePoint:r,transfer:Ke,toXYZ:Vt,fromXYZ:Ht,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:r,transfer:qe,toXYZ:Vt,fromXYZ:Ht,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),e}var Wt=Ut();function Gt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Kt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var qt,Jt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qt===void 0&&(qt=et(`canvas`)),qt.width=e.width,qt.height=e.height;let t=qt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=qt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=et(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Gt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Gt(t[e]/255)*255):t[e]=Gt(t[e]);return{data:t,width:e.width,height:e.height}}return L(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Yt=0,Xt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yt++}),this.uuid=pt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Zt(r[t].image)):e.push(Zt(r[t]))}else e=Zt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Zt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Jt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(L(`Texture: Unable to serialize Texture.`),{})}var Qt=0,$t=new B,en=class e extends ct{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=o,i=o,a=d,s=p,c=k,l=m,u=e.DEFAULT_ANISOTROPY,f=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qt++}),this.uuid=pt(),this.name=``,this.source=new Xt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=s,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new z(0,0),this.repeat=new z(1,1),this.center=new z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($t).x}get height(){return this.source.getSize($t).y}get depth(){return this.source.getSize($t).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){L(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){L(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case a:e.x-=Math.floor(e.x);break;case o:e.x=e.x<0?0:1;break;case s:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case a:e.y-=Math.floor(e.y);break;case o:e.y=e.y<0?0:1;break;case s:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null,en.DEFAULT_MAPPING=300,en.DEFAULT_ANISOTROPY=1;var tn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},nn=class extends ct{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:d,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tn(0,0,e,t),this.scissorTest=!1,this.viewport=new tn(0,0,e,t),this.textures=[];let r=new en({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:d,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Xt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},rn=class extends nn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},an=class extends en{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=c,this.minFilter=c,this.wrapR=o,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},on=class extends en{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=c,this.minFilter=c,this.wrapR=o,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},sn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/cn.setFromMatrixColumn(e,0).length(),i=1/cn.setFromMatrixColumn(e,1).length(),a=1/cn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(un,e,dn)}lookAt(e,t,n){let r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),fn.crossVectors(n,mn),fn.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),fn.crossVectors(n,mn)),fn.normalize(),pn.crossVectors(mn,fn),r[0]=fn.x,r[4]=pn.x,r[8]=mn.x,r[1]=fn.y,r[5]=pn.y,r[9]=mn.y,r[2]=fn.z,r[6]=pn.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],M=r[7],ne=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*ee+c*ne,i[12]=a*w+o*O+s*te+c*re,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*ee+f*ne,i[13]=l*w+u*O+d*te+f*re,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*ee+g*ne,i[14]=p*w+m*O+h*te+g*re,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*ee+b*ne,i[15]=_*w+v*O+y*te+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=cn.set(r[0],r[1],r[2]).length(),o=cn.set(r[4],r[5],r[6]).length(),s=cn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ln.copy(this);let c=1/a,l=1/o,u=1/s;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=l,ln.elements[5]*=l,ln.elements[6]*=l,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,t.setFromRotationMatrix(ln),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ze,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ze,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},cn=new B,ln=new sn,un=new B(0,0,0),dn=new B(1,1,1),fn=new B,pn=new B,mn=new B,hn=new sn,gn=new It,_n=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-mt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(mt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:L(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gn.setFromEuler(this),this.setFromQuaternion(gn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER=`XYZ`;var vn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},yn=0,bn=new B,xn=new It,Sn=new sn,Cn=new B,wn=new B,Tn=new B,En=new It,Dn=new B(1,0,0),On=new B(0,1,0),kn=new B(0,0,1),An={type:`added`},jn={type:`removed`},Mn={type:`childadded`,child:null},Nn={type:`childremoved`,child:null},Pn=class e extends ct{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yn++}),this.uuid=pt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new B,n=new _n,r=new It,i=new B(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new sn},normalMatrix:{value:new zt}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xn.setFromAxisAngle(e,t),this.quaternion.multiply(xn),this}rotateOnWorldAxis(e,t){return xn.setFromAxisAngle(e,t),this.quaternion.premultiply(xn),this}rotateX(e){return this.rotateOnAxis(Dn,e)}rotateY(e){return this.rotateOnAxis(On,e)}rotateZ(e){return this.rotateOnAxis(kn,e)}translateOnAxis(e,t){return bn.copy(e).applyQuaternion(this.quaternion),this.position.add(bn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dn,e)}translateY(e){return this.translateOnAxis(On,e)}translateZ(e){return this.translateOnAxis(kn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cn.copy(e):Cn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),wn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(wn,Cn,this.up):Sn.lookAt(Cn,wn,this.up),this.quaternion.setFromRotationMatrix(Sn),r&&(Sn.extractRotation(r.matrixWorld),xn.setFromRotationMatrix(Sn),this.quaternion.premultiply(xn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(R(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(An),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null):R(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jn),Nn.child=e,this.dispatchEvent(Nn),Nn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(An),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wn,e,Tn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wn,En,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Pn.DEFAULT_UP=new B(0,1,0),Pn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Fn=class extends Pn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},In={type:`move`},Ln=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(In)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Rn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Bn={h:0,s:0,l:0};function Vn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var V=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=We){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Wt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Wt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Wt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Wt.workingColorSpace){if(e=ht(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Vn(i,r,e+1/3),this.g=Vn(i,r,e),this.b=Vn(i,r,e-1/3)}return Wt.colorSpaceToWorking(this,r),this}setStyle(e,t=We){function n(t){t!==void 0&&parseFloat(t)<1&&L(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:L(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);L(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=We){let n=Rn[e.toLowerCase()];return n===void 0?L(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gt(e.r),this.g=Gt(e.g),this.b=Gt(e.b),this}copyLinearToSRGB(e){return this.r=Kt(e.r),this.g=Kt(e.g),this.b=Kt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=We){return Wt.workingToColorSpace(Hn.copy(this),e),Math.round(mt(Hn.r*255,0,255))*65536+Math.round(mt(Hn.g*255,0,255))*256+Math.round(mt(Hn.b*255,0,255))}getHexString(e=We){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Wt.workingColorSpace){Wt.workingToColorSpace(Hn.copy(this),t);let n=Hn.r,r=Hn.g,i=Hn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Wt.workingColorSpace){return Wt.workingToColorSpace(Hn.copy(this),t),e.r=Hn.r,e.g=Hn.g,e.b=Hn.b,e}getStyle(e=We){Wt.workingToColorSpace(Hn.copy(this),e);let t=Hn.r,n=Hn.g,r=Hn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Bn);let n=vt(zn.h,Bn.h,t),r=vt(zn.s,Bn.s,t),i=vt(zn.l,Bn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Hn=new V;V.NAMES=Rn;var Un=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new V(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Wn=class extends Pn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Gn=new B,Kn=new B,qn=new B,Jn=new B,Yn=new B,Xn=new B,Zn=new B,Qn=new B,$n=new B,er=new B,tr=new tn,nr=new tn,rr=new tn,ir=class e{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Gn.subVectors(e,t),r.cross(Gn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Gn.subVectors(r,t),Kn.subVectors(n,t),qn.subVectors(e,t);let a=Gn.dot(Gn),o=Gn.dot(Kn),s=Gn.dot(qn),c=Kn.dot(Kn),l=Kn.dot(qn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Jn)!==null&&Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Jn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Jn.x),s.addScaledVector(a,Jn.y),s.addScaledVector(o,Jn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return tr.setScalar(0),nr.setScalar(0),rr.setScalar(0),tr.fromBufferAttribute(e,t),nr.fromBufferAttribute(e,n),rr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(tr,i.x),a.addScaledVector(nr,i.y),a.addScaledVector(rr,i.z),a}static isFrontFacing(e,t,n,r){return Gn.subVectors(n,t),Kn.subVectors(e,t),Gn.cross(Kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Gn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Yn.subVectors(r,n),Xn.subVectors(i,n),Qn.subVectors(e,n);let s=Yn.dot(Qn),c=Xn.dot(Qn);if(s<=0&&c<=0)return t.copy(n);$n.subVectors(e,r);let l=Yn.dot($n),u=Xn.dot($n);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Yn,a);er.subVectors(e,i);let f=Yn.dot(er),p=Xn.dot(er);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Xn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Zn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Zn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Yn,a).addScaledVector(Xn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ar=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=sr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,sr):sr.fromBufferAttribute(r,t),sr.applyMatrix4(e.matrixWorld),this.expandByPoint(sr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),cr.copy(e.boundingBox)),cr.applyMatrix4(e.matrixWorld),this.union(cr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sr),sr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),gr.subVectors(this.max,hr),lr.subVectors(e.a,hr),ur.subVectors(e.b,hr),dr.subVectors(e.c,hr),fr.subVectors(ur,lr),pr.subVectors(dr,ur),mr.subVectors(lr,dr);let t=[0,-fr.z,fr.y,0,-pr.z,pr.y,0,-mr.z,mr.y,fr.z,0,-fr.x,pr.z,0,-pr.x,mr.z,0,-mr.x,-fr.y,fr.x,0,-pr.y,pr.x,0,-mr.y,mr.x,0];return!yr(t,lr,ur,dr,gr)||(t=[1,0,0,0,1,0,0,0,1],!yr(t,lr,ur,dr,gr))?!1:(_r.crossVectors(fr,pr),t=[_r.x,_r.y,_r.z],yr(t,lr,ur,dr,gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(or),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},or=[new B,new B,new B,new B,new B,new B,new B,new B],sr=new B,cr=new ar,lr=new B,ur=new B,dr=new B,fr=new B,pr=new B,mr=new B,hr=new B,gr=new B,_r=new B,vr=new B;function yr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){vr.fromArray(e,a);let o=i.x*Math.abs(vr.x)+i.y*Math.abs(vr.y)+i.z*Math.abs(vr.z),s=t.dot(vr),c=n.dot(vr),l=r.dot(vr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var br=new B,xr=new z,Sr=0,Cr=class extends ct{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ye,this.updateRanges=[],this.gpuType=b,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xr.fromBufferAttribute(this,t),xr.applyMatrix3(e),this.setXY(t,xr.x,xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix4(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyNormalMatrix(e),this.setXYZ(t,br.x,br.y,br.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.transformDirection(e),this.setXYZ(t,br.x,br.y,br.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},wr=class extends Cr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Tr=class extends Cr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Er=class extends Cr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dr=new ar,Or=new B,kr=new B,Ar=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Dr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);let t=Or.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Or,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(kr)),this.expandByPoint(Or.copy(e.center).sub(kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},jr=0,Mr=new sn,Nr=new Pn,Pr=new B,Fr=new ar,Ir=new ar,Lr=new B,Rr=class e extends ct{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jr++}),this.uuid=pt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Qe(e)?Tr:wr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new zt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mr.makeRotationFromQuaternion(e),this.applyMatrix4(Mr),this}rotateX(e){return Mr.makeRotationX(e),this.applyMatrix4(Mr),this}rotateY(e){return Mr.makeRotationY(e),this.applyMatrix4(Mr),this}rotateZ(e){return Mr.makeRotationZ(e),this.applyMatrix4(Mr),this}translate(e,t,n){return Mr.makeTranslation(e,t,n),this.applyMatrix4(Mr),this}scale(e,t,n){return Mr.makeScale(e,t,n),this.applyMatrix4(Mr),this}lookAt(e){return Nr.lookAt(e),Nr.updateMatrix(),this.applyMatrix4(Nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Er(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&L(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ar);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){R(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Fr.setFromBufferAttribute(n),this.morphTargetsRelative?(Lr.addVectors(this.boundingBox.min,Fr.min),this.boundingBox.expandByPoint(Lr),Lr.addVectors(this.boundingBox.max,Fr.max),this.boundingBox.expandByPoint(Lr)):(this.boundingBox.expandByPoint(Fr.min),this.boundingBox.expandByPoint(Fr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&R(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ar);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){R(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Fr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ir.setFromBufferAttribute(n),this.morphTargetsRelative?(Lr.addVectors(Fr.min,Ir.min),Fr.expandByPoint(Lr),Lr.addVectors(Fr.max,Ir.max),Fr.expandByPoint(Lr)):(Fr.expandByPoint(Ir.min),Fr.expandByPoint(Ir.max))}Fr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Lr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Lr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Lr.fromBufferAttribute(a,t),o&&(Pr.fromBufferAttribute(e,t),Lr.add(Pr)),r=Math.max(r,n.distanceToSquared(Lr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&R(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){R(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Cr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new B,s[e]=new B;let c=new B,l=new B,u=new B,d=new z,f=new z,p=new z,m=new B,h=new B;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new B,y=new B,b=new B,x=new B;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Cr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new B,i=new B,a=new B,o=new B,s=new B,c=new B,l=new B,u=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lr.fromBufferAttribute(e,t),Lr.normalize(),e.setXYZ(t,Lr.x,Lr.y,Lr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Cr(a,r,i)}if(this.index===null)return L(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},zr=0,Br=class extends ct{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zr++}),this.uuid=pt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new V(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Je,this.stencilZFail=Je,this.stencilZPass=Je,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){L(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){L(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new V().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new z().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new z().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Vr=new B,Hr=new B,Ur=new B,Wr=new B,Gr=new B,Kr=new B,qr=new B,Jr=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Vr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vr.copy(this.origin).addScaledVector(this.direction,t),Vr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Hr.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),Wr.copy(this.origin).sub(Hr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=Wr.dot(this.direction),s=-Wr.dot(Ur),c=Wr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Hr).addScaledVector(Ur,d),f}intersectSphere(e,t){Vr.subVectors(e.center,this.origin);let n=Vr.dot(this.direction),r=Vr.dot(Vr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Vr)!==null}intersectTriangle(e,t,n,r,i){Gr.subVectors(t,e),Kr.subVectors(n,e),qr.crossVectors(Gr,Kr);let a=this.direction.dot(qr),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wr.subVectors(this.origin,e);let s=o*this.direction.dot(Kr.crossVectors(Wr,Kr));if(s<0)return null;let c=o*this.direction.dot(Gr.cross(Wr));if(c<0||s+c>a)return null;let l=-o*Wr.dot(qr);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yr=class extends Br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new V(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Xr=new sn,Zr=new Jr,Qr=new Ar,$r=new B,ei=new B,ti=new B,ni=new B,ri=new B,ii=new B,ai=new B,oi=new B,H=class extends Pn{constructor(e=new Rr,t=new Yr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ii.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ri.fromBufferAttribute(s,e),a?ii.addScaledVector(ri,r):ii.addScaledVector(ri.sub(t),r))}t.add(ii)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(i),Zr.copy(e.ray).recast(e.near),!(Qr.containsPoint(Zr.origin)===!1&&(Zr.intersectSphere(Qr,$r)===null||Zr.origin.distanceToSquared($r)>(e.far-e.near)**2))&&(Xr.copy(i).invert(),Zr.copy(e.ray).applyMatrix4(Xr),(n.boundingBox===null||Zr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Zr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ci(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ci(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ci(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ci(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function si(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;oi.copy(s),oi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(oi);return l<n.near||l>n.far?null:{distance:l,point:oi.clone(),object:e}}function ci(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ei),e.getVertexPosition(c,ti),e.getVertexPosition(l,ni);let u=si(e,t,n,r,ei,ti,ni,ai);if(u){let e=new B;ir.getBarycoord(ai,ei,ti,ni,e),i&&(u.uv=ir.getInterpolatedAttribute(i,s,c,l,e,new z)),a&&(u.uv1=ir.getInterpolatedAttribute(a,s,c,l,e,new z)),o&&(u.normal=ir.getInterpolatedAttribute(o,s,c,l,e,new B),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new B,materialIndex:0};ir.getNormal(ei,ti,ni,t.normal),u.face=t,u.barycoord=e}return u}var li=class extends en{constructor(e=null,t=1,n=1,r,i,a,o,s,l=c,u=c,d,f){super(null,a,o,s,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ui=class extends Cr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},di=new sn,fi=new sn,pi=[],mi=new ar,hi=new sn,gi=new H,_i=new Ar,vi=class extends H{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,hi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ar),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,di),mi.copy(e.boundingBox).applyMatrix4(di),this.boundingBox.union(mi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ar),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,di),_i.copy(e.boundingSphere).applyMatrix4(di),this.boundingSphere.union(_i)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(gi.geometry=this.geometry,gi.material=this.material,gi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_i.copy(this.boundingSphere),_i.applyMatrix4(n),e.ray.intersectsSphere(_i)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,di),fi.multiplyMatrices(n,di),gi.matrixWorld=fi,gi.raycast(e,pi);for(let e=0,n=pi.length;e<n;e++){let n=pi[e];n.instanceId=i,n.object=this,t.push(n)}pi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new li(new Float32Array(r*this.count),r,this.count,te,b));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},yi=new B,bi=new B,xi=new zt,Si=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=yi.subVectors(n,t).cross(bi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(yi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||xi.getNormalMatrix(e),r=this.coplanarPoint(yi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ci=new Ar,wi=new z(.5,.5),Ti=new B,Ei=class{constructor(e=new Si,t=new Si,n=new Si,r=new Si,i=new Si,a=new Si){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ze,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){return Ci.center.set(0,0,0),Ci.radius=.7071067811865476+wi.distanceTo(e.center),Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ti.x=r.normal.x>0?e.max.x:e.min.x,Ti.y=r.normal.y>0?e.max.y:e.min.y,Ti.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ti)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Di=class extends Br{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new V(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Oi=new sn,ki=new Jr,Ai=new Ar,ji=new B,Mi=class extends Pn{constructor(e=new Rr,t=new Di){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ai.copy(n.boundingSphere),Ai.applyMatrix4(r),Ai.radius+=i,e.ray.intersectsSphere(Ai)===!1)return;Oi.copy(r).invert(),ki.copy(e.ray).applyMatrix4(Oi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ji.fromBufferAttribute(l,n),Ni(ji,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ji.fromBufferAttribute(l,a),Ni(ji,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ni(e,t,n,r,i,a,o){let s=ki.distanceSqToPoint(e);if(s<n){let n=new B;ki.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Pi=class extends en{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Fi=class extends en{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ii=class extends en{constructor(e,t,n=y,r,i,a,o=c,s=c,l,u=A,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,a,o,s,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Xt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Li=class extends Ii{constructor(e,t=y,n=301,r,i,a=c,o=c,s,l=A){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,i,a,o,s,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ri=class extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},U=class e extends Rr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Er(c,3)),this.setAttribute(`normal`,new Er(l,3)),this.setAttribute(`uv`,new Er(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new B;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},zi=class e extends Rr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new B,g=new B;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new Er(o,3)),this.setAttribute(`normal`,new Er(s,3)),this.setAttribute(`uv`,new Er(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Bi=class e extends Rr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new B,l=new z;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Er(a,3)),this.setAttribute(`normal`,new Er(o,3)),this.setAttribute(`uv`,new Er(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},W=class e extends Rr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Er(u,3)),this.setAttribute(`normal`,new Er(d,3)),this.setAttribute(`uv`,new Er(f,2));function _(){let a=new B,_=new B,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new z,m=new B,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vi=class e extends W{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Hi=class e extends Rr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Er(i,3)),this.setAttribute(`normal`,new Er(i.slice(),3)),this.setAttribute(`uv`,new Er(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new B,r=new B,i=new B;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new B;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new B;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new B,t=new B,n=new B,r=new B,o=new z,s=new z,c=new z;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ui=class e extends Hi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Wi=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){L(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new z:new B);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,r=[],i=[],a=[],o=new B,s=new sn;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new B)}i[0]=new B,a[0]=new B;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(mt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(mt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Gi=class extends Wi{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new z){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ki=class extends Gi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function qi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Ji=new B,Yi=new B,Xi=new qi,Zi=new qi,Qi=new qi,$i=class extends Wi{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new B){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Yi.subVectors(r[0],r[1]).add(r[0]),c=Yi);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Ji.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Ji),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Xi.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Zi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Qi.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Xi.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Zi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Qi.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Xi.calc(s),Zi.calc(s),Qi.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new B().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ea(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ta(e,t){let n=1-e;return n*n*t}function na(e,t){return 2*(1-e)*e*t}function ra(e,t){return e*e*t}function ia(e,t,n,r){return ta(e,t)+na(e,n)+ra(e,r)}function aa(e,t){let n=1-e;return n*n*n*t}function oa(e,t){let n=1-e;return 3*n*n*e*t}function sa(e,t){return 3*(1-e)*e*e*t}function ca(e,t){return e*e*e*t}function la(e,t,n,r,i){return aa(e,t)+oa(e,n)+sa(e,r)+ca(e,i)}var ua=class extends Wi{constructor(e=new z,t=new z,n=new z,r=new z){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new z){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(la(e,r.x,i.x,a.x,o.x),la(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},da=class extends Wi{constructor(e=new B,t=new B,n=new B,r=new B){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new B){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(la(e,r.x,i.x,a.x,o.x),la(e,r.y,i.y,a.y,o.y),la(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fa=class extends Wi{constructor(e=new z,t=new z){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new z){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pa=class extends Wi{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new B){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends Wi{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ia(e,r.x,i.x,a.x),ia(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends Wi{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ia(e,r.x,i.x,a.x),ia(e,r.y,i.y,a.y),ia(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ga=class extends Wi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new z){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ea(o,s.x,c.x,l.x,u.x),ea(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new z().fromArray(n))}return this}},_a=Object.freeze({__proto__:null,ArcCurve:Ki,CatmullRomCurve3:$i,CubicBezierCurve:ua,CubicBezierCurve3:da,EllipseCurve:Gi,LineCurve:fa,LineCurve3:pa,QuadraticBezierCurve:ma,QuadraticBezierCurve3:ha,SplineCurve:ga}),va=class extends Wi{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new _a[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new _a[n.type]().fromJSON(n))}return this}},ya=class extends va{constructor(e){super(),this.type=`Path`,this.currentPoint=new z,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new fa(this.currentPoint.clone(),new z(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new ma(this.currentPoint.clone(),new z(e,t),new z(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new ua(this.currentPoint.clone(),new z(e,t),new z(n,r),new z(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ga([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Gi(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ba=class extends ya{constructor(e){super(e),this.uuid=pt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ya().fromJSON(n))}return this}};function xa(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Sa(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=ka(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return wa(a,o,n,s,c,l,0),o}function Sa(e,t,n,r,i){let a;if(i===$a(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Xa(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Xa(i/r|0,e[i],e[i+1],a);return a&&Ha(a,a.next)&&(Za(a),a=a.next),a}function Ca(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ha(n,n.next)||Va(n.prev,n,n.next)===0)){if(Za(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function wa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Pa(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ea(e,r,i,a):Ta(e)){t.push(c.i,e.i,l.i),Za(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=Da(Ca(e),t),wa(e,t,n,r,i,a,2)):o===2&&Oa(e,t,n,r,i,a):wa(Ca(e),t,n,r,i,a,1);break}}}function Ta(e){let t=e.prev,n=e,r=e.next;if(Va(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&za(i,s,a,c,o,l,m.x,m.y)&&Va(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ea(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Va(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Ia(p,m,t,n,r),v=Ia(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&za(s,u,c,d,l,f,y.x,y.y)&&Va(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&za(s,u,c,d,l,f,b.x,b.y)&&Va(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&za(s,u,c,d,l,f,y.x,y.y)&&Va(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&za(s,u,c,d,l,f,b.x,b.y)&&Va(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Da(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ha(r,i)&&Ua(r,n,n.next,i)&&qa(r,i)&&qa(i,r)&&(t.push(r.i,n.i,i.i),Za(n),Za(n.next),n=e=i),n=n.next}while(n!==e);return Ca(n)}function Oa(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Ba(o,e)){let s=Ya(o,e);o=Ca(o,o.next),s=Ca(s,s.next),wa(o,t,n,r,i,a,0),wa(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function ka(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Sa(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(La(o))}i.sort(Aa);for(let e=0;e<i.length;e++)n=ja(i[e],n);return n}function Aa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function ja(e,t){let n=Ma(e,t);if(!n)return t;let r=Ya(n,e);return Ca(r,r.next),Ca(n,n.next)}function Ma(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ha(e,n))return n;do{if(Ha(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Ra(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);qa(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Na(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Na(e,t){return Va(e.prev,e,t.prev)<0&&Va(t.next,e,e.next)<0}function Pa(e,t,n,r){let i=e;do i.z===0&&(i.z=Ia(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Fa(i)}function Fa(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Ia(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function La(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ra(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function za(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Ra(e,t,n,r,i,a,o,s)}function Ba(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ka(e,t)&&(qa(e,t)&&qa(t,e)&&Ja(e,t)&&(Va(e.prev,e,t.prev)||Va(e,t.prev,t))||Ha(e,t)&&Va(e.prev,e,e.next)>0&&Va(t.prev,t,t.next)>0)}function Va(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ha(e,t){return e.x===t.x&&e.y===t.y}function Ua(e,t,n,r){let i=Ga(Va(e,t,n)),a=Ga(Va(e,t,r)),o=Ga(Va(n,r,e)),s=Ga(Va(n,r,t));return!!(i!==a&&o!==s||i===0&&Wa(e,n,t)||a===0&&Wa(e,r,t)||o===0&&Wa(n,e,r)||s===0&&Wa(n,t,r))}function Wa(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ga(e){return e>0?1:e<0?-1:0}function Ka(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Ua(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function qa(e,t){return Va(e.prev,e,e.next)<0?Va(e,t,e.next)>=0&&Va(e,e.prev,t)>=0:Va(e,t,e.prev)<0||Va(e,e.next,t)<0}function Ja(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ya(e,t){let n=Qa(e.i,e.x,e.y),r=Qa(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Xa(e,t,n,r){let i=Qa(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Za(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Qa(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $a(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var eo=class{static triangulate(e,t,n=2){return xa(e,t,n)}},to=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];no(e),ro(n,e);let a=e.length;t.forEach(no);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,ro(n,t[e]);let o=eo.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function no(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function ro(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var io=class e extends Rr{constructor(e=new ba([new z(.5,.5),new z(-.5,.5),new z(-.5,-.5),new z(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Er(r,3)),this.setAttribute(`uv`,new Er(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?ao:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new B,b=new B,x=new B}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!to.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];to.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||R(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new z(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new z(r/a,i/a)}let ee=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),ee[e]=A(D[e],D[n],D[r]);let te=[],j,M=ee.concat();for(let e=0,t=E;e<t;e++){let t=w[e];j=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),j[e]=A(t[e],t[r],t[i]);te.push(j),M=M.concat(j)}let ne;if(p===0)ne=to.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],ee[t],a);ce(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];j=te[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],j[e],a);ce(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ne=to.triangulateShape(e,t)}let re=ne.length,ie=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],M[e],ie):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ce(x.x,x.y,x.z)):ce(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],M[t],ie):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ce(x.x,x.y,x.z)):ce(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],ee[e],r);ce(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];j=te[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],j[e],r);_?ce(i.x,i.y+g[s-1].y,g[s-1].x+n):ce(i.x,i.y,c+n)}}}ae(),oe();function ae(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<re;e++){let n=ne[e];le(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<re;e++){let n=ne[e];le(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<re;e++){let t=ne[e];le(t[2],t[1],t[0])}for(let e=0;e<re;e++){let t=ne[e];le(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function oe(){let e=r.length/3,t=0;se(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];se(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function se(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);ue(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ce(e,t,n){a.push(e),a.push(t),a.push(n)}function le(e,t,i){N(e),N(t),N(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);de(o[0]),de(o[1]),de(o[2])}function ue(e,t,i,a){N(e),N(t),N(a),N(t),N(i),N(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);de(s[0]),de(s[1]),de(s[3]),de(s[1]),de(s[2]),de(s[3])}function N(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function de(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return oo(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new _a[i.type]().fromJSON(i)),new e(r,t.options)}},ao={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new z(a,o),new z(s,c),new z(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new z(o,1-c),new z(l,1-d),new z(f,1-m),new z(h,1-_)]:[new z(s,1-c),new z(u,1-d),new z(p,1-m),new z(g,1-_)]}};function oo(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var so=class e extends Hi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},co=class e extends Rr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Er(p,3)),this.setAttribute(`normal`,new Er(m,3)),this.setAttribute(`uv`,new Er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},lo=class e extends Rr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new B,p=new z;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Er(s,3)),this.setAttribute(`normal`,new Er(c,3)),this.setAttribute(`uv`,new Er(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},uo=class e extends Rr{constructor(e=new ba([new z(0,.5),new z(-.5,-.5),new z(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new Er(r,3)),this.setAttribute(`normal`,new Er(i,3)),this.setAttribute(`uv`,new Er(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;to.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];to.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=to.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return fo(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function fo(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var po=class e extends Rr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new B,d=new B,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Er(p,3)),this.setAttribute(`normal`,new Er(m,3)),this.setAttribute(`uv`,new Er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},mo=class e extends Rr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new B,f=new B,p=new B;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Er(c,3)),this.setAttribute(`normal`,new Er(l,3)),this.setAttribute(`uv`,new Er(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},ho=class e extends Rr{constructor(e=new ha(new B(-1,-1,0),new B(-1,1,0),new B(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new B,s=new B,c=new z,l=new B,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Er(u,3)),this.setAttribute(`normal`,new Er(d,3)),this.setAttribute(`uv`,new Er(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new _a[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function go(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(vo(i))i.isRenderTargetTexture?(L(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(vo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function _o(e){let t={};for(let n=0;n<e.length;n++){let r=go(e[n]);for(let e in r)t[e]=r[e]}return t}function vo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function yo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function bo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}var xo={clone:go,merge:_o},So=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Co=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wo=class extends Br{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=So,this.fragmentShader=Co,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=go(e.uniforms),this.uniformsGroups=yo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new V().setHex(r.value);break;case`v2`:this.uniforms[n].value=new z().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new tn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new zt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new sn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},To=class extends wo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},G=class extends Br{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new V(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new V(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Eo=class extends G{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new V(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new V(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new V(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Do=class extends Br{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new V(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new V(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Oo=class extends Br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ue,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ko=class extends Br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ao(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var jo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Mo=class extends jo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Be,endingEnd:Be}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ve:i=e,o=2*t-n;break;case He:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ve:a=e,s=2*n-t;break;case He:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},No=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Po=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fo=class extends jo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Io=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case F:t=this.InterpolantFactoryMethodDiscrete;break;case Re:t=this.InterpolantFactoryMethodLinear;break;case I:t=this.InterpolantFactoryMethodSmooth;break;case ze:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return L(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return F;case this.InterpolantFactoryMethodLinear:return Re;case this.InterpolantFactoryMethodSmooth:return I;case this.InterpolantFactoryMethodBezier:return ze}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(R(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(R(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){R(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){R(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&$e(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){R(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===I,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Io.prototype.ValueTypeName=``,Io.prototype.TimeBufferType=Float32Array,Io.prototype.ValueBufferType=Float32Array,Io.prototype.DefaultInterpolation=Re;var Lo=class extends Io{constructor(e,t,n){super(e,t,n)}};Lo.prototype.ValueTypeName=`bool`,Lo.prototype.ValueBufferType=Array,Lo.prototype.DefaultInterpolation=F,Lo.prototype.InterpolantFactoryMethodLinear=void 0,Lo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ro=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Ro.prototype.ValueTypeName=`color`;var zo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};zo.prototype.ValueTypeName=`number`;var Bo=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)It.slerpFlat(i,0,a,c-o,a,c,s);return i}},Vo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Bo(this.times,this.values,this.getValueSize(),e)}};Vo.prototype.ValueTypeName=`quaternion`,Vo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends Io{constructor(e,t,n){super(e,t,n)}};Ho.prototype.ValueTypeName=`string`,Ho.prototype.ValueBufferType=Array,Ho.prototype.DefaultInterpolation=F,Ho.prototype.InterpolantFactoryMethodLinear=void 0,Ho.prototype.InterpolantFactoryMethodSmooth=void 0;var Uo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Uo.prototype.ValueTypeName=`vector`;var Wo=class extends Pn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new V(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Go=class extends Wo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new V(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ko=new sn,qo=new B,Jo=new B,Yo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new z(512,512),this.mapType=m,this.map=null,this.mapPass=null,this.matrix=new sn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ei,this._frameExtents=new z(1,1),this._viewportCount=1,this._viewports=[new tn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;qo.setFromMatrixPosition(e.matrixWorld),t.position.copy(qo),Jo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jo),t.updateMatrixWorld(),Ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ko,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xo=new B,Zo=new It,Qo=new B,$o=class extends Pn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=Ze,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xo,Zo,Qo),Qo.x===1&&Qo.y===1&&Qo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,Zo,Qo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Xo,Zo,Qo),Qo.x===1&&Qo.y===1&&Qo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,Zo,Qo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},es=new B,ts=new z,ns=new z,rs=class extends $o{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ft*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(dt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ft*2*Math.atan(Math.tan(dt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(es.x,es.y).multiplyScalar(-e/es.z),es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(es.x,es.y).multiplyScalar(-e/es.z)}getViewSize(e,t){return this.getViewBounds(e,ts,ns),t.subVectors(ns,ts)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(dt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},is=class extends Yo{constructor(){super(new rs(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ft*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},as=class extends Wo{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.target=new Pn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new is}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},os=class extends Yo{constructor(){super(new rs(90,1,.5,500)),this.isPointLightShadow=!0}},ss=class extends Wo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new os}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},cs=class extends $o{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ls=class extends Yo{constructor(){super(new cs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},us=class extends Wo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.target=new Pn,this.shadow=new ls}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ds=-90,fs=1,ps=class extends Pn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new rs(ds,fs,e,t);r.layers=this.layers,this.add(r);let i=new rs(ds,fs,e,t);i.layers=this.layers,this.add(i);let a=new rs(ds,fs,e,t);a.layers=this.layers,this.add(a);let o=new rs(ds,fs,e,t);o.layers=this.layers,this.add(o);let s=new rs(ds,fs,e,t);s.layers=this.layers,this.add(s);let c=new rs(ds,fs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ms=class extends rs{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},hs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=gs.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function gs(){this._document.hidden===!1&&this.reset()}var _s=`\\[\\]\\.:\\/`,vs=RegExp(`[\\[\\]\\.:\\/]`,`g`),ys=`[^\\[\\]\\.:\\/]`,bs=`[^`+_s.replace(`\\.`,``)+`]`,xs=`((?:WC+[\\/:])*)`.replace(`WC`,ys),Ss=`(WCOD+)?`.replace(`WCOD`,bs),Cs=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ys),ws=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ys),Ts=RegExp(`^`+xs+Ss+Cs+ws+`$`),Es=[`material`,`materials`,`bones`,`map`],Ds=class{constructor(e,t,n){let r=n||Os.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Os=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(vs,``)}static parseTrackName(e){let t=Ts.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Es.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){L(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){R(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){R(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){R(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){R(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){R(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;R(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Os.Composite=Ds,Os.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Os.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Os.prototype.GetterByBindingType=[Os.prototype._getValue_direct,Os.prototype._getValue_array,Os.prototype._getValue_arrayElement,Os.prototype._getValue_toArray],Os.prototype.SetterByBindingTypeAndVersioning=[[Os.prototype._setValue_direct,Os.prototype._setValue_direct_setNeedsUpdate,Os.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Os.prototype._setValue_array,Os.prototype._setValue_array_setNeedsUpdate,Os.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Os.prototype._setValue_arrayElement,Os.prototype._setValue_arrayElement_setNeedsUpdate,Os.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Os.prototype._setValue_fromArray,Os.prototype._setValue_fromArray_setNeedsUpdate,Os.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function ks(e,t,n,r){let i=As(r);switch(n){case D:return e*t;case te:return e*t/i.components*i.byteLength;case j:return e*t/i.components*i.byteLength;case M:return e*t*2/i.components*i.byteLength;case ne:return e*t*2/i.components*i.byteLength;case O:return e*t*3/i.components*i.byteLength;case k:return e*t*4/i.components*i.byteLength;case re:return e*t*4/i.components*i.byteLength;case ie:case ae:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oe:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:case N:return Math.max(e,16)*Math.max(t,8)/4;case ce:case ue:return Math.max(e,8)*Math.max(t,8)/2;case de:case fe:case me:case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pe:case ge:case _e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ye:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case be:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case De:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Oe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ke:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ae:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case je:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Me:case Ne:case Pe:return Math.ceil(e/4)*Math.ceil(t/4)*16;case P:case Fe:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ie:case Le:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function As(e){switch(e){case m:case h:return{byteLength:1,components:1};case _:case g:case x:return{byteLength:2,components:1};case S:case C:return{byteLength:2,components:4};case y:case v:case b:return{byteLength:4,components:1};case T:case E:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?L(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function js(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ms(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Ns={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},K={common:{diffuse:{value:new V(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new V(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new V(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new V(16777215)},opacity:{value:1},center:{value:new z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Ps={basic:{uniforms:_o([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:Ns.meshbasic_vert,fragmentShader:Ns.meshbasic_frag},lambert:{uniforms:_o([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new V(0)},envMapIntensity:{value:1}}]),vertexShader:Ns.meshlambert_vert,fragmentShader:Ns.meshlambert_frag},phong:{uniforms:_o([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new V(0)},specular:{value:new V(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ns.meshphong_vert,fragmentShader:Ns.meshphong_frag},standard:{uniforms:_o([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:new V(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ns.meshphysical_vert,fragmentShader:Ns.meshphysical_frag},toon:{uniforms:_o([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:new V(0)}}]),vertexShader:Ns.meshtoon_vert,fragmentShader:Ns.meshtoon_frag},matcap:{uniforms:_o([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:Ns.meshmatcap_vert,fragmentShader:Ns.meshmatcap_frag},points:{uniforms:_o([K.points,K.fog]),vertexShader:Ns.points_vert,fragmentShader:Ns.points_frag},dashed:{uniforms:_o([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ns.linedashed_vert,fragmentShader:Ns.linedashed_frag},depth:{uniforms:_o([K.common,K.displacementmap]),vertexShader:Ns.depth_vert,fragmentShader:Ns.depth_frag},normal:{uniforms:_o([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:Ns.meshnormal_vert,fragmentShader:Ns.meshnormal_frag},sprite:{uniforms:_o([K.sprite,K.fog]),vertexShader:Ns.sprite_vert,fragmentShader:Ns.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ns.background_vert,fragmentShader:Ns.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Ns.backgroundCube_vert,fragmentShader:Ns.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ns.cube_vert,fragmentShader:Ns.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ns.equirect_vert,fragmentShader:Ns.equirect_frag},distance:{uniforms:_o([K.common,K.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ns.distance_vert,fragmentShader:Ns.distance_frag},shadow:{uniforms:_o([K.lights,K.fog,{color:{value:new V(0)},opacity:{value:1}}]),vertexShader:Ns.shadow_vert,fragmentShader:Ns.shadow_frag}};Ps.physical={uniforms:_o([Ps.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new V(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new V(0)},specularColor:{value:new V(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Ns.meshphysical_vert,fragmentShader:Ns.meshphysical_frag};var Fs={r:0,b:0,g:0},Is=new sn,Ls=new zt;Ls.set(-1,0,0,0,1,0,0,0,1);function Rs(e,t,n,r,i,a){let o=new V(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new H(new U(1,1,1),new wo({name:`BackgroundCubeMaterial`,uniforms:go(Ps.backgroundCube.uniforms),vertexShader:Ps.backgroundCube.vertexShader,fragmentShader:Ps.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Is.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ls),l.material.toneMapped=Wt.getTransfer(i.colorSpace)!==qe,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new H(new co(2,2),new wo({name:`BackgroundMaterial`,uniforms:go(Ps.background.uniforms),vertexShader:Ps.background.vertexShader,fragmentShader:Ps.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Wt.getTransfer(i.colorSpace)!==qe,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Fs,bo(e)),n.buffers.color.setClear(Fs.r,Fs.g,Fs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function zs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Bs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Vs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(L(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&L(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Hs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Si,s=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Us=4,Ws=[.125,.215,.35,.446,.526,.582],Gs=20,Ks=256,qs=new cs,Js=new V,Ys=null,Xs=0,Zs=0,Qs=!1,$s=new B,ec=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=$s}=i;Ys=this._renderer.getRenderTarget(),Xs=this._renderer.getActiveCubeFace(),Zs=this._renderer.getActiveMipmapLevel(),Qs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=oc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ys,Xs,Zs),this._renderer.xr.enabled=Qs,e.scissorTest=!1,rc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ys=this._renderer.getRenderTarget(),Xs=this._renderer.getActiveCubeFace(),Zs=this._renderer.getActiveMipmapLevel(),Qs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:d,minFilter:d,generateMipmaps:!1,type:x,format:k,colorSpace:Ge,depthBuffer:!1},r=nc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tc(r)),this._blurMaterial=ac(r,e,t),this._ggxMaterial=ic(r,e,t)}return r}_compileMaterial(e){let t=new H(new Rr,e);this._renderer.compile(t,qs)}_sceneToCubeUV(e,t,n,r,i){let a=new rs(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Js),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new H(new U,new Yr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Js),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;rc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=oc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;rc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,qs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Us?n-d+Us:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,rc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,qs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,rc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,qs)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&R(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Gs;m>Gs&&L(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gs}`);let h=[],g=0;for(let e=0;e<Gs;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];rc(t,3*v*(r>_-Us?r-_+Us:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,qs)}};function tc(e){let t=[],n=[],r=[],i=e,a=e-Us+1+Ws.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Us?s=Ws[o-e+Us-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Rr;h.setAttribute(`position`,new Cr(f,3)),h.setAttribute(`uv`,new Cr(p,2)),h.setAttribute(`faceIndex`,new Cr(m,1)),r.push(new H(h,null)),i>Us&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function nc(e,t,n){let r=new rn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function rc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function ic(e,t,n){return new wo({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ks,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:cc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ac(e,t,n){let r=new Float32Array(Gs),i=new B(0,1,0);return new wo({name:`SphericalGaussianBlur`,defines:{n:Gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function oc(){return new wo({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function sc(){return new wo({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function cc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var lc=class extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Pi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new U(5,5,5),i=new wo({name:`CubemapFromEquirect`,uniforms:go(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new H(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=d),new ps(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function uc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new lc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new ec(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new ec(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function dc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&at(`WebGLRenderer: `+e+` extension not supported.`),t}}}function fc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Tr:wr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function pc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function mc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:R(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function hc(e,t,n){let r=new WeakMap,i=new tn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new an(h,p,m,u);g.type=b,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new z(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function gc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var _c={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function vc(e,t,n,r,i,a){let o=new rn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Ii(t,n):void 0}),s=new rn(t,n,{type:x,depthBuffer:!1,stencilBuffer:!1}),c=new Rr;c.setAttribute(`position`,new Er([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new Er([0,2,0,0,2,0],2));let l=new To({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new H(c,l),d=new cs(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},Wt.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=_c[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var yc=new en,bc=new Ii(1,1),xc=new an,Sc=new on,Cc=new Pi,wc=[],Tc=[],Ec=new Float32Array(16),Dc=new Float32Array(9),Oc=new Float32Array(4);function kc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=wc[i];if(a===void 0&&(a=new Float32Array(i),wc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ac(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function jc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Mc(e,t){let n=Tc[t];n===void 0&&(n=new Int32Array(t),Tc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Nc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ac(n,t))return;e.uniform2fv(this.addr,t),jc(n,t)}}function Fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ac(n,t))return;e.uniform3fv(this.addr,t),jc(n,t)}}function Ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ac(n,t))return;e.uniform4fv(this.addr,t),jc(n,t)}}function Lc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ac(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),jc(n,t)}else{if(Ac(n,r))return;Oc.set(r),e.uniformMatrix2fv(this.addr,!1,Oc),jc(n,r)}}function Rc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ac(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),jc(n,t)}else{if(Ac(n,r))return;Dc.set(r),e.uniformMatrix3fv(this.addr,!1,Dc),jc(n,r)}}function zc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ac(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),jc(n,t)}else{if(Ac(n,r))return;Ec.set(r),e.uniformMatrix4fv(this.addr,!1,Ec),jc(n,r)}}function Bc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ac(n,t))return;e.uniform2iv(this.addr,t),jc(n,t)}}function Hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ac(n,t))return;e.uniform3iv(this.addr,t),jc(n,t)}}function Uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ac(n,t))return;e.uniform4iv(this.addr,t),jc(n,t)}}function Wc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ac(n,t))return;e.uniform2uiv(this.addr,t),jc(n,t)}}function Kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ac(n,t))return;e.uniform3uiv(this.addr,t),jc(n,t)}}function qc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ac(n,t))return;e.uniform4uiv(this.addr,t),jc(n,t)}}function Jc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(bc.compareFunction=n.isReversedDepthBuffer()?518:515,a=bc):a=yc,n.setTexture2D(t||a,i)}function Yc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Sc,i)}function Xc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Cc,i)}function Zc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||xc,i)}function Qc(e){switch(e){case 5126:return Nc;case 35664:return Pc;case 35665:return Fc;case 35666:return Ic;case 35674:return Lc;case 35675:return Rc;case 35676:return zc;case 5124:case 35670:return Bc;case 35667:case 35671:return Vc;case 35668:case 35672:return Hc;case 35669:case 35673:return Uc;case 5125:return Wc;case 36294:return Gc;case 36295:return Kc;case 36296:return qc;case 35678:case 36198:case 36298:case 36306:case 35682:return Jc;case 35679:case 36299:case 36307:return Yc;case 35680:case 36300:case 36308:case 36293:return Xc;case 36289:case 36303:case 36311:case 36292:return Zc}}function $c(e,t){e.uniform1fv(this.addr,t)}function el(e,t){let n=kc(t,this.size,2);e.uniform2fv(this.addr,n)}function tl(e,t){let n=kc(t,this.size,3);e.uniform3fv(this.addr,n)}function nl(e,t){let n=kc(t,this.size,4);e.uniform4fv(this.addr,n)}function rl(e,t){let n=kc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function il(e,t){let n=kc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function al(e,t){let n=kc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ol(e,t){e.uniform1iv(this.addr,t)}function sl(e,t){e.uniform2iv(this.addr,t)}function cl(e,t){e.uniform3iv(this.addr,t)}function ll(e,t){e.uniform4iv(this.addr,t)}function ul(e,t){e.uniform1uiv(this.addr,t)}function dl(e,t){e.uniform2uiv(this.addr,t)}function fl(e,t){e.uniform3uiv(this.addr,t)}function pl(e,t){e.uniform4uiv(this.addr,t)}function ml(e,t,n){let r=this.cache,i=t.length,a=Mc(n,i);Ac(r,a)||(e.uniform1iv(this.addr,a),jc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?bc:yc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function hl(e,t,n){let r=this.cache,i=t.length,a=Mc(n,i);Ac(r,a)||(e.uniform1iv(this.addr,a),jc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Sc,a[e])}function gl(e,t,n){let r=this.cache,i=t.length,a=Mc(n,i);Ac(r,a)||(e.uniform1iv(this.addr,a),jc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Cc,a[e])}function _l(e,t,n){let r=this.cache,i=t.length,a=Mc(n,i);Ac(r,a)||(e.uniform1iv(this.addr,a),jc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||xc,a[e])}function vl(e){switch(e){case 5126:return $c;case 35664:return el;case 35665:return tl;case 35666:return nl;case 35674:return rl;case 35675:return il;case 35676:return al;case 5124:case 35670:return ol;case 35667:case 35671:return sl;case 35668:case 35672:return cl;case 35669:case 35673:return ll;case 5125:return ul;case 36294:return dl;case 36295:return fl;case 36296:return pl;case 35678:case 36198:case 36298:case 36306:case 35682:return ml;case 35679:case 36299:case 36307:return hl;case 35680:case 36300:case 36308:case 36293:return gl;case 36289:case 36303:case 36311:case 36292:return _l}}var yl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qc(t.type)}},bl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vl(t.type)}},xl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Sl=/(\w+)(\])?(\[|\.)?/g;function Cl(e,t){e.seq.push(t),e.map[t.id]=t}function wl(e,t,n){let r=e.name,i=r.length;for(Sl.lastIndex=0;;){let a=Sl.exec(r),o=Sl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Cl(n,l===void 0?new yl(s,e,t):new bl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new xl(s),Cl(n,e)),n=e}}}var Tl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);wl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function El(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Dl=37297,Ol=0;function kl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Al=new zt;function jl(e){Wt._getMatrix(Al,Wt.workingColorSpace,e);let t=`mat3( ${Al.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(e)){case Ke:return[t,`LinearTransferOETF`];case qe:return[t,`sRGBTransferOETF`];default:return L(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ml(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+kl(e.getShaderSource(t),r)}return i}function Nl(e,t){let n=jl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Pl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Fl(e,t){let n=Pl[t];return n===void 0?(L(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Il=new B;function Ll(){return Wt.getLuminanceCoefficients(Il),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Il.x.toFixed(4)}, ${Il.y.toFixed(4)}, ${Il.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Rl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Vl).join(`
`)}function zl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Bl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Vl(e){return e!==``}function Hl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ul(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Wl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gl(e){return e.replace(Wl,ql)}var Kl=new Map;function ql(e,t){let n=Ns[t];if(n===void 0){let e=Kl.get(t);if(e!==void 0)n=Ns[e],L(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Gl(n)}var Jl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(e){return e.replace(Jl,Xl)}function Xl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Zl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ql={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function $l(e){return Ql[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var eu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function tu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:eu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var nu={302:`ENVMAP_MODE_REFRACTION`};function ru(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:nu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var iu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function au(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:iu[e.combine]||`ENVMAP_BLENDING_NONE`}function ou(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function su(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=$l(n),l=tu(n),u=ru(n),d=au(n),f=ou(n),p=Rl(n),m=zl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Vl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Vl).join(`
`),_.length>0&&(_+=`
`)):(g=[Zl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Vl).join(`
`),_=[Zl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Ns.tonemapping_pars_fragment,n.toneMapping===0?``:Fl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Ns.colorspace_pars_fragment,Nl(`linearToOutputTexel`,n.outputColorSpace),Ll(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Vl).join(`
`)),o=Gl(o),o=Hl(o,n),o=Ul(o,n),s=Gl(s),s=Hl(s,n),s=Ul(s,n),o=Yl(o),s=Yl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=El(i,i.VERTEX_SHADER,y),S=El(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Ml(i,x,`vertex`),n=Ml(i,S,`fragment`);R(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):L(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Tl(i,h),T=Bl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Dl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ol++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var cu=0,lu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new uu(e),t.set(e,n)),n}},uu=class{constructor(e){this.id=cu++,this.code=e,this.usedTimes=0}};function du(e){return e===1030||e===37490||e===36285}function fu(e,t,n,r,i,a){let o=new vn,s=new lu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&L(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ps[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,ne=!!i.map,re=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,N=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=fe&&!!i.anisotropyMap,ye=pe&&!!i.clearcoatMap,be=pe&&!!i.clearcoatNormalMap,xe=pe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=_e&&!!i.transmissionMap,Ae=_e&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,Pe=!!i.alphaHash,P=!!i.extensions,Fe=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Wt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:re,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&du(i.normalMap.format),metalnessMap:N,roughnessMap:de,anisotropy:fe,anisotropyMap:ve,clearcoat:pe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:Pe,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:N&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ne||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&Wt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:P&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(P&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ps[t];n=xo.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new su(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function pu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function mu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function hu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function gu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||mu),r.length>1&&r.sort(t||hu),i.length>1&&i.sort(t||hu),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function _u(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new gu,e.set(t,[i])):n>=r.length?(i=new gu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function vu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new B,color:new V};break;case`SpotLight`:n={position:new B,direction:new B,color:new V,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new B,color:new V,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new B,skyColor:new V,groundColor:new V};break;case`RectAreaLight`:n={color:new V,position:new B,halfWidth:new B,halfHeight:new B}}return e[t.id]=n,n}}}function yu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var bu=0;function xu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Su(e){let t=new vu,n=yu(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new B);let i=new B,a=new sn,o=new sn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(xu);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=K.LTC_FLOAT_1,r.rectAreaLTC2=K.LTC_FLOAT_2):(r.rectAreaLTC1=K.LTC_HALF_1,r.rectAreaLTC2=K.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=bu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Cu(e){let t=new Su(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function wu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Cu(e),t.set(n,[a])):r>=i.length?(a=new Cu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Tu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Eu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Du=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Ou=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],ku=new sn,Au=new B,ju=new B;function Mu(e,t,n){let r=new Ei,i=new z,a=new z,o=new tn,s=new Oo,l=new ko,u={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new wo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new z},radius:{value:4}},vertexShader:Tu,fragmentShader:Eu}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let g=new Rr;g.setAttribute(`position`,new Cr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new H(g,m),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(L(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let l=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let l=0,u=t.length;l<u;l++){let u=t[l],p=u.shadow;if(p===void 0){L(`WebGLShadowMap:`,u,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;i.copy(p.mapSize);let g=p.getFrameExtents();i.multiply(g),a.copy(p.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(a.x=Math.floor(f/g.x),i.x=a.x*g.x,p.mapSize.x=a.x),i.y>f&&(a.y=Math.floor(f/g.y),i.y=a.y*g.y,p.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=_,p.map===null||h===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(u.isPointLight){L(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new rn(i.x,i.y,{format:M,type:x,minFilter:d,magFilter:d,generateMipmaps:!1}),p.map.texture.name=u.name+`.shadowMap`,p.map.depthTexture=new Ii(i.x,i.y,b),p.map.depthTexture.name=u.name+`.shadowMapDepth`,p.map.depthTexture.format=A,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=c,p.map.depthTexture.magFilter=c}else u.isPointLight?(p.map=new lc(i.x),p.map.depthTexture=new Li(i.x,y)):(p.map=new rn(i.x,i.y),p.map.depthTexture=new Ii(i.x,i.y,y)),p.map.depthTexture.name=u.name+`.shadowMap`,p.map.depthTexture.format=A,this.type===1?(p.map.depthTexture.compareFunction=_?518:515,p.map.depthTexture.minFilter=d,p.map.depthTexture.magFilter=d):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=c,p.map.depthTexture.magFilter=c);p.camera.updateProjectionMatrix()}let v=p.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<v;t++){if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),m.viewport(o)}if(u.isPointLight){let e=p.camera,n=p.matrix,r=u.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Au.setFromMatrixPosition(u.matrixWorld),e.position.copy(Au),ju.copy(e.position),ju.add(Du[t]),e.up.copy(Ou[t]),e.lookAt(ju),e.updateMatrixWorld(),n.makeTranslation(-Au.x,-Au.y,-Au.z),ku.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(ku,e.coordinateSystem,e.reversedDepth)}else p.updateMatrices(u);r=p.getFrustum(),T(n,s,p.camera,u,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,s),p.needsUpdate=!1}S=this.type,v.needsUpdate=!1,e.setRenderTarget(l,u,p)};function C(n,r){let a=t.update(_);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new rn(i.x,i.y,{format:M,type:x})),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,_,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value=n.mapSize,h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,_,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Nu(e,t){function n(){let t=!1,n=new tn,r=null,i=new tn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?N(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=st[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?N(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new V(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,M=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),j=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(ne)[1]),j=M>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new tn().fromArray(ae),ce=new tn().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),N(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),N(e.CULL_FACE),_e(0);function N(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(N(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:R(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:R(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:R(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:R(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):N(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?N(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(N(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(j&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(N(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?N(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+te-1),re!==t&&(e.activeTexture(t),re=t)}function Te(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+te-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function I(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function ze(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Be(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new V(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:N,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:I,uniformBlockBinding:ze,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:Be}}function Pu(e,t,n,r,i,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new z,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):et(`canvas`)}function T(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),L(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&L(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];L(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||L(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ke:Wt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,L(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function te(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),ne(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),ie(t)}function ne(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&re(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function re(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],h.memory.textures--}function ie(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),r.remove(i[t])}r.remove(t)}let ae=0;function oe(){ae=0}function se(){return ae}function ce(e){ae=e}function le(){let e=ae;return e>=i.maxTextures&&L(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),ae+=1,e}function ue(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&P(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)L(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)L(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function pe(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){Se(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let me={[a]:e.REPEAT,[o]:e.CLAMP_TO_EDGE,[s]:e.MIRRORED_REPEAT},he={[c]:e.NEAREST,[l]:e.NEAREST_MIPMAP_NEAREST,[u]:e.NEAREST_MIPMAP_LINEAR,[d]:e.LINEAR,[f]:e.LINEAR_MIPMAP_NEAREST,[p]:e.LINEAR_MIPMAP_LINEAR},ge={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function _e(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&L(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,me[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,me[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,me[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,he[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,he[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ge[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,j));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=ue(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&re(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ye(n.start,r.width,4),c=ye(t.start,r.width,4);n.start<=i+1&&a===c&&ye(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function xe(t,a,o){let s=e.TEXTURE_2D;(a.isDataArrayTexture||a.isCompressedArrayTexture)&&(s=e.TEXTURE_2D_ARRAY),a.isData3DTexture&&(s=e.TEXTURE_3D);let c=ve(t,a),l=a.source;n.bindTexture(s,t.__webglTexture,e.TEXTURE0+o);let u=r.get(l);if(l.version!==u.__version||c===!0){if(n.activeTexture(e.TEXTURE0+o),!(typeof ImageBitmap<`u`&&a.image instanceof ImageBitmap)){let t=Wt.getPrimaries(Wt.workingColorSpace),r=a.colorSpace===``?null:Wt.getPrimaries(a.colorSpace),i=a.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment);let t=T(a.image,!1,i.maxTextureSize);t=Fe(a,t);let r=m.convert(a.format,a.colorSpace),d=m.convert(a.type),f=k(a.internalFormat,r,d,a.normalized,a.colorSpace,a.isVideoTexture);_e(s,a);let p,h=a.mipmaps,g=a.isVideoTexture!==!0,_=u.__version===void 0||c===!0,v=l.dataReady,y=te(a,t);if(a.isDepthTexture)f=A(a.format===ee,a.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,f,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,f,t.width,t.height,0,r,d,null));else if(a.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,f,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)p=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,p.width,p.height,r,d,p.data):n.texImage2D(e.TEXTURE_2D,t,f,p.width,p.height,0,r,d,p.data);a.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,f,t.width,t.height),v&&be(a,t,r,d)):n.texImage2D(e.TEXTURE_2D,0,f,t.width,t.height,0,r,d,t.data)}else if(a.isCompressedTexture){if(a.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,f,h[0].width,h[0].height,t.depth);for(let i=0,o=h.length;i<o;i++)if(p=h[i],a.format!==1023){if(r!==null){if(g){if(v){if(a.layerUpdates.size>0){let t=ks(p.width,p.height,a.format,a.type);for(let o of a.layerUpdates){let a=p.data.subarray(o*t/p.data.BYTES_PER_ELEMENT,(o+1)*t/p.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,o,p.width,p.height,1,r,a)}a.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,p.width,p.height,t.depth,r,p.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,f,p.width,p.height,t.depth,0,p.data,0,0)}else L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,p.width,p.height,t.depth,r,d,p.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,f,p.width,p.height,t.depth,0,r,d,p.data)}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,f,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)p=h[t],a.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,p.width,p.height,r,d,p.data):n.texImage2D(e.TEXTURE_2D,t,f,p.width,p.height,0,r,d,p.data):r===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,p.width,p.height,r,p.data):n.compressedTexImage2D(e.TEXTURE_2D,t,f,p.width,p.height,0,p.data)}}else if(a.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,f,t.width,t.height,t.depth),v){if(a.layerUpdates.size>0){let i=ks(t.width,t.height,a.format,a.type);for(let o of a.layerUpdates){let a=t.data.subarray(o*i/t.data.BYTES_PER_ELEMENT,(o+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,o,t.width,t.height,1,r,d,a)}a.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,d,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,f,t.width,t.height,t.depth,0,r,d,t.data)}else if(a.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,f,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,d,t.data)):n.texImage3D(e.TEXTURE_3D,0,f,t.width,t.height,t.depth,0,r,d,t.data);else if(a.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,f,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,f,i,a,0,r,d,null),i>>=1,a>>=1}}}else if(a.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(a),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Ie(h[0]);n.texStorage2D(e.TEXTURE_2D,y,f,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)p=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,d,p):n.texImage2D(e.TEXTURE_2D,t,f,r,d,p);a.generateMipmaps=!1}else if(g){if(_){let r=Ie(t);n.texStorage2D(e.TEXTURE_2D,y,f,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,d,t)}else n.texImage2D(e.TEXTURE_2D,0,f,r,d,t);E(a)&&D(s),u.__version=l.version,a.onUpdate&&a.onUpdate(a)}t.__version=a.version}function Se(t,a,o){if(a.image.length!==6)return;let s=ve(t,a),c=a.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+o);let l=r.get(c);if(c.version!==l.__version||s===!0){n.activeTexture(e.TEXTURE0+o);let t=Wt.getPrimaries(Wt.workingColorSpace),r=a.colorSpace===``?null:Wt.getPrimaries(a.colorSpace),u=a.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,u);let d=a.isCompressedTexture||a.image[0].isCompressedTexture,f=a.image[0]&&a.image[0].isDataTexture,p=[];for(let e=0;e<6;e++)!d&&!f?p[e]=T(a.image[e],!0,i.maxCubemapSize):p[e]=f?a.image[e].image:a.image[e],p[e]=Fe(a,p[e]);let h=p[0],g=m.convert(a.format,a.colorSpace),_=m.convert(a.type),v=k(a.internalFormat,g,_,a.normalized,a.colorSpace),y=a.isVideoTexture!==!0,b=l.__version===void 0||s===!0,x=c.dataReady,S=te(a,h);_e(e.TEXTURE_CUBE_MAP,a);let C;if(d){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=p[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];a.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=a.mipmaps,y&&b){C.length>0&&S++;let t=Ie(p[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(f){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,p[t].width,p[t].height,g,_,p[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,p[t].width,p[t].height,0,g,_,p[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,p[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,p[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(a)&&D(e.TEXTURE_CUBE_MAP),l.__version=c.version,a.onUpdate&&a.onUpdate(a)}t.__version=a.version}function Ce(t,i,a,o,s,c){let l=m.convert(a.format,a.colorSpace),u=m.convert(a.type),d=k(a.internalFormat,l,u,a.normalized,a.colorSpace),f=r.get(i),p=r.get(a);if(p.__renderTarget=i,!f.__hasExternalTextures){let t=Math.max(1,i.width>>c),r=Math.max(1,i.height>>c);s===e.TEXTURE_3D||s===e.TEXTURE_2D_ARRAY?n.texImage3D(s,c,d,t,r,i.depth,0,l,u,null):n.texImage2D(s,c,d,t,r,0,l,u,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Pe(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,o,s,p.__webglTexture,0,Ne(i)):(s===e.TEXTURE_2D||s>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&s<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,o,s,p.__webglTexture,c),n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);Pe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Te(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let s=r.get(i.depthTexture);if(s.__renderTarget=i,(!s.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),o){if(s.__webglInit===void 0&&(s.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,j)),s.__webglTexture===void 0){s.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,s.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=m.convert(i.depthTexture.format),r=m.convert(i.depthTexture.type),a;i.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,a,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let c=s.__webglTexture,l=Ne(i),u=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,d=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Pe(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,d,u,c,0,l):e.framebufferTexture2D(e.FRAMEBUFFER,d,u,c,0);else if(i.depthTexture.format===1027)Pe(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,d,u,c,0,l):e.framebufferTexture2D(e.FRAMEBUFFER,d,u,c,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Te(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Te(i.__webglFramebuffer[0],t,0):Te(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),we(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),we(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,i){let a=r.get(t);n!==void 0&&Ce(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ee(t)}function Oe(t){let i=t.texture,a=r.get(t),o=r.get(i);t.addEventListener(`dispose`,M);let s=t.textures,c=t.isWebGLCubeRenderTarget===!0,l=s.length>1;if(l||(o.__webglTexture===void 0&&(o.__webglTexture=e.createTexture()),o.__version=i.version,h.memory.textures++),c){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(l)for(let t=0,n=s.length;t<n;t++){let n=r.get(s[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Pe(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<s.length;n++){let r=s[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=m.convert(r.format,r.colorSpace),o=m.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),l=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),we(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(c){n.bindTexture(e.TEXTURE_CUBE_MAP,o.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ce(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ce(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(l){for(let i=0,o=s.length;i<o;i++){let o=s[i],c=r.get(o),l=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(l=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(l,c.__webglTexture),_e(l,o),Ce(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,l,0),E(o)&&D(l)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,o.__webglTexture),_e(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ce(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ce(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&Ee(t)}function ke(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let Ae=[],je=[];function Me(t){if(t.samples>0){if(Pe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=r.get(t),u=i.length>1;if(u)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,l.__webglMultisampledFramebuffer);let d=t.texture.mipmaps;d&&d.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),u){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),_===!0&&(Ae.length=0,je.length=0,Ae.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Ae.push(c),je.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,l.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function Pe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function P(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Wt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&L(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):R(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=le,this.resetTextureUnits=oe,this.getTextureUnits=se,this.setTextureUnits=ce,this.setTexture2D=N,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Fu(e,t){function n(n,r=``){let i,a=Wt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Iu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ru=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ri(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new wo({vertexShader:Iu,fragmentShader:Lu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new H(new co(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},zu=class extends ct{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,h=typeof XRWebGLBinding<`u`,g=new Ru,_={},v=t.getContextAttributes(),b=null,x=null,S=[],C=[],T=new z,E=null,D=new rs;D.viewport=new tn;let O=new rs;O.viewport=new tn;let te=[D,O],j=new ms,M=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=S[e];return t===void 0&&(t=new Ln,S[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=S[e];return t===void 0&&(t=new Ln,S[e]=t),t.getGripSpace()},this.getHand=function(e){let t=S[e];return t===void 0&&(t=new Ln,S[e]=t),t.getHandSpace()};function re(e){let t=C.indexOf(e.inputSource);if(t===-1)return;let n=S[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ie(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,ie),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<S.length;e++){let t=C[e];t!==null&&(C[e]=null,S[e].disconnect(t))}M=null,ne=null,g.reset();for(let e in _)delete _[e];e.setRenderTarget(b),f=null,d=null,u=null,r=null,x=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,ie),r.addEventListener(`inputsourceschange`,ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;v.depth&&(o=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=v.stencil?ee:A,a=v.stencil?w:y);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new rn(d.textureWidth,d.textureHeight,{format:k,type:m,depthTexture:new Ii(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new rn(f.framebufferWidth,f.framebufferHeight,{format:k,type:m,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=C.indexOf(n);r>=0&&(C[r]=null,S[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=C.indexOf(n);if(r===-1){for(let e=0;e<S.length;e++)if(e>=C.length){C.push(n),r=e;break}else if(C[e]===null){C[e]=n,r=e;break}if(r===-1)break}let i=S[r];i&&i.connect(n)}}let oe=new B,se=new B;function ce(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),j.near=O.near=D.near=t,j.far=O.far=D.far=n,(M!==j.near||ne!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,ne=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,O.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;le(j,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?ce(j,D,O):j.projectionMatrix.copy(D.projectionMatrix),ue(e,j,i)};function ue(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ft*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(j)},this.getCameraTexture=function(e){return _[e]};let N=null;function de(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=te[n];o===void 0&&(o=new rs,o.layers.enable(n),o.viewport=new tn,te[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=_[n];e||(e=new Ri,_[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<S.length;e++){let t=C[e],n=S[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}N&&N(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let fe=new js;fe.setAnimationLoop(de),this.setAnimationLoop=function(e){N=e},this.dispose=function(){}}},Bu=new sn,Vu=new zt;Vu.set(-1,0,0,0,1,0,0,0,1);function Hu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,bo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Bu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Vu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Uu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return R(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?L(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):L(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Wu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gu=null;function Ku(){return Gu===null&&(Gu=new li(Wu,16,16,M,x),Gu.name=`DFG_LUT`,Gu.minFilter=d,Gu.magFilter=d,Gu.wrapS=o,Gu.wrapT=o,Gu.generateMipmaps=!1,Gu.needsUpdate=!0),Gu}var qu=class{constructor(e={}){let{canvas:t=tt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=m}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);h=n.getContextAttributes().alpha}else h=a;let g=f,v=new Set([re,ne,j]),b=new Set([m,y,_,w,S,C]),T=new Uint32Array(4),E=new Int32Array(4),D=new B,O=null,k=null,A=[],ee=[],te=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,ie=!1,ae=null,oe=null,se=null,ce=null;this._outputColorSpace=We;let le=0,ue=0,N=null,de=-1,fe=null,pe=new tn,me=new tn,he=null,ge=new V(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new tn(0,0,ve,ye),we=new tn(0,0,ve,ye),Te=!1,Ee=new Ei,De=!1,Oe=!1,ke=new sn,Ae=new B,je=new tn,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return N===null?be:1}let P=n;function Fe(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,ut,!1),t.addEventListener(`webglcontextrestored`,dt,!1),t.addEventListener(`webglcontextcreationerror`,ft,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw R(`WebGLRenderer: `+e.message),e}let Ie,Le,F,Re,I,ze,Be,Ve,He,Ue,Ge,Ke,qe,Je,Ye,Xe,Qe,$e,et,nt,it,at,st;function ct(){Ie=new dc(P),Ie.init(),it=new Fu(P,Ie),Le=new Vs(P,Ie,e,it),F=new Nu(P,Ie),Le.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),oe=P.createFramebuffer(),se=P.createFramebuffer(),ce=P.createFramebuffer(),Re=new mc(P),I=new pu,ze=new Pu(P,Ie,F,I,Le,it,Re),Be=new uc(M),Ve=new Ms(P),at=new zs(P,Ve),He=new fc(P,Ve,Re,at),Ue=new gc(P,He,Ve,at,Re),$e=new hc(P,Le,ze),Ye=new Hs(I),Ge=new fu(M,Be,Ie,Le,at,Ye),Ke=new Hu(M,I),qe=new _u,Je=new wu(Ie),Qe=new Rs(M,Be,F,Ue,h,s),Xe=new Mu(M,Ue,Le),st=new Uu(P,Re,Le,F),et=new Bs(P,Ie,Re),nt=new pc(P,Ie,Re),Re.programs=Ge.programs,M.capabilities=Le,M.extensions=Ie,M.properties=I,M.renderLists=qe,M.shadowMap=Xe,M.state=F,M.info=Re}ct(),g!==1009&&(te=new vc(g,t.width,t.height,o,r,i));let lt=new zu(M,P);this.xr=lt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){if(lt.isPresenting){L(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),te!==null&&te.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(g===1009){R(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){L(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}te.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(pe)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(pe.copy(Ce).multiplyScalar(be).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(me.copy(we).multiplyScalar(be).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=v.has(t)}if(e){let e=N.texture.type,t=b.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,P.clearBufferuiv(P.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,P.clearBufferiv(P.COLOR,0,E))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ae=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),Qe.dispose(),qe.dispose(),Je.dispose(),I.dispose(),Be.dispose(),Ue.dispose(),at.dispose(),st.dispose(),Ge.dispose(),lt.dispose(),lt.removeEventListener(`sessionstart`,yt),lt.removeEventListener(`sessionend`,bt),xt.stop()};function ut(e){e.preventDefault(),rt(`WebGLRenderer: Context Lost.`),ie=!0}function dt(){rt(`WebGLRenderer: Context Restored.`),ie=!1;let e=Re.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;ct(),Re.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function ft(e){R(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function pt(e){let t=e.target;t.removeEventListener(`dispose`,pt),mt(t)}function mt(e){ht(e),I.remove(e)}function ht(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Ge.releaseProgram(e)}),e.isShaderMaterial&&Ge.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=jt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=He.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;at.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=Ve.get(c),g=nt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ve.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function gt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Dt(e,t,n),e.side=0,e.needsUpdate=!0,Dt(e,t,n),e.side=2):Dt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),k=Je.get(n),k.init(t),ee.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];gt(a,n,e),r.add(a)}else gt(t,n,e),r.add(t)}}),k=ee.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){I.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let _t=null;function vt(e){_t&&_t(e)}function yt(){xt.stop()}function bt(){xt.start()}let xt=new js;xt.setAnimationLoop(vt),typeof self<`u`&&xt.setContext(self),this.setAnimationLoop=function(e){_t=e,lt.setAnimationLoop(e),e===null?xt.stop():xt.start()},lt.addEventListener(`sessionstart`,yt),lt.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){R(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ie===!0)return;ae!==null&&ae.renderStart(e,t);let n=lt.enabled===!0&&lt.isPresenting===!0,r=te!==null&&(N===null||n)&&te.begin(M,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(te===null||te.isCompositing()===!1)&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(t),t=lt.getCamera()),e.isScene===!0&&e.onBeforeRender(M,e,t,N),k=Je.get(e,ee.length),k.init(t),k.state.textureUnits=ze.getTextureUnits(),ee.push(k),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,Ze,t.reversedDepth),Oe=this.localClippingEnabled,De=Ye.init(this.clippingPlanes,Oe),O=qe.get(e,A.length),O.init(),A.push(O),lt.enabled===!0&&lt.isPresenting===!0){let e=M.xr.getDepthSensingMesh();e!==null&&St(e,t,-1/0,M.sortObjects)}St(e,t,0,M.sortObjects),O.finish(),M.sortObjects===!0&&O.sort(xe,Se,t.reversedDepth),Ne=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,Ne&&Qe.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&Ye.beginShadows();let i=k.state.shadowsArray;if(Xe.render(i,e,t),De===!0&&Ye.endShadows(),(r&&te.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];wt(n,r,e,a)}Ne&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Ct(O,e,n,n.viewport)}}else r.length>0&&wt(n,r,e,t),Ne&&Qe.render(e),Ct(O,e,t)}N!==null&&ue===0&&(ze.updateMultisampleRenderTarget(N),ze.updateRenderTargetMipmap(N)),r&&te.end(M),e.isScene===!0&&e.onAfterRender(M,e,t),at.resetDefaultState(),de=-1,fe=null,ee.pop(),ee.length>0?(k=ee[ee.length-1],ze.setTextureUnits(k.state.textureUnits),De===!0&&Ye.setGlobalState(M.clippingPlanes,k.state.camera)):k=null,A.pop(),O=A.length>0?A[A.length-1]:null,ae!==null&&ae.renderEnd()};function St(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||Ee.intersectsSprite(e)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let t=Ue.update(e),i=e.material;i.visible&&O.push(e,t,i,n,je.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||Ee.intersectsObject(e))){let t=Ue.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),je.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&O.push(e,t,s,n,je.z,o)}}else i.visible&&O.push(e,t,i,n,je.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)St(i[e],t,n,r)}function Ct(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),De===!0&&Ye.setGlobalState(M.clippingPlanes,n),r&&F.viewport(pe.copy(r)),i.length>0&&Tt(i,t,n),a.length>0&&Tt(a,t,n),o.length>0&&Tt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function wt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new rn(1,1,{generateMipmaps:!0,type:e?x:m,minFilter:p,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||pe;a.setSize(o.z*M.transmissionResolutionScale,o.w*M.transmissionResolutionScale);let s=M.getRenderTarget(),c=M.getActiveCubeFace(),l=M.getActiveMipmapLevel();M.setRenderTarget(a),M.getClearColor(ge),_e=M.getClearAlpha(),_e<1&&M.setClearColor(16777215,.5),M.clear(),Ne&&Qe.render(n);let u=M.toneMapping;M.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),De===!0&&Ye.setGlobalState(M.clippingPlanes,r),Tt(e,n,r),ze.updateMultisampleRenderTarget(a),ze.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Et(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(ze.updateMultisampleRenderTarget(a),ze.updateRenderTargetMipmap(a))}M.setRenderTarget(s,c,l),M.setClearColor(ge,_e),d!==void 0&&(r.viewport=d),M.toneMapping=u}function Tt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Et(o,t,n,s,l,c)}}function Et(e,t,n,r,i,a){e.onBeforeRender(M,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(M,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=2):M.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(M,t,n,r,i,a)}function Dt(e,t,n){t.isScene!==!0&&(t=Me);let r=I.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ge.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ge.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Be.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,pt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return kt(e,s),d}else s.uniforms=Ge.getUniforms(e),ae!==null&&e.isNodeMaterial&&ae.build(e,n,s),e.onBeforeCompile(s,M),d=Ge.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),kt(e,s),r.needsLights=Nt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Tl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function kt(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function At(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function jt(e,t,n,r,i){t.isScene!==!0&&(t=Me),ze.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Wt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Be.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=M.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=k.state.lights;if(De===!0&&(Oe===!0||e!==fe)){let t=e===fe&&r.id===de;Ye.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Dt(r,t,i),ae&&r.isNodeMaterial&&ae.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(F.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==de&&(de=r.id,C=!0),v.needsLights){let e=At(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||fe!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(P,`projectionMatrix`,e.projectionMatrix),T.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&T.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&T.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,ze),y.state.spotShadowMap.length>0&&T.setValue(P,`spotShadowMap`,y.state.spotShadowMap,ze),y.state.pointShadowMap.length>0&&T.setValue(P,`pointShadowMap`,y.state.pointShadowMap,ze)),i.isSkinnedMesh){T.setOptional(P,i,`bindMatrix`),T.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(P,`boneTexture`,e.boneTexture,ze))}i.isBatchedMesh&&(T.setOptional(P,i,`batchingTexture`),T.setValue(P,`batchingTexture`,i._matricesTexture,ze),T.setOptional(P,i,`batchingIdTexture`),T.setValue(P,`batchingIdTexture`,i._indirectTexture,ze),T.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(P,`batchingColorTexture`,i._colorsTexture,ze));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&$e.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Ku()),C){if(T.setValue(P,`toneMappingExposure`,M.toneMappingExposure),v.needsLights&&Mt(E,w),a&&r.fog===!0&&Ke.refreshFogUniforms(E,a),Ke.refreshMaterialUniforms(E,r,be,ye,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}Tl.upload(P,Ot(v),E,ze)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Tl.upload(P,Ot(v),E,ze),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(P,`center`,i.center),T.setValue(P,`modelViewMatrix`,i.modelViewMatrix),T.setValue(P,`normalMatrix`,i.normalMatrix),T.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];st.update(n,x),st.bind(n,x)}}return x}function Mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Nt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return le},this.getActiveMipmapLevel=function(){return ue},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,le=t,ue=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,F.viewport(pe),F.scissor(me),F.setScissorTest(he),de=-1;return}if(o.__webglFramebuffer===void 0)ze.setupRenderTarget(e);else if(o.__hasExternalTextures)ze.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);ze.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&ze.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else pe.copy(Ce).multiplyScalar(be).floor(),me.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=oe),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(pe),F.scissor(me),F.setScissorTest(he),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}de=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Le.textureFormatReadable(c)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Le.textureTypeReadable(l)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,it.convert(c),it.convert(l),a)}finally{let e=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Le.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Le.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,it.convert(l),it.convert(u),0);let f=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,f);let p=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await ot(P,p,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.deleteBuffer(d),P.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ze.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=it.convert(t.format),_=it.convert(t.type),v;t.isData3DTexture?(ze.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ze.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(ze.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,se),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,ce);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&ze.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ze.setTextureCube(e,0):e.isData3DTexture?ze.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ze.setTexture2DArray(e,0):ze.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){le=0,ue=0,N=null,F.reset(),at.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ze}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Wt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Wt._getUnpackColorSpace()}};function Ju(){return{throttle:0,brake:0,steer:0,drift:!1,useItem:!1,useItemHeld:!1,lookBack:!1,pause:!1,confirm:!1,back:!1,menuUp:!1,menuDown:!1,menuLeft:!1,menuRight:!1}}var Yu=[`banana`,`triple_banana`,`green_shell`,`triple_green_shell`,`red_shell`,`triple_red_shell`,`blue_shell`,`mushroom`,`triple_mushroom`,`golden_mushroom`,`star`,`lightning`,`bob_omb`],q=new class{handlers=new Map;on(e,t){let n=this.handlers.get(e);return n||(n=new Set,this.handlers.set(e,n)),n.add(t),()=>this.off(e,t)}once(e,t){let n=this.on(e,e=>{n(),t(e)});return n}off(e,t){this.handlers.get(e)?.delete(t)}emit(e,t){let n=this.handlers.get(e);if(n)for(let r of Array.from(n))try{r(t)}catch(t){console.error(`[events] handler for ${e} threw`,t)}}clear(){this.handlers.clear()}},J=Math.PI*2;function Xu(e,t,n){return e<t?t:e>n?n:e}function Y(e){return e<0?0:e>1?1:e}function Zu(e,t,n){return e+(t-e)*n}function Qu(e,t,n){let r=Y((n-e)/(t-e));return r*r*(3-2*r)}function $u(e,t,n,r){return Zu(e,t,1-Math.exp(-n*r))}function ed(e){return e%=J,e>Math.PI&&(e-=J),e<-Math.PI&&(e+=J),e}function td(e,t){return ed(t-e)}function nd(e){return e%=1,e<0?e+1:e}function rd(e,t){let n=nd(t)-nd(e);return n>.5&&--n,n<-.5&&(n+=1),n}function id(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ad(e,t){let n=Math.imul(Math.floor(e)|0,374761393)+Math.imul(Math.floor(t)|0,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function od(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=ad(n,r),l=ad(n+1,r),u=ad(n,r+1),d=ad(n+1,r+1);return Zu(Zu(c,l,o),Zu(u,d,o),s)}function sd(e,t,n=4,r=2,i=.5){let a=.5,o=1,s=0,c=0;for(let l=0;l<n;l++)s+=od(e*o,t*o)*a,c+=a,a*=i,o*=r;return s/c}function cd(e){(!isFinite(e)||e<0)&&(e=0);let t=Math.floor(e/60),n=Math.floor(e%60),r=Math.floor(e*1e3%1e3);return`${t}:${n.toString().padStart(2,`0`)}.${r.toString().padStart(3,`0`)}`}function ld(e){let t=[`th`,`st`,`nd`,`rd`],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}var ud=new B;function dd(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;ud.copy(t),ud[r]=0,ud.normalize();let l=.5*o/(o+s),u=1-ud.angleTo(e)/c;return Math.sign(ud[n])===1?u*l:s/(o+s)+l+l*(1-u)}var fd=class e extends U{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new B,c=new B,l=new B(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new B,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=dd(m,c,`z`,`y`,i,n),f[a+1]=1-dd(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-dd(m,c,`z`,`y`,i,n),f[a+1]=1-dd(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-dd(m,c,`x`,`z`,i,e),f[a+1]=dd(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-dd(m,c,`x`,`z`,i,e),f[a+1]=1-dd(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-dd(m,c,`x`,`y`,i,e),f[a+1]=1-dd(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=dd(m,c,`x`,`y`,i,e),f[a+1]=1-dd(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}};function pd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Rr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=md(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=md(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function md(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Cr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function hd(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${~~(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}var gd=[{id:`zippy`,name:`Zippy Nova`,color:2086638,accent:16727988,driverColor:16251391,weightClass:`light`,stats:{speed:.18,acceleration:.95,handling:.9,weight:.12,miniTurbo:.9},tagline:`Blink and she is already two corners ahead.`},{id:`pixel`,name:`Pixel Pop`,color:16732067,accent:5111747,driverColor:16773544,weightClass:`light`,stats:{speed:.12,acceleration:.9,handling:.95,weight:.08,miniTurbo:.85},tagline:`Sugar-rush handling. Corners are her candy.`},{id:`fennec`,name:`Fennec Flash`,color:16764703,accent:16738816,driverColor:2824978,weightClass:`light`,stats:{speed:.25,acceleration:.85,handling:.8,weight:.2,miniTurbo:.95},tagline:`Big ears, bigger mini-turbos.`},{id:`max`,name:`Max Vortex`,color:14885410,accent:16765503,driverColor:16777215,weightClass:`medium`,stats:{speed:.55,acceleration:.55,handling:.55,weight:.5,miniTurbo:.55},tagline:`The all-rounder. Every lap is a highlight reel.`},{id:`juno`,name:`Juno Bolt`,color:8141549,accent:16756768,driverColor:1446694,weightClass:`medium`,stats:{speed:.6,acceleration:.45,handling:.5,weight:.55,miniTurbo:.65},tagline:`Charges every drift like a thunderstorm.`},{id:`kai`,name:`Kai Tidewater`,color:1993727,accent:16742938,driverColor:14677759,weightClass:`medium`,stats:{speed:.5,acceleration:.6,handling:.65,weight:.45,miniTurbo:.5},tagline:`Cool as the deep end, smooth as a swell.`},{id:`bram`,name:`Boulder Bram`,color:2071115,accent:14191164,driverColor:5913377,weightClass:`heavy`,stats:{speed:.92,acceleration:.2,handling:.25,weight:.95,miniTurbo:.3},tagline:`Slow to wake up. Impossible to shove.`},{id:`rosa`,name:`Big Rig Rosa`,color:16738816,accent:1692613,driverColor:2763316,weightClass:`heavy`,stats:{speed:1,acceleration:.15,handling:.3,weight:.9,miniTurbo:.35},tagline:`Eighteen wheels of attitude in a four-wheel kart.`}];function _d(e){for(let t=0;t<gd.length;t++)if(gd[t].id===e)return gd[t];return gd[0]}var vd=.2,yd=.22,bd=.18,xd=.22,Sd=.52,Cd=-.52,wd=.5,Td=.64,Ed=new sn,Dd=new B,Od=new It,kd=new _n,Ad=new B,jd=class{parts=[];add(e,t=0,n=0,r=0,i=0,a=0,o=0,s=1,c=1,l=1){let u=e.clone();if(!u.index){let e=hd(u);u.dispose(),u=e}return Ed.compose(Dd.set(t,n,r),Od.setFromEuler(kd.set(i,a,o)),Ad.set(s,c,l)),u.applyMatrix4(Ed),this.parts.push(u),this}build(){let e=pd(this.parts,!1);for(let e of this.parts)e.dispose();return this.parts.length=0,e}};function Md(e,t,n){let r=new H(e,t);return r.castShadow=!0,r.receiveShadow=!1,r.name=n,r}function Nd(e,t,n,r,i,a,o,s=8){let c=new B(r-e,i-t,a-n),l=c.length(),u=new zi(o,Math.max(.001,l),2,s),d=new It().setFromUnitVectors(new B(0,1,0),c.normalize());return u.applyQuaternion(d),u.translate((e+r)*.5,(t+i)*.5,(n+a)*.5),u}function Pd(e,t){let n=new V(t),r=e.attributes.position.count,i=new Float32Array(r*3);for(let e=0;e<r;e++)i[e*3]=n.r,i[e*3+1]=n.g,i[e*3+2]=n.b;return e.setAttribute(`color`,new Cr(i,3)),e}function Fd(e){let t=Qu(-.92,-.18,e),n=Qu(.25,.86,e);return Zu(.5,1,t)*Zu(1,.8,n)}function Id(){let e=new ba;e.moveTo(-.76,.17),e.lineTo(.74,.17),e.quadraticCurveTo(.86,.17,.86,.27),e.quadraticCurveTo(.86,.36,.72,.39),e.lineTo(.36,.46),e.quadraticCurveTo(.18,.5,.12,.44),e.lineTo(.06,.31),e.lineTo(-.4,.31),e.lineTo(-.48,.42),e.lineTo(-.7,.42),e.quadraticCurveTo(-.8,.42,-.8,.32);let t=new io(e,{depth:Td,bevelEnabled:!0,bevelThickness:.035,bevelSize:.03,bevelSegments:3,curveSegments:5});t.rotateY(Math.PI/2),t.translate(-.64/2,0,0),t.deleteAttribute(`normal`),t.deleteAttribute(`uv`);let n=hd(t,.001);t.dispose();let r=n.attributes.position;for(let e=0;e<r.count;e++){let t=r.getZ(e);r.setX(e,r.getX(e)*Fd(t))}return r.needsUpdate=!0,n.computeVertexNormals(),n.setAttribute(`uv`,new Cr(new Float32Array(r.count*2),2)),n}function Ld(e,t,n){let r=document.createElement(`canvas`);r.width=128,r.height=128;let i=r.getContext(`2d`);if(i){let r=`#`+t.toString(16).padStart(6,`0`),a=new V(n).multiplyScalar(.28);i.clearRect(0,0,128,128),i.fillStyle=`#f8f9fc`,i.beginPath(),i.roundRect(4,4,120,120,22),i.fill(),i.lineWidth=10,i.strokeStyle=r,i.stroke(),i.fillStyle=`#`+a.getHexString(),i.font=`bold 88px system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillText(String(e),64,70)}let a=new Fi(r);return a.colorSpace=We,a.anisotropy=4,a.needsUpdate=!0,a}function Rd(e,t){let n=t*.5,r=new jd,i=Pd(new mo(e-n,n,8,16),1381658);r.add(i,0,0,0,0,Math.PI/2,0),i.dispose();let a=Pd(new W(e*1.005,e*1.005,t*.42,22,1,!0),2894899);r.add(a,0,0,0,0,0,Math.PI/2),a.dispose();let o=new jd,s=e*.58,c=t*.72,l=new W(s,s,c,14);o.add(l,0,0,0,0,0,Math.PI/2),l.dispose();let u=new U(c+.03,e*.5,.035);u.translate(0,e*.3,0);for(let e=0;e<5;e++)o.add(u,0,0,0,e/5*Math.PI*2,0,0);u.dispose();let d=new po(e*.22,10,7);return o.add(d,0,0,0,0,0,0,1.6,1,1),d.dispose(),{tyre:r.build(),rim:o.build()}}function zd(e){let t=new Fn;t.name=`kart-${e.id}`;let n=new Set,r=new Set,i=new Set,a=e=>(n.add(e),e),o=e=>(r.add(e),e),s=o(new Eo({color:e.color,metalness:.2,roughness:.32,clearcoat:1,clearcoatRoughness:.1})),c=o(new G({color:e.accent,metalness:.45,roughness:.3,emissive:e.accent,emissiveIntensity:.32})),l=o(new G({color:16777215,metalness:1,roughness:.18,emissive:4870232,emissiveIntensity:1})),u=o(new G({color:3817288,metalness:.55,roughness:.5})),d=o(new G({color:1776416,roughness:.9,metalness:.05})),f=o(new G({vertexColors:!0,roughness:.92,metalness:0})),p=o(new G({color:13620960,metalness:.7,roughness:.3,emissive:2764340,emissiveIntensity:1})),m=o(new G({color:1842211,roughness:.88,metalness:.05,side:2})),h=o(new G({color:e.color,roughness:.62,metalness:.08})),g=o(new Eo({color:e.driverColor,metalness:.15,roughness:.28,clearcoat:1,clearcoatRoughness:.08})),_=o(new Eo({color:660516,metalness:.55,roughness:.06,clearcoat:1,clearcoatRoughness:.04})),v=o(new G({color:1181701,emissive:16742938,emissiveIntensity:0,roughness:.6})),y=Ld(Math.max(1,gd.indexOf(e)+1),e.accent,e.color);i.add(y);let b=o(new G({map:y,roughness:.45,metalness:.05})),x=new jd,S=Id();x.add(S),S.dispose();let C=new fd(.28,.16,.74,1,.05);x.add(C,.49,.24,.02),x.add(C,-.49,.24,.02),C.dispose();let w=Md(a(x.build()),s,`body`);w.receiveShadow=!0,t.add(w);let T=new jd,E=new fd(.98,.06,1.34,1,.02);T.add(E,0,.13,-.02),E.dispose();let D=new fd(.4,.24,.26,1,.04);T.add(D,0,.55,.66),D.dispose();let O=new U(.04,.04,.14);T.add(O,.17,.19,-.76),T.add(O,-.17,.19,-.76),O.dispose();let k=Nd(0,.46,-.3,0,.6,-.08,.022,8);T.add(k),k.dispose();let A=new U(.04,.26,.05);T.add(A,.3,.575,.68),T.add(A,-.3,.575,.68),A.dispose(),t.add(Md(a(T.build()),u,`darkParts`));let ee=new jd,te=new fd(.3,.1,.16,1,.03);ee.add(te,0,.7,.64),te.dispose();let j=new W(.07,.07,.12,12);ee.add(j,-.12,.7,.74,0,0,Math.PI/2),j.dispose(),t.add(Md(a(ee.build()),l,`chromeParts`));let M=[],ne=a(new W(.046,.052,.28,12,1,!1));ne.translate(0,.14,0),ne.rotateX(Math.PI/2);let re=a(new Bi(.04,12));re.translate(0,0,.283);for(let e of[-1,1]){let n=new Fn;n.name=`exhaust`,n.position.set(e*.17,.5,.64),n.rotation.x=-.16,n.add(Md(ne,l,`pipe`));let r=Md(re,v,`exhaustGlow`);r.castShadow=!1,n.add(r),t.add(n),M.push(n)}let ie=new jd,ae=new fd(.94,.035,.24,1,.015);ie.add(ae,0,.71,.72,-.22,0,0),ae.dispose();let oe=new U(.025,.11,.26);ie.add(oe,.47,.72,.72,-.22,0,0),ie.add(oe,-.47,.72,.72,-.22,0,0),oe.dispose();let se=Math.PI*.9,ce=new mo(.33,.03,6,18,se);ce.rotateX(Math.PI/2),ce.rotateY(se/2+Math.PI/2),ie.add(ce,0,.19,-.5),ce.dispose();let le=new U(.05,.014,.62);ie.add(le,.49,.325,.02),ie.add(le,-.49,.325,.02),le.dispose();let ue=new U(.06,.012,.36);ie.add(ue,0,.465,-.54,-.19,0,0),ue.dispose();let N=new U(.42,.03,.02);ie.add(N,0,.27,.815,.25,0,0),N.dispose();let de=new po(.05,8,6);ie.add(de,.13,.605,-.08),ie.add(de,-.13,.605,-.08),de.dispose(),t.add(Md(a(ie.build()),c,`accentParts`));let fe=new jd,pe=new co(.22,.16);fe.add(pe,0,.29,-.9,.08,Math.PI,0),pe.dispose();let me=new co(.18,.11);fe.add(me,.636,.24,.02,0,Math.PI/2,0),fe.add(me,-.636,.24,.02,0,-Math.PI/2,0),me.dispose();let he=Md(a(fe.build()),b,`plates`);he.castShadow=!1,t.add(he);let ge=new jd,_e=new W(.23,.21,.42,14,1,!0,-Math.PI/2,Math.PI);ge.add(_e,0,.57,.3,.12,0,0),_e.dispose();let ve=new fd(.46,.09,.4,1,.03);ge.add(ve,0,.37,.16),ve.dispose();let ye=new fd(.2,.12,.08,1,.03);ge.add(ye,0,.84,.4),ye.dispose(),t.add(Md(a(ge.build()),m,`seat`));let be=new Fn;be.position.set(0,.61,-.07),be.rotation.x=-.53;let xe=new Fn;xe.name=`steeringWheel`;let Se=new jd,Ce=new mo(.13,.022,6,20);Se.add(Ce),Ce.dispose();let we=new W(.035,.035,.03,12);Se.add(we,0,0,0,Math.PI/2,0,0),we.dispose();let Te=new U(.03,.11,.015);Te.translate(0,.07,0);for(let e of[Math.PI,Math.PI/6,-Math.PI/6])Se.add(Te,0,0,0,0,0,e);Te.dispose(),xe.add(Md(a(Se.build()),d,`steeringWheelMesh`)),be.add(xe),t.add(be);let Ee=Rd(vd,bd),De=Rd(yd,xd);a(Ee.tyre),a(Ee.rim),a(De.tyre),a(De.rim);let Oe=[],ke=[],Ae=[],je=(e,n,r,i,a)=>{let o=new Fn;o.position.set(n,r,i);let s=new Fn;s.name=`wheel`,s.add(Md(e.tyre,f,`tyre`)),s.add(Md(e.rim,p,`rim`)),o.add(s),t.add(o),Oe.push(s),Ae.push(a?vd:yd),a&&ke.push(o)};je(Ee,-.52,vd,Cd,!0),je(Ee,Sd,vd,Cd,!0),je(De,-.52,yd,wd,!1),je(De,Sd,yd,wd,!1);let Me=new Fn;Me.name=`driver`,Me.position.set(0,.41,.18);let Ne=new jd,Pe=new zi(.15,.1,3,12);Ne.add(Pe,0,.2,.02,0,0,0,1.1,1,.75),Pe.dispose();let P=new po(.075,8,6);Ne.add(P,.2,.33,.02),Ne.add(P,-.2,.33,.02),P.dispose();for(let e of[-1,1]){let t=Nd(e*.2,.33,.02,e*.21,.2,-.13,.05);Ne.add(t),t.dispose();let n=Nd(e*.21,.2,-.13,e*.13,.195,-.26,.045);Ne.add(n),n.dispose();let r=Nd(e*.1,.02,-.02,e*.13,-.03,-.34,.06);Ne.add(r),r.dispose()}let Fe=new W(.05,.06,.1,8);Ne.add(Fe,0,.36,.02),Fe.dispose(),Me.add(Md(a(Ne.build()),h,`suit`));let Ie=new Fn;Ie.name=`driverHead`,Ie.position.set(0,.4,.02);let Le=a(new po(.155,16,12));Le.translate(0,.14,0),Ie.add(Md(Le,g,`helmet`));let F=a(new po(.16,12,6,Math.PI*1.18,Math.PI*.64,Math.PI*.36,Math.PI*.26));F.translate(0,.14,0);let Re=Md(F,_,`visor`);Re.castShadow=!1,Ie.add(Re);let I=a(new mo(.152,.012,5,20,Math.PI*1.1));I.rotateZ(-Math.PI*.05),I.rotateY(Math.PI/2),I.translate(0,.14,0);let ze=Md(I,c,`helmetStripe`);return ze.castShadow=!1,Ie.add(ze),Me.add(Ie),t.add(Me),{root:t,body:w,wheels:Oe,frontWheels:ke,steeringWheel:xe,driver:Me,driverHead:Ie,exhausts:M,bodyMaterial:s,accentMaterial:c,exhaustGlowMaterial:v,wheelRadii:Ae,dispose:()=>{for(let e of n)e.dispose();for(let e of r)e.dispose();for(let e of i)e.dispose();n.clear(),r.clear(),i.clear(),t.removeFromParent()}}}var Bd=9,Vd=2.2,Hd=45,Ud=7,Wd=2,Gd=16,Kd=4.5,qd=5,Jd=1.9,Yd=1.9,Xd=4.5,Zd=.15,Qd=.45,$d=.3,ef=.49,tf=.965,nf=[1,2,3.2],rf=[0,.7,1.2,1.8],af=.4,of=1.1,sf=8,cf=4,lf=r*.6,uf=.55,df=.65,ff=1.2,pf=.5,mf=.12,hf=1,gf=.32,_f=[0,5093631,16753981,13921279],vf=new B(0,1,0),yf=new B,bf=new B,xf=new B,Sf=new It,Cf=new It,wf=new _n;new V;var Tf={t:0,surface:`road`,groundY:0,groundNormal:new B(0,1,0),lateral:0,halfWidth:6,wallHalfWidth:7,tangent:new B(0,0,-1),binormal:new B(1,0,0),center:new B};function Ef(e,t){return e>0?Math.max(0,e-t):e<0?Math.min(0,e+t):0}var Df=class{state;object;input=Ju();parts;visual;lateralVel=0;vy=0;freeY=0;slip=0;groundVy=0;lastGroundY=0;hasGroundSample=!1;groundNormal=new B(0,1,0);absCharge=0;hopTimer=0;prevDriftHeld=!1;padCooldown=0;wallCooldown=0;collisionCooldown=new Float32Array(32);frozenThrottleTime=0;disposed=!1;time=0;visYawOffset=0;visRoll=0;visPitch=0;visSquash=0;visSquashVel=0;visShrink=1;visSquishY=1;visGlow=0;visHeadYaw=0;visHeadLean=0;accelEst=0;prevSpeedVis=0;pendingLandImpact=0;pendingHop=!1;starVisualActive=!1;accentStage=-1;constructor(e,t,n){this.state={id:e,isPlayer:n,character:t,position:new B,quaternion:new It,velocity:new B,speed:0,heading:0,steerVisual:0,isDrifting:!1,driftDirection:0,driftCharge:0,driftStage:0,isBoosting:!1,boostTimer:0,boostStrength:0,isAirborne:!1,airTime:0,isHopping:!1,isSpinning:!1,spinTimer:0,isSquished:!1,squishTimer:0,isInvincible:!1,starTimer:0,isShrunk:!1,shrinkTimer:0,isFrozen:!1,lap:0,checkpointIndex:0,trackT:0,raceProgress:0,place:e+1,finished:!1,finishTime:0,wrongWay:!1,item:`none`,itemCount:0,itemRouletteActive:!1,surface:`road`,wheelSpin:0},this.parts=zd(t),this.visual=this.parts.root,this.object=new Fn,this.object.name=`kart-${e}-${t.id}`,this.object.add(this.visual)}setInput(e){let t=this.input;t.throttle=Y(e.throttle),t.brake=Y(e.brake),t.steer=Xu(e.steer,-1,1),t.drift=e.drift,t.useItem=e.useItem,t.useItemHeld=e.useItemHeld,t.lookBack=e.lookBack,t.pause=e.pause,t.confirm=e.confirm,t.back=e.back,t.menuUp=e.menuUp,t.menuDown=e.menuDown,t.menuLeft=e.menuLeft,t.menuRight=e.menuRight}update(e,t,n){if(e<=0||this.disposed)return;let r=this.state;if(this.tickTimers(e),this.syncFromVelocity(),r.isFrozen){r.speed=0,this.lateralVel=0,this.slip=0,this.frozenThrottleTime=this.input.throttle>.5?this.frozenThrottleTime+e:0,r.steerVisual=$u(r.steerVisual,this.input.steer,10,e),this.vy-=26*e,this.freeY+=this.vy*e,this.composeVelocity(),this.resolveTrack(e,t),this.syncFromVelocity(),this.writeQuaternion();return}let i=this.topSpeed(),a=!r.isSpinning;r.steerVisual=$u(r.steerVisual,a?this.input.steer:0,12,e),this.updateSpeed(e,i,a),this.updateHopDrift(e,a),this.updateYaw(e,a);let o=r.isDrifting?r.driftDirection*ef*(.75+.25*Y(this.input.steer*r.driftDirection)):0;if(this.slip=$u(this.slip,o,r.isDrifting?5:7,e),!r.isAirborne){let t=r.surface===`offroad`?cf:sf;this.lateralVel=$u(this.lateralVel,0,t,e)}this.vy-=26*e,this.freeY+=this.vy*e,this.composeVelocity(),r.position.x+=r.velocity.x*e,r.position.z+=r.velocity.z*e,this.resolveTrack(e,t),this.resolveKarts(n),this.syncFromVelocity(),this.writeQuaternion()}updateVisuals(e){if(this.disposed)return;e=Xu(e,0,.1);let t=this.state,n=this.parts;if(this.time+=e,this.object.position.copy(t.position),this.object.quaternion.copy(t.quaternion),e>1e-4){let n=(t.speed-this.prevSpeedVis)/e;this.accelEst=$u(this.accelEst,Xu(n,-30,40),6,e)}this.prevSpeedVis=t.speed;let r=n.wheelRadii[0]||.2;t.wheelSpin+=t.speed/r*e,t.wheelSpin>J?t.wheelSpin-=J:t.wheelSpin<0&&(t.wheelSpin+=J);let i=n.wheels;for(let e=0;e<i.length;e++)i[e].rotation.x=-t.wheelSpin*(r/(n.wheelRadii[e]||r));let a=-t.steerVisual*.42,o=n.frontWheels;for(let e=0;e<o.length;e++)o[e].rotation.y=a;n.steeringWheel.rotation.z=-t.steerVisual*1.2;let s=Y(Math.abs(t.speed)/22),c=t.isDrifting?-t.driftDirection*.16:0;this.visYawOffset=$u(this.visYawOffset,c,6,e);let l=t.steerVisual*.06*s+(t.isDrifting?t.driftDirection*.05:0);this.visRoll=$u(this.visRoll,l,8,e);let u=Xu(this.accelEst*.008,-.08,.06);t.isAirborne&&(u+=Xu(t.velocity.y*.035,-.3,.3)),this.visPitch=$u(this.visPitch,u,6,e);let d=0,f=0;if(t.isSpinning){let e=Y(1-t.spinTimer/of);d=(1-(1-e)*(1-e))*J,f=Math.sin(e*Math.PI)*.22}this.pendingHop&&=(this.visSquashVel+=2.2,!1),this.pendingLandImpact>0&&(this.visSquashVel-=Math.min(4,this.pendingLandImpact*.7),this.pendingLandImpact=0),this.visSquashVel+=(-180*this.visSquash-14*this.visSquashVel)*e,this.visSquash=Xu(this.visSquash+this.visSquashVel*e,-.35,.35);let p=1+this.visSquash,m=1-this.visSquash*.5;this.visSquishY=$u(this.visSquishY,t.isSquished?.35:1,12,e);let h=1+(1-this.visSquishY)*.45;this.visShrink=$u(this.visShrink,t.isShrunk?.55:1,8,e);let g=this.visual;g.scale.set(m*h*this.visShrink,p*this.visSquishY*this.visShrink,m*h*this.visShrink),g.position.y=f,wf.set(this.visPitch,this.visYawOffset+d,this.visRoll,`YXZ`),g.quaternion.setFromEuler(wf);let _=-t.steerVisual*.5-(t.isDrifting?t.driftDirection*.35:0);this.visHeadYaw=$u(this.visHeadYaw,_,8,e);let v=-t.steerVisual*.15-(t.isDrifting?t.driftDirection*.08:0);if(this.visHeadLean=$u(this.visHeadLean,v,8,e),n.driverHead.rotation.set(0,this.visHeadYaw,this.visHeadLean),n.driver.rotation.set(Xu(this.accelEst*.004,-.08,.1),0,this.visHeadLean*.35),t.isInvincible){let e=this.time*1.6%1;n.bodyMaterial.emissive.setHSL(e,1,.5),n.bodyMaterial.emissiveIntensity=.85,n.accentMaterial.emissiveIntensity=1.8,this.starVisualActive=!0,this.accentStage=-1}else this.starVisualActive&&=(n.bodyMaterial.emissive.setRGB(0,0,0),n.bodyMaterial.emissiveIntensity=1,n.accentMaterial.emissiveIntensity=gf,!1);if(!t.isInvincible){let e=t.isDrifting?t.driftStage:0;e!==this.accentStage&&(this.accentStage=e,e===0?(n.accentMaterial.emissive.setHex(t.character.accent),n.accentMaterial.emissiveIntensity=gf):(n.accentMaterial.emissive.setHex(_f[e]),n.accentMaterial.emissiveIntensity=1.1))}this.visGlow=$u(this.visGlow,+!!t.isBoosting,10,e);let y=.75+.25*Math.sin(this.time*47)*Math.sin(this.time*31+1);n.exhaustGlowMaterial.emissiveIntensity=this.visGlow*3*y;let b=n.exhausts,x=1+.12*this.visGlow*y,S=1+.25*this.visGlow*y;for(let e=0;e<b.length;e++)b[e].scale.set(x,x,S)}applyBoost(e,t,n){let r=this.state;e<=0||t<=0||(r.isBoosting=!0,r.boostStrength=Math.max(r.boostStrength,e),r.boostTimer=Math.max(r.boostTimer,t),q.emit(`kart:boost`,{kartId:r.id,strength:e,duration:t,source:n}))}applyHit(e,t){let n=this.state;return n.isInvincible||n.isSpinning?!1:(n.isSpinning=!0,n.spinTimer=of,n.isDrifting&&this.endDrift(!1),n.isBoosting=!1,n.boostTimer=0,n.boostStrength=0,this.syncFromVelocity(),n.speed*=.15,this.lateralVel*=.5,e===`explosion`&&(this.vy=Math.max(this.vy,6),this.freeY=n.position.y+.01,n.isAirborne=!0,n.airTime=0),this.composeVelocity(),q.emit(`kart:spin`,{kartId:n.id,cause:e,sourceKartId:t}),!0)}applySquish(e){let t=this.state;if(t.isInvincible||e<=0)return;let n=t.isSquished;t.isSquished=!0,t.squishTimer=Math.max(t.squishTimer,e),t.isDrifting&&this.endDrift(!1),n||q.emit(`kart:squish`,{kartId:t.id})}applyStar(e){let t=this.state;if(e<=0)return;let n=t.isInvincible;t.isInvincible=!0,t.starTimer=Math.max(t.starTimer,e),t.isSpinning&&(t.isSpinning=!1,t.spinTimer=0),n||q.emit(`kart:starStart`,{kartId:t.id})}applyShrink(e){let t=this.state;if(t.isInvincible||e<=0)return;let n=t.isShrunk;t.isShrunk=!0,t.shrinkTimer=Math.max(t.shrinkTimer,e),n||q.emit(`kart:shrink`,{kartId:t.id})}applyImpulse(e){let t=this.state;t.isFrozen||(t.velocity.add(e),e.y>.5&&!t.isAirborne&&(this.freeY=t.position.y+.01))}setFrozen(e){let t=this.state;if(t.isFrozen&&!e){let e=this.frozenThrottleTime;e>0&&e<.45&&this.applyBoost(.3,1.2,`start`)}t.isFrozen=e,e&&(t.isDrifting&&this.endDrift(!1),t.speed=0,t.velocity.set(0,0,0),this.lateralVel=0,this.slip=0,this.frozenThrottleTime=0)}resetTo(e,t){let n=this.state;n.position.copy(e),n.quaternion.copy(t),yf.set(0,0,-1).applyQuaternion(t),n.heading=Math.atan2(-yf.x,-yf.z),n.velocity.set(0,0,0),n.speed=0,this.lateralVel=0,this.vy=0,this.slip=0,this.freeY=e.y,this.groundVy=0,this.lastGroundY=e.y,this.hasGroundSample=!1,this.groundNormal.set(0,1,0),n.isAirborne=!1,n.airTime=0,n.isHopping=!1,this.hopTimer=0,this.prevDriftHeld=!0,n.isDrifting&&this.endDrift(!1),n.isBoosting=!1,n.boostTimer=0,n.boostStrength=0,n.isSpinning=!1,n.spinTimer=0,n.steerVisual=0,this.padCooldown=.5,this.wallCooldown=0,this.visYawOffset=0,this.visRoll=0,this.visPitch=0,this.visSquash=0,this.visSquashVel=0,this.accelEst=0,this.prevSpeedVis=0,this.pendingLandImpact=0,this.pendingHop=!1,this.writeQuaternion(),this.object.position.copy(n.position),this.object.quaternion.copy(n.quaternion)}forwardDir(e){return(e??new B).set(0,0,-1).applyQuaternion(this.state.quaternion)}topSpeed(){let e=this.state,t=this.baseTopSpeed(),n=e.isBoosting||e.isInvincible;return e.surface===`offroad`&&!n&&(t*=uf),e.isShrunk&&(t*=df),e.isInvincible&&(t*=ff),e.isBoosting&&(t*=1+e.boostStrength),e.isSquished&&(t*=pf),t}dispose(){this.disposed||(this.disposed=!0,this.parts.dispose(),this.object.removeFromParent())}baseTopSpeed(){return 22*(.93+.14*this.state.character.stats.speed)}tickTimers(e){let t=this.state;t.isBoosting&&(t.boostTimer-=e,t.boostTimer<=0&&(t.isBoosting=!1,t.boostTimer=0,t.boostStrength=0)),t.isSpinning&&(t.spinTimer-=e,t.spinTimer<=0&&(t.isSpinning=!1,t.spinTimer=0)),t.isSquished&&(t.squishTimer-=e,t.squishTimer<=0&&(t.isSquished=!1,t.squishTimer=0)),t.isInvincible&&(t.starTimer-=e,t.starTimer<=0&&(t.isInvincible=!1,t.starTimer=0,q.emit(`kart:starEnd`,{kartId:t.id}))),t.isShrunk&&(t.shrinkTimer-=e,t.shrinkTimer<=0&&(t.isShrunk=!1,t.shrinkTimer=0,q.emit(`kart:unshrink`,{kartId:t.id}))),this.padCooldown>0&&(this.padCooldown-=e),this.wallCooldown>0&&(this.wallCooldown-=e);let n=this.collisionCooldown;for(let t=0;t<n.length;t++)n[t]>0&&(n[t]-=e)}syncFromVelocity(){let e=this.state,t=e.heading+this.slip,n=Math.sin(t),r=Math.cos(t),i=e.velocity.x,a=e.velocity.z;e.speed=-i*n-a*r,this.lateralVel=i*r-a*n,this.vy=e.velocity.y}composeVelocity(){let e=this.state,t=e.heading+this.slip,n=Math.sin(t),r=Math.cos(t);e.velocity.x=-n*e.speed+r*this.lateralVel,e.velocity.z=-r*e.speed-n*this.lateralVel,e.velocity.y=this.vy}updateSpeed(e,t,n){let r=this.state,i=this.input,a=r.speed;if(r.isAirborne&&!r.isHopping){a=Ef(a,.4*e),r.speed=a;return}if(!n){a=Ef(a,6*e),r.speed=a;return}let o=Bd*(.5+r.character.stats.acceleration),s=r.isBoosting?1:i.throttle,c=i.brake;if(c>.05&&a>.3&&c>=s)a=Math.max(0,a-Gd*c*e);else if(s>.05&&s>=c){let n=t*s;if(r.isDrifting&&(n*=tf),a<n){let t=r.isBoosting?Hd:o,i=r.isBoosting?Ud:Vd;a+=Math.min(t,(n-a)*i+.8)*e,a>n&&(a=n)}else a+=Math.max(-10,(n-a)*Wd)*e,a<n&&(a=n)}else if(c>.05){let n=-.35*t*c;a>n?(a-=Math.min(qd,(a-n)*2+.5)*e,a<n&&(a=n)):a+=Math.min(6,(n-a)*2)*e}else a=Ef(a,(Kd+.06*Math.abs(a))*e),a>t&&(a+=Math.max(-10,(t-a)*Wd)*e,a<t&&(a=t));r.speed=a}updateHopDrift(e,t){let n=this.state,r=this.input,i=this.baseTopSpeed(),a=t&&r.drift,o=a&&!this.prevDriftHeld;if(this.prevDriftHeld=a,n.isHopping&&(this.hopTimer+=e),o&&!n.isAirborne&&Math.abs(n.speed)>.3*i&&this.hop(),!n.isDrifting&&a&&n.isHopping&&this.hopTimer>=Zd&&this.tryStartDrift(),n.isDrifting){if(!a)this.endDrift(!0);else if(Math.abs(n.speed)<$d*i)this.endDrift(!1);else if(n.isAirborne&&(!n.isHopping&&n.airTime>.4||n.airTime>.9))this.endDrift(!1);else if(!n.isAirborne){let t=Y(r.steer*n.driftDirection);this.absCharge+=(.55+.6*n.character.stats.miniTurbo)*(.6+.8*t)*e;let i=0;if(this.absCharge>=nf[2]?i=3:this.absCharge>=nf[1]?i=2:this.absCharge>=nf[0]&&(i=1),i>n.driftStage&&(n.driftStage=i,q.emit(`kart:driftStage`,{kartId:n.id,stage:i})),i===3)n.driftCharge=1;else{let e=i===0?0:nf[i-1],t=nf[i];n.driftCharge=Y((this.absCharge-e)/(t-e))}}}}hop(){let e=this.state;e.isHopping=!0,e.isAirborne=!0,e.airTime=0,this.hopTimer=0,this.vy=Xd+Math.max(0,this.groundVy),this.freeY=e.position.y+.001,this.pendingHop=!0,q.emit(`kart:hop`,{kartId:e.id})}tryStartDrift(){let e=this.state,t=this.input;e.isDrifting||e.isSpinning||Math.abs(t.steer)<=.3||e.speed<=Qd*this.baseTopSpeed()||(e.isDrifting=!0,e.driftDirection=t.steer>0?1:-1,e.driftStage=0,e.driftCharge=0,this.absCharge=0,q.emit(`kart:driftStart`,{kartId:e.id,direction:e.driftDirection}))}endDrift(e){let t=this.state;if(!t.isDrifting)return;let n=e?t.driftStage:0;t.isDrifting=!1,t.driftDirection=0,t.driftStage=0,t.driftCharge=0,this.absCharge=0,q.emit(`kart:driftEnd`,{kartId:t.id,boostStage:n}),n>0&&this.applyBoost(af,rf[n],`drift`)}updateYaw(e,t){let n=this.state;if(!t)return;let r=this.input,i=.7+.6*n.character.stats.handling,a=Math.abs(n.speed),o=a/22,s;if(n.isDrifting){let e=(r.steer*n.driftDirection+1)*.5,t=Zu(1,.72,Qu(.2,1,o));s=n.driftDirection*(.55+.45*e)*Yd*i*t}else{let e=Zu(1,.6,Qu(.15,1,o)),t=Math.min(1,a/2.5);s=(n.speed<-.5?-r.steer:r.steer)*Jd*i*e*t,n.isSquished&&(s*=.6)}n.isAirborne&&(s*=n.isHopping?.45:.15),n.heading=ed(n.heading-s*e)}resolveTrack(e,t){let n=this.state,r=t.query(n.position,n.trackT,Tf);if(n.trackT=r.t,r.surface!==n.surface){let e=n.surface;n.surface=r.surface,q.emit(`kart:surfaceChange`,{kartId:n.id,from:e,to:r.surface}),r.surface===`boost`&&this.padCooldown<=0&&(this.padCooldown=1,this.applyBoost(.45,1.3,`pad`))}let i=r.surface===`void`;if(!i&&!n.isFrozen){let t=r.wallHalfWidth-lf,i=r.lateral;if(Math.abs(i)>t){let a=i>0?1:-1,o=Math.abs(i)-t,s=r.binormal;n.position.x-=s.x*a*o,n.position.z-=s.z*a*o;let c=n.velocity,l=(c.x*s.x+c.z*s.z)*a;if(l>0){let t=Math.hypot(c.x,c.z),r=Y(l/Math.max(.5,t));if(c.x-=s.x*a*l*1.3,c.z-=s.z*a*l*1.3,l>1&&this.wallCooldown<=0){let e=1-Zu(.25,.45,r);c.x*=e,c.z*=e,this.wallCooldown=.3,q.emit(`kart:collision`,{kartId:n.id,otherId:null,impulse:l,position:n.position})}else{let t=Math.max(0,1-1.5*e);c.x*=t,c.z*=t}}}}let a=n.isAirborne;if(i)n.isAirborne=!0,n.airTime+=e,n.isHopping=!1,n.position.y=this.freeY,this.hasGroundSample=!1,this.groundVy=$u(this.groundVy,0,4,e);else{let t=r.groundY;if(this.hasGroundSample){let n=Xu((t-this.lastGroundY)/e,-25,25);this.groundVy=$u(this.groundVy,n,40,e)}else this.groundVy=0;this.lastGroundY=t,this.hasGroundSample=!0;let i,o=0;this.freeY<=t?(i=!0,this.freeY=t,o=Math.max(0,this.groundVy-this.vy),this.vy<this.groundVy&&(this.vy=this.groundVy)):i=this.freeY-t<mf&&Math.abs(this.vy-this.groundVy)<hf,i?(n.position.y=t,a&&this.land(o),n.isAirborne=!1,n.isHopping=!1,n.airTime=0):(n.isAirborne=!0,n.airTime+=e,n.position.y=this.freeY)}n.velocity.y=this.vy;let o=r.groundNormal,s=n.isAirborne?vf:o,c=n.isAirborne?3:12,l=1-Math.exp(-c*e);this.groundNormal.lerp(s,l),this.groundNormal.lengthSq()<1e-6?this.groundNormal.copy(vf):this.groundNormal.normalize()}land(e){let t=this.state,n=t.isHopping;e>9&&(t.speed*=.9),this.pendingLandImpact=e,(e>.5||t.airTime>.12)&&q.emit(`kart:land`,{kartId:t.id,impact:e}),!t.isSpinning&&!t.isFrozen&&this.input.drift&&!t.isDrifting&&(n||t.airTime<.6)&&this.tryStartDrift()}resolveKarts(e){let t=this.state;if(t.isFrozen)return;let n=r*(t.isShrunk?.6:1),i=1/(.7+.6*t.character.stats.weight);for(let a=0;a<e.length;a++){let o=e[a];if(o===this)continue;let s=o.state;if(s.id<=t.id||s.isFrozen)continue;let c=s.position.x-t.position.x,l=s.position.z-t.position.z,u=s.position.y-t.position.y;if(Math.abs(u)>1.2)continue;let d=n+r*(s.isShrunk?.6:1),f=c*c+l*l;if(f>=d*d)continue;let p=Math.sqrt(f),m,h;p>1e-4?(m=c/p,h=l/p):(m=Math.cos(t.heading),h=-Math.sin(t.heading));let g=d-p,_=1/(.7+.6*s.character.stats.weight),v=i+_,y=i/v*g,b=_/v*g;t.position.x-=m*y,t.position.z-=h*y,s.position.x+=m*b,s.position.z+=h*b;let x=(s.velocity.x-t.velocity.x)*m+(s.velocity.z-t.velocity.z)*h;if(x<0){let e=-1.4*x/v+1.2;t.velocity.x-=m*e*i,t.velocity.z-=h*e*i,bf.set(m*e*_,0,h*e*_),o.applyImpulse(bf)}let S=s.id&31;this.collisionCooldown[S]<=0&&x<-.8&&(this.collisionCooldown[S]=.3,xf.set(t.position.x+m*n,(t.position.y+s.position.y)*.5+.4,t.position.z+h*n),q.emit(`kart:collision`,{kartId:t.id,otherId:s.id,impulse:-x,position:xf})),t.isInvincible&&!s.isInvincible?o.applyHit(`star`,t.id):s.isInvincible&&!t.isInvincible&&this.applyHit(`star`,s.id)}}writeQuaternion(){let e=this.state;Sf.setFromAxisAngle(vf,e.heading),Cf.setFromUnitVectors(vf,this.groundNormal),e.quaternion.copy(Cf).multiply(Sf)}},Of=[`KeyW`,`ArrowUp`],kf=[`KeyS`,`ArrowDown`],Af=[`KeyA`,`ArrowLeft`],jf=[`KeyD`,`ArrowRight`],Mf=[`Space`,`ShiftLeft`,`ShiftRight`],Nf=[`KeyE`,`ControlLeft`,`ControlRight`,`Enter`,`NumpadEnter`],Pf=[`KeyQ`],Ff=[`Escape`,`KeyP`],If=[`Escape`,`KeyP`,`Backspace`],Lf=[`Enter`,`NumpadEnter`,`Space`],Rf=new Set([...Of,...kf,...Af,...jf,...Mf,...Nf,...Pf,...Ff,...Lf]),zf=0,Bf=1,Vf=2,Hf=3,Uf=4,Wf=5,Gf=6,Kf=7,qf=9,Jf=12,Yf=13,Xf=14,Zf=15,Qf=17,$f=.15,ep=.12,tp=.08,np=.55,rp=class{state=Ju();held=new Set;pressed=new Set;keyboardSteer=0;lastTime=0;padButtons=Array(Qf).fill(!1);prevPadButtons=Array(Qf).fill(!1);padStickMenuX=0;padStickMenuY=0;prevPadStickMenuX=0;prevPadStickMenuY=0;disposed=!1;constructor(){window.addEventListener(`keydown`,this.onKeyDown,{passive:!1}),window.addEventListener(`keyup`,this.onKeyUp),window.addEventListener(`blur`,this.onBlur),document.addEventListener(`visibilitychange`,this.onVisibility),this.lastTime=performance.now()}get hasGamepad(){return this.getPad()!==null}update(){let e=this.state,t=performance.now(),n=Xu((t-this.lastTime)/1e3,0,.1);this.lastTime=t;let r=+!!this.anyHeld(Of),i=+!!this.anyHeld(kf),a=+!!this.anyHeld(jf)-!!this.anyHeld(Af);this.keyboardSteer=ap(this.keyboardSteer,a,n);let o=this.getPad(),s=0,c=0,l=0,u=this.prevPadButtons,d=this.padButtons;this.prevPadButtons=d,this.padButtons=u;let f=this.padButtons;if(this.prevPadStickMenuX=this.padStickMenuX,this.prevPadStickMenuY=this.padStickMenuY,o){for(let e=0;e<Qf;e++){let t=o.buttons[e];f[e]=t?t.pressed||t.value>.5:!1}s=o.buttons[Kf]?Xu(o.buttons[Kf].value,0,1):0,c=o.buttons[Gf]?Xu(o.buttons[Gf].value,0,1):0,s===0&&f[Kf]&&(s=1),c===0&&f[Gf]&&(c=1);let e=o.axes[0]??0,t=o.axes[1]??0;l=ip(e),this.padStickMenuX=Math.abs(e)>np?Math.sign(e):0,this.padStickMenuY=Math.abs(t)>np?Math.sign(t):0}else{for(let e=0;e<Qf;e++)f[e]=!1;this.padStickMenuX=0,this.padStickMenuY=0}let p=this.padEdge;return e.throttle=Math.max(r,s),e.brake=Math.max(i,c),e.steer=Xu(this.keyboardSteer+l,-1,1),e.drift=this.anyHeld(Mf)||f[zf]||f[Wf],e.useItemHeld=this.anyHeld(Nf)||f[Vf]||f[Uf],e.lookBack=this.anyHeld(Pf)||f[Hf],e.useItem=this.anyPressed(Nf)||p(Vf)||p(Uf),e.pause=this.anyPressed(Ff)||p(qf),e.confirm=this.anyPressed(Lf)||p(zf),e.back=this.anyPressed(If)||p(Bf),e.menuUp=this.anyPressed(Of)||p(Jf)||this.padStickMenuY<0&&this.prevPadStickMenuY>=0,e.menuDown=this.anyPressed(kf)||p(Yf)||this.padStickMenuY>0&&this.prevPadStickMenuY<=0,e.menuLeft=this.anyPressed(Af)||p(Xf)||this.padStickMenuX<0&&this.prevPadStickMenuX>=0,e.menuRight=this.anyPressed(jf)||p(Zf)||this.padStickMenuX>0&&this.prevPadStickMenuX<=0,this.pressed.clear(),e}dispose(){this.disposed||(this.disposed=!0,window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),window.removeEventListener(`blur`,this.onBlur),document.removeEventListener(`visibilitychange`,this.onVisibility),this.held.clear(),this.pressed.clear())}anyHeld(e){for(let t=0;t<e.length;t++)if(this.held.has(e[t]))return!0;return!1}anyPressed(e){for(let t=0;t<e.length;t++)if(this.pressed.has(e[t]))return!0;return!1}padEdge=e=>this.padButtons[e]&&!this.prevPadButtons[e];getPad(){if(typeof navigator>`u`||typeof navigator.getGamepads!=`function`)return null;let e;try{e=navigator.getGamepads()}catch{return null}let t=null;for(let n=0;n<e.length;n++){let r=e[n];if(!(!r||!r.connected)){if(r.mapping===`standard`)return r;t||=r}}return t}isTextTarget(e){let t=e.target;if(!t||!(t instanceof HTMLElement))return!1;let n=t.tagName;return n===`INPUT`||n===`TEXTAREA`||n===`SELECT`||t.isContentEditable}onKeyDown=e=>{if(this.isTextTarget(e))return;let t=e.code;Rf.has(t)&&!e.metaKey&&!e.altKey&&e.preventDefault(),!e.repeat&&(this.held.has(t)||this.pressed.add(t),this.held.add(t))};onKeyUp=e=>{this.held.delete(e.code)};onBlur=()=>{this.held.clear()};onVisibility=()=>{document.visibilityState!==`visible`&&this.held.clear()}};function ip(e){let t=Math.abs(e);if(t<$f)return 0;let n=(t-$f)/.85;return Math.sign(e)*Xu(n,0,1)**1.25}function ap(e,t,n){if(e===t)return e;let r=(Math.abs(t)>Math.abs(e)&&Math.sign(t)===Math.sign(e||t)?1/ep:1/tp)*n;return Math.abs(t-e)<=r?t:e+Math.sign(t-e)*r}var op=2048,sp=class{curve;n=op;length;px;py;pz;tx;ty;tz;bx;bz;hw;whw;minX;maxX;minZ;maxZ;minY;maxY;maxWallHalfWidth;maxHalfWidth;constructor(e){let t=this.n,n=e.controlPoints.map(e=>new B(e.x,e.y,e.z));this.curve=new $i(n,!0,`centripetal`,.5),this.curve.arcLengthDivisions=4096,this.length=this.curve.getLength(),this.px=new Float64Array(t),this.py=new Float64Array(t),this.pz=new Float64Array(t),this.tx=new Float64Array(t),this.ty=new Float64Array(t),this.tz=new Float64Array(t),this.bx=new Float64Array(t),this.bz=new Float64Array(t),this.hw=new Float64Array(t),this.whw=new Float64Array(t);let r=e.controlPoints.length,i=e.halfWidths&&e.halfWidths.length===r?e.halfWidths:null,a=new B,o=1/0,s=-1/0,c=1/0,l=-1/0,u=1/0,d=-1/0,f=0;for(let n=0;n<t;n++){let p=n/t;this.curve.getPointAt(p,a),this.px[n]=a.x,this.py[n]=a.y,this.pz[n]=a.z,a.x<o&&(o=a.x),a.x>s&&(s=a.x),a.z<c&&(c=a.z),a.z>l&&(l=a.z),a.y<u&&(u=a.y),a.y>d&&(d=a.y);let m=e.halfWidth;if(i){let e=this.curve.getUtoTmapping(p,0)*r,t=Math.floor(e)%r,n=(t+1)%r,a=e-Math.floor(e);a=a*a*(3-2*a),m=i[t]+(i[n]-i[t])*a}this.hw[n]=m,this.whw[n]=m*Math.max(1,e.wallHalfWidthFactor),m>f&&(f=m)}let p=new Float64Array(t);for(let e=0;e<t;e++){let n=0;for(let r=-8;r<=8;r++)n+=this.hw[(e+r+t)%t];p[e]=n/17}for(let n=0;n<t;n++)this.hw[n]=p[n],this.whw[n]=p[n]*Math.max(1,e.wallHalfWidthFactor);this.maxHalfWidth=f,this.maxWallHalfWidth=f*Math.max(1,e.wallHalfWidthFactor),this.minX=o,this.maxX=s,this.minZ=c,this.maxZ=l,this.minY=u,this.maxY=d;for(let e=0;e<t;e++){let n=(e+1)%t,r=(e-1+t)%t,i=this.px[n]-this.px[r],a=this.py[n]-this.py[r],o=this.pz[n]-this.pz[r],s=Math.hypot(i,a,o)||1;i/=s,a/=s,o/=s,this.tx[e]=i,this.ty[e]=a,this.tz[e]=o;let c=Math.hypot(i,o)||1;this.bx[e]=-o/c,this.bz[e]=i/c}}indexOf(e){return nd(e)*this.n}sOf(e){return nd(e)*this.length}tOf(e){return nd(e/this.length)}sample(e,t){let n=nd(e),r=this.n,i=n*r,a=Math.floor(i)%r,o=(a+1)%r,s=i-Math.floor(i),c=1-s;t.position.set(this.px[a]*c+this.px[o]*s,this.py[a]*c+this.py[o]*s,this.pz[a]*c+this.pz[o]*s);let l=this.tx[a]*c+this.tx[o]*s,u=this.ty[a]*c+this.ty[o]*s,d=this.tz[a]*c+this.tz[o]*s,f=Math.hypot(l,u,d)||1;l/=f,u/=f,d/=f,t.tangent.set(l,u,d);let p=Math.hypot(l,d)||1,m=-d/p,h=l/p;return t.binormal.set(m,0,h),t.normal.set(-h*u,h*l-m*d,m*u).normalize(),t.halfWidth=this.hw[a]*c+this.hw[o]*s,t.wallHalfWidth=this.whw[a]*c+this.whw[o]*s,t.t=n,t}dist2(e,t,n){let r=this.px[e]-t,i=this.pz[e]-n;return r*r+i*i}closestT(e,t,n){let r=this.n,i=-1,a=1/0;if(n!==void 0&&Number.isFinite(n)){let o=Math.round(nd(n)*r);for(let n=-48;n<=48;n++){let s=(o+n+r*4)%r,c=this.dist2(s,e,t);c<a&&(a=c,i=s)}let s=((i-o)%r+r)%r;(s===48||s===r-48)&&(i=-1)}if(i<0){a=1/0;for(let n=0;n<r;n+=8){let r=this.dist2(n,e,t);r<a&&(a=r,i=n)}let n=i;for(let o=-8;o<=8;o++){let s=(n+o+r)%r,c=this.dist2(s,e,t);c<a&&(a=c,i=s)}}let o=(i-1+r)%r,s=(i+1)%r,c=i/r,l=a;{let n=this.px[o],a=this.pz[o],s=this.px[i]-n,u=this.pz[i]-a,d=s*s+u*u;if(d>1e-12){let i=((e-n)*s+(t-a)*u)/d;i=i<0?0:i>1?1:i;let f=n+s*i-e,p=a+u*i-t,m=f*f+p*p;m<l&&(l=m,c=(o+i)/r)}}{let n=this.px[i],a=this.pz[i],o=this.px[s]-n,u=this.pz[s]-a,d=o*o+u*u;if(d>1e-12){let s=((e-n)*o+(t-a)*u)/d;s=s<0?0:s>1?1:s;let f=n+o*s-e,p=a+u*s-t,m=f*f+p*p;m<l&&(l=m,c=(i+s)/r)}}return nd(c)}},cp=1600,lp=2.5,up=96,dp=.25,fp={grassland:{hills:16,detail:3.5,bumps:.5,rim:70,base:-1.5},desert:{hills:20,detail:5,bumps:.6,rim:90,base:-1},snow:{hills:26,detail:5,bumps:.6,rim:120,base:-1},beach:{hills:10,detail:2.5,bumps:.4,rim:50,base:-1},volcano:{hills:30,detail:6,bumps:.8,rim:120,base:-1},neon:{hills:3,detail:.8,bumps:.15,rim:20,base:-.6}},pp=class{extent=cp;centerX;centerZ;minX;minZ;cells;dist;roadY;voidW;params;flatRadius;seed;hasVoid;fDist=0;fRoadY=0;fVoid=0;constructor(e,t){this.params=fp[e.theme]??fp.grassland,this.centerX=(t.minX+t.maxX)*.5,this.centerZ=(t.minZ+t.maxZ)*.5,this.minX=this.centerX-this.extent*.5,this.minZ=this.centerZ-this.extent*.5,this.cells=Math.ceil(this.extent/lp)+1;let n=this.cells*this.cells;this.dist=new Float32Array(n).fill(up),this.roadY=new Float32Array(n),this.voidW=new Float32Array(n),this.flatRadius=t.maxWallHalfWidth+6,this.seed=mp(e.id);let r=e.voidRanges??[];this.hasVoid=r.length>0;let i=e=>{let t=0;for(let[n,i]of r){let r=Qu(-.03,0,rd(n,e)),a=Qu(-.03,0,rd(e,i));t=Math.max(t,Math.min(r,a))}return t};this.forEachCellNear(t,2,up,(e,n,r)=>{n<this.dist[e]&&(this.dist[e]=n,this.roadY[e]=t.py[r],this.voidW[e]=i(r/t.n))});let a=new Float32Array(n).fill(1/0);this.forEachCellNear(t,2,this.flatRadius+30,(e,n,r)=>{n<=this.dist[e]+2.5&&t.py[r]<a[e]&&(a[e]=t.py[r])});for(let e=0;e<n;e++)a[e]<1/0&&(this.roadY[e]=a[e])}forEachCellNear(e,t,n,r){let i=Math.ceil(n/lp);for(let a=0;a<e.n;a+=t){let t=e.px[a],o=e.pz[a],s=Math.round((t-this.minX)/lp),c=Math.round((o-this.minZ)/lp),l=Math.max(0,s-i),u=Math.min(this.cells-1,s+i),d=Math.max(0,c-i),f=Math.min(this.cells-1,c+i);for(let e=d;e<=f;e++){let i=this.minZ+e*lp-o,s=e*this.cells;for(let e=l;e<=u;e++){let o=this.minX+e*lp-t,c=Math.sqrt(o*o+i*i);c<=n&&r(s+e,c,a)}}}}sampleField(e,t){let n=(e-this.minX)/lp,r=(t-this.minZ)/lp,i=this.cells;if(n<0||r<0||n>=i-1||r>=i-1){this.fDist=up,this.fRoadY=0,this.fVoid=0;return}let a=Math.floor(n),o=Math.floor(r),s=n-a,c=r-o,l=o*i+a,u=l+1,d=l+i,f=d+1,p=(1-s)*(1-c),m=s*(1-c),h=(1-s)*c,g=s*c;this.fDist=this.dist[l]*p+this.dist[u]*m+this.dist[d]*h+this.dist[f]*g,this.fRoadY=this.roadY[l]*p+this.roadY[u]*m+this.roadY[d]*h+this.roadY[f]*g,this.fVoid=this.voidW[l]*p+this.voidW[u]*m+this.voidW[d]*h+this.voidW[f]*g}distanceToTrack(e,t){return this.sampleField(e,t),this.fDist}rawTerrain(e,t){let n=this.params,r=e+this.seed*.37,i=t-this.seed*.53,a=(sd(r*.0035+7.1,i*.0035+3.3,3)-.5)*n.hills,o=(sd(r*.02+1.7,i*.02+9.2,3)-.5)*n.detail,s=(sd(r*.11,i*.11,2)-.5)*n.bumps,c=e-this.centerX,l=t-this.centerZ,u=Qu(430,780,Math.sqrt(c*c+l*l))*n.rim*(.6+.4*sd(r*.01,i*.01,2));return n.base+a+o+s+u}heightAt(e,t){this.sampleField(e,t);let n=this.fDist,r=this.fRoadY-dp,i=this.rawTerrain(e,t),a;if(a=n>=this.flatRadius+26?i:Zu(r,i,Qu(this.flatRadius,this.flatRadius+26,n)),this.hasVoid&&this.fVoid>.001){let e=this.flatRadius-6,t=Qu(e-1.5,e+9,n),o=Zu(Zu(r,r-42,t),i,Qu(95,150,n));a=Zu(a,o,this.fVoid)}return a}};function mp(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)%1e5}function hp(e,...t){for(let n of t)e.disposables.push(n);return t[0]}function gp(e,t){e.disposables.push(t.geometry);let n=t.material;Array.isArray(n)?e.disposables.push(...n):e.disposables.push(n)}function _p(e,t=0,n=0){let r=new V(e);if(t!==0||n!==0){let e={h:0,s:0,l:0};r.getHSL(e),r.setHSL(e.h,Ft.clamp(e.s+n,0,1),Ft.clamp(e.l+t,0,1))}return r}function vp(e,t){let n=e.n;return(Math.round(t/e.length*n)%n+n)%n}function yp(e,t){return Math.atan2(-e,-t)}function bp(e,t){let n=e.getAttribute(`position`).count,r=new Float32Array(n*3);for(let e=0;e<n;e++)r[e*3]=t.r,r[e*3+1]=t.g,r[e*3+2]=t.b;return e.setAttribute(`color`,new Cr(r,3)),e}function xp(e){let t=e.index?e.toNonIndexed():e;t!==e&&e.dispose();let n=t.getAttribute(`position`).count;return t.getAttribute(`normal`)||t.computeVertexNormals(),t.getAttribute(`uv`)||t.setAttribute(`uv`,new Cr(new Float32Array(n*2),2)),t.getAttribute(`color`)||bp(t,new V(1,1,1)),t}function Sp(e){return[e>>16&255,e>>8&255,e&255]}function Cp(e,t=1){let[n,r,i]=Sp(e);return`rgba(${n},${r},${i},${t})`}function wp(e,t){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);if(!r)throw Error(`2D canvas not available`);return{canvas:n,ctx:r}}function Tp(e,t={}){let n=new Fi(e);return t.repeat===!1?(n.wrapS=o,n.wrapT=o):(n.wrapS=a,n.wrapT=a),t.srgb!==!1&&(n.colorSpace=We),n.anisotropy=t.anisotropy??16,n.minFilter=p,n.magFilter=d,n.generateMipmaps=!0,n.needsUpdate=!0,n}function Ep(e,t,n,r,i,a,o,s){let c=e.createImageData(t,n),l=c.data,[u,d,f]=Sp(r),p=s?Sp(s.color):null;for(let e=0;e<n;e++)for(let r=0;r<t;r++){let c=r/t*Math.PI*2,m=e/n*Math.PI*2,h=Math.cos(c)*a+o,g=Math.sin(c)*a+o*1.7,_=Math.cos(m)*a+o*.3,v=Math.sin(m)*a+o*2.1,y=sd(h+_,g+v,4),b=sd(h*2.7-v,g*2.7+_,3),x=(y-.5)*i+(b-.5)*i*.5,S=u*(1+x),C=d*(1+x),w=f*(1+x);if(p){let e=Y((b-.5)*2)*s.strength;S=S*(1-e)+p[0]*e,C=C*(1-e)+p[1]*e,w=w*(1-e)+p[2]*e}let T=(e*t+r)*4;l[T]=Y(S/255)*255,l[T+1]=Y(C/255)*255,l[T+2]=Y(w/255)*255,l[T+3]=255}e.putImageData(c,0,0)}function Dp(e){let{canvas:t,ctx:n}=wp(512,512),r=e.theme,i=e.palette,a=id(1234);if(r===`snow`){Ep(n,512,512,i.road,.09,.55,3.1,{color:13230834,strength:.22});for(let e=0;e<7;e++){let e=a()*512,t=40+a()*90,r=n.createLinearGradient(e-t/2,0,e+t/2,0);r.addColorStop(0,`rgba(255,255,255,0)`),r.addColorStop(.5,`rgba(240,250,255,0.13)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(e-t/2,0,t,512)}for(let e=0;e<5;e++){let e=[],t=a()*512,r=a()*512,i=(a()-.5)*1.4,o=a()<.5?-1:1,s=5+Math.floor(a()*4);for(let n=0;n<=s;n++)e.push([t,r]),t+=i*30+(a()-.5)*34,r+=o*(36+a()*40);let c=()=>{n.beginPath(),n.moveTo(e[0][0],e[0][1]);for(let t=1;t<e.length;t++)n.lineTo(e[t][0],e[t][1]);n.stroke()};if(n.lineCap=`round`,n.strokeStyle=`rgba(70,95,120,0.35)`,n.lineWidth=4.5,c(),n.strokeStyle=`rgba(235,248,255,0.55)`,n.lineWidth=1.8,c(),a()<.7){let t=1+Math.floor(a()*(e.length-2));n.beginPath(),n.moveTo(e[t][0],e[t][1]),n.lineTo(e[t][0]+(a()-.5)*70,e[t][1]+(a()-.5)*50),n.strokeStyle=`rgba(235,248,255,0.4)`,n.lineWidth=1.2,n.stroke()}}}else{Ep(n,512,512,i.road,r===`neon`?.16:.12,.9,3.1);let e=n.getImageData(0,0,512,512),t=e.data,o=r===`neon`?10:14;for(let e=0;e<t.length;e+=4){let n=(a()-.5)*o+(a()<.035?18:0);t[e]=Y((t[e]+n)/255)*255,t[e+1]=Y((t[e+1]+n)/255)*255,t[e+2]=Y((t[e+2]+n*1.05)/255)*255}n.putImageData(e,0,0);for(let e of[.27,.73]){let t=102.4,i=n.createLinearGradient(512*e-t/2,0,512*e+t/2,0);i.addColorStop(0,`rgba(255,255,255,0)`),i.addColorStop(.5,r===`neon`?`rgba(200,210,255,0.07)`:`rgba(255,255,255,0.09)`),i.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=i,n.fillRect(512*e-t/2,0,t,512)}if(r===`desert`)for(let e of[0,1]){let t=n.createLinearGradient(e===0?0:512,0,e===0?61.44:450.56,0);t.addColorStop(0,Cp(i.offroad,.32)),t.addColorStop(1,Cp(i.offroad,0)),n.fillStyle=t,n.fillRect(e===0?0:450.56,0,61.44,512)}n.globalAlpha=.16,n.fillStyle=`#000`,n.fillRect(215.04,153.6,81.92,112.64),n.globalAlpha=1}let o=Cp(i.roadStripe),s=10.24,c=17.92;n.fillStyle=o,n.globalAlpha=r===`snow`?.55:.9,n.fillRect(c,0,s,512),n.fillRect(483.84,0,s,512);let l=153.6,u=9.216;if(n.fillRect(256-u/2,25.6,u,l),n.fillRect(256-u/2,281.6,u,l),n.globalAlpha=1,r!==`snow`){n.globalAlpha=.18,n.fillStyle=Cp(i.road);for(let e=0;e<60;e++)n.fillRect(a()*512,a()*512,2+a()*6,2+a()*10);n.globalAlpha=1}let d=Tp(t),f=null;if(r===`neon`){let e=wp(512,512);e.ctx.fillStyle=`#000`,e.ctx.fillRect(0,0,512,512),e.ctx.fillStyle=Cp(i.roadStripe),e.ctx.fillRect(c,0,s,512),e.ctx.fillStyle=Cp(i.curb),e.ctx.fillRect(483.84,0,s,512),e.ctx.fillStyle=Cp(i.roadStripe),e.ctx.fillRect(256-u/2,25.6,u,l),e.ctx.fillRect(256-u/2,281.6,u,l),e.ctx.globalAlpha=.35,e.ctx.fillStyle=Cp(i.roadStripe),e.ctx.fillRect(7.6800000000000015,0,s*3,512),e.ctx.fillStyle=Cp(i.curb),e.ctx.fillRect(494.08-s*2,0,s*3,512),e.ctx.globalAlpha=1,f=Tp(e.canvas)}return{map:d,emissiveMap:f}}function Op(e,t){let{canvas:n,ctx:r}=wp(256,256);Ep(r,256,256,t,e===`snow`?.08:e===`neon`||e===`grassland`?.2:.32,1.3,7.7,e===`grassland`?{color:9423166,strength:.3}:e===`desert`?{color:12089916,strength:.3}:e===`snow`?{color:13624309,strength:.25}:void 0);let i=id(99);if(e===`grassland`){let e=r.getImageData(0,0,256,256),t=e.data;for(let e=0;e<256;e++)for(let n=0;n<256;n++){let r=n/256*Math.PI*2,i=e/256*Math.PI*2,a=Y((sd(Math.cos(r)*.9+Math.cos(i)*.9+11.3,Math.sin(r)*.9+Math.sin(i)*.9+4.2,3)-.47)*3.2)*.42,o=(e*256+n)*4;t[o]=t[o]*(1-a)+47*a,t[o+1]=t[o+1]*(1-a)+122*a,t[o+2]=t[o+2]*(1-a)+36*a}r.putImageData(e,0,0),r.globalAlpha=.55;for(let e=0;e<1400;e++)r.fillStyle=i()<.5?`rgba(170,230,80,0.6)`:`rgba(30,80,25,0.65)`,r.fillRect(i()*256,i()*256,1,2+i()*3)}else if(e===`desert`){r.globalAlpha=.18,r.strokeStyle=`rgba(90,50,20,1)`;for(let e=0;e<40;e++){r.beginPath();let t=i()*256;r.moveTo(0,t);for(let n=0;n<=256;n+=16)r.lineTo(n,t+Math.sin(n*.1+e)*4);r.stroke()}}else if(e===`snow`){r.globalAlpha=.35;for(let e=0;e<500;e++)r.fillStyle=`rgba(255,255,255,0.9)`,r.fillRect(i()*256,i()*256,1,1)}else if(e===`neon`){r.globalAlpha=.35,r.strokeStyle=`rgba(60,80,120,1)`,r.lineWidth=2;for(let e=0;e<=4;e++)r.beginPath(),r.moveTo(e*256/4,0),r.lineTo(e*256/4,256),r.stroke(),r.beginPath(),r.moveTo(0,e*256/4),r.lineTo(256,e*256/4),r.stroke()}return r.globalAlpha=1,Tp(n)}function kp(e=12,t=2){let{canvas:n,ctx:r}=wp(e*32,t*32);for(let n=0;n<t;n++)for(let t=0;t<e;t++)r.fillStyle=(t+n)%2==0?`#f4f4f4`:`#111111`,r.fillRect(t*32,n*32,32,32);return Tp(n,{repeat:!1})}function Ap(t,n){let r=1024,{canvas:i,ctx:a}=wp(r,256),o=a.createLinearGradient(0,0,r,0);t===`neon`?(o.addColorStop(0,`#12061f`),o.addColorStop(1,`#1a0b33`)):(o.addColorStop(0,`#c81e2b`),o.addColorStop(.5,`#e63946`),o.addColorStop(1,`#c81e2b`)),a.fillStyle=o,a.fillRect(0,0,r,256);for(let e=0;e<r/16;e++)for(let t=0;t<2;t++)a.fillStyle=(e+t)%2==0?`#ffffff`:`#111111`,a.fillRect(e*16,t*16,16,16),a.fillRect(e*16,256-(t+1)*16,16,16);a.textAlign=`center`,a.textBaseline=`middle`,a.font=`italic 900 96px "Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`;let s=a.measureText(e).width;return s>r*.86&&(a.font=`italic 900 ${Math.floor(96*r*.86/s)}px "Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`),a.lineWidth=12,a.strokeStyle=`rgba(0,0,0,0.85)`,a.strokeText(e,r/2,134),a.fillStyle=t===`neon`?Cp(n):`#fff7d6`,a.fillText(e,r/2,134),t===`neon`&&(a.shadowColor=Cp(n),a.shadowBlur=40,a.fillText(e,r/2,134),a.shadowBlur=0),Tp(i,{repeat:!1})}function jp(){let{canvas:e,ctx:t}=wp(512,128);t.clearRect(0,0,512,128);let n=(e,n,r,i,a)=>{t.beginPath(),t.moveTo(e+a,n),t.lineTo(e+r-a,n),t.quadraticCurveTo(e+r,n,e+r,n+a),t.lineTo(e+r,n+i-a),t.quadraticCurveTo(e+r,n+i,e+r-a,n+i),t.lineTo(e+a,n+i),t.quadraticCurveTo(e,n+i,e,n+i-a),t.lineTo(e,n+a),t.quadraticCurveTo(e,n,e+a,n),t.closePath()};n(2,2,508,124,14),t.fillStyle=`#4a4b52`,t.fill(),n(6,6,500,116,11),t.fillStyle=`#17171b`,t.fill(),t.strokeStyle=`rgba(255,255,255,0.06)`,t.lineWidth=2;for(let e=1;e<4;e++)t.beginPath(),t.moveTo(512*e/4,8),t.lineTo(512*e/4,120),t.stroke();return Tp(e,{repeat:!1})}function Mp(){let{canvas:e,ctx:t}=wp(256,256);t.clearRect(0,0,256,256);let n=30.72,r=158.72,i=t.createLinearGradient(0,235.51999999999998,0,n);return i.addColorStop(0,`#ff7a12`),i.addColorStop(.55,`#ffb020`),i.addColorStop(1,`#ffef5a`),t.fillStyle=i,t.beginPath(),t.moveTo(15.36,r),t.lineTo(128,n),t.lineTo(240.64,r),t.lineTo(240.64,235.51999999999998),t.lineTo(128,107.52),t.lineTo(15.36,235.51999999999998),t.closePath(),t.fill(),t.strokeStyle=`rgba(255,255,220,0.55)`,t.lineWidth=3,t.beginPath(),t.moveTo(15.36,r),t.lineTo(128,n),t.lineTo(240.64,r),t.stroke(),Tp(e)}function Np(){let{canvas:e,ctx:t}=wp(64,256);t.clearRect(0,0,64,256);let n=t.createLinearGradient(0,256,0,0);n.addColorStop(0,`rgba(255,150,40,0.36)`),n.addColorStop(.45,`rgba(255,170,50,0.16)`),n.addColorStop(1,`rgba(255,190,60,0)`),t.fillStyle=n,t.fillRect(0,0,64,256);let r=t.createLinearGradient(0,0,64,0);return r.addColorStop(0,`rgba(0,0,0,1)`),r.addColorStop(.2,`rgba(0,0,0,0)`),r.addColorStop(.8,`rgba(0,0,0,0)`),r.addColorStop(1,`rgba(0,0,0,1)`),t.globalCompositeOperation=`destination-out`,t.fillStyle=r,t.fillRect(0,0,64,256),t.globalCompositeOperation=`source-over`,Tp(e,{repeat:!1})}function Pp(e,t,n,r,i=!1){let a=1024,{canvas:o,ctx:s}=wp(a,256);s.fillStyle=Cp(t),s.fillRect(0,0,a,256),s.fillStyle=Cp(r);for(let e of[0,884])for(let t=0;t<3;t++)s.beginPath(),s.moveTo(e+t*46,0),s.lineTo(e+t*46+22,0),s.lineTo(e+t*46+22+60,256),s.lineTo(e+t*46+60,256),s.closePath(),s.fill();s.strokeStyle=Cp(n,.8),s.lineWidth=8,s.strokeRect(6,6,1012,244),s.textAlign=`center`,s.textBaseline=`middle`;let c=128;s.font=`italic 900 ${c}px "Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`;let l=s.measureText(e).width;return l>a*.66&&(c=Math.floor(c*a*.66/l),s.font=`italic 900 ${c}px "Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`),i&&(s.shadowColor=Cp(n),s.shadowBlur=36),s.lineWidth=10,s.strokeStyle=`rgba(0,0,0,0.6)`,s.strokeText(e,a/2,132),s.fillStyle=Cp(n),s.fillText(e,a/2,132),s.shadowBlur=0,Tp(o,{repeat:!1})}function Fp(e,t){let n=1024,{canvas:r,ctx:i}=wp(n,192);for(let e=0;e<8;e++)for(let t=0;t<n/24;t++)i.fillStyle=(t+e)%2==0?`#f4f4f4`:`#141416`,i.fillRect(t*24,e*24,24,24);let a=192*.62;return i.fillStyle=e===`neon`?`#140826`:`#c81e2b`,i.fillRect(n/2-256,96-a/2,512,a),i.strokeStyle=Cp(t),i.lineWidth=6,i.strokeRect(260,40.480000000000004,504,111.03999999999999),i.textAlign=`center`,i.textBaseline=`middle`,i.font=`900 84px "Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`,i.fillStyle=e===`neon`?Cp(t):`#fff7d6`,e===`neon`&&(i.shadowColor=Cp(t),i.shadowBlur=24),i.fillText(`START  ·  FINISH`,n/2,100),i.shadowBlur=0,Tp(r,{repeat:!1})}function Ip(e,t,n){let r=1024,{canvas:i,ctx:a}=wp(r,256);return a.fillStyle=Cp(t),a.fillRect(0,0,r,256),a.fillStyle=Cp(n,.9),a.fillRect(0,12,r,10),a.fillRect(0,234,r,10),a.textAlign=`center`,a.textBaseline=`middle`,a.font=`900 120px "Arial Black", Impact, "Helvetica Neue", Arial, sans-serif`,a.fillStyle=Cp(n),a.fillText(e,r*.5,134),Tp(i)}function Lp(e){let t=wp(256,256),n=wp(256,256);t.ctx.fillStyle=`#141420`,t.ctx.fillRect(0,0,256,256),n.ctx.fillStyle=`#000`,n.ctx.fillRect(0,0,256,256);let r=id(e),i=256/12,a=[`#ffe9a8`,`#9fe8ff`,`#ff9ad6`,`#c9b8ff`,`#ffffff`];for(let e=0;e<12;e++)for(let o=0;o<8;o++){let s=r()<.62,c=o*32+6.4,l=e*i+i*.2,u=19.2,d=i*.55;if(t.ctx.fillStyle=s?`#2a2a3a`:`#0c0c14`,t.ctx.fillRect(c,l,u,d),s){let e=a[Math.floor(r()*a.length)];n.ctx.fillStyle=e,n.ctx.globalAlpha=.5+r()*.5,n.ctx.fillRect(c,l,u,d),n.ctx.globalAlpha=1}}return{map:Tp(t.canvas),emissive:Tp(n.canvas)}}function Rp(e){let{canvas:t,ctx:n}=wp(512,256),r=[{bg:`#12042a`,a:`#ff2fd6`,b:`#00e5ff`,text:`TURBO`},{bg:`#031a2a`,a:`#00e5ff`,b:`#ffe83a`,text:`NEXUS`},{bg:`#1a0410`,a:`#ff5a5a`,b:`#ffffff`,text:`RUSH`}],i=r[e%r.length];n.fillStyle=i.bg,n.fillRect(0,0,512,256),n.strokeStyle=i.b,n.lineWidth=10,n.strokeRect(10,10,492,236),n.globalAlpha=.2,n.fillStyle=i.b;for(let e=0;e<256;e+=6)n.fillRect(0,e,512,2);return n.globalAlpha=1,n.textAlign=`center`,n.textBaseline=`middle`,n.font=`900 150px "Arial Black", Impact, Arial, sans-serif`,n.shadowColor=i.a,n.shadowBlur=30,n.fillStyle=i.a,n.fillText(i.text,256,128),n.shadowBlur=0,n.fillStyle=i.b,n.font=`700 30px Arial, sans-serif`,n.fillText(e%2==0?`KART  •  RUSH  •  NIGHT`:`DRIFT  •  BOOST  •  WIN`,256,216),Tp(t,{repeat:!1})}function zp(e){let{canvas:t,ctx:n}=wp(256,256);Ep(n,256,256,e,.22,1.1,4.4,{color:9067056,strength:.3}),n.globalAlpha=.25;let r=id(5);for(let e=0;e<14;e++){n.fillStyle=r()<.5?`rgba(80,40,20,1)`:`rgba(255,230,190,1)`;let e=r()*256;n.fillRect(0,e,256,2+r()*4)}return n.globalAlpha=1,Tp(t)}var Bp=.1;function Vp(e){let t=new Fn;t.name=`road`;let{cl:n,def:r}=e,i=n.n,a=r.theme,o=Math.max(1,Math.round(n.length/8))/n.length;{let s=new Float32Array((i+1)*2*3),c=new Float32Array((i+1)*2*3),l=new Float32Array((i+1)*2*2),u=new Uint32Array(i*6);for(let e=0;e<=i;e++){let t=e%i,r=e/i*n.length,a=n.hw[t],u=n.px[t],d=n.py[t],f=n.pz[t],p=n.bx[t],m=n.bz[t],h=n.tx[t],g=n.ty[t],_=n.tz[t],v=-m*g,y=m*h-p*_,b=p*g,x=Math.hypot(v,y,b)||1;v/=x,y/=x,b/=x;let S=e*6;s[S]=u-p*a,s[S+1]=d,s[S+2]=f-m*a,s[S+3]=u+p*a,s[S+4]=d,s[S+5]=f+m*a,c[S]=v,c[S+1]=y,c[S+2]=b,c[S+3]=v,c[S+4]=y,c[S+5]=b;let C=r*o;l[e*4]=0,l[e*4+1]=C,l[e*4+2]=1,l[e*4+3]=C}for(let e=0;e<i;e++){let t=e*2,n=t+1,r=t+2,i=t+3,a=e*6;u[a]=t,u[a+1]=n,u[a+2]=r,u[a+3]=n,u[a+4]=i,u[a+5]=r}let d=new Rr;d.setAttribute(`position`,new Cr(s,3)),d.setAttribute(`normal`,new Cr(c,3)),d.setAttribute(`uv`,new Cr(l,2)),d.setIndex(new Cr(u,1)),d.computeBoundingSphere();let f=Dp(r);hp(e,f.map),f.emissiveMap&&hp(e,f.emissiveMap);let p=new H(d,new G({map:f.map,roughness:a===`snow`?.35:a===`neon`?.55:.92,metalness:a===`snow`?.1:0,emissive:f.emissiveMap?new V(16777215):new V(0),emissiveMap:f.emissiveMap??null,emissiveIntensity:f.emissiveMap?1.6:0}));p.name=`roadSurface`,p.receiveShadow=!0,gp(e,p),t.add(p)}{let o=(i+1)*3,s=new Float32Array(o*2*3),c=new Float32Array(o*2*2),l=new Uint32Array(i*2*12),u=0;for(let e=0;e<2;e++){let t=e===0?-1:1,r=e*o;for(let e=0;e<=i;e++){let a=e%i,o=e/i*n.length,l=n.hw[a],u=n.px[a],d=n.py[a],f=n.pz[a],p=n.bx[a]*t,m=n.bz[a]*t,h=r+e*3;s[h*3]=u+p*l,s[h*3+1]=d+.03,s[h*3+2]=f+m*l,s[(h+1)*3]=u+p*(l+1),s[(h+1)*3+1]=d+Bp,s[(h+1)*3+2]=f+m*(l+1),s[(h+2)*3]=u+p*(l+1+.05),s[(h+2)*3+1]=d-.02,s[(h+2)*3+2]=f+m*(l+1+.05);let g=o/5;c[h*2]=0,c[h*2+1]=g,c[(h+1)*2]=.5,c[(h+1)*2+1]=g,c[(h+2)*2]=.5,c[(h+2)*2+1]=g}for(let e=0;e<i;e++){let n=r+e*3,i=n+3;t>0?(l[u++]=n,l[u++]=n+1,l[u++]=i,l[u++]=n+1,l[u++]=i+1,l[u++]=i,l[u++]=n+1,l[u++]=n+2,l[u++]=i+1,l[u++]=n+2,l[u++]=i+2,l[u++]=i+1):(l[u++]=n,l[u++]=i,l[u++]=n+1,l[u++]=n+1,l[u++]=i,l[u++]=i+1,l[u++]=n+1,l[u++]=i+1,l[u++]=n+2,l[u++]=n+2,l[u++]=i+1,l[u++]=i+2)}}let d=new Rr;d.setAttribute(`position`,new Cr(s,3)),d.setAttribute(`uv`,new Cr(c,2)),d.setIndex(new Cr(l,1)),d.computeVertexNormals(),d.computeBoundingSphere();let f=Hp(r.palette.curb,r.palette.curbAlt);hp(e,f);let p=new H(d,new G({map:f,roughness:.7,metalness:0,emissive:a===`neon`?new V(16777215):new V(0),emissiveMap:a===`neon`?f:null,emissiveIntensity:a===`neon`?.9:0}));p.name=`curbs`,p.receiveShadow=!0,gp(e,p),t.add(p)}{let o=(i+1)*2,s=new Float32Array(o*2*3),c=new Float32Array(o*2*2),l=new Uint32Array(i*2*6),u=0;for(let e=0;e<2;e++){let t=e===0?-1:1,r=e*o;for(let e=0;e<=i;e++){let a=e%i,o=e/i*n.length,l=n.hw[a]+1,u=n.whw[a]+.9,d=n.px[a],f=n.py[a],p=n.pz[a],m=n.bx[a]*t,h=n.bz[a]*t,g=r+e*2;s[g*3]=d+m*l,s[g*3+1]=f-.02,s[g*3+2]=p+h*l,s[(g+1)*3]=d+m*u,s[(g+1)*3+1]=f-.02,s[(g+1)*3+2]=p+h*u,c[g*2]=l*t/4,c[g*2+1]=o/4,c[(g+1)*2]=u*t/4,c[(g+1)*2+1]=o/4}for(let e=0;e<i;e++){let n=r+e*2,i=n+2;t>0?(l[u++]=n,l[u++]=n+1,l[u++]=i,l[u++]=n+1,l[u++]=i+1,l[u++]=i):(l[u++]=n,l[u++]=i,l[u++]=n+1,l[u++]=n+1,l[u++]=i,l[u++]=i+1)}}let d=new Rr;d.setAttribute(`position`,new Cr(s,3)),d.setAttribute(`uv`,new Cr(c,2)),d.setIndex(new Cr(l,1)),d.computeVertexNormals(),d.computeBoundingSphere();let f=Op(a,r.palette.offroad);hp(e,f);let p=new H(d,new G({map:f,roughness:1,metalness:0}));p.name=`shoulder`,p.receiveShadow=!0,gp(e,p),t.add(p)}{let r=1.6,i=n.hw[0],a=n.px[0],o=n.py[0],s=n.pz[0],c=n.bx[0],l=n.bz[0],u=n.tx[0],d=n.tz[0],f=Math.hypot(u,d)||1,p=u/f,m=d/f,h=new Rr,g=new Float32Array([a-c*i-p*r,o+.035,s-l*i-m*r,a+c*i-p*r,o+.035,s+l*i-m*r,a-c*i+p*r,o+.035,s-l*i+m*r,a+c*i+p*r,o+.035,s+l*i+m*r]);h.setAttribute(`position`,new Cr(g,3)),h.setAttribute(`uv`,new Cr(new Float32Array([0,0,1,0,0,1,1,1]),2)),h.setIndex([0,1,2,1,3,2]),h.computeVertexNormals();let _=kp(12,2);hp(e,_);let v=new H(h,new G({map:_,roughness:.8,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));v.name=`startLine`,v.receiveShadow=!0,gp(e,v),t.add(v)}return t}function Hp(e,t){let n=document.createElement(`canvas`);n.width=8,n.height=64;let r=n.getContext(`2d`);r&&(r.fillStyle=`#`+e.toString(16).padStart(6,`0`),r.fillRect(0,0,8,32),r.fillStyle=`#`+t.toString(16).padStart(6,`0`),r.fillRect(0,32,8,32));let i=new Fi(n);return i.wrapS=a,i.wrapT=a,i.magFilter=c,i.minFilter=p,i.colorSpace=We,i.anisotropy=8,i.needsUpdate=!0,i}function Up(e,t){let n=e.voidRanges;if(!n||n.length===0)return!1;let r=nd(t);for(let[e,t]of n)if(e<=t){if(r>=e&&r<=t)return!0}else if(r>=e||r<=t)return!0;return!1}function Wp(e,t,n){let r=e.voidRanges;if(!r)return 1/0;let i=1/0;for(let[e,a]of r)for(let r of[e,a]){let e=Math.abs(nd(t)-r);e>.5&&(e=1-e),i=Math.min(i,e*n)}return i}function Gp(e,t,n,r){let{cl:i,def:a}=e,o=[],s=Math.floor(i.length/t),c=i.length/s;for(let e=-1;e<=1;e+=2)for(let t=0;t<s;t++){let s=t*c+(e>0?c*.5:0),l=s/i.length;if(!r&&Up(a,l))continue;let u=vp(i,s),d=i.whw[u]+n;o.push({x:i.px[u]+i.bx[u]*e*d,y:i.py[u],z:i.pz[u]+i.bz[u]*e*d,heading:yp(i.tx[u],i.tz[u]),side:e,t:l,s})}return o}var Kp=new sn,qp=new It,Jp=new B,Yp=new B,Xp=new _n,Zp=new V;function Qp(e,t,n,r,i,a,o=1,s=1,c=1,l=0){Jp.set(n,r,i),Xp.set(l,a,0),qp.setFromEuler(Xp),Yp.set(o,s,c),Kp.compose(Jp,qp,Yp),e.setMatrixAt(t,Kp)}function $p(e){let t=new Fn;t.name=`barriers`;let n=e.def.theme;return n===`grassland`||n===`beach`?tm(e,t):n===`desert`||n===`volcano`?nm(e,t):n===`snow`?im(e,t):om(e,t),e.def.voidRanges&&e.def.voidRanges.length>0&&am(e,t),t}var em=1.02;function tm(e,t){let n=[];for(let e=0;e<3;e++){let t=new mo(.33,.145,4,8);t.rotateX(Math.PI/2),t.translate(e%2*.03,.145+e*.29,e===1?.03:0),n.push(t)}let r=pd(n,!1);for(let e of n)e.dispose();let i=Gp(e,em,.5,!1),a=new vi(r,new G({color:16777215,roughness:.92,metalness:0}),i.length),o=e.rng;for(let e=0;e<i.length;e++){let t=i[e];Qp(a,e,t.x,t.y,t.z,t.heading+(o()-.5)*.5,1,.96+o()*.08,1);let n=Math.floor(t.s/em);n%8==0?Zp.setHex(15329769):n%8==4?Zp.setHex(13708075):Zp.setHex(1908002).offsetHSL(0,0,(o()-.5)*.04),a.setColorAt(e,Zp)}a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),a.castShadow=!0,a.receiveShadow=!0,a.name=`tyreBarriers`,gp(e,a),t.add(a)}function nm(e,t){let n=new U(.8,.9,2),r=zp(e.def.palette.wall);hp(e,r);let i=new G({color:16777215,map:r,roughness:.95,metalness:0}),a=Gp(e,2.05,.5,!1),o=e.def.id===`dune_drift`?[[.49,.685]]:[],s=0;for(let e of a)rm(o,e.t)&&(s+=7);let c=new vi(n,i,a.length+s),l=e.rng,u=0,d=_p(e.def.palette.wall);for(let e of a){let t=rm(o,e.t)?8:1;for(let n=0;n<t;n++){let t=.95+l()*.15,r=e.heading+(l()-.5)*.06,i=+(n%2==1),a=-Math.sin(r)*i,o=-Math.cos(r)*i,s=n*.14*e.side,f=Math.cos(r)*s,p=-Math.sin(r)*s;Qp(c,u,e.x+a+f,e.y+.45+n*.9,e.z+o+p,r,1+n*.08,t,1+n*.12),Zp.copy(d).offsetHSL((l()-.5)*.02,0,(l()-.5)*.12-n*.012),c.setColorAt(u,Zp),u++}}c.count=u,c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),c.castShadow=!0,c.receiveShadow=!0,c.name=`sandstoneBarriers`,gp(e,c),t.add(c)}function rm(e,t){for(let[n,r]of e)if(t>=n&&t<=r)return!0;return!1}function im(e,t){let n=new U(.7,.9,1.35,1,1,1),r=new G({color:16777215,roughness:.12,metalness:.05,emissive:862783,emissiveIntensity:.6}),i=Gp(e,1.48,.45,!1),a=new vi(n,r,i.length),o=e.rng;for(let e=0;e<i.length;e++){let t=i[e],n=.85+o()*.3;Qp(a,e,t.x,t.y+.45*n-.02,t.z,t.heading+(o()-.5)*.1,1,n,1,(o()-.5)*.05),Zp.setHex(o()<.5?11068155:13102591).offsetHSL(0,0,(o()-.5)*.08),a.setColorAt(e,Zp)}a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),a.castShadow=!0,a.receiveShadow=!0,a.name=`iceBarriers`,gp(e,a),t.add(a)}function am(e,t){let n=new W(.07,.09,1,6);n.translate(0,.5,0),bp(n,new V(15790320));let r=new W(.085,.085,.32,6);r.translate(0,.78,0),bp(r,new V(16726832));let i=new po(.13,8,6);i.translate(0,1.08,0),bp(i,new V(16765498));let a=pd([n,r,i],!1);n.dispose(),r.dispose(),i.dispose();let{cl:o,def:s}=e,c=Gp(e,7.5,.35,!0).filter(e=>Up(s,e.t)||Wp(s,e.t,o.length)<4),l=new vi(a,new G({vertexColors:!0,roughness:.6,emissive:3346688,emissiveIntensity:.4}),c.length);for(let e=0;e<c.length;e++){let t=c[e];Qp(l,e,t.x,t.y,t.z,t.heading)}l.instanceMatrix.needsUpdate=!0,l.castShadow=!0,l.name=`warningPosts`,gp(e,l),t.add(l)}function om(e,t){let{cl:n,def:r}=e,i=new U(.16,.86,.16);i.translate(0,.43,0);let a=new G({color:1776424,roughness:.4,metalness:.7}),o=Gp(e,2.5,.4,!1),s=new vi(i,a,o.length);for(let e=0;e<o.length;e++){let t=o[e];Qp(s,e,t.x,t.y,t.z,t.heading)}s.instanceMatrix.needsUpdate=!0,s.castShadow=!0,s.name=`neonPosts`,gp(e,s),t.add(s);let c=[{y0:.76,y1:.84,col:r.palette.curb},{y0:.4,y1:.45,col:r.palette.roadStripe}],l=n.n,u=Math.floor(l/2)+1;for(let r of c){let i=new Float32Array(u*2*2*3),a=new Uint32Array((u-1)*2*6),o=0,s=0;for(let e=-1;e<=1;e+=2){let t=o;for(let t=0;t<u;t++){let a=t*2%l,s=n.whw[a]+.4,c=n.px[a]+n.bx[a]*e*s,u=n.pz[a]+n.bz[a]*e*s,d=n.py[a];i[o*3]=c,i[o*3+1]=d+r.y0,i[o*3+2]=u,i[(o+1)*3]=c,i[(o+1)*3+1]=d+r.y1,i[(o+1)*3+2]=u,o+=2}for(let e=0;e<u-1;e++){let n=t+e*2;a[s++]=n,a[s++]=n+1,a[s++]=n+2,a[s++]=n+1,a[s++]=n+3,a[s++]=n+2}}let c=new Rr;c.setAttribute(`position`,new Cr(i,3)),c.setIndex(new Cr(a,1)),c.computeVertexNormals(),c.computeBoundingSphere();let d=new H(c,new G({color:0,emissive:new V(r.col),emissiveIntensity:1.8,roughness:.4,side:2}));d.name=`neonRail`,gp(e,d),t.add(d)}}var sm=240;function cm(e){let{def:t,field:n}=e,r=t.theme,i=new co(cp,cp,sm,sm);i.rotateX(-Math.PI/2);let a=i.getAttribute(`position`),o=a.count,s=new Float32Array(o*3),c=i.getAttribute(`uv`),l=_p(t.palette.ground),u=new V,d=new V,f=_p(r===`snow`?7306122:r===`desert`?9064234:r===`neon`?1381149:7035454),p=_p(r===`snow`?16777215:r===`desert`?15251575:r===`neon`?1710118:10139738),m=_p(r===`snow`?14083829:r===`desert`?12157503:r===`neon`?657682:4160042),h=_p(r===`snow`?667721:1915482),g=_p(r===`neon`?1841704:r===`snow`?15923196:t.palette.offroad),_=e.cl.minY;for(let e=0;e<o;e++){let t=a.getX(e)+n.centerX,r=a.getZ(e)+n.centerZ,i=n.heightAt(t,r);a.setXYZ(e,t,i,r),c.setXY(e,t/6,r/6)}i.computeVertexNormals();let v=i.getAttribute(`normal`);for(let t=0;t<o;t++){let i=a.getX(t),o=a.getZ(t),c=a.getY(t),y=Y((1-v.getY(t))*2.2),b=sd(i*.015+3.3,o*.015+8.8,3);n.sampleField(i,o);let x=1-Qu(e.cl.maxWallHalfWidth+2,e.cl.maxWallHalfWidth+18,n.fDist),S=Y((c-_+6)/40);if(u.copy(m).lerp(p,S),u.lerp(l,.35),d.copy(u).offsetHSL(0,0,(b-.5)*.12),u.copy(d),u.lerp(f,y*(r===`desert`?.7:.85)),u.lerp(g,x*.55),r===`snow`){let e=Qu(16.8,31.5,_-c);u.lerp(h,e)}s[t*3]=u.r,s[t*3+1]=u.g,s[t*3+2]=u.b}i.setAttribute(`color`,new Cr(s,3)),i.computeBoundingSphere();let y=Op(r,16777215);hp(e,y);let b=new H(i,new G({vertexColors:!0,map:y,roughness:1,metalness:0}));return b.name=`terrain`,b.receiveShadow=!0,gp(e,b),b}function lm(e){let{def:t,field:n}=e,r=t.theme,i=[{radius:560,hMin:30,hMax:95,seg:96,tint:.55},{radius:700,hMin:60,hMax:170,seg:80,tint:1}],a=[],o=[],s=[],c=_p(t.environment.fogColor),l=_p(r===`snow`?16777215:r===`desert`?11561535:r===`neon`?1839664:5995932),u=_p(r===`snow`?10467538:r===`desert`?13667160:r===`neon`?919576:5208664),d=new V,f=0;for(let e of i){let t=e.seg;for(let i=0;i<=t;i++){let s=i/t*Math.PI*2,f=sd(Math.cos(s)*3+e.radius*.01,Math.sin(s)*3,3),p=Zu(e.hMin,e.hMax,f);r===`neon`?p=Math.round(p/12)*12+(i%2==0?10:0):p*=.8+.4*sd(s*6.3,e.radius,2);let m=e.radius*(.96+.08*sd(s*2,5,2)),h=n.centerX+Math.cos(s)*m,g=n.centerZ+Math.sin(s)*m;a.push(h,-40,g),d.copy(c).lerp(u,.3*e.tint),o.push(d.r,d.g,d.b),a.push(h,p,g);let _=r===`snow`?.35:r===`grassland`?.8:1.1,v=Y(p/e.hMax);d.copy(u).lerp(l,Qu(_-.3,_+.2,v)),d.lerp(c,.25*(1.2-e.tint)),o.push(d.r,d.g,d.b)}for(let e=0;e<t;e++){let t=f+e*2,n=t+1,r=t+2,i=t+3;s.push(t,r,n,n,r,i)}f+=(t+1)*2}let p=new Rr;p.setAttribute(`position`,new Er(a,3)),p.setAttribute(`color`,new Er(o,3)),p.setIndex(s),p.computeVertexNormals(),p.computeBoundingSphere();let m=new H(p,new Do({vertexColors:!0,side:2}));return m.name=`mountains`,gp(e,m),m}var um=1500,dm=`
varying vec3 vWorldDir;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldDir = wp.xyz - cameraPosition;
  vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  // Force the dome onto the far plane so it is never clipped by the camera far distance.
  clip.z = clip.w * 0.999999;
  gl_Position = clip;
}
`,fm=`
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uBottom;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunSize;
uniform float uSunGlow;
uniform float uNight;
varying vec3 vWorldDir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

void main() {
  vec3 d = normalize(vWorldDir);
  float y = d.y;
  vec3 col;
  if (y >= 0.0) {
    float k = pow(clamp(y, 0.0, 1.0), 0.55);
    col = mix(uHorizon, uTop, k);
  } else {
    float k = pow(clamp(-y, 0.0, 1.0), 0.6);
    col = mix(uHorizon, uBottom, k);
  }
  // horizon glow band
  col += uHorizon * exp(-abs(y) * 9.0) * 0.18;

  // sun / moon disc with halo
  float sd = dot(d, uSunDir);
  float disc = smoothstep(uSunSize - 0.0012, uSunSize + 0.0004, sd);
  col += uSunColor * disc * (2.2 - uNight * 1.2);
  col += uSunColor * pow(max(sd, 0.0), 90.0) * 0.55 * uSunGlow;
  col += uSunColor * pow(max(sd, 0.0), 6.0) * 0.14 * uSunGlow;

  // procedural stars (night only)
  if (uNight > 0.5) {
    vec2 sph = vec2(atan(d.z, d.x), asin(clamp(y, -1.0, 1.0)));
    vec2 g = sph * 95.0;
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float h = hash(cell);
    float h2 = hash(cell + 17.0);
    vec2 sp = vec2(hash(cell + 3.1), hash(cell + 7.7)) * 0.7 + 0.15;
    float dist = length(f - sp);
    float star = smoothstep(0.13, 0.0, dist) * step(0.74, h) * (0.4 + 0.6 * h2);
    star *= smoothstep(0.0, 0.25, y);
    col += vec3(0.75 + 0.25 * h2, 0.82, 1.0) * star * 1.6;
  }
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function pm(e){let t=new Fn;t.name=`sky`;let n=e.def.environment,r=e.def.theme,i=r===`neon`,a=e.field.centerX,o=e.field.centerZ,s=new B(n.sunDirection.x,n.sunDirection.y,n.sunDirection.z).normalize(),c=i?1.7:r===`desert`?4.2:2.6,l=new H(new po(um,40,20),new wo({uniforms:{uTop:{value:new V(n.skyTop)},uHorizon:{value:new V(n.skyHorizon)},uBottom:{value:new V(n.skyBottom)},uSunDir:{value:s},uSunColor:{value:new V(n.sunColor)},uSunSize:{value:Math.cos(Ft.degToRad(c))},uSunGlow:{value:i?.5:r===`desert`?1.6:1},uNight:{value:+!!i}},vertexShader:dm,fragmentShader:fm,side:1,depthWrite:!1,depthTest:!1,fog:!1}));return l.position.set(a,0,o),l.renderOrder=-1e3,l.frustumCulled=!1,l.name=`skyDome`,gp(e,l),t.add(l),t}var mm=new sn,hm=new It,gm=new B,_m=new B,vm=new _n,ym=new V;function bm(e){let t=e.map(e=>{let t=xp(e.geo);return e.keepColor&&t.getAttribute(`color`)||bp(t,e.color instanceof V?e.color:new V(e.color)),t}),n=pd(t,!1);for(let e of t)e.dispose();if(!n)throw Error(`mergeParts failed`);return n.computeBoundingSphere(),n}function xm(e,t,n,r,i){let{cl:a,field:o,rng:s}=e,c=[],l=r+10,u=a.minX-l,d=a.maxX+l,f=a.minZ-l,p=a.maxZ+l,m=a.px[0],h=a.pz[0],g=a.maxWallHalfWidth+3+n,_=0;for(;c.length<t&&_<t*60;){_++;let e=Zu(u,d,s()),t=Zu(f,p,s()),n=o.distanceToTrack(e,t);if(n<g||n>r)continue;let a=e-m,l=t-h;a*a+l*l<3025||i&&i(e,t)||c.push({x:e,y:o.heightAt(e,t),z:t})}return c}function Sm(e,t,n,r,i,a=0,o=0,s,c=!1){for(let l=0;l<t.length;l++){let u=t[l],d=Zu(r,i,n());gm.set(u.x,u.y+a,u.z),vm.set((n()-.5)*o,n()*Math.PI*2,(n()-.5)*o),hm.setFromEuler(vm),c?_m.set(d*Zu(.7,1.3,n()),d*Zu(.6,1.4,n()),d*Zu(.7,1.3,n())):_m.set(d,d,d),mm.compose(gm,hm,_m),e.setMatrixAt(l,mm),s&&e.setColorAt(l,s(n))}e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}function Cm(e,t,n,r,i,a=!0){let o=new vi(t,n,r);return o.name=i,o.castShadow=a,o.receiveShadow=a,gp(e,o),o}var wm=(e={})=>new G({vertexColors:!0,roughness:.85,metalness:0,...e});function Tm(e){let t=new Fn;switch(t.name=`decor`,e.def.theme){case`desert`:case`volcano`:Dm(e,t);break;case`snow`:Om(e,t);break;case`neon`:km(e,t);break;default:Em(e,t)}return t}function Em(e,t){let n=e.rng,r=new W(.3,.46,3.2,7);r.translate(0,1.6,0);let i=new so(2.7,1);i.scale(1,1.12,1),i.translate(0,5.3,0);let a=new so(1.7,1);a.translate(1.4,6.4,.6);let o=new so(1.4,1);o.translate(-1.3,6,-.8);let s=bm([{geo:r,color:7031339},{geo:i,color:4165430},{geo:a,color:5219134},{geo:o,color:3836468}]),c=xm(e,200,4,220),l=Cm(e,s,wm(),c.length,`trees`);Sm(l,c,n,.8,1.25,-.15,.06,e=>ym.setHSL(.3+(e()-.5)*.06,.55,.42+(e()-.5)*.15)),t.add(l);let u=new W(.22,.36,3.4,6);u.translate(0,1.7,0);let d=new Vi(1.7,7.2,8);d.translate(0,6.2,0);let f=new Vi(1.2,4.2,8);f.translate(0,8.3,0);let p=bm([{geo:u,color:6177575},{geo:d,color:3111475},{geo:f,color:3836476}]),m=xm(e,90,6,230),h=Cm(e,p,wm(),m.length,`poplars`);Sm(h,m,n,.75,1.1,-.15,.04,e=>ym.setHSL(.32+(e()-.5)*.05,.5,.4+(e()-.5)*.12)),t.add(h);let g=bm([{geo:new so(.9,1).scale(1.2,.8,1.2),color:4033071}]),_=xm(e,200,.5,90),v=Cm(e,g,wm(),_.length,`bushes`);Sm(v,_,n,.9,1.9,.2,.2,e=>ym.setHSL(.28+(e()-.5)*.08,.6,.38+(e()-.5)*.12),!0),t.add(v);let y=[16735650,16767290,16777215,16747066,11889919,16731501],b=[];for(let e=0;e<9;e++){let t=e/9*Math.PI*2+e%2*.3,n=e<3?.18:.45+e%3*.22,r=new W(.02,.028,.5,3,1,!0);r.translate(Math.cos(t)*n,.25,Math.sin(t)*n);let i=new so(.13,0);i.translate(Math.cos(t)*n,.54,Math.sin(t)*n),b.push({geo:r,color:4165430},{geo:i,color:y[e*2%y.length]})}let x=bm(b),S=xm(e,340,0,18).concat(xm(e,120,18,60)),C=Cm(e,x,wm({roughness:.6}),S.length,`flowers`,!1);Sm(C,S,n,1.1,1.9,0,0),C.castShadow=!1,t.add(C)}function Dm(e,t){let n=e.rng,r=new W(.36,.46,4.4,8);r.translate(0,2.2,0);let i=new po(.36,8,6);i.translate(0,4.4,0);let a=new W(.22,.24,1.5,7);a.rotateZ(Math.PI/2),a.translate(-.9,2.3,0);let o=new W(.22,.22,1.6,7);o.translate(-1.55,3,0);let s=new po(.22,7,5);s.translate(-1.55,3.8,0);let c=new W(.2,.22,1.2,7);c.rotateZ(Math.PI/2),c.translate(.75,1.7,.1);let l=new W(.2,.2,1.3,7);l.translate(1.3,2.25,.1);let u=new po(.2,7,5);u.translate(1.3,2.9,.1);let d=5214021,f=bm([{geo:r,color:d},{geo:i,color:6202193},{geo:a,color:d},{geo:o,color:d},{geo:s,color:6202193},{geo:c,color:d},{geo:l,color:d},{geo:u,color:6202193}]);f.scale(1.4,1.4,1.4);let p=xm(e,150,1,160),m=Cm(e,f,wm({roughness:.75}),p.length,`cacti`);Sm(m,p,n,.9,1.35,-.1,.06,e=>ym.setHSL(.3+(e()-.5)*.05,.4,.36+(e()-.5)*.1)),t.add(m);let h=bm([{geo:new Ui(1.1,0),color:11565642}]),g=xm(e,220,.5,200),_=Cm(e,h,wm({roughness:1}),g.length,`rocks`);Sm(_,g,n,.7,3.4,-.4,.6,e=>ym.setHSL(.07+(e()-.5)*.03,.45,.42+(e()-.5)*.18),!0),t.add(_);let v=new W(.22,.34,6.5,7);v.translate(0,3.25,0);let y=[{geo:v,color:8018490}];for(let e=0;e<8;e++){let t=e/8*Math.PI*2,n=new co(.7,3.4,1,3),r=n.getAttribute(`position`);for(let e=0;e<r.count;e++){let t=(r.getY(e)+1.7)/3.4;r.setY(e,-t*t*1.4),r.setZ(e,t*3.2),r.setX(e,r.getX(e)*(1-t*.7))}n.rotateY(t),n.translate(0,6.6,0),y.push({geo:n,color:e%2==0?4165434:5220420})}let b=bm(y);b.scale(1.25,1.25,1.25);let x=xm(e,70,.5,60),S=Cm(e,b,wm({side:2,roughness:.7}),x.length,`palms`);Sm(S,x,n,.85,1.3,-.15,.1),t.add(S)}function Om(e,t){let n=e.rng,r=new W(.18,.26,1.4,6);r.translate(0,.7,0);let i=new Vi(1.6,2.8,7);i.translate(0,2.3,0);let a=new Vi(1.2,2.3,7);a.translate(0,3.7,0);let o=new Vi(.8,1.9,7);o.translate(0,5,0);let s=new Vi(.45,.9,7);s.translate(0,5.8,0);let c=bm([{geo:r,color:5913894},{geo:i,color:2054714},{geo:a,color:2452036},{geo:o,color:2914894},{geo:s,color:16055039}]),l=xm(e,260,2,240,(t,n)=>e.field.heightAt(t,n)<e.cl.minY-8),u=Cm(e,c,wm(),l.length,`pines`);Sm(u,l,n,.8,1.7,-.1,.06,e=>ym.setHSL(.4,.3,.5+(e()-.5)*.2)),t.add(u);let d=new po(.8,10,8);d.translate(0,.75,0);let f=new po(.58,10,8);f.translate(0,1.95,0);let p=new po(.42,10,8);p.translate(0,2.8,0);let m=new Vi(.08,.5,6);m.rotateX(-Math.PI/2),m.translate(0,2.85,-.6);let h=new W(.28,.28,.45,8);h.translate(0,3.35,0);let g=new W(.45,.45,.06,8);g.translate(0,3.14,0);let _=new mo(.42,.09,6,12);_.rotateX(Math.PI/2),_.translate(0,2.4,0);let v=bm([{geo:d,color:16777215},{geo:f,color:16777215},{geo:p,color:16777215},{geo:m,color:16742938},{geo:h,color:1447446},{geo:g,color:1447446},{geo:_,color:14692400}]),y=xm(e,45,.5,45,(t,n)=>e.field.heightAt(t,n)<e.cl.minY-8),b=Cm(e,v,wm({roughness:.7}),y.length,`snowmen`);Sm(b,y,n,.7,1.1,-.1,.05),t.add(b);let x=bm([{geo:new Vi(.6,3.6,5),color:12118271}]);x.translate(0,1.6,0);let S=xm(e,170,.5,120,(t,n)=>e.field.heightAt(t,n)<e.cl.minY-8),C=Cm(e,x,wm({roughness:.15,metalness:.1,emissive:731709,emissiveIntensity:.5}),S.length,`iceSpikes`);Sm(C,S,n,.5,1.8,-.2,.5,e=>ym.setHSL(.55,.5,.75+(e()-.5)*.2),!0),t.add(C)}function km(e,t){let n=e.rng,{field:r}=e,i=Lp(77);hp(e,i.map,i.emissive);let a=[],o=xm(e,130,22,300);for(let e of o){let t=Zu(10,26,n()),i=Zu(10,26,n()),o=Zu(18,95,n()**1.6),s=new U(t,o,i),c=s.getAttribute(`uv`),l=[[i,o],[i,o],[t,i],[t,i],[t,o],[t,o]];for(let e=0;e<6;e++){let[t,n]=l[e];for(let r=e*4;r<e*4+4;r++){let i=e===2||e===3;c.setXY(r,i?0:c.getX(r)*t/3.2,i?0:c.getY(r)*n/3.6)}}s.translate(e.x,r.heightAt(e.x,e.z)+o/2-.5,e.z),s.rotateY(0),a.push(xp(s))}let s=pd(a,!1);for(let e of a)e.dispose();if(s){s.computeBoundingSphere();let n=new H(s,new G({map:i.map,emissive:16777215,emissiveMap:i.emissive,emissiveIntensity:1.3,roughness:.6,metalness:.3}));n.name=`skyscrapers`,n.castShadow=!0,n.receiveShadow=!0,gp(e,n),t.add(n)}let c=bm([{geo:new U(.6,13,.6).translate(0,6.5,0),color:1842218}]),l=xm(e,150,1,70),u=Cm(e,c,wm({roughness:.4,metalness:.7}),l.length,`pylons`);Sm(u,l,n,.8,1.4,-.1,0),t.add(u);let d=new U(.9,.5,.9),f=new G({color:0,emissive:16777215,emissiveIntensity:2}),p=Cm(e,d,f,l.length,`pylonCaps`,!1);for(let t=0;t<l.length;t++)u.getMatrixAt(t,mm),mm.decompose(gm,hm,_m),gm.y+=13*_m.y,mm.compose(gm,hm,_m),p.setMatrixAt(t,mm),p.setColorAt(t,ym.setHex(t%2==0?e.def.palette.curb:e.def.palette.roadStripe));p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),t.add(p),e.updaters.push((e,t)=>{f.emissiveIntensity=1.4+Math.sin(t*2.2)*.6+(Math.sin(t*9.1)>.92?1.2:0)});let m=xm(e,36,2,60),h=Cm(e,bm([{geo:new W(.18,.22,8,6).translate(0,4,0),color:2105392}]),wm({roughness:.5,metalness:.6}),m.length,`billboardPoles`);Sm(h,m,n,1,1,-.1,0),t.add(h);let g=new co(8,4);g.translate(0,10,0);let _=[];for(let i=0;i<2;i++){let a=Rp(i);hp(e,a);let o=new G({map:a,emissive:16777215,emissiveMap:a,emissiveIntensity:1.5,side:2,roughness:.5});_.push(o);let s=m.filter((e,t)=>t%2===i),c=Cm(e,g,o,s.length,`billboards${i}`,!1);for(let e=0;e<s.length;e++){let t=s[e],i=r.centerX,a=r.centerZ,o=Math.atan2(i-t.x,a-t.z)+(n()-.5)*.6;gm.set(t.x,t.y,t.z),vm.set(0,o,0),hm.setFromEuler(vm),_m.set(1,1,1),mm.compose(gm,hm,_m),c.setMatrixAt(e,mm)}c.instanceMatrix.needsUpdate=!0,t.add(c)}e.updaters.push((e,t)=>{_[0].emissiveIntensity=1.2+.5*Math.sin(t*3.1)+(Math.sin(t*17.3)>.97?-.9:0),_[1].emissiveIntensity=1.2+.5*Math.sin(t*2.3+1.5)+(Math.sin(t*13.7+2)>.97?-.9:0)})}var Am=new sn,jm=new It,Mm=new B,Nm=new B(1,1,1),Pm=new _n,Fm=new V,Im=3.5,Lm=1;function Rm(e,t){let n=e.cl,r=vp(n,t),i=Math.hypot(n.tx[r],n.tz[r])||1,a=n.tx[r]/i,o=n.tz[r]/i;return{x:n.px[r],y:n.py[r],z:n.pz[r],fx:a,fz:o,rx:n.bx[r],rz:n.bz[r],hw:n.hw[r],whw:n.whw[r],heading:yp(a,o)}}function zm(e){switch(e){case`desert`:case`volcano`:return[{text:`NITRO COLA`,bg:9051935,fg:16773840,accent:16757575},{text:`DUNE DRIFT GP`,bg:2824722,fg:16765562,accent:13062191},{text:`SCORPION OIL`,bg:1842204,fg:16769658,accent:14262620}];case`snow`:return[{text:`GLACIER GRIP TYRES`,bg:1194598,fg:16777215,accent:10474495},{text:`FROSTBITE FALLS`,bg:16777215,fg:2051978,accent:3108789},{text:`POLAR PLUS ENERGY`,bg:861504,fg:12576511,accent:16777215}];case`neon`:return[{text:`NEXUS NETWORKS`,bg:721944,fg:58879,accent:16723926},{text:`VOLT KART BATTERIES`,bg:1182242,fg:16723926,accent:58879},{text:`HOLO-DRIVE`,bg:399906,fg:16771130,accent:58879}];default:return[{text:`TURBO TYRES`,bg:1842210,fg:16777215,accent:14165803},{text:`KART FM 101`,bg:2052008,fg:16769354,accent:16777215},{text:`NITRO COLA`,bg:13114923,fg:16773840,accent:16777215}]}}function Bm(e){let t=new Fn;t.name=`grandstands`;let n=e.def.theme,r=e.rng,i=1.9,a=Rm(e,16),o=n===`neon`,s=new V(o?2757712:n===`desert`?12080426:n===`snow`?3108789:13116460),c=new V(o?1710630:10132128),l=new V(o?2364986:n===`desert`?14725232:n===`snow`?4030404:14170682),u=new V(o?1714756:n===`desert`?12614216:n===`snow`?14675711:15790320),d=[],f=[],p=a.whw+3.2;for(let e=-1;e<=1;e+=2){for(let t=0;t<6;t++){let n=e*(p+i*(t+.5)),a=1.05*(t+1),o=new U(i,a,66);o.translate(n,a/2,0),d.push({geo:o,color:t%2==0?c:c.clone().offsetHSL(0,0,-.06)});let s=new U(.5,.12,66);s.translate(e*(p+i*t+.3),a+.06,0),d.push({geo:s,color:t%2==0?l:u});for(let t=0;t<82;t++)r()<.1||f.push({lat:n+e*(r()-.5)*.5,along:-32.5+t*.8+(r()-.5)*.3,y:a})}let t=new U(.3,1.25,66.6);t.translate(e*(p-.15),.625,0),d.push({geo:t,color:s});let n=new U(.4,7.500000000000001,66.6);n.translate(e*(p+i*6+.2),7.500000000000001/2,0),d.push({geo:n,color:c.clone().offsetHSL(0,0,-.1)});let a=new U(13.899999999999999,.3,68);a.rotateZ(-e*.06),a.translate(e*(p+i*6/2+.2),10.9,0),d.push({geo:a,color:s.clone().offsetHSL(0,0,-.12)});let m=new U(.25,.9,68);m.translate(e*(p-.9),11.1,0),d.push({geo:m,color:o?58879:16053492});for(let t=0;t<6;t++){let n=new W(.18,.18,11.5,6);n.translate(e*(p+i*6+.6),11.5/2,-33+t/5*66),d.push({geo:n,color:c.clone().offsetHSL(0,0,-.2)})}for(let t of[-1,1]){let n=19.9,r=new W(.22,.34,n,6),a=e*(p+i*6+2.2),o=t*35.5;r.translate(a,n/2,o),d.push({geo:r,color:6974066});let s=new U(2.6,1.2,.5);s.translate(a-e*.6,20.299999999999997,o),d.push({geo:s,color:2763312})}}let m=new H(bm(d),new G({vertexColors:!0,roughness:.85}));m.castShadow=!0,m.receiveShadow=!0,m.name=`grandstandStructure`,gp(e,m),Pm.set(0,a.heading,0),m.quaternion.setFromEuler(Pm),m.position.set(a.x,a.y,a.z),t.add(m);{let n=new vi(new U(2.3,.7,.2),new G({color:16777215,emissive:16774358,emissiveIntensity:o?2.2:1.1,roughness:.3}),4),r=0;for(let e=-1;e<=1;e+=2)for(let t of[-1,1]){let o=e*(p+i*6+2.2)-e*.6,s=t*35.5;Mm.set(a.x+a.rx*o-a.fx*s,a.y+19.9+.4,a.z+a.rz*o-a.fz*s),Pm.set(.35*e,a.heading+(e>0?Math.PI/2:-Math.PI/2),0),jm.setFromEuler(Pm),Nm.set(1,1,1),Am.compose(Mm,jm,Nm),n.setMatrixAt(r++,Am)}n.instanceMatrix.needsUpdate=!0,n.name=`floodlights`,gp(e,n),t.add(n)}{let r=zm(n),i=new co(14,1.05);e.disposables.push(i);for(let n=0;n<r.length;n++){let s=r[n],c=Pp(s.text,s.bg,s.fg,s.accent,o);hp(e,c);let l=new G({map:c,roughness:.6,emissive:o?new V(16777215):new V(0),emissiveMap:o?c:null,emissiveIntensity:o?.9:0});e.disposables.push(l);for(let e=-1;e<=1;e+=2){let r=new H(i,l),o=(n-1)*20,s=e*(p-.32);r.position.set(a.x+a.rx*s-a.fx*o,a.y+.66,a.z+a.rz*s-a.fz*o),Pm.set(0,a.heading+(e>0?-Math.PI/2:Math.PI/2),0),r.quaternion.setFromEuler(Pm),r.name=`sponsorBoard`,t.add(r)}}}let h=new U(.42,.8,.3);h.translate(0,.4,0);let g=new po(.16,6,4);g.translate(0,.95,0);let _=bm([{geo:h,color:16777215},{geo:g,color:15845797}]),v=new Float32Array(f.length);for(let e=0;e<v.length;e++)v[e]=r()*Math.PI*2;_.setAttribute(`aPhase`,new ui(v,1));let y=new G({vertexColors:!0,roughness:.9}),b=e.timeUniform;y.onBeforeCompile=e=>{e.uniforms.uTime=b,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;
attribute float aPhase;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
float bob = max(0.0, sin(uTime * 5.5 + aPhase)) * 0.28 * step(0.02, position.y);
transformed.y += bob;`)},y.customProgramCacheKey=()=>`tkr-crowd-bob`;let x=new vi(_,y,f.length);x.name=`crowd`,x.castShadow=!1;let S=[16731469,5089023,16767053,7077739,16751162,16777215,13134847,3200456];for(let e=0;e<f.length;e++){let t=f[e];Mm.set(a.x+a.rx*t.lat-a.fx*t.along,a.y+t.y,a.z+a.rz*t.lat-a.fz*t.along),Pm.set(0,a.heading+(t.lat>0?Math.PI/2:-Math.PI/2)+(r()-.5)*.5,0),jm.setFromEuler(Pm);let n=.9+r()*.25;Nm.set(n,n,n),Am.compose(Mm,jm,Nm),x.setMatrixAt(e,Am),x.setColorAt(e,Fm.setHex(S[Math.floor(r()*S.length)]))}return x.instanceMatrix.needsUpdate=!0,x.instanceColor&&(x.instanceColor.needsUpdate=!0),gp(e,x),t.add(x),t}function Vm(e){let t=new Fn;t.name=`gantry`;let n=e.def.theme,r=n===`neon`,i=Rm(e,0),a=i.hw*2+5.2,o=9.2,s=r?2105390:15263982,c=[];for(let e of[-1,1]){for(let t of[-.42,.42])for(let n of[-.42,.42]){let r=new U(.16,o,.16);r.translate(e*a/2+t,o/2,n),c.push({geo:r,color:s})}for(let t=1;t<6;t++){let n=t/6*o,r=new U(1,.1,1);r.translate(e*a/2,n,0),c.push({geo:r,color:s})}let t=new U(1.6,.4,1.6);t.translate(e*a/2,.2,0),c.push({geo:t,color:3816e3})}let l=new U(a+1,2.2,1.1).translate(0,8.299999999999999,0);c.push({geo:l,color:r?1315871:2829104});for(let t of[-.62,.62])c.push({geo:new U(a+1,.14,.14).translate(0,9.5,t),color:r?e.def.palette.curb:13708075}),c.push({geo:new U(a+1,.14,.14).translate(0,7.1,t),color:r?e.def.palette.roadStripe:13708075});let u=Math.max(4,Math.round(a/2.2));for(let e=0;e<=u;e++){let t=-a/2-.5+e/u*(a+1);c.push({geo:new U(.1,2.5,.1).translate(t,8.299999999999999,.62),color:s}),c.push({geo:new U(.1,2.5,.1).translate(t,8.299999999999999,-.62),color:s})}let d=new U(5.2,.9,.6).translate(0,6.699999999999999,0);c.push({geo:d,color:1710622});let f=new H(bm(c),new G({vertexColors:!0,roughness:.45,metalness:.5}));f.castShadow=!0,f.receiveShadow=!0,f.name=`gantryStructure`,gp(e,f),t.add(f);let p=Fp(n,e.def.palette.roadStripe);hp(e,p);let m=new Yr({map:p,toneMapped:!r}),h=new co(a-.6,1.9),g=new H(h,m);g.position.set(0,8.299999999999999,.57);let _=new H(h,m);_.rotation.y=Math.PI,_.position.set(0,8.299999999999999,-.57),e.disposables.push(h,m),t.add(g,_);let v=Ap(n,e.def.palette.roadStripe);hp(e,v);let y=new Yr({map:v,toneMapped:!r,side:2}),b=new co(a*.62,a*.62*.25),x=new H(b,y);x.position.set(0,9.6+a*.62*.25/2,0),e.disposables.push(b,y),t.add(x);let S=new po(.26,10,8),C=new G({color:16777215,emissive:16777215,emissiveIntensity:1.4,roughness:.3,vertexColors:!1}),w=new vi(S,C,5);for(let e=0;e<5;e++)Mm.set(-2+e*1,6.699999999999999,.35),Pm.set(0,0,0),jm.setFromEuler(Pm),Nm.set(1,1,1),Am.compose(Mm,jm,Nm),w.setMatrixAt(e,Am),w.setColorAt(e,Fm.setHex(e<2?16726832:e<4?16756768:4063082));if(w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0),w.name=`startLights`,gp(e,w),t.add(w),e.updaters.push((e,t)=>{C.emissiveIntensity=1.1+.5*(.5+.5*Math.sin(t*2.4))}),r){let n=new H(new U(a+1.2,.12,.12).translate(0,9.7,0),new G({color:0,emissive:new V(e.def.palette.curb),emissiveIntensity:2}));gp(e,n),t.add(n)}else{let n=new vi(bm([{geo:new W(.04,.04,1.2,5).translate(0,.6,0),color:14540253},{geo:new co(.7,.45).translate(.37,1,0),color:16765498}]),new G({vertexColors:!0,side:2,roughness:.8}),9);for(let e=0;e<9;e++)Mm.set(-a/2+e/8*a,9.6,.62),Pm.set(0,0,0),jm.setFromEuler(Pm),Nm.set(1,1,1),Am.compose(Mm,jm,Nm),n.setMatrixAt(e,Am),n.setColorAt(e,Fm.setHex(e%2==0?16777215:16728128));n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0),gp(e,n),t.add(n)}return Pm.set(0,i.heading,0),t.quaternion.setFromEuler(Pm),t.position.set(i.x,i.y,i.z),t}function Hm(e){let t=new Fn;t.name=`sponsorBridges`;let n=e.def.theme,r=n===`neon`,i=zm(n),a=[92,e.cl.length*(e.def.voidRanges&&e.def.voidRanges.length?.72:.55)],o=r?1842218:14211294,s=[],c=new co(1,1);e.disposables.push(c),a.forEach((n,a)=>{let l=Rm(e,n),u=l.whw*2+3,d=7.4,f=[];for(let e of[-1,1])f.push({geo:new U(.55,d,.55).translate(e*u/2,d/2,0),color:o}),f.push({geo:new U(1.4,.35,1.4).translate(e*u/2,.17,0),color:3816e3});f.push({geo:new U(u+.55,.35,.9).translate(0,7.23,0),color:o}),f.push({geo:new U(u+.55,.35,.9).translate(0,5.050000000000001,0),color:o});for(let e=0;e<=8;e++){let t=-u/2+e/8*u;f.push({geo:new U(.1,2,.1).translate(t,6.140000000000001,.35),color:o}),f.push({geo:new U(.1,2,.1).translate(t,6.140000000000001,-.35),color:o})}Pm.set(0,l.heading,0),jm.setFromEuler(Pm),Mm.set(l.x,l.y,l.z),Nm.set(1,1,1),Am.compose(Mm,jm,Nm);for(let e of f)e.geo.applyMatrix4(Am),s.push(e);let p=i[(a+1)%i.length],m=Pp(p.text,p.bg,p.fg,p.accent,r);hp(e,m);let h=new G({map:m,roughness:.6,emissive:r?new V(16777215):new V(0),emissiveMap:r?m:null,emissiveIntensity:+!!r});e.disposables.push(h);for(let e of[1,-1]){let n=new H(c,h);n.scale.set(u-1.2,1.8,1),n.position.set(0,6.140000000000001,e*.42),e<0&&(n.rotation.y=Math.PI);let r=new Fn;r.quaternion.copy(jm),r.position.copy(Mm),r.add(n),n.name=`sponsorBridgeBanner`,t.add(r)}});let l=new H(bm(s),new G({vertexColors:!0,roughness:.5,metalness:.4}));return l.castShadow=!0,l.receiveShadow=!0,l.name=`sponsorBridgeStructure`,gp(e,l),t.add(l),t}function Um(e,t,n,r,i,a,o,s,c,l,u){let d=t.length/3;for(let r=0;r<=u;r++){let d=Rm(e,Zu(a,o,r/u)),f=s(d);t.push(d.x-d.rx*f,d.y+c,d.z-d.rz*f,d.x+d.rx*f,d.y+c,d.z+d.rz*f);let p=r/u*l;n.push(0,p,1,p),i.push(0,1,0,0,1,0)}for(let e=0;e<u;e++){let t=d+e*2;r.push(t,t+1,t+2,t+1,t+3,t+2)}}function Wm(e,t,n,r){let i=new Rr;return i.setAttribute(`position`,new Er(e,3)),i.setAttribute(`uv`,new Er(t,2)),i.setAttribute(`normal`,new Er(r,3)),i.setIndex(n),i.computeBoundingSphere(),i}function Gm(e,t){let{cl:n,def:r}=e;if(r.boostPads.length===0)return null;let i=new Fn;i.name=`boostPads`;let a=Im/2,o=.28,s=[],c=[],l=[],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[];for(let i of r.boostPads){let r=i*n.length,y=Rm(e,r),b=Math.max(3,y.hw-Lm);Um(e,s,c,l,u,r-a,r+a,()=>b,.03,1,4),Um(e,d,f,p,m,r-a+o,r+a-o,()=>b-o,.045,3,4),Um(e,h,g,_,v,r+a,r+a+7,()=>b*.9,.02,1,6),t.push({position:new B(y.x,y.y,y.z),forward:new B(y.fx,0,y.fz).normalize(),halfWidth:b})}let y=jp();hp(e,y);let b=new G({map:y,transparent:!0,roughness:.55,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),x=new H(Wm(s,c,l,u),b);x.name=`boostPadBase`,x.receiveShadow=!0,x.renderOrder=2,gp(e,x),i.add(x);let S=Np();hp(e,S);let C=new Yr({map:S,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),w=new H(Wm(h,g,_,v),C);w.name=`boostPadTrail`,w.renderOrder=1,gp(e,w),i.add(w);let T=Mp();hp(e,T);let E=new G({map:T,transparent:!0,depthWrite:!1,emissive:16777215,emissiveMap:T,emissiveIntensity:1.2,roughness:.4,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),D=new H(Wm(d,f,p,m),E);return D.name=`boostPadChevrons`,D.renderOrder=3,gp(e,D),i.add(D),e.updaters.push((e,t)=>{T.offset.y-=e*2,T.offset.y<-1e3&&(T.offset.y+=1e3),E.emissiveIntensity=1.2+Math.sin(t*5)*.12}),i}function Km(e,t){let{cl:n,def:r}=e,i=[];for(let a of r.itemBoxRows){let r=Rm(e,a*n.length),o=r.hw*.8;for(let e=0;e<t;e++){let n=t===1?0:Zu(-o,o,e/(t-1));i.push(new B(r.x+r.rx*n,r.y+1,r.z+r.rz*n))}}return i}function qm(e){let t=new Fn;switch(t.name=`animated`,e.def.theme){case`grassland`:case`beach`:Ym(e,t,15986918,9132587),Xm(e,t,2,[16731469,16767053,5089023]);break;case`desert`:case`volcano`:Ym(e,t,12171716,5921382),Xm(e,t,2,[16747066,16769658,13126186]);break;case`snow`:$m(e,t),Xm(e,t,1,[5089023,16777215,16731469]);break;case`neon`:eh(e,t)}return t}function Jm(e,t,n,r){let i=e.cl,a=Math.floor((t%1+1)%1*i.n)%i.n,o=r*(i.whw[a]+n),s=i.px[a]+i.bx[a]*o,c=i.pz[a]+i.bz[a]*o;return new B(s,e.field.heightAt(s,c),c)}function Ym(e,t,n,r){let i=Jm(e,.5,14,e.rng()<.5?-1:1),a=new W(1.6,2.4,9,10);a.translate(0,4.5,0);let o=new Vi(2,1.8,10);o.translate(0,9.9,0);let s=new U(.9,1.6,.3);s.translate(0,.8,2.3);let c=new W(.25,.25,1.6,8);c.rotateX(Math.PI/2),c.translate(0,8.4,2.4);let l=new H(bm([{geo:a,color:n},{geo:o,color:r},{geo:s,color:5913120},{geo:c,color:3355443}]),new G({vertexColors:!0,roughness:.8}));l.castShadow=!0,l.receiveShadow=!0,l.position.copy(i),gp(e,l),t.add(l);let u=[];for(let e=0;e<4;e++){let t=new U(.18,4.6,.12);t.translate(0,2.3,0);let n=new co(1.1,3.6);n.translate(.62,2.7,.08),t.rotateZ(e/4*Math.PI*2),n.rotateZ(e/4*Math.PI*2),u.push({geo:t,color:5913120},{geo:n,color:16774368})}let d=new po(.45,8,6);u.push({geo:d,color:3355443});let f=new H(bm(u),new G({vertexColors:!0,roughness:.8,side:2}));f.castShadow=!0,f.position.set(i.x,i.y+8.4,i.z+3.25),gp(e,f),t.add(f),e.updaters.push(e=>{f.rotation.z-=e*.9})}function Xm(e,t,n,r){let i=e.rng;for(let a=0;a<n;a++){let n=new po(4.2,18,12);n.scale(1,1.15,1);let o=n.getAttribute(`position`),s=new Float32Array(o.count*3),c=new V(r[a%r.length]),l=new V(r[(a+1)%r.length]),u=new V(r[(a+2)%r.length]);for(let e=0;e<o.count;e++){let t=Math.atan2(o.getZ(e),o.getX(e)),n=Math.floor((t+Math.PI)/(Math.PI*2)*12)%3,r=n===0?c:n===1?l:u;s[e*3]=r.r,s[e*3+1]=r.g,s[e*3+2]=r.b}n.setAttribute(`color`,new Cr(s,3)),n.translate(0,6.5,0);let d=new Vi(2.2,2.6,12,1,!0);d.rotateX(Math.PI),d.translate(0,1.6,0);let f=new U(1.6,1.2,1.6);f.translate(0,-.6,0);let p=[];for(let e=0;e<4;e++){let t=new W(.03,.03,2.6,4);t.translate(e<2?-.7:.7,1.1,e%2==0?-.7:.7),p.push({geo:t,color:3811866})}let m=new H(bm([{geo:n,color:16777215,keepColor:!0},{geo:d,color:3355443},{geo:f,color:9067051},...p]),new G({vertexColors:!0,roughness:.6,side:2}));m.castShadow=!0,gp(e,m),t.add(m);let h=new B(e.field.centerX+(i()-.5)*200,0,e.field.centerZ+(i()-.5)*200),g=Zu(50,110,i()),_=Zu(38,60,i()),v=Zu(.03,.05,i())*(i()<.5?1:-1),y=i()*Math.PI*2;e.updaters.push((e,t)=>{let n=y+t*v;m.position.set(h.x+Math.cos(n)*g,_+Math.sin(t*.4+y)*2.5,h.z+Math.sin(n)*g),m.rotation.y=t*.05+y})}}var Zm=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Qm=`
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;
float hash(float n) { return fract(sin(n) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = hash(i.x + i.y * 57.0), b = hash(i.x + 1.0 + i.y * 57.0), c = hash(i.x + (i.y + 1.0) * 57.0), d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
void main() {
  float x = vUv.x * 6.0;
  float t = uTime * 0.12;
  float curtain = noise(vec2(x * 1.5 + t, t * 0.6)) * 0.6 + noise(vec2(x * 4.0 - t * 1.3, 2.0 + t)) * 0.4;
  float band = smoothstep(0.25, 0.75, curtain);
  float v = vUv.y;
  float vertical = smoothstep(0.0, 0.25, v) * (1.0 - smoothstep(0.55, 1.0, v));
  float rays = 0.6 + 0.4 * noise(vec2(x * 12.0 + t * 3.0, v * 3.0));
  float alpha = band * vertical * rays * 0.75;
  vec3 col = mix(uColorA, uColorB, smoothstep(0.1, 0.8, v + 0.2 * noise(vec2(x, t))));
  gl_FragColor = vec4(col * alpha, alpha);
}
`;function $m(e,t){let n=e.field.centerX,r=e.field.centerZ,i=new wo({uniforms:{uTime:e.timeUniform,uColorA:{value:new V(2617504)},uColorB:{value:new V(8015359)}},vertexShader:Zm,fragmentShader:Qm,transparent:!0,depthWrite:!1,blending:2,side:2,fog:!1});e.disposables.push(i);let a=new co(520,110,1,1);e.disposables.push(a);for(let e=0;e<3;e++){let o=-Math.PI/2+(e-1)*.9+.3,s=520+e*60,c=new H(a,i);c.position.set(n+Math.cos(o)*s,150+e*25,r+Math.sin(o)*s),c.lookAt(n,120,r),c.frustumCulled=!1,c.renderOrder=-500,c.name=`aurora`,t.add(c)}}function eh(e,t){let n=xm(e,4,20,140),r=new W(9,.6,160,12,1,!0);r.translate(0,80,0),e.disposables.push(r);let i=[6615295,16735974,16777215,10513407];n.forEach((n,a)=>{let o=new Yr({color:i[a%i.length],transparent:!0,opacity:.09,blending:2,depthWrite:!1,side:2,fog:!1});e.disposables.push(o);let s=new Fn;s.position.set(n.x,n.y,n.z);let c=new H(r,o);c.rotation.x=.55,c.frustumCulled=!1,s.add(c),t.add(s);let l=(.25+e.rng()*.2)*(a%2==0?1:-1);e.updaters.push((e,t)=>{s.rotation.y=t*l+a,c.rotation.x=.45+Math.sin(t*.7+a)*.2})})}var th=new sn,nh=new It,rh=new B,ih=new B(1,1,1),ah=new _n;function oh(e,t,n,r,i){let{cl:a,field:o}=e,s=Math.floor(nd(t)*a.n)%a.n,c=a.maxWallHalfWidth+i+4,l=a.whw[s]+r+i,u=0,d=0;for(let e=0;e<40&&(u=a.px[s]+a.bx[s]*n*l,d=a.pz[s]+a.bz[s]*n*l,!(o.distanceToTrack(u,d)>=c));e++)l+=4;let f=a.px[s]-u,p=a.pz[s]-d;return{x:u,y:o.heightAt(u,d),z:d,facing:yp(f,p)}}function sh(e,t,n=t.facing,r=.3){e.position.set(t.x,t.y-r,t.z),e.rotation.set(0,n,0)}function ch(e,t,n,r){let i=new H(t,n);return i.name=r,i.castShadow=!0,i.receiveShadow=!0,gp(e,i),i}function lh(e){let t=new Fn;switch(t.name=`landmarks`,e.def.theme){case`desert`:case`volcano`:fh(e,t),ph(e,t);break;case`snow`:hh(e,t),gh(e,t);break;case`neon`:_h(e,t),vh(e,t);break;default:uh(e,t),dh(e,t)}return t}function uh(e,t){let n=oh(e,.27,1,14,6),r=[];for(let e=0;e<4;e++){let t=e/4*Math.PI*2+Math.PI/4,n=new W(.22,.3,16,6);n.translate(0,8,0);let i=n.getAttribute(`position`);for(let e=0;e<i.count;e++){let n=Zu(4.4,3.2,i.getY(e)/16);i.setX(e,i.getX(e)+Math.cos(t)*n),i.setZ(e,i.getZ(e)+Math.sin(t)*n)}r.push({geo:n,color:9080726});for(let n=1;n<=3;n++){let i=n/4*16,a=Zu(4.4,3.2,i/16),o=(e+1)/4*Math.PI*2+Math.PI/4,s=Math.cos(t)*a,c=Math.sin(t)*a,l=Math.cos(o)*a,u=Math.sin(o)*a,d=new U(Math.hypot(l-s,u-c),.12,.12);d.rotateY(-Math.atan2(u-c,l-s)),d.translate((s+l)/2,i,(c+u)/2),r.push({geo:d,color:7304314})}}let i=new W(4.6,3.6,1.2,16);i.translate(0,16.6,0),r.push({geo:i,color:10133672});let a=new Vi(4.9,2.6,16);a.translate(0,23.7,0),r.push({geo:a,color:11680314});let o=new po(.35,8,6);o.translate(0,22.4+2.7,0),r.push({geo:o,color:15790320});let s=new U(.5,18,.08);s.translate(0,9,4),r.push({geo:s,color:5264474});let c=ch(e,bm(r),new G({vertexColors:!0,roughness:.7,metalness:.3}),`waterTower`);sh(c,n),t.add(c);let l=new W(4.6,4.6,5.2,24,1,!1);l.translate(0,19.8,0);let u=Ip(`SUNNY`,15856110,11680314);hp(e,u);let d=ch(e,l,new G({map:u,roughness:.6,metalness:.15}),`waterTowerTank`);sh(d,n,n.facing+Math.PI),t.add(d)}function dh(e,t){let n=oh(e,.79,-1,10,13),r=6.5,i=[];i.push({geo:new U(14,r,22).translate(0,r/2,0),color:12071468});let a=(e,t,n,r)=>{let a=Math.hypot(n-e,r-t),o=Math.atan2(r-t,n-e);for(let s of[-1,1]){let c=new U(a+.3,.3,23.2);c.rotateZ(s*o),c.translate(s*(e+n)/2,(t+r)/2,0),i.push({geo:c,color:4868690})}};a(7.3,6.3,4.4,9.3),a(4.4,9.3,0,11.1);for(let e of[-1,1]){let t=new U(13.6,4.6,.4);t.translate(0,8.8,e*10.8),i.push({geo:t,color:12071468}),i.push({geo:new U(4.6,4.6,.3).translate(0,2.3,e*11.05),color:15986662}),i.push({geo:new U(.3,4.6,.3).translate(0,2.3,e*11.2),color:12071468}),i.push({geo:new U(14.4,.35,.35).translate(0,6.55,e*11),color:15986662}),i.push({geo:new U(2.4,2.4,.3).translate(0,8.9,e*11.05),color:15986662})}for(let e of[-1,1]){i.push({geo:new U(.35,6.7,22.4).translate(e*7,r/2,0),color:15986662});for(let t=-2;t<=2;t++)i.push({geo:new U(.4,1.6,1.6).translate(e*7.05,3.6,t*4.2),color:2106410})}let o=new W(3.2,3.2,17,16);o.translate(11.6,17/2,-7),i.push({geo:o,color:14277600});let s=new po(3.25,16,8,0,Math.PI*2,0,Math.PI/2);s.translate(11.6,17,-7),i.push({geo:s,color:9080726});for(let e=1;e<5;e++){let t=new mo(3.25,.09,4,16);t.rotateX(Math.PI/2),t.translate(11.6,e/5*17,-7),i.push({geo:t,color:9080726})}i.push({geo:new W(.05,.05,2.2,5).translate(0,12.1,0),color:3355443}),i.push({geo:new U(1.4,.08,.08).translate(0,12.9,0),color:3355443});let c=ch(e,bm(i),new G({vertexColors:!0,roughness:.85}),`barn`);sh(c,n,n.facing+Math.PI/2,.4),t.add(c)}function fh(e,t){let n=[],r=[11032634,13071692,14260842,12085828,14724220],i=(e,t,i,a)=>{let o=e.y-1.5;i.forEach((t,i)=>{let s=new W(t.r,t.r*1.12,t.h,14,1),c=s.getAttribute(`position`);for(let e=0;e<c.count;e++){let t=c.getX(e),n=c.getZ(e),r=Math.atan2(n,t),o=.82+.36*sd(Math.cos(r)*2+a+i*3,Math.sin(r)*2+a,2);c.setX(e,t*o),c.setZ(e,n*o*.85)}s.translate(e.x,o+t.h/2,e.z),n.push({geo:s,color:r[(i+a)%r.length]}),o+=t.h});let s=new Vi(t*1.35,3.5,14);s.translate(e.x,e.y+.2,e.z),n.push({geo:s,color:10115640})};i(oh(e,.155,-1,34,26),26,[{r:26,h:9},{r:22,h:7},{r:19,h:8},{r:12,h:5}],1),i(oh(e,.83,1,30,22),22,[{r:22,h:8},{r:17,h:10},{r:15,h:6}],3),i(oh(e,.62,1,46,16),16,[{r:16,h:12},{r:9,h:9},{r:6,h:7}],5);let a=ch(e,bm(n),new G({vertexColors:!0,roughness:1}),`mesas`);t.add(a)}function ph(e,t){let n=oh(e,.4,-1,8,5),r=4885058,i=6465110,a=[],o=new W(1.15,1.45,15,12);o.translate(0,15/2,0),a.push({geo:o,color:r}),a.push({geo:new po(1.15,12,8).translate(0,15,0),color:i});for(let e=0;e<12;e++){let t=e/12*Math.PI*2,n=new U(.28,14,.28);n.translate(Math.cos(t)*1.28,7,Math.sin(t)*1.28),n.rotateY(-t),a.push({geo:n,color:4160057})}let s=(e,t,n,o)=>{let s=new W(.62,.66,n,9);s.rotateZ(Math.PI/2),s.translate(n/2+.8,t,0);let c=new W(.6,.62,o,9);c.translate(n+.8,t+o/2-.3,0);let l=new po(.6,9,6);l.translate(n+.8,t+o-.3,0);let u=new po(.64,9,6);u.translate(n+.8,t,0);for(let t of[s,c,l,u])t.rotateY(e),a.push({geo:t,color:t===l?i:r})};s(.3,6.5,3.2,6),s(2.4,8.5,2.6,5),s(4.3,5.2,2.2,4.2);for(let e=0;e<5;e++){let t=e/5*Math.PI*2;a.push({geo:new po(.32,6,5).translate(Math.cos(t)*.7,15.9,Math.sin(t)*.7),color:16773544})}let c=ch(e,bm(a),new G({vertexColors:!0,roughness:.75}),`giantCactus`);sh(c,n,n.facing,.6),t.add(c)}function mh(){return new G({color:12576511,roughness:.14,metalness:.05,emissive:798280,emissiveIntensity:.55,transparent:!0,opacity:.9,depthWrite:!0})}function hh(e,t){let n=oh(e,.235,-1,20,22),r=[],i=[];for(let e=0;e<3;e++){let t=new U(46+e*4,9.266666666666666,10+e*2.5);t.translate(0,(e+.5)*(26/3),-e*1.2-4),r.push({geo:t,color:e===0?5002595:e===1?5923956:7042694})}r.push({geo:new U(55,1.4,16).translate(0,26.6,-6.5),color:16186367});let a=e.rng;for(let e=0;e<14;e++){let t=-20+e/13*40+(a()-.5)*1.5,n=26*(.55+a()*.45),r=1.1+a()*1.3,o=new W(r*.55,r,n,7);o.translate(t,26-n/2+.4,1.4+(a()-.5)*1),i.push({geo:o,color:16777215});let s=new Vi(r*.5,2.6+a()*2,6);s.rotateX(Math.PI),s.translate(t,26-n-1.3,1.6),i.push({geo:s,color:16777215})}let o=new W(19.32,23,1.2,18);o.scale(1,1,.55),o.translate(0,.4,6),i.push({geo:o,color:16777215});let s=ch(e,bm(r),new G({vertexColors:!0,roughness:.95}),`waterfallCliff`);sh(s,n,n.facing,1.5),t.add(s);let c=ch(e,bm(i),mh(),`frozenWaterfall`);c.castShadow=!1,sh(c,n,n.facing,1.5),t.add(c)}function gh(e,t){let n=oh(e,.66,1,22,20),r=[],i=14086143,a=4161481,o=(e,t,n,o)=>{r.push({geo:new W(n,n*1.08,o,12).translate(e,o/2,t),color:i}),r.push({geo:new Vi(n*1.25,n*3.2,12).translate(e,o+n*1.6,t),color:a}),r.push({geo:new mo(n*1.05,.35,5,12).rotateX(Math.PI/2).translate(e,o-.4,t),color:15661311}),r.push({geo:new W(.06,.06,3,4).translate(e,o+n*3.2+1.2,t),color:3356740}),r.push({geo:new co(1.8,.9).translate(e+.9,o+n*3.2+2.2,t),color:16731482})};o(-13,-13,3,20),o(13,-13,3,20),o(-13,13,3,18),o(13,13,3,18);for(let[e,t,n,a]of[[0,-13,26,2.2],[0,13,26,2.2],[-13,0,2.2,26],[13,0,2.2,26]]){r.push({geo:new U(n,12,a).translate(e,6,t),color:i});let o=n>a,s=Math.floor(Math.max(n,a)/2.4);for(let i=0;i<s;i++){let c=-.5+(i+.5)/s,l=o?new U(1.2,1.4,a+.2):new U(n+.2,1.4,1.2);l.translate(e+(o?c*n:0),12.7,t+(o?0:c*a)),r.push({geo:l,color:15661311})}}r.push({geo:new U(6,8,3).translate(0,4,13.4),color:11852018}),r.push({geo:new U(3.4,6,.6).translate(0,3,14.8),color:1981013}),r.push({geo:new U(12,22,12).translate(0,11,0),color:i}),r.push({geo:new Vi(9.2,10,4).rotateY(Math.PI/4).translate(0,27,0),color:a}),o(0,0,2.2,32);let s=ch(e,bm(r),mh(),`iceCastle`);s.material.vertexColors=!0,s.material.color.set(16777215),s.material.opacity=.96,s.material.side=2,sh(s,n,n.facing,1),t.add(s)}function _h(e,t){let n=oh(e,.585,1,16,8),r=[];for(let e of[-1,1])r.push({geo:new U(1.2,30,1.2).translate(e*13.5,15,0),color:1842218});r.push({geo:new U(31.6,15.6,.9).translate(0,23,-.2),color:1184288}),r.push({geo:new U(32.4,.5,1.6).translate(0,31.1,0),color:58879}),r.push({geo:new U(32.4,.5,1.6).translate(0,14.9,0),color:16723926});let i=ch(e,bm(r),new G({vertexColors:!0,roughness:.4,metalness:.6}),`holoBillboardFrame`);sh(i,n,n.facing+Math.PI,.5),t.add(i);let a=Rp(2);hp(e,a);let o=new G({map:a,emissive:16777215,emissiveMap:a,emissiveIntensity:1.4,roughness:.5,transparent:!0,opacity:.92}),s=new H(new co(30,14),o);s.name=`holoBillboardScreen`,s.position.set(0,23,.36),gp(e,s);let c=new Fn;sh(c,n,n.facing+Math.PI,.5),c.add(s),t.add(c),e.updaters.push((e,t)=>{let n=Math.sin(t*23)>.96?.5:1;o.emissiveIntensity=(1.3+.25*Math.sin(t*1.7))*n,o.opacity=.86+.08*Math.sin(t*3.3)})}function vh(e,t){let{cl:n,field:r}=e,i=.44,a=.86,o=n.n,s=Math.floor(i*o),c=Math.floor(a*o),l=Math.floor((c-s)/4)+1,u=.9,d=.55,f=new Float32Array(l*4*3),p=[],m=e=>n.py[e]+11.5;for(let e=0;e<l;e++){let t=s+e*4,r=n.whw[t]+15,i=n.px[t]+n.bx[t]*-1*r,a=n.pz[t]+n.bz[t]*-1*r,o=m(t),c=[[i-n.bx[t]*u,o+d,a-n.bz[t]*u],[i+n.bx[t]*u,o+d,a+n.bz[t]*u],[i+n.bx[t]*u,o-d,a+n.bz[t]*u],[i-n.bx[t]*u,o-d,a-n.bz[t]*u]];for(let t=0;t<4;t++){let n=(e*4+t)*3;f[n]=c[t][0],f[n+1]=c[t][1],f[n+2]=c[t][2]}if(e>0){let t=(e-1)*4,n=e*4;for(let e=0;e<4;e++){let r=(e+1)%4;p.push(t+e,n+e,t+r,t+r,n+e,n+r)}}}let h=new Rr;h.setAttribute(`position`,new Cr(f,3)),h.setIndex(p),h.computeVertexNormals(),h.computeBoundingSphere();let g=ch(e,h,new G({color:2763324,roughness:.5,metalness:.6,side:2}),`monorailBeam`);g.receiveShadow=!1,t.add(g);let _=new Float32Array(l*2*3),v=[];for(let e=0;e<l;e++){let t=s+e*4,r=n.whw[t]+15-u-.02,i=n.px[t]+n.bx[t]*-1*r,a=n.pz[t]+n.bz[t]*-1*r,o=m(t);if(_.set([i,o+.12,a,i,o-.12,a],e*6),e>0){let t=(e-1)*2;v.push(t,t+2,t+1,t+1,t+2,t+3)}}let y=new Rr;y.setAttribute(`position`,new Cr(_,3)),y.setIndex(v),y.computeVertexNormals(),y.computeBoundingSphere();let b=new H(y,new G({color:0,emissive:58879,emissiveIntensity:1.6,side:2}));b.name=`monorailGlow`,gp(e,b),t.add(b);let x=new U(1.1,1,1.1);x.translate(0,.5,0);let S=new G({color:1710632,roughness:.5,metalness:.5}),C=.42*n.length,w=Math.floor(C/22)+1,T=new vi(x,S,w);for(let e=0;e<w;e++){let t=Math.min(c,s+Math.floor(e*22/n.length*o)),i=n.whw[t]+15,a=n.px[t]+n.bx[t]*-1*i,l=n.pz[t]+n.bz[t]*-1*i,u=r.heightAt(a,l)-.5,f=m(t)-d-u;rh.set(a,u,l),ah.set(0,yp(n.tx[t],n.tz[t]),0),nh.setFromEuler(ah),ih.set(1,f,1),th.compose(rh,nh,ih),T.setMatrixAt(e,th)}T.instanceMatrix.needsUpdate=!0,T.castShadow=!0,T.name=`monorailPylons`,gp(e,T),t.add(T);let E=[];for(let e=0;e<3;e++){let t=(e-1)*7.6,n=new U(2.4,2.4,7);n.translate(0,2.05,t),E.push({geo:n,color:15265012});let r=new U(2,.4,6.2);r.translate(0,3.45,t),E.push({geo:r,color:2763324});let i=new U(2.6,.5,6.6);i.translate(0,.8,t),E.push({geo:i,color:1710632});for(let e of[-1,1]){let n=new U(.1,.9,5.6);n.translate(e*1.22,2.45,t),E.push({geo:n,color:58879});let r=new U(.06,.25,6.4);r.translate(e*1.24,1.35,t),E.push({geo:r,color:16723926})}}for(let e of[-1,1]){let t=new Vi(1.3,2.2,8);t.rotateX(e>0?Math.PI/2:-Math.PI/2),t.translate(0,2.05,e*(11.7+1.1)),E.push({geo:t,color:15265012})}let D=bm(E),O=new G({vertexColors:!0,roughness:.35,metalness:.5,emissive:16777215,emissiveIntensity:0});O.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
 float glowMask = step(0.8, vColor.b) * step(vColor.r, 0.3);
 float magenta = step(0.8, vColor.r) * step(0.8, vColor.b) * step(vColor.g, 0.4);
 totalEmissiveRadiance += vColor.rgb * (glowMask * 1.6 + magenta * 1.4);`)},O.customProgramCacheKey=()=>`tkr-monorail-train`;let k=new H(D,O);k.name=`monorailTrain`,k.castShadow=!0,gp(e,k),t.add(k);let A=i*n.length+14,ee=a*n.length-14,te=(ee-A)/16;e.updaters.push((e,t)=>{let r=(te+3)*2,i=t%r/r,a=!0;i>=.5?(i=(i-.5)*2,a=!1):i*=2;let s=3/(te+3),c=Math.min(1,Math.max(0,(i-s*.5)/(1-s))),l=a?Zu(A,ee,c):Zu(ee,A,c),u=Math.floor(l/n.length*o)%o,d=n.whw[u]+15;k.position.set(n.px[u]+n.bx[u]*-1*d,m(u),n.pz[u]+n.bz[u]*-1*d);let f=yp(n.tx[u],n.tz[u]);k.rotation.y=a?f:f+Math.PI})}var yh=Im/2,bh=.5,xh=4.5;function Sh(){return{position:new B,tangent:new B(0,0,-1),normal:new B(0,1,0),binormal:new B(1,0,0),halfWidth:8,wallHalfWidth:12,t:0}}function Ch(){return{t:0,surface:`road`,groundY:0,groundNormal:new B(0,1,0),lateral:0,halfWidth:8,wallHalfWidth:12,tangent:new B(0,0,-1),binormal:new B(1,0,0),center:new B}}var wh=Sh(),Th=Sh();function Eh(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}var Dh=class{def;object;length;checkpoints;startGrid;itemBoxPositions;boostPads;minimap;cl;field;updaters=[];disposables=[];timeUniform={value:0};boostPadTs;boostPadHalfWidths;disposed=!1;constructor(e){this.def=e,this.cl=new sp(e),this.length=this.cl.length,this.field=new pp(e,this.cl),this.boostPadTs=e.boostPads.map(e=>nd(e));let t={def:e,cl:this.cl,field:this.field,rng:id(Eh(e.id)),disposables:this.disposables,updaters:this.updaters,timeUniform:this.timeUniform};this.checkpoints=this.buildCheckpoints(),this.startGrid=this.buildStartGrid(),this.itemBoxPositions=Km(t,5),this.minimap=this.buildMinimap();let n=new Fn;n.name=`track:${e.id}`,n.add(pm(t)),n.add(cm(t)),n.add(lm(t)),n.add(Vp(t)),n.add($p(t)),n.add(Tm(t)),n.add(lh(t)),n.add(Bm(t)),n.add(Vm(t)),n.add(Hm(t));let r=[],i=Gm(t,r);i&&n.add(i),this.boostPads=r,this.boostPadHalfWidths=new Float64Array(this.boostPadTs.length);for(let e=0;e<r.length&&e<this.boostPadHalfWidths.length;e++)this.boostPadHalfWidths[e]=r[e].halfWidth;n.add(qm(t)),this.object=n}sample(e,t){return this.cl.sample(e,t??Sh())}closestT(e,t){return this.cl.closestT(e.x,e.z,t)}query(e,t,n){let r=n??Ch(),i=this.cl.closestT(e.x,e.z,t);this.cl.sample(i,wh),r.t=i,r.center.copy(wh.position),r.tangent.copy(wh.tangent),r.binormal.copy(wh.binormal),r.halfWidth=wh.halfWidth,r.wallHalfWidth=wh.wallHalfWidth;let a=e.x-wh.position.x,o=e.z-wh.position.z,s=a*wh.binormal.x+o*wh.binormal.z;r.lateral=s;let c=Math.abs(s),l=wh.halfWidth,u=wh.wallHalfWidth,d;d=c<=l?this.isBoostAt(i,c)?`boost`:`road`:c<=u?`offroad`:Up(this.def,i)?`void`:`wall`,r.surface=d;let f=wh.position.y;if(c<=u+bh)r.groundY=f,r.groundNormal.copy(wh.normal);else{let t=Qu(u+bh,u+xh,c);r.groundY=Zu(f,this.field.heightAt(e.x,e.z),t);let n=.6,i=this.field.heightAt(e.x+n,e.z),a=this.field.heightAt(e.x-n,e.z),o=this.field.heightAt(e.x,e.z+n),s=this.field.heightAt(e.x,e.z-n),l=(a-i)/(2*n),d=(s-o)/(2*n);r.groundNormal.set(Zu(wh.normal.x,l,t),Zu(wh.normal.y,1,t),Zu(wh.normal.z,d,t)).normalize()}return r}heightAt(e,t){return this.field.heightAt(e,t)}isBoostAt(e,t){let n=this.boostPadTs,r=this.boostPadHalfWidths,i=this.length;for(let a=0;a<n.length;a++)if(t<=r[a]&&Math.abs(rd(n[a],e))*i<=yh)return!0;return!1}update(e,t){this.timeUniform.value=t;for(let n=0;n<this.updaters.length;n++)this.updaters[n](e,t)}dispose(){if(this.disposed)return;this.disposed=!0;let e=new Set;for(let t of this.disposables)e.has(t)||(e.add(t),t.dispose());this.object.traverse(t=>{let n=t;n.geometry&&!e.has(n.geometry)&&(e.add(n.geometry),n.geometry.dispose());let r=n.material;if(!r)return;let i=Array.isArray(r)?r:[r];for(let t of i)e.has(t)||(e.add(t),t.dispose())}),this.updaters.length=0,this.disposables.length=0,this.object.clear(),this.object.removeFromParent()}buildCheckpoints(){let e=[];for(let t=0;t<12;t++){let n=t/12;this.cl.sample(n,Th),e.push({index:t,t:n,position:Th.position.clone(),forward:Th.tangent.clone(),halfWidth:Th.halfWidth,isFinishLine:t===0})}return e}buildStartGrid(){let e=[],t=4.5,n=new _n;for(let r=0;r<8;r++){let i=Math.floor(r/2),a=r%2,o=6+i*t+(a===1?t*.5:0),s=this.cl.tOf(-o);this.cl.sample(s,Th);let c=a===0?-2.2:2.2,l=new B(Th.position.x+Th.binormal.x*c,Th.position.y,Th.position.z+Th.binormal.z*c),u=Math.atan2(-Th.tangent.x,-Th.tangent.z);n.set(0,u,0);let d=new It().setFromEuler(n);e.push({position:l,quaternion:d,t:s})}return e}buildMinimap(){let e=[],t=[],n=[],r=[],i=[],a=[],o=1/0,s=-1/0,c=1/0,l=-1/0;for(let e=0;e<200;e++){this.cl.sample(e/200,Th);let t=Th.position.clone(),n=new B(t.x-Th.binormal.x*Th.halfWidth,t.y,t.z-Th.binormal.z*Th.halfWidth),u=new B(t.x+Th.binormal.x*Th.halfWidth,t.y,t.z+Th.binormal.z*Th.halfWidth);r.push(t),i.push(n),a.push(u);for(let e of[n,u])e.x<o&&(o=e.x),e.x>s&&(s=e.x),e.z<c&&(c=e.z),e.z>l&&(l=e.z)}let u=s-o,d=l-c,f=Math.max(u,d)*1.08,p=o-(f-u)/2,m=c-(f-d)/2,h=(e,t)=>({x:(e-p)/f,y:(t-m)/f});for(let o=0;o<200;o++)e.push(h(r[o].x,r[o].z)),t.push(h(i[o].x,i[o].z)),n.push(h(a[o].x,a[o].z));return{points:e,leftEdge:t,rightEdge:n,worldToMap:h}}},Oh=[{id:`sunny_circuit`,name:`Sunny Circuit`,theme:`grassland`,laps:3,description:`Rolling green hills, a long start straight and one tricky hairpin. The perfect warm-up.`,difficulty:1,controlPoints:[{x:0,y:0,z:0},{x:0,y:0,z:-68.5},{x:0,y:0,z:-137.1},{x:16.1,y:.8,z:-175.9},{x:54.8,y:1.5,z:-191.9},{x:100.5,y:2,z:-191.9},{x:136.1,y:3.5,z:-177.2},{x:150.8,y:5,z:-141.7},{x:150.8,y:7,z:-61.7},{x:150.8,y:2.2,z:18.3},{x:140.7,y:1.5,z:35.7},{x:120.6,y:1.5,z:35.7},{x:110.6,y:1.5,z:18.3},{x:110.6,y:.5,z:-36.6},{x:102.6,y:0,z:-55.9},{x:83.2,y:0,z:-64},{x:64.9,y:0,z:-64},{x:48.7,y:0,z:-57.3},{x:42,y:0,z:-41.1},{x:58,y:0,z:-13.4},{x:74,y:0,z:14.3},{x:74,y:0,z:32.6},{x:55.5,y:0,z:64.6},{x:18.5,y:0,z:64.6},{x:0,y:0,z:32.6}],halfWidth:8,halfWidths:[8.5,8.5,8.5,8,8,8,8,8,8,8.5,9,9,8.5,8,8,8,8,8,8,8,8,8.5,9,9,8.5],wallHalfWidthFactor:1.55,itemBoxRows:[.1,.4,.62,.83],boostPads:[.3,.7,.95],environment:{skyTop:3108824,skyHorizon:10474495,skyBottom:14675711,fogColor:13624319,fogDensity:.0016,sunColor:16773848,sunIntensity:2.6,sunDirection:{x:.47,y:.78,z:.41},ambientSky:10470911,ambientGround:7311183,ambientIntensity:.9},palette:{road:4869202,roadStripe:16053484,curb:14165803,curbAlt:16119285,offroad:6134330,wall:2763310,ground:5214004}},{id:`dune_drift`,name:`Dune Drift`,theme:`desert`,laps:3,description:`Sunset sweepers, a canyon run between towering sandstone walls and two hairpins that punish greed.`,difficulty:2,controlPoints:[{x:0,y:0,z:0},{x:0,y:0,z:-120.2},{x:60.1,y:2,z:-180.3},{x:100.2,y:3,z:-180.3},{x:136.2,y:4.5,z:-144.2},{x:136.2,y:8,z:-116.2},{x:136.2,y:4.5,z:-88.1},{x:146.2,y:2,z:-70.8},{x:166.3,y:2,z:-70.8},{x:176.3,y:2,z:-88.1},{x:176.3,y:3,z:-128.2},{x:212.3,y:5,z:-164.2},{x:248.4,y:6,z:-128.2},{x:248.4,y:3.8,z:-20.8},{x:248.4,y:.5,z:86.5},{x:237.6,y:0,z:105.3},{x:215.9,y:0,z:105.3},{x:205.1,y:0,z:86.5},{x:205.1,y:0,z:66.5},{x:171.5,y:.5,z:32.8},{x:136.8,y:1.5,z:52.9},{x:102.1,y:2.5,z:72.9},{x:44.1,y:.5,z:72.9},{x:0,y:0,z:28.8}],halfWidth:8.5,halfWidths:[9,9,8.5,8.5,8.5,8.5,8.5,9,9,9,8.5,8.5,8,7.5,7.5,9,9,9,8.5,8.5,8.5,8.5,9,9],wallHalfWidthFactor:1.3,itemBoxRows:[.12,.42,.62,.86],boostPads:[.255,.55,.88],environment:{skyTop:2833024,skyHorizon:16751196,skyBottom:16767400,fogColor:15907210,fogDensity:.0022,sunColor:16757355,sunIntensity:2.4,sunDirection:{x:-.7,y:.36,z:.61},ambientSky:16762266,ambientGround:10119738,ambientIntensity:.85},palette:{road:5918278,roadStripe:16769658,curb:13062191,curbAlt:15984328,offroad:14262620,wall:13209178,ground:13736271}},{id:`frostbite_falls`,name:`Frostbite Falls`,theme:`snow`,laps:3,description:`A plunging descent onto a frozen lake causeway with nothing but ice between you and the drop.`,difficulty:2,controlPoints:[{x:0,y:8,z:0},{x:0,y:8,z:-134.1},{x:-6.7,y:7.5,z:-150.4},{x:-6.7,y:6.5,z:-182.9},{x:0,y:5.5,z:-199.2},{x:0,y:4.5,z:-237.5},{x:57.5,y:2,z:-295},{x:134.1,y:0,z:-295},{x:208.7,y:-1,z:-264.1},{x:239.5,y:-1,z:-189.6},{x:239.5,y:-1,z:-122.5},{x:239.5,y:1.5,z:-21.9},{x:239.5,y:4,z:78.7},{x:191.6,y:5.5,z:126.6},{x:143.7,y:6.5,z:126.6},{x:127.5,y:7.5,z:119.8},{x:94.9,y:8.5,z:119.8},{x:78.7,y:9,z:126.6},{x:47.9,y:8.5,z:126.6},{x:0,y:8,z:78.7}],halfWidth:8,halfWidths:[8.5,8.5,8.5,8.5,8.5,8,8,7.5,7.5,7.5,7.5,8,8,8,8,8.5,8.5,8.5,8,8.5],wallHalfWidthFactor:1.5,itemBoxRows:[.08,.36,.62,.9],boostPads:[.22,.66,.935],voidRanges:[[.315,.545]],environment:{skyTop:1982330,skyHorizon:10275824,skyBottom:14938623,fogColor:12376306,fogDensity:.0032,sunColor:14674687,sunIntensity:2,sunDirection:{x:.36,y:.66,z:-.66},ambientSky:11128309,ambientGround:9414852,ambientIntensity:1},palette:{road:5595246,roadStripe:15267583,curb:3108789,curbAlt:16777215,offroad:15397883,wall:9425138,ground:15134712}},{id:`neon_nexus`,name:`Neon Nexus`,theme:`neon`,laps:3,description:`Three hairpins, a rooftop jump and a flat-out neon straight under a violet sky. Experts only.`,difficulty:3,controlPoints:[{x:0,y:0,z:0},{x:0,y:0,z:-158.5},{x:65.3,y:2,z:-223.7},{x:93.2,y:6.5,z:-223.7},{x:121.2,y:3,z:-223.7},{x:163.1,y:1,z:-181.8},{x:163.1,y:0,z:-144.5},{x:173.4,y:0,z:-126.7},{x:193.9,y:0,z:-126.7},{x:204.1,y:0,z:-144.5},{x:204.1,y:1,z:-181.8},{x:246.1,y:2.5,z:-223.7},{x:288,y:4,z:-181.8},{x:288,y:0,z:4.7},{x:275,y:0,z:27.3},{x:248.9,y:0,z:27.3},{x:235.8,y:0,z:4.7},{x:193.9,y:2,z:-37.3},{x:147.3,y:3,z:-37.3},{x:111,y:2.5,z:-16.3},{x:74.6,y:1.5,z:4.7},{x:46.7,y:1,z:32.6},{x:46.7,y:.5,z:88.6},{x:35,y:0,z:108.8},{x:11.7,y:0,z:108.8},{x:0,y:0,z:88.6}],halfWidth:7.5,halfWidths:[8,8,7.5,7.5,7.5,7.5,8,8.5,8.5,8.5,8,7.5,7.5,8,8.5,8.5,8.5,7.5,7.5,7.5,7.5,7.5,8,8.5,8.5,8],wallHalfWidthFactor:1.4,itemBoxRows:[.09,.4,.56,.8],boostPads:[.175,.52,.75],environment:{skyTop:131596,skyHorizon:7019164,skyBottom:1264227,fogColor:1181215,fogDensity:8e-4,sunColor:10467327,sunIntensity:.9,sunDirection:{x:-.35,y:.8,z:-.49},ambientSky:3873894,ambientGround:993850,ambientIntensity:.7},palette:{road:1381404,roadStripe:16723926,curb:58879,curbAlt:16723926,offroad:1973290,wall:58879,ground:789268}}];function kh(e){return Oh.find(t=>t.id===e)??Oh[0]}var Ah=64,jh=new Map;function Mh(e){let t=jh.get(e);if(t)return t;let n=document.createElement(`canvas`);n.width=Ah,n.height=Ah;let r=n.getContext(`2d`);return r&&(r.clearRect(0,0,Ah,Ah),r.lineJoin=`round`,r.lineCap=`round`,Nh(r,e)),jh.set(e,n),n}function Nh(e,t){let n=Ah/2;switch(t){case`none`:return;case`banana`:Ih(e,n,33,1);return;case`triple_banana`:Ih(e,17,22,.52),Ih(e,47,22,.52),Ih(e,n,45,.52);return;case`green_shell`:Lh(e,n,n,1,`#2fd24a`,`#0f6b22`,!1);return;case`red_shell`:Lh(e,n,n,1,`#ff3b30`,`#8a1410`,!1);return;case`blue_shell`:Lh(e,n,n,1,`#2f7bff`,`#12348f`,!0);return;case`triple_green_shell`:Ph(e,(t,n,r)=>Lh(e,t,n,r,`#2fd24a`,`#0f6b22`,!1));return;case`triple_red_shell`:Ph(e,(t,n,r)=>Lh(e,t,n,r,`#ff3b30`,`#8a1410`,!1));return;case`mushroom`:Rh(e,n,n,1,`#ff3b30`,!1);return;case`triple_mushroom`:Ph(e,(t,n,r)=>Rh(e,t,n,r,`#ff3b30`,!1));return;case`golden_mushroom`:Rh(e,n,n,1,`#ffc531`,!0);return;case`star`:Vh(e,n,n,1);return;case`lightning`:Hh(e,n,n,1);return;case`bob_omb`:Uh(e,n,n,1);return}}function Ph(e,t){let n=Ah/2;t(17,23,.5),t(47,23,.5),t(n,45,.5)}function Fh(e,t,n,r,i){e.beginPath(),e.ellipse(t,n,r,i,0,0,J)}function Ih(e,t,n,r){e.save(),e.translate(t,n),e.scale(r,r),e.rotate(-.45);let i=()=>{e.beginPath(),e.moveTo(-19,-5),e.quadraticCurveTo(-3,22,19,1)};i(),e.lineWidth=15,e.strokeStyle=`#4a3208`,e.stroke(),i(),e.lineWidth=11,e.strokeStyle=`#ffd83a`,e.stroke(),e.beginPath(),e.moveTo(-13,-5),e.quadraticCurveTo(-2,12,12,0),e.lineWidth=3,e.strokeStyle=`rgba(255,255,255,0.55)`,e.stroke(),e.fillStyle=`#6b4a12`,e.beginPath(),e.arc(-19.5,-5.5,3.4,0,J),e.fill(),e.beginPath(),e.arc(19.5,.5,3.1,0,J),e.fill(),e.restore()}function Lh(e,t,n,r,i,a,o){if(e.save(),e.translate(t,n),e.scale(r,r),e.lineWidth=2.5,e.fillStyle=`#f5ead0`,e.strokeStyle=`#3a2a10`,Fh(e,0,10,23,8),e.fill(),e.stroke(),o){e.fillStyle=`#ffffff`,e.strokeStyle=`#3a3a3a`;for(let t=0;t<5;t++){let n=Math.PI+Math.PI*(t+.5)/5,r=Math.cos(n)*17,i=6+Math.sin(n)*17,a=Math.cos(n)*28,o=6+Math.sin(n)*28,s=-Math.sin(n)*4,c=Math.cos(n)*4;e.beginPath(),e.moveTo(r+s,i+c),e.lineTo(a,o),e.lineTo(r-s,i-c),e.closePath(),e.fill(),e.stroke()}}e.beginPath(),e.ellipse(0,6,22,21,0,Math.PI,J),e.closePath(),e.fillStyle=i,e.fill(),e.strokeStyle=a,e.stroke(),e.save(),e.beginPath(),e.ellipse(0,6,22,21,0,Math.PI,J),e.closePath(),e.clip(),e.strokeStyle=a,e.lineWidth=1.6,e.beginPath(),e.moveTo(-8,-15),e.lineTo(-11,-4),e.lineTo(-4,2),e.lineTo(4,2),e.lineTo(11,-4),e.lineTo(8,-15),e.closePath(),e.stroke(),e.beginPath(),e.moveTo(-11,-4),e.lineTo(-19,-1),e.moveTo(11,-4),e.lineTo(19,-1),e.moveTo(-4,2),e.lineTo(-6,9),e.moveTo(4,2),e.lineTo(6,9),e.stroke(),e.restore(),e.fillStyle=`#ffffff`,e.strokeStyle=`#3a2a10`,e.lineWidth=2,Fh(e,0,6,22.5,5),e.fill(),e.stroke(),e.fillStyle=`rgba(255,255,255,0.5)`,Fh(e,-9,-7,5,3),e.fill(),e.restore()}function Rh(e,t,n,r,i,a){e.save(),e.translate(t,n),e.scale(r,r),e.lineWidth=2.5,e.fillStyle=a?`#fff1c4`:`#fff4dc`,e.strokeStyle=`#3a2a10`,e.beginPath(),e.roundRect(-11,2,22,20,7),e.fill(),e.stroke(),e.fillStyle=`#1c1c22`,Fh(e,-5,13,2.2,3.6),e.fill(),Fh(e,5,13,2.2,3.6),e.fill();let o=()=>{e.beginPath(),e.ellipse(0,5,25,21,0,Math.PI,J),e.closePath()};o(),e.fillStyle=i,e.fill(),e.save(),o(),e.clip(),e.fillStyle=a?`#fff6cf`:`#ffffff`;for(let[t,n,r]of[[-12,-6,5],[0,-14,6],[12,-6,5],[-21,2,4],[21,2,4]])e.beginPath(),e.arc(t,n,r,0,J),e.fill();if(a){let t=e.createLinearGradient(-20,-16,20,6);t.addColorStop(0,`rgba(255,255,255,0)`),t.addColorStop(.45,`rgba(255,255,255,0.55)`),t.addColorStop(.55,`rgba(255,255,255,0.55)`),t.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=t,e.fillRect(-26,-18,52,26)}e.restore(),o(),e.strokeStyle=a?`#7a4d00`:`#3a2a10`,e.stroke(),a&&(e.fillStyle=`#ffffff`,zh(e,16,-12,5),zh(e,-18,-2,3.5)),e.restore()}function zh(e,t,n,r){e.beginPath(),e.moveTo(t,n-r),e.quadraticCurveTo(t,n,t+r,n),e.quadraticCurveTo(t,n,t,n+r),e.quadraticCurveTo(t,n,t-r,n),e.quadraticCurveTo(t,n,t,n-r),e.fill()}function Bh(e,t,n,r,i){e.beginPath();for(let a=0;a<10;a++){let o=a%2==0?r:i,s=-Math.PI/2+a*Math.PI/5,c=t+Math.cos(s)*o,l=n+Math.sin(s)*o;a===0?e.moveTo(c,l):e.lineTo(c,l)}e.closePath()}function Vh(e,t,n,r){e.save(),e.translate(t,n),e.scale(r,r);let i=e.createRadialGradient(0,2,4,0,2,31);i.addColorStop(0,`rgba(255,236,120,0.95)`),i.addColorStop(.55,`rgba(255,210,60,0.35)`),i.addColorStop(1,`rgba(255,200,40,0)`),e.fillStyle=i,e.fillRect(-32,-32,64,64),Bh(e,0,2,26,11.5),e.fillStyle=`#ffe23a`,e.fill(),e.lineWidth=2.5,e.strokeStyle=`#c47a00`,e.stroke(),Bh(e,-1,0,16,7),e.fillStyle=`rgba(255,255,255,0.35)`,e.fill(),e.restore()}function Hh(e,t,n,r){e.save(),e.translate(t,n),e.scale(r,r),e.fillStyle=`#4d5668`,e.strokeStyle=`#1f2530`,e.lineWidth=2.5,e.beginPath(),e.arc(-13,-12,10,0,J),e.arc(1,-18,12,0,J),e.arc(15,-11,10,0,J),e.fill(),e.beginPath(),e.roundRect(-23,-12,46,12,5),e.fill(),e.beginPath(),e.arc(-13,-12,10,Math.PI*.75,Math.PI*1.75),e.arc(1,-18,12,Math.PI*1.15,Math.PI*1.95),e.arc(15,-11,10,Math.PI*1.3,Math.PI*2.25),e.lineTo(23,-2),e.lineTo(-23,-2),e.closePath(),e.stroke(),e.shadowColor=`rgba(255,225,60,0.9)`,e.shadowBlur=9,e.beginPath(),e.moveTo(3,-10),e.lineTo(-9,8),e.lineTo(-1,8),e.lineTo(-7,27),e.lineTo(12,2),e.lineTo(3,2),e.lineTo(11,-10),e.closePath(),e.fillStyle=`#ffe135`,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle=`#7a4d00`,e.stroke(),e.restore()}function Uh(e,t,n,r){e.save(),e.translate(t,n),e.scale(r,r),e.lineWidth=2.2,e.fillStyle=`#f39a2b`,e.strokeStyle=`#4a2a05`,Fh(e,-9,25,7,4),e.fill(),e.stroke(),Fh(e,9,25,7,4),e.fill(),e.stroke(),e.fillStyle=`#ffd23a`,e.strokeStyle=`#6a4a00`,e.beginPath(),e.rect(17,3,9,4),e.fill(),e.stroke(),Fh(e,27,5,4.5,5.5),e.fill(),e.stroke(),e.strokeStyle=`#6f6f78`,e.lineWidth=3,e.beginPath(),e.moveTo(0,-13),e.quadraticCurveTo(1,-20,5,-24),e.stroke(),e.fillStyle=`#1b1b24`,e.strokeStyle=`#000000`,e.lineWidth=2.2,e.beginPath(),e.arc(0,6,19,0,J),e.fill(),e.stroke(),e.fillStyle=`rgba(255,255,255,0.22)`,Fh(e,-7,-4,6,3.5),e.fill(),e.fillStyle=`#ffffff`,Fh(e,-6,4,3,4.8),e.fill(),Fh(e,6,4,3,4.8),e.fill(),e.fillStyle=`#000`,Fh(e,-5.5,5.5,1.3,2.2),e.fill(),Fh(e,6.5,5.5,1.3,2.2),e.fill(),e.fillStyle=`#ff9a1f`,e.beginPath(),e.arc(6,-25,4,0,J),e.fill(),e.fillStyle=`#fff3b0`,e.beginPath(),e.arc(6,-25,1.8,0,J),e.fill(),e.restore()}var Wh=new Map,Gh=new Map,Kh=new Map;function qh(e,t){let n=Wh.get(e);return n||(n=t(),Wh.set(e,n)),n}function Jh(e,t){let n=Gh.get(e);return n||(n=t(),Gh.set(e,n)),n}function Yh(e,t){let n=Kh.get(e);return n||(n=t(),Kh.set(e,n)),n}function Xh(e,t){let n=document.createElement(`canvas`);n.width=e,n.height=e;let r=n.getContext(`2d`);r&&t(r);let i=new Fi(n);return i.colorSpace=We,i.anisotropy=4,i}function Zh(){return Yh(`shellHex`,()=>Xh(256,e=>{e.fillStyle=`#ffffff`,e.fillRect(0,0,256,256),e.strokeStyle=`rgba(0,0,0,0.42)`,e.lineWidth=7,e.lineJoin=`round`;let t=Math.sqrt(3)*40;for(let n=-1;n<6;n++)for(let r=-1;r<5;r++){let i=r*40*3+(n%2==0?0:60),a=n*t/2;e.beginPath();for(let t=0;t<6;t++){let n=t*Math.PI/3,r=i+Math.cos(n)*40,o=a+Math.sin(n)*40;t===0?e.moveTo(r,o):e.lineTo(r,o)}e.closePath(),e.stroke()}}))}function Qh(e,t,n){return Yh(e,()=>Xh(256,e=>{e.fillStyle=t,e.fillRect(0,0,256,256),e.fillStyle=n,e.fillRect(0,0,256,26);for(let t=0;t<5;t++){let n=26+t*51.2;e.beginPath(),e.ellipse(n,96,22,26,0,0,J),e.fill()}}))}function $h(e,t){return Jh(e,()=>new G(t))}function eg(e,t,n,r){let i=e.attributes.position,a=new B,o=new B;for(let e=0;e<=n;e++){let s=e/n;t.getPointAt(s,a);let c=Math.abs(2*s-1),l=1-.72*c*c*c*c;for(let t=0;t<=r;t++){let n=e*(r+1)+t;o.fromBufferAttribute(i,n).sub(a).multiplyScalar(l).add(a),i.setXYZ(n,o.x,o.y,o.z)}}i.needsUpdate=!0,e.computeVertexNormals()}function tg(){return new ha(new B(-.46,.2,0),new B(0,-.3,0),new B(.46,.2,0))}function ng(){let e=new Fn,t=new H(qh(`banana`,()=>{let e=tg(),t=new ho(e,16,.115,8,!1);return eg(t,e,16,8),t}),$h(`banana`,{color:16765498,roughness:.45,metalness:0}));t.castShadow=!0,e.add(t);let n=qh(`bananaTip`,()=>new Vi(.05,.14,6)),r=$h(`bananaTip`,{color:5913360,roughness:.8}),i=tg(),a=new B,o=new B;for(let t=0;t<2;t++){let s=new H(n,r);i.getPointAt(t,a),i.getTangentAt(t,o),t===0&&o.negate(),s.position.copy(a).addScaledVector(o,.04),s.quaternion.setFromUnitVectors(new B(0,1,0),o.normalize()),e.add(s)}return e.position.y=.32,e}function rg(e,t,n){let r=new Fn,i=new H(qh(`shellDome`,()=>new po(.42,12,6,0,J,0,Math.PI/2)),$h(`shell_${t}`,{color:e,roughness:.35,metalness:.05,map:Zh()}));i.castShadow=!0,r.add(i);let a=new H(qh(`shellRim`,()=>new mo(.4,.065,6,16)),$h(`shellRim`,{color:16446432,roughness:.5}));a.rotation.x=Math.PI/2,r.add(a);let o=new H(qh(`shellBody`,()=>new W(.36,.3,.16,12,1,!1)),$h(`shellBody`,{color:15852216,roughness:.6}));if(o.position.y=-.1,r.add(o),n){let e=qh(`shellSpike`,()=>new Vi(.07,.18,5)),t=$h(`shellSpike`,{color:16777215,roughness:.3});for(let n=0;n<6;n++){let i=n/6*J,a=new H(e,t),o=new B(Math.cos(i)*.72,.7,Math.sin(i)*.72).normalize();a.position.copy(o).multiplyScalar(.44),a.quaternion.setFromUnitVectors(new B(0,1,0),o),r.add(a)}let n=new H(e,t);n.position.y=.46,r.add(n);let i=qh(`shellFin`,()=>{let e=new ba;return e.moveTo(0,0),e.lineTo(.55,.12),e.lineTo(.62,.34),e.lineTo(.05,.2),e.closePath(),new uo(e)}),a=$h(`shellFin`,{color:16777215,roughness:.4,side:2});for(let e=-1;e<=1;e+=2){let t=new H(i,a);t.position.set(e*.34,.05,.12),t.rotation.y=e>0?0:Math.PI,t.rotation.z=e*-.15,r.add(t)}}return r.position.y=.2,r}function ig(e){let t=new Fn,n=e?Qh(`capGold`,`#f2b31a`,`#fff2b8`):Qh(`capRed`,`#e5261c`,`#ffffff`),r=new H(qh(`mushCap`,()=>new po(.4,14,8,0,J,0,Math.PI*.56)),e?$h(`mushCapGold`,{map:n,roughness:.28,metalness:.75,emissive:3810304,emissiveIntensity:.6}):$h(`mushCapRed`,{map:n,roughness:.4,metalness:0}));r.castShadow=!0,t.add(r);let i=new H(qh(`mushUnder`,()=>new Bi(.4*Math.sin(Math.PI*.56),14)),$h(`mushUnder`,{color:16245693,roughness:.8,side:2}));i.rotation.x=Math.PI/2,i.position.y=.4*Math.cos(Math.PI*.56),t.add(i);let a=new H(qh(`mushStem`,()=>new W(.2,.24,.36,10,1)),$h(`mushStem`,{color:e?16773312:16774880,roughness:.7}));a.position.y=-.2,t.add(a);let o=qh(`mushEye`,()=>new po(.035,6,4)),s=$h(`mushEye`,{color:1381656,roughness:.5});for(let e=-1;e<=1;e+=2){let n=new H(o,s);n.position.set(e*.08,-.16,-.21),n.scale.set(1,1.6,1),t.add(n)}return t.position.y=.42,t}function ag(){let e=new Fn,t=new H(qh(`star`,()=>{let e=new ba;for(let t=0;t<10;t++){let n=t%2==0?.46:.2,r=Math.PI/2+t*Math.PI/5,i=Math.cos(r)*n,a=Math.sin(r)*n;t===0?e.moveTo(i,a):e.lineTo(i,a)}e.closePath();let t=new io(e,{depth:.14,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1,curveSegments:1});return t.translate(0,0,-.07),t}),$h(`star`,{color:16769354,emissive:16757504,emissiveIntensity:.9,roughness:.3,metalness:.2}));return t.castShadow=!0,e.add(t),e.position.y=.5,e}function og(){let e=new Fn,t=new H(qh(`bombBody`,()=>new po(.36,12,8)),$h(`bombBody`,{color:1381660,roughness:.35,metalness:.3}));t.name=`bombBody`,t.castShadow=!0,e.add(t);let n=qh(`bombFoot`,()=>new W(.08,.09,.07,8)),r=$h(`bombFoot`,{color:15964715,roughness:.6});for(let t=-1;t<=1;t+=2){let i=new H(n,r);i.position.set(t*.16,-.36,.03),e.add(i)}let i=$h(`bombKey`,{color:16765498,roughness:.3,metalness:.6}),a=new H(qh(`bombKeyShaft`,()=>new W(.03,.03,.16,6)),i);a.rotation.z=Math.PI/2,a.position.set(.42,.02,0),e.add(a);let o=new H(qh(`bombKeyRing`,()=>new mo(.09,.022,4,8)),i);o.rotation.y=Math.PI/2,o.position.set(.53,.02,0),e.add(o);let s=new H(qh(`bombFuse`,()=>new W(.025,.025,.16,5)),$h(`bombFuse`,{color:7829376,roughness:.9}));s.position.set(.03,.42,0),s.rotation.z=-.25,e.add(s);let c=new H(qh(`bombTip`,()=>new po(.05,6,4)),$h(`bombTip`,{color:16756768,emissive:16742912,emissiveIntensity:2.5,roughness:.5}));c.name=`bombTip`,c.position.set(.05,.51,0),e.add(c);let l=qh(`bombEye`,()=>new po(.05,6,4)),u=$h(`bombEye`,{color:16777215,roughness:.4});for(let t=-1;t<=1;t+=2){let n=new H(l,u);n.position.set(t*.11,.02,-.33),n.scale.set(1,1.5,.6),e.add(n)}return e.position.y=.43,e}function sg(){let e=new Fn,t=qh(`bolt`,()=>{let e=new ba;return e.moveTo(.08,.5),e.lineTo(-.22,.02),e.lineTo(-.02,.02),e.lineTo(-.18,-.5),e.lineTo(.3,.12),e.lineTo(.08,.12),e.lineTo(.28,.5),e.closePath(),new uo(e)}),n=new H(t,Jh(`bolt`,()=>new Yr({color:16769333,side:2,toneMapped:!1})));e.add(n);let r=new H(t,Jh(`boltGlow`,()=>new Yr({color:16761856,side:2,transparent:!0,opacity:.45,blending:2,depthWrite:!1,toneMapped:!1})));return r.scale.setScalar(1.35),r.position.z=-.01,e.add(r),e.position.y=.55,e}function cg(e){switch(e){case`banana`:case`triple_banana`:return ng();case`green_shell`:case`triple_green_shell`:return rg(3134026,`green`,!1);case`red_shell`:case`triple_red_shell`:return rg(16726832,`red`,!1);case`blue_shell`:return rg(3111935,`blue`,!0);case`mushroom`:case`triple_mushroom`:return ig(!1);case`golden_mushroom`:return ig(!0);case`star`:return ag();case`lightning`:return sg();case`bob_omb`:return og();default:return new Fn}}function lg(e){switch(e){case`triple_banana`:return`banana`;case`triple_green_shell`:return`green_shell`;case`triple_red_shell`:return`red_shell`;case`triple_mushroom`:return`mushroom`;default:return e}}function ug(){for(let e of Wh.values())e.dispose();Wh.clear();for(let e of Gh.values())e.dispose();Gh.clear();for(let e of Kh.values())e.dispose();Kh.clear(),jh.clear()}var dg=40,fg=.35,pg=.95,mg=1.05,hg=r+.9,gg=.4,_g=10,vg=20,yg=.25,bg=34,xg=30,Sg=45,Cg=.35,wg=9,Tg=8,Eg=40,Dg=2.5,Og=4,kg=1.5,Ag=.55,jg=2.4,Mg=[{banana:35,green_shell:35,triple_banana:10,bob_omb:5,red_shell:15},{banana:22,green_shell:26,red_shell:22,triple_green_shell:12,mushroom:10,bob_omb:8},{banana:16,green_shell:22,red_shell:26,triple_green_shell:14,mushroom:14,bob_omb:8},{red_shell:26,triple_red_shell:14,mushroom:26,triple_mushroom:14,bob_omb:12,star:8},{red_shell:22,triple_red_shell:16,mushroom:22,triple_mushroom:18,bob_omb:12,star:10},{triple_mushroom:28,star:20,red_shell:15,lightning:10,golden_mushroom:22,triple_red_shell:5},{star:22,lightning:13,golden_mushroom:24,blue_shell:12,triple_mushroom:19,triple_red_shell:10},{star:22,lightning:17,golden_mushroom:22,blue_shell:16,triple_mushroom:15,triple_red_shell:8}],Ng=(()=>{let e=1.18,t=i*.95*.17999999999999994/(e**_g-1),n=[];for(let r=0;r<_g;r++)n.push(t*e**r);return n})(),Pg=new B,Fg=new B,Ig=new B,Lg=new B,Rg=new B,zg=new B(0,1,0),Bg=new It,Vg=new _n,Hg=new sn,Ug=new B;function Wg(){return{t:0,surface:`road`,groundY:0,groundNormal:new B(0,1,0),lateral:0,halfWidth:6,wallHalfWidth:7,tangent:new B(0,0,-1),binormal:new B(1,0,0),center:new B}}function Gg(){return{position:new B,tangent:new B(0,0,-1),normal:new B(0,1,0),binormal:new B(1,0,0),halfWidth:6,wallHalfWidth:7,t:0}}var Kg=Wg(),qg=Wg(),Jg=Gg(),Yg=Gg(),Xg=`
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
void main() {
  mat4 model = modelMatrix;
  #ifdef USE_INSTANCING
    model = modelMatrix * instanceMatrix;
  #endif
  vec4 worldPos = model * vec4(position, 1.0);
  vNormal = normalize(mat3(model) * normal);
  vWorldPos = worldPos.xyz;
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`,Zg=`
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + vec3(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
  return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
}
void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vViewDir);
  float ndv = abs(dot(n, v));
  float fres = pow(1.0 - ndv, 2.2);
  float hue = fract(ndv * 0.9 + uTime * 0.15 + (vWorldPos.x + vWorldPos.z) * 0.35 + vWorldPos.y * 0.5 + n.y * 0.2);
  vec3 col = hsv2rgb(vec3(hue, 1.0, 1.0));
  col = mix(col, vec3(1.0), fres * 0.35);
  float alpha = 0.6 + fres * 0.35;
  gl_FragColor = vec4(col * 1.15, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Qg=1,$g=class{object=new Fn;debugCounts={pickup:0,use:0,hit:0,destroyed:0,rowPassEmpty:0,explosion:0};particles;track=null;karts=[];records=[];time=0;lastLightningTime=-1e3;hazards=[];hazardOut=[];boxes=[];boxOut=[];rowTs=[];boxMesh=null;innerMesh=null;ringMesh=null;boxMaterial=null;innerMaterial=null;ringMaterial=null;boxGeometry=null;innerGeometry=null;ringGeometry=null;questionTexture=null;constructor(e){this.particles=e,this.object.name=`ItemManager`}init(e,t){this.clearAll(),this.track=e,this.karts=t,this.records=t.map(e=>({kart:e,rouletteActive:!1,rouletteTimer:0,tickTimer:0,ticks:0,lastUseTime:-10,orbitType:`none`,orbitMeshes:[],orbitAngle:Math.random()*J,orbitHitCooldown:0,prevT:e.state.trackT})),this.rowTs=e.def.itemBoxRows.slice(),this.resetDebugCounts(),this.buildBoxes(e)}resetDebugCounts(){let e=this.debugCounts;e.pickup=e.use=e.hit=e.destroyed=e.rowPassEmpty=e.explosion=0}reset(){this.clearAll();for(let e of this.boxes)e.active=!0,e.respawnTimer=0,e.scale=1;for(let e of this.records){e.rouletteActive=!1,e.rouletteTimer=0,e.lastUseTime=-10;let t=e.kart.state;t.item=`none`,t.itemCount=0,t.itemRouletteActive=!1,e.prevT=t.trackT}this.lastLightningTime=-1e3,this.time=0,this.resetDebugCounts()}dispose(){this.clearAll(),this.disposeBoxes(),this.records=[],this.karts=[],this.track=null,ug()}clearAll(){for(let e=this.hazards.length-1;e>=0;e--)this.removeHazard(e);for(let e of this.records)this.clearOrbit(e),e.rouletteActive=!1}buildBoxes(e){this.disposeBoxes(),this.boxes.length=0;let t=e.itemBoxPositions;if(t.length===0)return;for(let n=0;n<t.length;n++){let r=t[n],i=e.query(r,void 0,Kg);this.boxes.push({base:r.clone(),groundY:i.groundY,world:new B(r.x,i.groundY+mg,r.z),active:!0,respawnTimer:0,scale:1,phase:n*.73%J})}let n=this.boxes.length;this.boxGeometry=new U(pg,pg,pg),this.boxMaterial=new wo({vertexShader:Xg,fragmentShader:Zg,uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1,side:0}),this.boxMesh=new vi(this.boxGeometry,this.boxMaterial,n),this.boxMesh.frustumCulled=!1,this.boxMesh.renderOrder=3,this.boxMesh.name=`itemBoxes`,this.object.add(this.boxMesh),this.questionTexture=this.makeQuestionTexture(),this.innerGeometry=new U(.46,.46,.46),this.innerMaterial=new Yr({map:this.questionTexture,transparent:!0,depthWrite:!1,toneMapped:!1}),this.innerMesh=new vi(this.innerGeometry,this.innerMaterial,n),this.innerMesh.frustumCulled=!1,this.innerMesh.renderOrder=2,this.innerMesh.name=`itemBoxQuestion`,this.object.add(this.innerMesh),this.ringGeometry=new lo(.55,1,24),this.ringMaterial=new Yr({color:10477823,transparent:!0,opacity:.4,blending:2,depthWrite:!1,side:2}),this.ringMesh=new vi(this.ringGeometry,this.ringMaterial,n),this.ringMesh.frustumCulled=!1,this.ringMesh.renderOrder=1,this.ringMesh.name=`itemBoxRings`,this.object.add(this.ringMesh),this.updateBoxMatrices()}makeQuestionTexture(){let e=document.createElement(`canvas`);e.width=128,e.height=128;let t=e.getContext(`2d`);t&&(t.clearRect(0,0,128,128),t.font=`bold 100px "Arial Black", Impact, Arial, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.lineWidth=12,t.lineJoin=`round`,t.strokeStyle=`#8a4b00`,t.strokeText(`?`,64,70),t.fillStyle=`#fff4b8`,t.fillText(`?`,64,70));let n=new Fi(e);return n.colorSpace=We,n}disposeBoxes(){this.boxMesh&&this.object.remove(this.boxMesh),this.innerMesh&&this.object.remove(this.innerMesh),this.ringMesh&&this.object.remove(this.ringMesh),this.boxMesh?.dispose(),this.innerMesh?.dispose(),this.ringMesh?.dispose(),this.boxGeometry?.dispose(),this.innerGeometry?.dispose(),this.ringGeometry?.dispose(),this.boxMaterial?.dispose(),this.innerMaterial?.dispose(),this.ringMaterial?.dispose(),this.questionTexture?.dispose(),this.boxMesh=this.innerMesh=this.ringMesh=null,this.boxGeometry=this.innerGeometry=this.ringGeometry=null,this.boxMaterial=null,this.innerMaterial=this.ringMaterial=null,this.questionTexture=null}updateBoxes(e){for(let t of this.boxes)t.active?t.scale<1&&(t.scale=Math.min(1,t.scale+e/gg)):(t.respawnTimer-=e,t.respawnTimer<=0&&(t.active=!0,t.scale=0,q.emit(`item:boxRespawn`,{position:t.world.clone()}))),t.world.set(t.base.x,t.groundY+mg+Math.sin(this.time*2.1+t.phase)*.12,t.base.z);this.updateBoxMatrices();for(let e of this.records){let t=e.kart.state,n=t.item===`none`&&!t.itemRouletteActive&&!e.rouletteActive,r=rd(e.prevT,t.trackT);if(r>0&&r<.05&&n&&!t.finished)for(let t=0;t<this.rowTs.length;t++){let n=rd(e.prevT,this.rowTs[t]);n>=0&&n<r&&this.debugCounts.rowPassEmpty++}if(e.prevT=t.trackT,!(!n||t.isSpinning))for(let n of this.boxes){if(!n.active||n.scale<.5)continue;let r=t.position.x-n.world.x,i=t.position.z-n.world.z,a=t.position.y-n.groundY;if(!(r*r+i*i>hg*hg||a>2.6||a<-1.5)){n.active=!1,n.respawnTimer=3,n.scale=0,this.startRoulette(e),this.debugCounts.pickup++,q.emit(`item:pickup`,{kartId:t.id,position:n.world.clone(),isPlayer:t.isPlayer}),this.particles?.emit(`itemBoxBurst`,n.world);break}}}}updateBoxMatrices(){if(!this.boxMesh||!this.innerMesh||!this.ringMesh)return;this.boxMaterial&&(this.boxMaterial.uniforms.uTime.value=this.time);let e=.85+Math.sin(this.time*3)*.15;for(let t=0;t<this.boxes.length;t++){let n=this.boxes[t],r=n.active?e_(n.scale):0;Vg.set(this.time*.8+n.phase,this.time*1.3+n.phase*2,0),Bg.setFromEuler(Vg),Ug.setScalar(r),Hg.compose(n.world,Bg,Ug),this.boxMesh.setMatrixAt(t,Hg),Vg.set(0,-this.time*1.6+n.phase,0),Bg.setFromEuler(Vg),Ug.setScalar(r),Hg.compose(n.world,Bg,Ug),this.innerMesh.setMatrixAt(t,Hg),Pg.set(n.base.x,n.groundY+.03,n.base.z),Vg.set(-Math.PI/2,0,this.time*.5),Bg.setFromEuler(Vg),Ug.setScalar(n.active?e*(.6+.4*n.scale):e*.5),Hg.compose(Pg,Bg,Ug),this.ringMesh.setMatrixAt(t,Hg)}this.boxMesh.instanceMatrix.needsUpdate=!0,this.innerMesh.instanceMatrix.needsUpdate=!0,this.ringMesh.instanceMatrix.needsUpdate=!0}getActiveBoxPositions(){this.boxOut.length=0;for(let e of this.boxes)e.active&&e.scale>=.5&&this.boxOut.push(e.world);return this.boxOut}startRoulette(e){e.rouletteActive=!0,e.rouletteTimer=i,e.ticks=0,e.tickTimer=Ng[0],e.kart.state.itemRouletteActive=!0,e.kart.state.item=`none`,e.kart.state.itemCount=0}updateRoulette(e,t){if(!e.rouletteActive)return;let n=e.kart.state;if(e.rouletteTimer-=t,e.tickTimer-=t,e.tickTimer<=0&&e.ticks<_g&&(q.emit(`item:rouletteTick`,{kartId:n.id,isPlayer:n.isPlayer}),e.ticks++,e.ticks<_g&&(e.tickTimer+=Ng[e.ticks])),e.rouletteTimer<=0){e.rouletteActive=!1;let t=this.rollItem(n.place);n.item=t,n.itemCount=t.startsWith(`triple_`)||t===`golden_mushroom`?3:1,n.itemRouletteActive=!1,q.emit(`item:rouletteEnd`,{kartId:n.id,item:t,isPlayer:n.isPlayer})}}rollItem(e){let t=Mg[Xu(Math.round(e),1,Mg.length)-1],n=this.time-this.lastLightningTime>vg,r=0;for(let i in t){let a=i;a===`lightning`&&!n||a===`blue_shell`&&e<=1||(r+=t[a]??0)}if(r<=0)return`banana`;let i=Math.random()*r;for(let r in t){let a=r;if(!(a===`lightning`&&!n)&&!(a===`blue_shell`&&e<=1)&&(i-=t[a]??0,i<=0))return a}return`banana`}requestUse(e,t){let n=e.state;if(!this.track||n.item===`none`||n.itemCount<=0||n.itemRouletteActive||n.isSpinning||n.isFrozen)return;let r=this.records.find(t=>t.kart===e);if(r&&r.rouletteActive)return;let i=n.item,a=lg(i);if(i===`golden_mushroom`&&r&&this.time-r.lastUseTime<yg)return;let o=n.speed,s=e.topSpeed();switch(e.forwardDir(Lg),Lg.y=0,Lg.lengthSq()<1e-6&&Lg.set(0,0,-1),Lg.normalize(),a){case`banana`:!t&&o>.5*s?this.spawnLobbed(`banana`,e,`banana`,7.5,Math.max(o,0)+12):this.spawnDropped(`banana`,e,`banana`);break;case`green_shell`:this.spawnShell(`green_shell`,e,t,i);break;case`red_shell`:this.spawnShell(`red_shell`,e,t,i);break;case`blue_shell`:this.spawnBlueShell(e);break;case`mushroom`:e.applyBoost(.55,1.5,`mushroom`),this.particles?.emit(`boostRing`,n.position);break;case`golden_mushroom`:e.applyBoost(.55,1.5,`golden`),this.particles?.emit(`boostRing`,n.position,{color:16762161});break;case`star`:e.applyStar(8);break;case`lightning`:this.useLightning(e);break;case`bob_omb`:t?this.spawnDropped(`bob_omb`,e,`bob_omb`):this.spawnLobbed(`bob_omb`,e,`bob_omb`,8.5,Math.max(o,0)+13);break;default:return}r&&(r.lastUseTime=this.time),n.itemCount=Math.max(0,n.itemCount-1),n.itemCount===0&&(n.item=`none`),this.debugCounts.use++,q.emit(`item:use`,{kartId:n.id,item:i,position:n.position.clone(),isPlayer:n.isPlayer})}useLightning(e){let t=e.state.id;this.lastLightningTime=this.time;for(let n of this.karts){if(n===e)continue;let r=n.state;r.isInvincible||r.finished||(n.applyShrink(6),r.isAirborne||n.applyHit(`lightning`,t),Pg.copy(r.position),Pg.y+=2.5,this.particles?.emit(`lightningStrike`,Pg,{direction:Fg.set(0,-1,0)}),this.debugCounts.hit++,q.emit(`item:hit`,{kartId:r.id,item:`lightning`,position:r.position.clone(),sourceKartId:t,isPlayer:r.isPlayer}))}q.emit(`item:lightning`,{sourceKartId:t})}newHazard(e,t,n){this.hazards.length>=dg&&this.removeHazard(0);let r=cg(e),i=null;if(e===`bob_omb`){let e=r.getObjectByName(`bombBody`);e&&e.material instanceof G&&(i=e.material.clone(),e.material=i)}let a={id:Qg++,type:e,reportType:t,kind:e,position:new B,velocity:new B,radius:e===`banana`?.45:e===`bob_omb`?.5:.45,ownerId:n.state.id,mesh:r,age:0,life:e===`banana`?Eg:e===`green_shell`?wg:e===`red_shell`?Tg:30,hintT:n.state.trackT,speed:0,bounces:0,maxBounces:0,homing:!1,targetId:-1,airborne:!1,resting:!1,fuse:Dg,blinkPhase:0,wobblePhase:Math.random()*J,bodyMat:i,flightT:0,trailTimer:0,hidden:!1};return this.hazards.push(a),this.object.add(r),a}spawnDropped(e,t,n){if(!this.track)return;let r=this.newHazard(e,n,t);r.position.copy(t.state.position).addScaledVector(Lg,-1.7);let i=this.track.query(r.position,r.hintT,Kg);r.hintT=i.t,r.position.y=i.groundY+.02,r.velocity.set(0,0,0),r.resting=!0,r.mesh.position.copy(r.position),r.mesh.rotation.y=Math.random()*J}spawnLobbed(e,t,n,r,i){let a=this.newHazard(e,n,t);a.position.copy(t.state.position).addScaledVector(Lg,1.3),a.position.y+=.6,a.velocity.copy(Lg).multiplyScalar(i),a.velocity.y=r,a.airborne=!0,a.mesh.position.copy(a.position)}spawnShell(e,t,n,r){if(!this.track)return;let i=t.state,a=this.newHazard(e,r,t),o=n?-1:1;a.position.copy(i.position).addScaledVector(Lg,o*1.4);let s=this.track.query(a.position,a.hintT,Kg);a.hintT=s.t,a.position.y=s.groundY+Cg,e===`green_shell`?(a.speed=bg,a.maxBounces=6,a.homing=!1):n?(a.speed=xg,a.maxBounces=6,a.homing=!1):(a.speed=xg,a.maxBounces=0,a.targetId=this.findRedTarget(t),a.homing=a.targetId>=0),a.velocity.copy(Lg).multiplyScalar(o*a.speed),a.mesh.position.copy(a.position)}findRedTarget(e){let t=e.state.trackT,n=-1,r=.35;for(let i of this.karts){if(i===e)continue;let a=i.state;if(a.finished)continue;let o=rd(t,a.trackT);o>.002&&o<r&&(r=o,n=a.id)}return n}findLeader(e){let t=null;for(let n of this.karts)n!==e&&(!t||n.state.place<t.state.place)&&(t=n);return t}spawnBlueShell(e){if(!this.track)return;let t=this.findLeader(e),n=this.newHazard(`blue_shell`,`blue_shell`,e);n.position.copy(e.state.position).addScaledVector(Lg,1.5),n.position.y+=1,n.flightT=e.state.trackT,n.speed=Sg,n.targetId=t?t.state.id:-1,n.homing=!0,n.life=30,n.velocity.copy(Lg).multiplyScalar(Sg),n.mesh.position.copy(n.position),n.hidden=!0,q.emit(`item:blueShellLaunch`,{targetKartId:n.targetId})}kartById(e){for(let t of this.karts)if(t.state.id===e)return t;return null}removeHazard(e){let t=this.hazards[e];t&&(this.object.remove(t.mesh),t.bodyMat?.dispose(),this.hazards.splice(e,1))}destroyHazard(e,t,n){let r=this.hazards[e];r&&(t&&this.particles?.emit(t,r.position),n&&(this.debugCounts.destroyed++,q.emit(`item:destroyed`,{item:r.reportType,position:r.position.clone()})),this.removeHazard(e))}breakPresetFor(e){return e===`banana`?`bananaSplat`:`shellBreak`}updateHazards(e){let t=this.track;if(t){for(let n=this.hazards.length-1;n>=0;n--){let r=this.hazards[n];if(r.age+=e,r.age>r.life){this.removeHazard(n);continue}let i=!0;switch(r.kind){case`green_shell`:case`red_shell`:i=this.moveShell(r,n,e,t);break;case`blue_shell`:i=this.moveBlueShell(r,n,e,t);break;case`banana`:this.moveGroundItem(r,e,t);break;case`bob_omb`:this.moveGroundItem(r,e,t),r.fuse-=e,this.blinkBomb(r,e),r.fuse<=0&&(this.explode(r.position,r.ownerId,`bob_omb`,`explosion`),this.removeHazard(n),i=!1)}i&&this.animateHazard(r,e)}this.collideHazardsWithKarts(),this.collideHazardsWithHazards()}}moveShell(e,t,n,r){if(e.homing)this.steerRedShell(e,n,r);else{let t=r.query(e.position,e.hintT,qg),i=e.velocity.dot(t.tangent);Math.abs(i)>1&&(Pg.copy(t.tangent).multiplyScalar(Math.sign(i)),e.velocity.lerp(Pg.multiplyScalar(e.speed),Math.min(1,.35*n)))}e.velocity.y=0,e.velocity.lengthSq()>1e-6&&e.velocity.setLength(e.speed),e.position.addScaledVector(e.velocity,n);let i=r.query(e.position,e.hintT,Kg);e.hintT=i.t;let a=i.wallHalfWidth-.4;if(Math.abs(i.lateral)>a){if(e.bounces>=e.maxBounces)return this.destroyHazard(t,`shellBreak`,!0),!1;let n=e.velocity.dot(i.binormal);e.velocity.addScaledVector(i.binormal,-2*n);let r=Math.abs(i.lateral)-a;e.position.addScaledVector(i.binormal,-Math.sign(i.lateral)*(r+.05)),e.bounces++,q.emit(`item:shellBounce`,{position:e.position.clone()}),this.particles?.emit(`hitSparks`,e.position)}return i.surface===`void`&&Math.abs(i.lateral)>i.halfWidth?(this.destroyHazard(t,`shellBreak`,!0),!1):(e.position.y=i.groundY+Cg,!0)}steerRedShell(e,t,n){let r=this.kartById(e.targetId);if(!r||r.state.finished){e.homing=!1;return}let i=r.state,a=n.query(e.position,e.hintT,qg);Pg.subVectors(i.position,e.position),Pg.y=0;let o=Pg.length();if(o<16)Pg.addScaledVector(i.velocity,.12),Pg.y=0,Pg.normalize();else{let e=rd(a.t,i.trackT)>=0?1:-1;Pg.copy(a.tangent).multiplyScalar(e).addScaledVector(a.binormal,-a.lateral*.18),Pg.y=0,Pg.normalize()}Fg.copy(e.velocity),Fg.y=0,Fg.lengthSq()<1e-6&&Fg.copy(Pg),Fg.normalize();let s=Fg.x*Pg.z-Fg.z*Pg.x,c=Xu(Fg.dot(Pg),-1,1),l=Math.atan2(s,c),u=(o<16?6.5:3.5)*t,d=Xu(l,-u,u),f=Math.cos(d),p=Math.sin(d),m=Fg.x*f-Fg.z*p,h=Fg.x*p+Fg.z*f;e.velocity.set(m*e.speed,0,h*e.speed)}moveBlueShell(e,t,n,r){let i=this.kartById(e.targetId);if(!i){let t=this.kartById(e.ownerId);i=t?this.findLeader(t):null,e.targetId=i?i.state.id:-1}if(!i)return this.destroyHazard(t,`shellBreak`,!0),!1;let a=i.state,o=Math.max(1,r.length),s=nd(a.trackT-e.flightT)*o;if(Pg.subVectors(a.position,e.position),Pg.length()<2.5||s<1.5&&e.age>.5)return e.position.copy(a.position),this.explode(e.position,e.ownerId,`blue_shell`,`blue_shell`),this.removeHazard(t),!1;e.flightT=nd(e.flightT+e.speed*n/o);let c=r.sample(e.flightT,Jg),l=r.sample(a.trackT,Yg);Fg.subVectors(a.position,l.position);let u=Zu(0,Xu(Fg.dot(l.binormal),-l.halfWidth,l.halfWidth),Xu(1-s/30,0,1)),d=Xu(e.age/.6,0,1),f=Xu(s/14,0,1),p=Zu(.9,3.6,d)*Zu(.25,1,f)+.3;return Ig.copy(c.position).addScaledVector(c.binormal,u),Ig.y=c.position.y+p,e.velocity.subVectors(Ig,e.position).multiplyScalar(1/Math.max(n,1e-4)),e.position.copy(Ig),e.hintT=e.flightT,e.hidden=p>3,e.trailTimer-=n,e.trailTimer<=0&&(e.trailTimer=.05,this.particles?.emit(`starSparkle`,e.position,{color:4164863,scale:.8})),!0}moveGroundItem(e,t,n){if(e.resting)return;if(e.airborne){e.velocity.y-=26*t,e.position.addScaledVector(e.velocity,t);let r=n.query(e.position,e.hintT,Kg);e.hintT=r.t;let i=r.groundY+.02;e.position.y<=i&&e.velocity.y<0&&(e.position.y=i,e.kind===`bob_omb`&&e.velocity.y<-4?(e.velocity.y*=-.3,e.velocity.x*=.5,e.velocity.z*=.5):(e.airborne=!1,e.velocity.y=0,e.kind===`banana`?(e.velocity.set(0,0,0),e.resting=!0):e.velocity.multiplyScalar(.4),this.particles?.emit(`landPuff`,e.position,{scale:.5})));return}let r=Math.exp(-4*t);if(e.velocity.multiplyScalar(r),e.velocity.lengthSq()<.05){e.velocity.set(0,0,0),e.resting=!0;return}e.position.addScaledVector(e.velocity,t);let i=n.query(e.position,e.hintT,Kg);e.hintT=i.t,e.position.y=i.groundY+.02}blinkBomb(e,t){if(!e.bodyMat)return;let n=Xu(1-e.fuse/Dg,0,1);e.blinkPhase+=t*(5+n*22),Math.sin(e.blinkPhase)>.2?(e.bodyMat.color.setHex(13904415),e.bodyMat.emissive.setHex(16722448),e.bodyMat.emissiveIntensity=.5+n):(e.bodyMat.color.setHex(1381660),e.bodyMat.emissive.setHex(0),e.bodyMat.emissiveIntensity=0)}animateHazard(e,t){let n=e.mesh;switch(n.position.copy(e.position),e.kind){case`green_shell`:case`red_shell`:n.rotation.y+=14*t;break;case`blue_shell`:n.rotation.y+=10*t;break;case`banana`:e.airborne?(n.rotation.x+=9*t,n.rotation.y+=4*t):(n.rotation.x=0,n.rotation.z=Math.sin(this.time*3.2+e.wobblePhase)*.12);break;case`bob_omb`:e.airborne?n.rotation.x+=6*t:(n.rotation.x=0,n.rotation.z=Math.sin(this.time*18)*.06*Xu(1-e.fuse/Dg,0,1))}}collideHazardsWithKarts(){for(let e=this.hazards.length-1;e>=0;e--){let t=this.hazards[e];if(t.kind===`blue_shell`)continue;let n=r+t.radius;for(let r of this.karts){let i=r.state;if(i.id===t.ownerId&&t.age<fg||i.isSpinning||i.finished)continue;let a=i.position.x-t.position.x,o=i.position.y+.45-t.position.y,s=i.position.z-t.position.z;if(!(a*a+o*o+s*s>n*n)){if(t.kind===`bob_omb`){this.explode(t.position,t.ownerId,`bob_omb`,`explosion`),this.removeHazard(e);break}if(i.isInvincible){this.destroyHazard(e,this.breakPresetFor(t.kind),!0);break}r.applyHit(t.kind,t.ownerId),t.kind===`banana`?(r.forwardDir(Lg),Rg.crossVectors(Lg,zg).normalize(),Pg.copy(Rg).multiplyScalar(Math.random()<.5?-1.8:1.8),Pg.y=1.2,r.applyImpulse(Pg)):(Pg.copy(t.velocity).normalize().multiplyScalar(2.5),Pg.y=1.5,r.applyImpulse(Pg)),this.debugCounts.hit++,q.emit(`item:hit`,{kartId:i.id,item:t.reportType,position:i.position.clone(),sourceKartId:t.ownerId,isPlayer:i.isPlayer}),this.destroyHazard(e,this.breakPresetFor(t.kind),!1);break}}}}collideHazardsWithHazards(){for(let e=this.hazards.length-1;e>=0;e--){let t=this.hazards[e];if(!t||t.kind===`blue_shell`)continue;let n=t.kind===`green_shell`||t.kind===`red_shell`;for(let r=e-1;r>=0;r--){let i=this.hazards[r];if(i.kind===`blue_shell`)continue;let a=i.kind===`green_shell`||i.kind===`red_shell`;if(!n&&!a||t.airborne||i.airborne)continue;let o=t.radius+i.radius;if(!(t.position.distanceToSquared(i.position)>o*o)){this.resolveHazardPair(e,r);break}}}}resolveHazardPair(e,t){let n=Math.max(e,t),r=Math.min(e,t);this.smashHazard(n,this.hazards[n]),this.smashHazard(r,this.hazards[r])}smashHazard(e,t){t.kind===`bob_omb`?(this.explode(t.position,t.ownerId,`bob_omb`,`explosion`),this.removeHazard(e)):this.destroyHazard(e,this.breakPresetFor(t.kind),!0)}explode(e,t,n,i){for(let a of this.karts){let o=a.state,s=o.position.distanceTo(e);if(s>Og+.85||o.isInvincible)continue;let c=a.applyHit(i,t);Pg.subVectors(o.position,e),Pg.y=0,Pg.lengthSq()<1e-4&&Pg.set(Math.random()-.5,0,Math.random()-.5),Pg.normalize().multiplyScalar(8*Xu(1-s/(Og+r),.3,1)),Pg.y=6,a.applyImpulse(Pg),(c||i===`blue_shell`)&&(this.debugCounts.hit++,q.emit(`item:hit`,{kartId:o.id,item:n,position:o.position.clone(),sourceKartId:t,isPlayer:o.isPlayer}))}this.debugCounts.explosion++,q.emit(`item:explosion`,{position:e.clone(),radius:Og}),this.particles?.emit(`explosion`,e,{scale:1.2})}clearOrbit(e){for(let t of e.orbitMeshes)this.object.remove(t);e.orbitMeshes.length=0,e.orbitType=`none`}updateOrbits(e){for(let t of this.records){let n=t.kart.state,i=n.item.startsWith(`triple_`)&&n.itemCount>0&&!n.itemRouletteActive?lg(n.item):`none`,a=i===`none`?0:n.itemCount;if(i!==t.orbitType||a!==t.orbitMeshes.length){this.clearOrbit(t),t.orbitType=i;for(let e=0;e<a;e++){let e=cg(i);t.orbitMeshes.push(e),this.object.add(e)}}t.orbitHitCooldown=Math.max(0,t.orbitHitCooldown-e);let o=t.orbitMeshes.length;if(o===0)continue;t.orbitAngle+=e*jg;let s=n.isShrunk?.6:1;for(let e=0;e<o;e++){let r=t.orbitAngle+e*J/o,i=t.orbitMeshes[e];i.position.set(n.position.x+Math.cos(r)*kg*s,n.position.y+Ag*s,n.position.z+Math.sin(r)*kg*s),i.scale.setScalar(s),i.rotation.y=-r+Math.PI/2,t.orbitType===`banana`&&(i.rotation.z=Math.sin(this.time*4+e)*.2)}if(!(t.orbitType===`mushroom`||t.orbitHitCooldown>0))outer:for(let e=0;e<o;e++){let i=t.orbitMeshes[e];for(let e of this.karts){if(e===t.kart)continue;let a=e.state;if(a.isSpinning||a.finished)continue;let o=r+.45;if(!(i.position.distanceToSquared(a.position)>o*o)){a.isInvincible?(this.particles?.emit(t.orbitType===`banana`?`bananaSplat`:`shellBreak`,i.position),q.emit(`item:destroyed`,{item:t.orbitType,position:i.position.clone()})):(e.applyHit(t.orbitType,n.id),Pg.subVectors(a.position,n.position),Pg.y=0,Pg.normalize().multiplyScalar(3),Pg.y=1.5,e.applyImpulse(Pg),this.particles?.emit(t.orbitType===`banana`?`bananaSplat`:`shellBreak`,i.position),this.debugCounts.hit++,q.emit(`item:hit`,{kartId:a.id,item:t.orbitType,position:a.position.clone(),sourceKartId:n.id,isPlayer:a.isPlayer})),n.itemCount=Math.max(0,n.itemCount-1),n.itemCount===0&&(n.item=`none`),t.orbitHitCooldown=.5;break outer}}}}}update(e){if(this.track){this.time+=e,this.updateBoxes(e);for(let t of this.records)this.updateRoulette(t,e);this.updateOrbits(e),this.updateHazards(e)}}getHazards(){this.hazardOut.length=0;for(let e of this.hazards)e.hidden||this.hazardOut.push(e);return this.hazardOut}};function e_(e){let t=e-1;return 1+2.70158*t*t*t+1.70158*t*t}var t_=2.2,n_=.15,r_=8,i_=30,a_=25,o_=2.2,s_=2.6,c_=60,l_=1.5,u_=.8,d_={easy:{noise:.09,reactionMin:1,reactionMax:1.5,driftThreshold:.45,releaseStage:1,brakeLatAccel:34,easeThrottle:.6,usesMushrooms:!1,startThrottleBeforeGo:.55},normal:{noise:.045,reactionMin:.6,reactionMax:1,driftThreshold:.35,releaseStage:2,brakeLatAccel:46,easeThrottle:.65,usesMushrooms:!0,startThrottleBeforeGo:.45},hard:{noise:.015,reactionMin:.4,reactionMax:.6,driftThreshold:.3,releaseStage:3,brakeLatAccel:62,easeThrottle:.75,usesMushrooms:!0,startThrottleBeforeGo:.3}},f_=new B,p_=new B,m_=new B,h_=new B;function g_(){return{position:new B,tangent:new B(0,0,-1),normal:new B(0,1,0),binormal:new B(1,0,0),halfWidth:6,wallHalfWidth:7,t:0}}var __=g_(),v_=g_(),y_=g_(),b_=g_();function x_(e,t){let n=e.z*t.x-e.x*t.z,r=e.x*t.x+e.z*t.z;return Math.atan2(-n,r)}var S_=!1,C_=!1;function w_(){C_||(C_=!0,q.on(`race:countdown`,({count:e})=>{e===1&&(S_=!0)}),q.on(`race:start`,()=>{S_=!1}))}var T_=class{kart;difficulty;profile;input=Ju();rng;baseOffset;offsetDriftAmp;offsetDriftFreq;offsetPhase;skillJitter;hesitancy;aggression;bananaHoldLimit;startTimingError;time=0;prevAngle=0;hasPrev=!1;dodge=0;reactTimer=-1;pendingMode=0;holdTime=0;lastItem=`none`;stuckTimer=0;recoverTimer=0;recoverCooldown=0;movedOnce=!1;driftWant=!1;driftDir=0;driftHold=0;driftCooldown=0;frozenTime=0;sinceCountOne=-1;constructor(e,t,n){w_(),this.kart=e,this.difficulty=t,this.profile=d_[t],this.rng=id(n);let r=this.rng;this.baseOffset=(r()*2-1)*.45,this.offsetDriftAmp=.08+r()*.12,this.offsetDriftFreq=.12+r()*.18,this.offsetPhase=r()*Math.PI*2,this.skillJitter=(r()*2-1)*.02,this.hesitancy=.7+r()*.6,this.aggression=r(),this.bananaHoldLimit=6+r()*4,this.startTimingError=r()}setDifficulty(e){this.difficulty=e,this.profile=d_[e]}update(e,t,n,r,i){let a=this.kart.state,o=this.input,s=this.profile;this.time+=e,o.useItem=!1,o.useItemHeld=!1,o.lookBack=!1,o.pause=!1,o.confirm=!1,o.back=!1,o.menuUp=o.menuDown=o.menuLeft=o.menuRight=!1,this.driftCooldown=Math.max(0,this.driftCooldown-e),this.recoverCooldown=Math.max(0,this.recoverCooldown-e);let c=a.speed,l=Math.max(1,this.kart.topSpeed());if(c>3&&(this.movedOnce=!0),this.kart.forwardDir(f_),f_.y=0,f_.lengthSq()<1e-6&&f_.set(0,0,-1),f_.normalize(),p_.set(-f_.z,0,f_.x),a.isFrozen){this.frozenTime+=e,S_&&(this.sinceCountOne=this.sinceCountOne<0?0:this.sinceCountOne+e);let t;return this.sinceCountOne>=0?(t=1-s.startThrottleBeforeGo,this.difficulty===`easy`&&this.startTimingError<.35&&(t=this.startTimingError<.15?.05:1.3),this.difficulty===`normal`&&(t+=(this.startTimingError-.5)*.3)):t=2.75,o.throttle=+((this.sinceCountOne>=0?this.sinceCountOne:this.frozenTime)>=t),o.brake=0,o.steer=0,o.drift=!1,this.hasPrev=!1,this.kart.setInput(o),o}if(this.frozenTime=0,this.sinceCountOne=-1,a.isSpinning)return o.throttle=1,o.brake=0,o.steer=0,o.drift=!1,this.driftWant=!1,this.hasPrev=!1,this.kart.setInput(o),o;let u=Math.max(1,t.length),d=a.trackT,f=Xu(Math.max(c,0)*.9,r_,i_);t.sample(d,__),t.sample(nd(d+f/u),v_),t.sample(nd(d+2*f/u),y_);let p=x_(__.tangent,v_.tangent),m=x_(v_.tangent,y_.tangent),h=Math.max(2,v_.halfWidth);m_.subVectors(a.position,__.position);let g=m_.dot(__.binormal),_=Math.atan2(__.tangent.dot(p_),__.tangent.dot(f_));if(this.recoverTimer>0)return this.recoverTimer-=e,o.throttle=0,o.brake=1,o.steer=-Math.sign(_)*.9,o.drift=!1,this.driftWant=!1,this.hasPrev=!1,this.kart.setInput(o),o;let v=this.movedOnce&&!a.isAirborne&&Math.abs(c)<1&&!a.finished;this.stuckTimer=v?this.stuckTimer+e:0,this.recoverCooldown<=0&&(a.wrongWay&&Math.abs(c)<6&&this.movedOnce||this.stuckTimer>l_)&&(this.recoverTimer=u_,this.recoverCooldown=3.3,this.stuckTimer=0,this.driftWant=!1);let y=Xu(this.baseOffset+Math.sin(this.time*this.offsetDriftFreq+this.offsetPhase)*this.offsetDriftAmp+Xu(p*.9+m*.35,-.4,.4),-.6,.6)*h;if(a.item===`none`&&!a.itemRouletteActive){let e=r.getActiveBoxPositions(),n=c_,i=!1,o=0,s=0,c=0;for(let t=0;t<e.length;t++){let r=e[t],l=r.x-a.position.x,u=r.z-a.position.z,d=l*f_.x+u*f_.z;if(d<2||d>=n)continue;let f=l*p_.x+u*p_.z;Math.abs(f)>h*1.6||(n=d,o=d,s=r.x,c=r.z,i=!0)}if(i){t.sample(nd(d+o/u),b_);let e=(s-b_.position.x)*b_.binormal.x+(c-b_.position.z)*b_.binormal.z,n=Xu(1.15-o/c_,.35,1);y+=(Xu(e,-h+.8,h-.8)-y)*n}}let b=0,x=a_,S=!1,C=r.getHazards();for(let e=0;e<C.length;e++){let t=C[e],n=t.position.x-a.position.x,r=t.position.z-a.position.z,i=n*f_.x+r*f_.z,o=n*p_.x+r*p_.z,s=t.velocity.x*f_.x+t.velocity.z*f_.z;if(i>0&&i<a_){if(t.ownerId===a.id&&s>5)continue;let e=o;if(s<-3&&(e+=(t.velocity.x*p_.x+t.velocity.z*p_.z)*(i/Math.max(1,c-s))),Math.abs(e)<o_&&i<x){x=i;let t=g+e,n=h-t>h+t?1:-1,r=.55+.45*(1-i/a_);b=(n*s_-e)*r}}else i<0&&i>-12&&s>4&&Math.abs(o)<2.2&&(S=!0)}this.dodge=$u(this.dodge,b,9,e),y+=this.dodge,a.surface===`offroad`&&(y=0),y=Xu(y,-(h-1.4),h-1.4);let w=Xu(y+Xu((y-g)*1,-3.5,3.5),-(h-.5),h-.5);h_.copy(v_.position).addScaledVector(v_.binormal,w),m_.subVectors(h_,a.position),m_.y=0;let T=Math.atan2(m_.dot(p_),m_.dot(f_)),E=this.hasPrev?(T-this.prevAngle)/Math.max(e,1e-4):0;E=Xu(E,-6,6),this.prevAngle=T,this.hasPrev=!0;let D=t_*T+n_*E;D+=s.noise*Math.sin(this.time*1.9+this.offsetPhase)*Math.sin(this.time*.73+this.offsetPhase*2),a.surface===`offroad`&&(D*=1.3),D=Xu(D,-1,1);let O=1,k=Math.abs(p)/f;c*c*k>s.brakeLatAccel&&c>.6*l&&!a.isBoosting&&(O=s.easeThrottle),a.wrongWay&&(O=.5);let A=0;i&&i!==this.kart&&(A=(i.state.raceProgress-a.raceProgress)*u);let ee=this.speedFactor(A)*(1+this.skillJitter)*l;!a.isBoosting&&c>ee&&(O=Math.min(O,Xu(1-(c-ee)/(.05*l),0,1)));let te=Xu(Math.max(c,0)*1.2,6,i_);t.sample(nd(d+te/u),b_);let j=x_(f_,b_.tangent),M=j+x_(b_.tangent,y_.tangent),ne=a.surface!==`offroad`&&a.surface!==`void`,re=!1;if(!this.driftWant&&this.driftCooldown<=0&&ne&&!a.isAirborne&&!a.isHopping&&c>.55*l&&Math.abs(j)>s.driftThreshold&&Math.abs(M)>s.driftThreshold*1.4&&Math.sign(M)===Math.sign(j)&&(this.difficulty!==`easy`||this.aggression>.4)&&(this.driftWant=!0,this.driftDir=j>0?1:-1,this.driftHold=0),this.driftWant){this.driftHold+=e,re=!0,a.isDrifting&&a.driftDirection!==0&&(this.driftDir=a.driftDirection),a.isDrifting?(Math.sign(D)!==this.driftDir||Math.abs(D)<.25)&&(D=this.driftDir*.25):this.driftHold<.3&&(D=this.driftDir*Math.max(.5,Math.abs(D)));let t=a.driftStage,n=s.releaseStage;this.difficulty===`hard`&&Math.abs(M)<.5&&(n=2);let r=Math.sign(T)===-this.driftDir&&Math.abs(T)>.12,i=Math.abs(T)<.08&&Math.abs(j)<.15,o=this.driftDir*g>h-1.6,u=!1;(a.isDrifting&&t>=n||a.isDrifting&&this.driftHold>.25&&(r||i||o)||!a.isDrifting&&this.driftHold>.6||!ne||c<.35*l||this.driftHold>3.2)&&(u=!0),u&&(this.driftWant=!1,re=!1,this.driftCooldown=t>=1?.6:1.6)}if(a.item!==this.lastItem&&(this.lastItem=a.item,this.holdTime=0,this.reactTimer=-1,this.pendingMode=0),a.item!==`none`&&!a.itemRouletteActive&&a.itemCount>0){this.holdTime+=e;let t=this.decideItemUse(a.item,n,A,p,m,S,l);if(t!==0){if(this.reactTimer<0||this.pendingMode!==t){this.pendingMode=t;let e=S&&t===2,n=s.reactionMin+this.rng()*(s.reactionMax-s.reactionMin);this.reactTimer=e?n*.35:n*this.hesitancy,(a.item===`star`||a.item===`golden_mushroom`||a.item===`triple_mushroom`||a.item===`mushroom`)&&(this.reactTimer*=.5)}else this.reactTimer-=e,this.reactTimer<=0&&(o.useItem=!0,o.lookBack=t===2,this.reactTimer=-1,this.pendingMode=0,this.holdTime=0)}else this.reactTimer=-1,this.pendingMode=0}return a.isAirborne&&!a.isHopping&&(D=0),o.throttle=Xu(O,0,1),o.brake=0,o.steer=D,o.drift=re,this.kart.setInput(o),o}speedFactor(e){switch(this.difficulty){case`easy`:return Xu(.86+.06*Math.tanh(e/120),.82,.96);case`normal`:return Xu(.94+.05*Math.tanh(e/100),.9,1);default:return Xu(.985+.02*Math.tanh(e/150),.97,1)}}decideItemUse(e,t,n,r,i,a,o){let s=this.kart.state,c=s.speed,l=Math.abs(r)<.12&&Math.abs(i)<.2,u=1/0,d=!1,f=1/0,p=!1,m=1/0,h=!1;for(let e=0;e<t.length;e++){let n=t[e];if(n===this.kart)continue;let r=n.state;if(r.finished)continue;let i=r.position.x-s.position.x,a=r.position.z-s.position.z,o=i*f_.x+a*f_.z,c=i*p_.x+a*p_.z,l=Math.sqrt(i*i+a*a);if(l<m&&(m=l),o>0){o<u&&(u=o,d=Math.abs(c)<1.5+o*.12);let e=rd(s.trackT,r.trackT);e>0&&e<.3&&(h=!0)}else-o<f&&(f=-o,p=Math.abs(c)<4)}switch(e){case`banana`:case`triple_banana`:return a||f<15&&p||this.holdTime>this.bananaHoldLimit?2:this.difficulty===`hard`&&u>6&&u<20&&d&&c>.5*o&&this.aggression>.5?1:0;case`green_shell`:case`triple_green_shell`:return a?2:u<45&&d&&Math.abs(r)<.25?1:this.difficulty!==`easy`&&f<10&&p&&this.aggression>.6?2:+(this.holdTime>15);case`red_shell`:case`triple_red_shell`:return a?2:h&&u<90||this.holdTime>12?1:0;case`blue_shell`:return+(s.place!==1&&this.holdTime>2);case`mushroom`:case`triple_mushroom`:case`golden_mushroom`:return s.isBoosting?0:s.surface===`offroad`?1:this.profile.usesMushrooms?l&&c>.5*o||n>80||this.holdTime>8?1:0:+(this.holdTime>12);case`star`:return+(m<20||this.holdTime>3);case`lightning`:return+(s.place>=5&&this.holdTime>.8+this.hesitancy);case`bob_omb`:return a?2:u>10&&u<30&&d?1:this.holdTime>14?f<12?2:1:0;default:return 0}}},E_=1e-4;function D_(e){return 10**(e/20)}function O_(e){return 440*2**((e-69)/12)}var k_=new WeakMap;function A_(e,t=`white`,n=2){let r=k_.get(e);r||(r=new Map,k_.set(e,r));let i=r.get(t);if(i)return i;let a=Math.max(1,Math.floor(e.sampleRate*n)),o=e.createBuffer(1,a,e.sampleRate),s=o.getChannelData(0);if(t===`white`)for(let e=0;e<a;e++)s[e]=Math.random()*2-1;else if(t===`pink`){let e=0,t=0,n=0,r=0,i=0,o=0,c=0;for(let l=0;l<a;l++){let a=Math.random()*2-1;e=.99886*e+a*.0555179,t=.99332*t+a*.0750759,n=.969*n+a*.153852,r=.8665*r+a*.3104856,i=.55*i+a*.5329522,o=-.7616*o-a*.016898,s[l]=(e+t+n+r+i+o+c+a*.5362)*.11,c=a*.115926}}else{let e=0;for(let t=0;t<a;t++){let n=Math.random()*2-1;e=(e+.02*n)/1.02,s[t]=e*3.5}}return r.set(t,o),o}function j_(e,t,n,r,i={}){let a=Math.max(.001,i.attack??.005),o=Math.max(.001,i.decay??.05),s=Math.min(1,Math.max(0,i.sustain??.6)),c=Math.max(.005,i.release??.05),l=Math.max(E_,n),u=Math.max(E_,l*s);e.cancelScheduledValues(t),e.setValueAtTime(E_,t),e.linearRampToValueAtTime(l,t+a),e.exponentialRampToValueAtTime(u,t+a+o);let d=Math.max(t+a+o,t+r);return e.setValueAtTime(u,d),e.exponentialRampToValueAtTime(E_,d+c),d+c}function M_(e,t,n,r,i,a=!0){a?(e.setValueAtTime(Math.max(E_,t),r),e.exponentialRampToValueAtTime(Math.max(E_,n),r+Math.max(.001,i))):(e.setValueAtTime(t,r),e.linearRampToValueAtTime(n,r+Math.max(.001,i)))}function N_(e,t,n,r){e.setTargetAtTime(t,n,r)}function P_(e=2,t=1024){let n=new Float32Array(new ArrayBuffer(t*4)),r=Math.tanh(e);for(let i=0;i<t;i++){let a=i/(t-1)*2-1;n[i]=Math.tanh(a*e)/r}return n}function F_(e,t,n,r,i){let a=e.createBiquadFilter();return a.type=n.type,a.Q.value=n.q??1,n.endFreq===void 0?a.frequency.value=n.freq:M_(a.frequency,n.freq,n.endFreq,r,n.sweepTime??i),t.connect(a),a}function I_(e,t,n,r){if(r!==void 0&&r!==0&&typeof e.createStereoPanner==`function`){let i=e.createStereoPanner();return i.pan.value=Math.max(-1,Math.min(1,r)),t.connect(i),i.connect(n),i}return t.connect(n),t}function X(e,t,n){let r=n.when??e.currentTime,i=e.createOscillator();i.type=n.type??`sine`,n.detune&&(i.detune.value=n.detune),i.frequency.setValueAtTime(Math.max(E_,n.freq),r),n.endFreq!==void 0&&i.frequency.exponentialRampToValueAtTime(Math.max(E_,n.endFreq),r+Math.max(.001,n.sweepTime??n.duration));let a=e.createGain(),o=j_(a.gain,r,n.gain??.2,n.duration,n.env),s=i;n.filter&&(s=F_(e,s,n.filter,r,n.duration)),s.connect(a),I_(e,a,t,n.pan);let c=null;if(n.vibrato&&n.vibrato.depth>0){c=e.createOscillator(),c.type=`sine`,c.frequency.value=n.vibrato.rate;let t=e.createGain();t.gain.value=n.vibrato.depth,c.connect(t),t.connect(i.detune),c.start(r),c.stop(o+.02)}return i.start(r),i.stop(o+.02),i.onended=()=>{i.disconnect(),a.disconnect(),c&&c.disconnect()},o}function L_(e,t,n){let r=n.when??e.currentTime,i=e.createBufferSource(),a=A_(e,n.color??`white`);i.buffer=a,i.loop=!0,i.loopStart=0,i.loopEnd=a.duration,n.rate!==void 0&&(i.playbackRate.value=n.rate);let o=e.createGain(),s=j_(o.gain,r,n.gain??.2,n.duration,n.env??{attack:.002,decay:n.duration*.6,sustain:.3,release:.05}),c=i;return n.filter&&(c=F_(e,c,n.filter,r,n.duration)),c.connect(o),I_(e,o,t,n.pan),i.start(r,Math.random()*Math.max(0,a.duration-.5)),i.stop(s+.02),i.onended=()=>{i.disconnect(),o.disconnect()},s}function R_(e,t,n,r={}){let i=r.when??e.currentTime,a=r.gap??0,o=r.baseMidi??0,s=i;for(let[c,l]of n)s=X(e,t,{freq:O_(o+c),type:r.type??`square`,duration:l,gain:r.gain??.15,env:r.env??{attack:.005,decay:.05,sustain:.7,release:.06},when:i,filter:r.filter,vibrato:r.vibrato}),i+=l+a;return s}function z_(e,t,n,r){let i=r.when??e.currentTime,a=i;for(let o of n)a=Math.max(a,X(e,t,{freq:O_(o),type:r.type??`sawtooth`,duration:r.duration,gain:r.gain??.08,env:r.env,when:i,detune:r.detune?(Math.random()*2-1)*r.detune:0,filter:r.filter}));return a}var B_={light:96,medium:78,heavy:62},V_=.15,H_=null,U_=class{kartId;isPlayer;ctx;baseFreq;out;panner;filter;shaper;engineGain;saw;sawGain;square=null;squareGain=null;sub=null;subGain=null;turboOsc;turboNoise;turboFilter;turboGain;skidSrc;skidFilter;skidGain;rpm=V_;rich=!1;disposed=!1;turboLevel=-1;skidLevel=-1;constructor(e,t,n,r,i){if(this.ctx=e,this.kartId=n,this.isPlayer=i,this.baseFreq=B_[r]??B_.medium,this.out=e.createGain(),this.out.gain.value=i?1:.85,i)this.panner=null,this.out.connect(t);else{let n=e.createPanner();n.panningModel=`equalpower`,n.distanceModel=`inverse`,n.refDistance=6,n.maxDistance=90,n.rolloffFactor=1,n.coneInnerAngle=360,n.coneOuterAngle=360,this.out.connect(n),n.connect(t),this.panner=n}this.filter=e.createBiquadFilter(),this.filter.type=`lowpass`,this.filter.Q.value=1.1,this.filter.frequency.value=400,this.shaper=e.createWaveShaper(),H_||=P_(2.2),this.shaper.curve=H_,this.shaper.oversample=`none`,this.engineGain=e.createGain(),this.engineGain.gain.value=0,this.filter.connect(this.shaper),this.shaper.connect(this.engineGain),this.engineGain.connect(this.out),this.saw=e.createOscillator(),this.saw.type=`sawtooth`,this.saw.frequency.value=this.baseFreq,this.sawGain=e.createGain(),this.sawGain.gain.value=.5,this.saw.connect(this.sawGain),this.sawGain.connect(this.filter),this.saw.start(),this.turboFilter=e.createBiquadFilter(),this.turboFilter.type=`bandpass`,this.turboFilter.Q.value=2.5,this.turboFilter.frequency.value=1400,this.turboGain=e.createGain(),this.turboGain.gain.value=0,this.turboFilter.connect(this.turboGain),this.turboGain.connect(this.out),this.turboOsc=e.createOscillator(),this.turboOsc.type=`triangle`,this.turboOsc.frequency.value=1200;let a=e.createGain();a.gain.value=.5,this.turboOsc.connect(a),a.connect(this.turboFilter),this.turboOsc.start(),this.turboNoise=e.createBufferSource(),this.turboNoise.buffer=A_(e,`white`),this.turboNoise.loop=!0;let o=e.createGain();o.gain.value=.35,this.turboNoise.connect(o),o.connect(this.turboFilter),this.turboNoise.start(0,Math.random()),this.skidSrc=e.createBufferSource(),this.skidSrc.buffer=A_(e,`pink`),this.skidSrc.loop=!0,this.skidFilter=e.createBiquadFilter(),this.skidFilter.type=`bandpass`,this.skidFilter.frequency.value=1900,this.skidFilter.Q.value=1.4,this.skidGain=e.createGain(),this.skidGain.gain.value=0,this.skidSrc.connect(this.skidFilter),this.skidFilter.connect(this.skidGain),this.skidGain.connect(this.out),this.skidSrc.start(0,Math.random()),this.setRich(i)}setRich(e){if(this.disposed||e===this.rich)return;this.rich=e;let t=this.ctx;if(e){let e=t.currentTime;this.square=t.createOscillator(),this.square.type=`square`,this.square.detune.value=9,this.square.frequency.value=this.saw.frequency.value,this.squareGain=t.createGain(),this.squareGain.gain.setValueAtTime(0,e),this.squareGain.gain.linearRampToValueAtTime(.22,e+.2),this.square.connect(this.squareGain),this.squareGain.connect(this.filter),this.square.start(),this.sub=t.createOscillator(),this.sub.type=`sine`,this.sub.frequency.value=this.saw.frequency.value*.5,this.subGain=t.createGain(),this.subGain.gain.setValueAtTime(0,e),this.subGain.gain.linearRampToValueAtTime(.45,e+.2),this.sub.connect(this.subGain),this.subGain.connect(this.filter),this.sub.start()}else this.stopExtras()}stopExtras(){let e=this.ctx.currentTime,t=this.square,n=this.squareGain,r=this.sub,i=this.subGain;t&&n&&(n.gain.setTargetAtTime(0,e,.05),t.stop(e+.3),t.onended=()=>{t.disconnect(),n.disconnect()}),r&&i&&(i.gain.setTargetAtTime(0,e,.05),r.stop(e+.3),r.onended=()=>{r.disconnect(),i.disconnect()}),this.square=null,this.squareGain=null,this.sub=null,this.subGain=null}update(e,t,n,r){if(this.disposed)return;let i=this.ctx.currentTime,a=Math.abs(t.speed),o=Xu(a/Math.max(1,r),0,1.4),s=V_+.85*o;s+=.2*Y(n)*(1-Y(o)),t.isFrozen&&(s=V_+.45*Y(n)),t.isAirborne&&(s=Math.max(s,Math.min(1.35,s+t.airTime*.7))),(t.isSpinning||t.isSquished)&&(s*=.7),t.isBoosting&&(s=Math.max(s,1.05));let c=s>this.rpm?3.2:5;this.rpm=$u(this.rpm,s,c,e);let l=this.rpm,u=t.isShrunk?1.5:1,d=this.baseFreq*(.55+1.9*l)*u;N_(this.saw.frequency,d,i,.03),this.square&&N_(this.square.frequency,d,i,.03),this.sub&&N_(this.sub.frequency,d*.5,i,.03),N_(this.filter.frequency,240+l*1900,i,.05);let f=.55+.45*Y(n),p=(this.isPlayer?.3:.27)*f*(.7+.3*Math.min(1,l));N_(this.engineGain.gain,p,i,.06);let m=t.isBoosting?.11:0;if(N_(this.turboGain.gain,m,i,.08),t.isBoosting){let e=900+l*700+Y(t.boostTimer)*400;N_(this.turboOsc.frequency,e,i,.06),N_(this.turboFilter.frequency,e*1.1,i,.06)}let h=t.isDrifting&&!t.isAirborne?.14*Y(a/14)*(.6+.4*Math.abs(t.steerVisual)):0;if(N_(this.skidGain.gain,h,i,.06),h>0&&(N_(this.skidSrc.playbackRate,.75+.5*Y(o),i,.08),N_(this.skidFilter.frequency,1500+o*900,i,.08)),this.panner){let e=t.position;W_(this.panner,e.x,e.y,e.z)}}dispose(){if(this.disposed)return;this.disposed=!0;let e=this.ctx.currentTime;this.out.gain.setTargetAtTime(0,e,.03),this.stopExtras();let t=e+.15;try{this.saw.stop(t),this.turboOsc.stop(t),this.turboNoise.stop(t),this.skidSrc.stop(t)}catch{}let n=this.out,r=this.panner;this.saw.onended=()=>{n.disconnect(),r?.disconnect()}}};function W_(e,t,n,r){e.positionX?(e.positionX.value=t,e.positionY.value=n,e.positionZ.value=r):e.setPosition(t,n,r)}function G_(e,t,n,r,i,a,o,s,c,l){e.positionX?(e.positionX.value=t,e.positionY.value=n,e.positionZ.value=r,e.forwardX.value=i,e.forwardY.value=a,e.forwardZ.value=o,e.upX.value=s,e.upY.value=c,e.upZ.value=l):(e.setPosition(t,n,r),e.setOrientation(i,a,o,s,c,l))}var K_=class{pos=new B;forward=new B(0,0,-1);right=new B(1,0,0);up=new B(0,1,0)},q_=1100,J_=class{ctx;gain;murmur;hiss;lfo;cheer=0;disposed=!1;constructor(e,t){this.ctx=e,this.gain=e.createGain(),this.gain.gain.value=0,this.gain.connect(t),this.murmur=e.createBufferSource(),this.murmur.buffer=A_(e,`pink`),this.murmur.loop=!0;let n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=520,n.Q.value=.6;let r=e.createGain();r.gain.value=.8,this.lfo=e.createOscillator(),this.lfo.type=`sine`,this.lfo.frequency.value=.31;let i=e.createGain();i.gain.value=.25,this.lfo.connect(i),i.connect(r.gain),this.murmur.connect(n),n.connect(r),r.connect(this.gain),this.hiss=e.createBufferSource(),this.hiss.buffer=A_(e,`white`),this.hiss.loop=!0;let a=e.createBiquadFilter();a.type=`bandpass`,a.frequency.value=1100,a.Q.value=.5;let o=e.createGain();o.gain.value=.28,this.hiss.connect(a),a.connect(o),o.connect(this.gain),this.murmur.start(0,Math.random()),this.hiss.start(0,Math.random()*1.5),this.lfo.start()}cheerBurst(e){this.cheer=Math.max(this.cheer,Y(e))}update(e,t){if(this.disposed)return;let n=0;if(t!==null&&isFinite(t)){let e=t-Math.floor(t);n=1-Qu(12,40,Math.min(e,1-e)*q_)}this.cheer=Math.max(0,this.cheer-e/2.5);let r=n*.16+this.cheer*.22;this.gain.gain.setTargetAtTime(r,this.ctx.currentTime,.25)}dispose(){if(this.disposed)return;this.disposed=!0;let e=this.ctx.currentTime;this.gain.gain.setTargetAtTime(0,e,.05);try{this.murmur.stop(e+.3),this.hiss.stop(e+.3),this.lfo.stop(e+.3)}catch{}let t=this.gain;this.murmur.onended=()=>t.disconnect()}},Y_=class{listener=new K_;karts=[];playerKartId=0;ctx;buses;unsubs=[];rouletteCount=0;lastWrongWay=-10;disposed=!1;constructor(e,t){this.ctx=e,this.buses=t,this.subscribe()}subscribe(){let e=this.unsubs;e.push(q.on(`kart:hop`,e=>this.hop(e.kartId))),e.push(q.on(`kart:land`,e=>this.land(e.kartId,e.impact))),e.push(q.on(`kart:driftStart`,e=>this.driftStart(e.kartId))),e.push(q.on(`kart:driftStage`,e=>this.driftStage(e.kartId,e.stage))),e.push(q.on(`kart:driftEnd`,e=>this.driftEnd(e.kartId,e.boostStage))),e.push(q.on(`kart:boost`,e=>this.boost(e.kartId,e.source,e.strength))),e.push(q.on(`kart:collision`,e=>this.collision(e.kartId,e.otherId,e.impulse,e.position))),e.push(q.on(`kart:spin`,e=>this.spin(e.kartId,e.cause))),e.push(q.on(`kart:squish`,e=>this.squish(e.kartId))),e.push(q.on(`kart:shrink`,e=>this.shrink(e.kartId,!0))),e.push(q.on(`kart:unshrink`,e=>this.shrink(e.kartId,!1))),e.push(q.on(`item:pickup`,e=>this.itemPickup(e.position,e.isPlayer))),e.push(q.on(`item:rouletteTick`,e=>this.rouletteTick(e.isPlayer))),e.push(q.on(`item:rouletteEnd`,e=>this.rouletteEnd(e.isPlayer))),e.push(q.on(`item:use`,e=>this.itemUse(e.item,e.position,e.isPlayer))),e.push(q.on(`item:hit`,e=>this.itemHit(e.item,e.position,e.isPlayer))),e.push(q.on(`item:destroyed`,e=>this.itemDestroyed(e.item,e.position))),e.push(q.on(`item:shellBounce`,e=>this.shellBounce(e.position))),e.push(q.on(`item:explosion`,e=>this.explosion(e.position,e.radius))),e.push(q.on(`item:lightning`,()=>this.lightning())),e.push(q.on(`item:boxRespawn`,e=>this.boxRespawn(e.position))),e.push(q.on(`item:blueShellLaunch`,()=>this.blueShellLaunch())),e.push(q.on(`race:countdown`,e=>this.countdown(e.count))),e.push(q.on(`race:start`,()=>this.raceStart())),e.push(q.on(`race:lap`,e=>this.lap(e.kartId,e.isPlayer,e.isFinalLap))),e.push(q.on(`race:finish`,e=>this.finish(e.kartId,e.place,e.isPlayer))),e.push(q.on(`race:positionChange`,e=>{e.isPlayer&&this.positionChange(e.from,e.to)})),e.push(q.on(`race:wrongWay`,e=>this.wrongWay(e.kartId,e.wrongWay))),e.push(q.on(`ui:move`,()=>this.uiMove())),e.push(q.on(`ui:select`,()=>this.uiSelect())),e.push(q.on(`ui:back`,()=>this.uiBack())),e.push(q.on(`ui:error`,()=>this.uiError()))}dispose(){this.disposed=!0;for(let e of this.unsubs)e();this.unsubs.length=0,this.karts=[]}kartPosition(e){let t=this.karts;if(e>=0&&e<t.length&&t[e].state.id===e)return t[e].state.position;for(let n=0;n<t.length;n++)if(t[n].state.id===e)return t[n].state.position;return null}isPlayer(e){return e===this.playerKartId}spatial(e,t,n,r){if(this.disposed)return null;let i=this.ctx,a=this.buses.sfx;if(!e){if(r===1)return a;let e=i.createGain();return e.gain.value=r,e.connect(a),e}let o=this.listener,s=e.x-o.pos.x,c=e.y-o.pos.y,l=e.z-o.pos.z,u=Math.sqrt(s*s+c*c+l*l);if(u>n)return null;let d=u<=t?1:t/(t+(u-t)),f=u>.01?(s*o.right.x+c*o.right.y+l*o.right.z)/u*.75:0,p=i.createGain();if(p.gain.value=r*d,typeof i.createStereoPanner==`function`){let e=i.createStereoPanner();e.pan.value=Math.max(-1,Math.min(1,f)),p.connect(e),e.connect(a)}else p.connect(a);return p}kartDest(e,t,n,r,i){return this.isPlayer(e)?this.spatial(null,t,n,r):this.spatial(this.kartPosition(e),t,n,i)}get now(){return this.ctx.currentTime}hop(e){let t=this.kartDest(e,8,40,1,.6);t&&X(this.ctx,t,{freq:520,endFreq:780,type:`sine`,duration:.06,gain:.22,env:{attack:.005,decay:.03,sustain:.5,release:.05}})}land(e,t){let n=this.kartDest(e,8,45,1,.6);if(!n)return;let r=Y(t),i=this.ctx;L_(i,n,{duration:.1,gain:.1+.25*r,color:`pink`,filter:{type:`lowpass`,freq:520},env:{attack:.002,decay:.08,sustain:.2,release:.05}}),X(i,n,{freq:110,endFreq:55,type:`sine`,duration:.12,gain:.15+.22*r,env:{attack:.002,decay:.1,sustain:.2,release:.05}})}driftStart(e){let t=this.kartDest(e,8,40,1,.5);t&&L_(this.ctx,t,{duration:.12,gain:.16,rate:.9,filter:{type:`bandpass`,freq:1600,q:1.2},env:{attack:.005,decay:.1,sustain:.3,release:.08}})}driftStage(e,t){let n=this.kartDest(e,8,35,1,.45);if(!n)return;let r=this.ctx,i=[0,880,1175,1568][t],a=this.now;X(r,n,{freq:i,type:`triangle`,duration:.07,gain:.18,when:a,env:{attack:.003,decay:.05,sustain:.4,release:.06}});for(let e=0;e<=t;e++)X(r,n,{freq:i*(2+e*.5),type:`sine`,duration:.04,gain:.06,when:a+.03+e*.03,env:{attack:.002,decay:.03,sustain:.2,release:.04}})}driftEnd(e,t){if(t===0)return;let n=this.kartDest(e,8,45,1,.55);if(!n)return;let r=this.ctx;L_(r,n,{duration:.3+.08*t,gain:.22+.04*t,filter:{type:`bandpass`,freq:400,endFreq:3e3,q:1},env:{attack:.01,decay:.2,sustain:.4,release:.15}}),X(r,n,{freq:200,endFreq:500+150*t,type:`sawtooth`,duration:.25,gain:.1,filter:{type:`lowpass`,freq:1500},env:{attack:.02,decay:.1,sustain:.5,release:.1}})}boost(e,t,n){let r=this.kartDest(e,10,50,1,.6);if(!r)return;let i=this.ctx,a=this.now,o=.7+Y(n)*.6;if(t===`mushroom`||t===`golden`){X(i,r,{freq:180,endFreq:720,sweepTime:.09,type:`sine`,duration:.1,gain:.22*o,when:a,env:{attack:.005,decay:.05,sustain:.8,release:.03}}),X(i,r,{freq:720,endFreq:430,type:`sine`,duration:.28,gain:.2*o,when:a+.1,vibrato:{rate:18,depth:60},env:{attack:.005,decay:.15,sustain:.4,release:.12}}),L_(i,r,{duration:.35,gain:.16*o,when:a+.05,filter:{type:`bandpass`,freq:700,endFreq:2600,q:1},env:{attack:.02,decay:.2,sustain:.4,release:.15}});return}L_(i,r,{duration:.4,gain:.24*o,when:a,filter:{type:`bandpass`,freq:500,endFreq:2500,q:1},env:{attack:.02,decay:.25,sustain:.4,release:.15}}),X(i,r,{freq:300,endFreq:900,type:`triangle`,duration:.35,gain:.1*o,when:a,filter:{type:`lowpass`,freq:2e3},env:{attack:.02,decay:.15,sustain:.5,release:.1}}),(t===`pad`||t===`start`)&&X(i,r,{freq:1320,endFreq:1760,type:`sine`,duration:.12,gain:.08*o,when:a+.03,env:{attack:.003,decay:.08,sustain:.2,release:.1}})}collision(e,t,n,r){let i=Y(n/10),a=this.isPlayer(e)||t!==null&&this.isPlayer(t)?this.spatial(null,8,50,1):this.spatial(r,8,50,.6);if(!a)return;let o=this.ctx;t===null?(L_(o,a,{duration:.12,gain:.15+.25*i,color:`pink`,filter:{type:`lowpass`,freq:700},env:{attack:.002,decay:.1,sustain:.2,release:.06}}),X(o,a,{freq:140,endFreq:60,type:`sine`,duration:.14,gain:.2+.2*i,env:{attack:.002,decay:.1,sustain:.3,release:.06}})):(X(o,a,{freq:300,endFreq:180,type:`triangle`,duration:.1,gain:.12+.15*i,env:{attack:.002,decay:.08,sustain:.3,release:.05}}),L_(o,a,{duration:.05,gain:.08+.06*i,filter:{type:`bandpass`,freq:1200,q:1},env:{attack:.001,decay:.04,sustain:.2,release:.03}}))}spin(e,t){let n=this.kartDest(e,10,55,1,.65);if(!n)return;let r=this.ctx,i=this.now;if(X(r,n,{freq:420,endFreq:200,type:`triangle`,duration:.55,gain:.14,when:i,vibrato:{rate:7,depth:80},env:{attack:.01,decay:.2,sustain:.6,release:.15}}),t.includes(`shell`)){L_(r,n,{duration:.35,gain:.28,when:i,filter:{type:`bandpass`,freq:2400,q:.6},env:{attack:.001,decay:.25,sustain:.15,release:.12}});for(let e=0;e<3;e++)X(r,n,{freq:[1800,2400,3100][e],type:`sine`,duration:.15,gain:.06,when:i+e*.015,env:{attack:.001,decay:.12,sustain:.05,release:.08}})}else t===`banana`||t===`triple_banana`?X(r,n,{freq:900,endFreq:1500,sweepTime:.12,type:`sine`,duration:.28,gain:.12,when:i,vibrato:{rate:22,depth:50},env:{attack:.01,decay:.1,sustain:.5,release:.1}}):t===`explosion`||t===`bob_omb`?X(r,n,{freq:90,endFreq:40,type:`sine`,duration:.3,gain:.2,when:i,env:{attack:.005,decay:.2,sustain:.3,release:.1}}):t===`lightning`?(L_(r,n,{duration:.12,gain:.2,when:i,filter:{type:`highpass`,freq:2500},env:{attack:.001,decay:.1,sustain:.1,release:.05}}),X(r,n,{freq:220,endFreq:60,type:`square`,duration:.1,gain:.1,when:i,filter:{type:`lowpass`,freq:1800},env:{attack:.001,decay:.08,sustain:.2,release:.04}})):(X(r,n,{freq:350,endFreq:200,type:`triangle`,duration:.12,gain:.18,when:i,env:{attack:.002,decay:.1,sustain:.3,release:.06}}),L_(r,n,{duration:.06,gain:.1,when:i,filter:{type:`bandpass`,freq:900,q:1},env:{attack:.001,decay:.05,sustain:.2,release:.03}}))}squish(e){let t=this.kartDest(e,10,50,1,.6);if(!t)return;let n=this.ctx;L_(n,t,{duration:.22,gain:.25,color:`pink`,filter:{type:`lowpass`,freq:900,endFreq:200},env:{attack:.002,decay:.18,sustain:.15,release:.06}}),X(n,t,{freq:420,endFreq:70,type:`sine`,duration:.22,gain:.25,env:{attack:.002,decay:.15,sustain:.3,release:.06}})}shrink(e,t){let n=this.kartDest(e,10,50,1,.55);n&&X(this.ctx,n,{freq:t?800:150,endFreq:t?150:800,type:`square`,duration:.4,gain:.14,filter:{type:`lowpass`,freq:2500},env:{attack:.01,decay:.1,sustain:.7,release:.08}})}itemPickup(e,t){let n=t?this.spatial(null,8,40,1):this.spatial(e,8,40,.45);if(!n)return;let r=this.ctx,i=this.now;X(r,n,{freq:1320,type:`sine`,duration:.25,gain:.22,when:i,env:{attack:.003,decay:.2,sustain:.15,release:.15}}),X(r,n,{freq:1980,type:`sine`,duration:.2,gain:.09,when:i,env:{attack:.003,decay:.15,sustain:.1,release:.12}}),X(r,n,{freq:2637,type:`sine`,duration:.08,gain:.06,when:i+.04,env:{attack:.002,decay:.06,sustain:.1,release:.06}}),X(r,n,{freq:3136,type:`sine`,duration:.08,gain:.05,when:i+.08,env:{attack:.002,decay:.06,sustain:.1,release:.06}})}rouletteTick(e){if(!e||this.disposed)return;this.rouletteCount++;let t=this.buses.sfx,n=900*(1+.035*this.rouletteCount);L_(this.ctx,t,{duration:.015,gain:.1,filter:{type:`highpass`,freq:3e3},env:{attack:.001,decay:.012,sustain:.1,release:.01}}),X(this.ctx,t,{freq:n,type:`sine`,duration:.03,gain:.08,env:{attack:.002,decay:.02,sustain:.3,release:.02}})}rouletteEnd(e){if(this.rouletteCount=0,!e||this.disposed)return;let t=this.buses.sfx,n=this.now;X(this.ctx,t,{freq:1568,type:`sine`,duration:.25,gain:.18,when:n,env:{attack:.003,decay:.2,sustain:.2,release:.15}}),X(this.ctx,t,{freq:2093,type:`sine`,duration:.3,gain:.16,when:n+.06,env:{attack:.003,decay:.25,sustain:.2,release:.2}})}itemUse(e,t,n){let r=n?this.spatial(null,8,45,1):this.spatial(t,8,45,.5);if(!r)return;let i=this.ctx,a=this.now;switch(e){case`mushroom`:case`triple_mushroom`:case`golden_mushroom`:X(i,r,{freq:320,endFreq:160,sweepTime:.08,type:`sine`,duration:.12,gain:.18,when:a,env:{attack:.005,decay:.06,sustain:.5,release:.04}}),X(i,r,{freq:180,endFreq:420,type:`sine`,duration:.12,gain:.14,when:a+.1,env:{attack:.005,decay:.06,sustain:.5,release:.05}});break;case`star`:z_(i,r,[84,88,91,96],{type:`sine`,gain:.07,duration:.2,when:a,env:{attack:.005,decay:.15,sustain:.3,release:.15}});break;case`lightning`:X(i,r,{freq:120,endFreq:2200,type:`square`,duration:.5,gain:.1,when:a,filter:{type:`lowpass`,freq:3e3},env:{attack:.02,decay:.1,sustain:.8,release:.05}}),L_(i,r,{duration:.5,gain:.08,rate:1.5,when:a,filter:{type:`highpass`,freq:2e3},env:{attack:.05,decay:.2,sustain:.8,release:.05}});break;case`none`:break;default:L_(i,r,{duration:.22,gain:.2,when:a,filter:{type:`bandpass`,freq:900,endFreq:2600,q:1},env:{attack:.01,decay:.15,sustain:.3,release:.08}})}}itemHit(e,t,n){let r=n?this.spatial(null,8,50,1):this.spatial(t,8,50,.7);if(!r)return;let i=this.ctx;L_(i,r,{duration:.18,gain:n?.3:.22,filter:{type:`bandpass`,freq:e===`banana`||e===`triple_banana`?700:1400,q:.8},env:{attack:.001,decay:.14,sustain:.15,release:.08}}),X(i,r,{freq:160,endFreq:70,type:`sine`,duration:.15,gain:.2,env:{attack:.002,decay:.12,sustain:.2,release:.05}})}itemDestroyed(e,t){let n=this.spatial(t,8,45,.7);if(!n)return;let r=this.ctx,i=this.now;if(e===`banana`||e===`triple_banana`){L_(r,n,{duration:.12,gain:.14,color:`pink`,filter:{type:`lowpass`,freq:800},env:{attack:.002,decay:.1,sustain:.2,release:.05}});return}if(e!==`bob_omb`){for(let e=0;e<3;e++)X(r,n,{freq:2200+Math.random()*1200,type:`sine`,duration:.12,gain:.07,when:i+e*.02,env:{attack:.001,decay:.1,sustain:.05,release:.08}});L_(r,n,{duration:.08,gain:.1,when:i,filter:{type:`highpass`,freq:3e3},env:{attack:.001,decay:.06,sustain:.1,release:.04}})}}shellBounce(e){let t=this.spatial(e,8,45,.7);t&&(X(this.ctx,t,{freq:1900,endFreq:1300,type:`sine`,duration:.07,gain:.14,env:{attack:.001,decay:.05,sustain:.2,release:.04}}),L_(this.ctx,t,{duration:.03,gain:.08,filter:{type:`highpass`,freq:4e3},env:{attack:.001,decay:.025,sustain:.1,release:.02}}))}explosion(e,t){let n=this.spatial(e,14,140,1);if(!n)return;let r=this.ctx,i=this.now,a=.8+Y(t/6)*.4;L_(r,n,{duration:.02,gain:.3*a,when:i,filter:{type:`highpass`,freq:3e3},env:{attack:.001,decay:.015,sustain:.1,release:.01}}),X(r,n,{freq:85,endFreq:28,type:`sine`,duration:.6,gain:.6*a,when:i,env:{attack:.005,decay:.4,sustain:.3,release:.3}}),L_(r,n,{duration:.55,gain:.5*a,when:i,filter:{type:`lowpass`,freq:1400,endFreq:180},env:{attack:.003,decay:.4,sustain:.25,release:.3}}),L_(r,n,{duration:1,gain:.2*a,color:`brown`,when:i+.1,filter:{type:`lowpass`,freq:400},env:{attack:.05,decay:.6,sustain:.4,release:.5}})}lightning(){if(this.disposed)return;let e=this.buses.sfx,t=this.ctx,n=this.now;L_(t,e,{duration:.35,gain:.55,when:n,filter:{type:`highpass`,freq:1200,endFreq:250},env:{attack:.001,decay:.25,sustain:.2,release:.15}}),X(t,e,{freq:3e3,endFreq:200,type:`square`,duration:.15,gain:.12,when:n,filter:{type:`lowpass`,freq:4e3},env:{attack:.001,decay:.12,sustain:.1,release:.05}}),L_(t,e,{duration:1.4,gain:.4,color:`brown`,when:n+.05,filter:{type:`lowpass`,freq:160},env:{attack:.02,decay:.9,sustain:.4,release:.5}})}boxRespawn(e){let t=this.spatial(e,8,35,.5);t&&X(this.ctx,t,{freq:880,endFreq:1320,type:`sine`,duration:.1,gain:.08,env:{attack:.005,decay:.08,sustain:.3,release:.08}})}blueShellLaunch(){if(this.disposed)return;let e=this.buses.sfx,t=this.ctx,n=this.now;for(let r=0;r<3;r++){let i=n+r*.26;X(t,e,{freq:600,endFreq:900,type:`square`,duration:.12,gain:.09,when:i,filter:{type:`lowpass`,freq:2500},env:{attack:.005,decay:.05,sustain:.7,release:.03}}),X(t,e,{freq:900,endFreq:600,type:`square`,duration:.12,gain:.09,when:i+.13,filter:{type:`lowpass`,freq:2500},env:{attack:.005,decay:.05,sustain:.7,release:.03}})}L_(t,e,{duration:.6,gain:.15,when:n,filter:{type:`bandpass`,freq:600,endFreq:2e3,q:1},env:{attack:.05,decay:.3,sustain:.4,release:.2}})}countdown(e){if(this.disposed)return;let t=this.buses.sfx,n=e<=1?880:740;X(this.ctx,t,{freq:n,type:`square`,duration:.16,gain:.11,filter:{type:`lowpass`,freq:3e3},env:{attack:.003,decay:.05,sustain:.7,release:.06}}),X(this.ctx,t,{freq:n,type:`sine`,duration:.16,gain:.14,env:{attack:.003,decay:.05,sustain:.7,release:.06}})}raceStart(){if(this.disposed)return;let e=this.buses.sfx,t=this.ctx,n=this.now;z_(t,e,[72,76,79,84],{type:`square`,gain:.08,duration:.55,when:n,filter:{type:`lowpass`,freq:3500},env:{attack:.005,decay:.15,sustain:.6,release:.3}}),z_(t,e,[60,67],{type:`sawtooth`,gain:.07,duration:.55,when:n,filter:{type:`lowpass`,freq:1800},env:{attack:.005,decay:.15,sustain:.6,release:.3}}),X(t,e,{freq:150,endFreq:50,type:`sine`,duration:.2,gain:.3,when:n,env:{attack:.002,decay:.15,sustain:.2,release:.08}})}lap(e,t,n){if(!t||this.disposed)return;let r=this.buses.sfx,i=this.ctx,a=this.now,o=(e,t,n)=>{X(i,r,{freq:e,type:`sine`,duration:.01,gain:t,when:n,env:{attack:.002,decay:.6,sustain:.001,release:.2}}),X(i,r,{freq:e*2,type:`sine`,duration:.01,gain:t*.3,when:n,env:{attack:.002,decay:.4,sustain:.001,release:.15}}),X(i,r,{freq:e*2.76,type:`sine`,duration:.01,gain:t*.22,when:n,env:{attack:.002,decay:.3,sustain:.001,release:.1}})};o(1568,.2,a),n&&(o(2093,.16,a+.18),R_(i,r,[[72,.12],[76,.12],[79,.12],[84,.45]],{type:`square`,gain:.1,when:a+.3,filter:{type:`lowpass`,freq:3e3},env:{attack:.005,decay:.05,sustain:.7,release:.08}}),R_(i,r,[[67,.12],[72,.12],[76,.12],[79,.45]],{type:`sawtooth`,gain:.06,when:a+.3,filter:{type:`lowpass`,freq:2200},env:{attack:.005,decay:.05,sustain:.7,release:.08}}))}finish(e,t,n){if(this.disposed)return;let r=this.ctx,i=this.now;if(!n){let t=this.spatial(this.kartPosition(e),10,60,.4);if(!t)return;X(r,t,{freq:1046,endFreq:1568,type:`sine`,duration:.2,gain:.1,when:i,env:{attack:.005,decay:.15,sustain:.3,release:.1}});return}let a=this.buses.sfx,o={type:`square`,gain:.11,filter:{type:`lowpass`,freq:2800},env:{attack:.01,decay:.08,sustain:.75,release:.1}};t===1?(R_(r,a,[[67,.14],[67,.14],[67,.14],[72,.5],[76,.2],[79,.7]],{...o,when:i}),R_(r,a,[[60,.14],[60,.14],[60,.14],[64,.5],[67,.2],[72,.7]],{...o,gain:.07,type:`sawtooth`,when:i}),z_(r,a,[72,76,79,84],{type:`sawtooth`,gain:.06,duration:1.3,when:i+1.85,detune:8,filter:{type:`lowpass`,freq:2400},env:{attack:.02,decay:.3,sustain:.7,release:.6}}),X(r,a,{freq:1568,type:`sine`,duration:.01,gain:.15,when:i+1.85,env:{attack:.002,decay:.8,sustain:.001,release:.3}})):t<=3?(R_(r,a,[[72,.15],[76,.15],[79,.15],[84,.55]],{...o,when:i}),z_(r,a,[72,76,79],{type:`sawtooth`,gain:.06,duration:.9,when:i+.5,detune:8,filter:{type:`lowpass`,freq:2400},env:{attack:.02,decay:.3,sustain:.7,release:.5}})):(R_(r,a,[[67,.32],[65,.32],[63,.32],[60,.95]],{type:`sawtooth`,gain:.11,when:i,vibrato:{rate:6,depth:45},filter:{type:`lowpass`,freq:1200,endFreq:500},env:{attack:.03,decay:.1,sustain:.8,release:.15}}),R_(r,a,[[55,.32],[53,.32],[51,.32],[48,.95]],{type:`square`,gain:.05,when:i,filter:{type:`lowpass`,freq:900},env:{attack:.03,decay:.1,sustain:.8,release:.15}}))}positionChange(e,t){if(this.disposed)return;let n=t<e;X(this.ctx,this.buses.sfx,{freq:n?600:1200,endFreq:n?1200:600,type:`sine`,duration:.12,gain:.11,env:{attack:.005,decay:.08,sustain:.4,release:.08}}),L_(this.ctx,this.buses.sfx,{duration:.12,gain:.06,filter:{type:`bandpass`,freq:n?1200:2400,endFreq:n?2400:1200,q:1.5},env:{attack:.01,decay:.08,sustain:.3,release:.06}})}wrongWay(e,t){if(!t||!this.isPlayer(e)||this.disposed)return;let n=this.now;n-this.lastWrongWay<1||(this.lastWrongWay=n,X(this.ctx,this.buses.sfx,{freq:110,type:`square`,duration:.25,gain:.11,filter:{type:`lowpass`,freq:700},env:{attack:.005,decay:.05,sustain:.8,release:.05}}))}uiMove(){this.disposed||X(this.ctx,this.buses.ui,{freq:1200,type:`sine`,duration:.035,gain:.12,env:{attack:.002,decay:.02,sustain:.3,release:.03}})}uiSelect(){if(this.disposed)return;let e=this.now;X(this.ctx,this.buses.ui,{freq:880,type:`sine`,duration:.06,gain:.13,when:e,env:{attack:.002,decay:.04,sustain:.5,release:.04}}),X(this.ctx,this.buses.ui,{freq:1320,type:`sine`,duration:.12,gain:.14,when:e+.06,env:{attack:.002,decay:.08,sustain:.4,release:.08}})}uiBack(){this.disposed||X(this.ctx,this.buses.ui,{freq:660,endFreq:440,type:`sine`,duration:.12,gain:.1,env:{attack:.003,decay:.08,sustain:.4,release:.06}})}uiError(){if(this.disposed)return;let e=this.now;for(let t=0;t<2;t++)X(this.ctx,this.buses.ui,{freq:220,type:`square`,duration:.08,gain:.08,when:e+t*.12,filter:{type:`lowpass`,freq:1200},env:{attack:.003,decay:.03,sustain:.8,release:.03}})}},X_=16,Z_=.1,Q_=25,$_=class{notes=[];add(e,t,n,r,i){return this.notes.push({inst:e,step:t,note:n,dur:r,vel:i}),this}kick(e,t=1){return this.add(`kick`,e,0,1,t)}snare(e,t=1){return this.add(`snare`,e,0,1,t)}hatC(e,t=1){return this.add(`hatC`,e,0,1,t)}hatO(e,t=1){return this.add(`hatO`,e,0,1,t)}crash(e,t=1){return this.add(`crash`,e,0,1,t)}bass(e,t,n,r=1){return this.add(`bass`,e,t,n,r)}lead(e,t,n,r=1){return this.add(`lead`,e,t,n,r)}arp(e,t,n,r=1){return this.add(`arp`,e,t,n,r)}bell(e,t,n,r=1){return this.add(`bell`,e,t,n,r)}chord(e,t,n,r=1){for(let i of t)this.add(`chord`,e,i,n,r);return this}pad(e,t,n,r=1){for(let i of t)this.add(`pad`,e,i,n,r);return this}melody(e,t,n=1){for(let[r,i,a]of t)this.add(e,r,i,a,n);return this}build(){return{notes:this.notes}}},ev=class{output;ctx;song;stepDur;drumBus;bassBus;leadBus;leadDelay;leadFeedback;leadWet;chordBus;chordFilter;chordLfo;arpBus;timer=null;bar=0;step=0;nextTime=0;stopped=!1;constructor(e,t,n){this.ctx=e,this.song=n,this.stepDur=60/n.bpm/4,this.output=e.createGain(),this.output.gain.value=0,this.output.connect(t);let r=t=>{let n=e.createGain();return n.gain.value=t,n.connect(this.output),n};this.drumBus=r(.9*n.gain),this.bassBus=r(.8*n.gain),this.arpBus=r(.7*n.gain),this.leadBus=r(.85*n.gain),this.leadDelay=e.createDelay(1.5),this.leadDelay.delayTime.value=Math.min(1.4,this.stepDur*3),this.leadFeedback=e.createGain(),this.leadFeedback.gain.value=.32,this.leadWet=e.createGain(),this.leadWet.gain.value=.3*n.leadDelay*n.gain;let i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.value=2600,this.leadBus.connect(this.leadDelay),this.leadDelay.connect(i),i.connect(this.leadFeedback),this.leadFeedback.connect(this.leadDelay),i.connect(this.leadWet),this.leadWet.connect(this.output),this.chordBus=e.createGain(),this.chordBus.gain.value=.9*n.gain,this.chordFilter=e.createBiquadFilter(),this.chordFilter.type=`lowpass`,this.chordFilter.frequency.value=1500,this.chordFilter.Q.value=.9,this.chordLfo=e.createOscillator(),this.chordLfo.type=`sine`,this.chordLfo.frequency.value=.13;let a=e.createGain();a.gain.value=750,this.chordLfo.connect(a),a.connect(this.chordFilter.frequency),this.chordBus.connect(this.chordFilter),this.chordFilter.connect(this.output),this.chordLfo.start()}start(e,t){if(this.timer||this.stopped)return;let n=this.ctx.currentTime,r=Math.max(n+.02,e);this.output.gain.cancelScheduledValues(n),this.output.gain.setValueAtTime(1e-4,n),this.output.gain.exponentialRampToValueAtTime(1,r+Math.max(.02,t)),this.nextTime=r,this.bar=0,this.step=0,this.timer=setInterval(()=>this.tick(),Q_),this.tick()}stop(e){if(this.stopped)return;this.stopped=!0;let t=this.ctx.currentTime,n=this.output.gain;n.cancelScheduledValues(t),n.setValueAtTime(Math.max(1e-4,n.value),t),n.exponentialRampToValueAtTime(1e-4,t+Math.max(.02,e)),this.timer&&=(clearInterval(this.timer),null),setTimeout(()=>{try{this.chordLfo.stop()}catch{}this.output.disconnect(),this.leadFeedback.disconnect(),this.leadDelay.disconnect()},e*1e3+1200)}dispose(){this.stopped||this.stop(.02)}tick(){if(this.stopped)return;let e=this.ctx.currentTime+Z_,t=this.song.bars;if(t.length===0)return;let n=0;for(;this.nextTime<e&&n++<64;){let e=t[this.bar],n=this.nextTime;for(let t of e.notes)t.step===this.step&&this.play(t,n);this.step++,this.nextTime+=this.stepDur,this.step>=X_&&(this.step=0,this.bar++,this.bar>=t.length&&(this.bar=Math.min(this.song.loopStart,t.length-1)))}}play(e,t){let n=e.dur*this.stepDur,r=e.note+this.song.transpose;switch(e.inst){case`kick`:this.kick(t,e.vel);break;case`snare`:this.snare(t,e.vel);break;case`hatC`:this.hat(t,e.vel,!1);break;case`hatO`:this.hat(t,e.vel,!0);break;case`crash`:this.crash(t,e.vel);break;case`bass`:this.bass(t,r,n,e.vel);break;case`lead`:this.lead(t,r,n,e.vel);break;case`chord`:this.chord(t,r,n,e.vel,!1);break;case`pad`:this.chord(t,r,n,e.vel,!0);break;case`arp`:this.arp(t,r,n,e.vel);break;case`bell`:this.bell(t,r,n,e.vel)}}kick(e,t){let n=this.ctx,r=n.createOscillator();r.type=`sine`,r.frequency.setValueAtTime(170,e),r.frequency.exponentialRampToValueAtTime(44,e+.1);let i=n.createGain();i.gain.setValueAtTime(.9*t,e),i.gain.exponentialRampToValueAtTime(1e-4,e+.3),r.connect(i),i.connect(this.drumBus),r.start(e),r.stop(e+.32),r.onended=()=>{r.disconnect(),i.disconnect()},L_(n,this.drumBus,{duration:.012,gain:.22*t,when:e,filter:{type:`highpass`,freq:2500},env:{attack:.001,decay:.01,sustain:.1,release:.01}})}snare(e,t){let n=this.ctx;L_(n,this.drumBus,{duration:.14,gain:.5*t,when:e,filter:{type:`bandpass`,freq:1700,q:.8},env:{attack:.001,decay:.12,sustain:.05,release:.04}});let r=n.createOscillator();r.type=`triangle`,r.frequency.setValueAtTime(195,e),r.frequency.exponentialRampToValueAtTime(150,e+.08);let i=n.createGain();i.gain.setValueAtTime(.35*t,e),i.gain.exponentialRampToValueAtTime(1e-4,e+.1),r.connect(i),i.connect(this.drumBus),r.start(e),r.stop(e+.12),r.onended=()=>{r.disconnect(),i.disconnect()}}hat(e,t,n){L_(this.ctx,this.drumBus,{duration:n?.14:.03,gain:(n?.16:.2)*t,when:e,filter:{type:`highpass`,freq:8e3,q:.7},env:n?{attack:.001,decay:.12,sustain:.15,release:.05}:{attack:.001,decay:.03,sustain:.05,release:.01}})}crash(e,t){L_(this.ctx,this.drumBus,{duration:.7,gain:.28*t,when:e,filter:{type:`highpass`,freq:4500,q:.6},env:{attack:.002,decay:.55,sustain:.12,release:.4}}),L_(this.ctx,this.drumBus,{duration:.5,gain:.14*t,when:e,color:`pink`,filter:{type:`bandpass`,freq:3200,q:1.2},env:{attack:.002,decay:.4,sustain:.1,release:.3}})}bass(e,t,n,r){let i=this.ctx,a=O_(t),o=i.createOscillator();o.type=`sawtooth`,o.frequency.value=a;let s=i.createOscillator();s.type=`square`,s.frequency.value=a*.5;let c=i.createGain();c.gain.value=.45;let l=i.createBiquadFilter();l.type=`lowpass`,l.Q.value=2.2,M_(l.frequency,300+a*7,120+a*2.5,e,Math.min(.18,Math.max(.05,n)));let u=i.createGain(),d=j_(u.gain,e,.3*r,n*.9,{attack:.004,decay:.08,sustain:.75,release:.05});o.connect(l),s.connect(c),c.connect(l),l.connect(u),u.connect(this.bassBus),o.start(e),s.start(e),o.stop(d+.02),s.stop(d+.02),o.onended=()=>{o.disconnect(),s.disconnect(),l.disconnect(),u.disconnect()}}lead(e,t,n,r){let i=this.ctx,a=O_(t),o=i.createOscillator();o.type=`square`,o.frequency.value=a;let s=i.createOscillator();s.type=`sawtooth`,s.frequency.value=a,s.detune.value=-6;let c=i.createGain();c.gain.value=.45;let l=i.createOscillator();l.type=`sine`,l.frequency.value=5.5;let u=i.createGain();u.gain.setValueAtTime(0,e),u.gain.linearRampToValueAtTime(9,e+.15),l.connect(u),u.connect(o.detune),u.connect(s.detune);let d=i.createBiquadFilter();d.type=`lowpass`,d.frequency.value=3200,d.Q.value=.8;let f=i.createGain(),p=j_(f.gain,e,.2*r,n*.92,{attack:.008,decay:.06,sustain:.75,release:.07});o.connect(d),s.connect(c),c.connect(d),d.connect(f),f.connect(this.leadBus),o.start(e),s.start(e),l.start(e),o.stop(p+.02),s.stop(p+.02),l.stop(p+.02),o.onended=()=>{o.disconnect(),s.disconnect(),l.disconnect(),d.disconnect(),f.disconnect()}}chord(e,t,n,r,i){let a=this.ctx,o=O_(t),s=a.createGain(),c=i?{attack:.25,decay:.3,sustain:.85,release:.5}:{attack:.02,decay:.1,sustain:.8,release:.15},l=j_(s.gain,e,(i?.04:.05)*r,n*.95,c),u=a.createOscillator();u.type=i?`triangle`:`sawtooth`,u.frequency.value=o,u.detune.value=7;let d=a.createOscillator();d.type=`sawtooth`,d.frequency.value=o,d.detune.value=-7;let f=a.createGain();f.gain.value=i?.5:1,u.connect(s),d.connect(f),f.connect(s),s.connect(this.chordBus),u.start(e),d.start(e),u.stop(l+.02),d.stop(l+.02),u.onended=()=>{u.disconnect(),d.disconnect(),s.disconnect()}}arp(e,t,n,r){let i=this.ctx,a=O_(t),o=i.createOscillator();o.type=`triangle`,o.frequency.value=a;let s=i.createOscillator();s.type=`sine`,s.frequency.value=a*2;let c=i.createGain();c.gain.value=.3;let l=i.createBiquadFilter();l.type=`lowpass`,l.frequency.value=4500;let u=i.createGain(),d=j_(u.gain,e,.18*r,n*.8,{attack:.003,decay:.1,sustain:.25,release:.05});o.connect(l),s.connect(c),c.connect(l),l.connect(u),u.connect(this.arpBus),o.start(e),s.start(e),o.stop(d+.02),s.stop(d+.02),o.onended=()=>{o.disconnect(),s.disconnect(),l.disconnect(),u.disconnect()}}bell(e,t,n,r){let i=this.ctx,a=O_(t),o=i.createGain(),s=j_(o.gain,e,.2*r,.01,{attack:.002,decay:Math.max(.2,n),sustain:.001,release:.1}),c=i.createOscillator();c.type=`sine`,c.frequency.value=a;let l=i.createOscillator();l.type=`sine`,l.frequency.value=a*2.76;let u=i.createGain();u.gain.value=.3,c.connect(o),l.connect(u),u.connect(o),o.connect(this.arpBus),c.start(e),l.start(e),c.stop(s+.02),l.stop(s+.02),c.onended=()=>{c.disconnect(),l.disconnect(),o.disconnect()}}};function tv(e,t,n,r=1){let i=n===t?t+7:n>t?n-1:n+1,a=[t,t+7,t+12,t+7,t,t+7,t+9,i];for(let t=0;t<8;t++){let n=t%2==0?1:.8;e.bass(t*2,a[t],2,r*n)}}function nv(e,t,n){if(e.kick(0,1).kick(4,.9).kick(8,1).kick(12,.9),e.snare(4,.9).snare(12,.95),t){for(let t=0;t<16;t++)e.hatC(t,t%4==2?.8:t%2==0?.45:.3);e.hatO(6,.5).hatO(14,.5)}else for(let t=0;t<16;t+=2)e.hatC(t,t%4==2?.8:.45);n&&e.snare(12,.5).snare(13,.6).snare(14,.75).snare(15,.9)}var rv=[[[0,79,2],[2,83,2],[4,86,3],[8,83,2],[10,81,2],[12,79,4]],[[0,78,3],[4,81,2],[6,86,2],[8,81,4],[12,78,2],[14,76,2]],[[0,76,2],[2,79,2],[4,83,4],[8,79,2],[10,81,2],[12,83,4]],[[0,84,3],[4,83,2],[6,81,2],[8,79,4],[12,81,2],[14,83,2]],[[0,79,2],[2,83,2],[4,86,3],[8,88,2],[10,86,2],[12,83,4]],[[0,81,3],[4,78,2],[6,81,2],[8,86,4],[12,85,2],[14,86,2]],[[0,88,2],[2,86,2],[4,84,4],[8,83,2],[10,84,2],[12,86,4]],[[0,86,4],[4,81,2],[6,83,2],[8,81,2],[10,78,2],[12,74,4]]],iv=[[[0,83,1],[1,83,1],[2,88,2],[4,86,2],[6,83,2],[8,79,4],[12,81,2],[14,83,2]],[[0,84,1],[1,84,1],[2,88,2],[4,86,2],[6,84,2],[8,81,4],[12,79,2],[14,81,2]],[[0,83,2],[2,86,2],[4,91,4],[8,86,2],[10,83,2],[12,79,4]],[[0,81,2],[2,85,2],[4,86,4],[8,88,2],[10,86,2],[12,81,4]],[[0,83,1],[1,83,1],[2,88,2],[4,86,2],[6,83,2],[8,79,4],[12,81,2],[14,83,2]],[[0,84,1],[1,84,1],[2,88,2],[4,86,2],[6,84,2],[8,81,4],[12,84,2],[14,86,2]],[[0,88,2],[2,90,2],[4,91,4],[8,90,2],[10,88,2],[12,86,4]],[[0,85,2],[2,86,2],[4,88,2],[6,90,2],[8,91,4],[12,90,2],[14,88,2]]];function av(e){let t={root:43,chord:[67,71,74]},n={root:38,chord:[66,69,74]},r={root:40,chord:[64,67,71]},i={root:36,chord:[64,67,72]},a=[t,n,r,i,t,n,i,n],o=[r,i,t,n,r,i,n,n],s=e,c=[];for(let e=0;e<8;e++){let t=a[e],n=a[(e+1)%8],r=new $_;nv(r,s,e===7),e===0&&r.crash(0,.8),tv(r,t.root,n.root,.95),r.chord(0,t.chord,3,.9).chord(6,t.chord,2,.6).chord(8,t.chord,3,.85);for(let e=2;e<16;e+=4)r.arp(e,t.chord[Math.floor(e/4)%3]+12,1,.45);r.melody(`lead`,rv[e],.95),c.push(r.build())}for(let e=0;e<8;e++){let t=o[e],n=e===7?a[0]:o[e+1],r=new $_;nv(r,!0,e===7),e===0&&r.crash(0,.7),tv(r,t.root,n.root,1),r.chord(0,t.chord,16,.75);let i=[t.chord[0]+12,t.chord[1]+12,t.chord[2]+12,t.chord[0]+24],s=[0,1,2,3,2,1,0,1,2,3,2,1,0,1,2,3];for(let e=0;e<16;e++)r.arp(e,i[s[e]],1,e%4==0?.6:.4);r.melody(`lead`,iv[e],1),c.push(r.build())}return{bpm:e?152*1.1:152,transpose:+!!e,bars:c,loopStart:0,leadDelay:1,gain:1}}var ov=[[[0,81,6],[8,78,4],[12,76,4]],[[0,74,8],[8,78,4],[12,76,2],[14,74,2]],[[0,71,6],[8,74,4],[12,76,4]],[[0,73,8],[8,76,4],[12,69,4]]];function sv(){let e=[{root:38,chord:[57,61,62,66]},{root:35,chord:[59,62,66,69]},{root:43,chord:[55,59,62,66]},{root:45,chord:[57,62,64,67]}],t=[];for(let n=0;n<8;n++){let r=e[n%4],i=new $_;i.kick(0,.5).kick(8,.42),i.snare(4,.18).snare(12,.22);for(let e=2;e<16;e+=4)i.hatC(e,.35);n%2==1&&i.hatO(14,.2),i.bass(0,r.root,6,.8).bass(8,r.root+7,4,.6).bass(12,r.root,4,.5),i.pad(0,r.chord,16,.8);let a=r.chord.map(e=>e+12),o=[0,1,2,3,2,1,0,1];for(let e=0;e<8;e++)i.arp(e*2,a[o[e]],2,.5);n>=4&&i.melody(`lead`,ov[n-4],.55),t.push(i.build())}return{bpm:100,transpose:0,bars:t,loopStart:0,leadDelay:.8,gain:.85}}var cv=[[[0,67,1],[2,67,1],[4,67,2],[6,72,6],[12,76,4]],[[0,77,4],[4,76,2],[6,74,2],[8,72,8]],[[0,74,2],[2,76,2],[4,77,2],[6,79,2],[8,81,4],[12,83,4]],[[0,84,14]]],lv=[[[0,76,4],[4,79,4],[8,77,2],[10,76,2],[12,74,4]],[[0,72,6],[8,76,4],[12,74,4]],[[0,72,4],[4,74,2],[6,76,2],[8,77,8]],[[0,79,8],[8,76,4],[12,74,4]]];function uv(){let e=[],t=[{root:36,chord:[60,64,67,72]},{root:41,chord:[65,69,72,77]},{root:43,chord:[67,71,74,79]},{root:36,chord:[60,64,67,72]}];for(let n=0;n<4;n++){let r=t[n],i=new $_;if(n<3){if(i.kick(0,1).kick(8,.9),i.chord(0,r.chord,7,.9).chord(8,r.chord,7,.8),i.bass(0,r.root,7,1).bass(8,r.root,7,.9),n===2)for(let e=8;e<16;e++)i.snare(e,.35+(e-8)*.08);else i.snare(4,.6).snare(12,.7)}else i.crash(0,1).kick(0,1),i.chord(0,r.chord,15,1),i.bass(0,r.root,14,1);i.melody(`lead`,cv[n],1),e.push(i.build())}let n=[{root:36,chord:[60,64,67]},{root:45,chord:[60,64,69]},{root:41,chord:[60,65,69]},{root:43,chord:[59,62,67]}];for(let t=0;t<8;t++){let r=n[t%4],i=n[(t+1)%4],a=new $_;a.kick(0,.8).kick(8,.7),a.snare(4,.5).snare(12,.55);for(let e=2;e<16;e+=4)a.hatC(e,.5);a.bass(0,r.root,4,.9).bass(6,r.root+7,2,.6).bass(8,r.root,4,.85).bass(12,r.root+12,2,.6).bass(14,i.root>r.root?i.root-1:i.root+1,2,.6),a.pad(0,r.chord,16,.85);let o=r.chord.map(e=>e+12),s=[0,1,2,1,0,1,2,1];for(let e=0;e<8;e++)a.arp(e*2+1,o[s[e]],1,.4);t>=4&&a.melody(`lead`,lv[t-4],.7),e.push(a.build())}return{bpm:112,transpose:0,bars:e,loopStart:4,leadDelay:.8,gain:.95}}function dv(){let e=[72,77,79,72],t=[];for(let n=0;n<4;n++){let r=e[n],i=[r,r+4,r+7,r+12,r+16,r+19,r+16,r+12,r+7,r+12,r+16,r+12,r+7,r+4,r+7,r+4],a=new $_;for(let e=0;e<16;e++)a.arp(e,i[e],1,e%4==0?1:.7);for(let e=0;e<16;e+=4)a.kick(e,.7).bass(e,r-24,2,.8);for(let e=2;e<16;e+=4)a.hatC(e,.6);t.push(a.build())}return{bpm:170,transpose:0,bars:t,loopStart:0,leadDelay:0,gain:1}}var fv=.8,pv=class{current=null;currentTrack=`none`;ctx;dest;constructor(e,t){this.ctx=e,this.dest=t}get track(){return this.currentTrack}play(e){if(e===this.currentTrack)return;if(e===`none`){this.stop();return}let t=mv(e),n=new ev(this.ctx,this.dest,t);this.current&&this.current.stop(fv),n.start(this.ctx.currentTime+.05,fv),this.current=n,this.currentTrack=e}stop(){this.current&&this.current.stop(fv),this.current=null,this.currentTrack=`none`}dispose(){this.current&&this.current.dispose(),this.current=null,this.currentTrack=`none`}};function mv(e){switch(e){case`menu`:return sv();case`race`:return av(!1);case`finalLap`:return av(!0);case`results`:return uv();default:return sv()}}function hv(e){A_(e,`white`),A_(e,`pink`)}var gv=-6,_v=.85,vv=.5,yv=-8,bv=-10,xv=1,Sv=25,Cv=4,wv=.5,Tv=16,Ev=class{ctx=null;master=null;compressor=null;limiter=null;musicBus=null;musicDuck=null;sfxBus=null;enginesBus=null;enginesClip=null;uiBus=null;sfx=null;music=null;crowd=null;starJingle=null;engines=Array(Tv).fill(null);frame=0;voiceTierTimer=0;_ready=!1;_muted=!1;masterVolume=1;pendingTrack=`none`;starFlags=new Uint8Array(Tv);lightningDuck=0;lastDuckDb=0;disposed=!1;initPromise=null;unsubs=[];camPos=new B;camFwd=new B;camUp=new B;camRight=new B;constructor(){let e=this.unsubs;e.push(q.on(`kart:starStart`,e=>{e.kartId>=0&&e.kartId<Tv&&(this.starFlags[e.kartId]=1)})),e.push(q.on(`kart:starEnd`,e=>{e.kartId>=0&&e.kartId<Tv&&(this.starFlags[e.kartId]=0)})),e.push(q.on(`item:lightning`,()=>{this.lightningDuck=xv})),e.push(q.on(`race:lap`,e=>{e.isPlayer&&(this.crowd?.cheerBurst(.5),e.isFinalLap&&this.music&&this.music.track===`race`&&this.playMusic(`finalLap`))})),e.push(q.on(`race:start`,()=>this.crowd?.cheerBurst(1))),e.push(q.on(`race:finish`,e=>{e.isPlayer&&this.crowd?.cheerBurst(1)}))}get ready(){return this._ready}get muted(){return this._muted}init(){return this.disposed?Promise.resolve():(this.initPromise||=this.doInit().finally(()=>{this.initPromise=null}),this.initPromise)}async doInit(){if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e){console.warn(`[AudioEngine] Web Audio API unavailable`);return}try{let t=new e({latencyHint:`interactive`});this.ctx=t,this.buildGraph(t)}catch(e){console.warn(`[AudioEngine] failed to create AudioContext`,e),this.ctx=null;return}}let e=this.ctx;if(e.state!==`running`)try{await e.resume()}catch(e){console.warn(`[AudioEngine] resume failed (needs a user gesture)`,e)}e.state===`running`&&!this._ready&&!this.disposed&&(this._ready=!0,this.pendingTrack!==`none`&&this.music&&this.music.play(this.pendingTrack))}buildGraph(e){let t=e.createGain();t.gain.value=this._muted?0:this.masterVolume;let n=e.createDynamicsCompressor();n.threshold.value=-12,n.knee.value=20,n.ratio.value=4,n.attack.value=.003,n.release.value=.25;let r=e.createDynamicsCompressor();r.threshold.value=-3,r.knee.value=0,r.ratio.value=20,r.attack.value=.001,r.release.value=.08,t.connect(n),n.connect(r),r.connect(e.destination);let i=(t,n)=>{let r=e.createGain();return r.gain.value=t,r.connect(n),r},a=i(1,t),o=i(D_(gv),a),s=i(1,t),c=e.createWaveShaper();c.curve=P_(1.6,2048),c.oversample=`none`,c.connect(t);let l=i(_v,c),u=i(vv,t);this.master=t,this.compressor=n,this.limiter=r,this.musicDuck=a,this.musicBus=o,this.sfxBus=s,this.enginesBus=l,this.enginesClip=c,this.uiBus=u,this.lastDuckDb=0,hv(e),this.sfx=new Y_(e,{sfx:s,ui:u}),this.music=new pv(e,o),this.crowd=new J_(e,s)}dispose(){if(this.disposed)return;this.disposed=!0;for(let e of this.unsubs)e();this.unsubs.length=0;for(let e=0;e<this.engines.length;e++){let t=this.engines[e];t&&t.voice.dispose(),this.engines[e]=null}this.starFlags.fill(0),this.music?.dispose(),this.music=null,this.starJingle?.dispose(),this.starJingle=null,this.crowd?.dispose(),this.crowd=null,this.sfx?.dispose(),this.sfx=null;let e=this.ctx;this.ctx=null,this._ready=!1,e&&setTimeout(()=>{e.close().catch(()=>void 0)},400),this.master=null,this.compressor=null,this.limiter=null,this.musicBus=null,this.musicDuck=null,this.sfxBus=null,this.enginesBus=null,this.enginesClip=null,this.uiBus=null}update(e,t,n,r){let i=this.ctx;if(!this._ready||!i||this.disposed||!this.sfx||!this.enginesBus)return;e=Math.min(Math.max(e,0),.1);let a=i.currentTime;this.frame++;let o=r.matrixWorld.elements;this.camPos.set(o[12],o[13],o[14]),this.camFwd.set(-o[8],-o[9],-o[10]).normalize(),this.camUp.set(o[4],o[5],o[6]).normalize(),this.camRight.crossVectors(this.camFwd,this.camUp).normalize(),G_(i.listener,this.camPos.x,this.camPos.y,this.camPos.z,this.camFwd.x,this.camFwd.y,this.camFwd.z,this.camUp.x,this.camUp.y,this.camUp.z);let s=this.sfx.listener;s.pos.copy(this.camPos),s.forward.copy(this.camFwd),s.up.copy(this.camUp),s.right.copy(this.camRight),this.sfx.karts=t,this.sfx.playerKartId=n;let c=this.engines,l=null;for(let r=0;r<t.length;r++){let a=t[r],o=a.state,s=o.id;if(s===n&&(l=a),s<0||s>=Tv)continue;let u=s===n||o.isPlayer,d=c[s];d||(d={voice:new U_(i,this.enginesBus,s,o.character.weightClass,u),lastSeen:this.frame,distance:0},c[s]=d),d.lastSeen=this.frame,d.distance=o.position.distanceTo(this.camPos),d.voice.update(e,o,a.input.throttle,a.topSpeed())}for(let e=0;e<c.length;e++){let t=c[e];t&&t.lastSeen!==this.frame&&(t.voice.dispose(),c[e]=null)}this.voiceTierTimer-=e,this.voiceTierTimer<=0&&(this.voiceTierTimer=wv,this.assignVoiceTiers());let u=!1,d=this.starFlags;for(let e=0;e<d.length;e++){if(d[e]===0)continue;let r=Dv(t,e);if(!r||!r.state.isInvincible){d[e]=0;continue}(r.state.isPlayer||e===n||r.state.position.distanceTo(this.camPos)<=Sv)&&(u=!0)}if(u&&!this.starJingle&&this.sfxBus){let e=new ev(i,this.sfxBus,dv());e.start(a+.05,.15),this.starJingle=e}else!u&&this.starJingle&&(this.starJingle.stop(.35),this.starJingle=null);let f=0;u&&(f=Math.min(f,yv)),this.lightningDuck>0&&(this.lightningDuck-=e,f=Math.min(f,bv)),f!==this.lastDuckDb&&this.musicDuck&&(this.lastDuckDb=f,this.musicDuck.gain.setTargetAtTime(D_(f),a,.12)),this.crowd?.update(e,l?l.state.trackT:null)}assignVoiceTiers(){let e=this.engines,t=Cv;for(let n=0;n<e.length;n++){let r=e[n];r&&r.voice.isPlayer&&(r.voice.setRich(!0),t--)}let n=0;for(;n<t;){let t=null;for(let n=0;n<e.length;n++){let r=e[n];!r||r.voice.isPlayer||r.distance<0||(!t||r.distance<t.distance)&&(t=r)}if(!t)break;t.voice.setRich(!0),t.distance=-1-t.distance,n++}for(let t=0;t<e.length;t++){let n=e[t];!n||n.voice.isPlayer||(n.distance<0?n.distance=-1-n.distance:n.voice.setRich(!1))}}playMusic(e){this.pendingTrack=e,!(!this._ready||!this.music)&&this.music.play(e)}stopMusic(){this.pendingTrack=`none`,this.music?.stop()}setMasterVolume(e){this.masterVolume=Y(e),this.master&&this.ctx&&!this._muted&&this.master.gain.setTargetAtTime(this.masterVolume,this.ctx.currentTime,.05)}setMuted(e){if(this._muted=e,this.master&&this.ctx){let t=this.master.gain,n=this.ctx.currentTime;t.cancelScheduledValues(n),t.setValueAtTime(t.value,n),t.linearRampToValueAtTime(e?0:this.masterVolume,n+.12)}}};function Dv(e,t){if(t>=0&&t<e.length&&e[t].state.id===t)return e[t];for(let n=0;n<e.length;n++)if(e[n].state.id===t)return e[n];return null}var Ov=`
uniform float uTime;
uniform float uGravity;
uniform float uHeightPx;
uniform float uAspect;

attribute vec3 aVelocity;
attribute vec2 aTime;   // birth, life
attribute vec2 aSize;   // start, end (world metres)
attribute vec3 aColor0;
attribute vec3 aColor1;
attribute vec2 aAlpha;  // start, end
attribute vec2 aRot;    // rotation, angular velocity
attribute vec4 aMisc;   // gravityScale, atlasIndex, alignToVelocity, drag

varying vec4 vColor;
varying float vRot;
varying float vAtlas;

void main() {
  float age = uTime - aTime.x;
  float life = max(aTime.y, 0.0001);
  float t = age / life;
  if (age < 0.0 || t >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vColor = vec4(0.0);
    vRot = 0.0;
    vAtlas = 0.0;
    return;
  }

  float k = aMisc.w;
  // Ballistic motion with optional exponential drag: integral of v*exp(-k t).
  float tt = k > 0.001 ? (1.0 - exp(-k * age)) / k : age;
  float g = uGravity * aMisc.x;
  vec3 pos = position + aVelocity * tt;
  pos.y -= 0.5 * g * age * age;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float size = mix(aSize.x, aSize.y, t);
  float px = size * projectionMatrix[1][1] * uHeightPx * 0.5 / max(0.05, -mv.z);
  gl_PointSize = clamp(px, 0.0, 512.0);

  float fadeIn = smoothstep(0.0, 0.06, t);
  float fadeOut = 1.0 - smoothstep(0.7, 1.0, t);
  float alpha = mix(aAlpha.x, aAlpha.y, t) * fadeIn * fadeOut;
  vColor = vec4(mix(aColor0, aColor1, t), alpha);

  float rot = aRot.x + aRot.y * age;
  if (aMisc.z > 0.5) {
    // Align the sprite's x axis to the screen-space velocity direction.
    vec3 vel = aVelocity * exp(-k * age);
    vel.y -= g * age;
    vec4 c1 = projectionMatrix * (modelViewMatrix * vec4(pos + vel * 0.02, 1.0));
    vec2 d = c1.xy / c1.w - gl_Position.xy / gl_Position.w;
    d.x *= uAspect;
    if (dot(d, d) > 1e-12) rot = atan(d.y, d.x);
  }
  vRot = rot;
  vAtlas = aMisc.y;
}
`,kv=`
uniform sampler2D uAtlas;

varying vec4 vColor;
varying float vRot;
varying float vAtlas;

void main() {
  if (vColor.a <= 0.001) discard;
  vec2 p = gl_PointCoord - 0.5;
  p.y = -p.y;
  float c = cos(vRot);
  float s = sin(vRot);
  vec2 uv = vec2(c * p.x + s * p.y, -s * p.x + c * p.y) + 0.5;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
  uv = clamp(uv, 0.008, 0.992);
  float col = mod(vAtlas, 4.0);
  float row = floor(vAtlas / 4.0);
  vec2 auv = vec2((col + uv.x) * 0.25, 1.0 - (row + 1.0 - uv.y) * 0.25);
  vec4 tex = texture2D(uAtlas, auv);
  float a = tex.a * vColor.a;
  if (a <= 0.003) discard;
  gl_FragColor = vec4(vColor.rgb * tex.rgb, a);
}
`,Av=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,jv=`
uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uBoost;
uniform float uHit;
uniform float uFlash;
uniform vec3 uFlashColor;
uniform float uGrain;

varying vec2 vUv;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Thin radial streaks in randomly chosen angular sectors, dashed segments
// racing outward from the centre. Returns 0..1 intensity.
float speedLines(vec2 adir, float r, float t) {
  float a = atan(adir.y, adir.x);
  const float SECTORS = 120.0;
  float sa = (a + 3.14159265) / 6.2831853 * SECTORS;
  float id = floor(sa);
  float fr = fract(sa);
  float rnd = hash11(id * 0.731 + 0.13);
  float rnd2 = hash11(id * 1.317 + 7.7);
  float w = 0.02 + 0.035 * rnd2;
  float line = 1.0 - smoothstep(0.0, w, abs(fr - 0.5));
  float speed = 2.5 + 2.5 * rnd2;
  float seg = fract(r * (2.0 + 2.0 * rnd) - t * speed + rnd * 13.0);
  float dash = smoothstep(0.3, 0.6, seg) * (1.0 - smoothstep(0.7, 1.0, seg));
  float mask = smoothstep(0.42, 0.9, r);
  float on = step(0.55, rnd);
  return line * dash * mask * on;
}

void main() {
  vec2 uv = vUv;
  vec2 dir = uv - 0.5;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 adir = vec2(dir.x * aspect, dir.y);
  float r = length(adir);
  float rn = length(dir) * 1.4142136;

  vec3 col;
  float boost = uBoost;
  // Radial blur + chromatic aberration only kick in past a moderate boost so a
  // light drift turbo doesn't smear the picture.
  float smear = smoothstep(0.25, 1.0, boost);
  if (smear > 0.003) {
    vec2 dn = dir / max(length(dir), 1e-4);
    float ca = smear * 0.0035 * rn * rn;
    float blur = smear * 0.016 * rn * rn;
    col = vec3(0.0);
    for (int i = 0; i < 5; i++) {
      float f = (float(i) / 4.0 - 0.5) * blur;
      vec2 o = uv - dir * f;
      col.r += texture2D(tDiffuse, o - dn * ca).r;
      col.g += texture2D(tDiffuse, o).g;
      col.b += texture2D(tDiffuse, o + dn * ca).b;
    }
    col *= 0.2;
  } else {
    col = texture2D(tDiffuse, uv).rgb;
  }

  // Speed lines: none until the kart is well past cruising speed, thin and
  // low-alpha even at full boost.
  float slAmt = smoothstep(0.6, 1.0, uSpeed) * 0.08 + boost * 0.16;
  if (slAmt > 0.002) {
    float sl = speedLines(adir, r, uTime);
    col += vec3(sl * slAmt) * vec3(0.95, 0.97, 1.05);
  }

  // Light vignette: untouched inside ~55% radius, ~15% darker in the corners.
  float vig = smoothstep(1.25, 0.55, rn * (1.0 + 0.08 * uSpeed));
  col *= mix(1.0, vig, 0.22 + 0.16 * uSpeed);

  if (uHit > 0.001) {
    float pulse = 0.8 + 0.2 * sin(uTime * 28.0);
    float edge = smoothstep(0.35, 1.0, rn);
    float hitMask = clamp(uHit * pulse * (0.2 + edge) * 1.0, 0.0, 0.8);
    col = mix(col, vec3(0.55, 0.02, 0.01), hitMask);
    float lum0 = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(lum0), uHit * 0.35);
  }

  col = mix(col, uFlashColor * 1.8, clamp(uFlash, 0.0, 1.0));

  // Fine grain (uGrain is a linear-light amplitude; ~1% at rest).
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float gr = hash21(uv * uResolution + fract(uTime * 7.31) * 100.0) - 0.5;
  col += gr * uGrain * (0.4 + 0.6 * (1.0 - clamp(lum, 0.0, 1.0)));

  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`,Mv=0,Nv=1,Pv=2,Fv=3,Iv=4,Lv=5,Rv=6,zv=7,Bv=8,Vv=9,Hv=10,Uv=6144,Wv=4096,Gv=16,Kv=14,Z={x:0,y:0,z:0,vx:0,vy:0,vz:0,life:1,size0:.3,size1:.1,r0:1,g0:1,b0:1,r1:1,g1:1,b1:1,a0:1,a1:0,rot:0,rotSpeed:0,gravity:0,atlas:0,align:0,drag:0};function Q(e,t){return e+Math.random()*(t-e)}function qv(e){return e<=.04045?e/12.92:((e+.055)/1.055)**2.4}var Jv=new Map;function Yv(e){let t=Jv.get(e);return t||(t={r:qv((e>>16&255)/255),g:qv((e>>8&255)/255),b:qv((e&255)/255)},Jv.set(e,t)),t}var Xv={r:0,g:0,b:0};function Zv(e,t,n){return n-=Math.floor(n),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Qv(e,t,n,r=Xv){e-=Math.floor(e);let i=n<.5?n*(1+t):n+t-n*t,a=2*n-i;return r.r=Zv(a,i,e+1/3),r.g=Zv(a,i,e),r.b=Zv(a,i,e-1/3),r}function $v(e,t=1){Z.r0=e.r*t,Z.g0=e.g*t,Z.b0=e.b*t}function ey(e,t=1){Z.r1=e.r*t,Z.g1=e.g*t,Z.b1=e.b*t}function ty(e,t=0){let n=Math.random()*2-1,r=Math.random()*J,i=Math.sqrt(Math.max(0,1-n*n));Z.vx=i*Math.cos(r)*e,Z.vy=n*e+t,Z.vz=i*Math.sin(r)*e}function ny(e,t,n,r){Z.x=e+Q(-r,r),Z.y=t+Q(-r,r),Z.z=n+Q(-r,r)}function ry(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`);if(!t)throw Error(`ParticleSystem: 2D canvas unavailable`);t.clearRect(0,0,512,512);let n=(e,n)=>{let r=e%4*128+64,i=Math.floor(e/4)*128+64;t.save(),t.translate(r,i),n(t,64),t.restore()},r=(e,t,n=0,r=1)=>{let i=e.createRadialGradient(0,0,0,0,0,t);i.addColorStop(0,`rgba(255,255,255,1)`),i.addColorStop(Math.max(.01,n),`rgba(255,255,255,${r>=1?1:.9})`),i.addColorStop(.55,`rgba(255,255,255,0.45)`),i.addColorStop(.85,`rgba(255,255,255,0.08)`),i.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=i,e.fillRect(-t,-t,t*2,t*2)};n(Mv,(e,t)=>r(e,t*.92,.15)),n(Nv,(e,t)=>{e.scale(1,.22),r(e,t*.95,.1)}),n(Pv,(e,t)=>{for(let n=0;n<9;n++){let r=n/9*J+.4,i=n===0?0:t*.28,a=Math.cos(r)*i,o=Math.sin(r)*i,s=t*(n===0?.55:.42),c=e.createRadialGradient(a,o,0,a,o,s);c.addColorStop(0,`rgba(255,255,255,0.55)`),c.addColorStop(.6,`rgba(255,255,255,0.22)`),c.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=c,e.fillRect(-t,-t,t*2,t*2)}}),n(Fv,(e,t)=>{r(e,t*.55,.05),e.globalAlpha=1,e.fillStyle=`#fff`,e.beginPath();let n=t*.9,i=t*.18;for(let t=0;t<8;t++){let r=t%2==0?n:i,a=t/8*J-Math.PI/2,o=Math.cos(a)*r,s=Math.sin(a)*r;t===0?e.moveTo(o,s):e.lineTo(o,s)}e.closePath(),e.fill()}),n(Iv,(e,t)=>{let n=t*.72,r=e.createLinearGradient(-n,-n,n,n);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(1,`rgba(200,200,200,1)`),e.fillStyle=r,e.fillRect(-n,-n*.7,n*2,n*1.4)}),n(Lv,(e,t)=>{let n=e.createRadialGradient(0,0,0,0,0,t*.95);n.addColorStop(0,`rgba(255,255,255,0)`),n.addColorStop(.62,`rgba(255,255,255,0)`),n.addColorStop(.78,`rgba(255,255,255,1)`),n.addColorStop(.9,`rgba(255,255,255,0.5)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.fillRect(-t,-t,t*2,t*2)}),n(Rv,(e,t)=>{e.lineCap=`round`,e.lineJoin=`round`;let n=[[-t*.05,-t*.95],[t*.25,-t*.45],[-t*.15,-t*.25],[t*.3,t*.15],[-t*.1,t*.3],[t*.12,t*.95]],r=(t,r)=>{e.strokeStyle=`rgba(255,255,255,${r})`,e.lineWidth=t,e.beginPath(),e.moveTo(n[0][0],n[0][1]);for(let t=1;t<n.length;t++)e.lineTo(n[t][0],n[t][1]);e.stroke()};r(t*.55,.12),r(t*.3,.3),r(t*.12,1)}),n(zv,(e,t)=>{e.fillStyle=`#fff`,e.beginPath();for(let n=0;n<6;n++){let r=n/6*J,i=Math.cos(r)*t*.8,a=Math.sin(r)*t*.8;n===0?e.moveTo(i,a):e.lineTo(i,a)}e.closePath(),e.fill()}),n(Bv,(e,t)=>{let n=e.createRadialGradient(0,t*.25,0,0,t*.2,t*.75);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.5,`rgba(255,255,255,0.55)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.beginPath(),e.moveTo(0,-t*.95),e.bezierCurveTo(t*.75,-t*.1,t*.75,t*.6,0,t*.85),e.bezierCurveTo(-t*.75,t*.6,-t*.75,-t*.1,0,-t*.95),e.closePath(),e.fill()}),n(Vv,(e,t)=>{let n=e.createLinearGradient(-t,0,t,0);n.addColorStop(0,`rgba(255,255,255,0.7)`),n.addColorStop(.5,`rgba(255,255,255,1)`),n.addColorStop(1,`rgba(255,255,255,0.7)`),e.fillStyle=n,e.beginPath(),e.moveTo(-t*.9,0),e.lineTo(-t*.1,-t*.32),e.lineTo(t*.9,0),e.lineTo(-t*.1,t*.32),e.closePath(),e.fill()}),n(Hv,(e,t)=>{let n=e.createRadialGradient(0,0,0,0,0,t*.8);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.75,`rgba(255,255,255,1)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.fillRect(-t,-t,t*2,t*2)});let i=new Fi(e);return i.colorSpace=``,i.minFilter=p,i.magFilter=d,i.wrapS=o,i.wrapT=o,i.generateMipmaps=!0,i.needsUpdate=!0,i}var iy=class{points;material;geometry;capacity;head=0;runStart=0;runLength=0;position;velocity;time;size;color0;color1;alpha;rot;misc;attributes;supportsRanges;drawSize=new z;constructor(e,t,n,r){this.capacity=e,this.position=new Float32Array(e*3),this.velocity=new Float32Array(e*3),this.time=new Float32Array(e*2),this.size=new Float32Array(e*2),this.color0=new Float32Array(e*3),this.color1=new Float32Array(e*3),this.alpha=new Float32Array(e*2),this.rot=new Float32Array(e*2),this.misc=new Float32Array(e*4);for(let t=0;t<e;t++)this.time[t*2]=-1e6,this.time[t*2+1]=.001;let i=new Rr,a=(e,t)=>{let n=new Cr(e,t);return n.setUsage(Xe),n},o={position:a(this.position,3),aVelocity:a(this.velocity,3),aTime:a(this.time,2),aSize:a(this.size,2),aColor0:a(this.color0,3),aColor1:a(this.color1,3),aAlpha:a(this.alpha,2),aRot:a(this.rot,2),aMisc:a(this.misc,4)};for(let[e,t]of Object.entries(o))i.setAttribute(e,t);this.attributes=Object.values(o),this.supportsRanges=typeof o.position.addUpdateRange==`function`,i.boundingSphere=new Ar(new B,1e6),this.geometry=i,this.material=new wo({uniforms:{uTime:{value:0},uGravity:{value:26},uHeightPx:{value:1080},uAspect:{value:16/9},uAtlas:{value:n}},vertexShader:Ov,fragmentShader:kv,transparent:!0,depthWrite:!1,depthTest:!0,blending:t?2:1,fog:!1});let s=new Mi(i,this.material);s.frustumCulled=!1,s.renderOrder=r,s.matrixAutoUpdate=!1,s.name=t?`ParticlesAdditive`:`ParticlesAlpha`,s.onBeforeRender=e=>{e.getDrawingBufferSize(this.drawSize),this.material.uniforms.uHeightPx.value=this.drawSize.y,this.material.uniforms.uAspect.value=this.drawSize.x/Math.max(1,this.drawSize.y)},this.points=s}setTime(e){this.material.uniforms.uTime.value=e}spawn(e,t){let n=this.head,r=n*2,i=n*3,a=n*4;this.position[i]=e.x,this.position[i+1]=e.y,this.position[i+2]=e.z,this.velocity[i]=e.vx,this.velocity[i+1]=e.vy,this.velocity[i+2]=e.vz,this.time[r]=t,this.time[r+1]=Math.max(.01,e.life),this.size[r]=e.size0,this.size[r+1]=e.size1,this.color0[i]=e.r0,this.color0[i+1]=e.g0,this.color0[i+2]=e.b0,this.color1[i]=e.r1,this.color1[i+1]=e.g1,this.color1[i+2]=e.b1,this.alpha[r]=e.a0,this.alpha[r+1]=e.a1,this.rot[r]=e.rot,this.rot[r+1]=e.rotSpeed,this.misc[a]=e.gravity,this.misc[a+1]=e.atlas,this.misc[a+2]=e.align,this.misc[a+3]=e.drag,this.runLength===0&&(this.runStart=n),this.runLength<this.capacity&&this.runLength++,this.head=n+1>=this.capacity?0:n+1}flush(){if(this.runLength===0)return;let e=!this.supportsRanges||this.runLength>=this.capacity;for(let t of this.attributes){if(!e){let e=t.itemSize,n=this.runStart+this.runLength;n<=this.capacity?t.addUpdateRange(this.runStart*e,this.runLength*e):(t.addUpdateRange(this.runStart*e,(this.capacity-this.runStart)*e),t.addUpdateRange(0,(n-this.capacity)*e))}t.needsUpdate=!0}this.runLength=0}clear(){for(let e=0;e<this.capacity;e++)this.time[e*2]=-1e6,this.time[e*2+1]=.001;this.head=0,this.runStart=0,this.runLength=this.capacity}dispose(){this.geometry.dispose(),this.material.dispose()}},ay=0,oy=1,sy=2,cy=3;function ly(e){switch(e){case`mushroom`:case`golden`:return sy;case`pad`:case`start`:return cy;default:return oy}}var uy=[16730955,16765503,4054148,4114175,16735457,9403391,16777215,16751150],dy=[16777215,4114175,16751150,14044671],fy=class{object;atlas;additive;alpha;time=0;karts=[];unsubs=[];accDrift=new Float32Array(Gv);accFlame=new Float32Array(Gv);accSmoke=new Float32Array(Gv);accDust=new Float32Array(Gv);accStar=new Float32Array(Gv);accStreak=0;boostSource=new Uint8Array(Gv);confettiTimer=0;confettiScale=1;accConfetti=0;playerPodiumPlace=0;camPos=new B;camFwd=new B;camRight=new B;camUp=new B;tmp=new B;constructor(){this.atlas=ry(),this.additive=new iy(Uv,!0,this.atlas,20),this.alpha=new iy(Wv,!1,this.atlas,19);let e=new Fn;e.name=`ParticleSystem`,e.matrixAutoUpdate=!1,e.add(this.alpha.points),e.add(this.additive.points),this.object=e,this.subscribe()}subscribe(){let e=this.unsubs;e.push(q.on(`item:explosion`,e=>{this.emit(`explosion`,e.position,{scale:Math.max(.6,e.radius/4)})})),e.push(q.on(`item:hit`,e=>{this.emit(`hitSparks`,e.position,{scale:1.1}),e.item===`banana`||e.item===`triple_banana`?this.emit(`bananaSplat`,e.position):e.item.includes(`shell`)&&this.emit(`shellBreak`,e.position,{color:py(e.item)})})),e.push(q.on(`item:destroyed`,e=>{e.item===`banana`||e.item===`triple_banana`?this.emit(`bananaSplat`,e.position):e.item===`bob_omb`?this.emit(`explosion`,e.position,{scale:.7}):this.emit(`shellBreak`,e.position,{color:py(e.item)})})),e.push(q.on(`item:shellBounce`,e=>this.emit(`hitSparks`,e.position,{scale:.55}))),e.push(q.on(`kart:land`,e=>{let t=this.kartById(e.kartId);t&&this.emit(`landPuff`,t.state.position,{scale:.7+Y(e.impact)*.8})})),e.push(q.on(`kart:collision`,e=>{let t=.4+Y(e.impulse/8)*.9;e.otherId===null?this.emit(`hitSparks`,e.position,{scale:t,color:16769162}):this.emit(`hitSparks`,e.position,{scale:t*.6,color:16777215})})),e.push(q.on(`item:pickup`,e=>this.emit(`itemBoxBurst`,e.position))),e.push(q.on(`race:finish`,e=>{if(!e.isPlayer||(this.playerPodiumPlace=e.place<=3?e.place:0,e.place>3))return;let t=this.kartById(e.kartId);t&&(this.tmp.copy(t.state.position),this.tmp.y+=2.5,this.emit(`confetti`,this.tmp,{scale:e.place===1?1.4:1}),this.emit(`lapFlash`,t.state.position))})),e.push(q.on(`game:stateChange`,e=>{e.to===`results`&&this.playerPodiumPlace>0?(this.confettiScale=this.playerPodiumPlace===1?1.4:this.playerPodiumPlace===2?1.1:.85,this.confettiTimer=this.playerPodiumPlace===1?6:4,this.accConfetti=0):e.to!==`results`&&e.to!==`finished`&&(this.confettiTimer=0,this.playerPodiumPlace=0)})),e.push(q.on(`item:lightning`,e=>{for(let t of this.karts){let n=t.state;n.id===e.sourceKartId||n.isInvincible||this.emit(`lightningStrike`,n.position)}})),e.push(q.on(`kart:boost`,e=>{let t=this.slot(e.kartId);this.boostSource[t]=ly(e.source);let n=this.kartById(e.kartId);if(!n)return;let r=e.source===`mushroom`||e.source===`golden`?16751150:e.source===`pad`?4125439:10475775;this.tmp.copy(n.state.position),this.tmp.y+=.4,this.emit(`boostRing`,this.tmp,{color:r,scale:.6+Y(e.strength)*.8})})),e.push(q.on(`kart:shrink`,e=>{let t=this.kartById(e.kartId);t&&this.shrinkPuff(t.state.position)})),e.push(q.on(`kart:unshrink`,e=>{let t=this.kartById(e.kartId);t&&this.shrinkPuff(t.state.position)})),e.push(q.on(`kart:squish`,e=>{let t=this.kartById(e.kartId);t&&this.emit(`landPuff`,t.state.position,{scale:1.3})})),e.push(q.on(`race:lap`,e=>{if(!e.isPlayer)return;let t=this.kartById(e.kartId);t&&(this.tmp.copy(t.state.position),this.tmp.y+=1.2,this.emit(`lapFlash`,this.tmp,{scale:e.isFinalLap?1.4:1}))}))}slot(e){return e>=0&&e<Gv?e:(e%Gv+Gv)%Gv}kartById(e){let t=this.karts;if(e>=0&&e<t.length&&t[e].state.id===e)return t[e];for(let n=0;n<t.length;n++)if(t[n].state.id===e)return t[n];return null}update(e,t,n){this.karts=t,e=Math.min(Math.max(e,0),.1),this.time+=e;let r=this.time;this.additive.setTime(r),this.alpha.setTime(r);let i=n.matrixWorld.elements;this.camPos.set(i[12],i[13],i[14]),this.camFwd.set(-i[8],-i[9],-i[10]).normalize(),this.camUp.set(i[4],i[5],i[6]).normalize(),this.camRight.set(i[0],i[1],i[2]).normalize();for(let n=0;n<t.length;n++){let i=t[n].state;i.finished&&!i.isBoosting&&!i.isDrifting||(this.updateKartEmitters(e,i,r),i.isPlayer&&i.isBoosting&&i.boostStrength>=.35&&Math.abs(i.speed)>24.64?this.updateSpeedStreaks(e,r):i.isPlayer&&(this.accStreak=0))}this.confettiTimer>0&&this.updateResultsConfetti(e,r),this.additive.flush(),this.alpha.flush()}updateKartEmitters(e,t,n){let r=this.slot(t.id),i=t.position,a=t.heading,o=-Math.sin(a),s=-Math.cos(a),c=Math.cos(a),l=-Math.sin(a),u=Math.abs(t.speed),d=t.isShrunk?.6:1;if(t.isDrifting&&!t.isAirborne){let a=t.driftStage,f=a===0?40:110+a*20,p=this.take(this.accDrift,r,f,e),m=Yv(dy[a]);for(let e=0;e<p;e++){let t=e%2==0?1:-1,r=i.x-o*.7+c*.55*t,f=i.z-s*.7+l*.55*t;Z.x=r+Q(-.06,.06),Z.y=i.y+.08+Q(0,.06),Z.z=f+Q(-.06,.06);let p=Q(2.5,5.5)+u*.15;Z.vx=-o*p+c*t*Q(.5,2.5)+Q(-.6,.6),Z.vy=Q(.8,2.8),Z.vz=-s*p+l*t*Q(.5,2.5)+Q(-.6,.6),Z.life=a===0?Q(.15,.3):Q(.25,.45),Z.size0=(a===0?.12:.2+a*.03)*d,Z.size1=.03,$v(m,a===0?1.6:2.2),ey(m,.8),Z.a0=1,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=.9,Z.atlas=Nv,Z.align=1,Z.drag=1.5,this.additive.spawn(Z,n)}let h=this.take(this.accSmoke,r,24,e);for(let e=0;e<h;e++){let t=e%2==0?1:-1;Z.x=i.x-o*.75+c*.55*t+Q(-.08,.08),Z.y=i.y+.12,Z.z=i.z-s*.75+l*.55*t+Q(-.08,.08),Z.vx=-o*Q(.8,2)+c*t*Q(.2,.9)+Q(-.25,.25),Z.vy=Q(.12,.4),Z.vz=-s*Q(.8,2)+l*t*Q(.2,.9)+Q(-.25,.25),Z.life=Q(.55,.9),Z.size0=.3*d,Z.size1=.95*d,Z.r0=.66,Z.g0=.66,Z.b0=.68,Z.r1=.52,Z.g1=.52,Z.b1=.54,Z.a0=.34,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-1.2,1.2),Z.gravity=0,Z.atlas=Pv,Z.align=0,Z.drag=2.2,this.alpha.spawn(Z,n)}}else this.accDrift[r]=0,this.accSmoke[r]=0;if(t.isBoosting){let a=this.take(this.accFlame,r,72,e),u=this.boostSource[r];for(let e=0;e<a;e++){let r=e%2==0?1:-1;Z.x=i.x-o*.9+c*.25*r+Q(-.025,.025),Z.y=i.y+.42*d+Q(-.025,.025),Z.z=i.z-s*.9+l*.25*r+Q(-.025,.025);let a=Q(4,7);Z.vx=t.velocity.x*.8-o*a+Q(-.3,.3),Z.vy=Q(-.1,.5),Z.vz=t.velocity.z*.8-s*a+Q(-.3,.3),Z.life=Q(.09,.18),Z.size0=.24*d,Z.size1=.05,u===sy?(Z.r0=1.5,Z.g0=.72,Z.b0=.2,Z.r1=.9,Z.g1=.2,Z.b1=.02):u===cy?(Z.r0=.45,Z.g0=1.2,Z.b0=1.5,Z.r1=.08,Z.g1=.5,Z.b1=.9):(Z.r0=.7,Z.g0=.95,Z.b0=1.5,Z.r1=.2,Z.g1=.4,Z.b1=1.1),Z.a0=.7,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=-.03,Z.atlas=e%3==0?Mv:Bv,Z.align=1,Z.drag=4,this.additive.spawn(Z,n)}}else this.accFlame[r]=0;if(t.surface===`offroad`&&u>5&&!t.isAirborne){let t=this.take(this.accDust,r,18+u*1.4,e);for(let e=0;e<t;e++){let t=e%2==0?1:-1;Z.x=i.x-o*Q(.3,.8)+c*.5*t+Q(-.2,.2),Z.y=i.y+.1,Z.z=i.z-s*Q(.3,.8)+l*.5*t+Q(-.2,.2),Z.vx=-o*Q(1,3)+c*t*Q(.5,2)+Q(-.5,.5),Z.vy=Q(.8,2.2),Z.vz=-s*Q(1,3)+l*t*Q(.5,2)+Q(-.5,.5),Z.life=Q(.6,1.1),Z.size0=.45,Z.size1=1.6,Z.r0=.55,Z.g0=.45,Z.b0=.3,Z.r1=.45,Z.g1=.38,Z.b1=.26,Z.a0=.42,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-1,1),Z.gravity=.02,Z.atlas=Pv,Z.align=0,Z.drag=2.2,this.alpha.spawn(Z,n)}}else this.accDust[r]=0;if(t.isInvincible){let a=this.take(this.accStar,r,70,e);for(let e=0;e<a;e++){let r=Q(0,J),a=Q(.5,1.1)*d;Z.x=i.x+Math.cos(r)*a,Z.y=i.y+Q(.1,1.1)*d,Z.z=i.z+Math.sin(r)*a,Z.vx=Math.cos(r)*Q(.3,1.2)+t.velocity.x*.35,Z.vy=Q(1,2.5),Z.vz=Math.sin(r)*Q(.3,1.2)+t.velocity.z*.35,Z.life=Q(.4,.8),Z.size0=Q(.24,.4),Z.size1=.03;let o=Qv(n*.9+e*.13,1,.6);Z.r0=o.r*2.2,Z.g0=o.g*2.2,Z.b0=o.b*2.2,Z.r1=1.5,Z.g1=1.5,Z.b1=1.5,Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-3,3),Z.gravity=-.08,Z.atlas=Fv,Z.align=0,Z.drag=1.5,this.additive.spawn(Z,n)}}else this.accStar[r]=0}updateSpeedStreaks(e,t){this.accStreak+=38*e;let n=Math.floor(this.accStreak);this.accStreak-=n,n>Kv&&(n=Kv);let r=this.camPos,i=this.camFwd,a=this.camRight,o=this.camUp;for(let e=0;e<n;e++){let e=Q(8,16),n=Q(0,J),s=Q(3.2,7.5),c=Math.cos(n)*s*1.6,l=Math.sin(n)*s;Z.x=r.x+i.x*e+a.x*c+o.x*l,Z.y=r.y+i.y*e+a.y*c+o.y*l,Z.z=r.z+i.z*e+a.z*c+o.z*l;let u=Q(36,52);Z.vx=-i.x*u,Z.vy=-i.y*u,Z.vz=-i.z*u,Z.life=Q(.14,.22),Z.size0=.26,Z.size1=.12,Z.r0=.85,Z.g0=.9,Z.b0=1,Z.r1=.6,Z.g1=.65,Z.b1=.8,Z.a0=.16,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=0,Z.atlas=Nv,Z.align=1,Z.drag=0,this.additive.spawn(Z,t)}}updateResultsConfetti(e,t){this.confettiTimer-=e;let n=this.confettiScale;this.accConfetti+=55*n*e;let r=Math.floor(this.accConfetti);this.accConfetti-=r,r>Kv&&(r=Kv);let i=this.camPos,a=this.camFwd,o=this.camRight,s=this.camUp;for(let e=0;e<r;e++){let n=Q(4,9),r=Q(-1,1)*n*.9,c=Q(2.5,4.5);Z.x=i.x+a.x*n+o.x*r+s.x*c,Z.y=i.y+a.y*n+o.y*r+s.y*c,Z.z=i.z+a.z*n+o.z*r+s.z*c,Z.vx=Q(-.8,.8),Z.vy=Q(-.6,.2),Z.vz=Q(-.8,.8),Z.life=Q(2.2,3.4),Z.size0=Q(.12,.2),Z.size1=Z.size0;let l=Yv(uy[e%uy.length]);$v(l,1.1),ey(l,.9),Z.a0=1,Z.a1=1,Z.rot=Q(0,J),Z.rotSpeed=Q(-6,6),Z.gravity=.09,Z.atlas=e%5==0?zv:Iv,Z.align=0,Z.drag=1.6,this.alpha.spawn(Z,t)}}take(e,t,n,r){e[t]+=n*r;let i=Math.floor(e[t]);return e[t]-=i,i>Kv&&(i=Kv),i}emit(e,t,n){let r=this.time,i=n?.scale??1,a=n?.color,o=n?.direction??null,s=t.x,c=t.y,l=t.z;switch(e){case`explosion`:this.explosion(s,c,l,i,r);break;case`hitSparks`:this.hitSparks(s,c,l,i,a??16765562,o,r);break;case`itemBoxBurst`:this.itemBoxBurst(s,c,l,i,r);break;case`confetti`:this.confetti(s,c,l,i,r);break;case`dust`:this.dust(s,c,l,i,a??13218954,r);break;case`boostRing`:this.boostRing(s,c,l,i,a??6743807,r);break;case`starSparkle`:this.starSparkle(s,c,l,i,r);break;case`lightningStrike`:this.lightningStrike(s,c,l,i,r);break;case`shellBreak`:this.shellBreak(s,c,l,i,a??4054148,r);break;case`bananaSplat`:this.bananaSplat(s,c,l,i,r);break;case`waterSplash`:this.waterSplash(s,c,l,i,r);break;case`lapFlash`:this.lapFlash(s,c,l,i,a??16777215,r);break;case`landPuff`:this.landPuff(s,c,l,i,r)}}ring(e,t,n,r,i,a,o,s,c){Z.x=e,Z.y=t,Z.z=n,Z.vx=0,Z.vy=0,Z.vz=0,Z.life=a,Z.size0=r,Z.size1=i,$v(o,s),ey(o,s*.6),Z.a0=.9,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=0,Z.atlas=Lv,Z.align=0,Z.drag=0,this.additive.spawn(Z,c)}flashSprite(e,t,n,r,i,a,o,s,c,l){Z.x=e,Z.y=t,Z.z=n,Z.vx=0,Z.vy=0,Z.vz=0,Z.life=a,Z.size0=r,Z.size1=i,Z.r0=o,Z.g0=s,Z.b0=c,Z.r1=o*.5,Z.g1=s*.5,Z.b1=c*.5,Z.a0=1,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=0,Z.atlas=Mv,Z.align=0,Z.drag=0,this.additive.spawn(Z,l)}explosion(e,t,n,r,i){for(let a=0;a<18;a++)ny(e,t+.3*r,n,.25*r),ty(Q(1.5,4.5)*r,1.2*r),Z.life=Q(.3,.55),Z.size0=Q(.9,1.4)*r,Z.size1=Q(1.6,2.3)*r,Z.r0=1.9,Z.g0=1.35,Z.b0=.5,Z.r1=1.1,Z.g1=.25,Z.b1=.03,Z.a0=.8,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-2,2),Z.gravity=-.1,Z.atlas=Pv,Z.align=0,Z.drag=3,this.additive.spawn(Z,i);for(let a=0;a<40;a++)ny(e,t+.3*r,n,.15*r),ty(Q(6,15)*r,2*r),Z.life=Q(.4,.9),Z.size0=.3*r,Z.size1=.06*r,Z.r0=2.2,Z.g0=1.8,Z.b0=.9,Z.r1=1.5,Z.g1=.5,Z.b1=.08,Z.a0=1,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=1,Z.atlas=Nv,Z.align=1,Z.drag=.8,this.additive.spawn(Z,i);for(let a=0;a<24;a++)ny(e,t+.4*r,n,.4*r),ty(Q(.6,2.2)*r,Q(1.2,3)*r),Z.life=Q(1.05,1.4),Z.size0=Q(.9,1.4)*r,Z.size1=Q(2.4,3.4)*r,Z.r0=.3,Z.g0=.27,Z.b0=.25,Z.r1=.1,Z.g1=.1,Z.b1=.1,Z.a0=.62,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-1.2,1.2),Z.gravity=-.1,Z.atlas=Pv,Z.align=0,Z.drag=1.8,this.alpha.spawn(Z,i);this.ring(e,t+.35*r,n,1*r,11*r,.5,Yv(16761722),1.6,i),this.ring(e,t+.35*r,n,.6*r,7*r,.28,Yv(16777215),1.2,i),this.flashSprite(e,t+.5*r,n,2.6*r,5.5*r,.16,1.9,1.7,1.4,i)}hitSparks(e,t,n,r,i,a,o){let s=Yv(i),c=Math.round(22*r);for(let i=0;i<c;i++)ny(e,t,n,.1),ty(Q(3.5,8)*r,1.5),a&&(Z.vx+=a.x*5*r,Z.vy+=a.y*5*r,Z.vz+=a.z*5*r),Z.life=Q(.25,.6),Z.size0=.26*r,Z.size1=.04,$v(s,2.2),ey(s,1.2),Z.a0=1,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=1,Z.atlas=Nv,Z.align=1,Z.drag=1,this.additive.spawn(Z,o);this.flashSprite(e,t,n,.8*r,1.6*r,.14,s.r*2.2,s.g*2.2,s.b*2.2,o)}itemBoxBurst(e,t,n,r,i){for(let a=0;a<36;a++){ny(e,t,n,.25),ty(Q(3,7.5)*r,2.5),Z.life=Q(.32,.6),Z.size0=Q(.22,.36)*r,Z.size1=.06;let o=Qv(a/36,1,.55);Z.r0=o.r*1.8,Z.g0=o.g*1.8,Z.b0=o.b*1.8,Z.r1=o.r,Z.g1=o.g,Z.b1=o.b,Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-9,9),Z.gravity=.9,Z.atlas=a%3==0?Iv:Vv,Z.align=0,Z.drag=1.4,this.additive.spawn(Z,i)}for(let a=0;a<8;a++)ny(e,t,n,.4),ty(Q(.5,1.5),.8),Z.life=Q(.22,.4),Z.size0=.32*r,Z.size1=.02,Z.r0=1.8,Z.g0=1.8,Z.b0=2,Z.r1=1,Z.g1=1,Z.b1=1.5,Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-3,3),Z.gravity=-.1,Z.atlas=Fv,Z.align=0,Z.drag=1,this.additive.spawn(Z,i);this.ring(e,t,n,.5*r,4*r,.3,Yv(16777215),1.4,i)}confetti(e,t,n,r,i){let a=Math.round(150*r);for(let o=0;o<a;o++){ny(e,t,n,.6*r);let a=Q(0,J),s=Q(1,4.5)*r;Z.vx=Math.cos(a)*s,Z.vz=Math.sin(a)*s,Z.vy=Q(4,9.5)*r,Z.life=Q(2.8,4.8),Z.size0=Q(.14,.22),Z.size1=Z.size0;let c=Yv(uy[o%uy.length]);$v(c,1.1),ey(c,.9),Z.a0=1,Z.a1=1,Z.rot=Q(0,J),Z.rotSpeed=Q(-5,5),Z.gravity=.16,Z.atlas=o%5==0?zv:Iv,Z.align=0,Z.drag=1.3,this.alpha.spawn(Z,i)}}dust(e,t,n,r,i,a){let o=Yv(i),s=Math.round(10*r);for(let i=0;i<s;i++)ny(e,t+.1,n,.2*r),ty(Q(.4,1.6)*r,Q(.4,1.2)),Z.life=Q(.6,1.1),Z.size0=.5*r,Z.size1=1.7*r,$v(o,.8),ey(o,.65),Z.a0=.45,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-1,1),Z.gravity=-.02,Z.atlas=Pv,Z.align=0,Z.drag=2,this.alpha.spawn(Z,a)}boostRing(e,t,n,r,i,a){let o=Yv(i);this.ring(e,t,n,.8*r,3.6*r,.35,o,1.8,a);for(let i=0;i<12;i++){let s=i/12*J;Z.x=e,Z.y=t,Z.z=n,Z.vx=Math.cos(s)*5*r,Z.vy=Q(.5,1.5),Z.vz=Math.sin(s)*5*r,Z.life=.35,Z.size0=.25*r,Z.size1=.04,$v(o,2.2),ey(o,1),Z.a0=1,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=.2,Z.atlas=Nv,Z.align=1,Z.drag=2,this.additive.spawn(Z,a)}}starSparkle(e,t,n,r,i){let a=Math.round(14*r);for(let o=0;o<a;o++){ny(e,t,n,.6*r),ty(Q(.8,2.4),1.2),Z.life=Q(.4,.8),Z.size0=Q(.2,.34)*r,Z.size1=0;let a=Qv(Math.random(),1,.6);Z.r0=a.r*2.2,Z.g0=a.g*2.2,Z.b0=a.b*2.2,Z.r1=1.6,Z.g1=1.6,Z.b1=1.6,Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-3,3),Z.gravity=-.1,Z.atlas=Fv,Z.align=0,Z.drag=1.5,this.additive.spawn(Z,i)}}lightningStrike(e,t,n,r,i){let a=2.3*r,o=e,s=n;for(let e=0;e<7;e++){let n=t+.8+e*a*.92;Z.x=o,Z.y=n,Z.z=s,Z.vx=0,Z.vy=0,Z.vz=0,Z.life=.22+e*.01,Z.size0=a*1.1,Z.size1=a*.9,Z.r0=2.2,Z.g0=2.6,Z.b0=3.2,Z.r1=.8,Z.g1=1,Z.b1=2.2,Z.a0=1,Z.a1=0,Z.rot=Q(-.25,.25),Z.rotSpeed=0,Z.gravity=0,Z.atlas=Rv,Z.align=0,Z.drag=0,this.additive.spawn(Z,i),o+=Q(-.35,.35),s+=Q(-.35,.35)}for(let a=0;a<3;a++)this.flashSprite(e,t+.6+a*.5,n,2.5*r,5*r,.16+a*.03,1.8,2.2,3,i);for(let r=0;r<26;r++)ny(e,t+.4,n,.2),ty(Q(3,8),3),Z.life=Q(.3,.6),Z.size0=.24,Z.size1=.03,Z.r0=2,Z.g0=2.4,Z.b0=3.2,Z.r1=.6,Z.g1=.8,Z.b1=2,Z.a0=1,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=.9,Z.atlas=Nv,Z.align=1,Z.drag=1,this.additive.spawn(Z,i);this.ring(e,t+.2,n,.5,5*r,.35,Yv(12575999),2,i)}shellBreak(e,t,n,r,i,a){let o=Yv(i);for(let i=0;i<18;i++)ny(e,t+.1,n,.15),ty(Q(3,7)*r,3),Z.life=Q(.4,.7),Z.size0=Q(.22,.34),Z.size1=.12,$v(o,1.1),ey(o,.55),Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-10,10),Z.gravity=1.1,Z.atlas=i%2==0?Vv:zv,Z.align=0,Z.drag=.6,this.alpha.spawn(Z,a);this.hitSparks(e,t,n,.6*r,16777215,null,a)}bananaSplat(e,t,n,r,i){let a=Yv(16769333);for(let o=0;o<14;o++)ny(e,t+.1,n,.12),ty(Q(1,3.2)*r,2.2),Z.life=Q(.45,.8),Z.size0=Q(.16,.26),Z.size1=Q(.25,.4),$v(a,1),ey(a,.75),Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-4,4),Z.gravity=1.2,Z.atlas=o%3==0?zv:Hv,Z.align=0,Z.drag=.8,this.alpha.spawn(Z,i);this.dust(e,t,n,.6*r,13218954,i)}waterSplash(e,t,n,r,i){for(let a=0;a<30;a++){ny(e,t,n,.2*r);let a=Q(0,J),o=Q(.8,2.8)*r;Z.vx=Math.cos(a)*o,Z.vz=Math.sin(a)*o,Z.vy=Q(3,7)*r,Z.life=Q(.5,.9),Z.size0=.16*r,Z.size1=.05,Z.r0=1,Z.g0=1.5,Z.b0=1.9,Z.r1=.6,Z.g1=.9,Z.b1=1.3,Z.a0=.9,Z.a1=0,Z.rot=0,Z.rotSpeed=0,Z.gravity=1,Z.atlas=Hv,Z.align=0,Z.drag=.4,this.additive.spawn(Z,i)}for(let a=0;a<8;a++)ny(e,t+.2,n,.3*r),ty(Q(.3,1.2),1),Z.life=Q(.6,1),Z.size0=.6*r,Z.size1=1.6*r,Z.r0=.85,Z.g0=.9,Z.b0=.95,Z.r1=.8,Z.g1=.85,Z.b1=.9,Z.a0=.4,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-1,1),Z.gravity=-.05,Z.atlas=Pv,Z.align=0,Z.drag=2,this.alpha.spawn(Z,i)}lapFlash(e,t,n,r,i,a){let o=Yv(i);this.ring(e,t,n,.6*r,6.5*r,.45,o,2,a);for(let i=0;i<22;i++){let o=i/22*J;Z.x=e,Z.y=t,Z.z=n,Z.vx=Math.cos(o)*Q(3,5)*r,Z.vy=Q(1.5,4),Z.vz=Math.sin(o)*Q(3,5)*r,Z.life=Q(.5,.9),Z.size0=.3*r,Z.size1=.02;let s=Qv(i/22,1,.6);Z.r0=s.r*2.2,Z.g0=s.g*2.2,Z.b0=s.b*2.2,Z.r1=1.5,Z.g1=1.5,Z.b1=1.5,Z.a0=1,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-4,4),Z.gravity=.3,Z.atlas=Fv,Z.align=0,Z.drag=1.2,this.additive.spawn(Z,a)}}landPuff(e,t,n,r,i){let a=Math.round(10*r);for(let o=0;o<a;o++){let a=Q(0,J);Z.x=e+Math.cos(a)*.4,Z.y=t+.08,Z.z=n+Math.sin(a)*.4;let o=Q(1.2,3)*r;Z.vx=Math.cos(a)*o,Z.vy=Q(.3,.9),Z.vz=Math.sin(a)*o,Z.life=Q(.45,.8),Z.size0=.4*r,Z.size1=1.4*r,Z.r0=.6,Z.g0=.58,Z.b0=.52,Z.r1=.5,Z.g1=.48,Z.b1=.44,Z.a0=.45,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-1.5,1.5),Z.gravity=0,Z.atlas=Pv,Z.align=0,Z.drag=2.5,this.alpha.spawn(Z,i)}}shrinkPuff(e){let t=this.time;for(let n=0;n<16;n++)ny(e.x,e.y+.5,e.z,.4),ty(Q(.8,2.2),.8),Z.life=Q(.5,.9),Z.size0=.5,Z.size1=1.3,Z.r0=.9,Z.g0=.9,Z.b0=1,Z.r1=.7,Z.g1=.7,Z.b1=.8,Z.a0=.5,Z.a1=0,Z.rot=Q(0,J),Z.rotSpeed=Q(-2,2),Z.gravity=-.05,Z.atlas=Pv,Z.align=0,Z.drag=2,this.alpha.spawn(Z,t);this.starSparkle(e.x,e.y+.5,e.z,.8,t)}reset(){this.additive.clear(),this.alpha.clear(),this.accDrift.fill(0),this.accFlame.fill(0),this.accSmoke.fill(0),this.accDust.fill(0),this.accStar.fill(0),this.boostSource.fill(ay),this.accStreak=0,this.confettiTimer=0,this.accConfetti=0,this.playerPodiumPlace=0}dispose(){for(let e of this.unsubs)e();this.unsubs.length=0,this.additive.dispose(),this.alpha.dispose(),this.atlas.dispose(),this.object.removeFromParent(),this.karts=[]}};function py(e){return e.startsWith(`red`)?16726832:e.startsWith(`blue`)?3832831:e===`bob_omb`?2236979:4054148}var my={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},hy=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},gy=new cs(-1,1,1,-1,0,1),_y=new class extends Rr{constructor(){super(),this.setAttribute(`position`,new Er([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Er([0,2,0,0,2,0],2))}},vy=class{constructor(e){this._mesh=new H(_y,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,gy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},yy=class extends hy{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof wo?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=xo.clone(e.uniforms),this.material=new wo({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new vy(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},by=class extends hy{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},xy=class extends hy{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Sy=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new z);this._width=n.width,this._height=n.height,t=new rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:x}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new yy(my),this.copyPass.material.blending=0,this.timer=new hs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}by!==void 0&&(r instanceof by?n=!0:r instanceof xy&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new z);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Cy=class extends hy{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new V}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},wy={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new V(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Ty=class e extends hy{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new z(256,256):new z(e.x,e.y),this.clearColor=new V(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new rn(i,a,{type:x}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new rn(i,a,{type:x});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new rn(i,a,{type:x});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=wy;this.highPassUniforms=xo.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wo({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new z(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xo.clone(my.uniforms),this.blendMaterial=new wo({uniforms:this.copyUniforms,vertexShader:my.vertexShader,fragmentShader:my.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new V,this._oldClearAlpha=1,this._basic=new Yr,this._fsQuad=new vy(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new z(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new wo({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new z(.5,.5)},direction:{value:new z(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new wo({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Ty.BlurDirectionX=new z(1,0),Ty.BlurDirectionY=new z(0,1);var Ey={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Dy=class extends hy{constructor(){super(),this.isOutputPass=!0,this.uniforms=xo.clone(Ey.uniforms),this.material=new To({name:Ey.name,uniforms:this.uniforms,vertexShader:Ey.vertexShader,fragmentShader:Ey.fragmentShader}),this._fsQuad=new vy(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Wt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Oy=.35,ky=.35,Ay=.9,jy=.6,My=.012,Ny=.008,Py=class{renderer=null;scene=null;camera=null;composer=null;renderPass=null;bloomPass=null;compositePass=null;outputPass=null;enabled=!0;failed=!1;speedTarget=0;boostTarget=0;hitTarget=0;speed=0;boost=0;hit=0;hitPulse=0;flashLevel=0;flashDuration=0;flashPeak=0;time=0;width=1;height=1;pixelRatio=1;flashColor=new V(1,1,1);unsubs=[];constructor(){this.unsubs.push(q.on(`item:lightning`,()=>this.flash(13625087,.5))),this.unsubs.push(q.on(`item:hit`,e=>{e.isPlayer&&(this.hitPulse=1)})),this.unsubs.push(q.on(`kart:spin`,e=>{e.kartId===0&&(this.hitPulse=Math.max(this.hitPulse,.8))}))}init(e,t,n){this.disposePipeline(),this.renderer=e,this.scene=t,this.camera=n,this.failed=!1;let r=e.getSize(new z);this.width=Math.max(1,r.x),this.height=Math.max(1,r.y),this.pixelRatio=e.getPixelRatio();try{let r=Math.max(1,Math.floor(this.width*this.pixelRatio)),i=Math.max(1,Math.floor(this.height*this.pixelRatio)),a=new Sy(e,new rn(r,i,{type:x,samples:0,depthBuffer:!0,stencilBuffer:!1}));a.setPixelRatio(this.pixelRatio),a.setSize(this.width,this.height);let o=new Cy(t,n),s=new Ty(new z(r,i),Oy,ky,Ay),c=new yy({uniforms:{tDiffuse:{value:null},uResolution:{value:new z(r,i)},uTime:{value:0},uSpeed:{value:0},uBoost:{value:0},uHit:{value:0},uFlash:{value:0},uFlashColor:{value:new V(1,1,1)},uGrain:{value:My}},vertexShader:Av,fragmentShader:jv}),l=new Dy;a.addPass(o),a.addPass(s),a.addPass(c),a.addPass(l),this.composer=a,this.renderPass=o,this.bloomPass=s,this.compositePass=c,this.outputPass=l}catch(e){console.warn(`[PostFX] failed to build pipeline, falling back to plain rendering`,e),this.failed=!0,this.disposePipeline()}}setCamera(e){this.camera=e,this.renderPass&&(this.renderPass.camera=e)}render(e){let t=this.renderer,n=this.scene,r=this.camera;if(!t||!n||!r)return;if(e=Math.min(Math.max(e,0),.1),this.time+=e,this.speed=$u(this.speed,this.speedTarget,6,e),this.boost=$u(this.boost,this.boostTarget,this.boostTarget>this.boost?10:4,e),this.hitPulse>0&&(this.hitPulse=Math.max(0,this.hitPulse-e/jy)),this.hit=$u(this.hit,Math.max(this.hitTarget,this.hitPulse),12,e),this.flashLevel=this.flashLevel>0&&this.flashDuration>0?Math.max(0,this.flashLevel-e/this.flashDuration):0,!this.enabled||this.failed||!this.composer||!this.compositePass){t.render(n,r);return}let i=this.compositePass.uniforms;i.uTime.value=this.time,i.uSpeed.value=this.speed,i.uBoost.value=this.boost,i.uHit.value=this.hit,i.uGrain.value=My+Ny*this.boost;let a=this.flashLevel;i.uFlash.value=this.flashPeak*a*a,i.uFlashColor.value.copy(this.flashColor);try{this.composer.render(e)}catch(e){console.warn(`[PostFX] composer render failed, disabling post-processing`,e),this.failed=!0,t.render(n,r)}}setSize(e,t,n){this.width=Math.max(1,e),this.height=Math.max(1,t),this.pixelRatio=Math.max(.5,n),this.composer&&(this.composer.setPixelRatio(this.pixelRatio),this.composer.setSize(this.width,this.height)),this.compositePass&&this.compositePass.uniforms.uResolution.value.set(Math.max(1,Math.floor(this.width*this.pixelRatio)),Math.max(1,Math.floor(this.height*this.pixelRatio)))}setSpeedEffect(e){this.speedTarget=Y(e)}setBoostEffect(e){this.boostTarget=Y(e)}setHitEffect(e){this.hitTarget=Y(e)}flash(e,t){this.flashColor.setHex(e),this.flashDuration=Math.max(.05,t),this.flashLevel=1,this.flashPeak=.9}setEnabled(e){this.enabled=e}disposePipeline(){this.bloomPass?.dispose(),this.compositePass?.dispose(),this.outputPass?.dispose(),this.renderPass?.dispose(),this.composer?.dispose(),this.composer=null,this.renderPass=null,this.bloomPass=null,this.compositePass=null,this.outputPass=null}dispose(){for(let e of this.unsubs)e();this.unsubs.length=0,this.disposePipeline(),this.renderer=null,this.scene=null,this.camera=null}},Fy=7,Iy=3,Ly=.6,Ry=1.2,zy=2.6,By=1.2,Vy=-1,Hy=1.5,Uy=6,Wy=.5,Gy=.6,Ky=.3,qy=12,Jy=1.9;function Yy(){return{position:new B,tangent:new B(0,0,-1),normal:new B(0,1,0),binormal:new B(1,0,0),halfWidth:0,wallHalfWidth:0,t:0}}var Xy=class{track;karts;totalLaps;difficulty;phase=`grid`;time=0;countdownTimer=0;countdownEmitted=0;finishedCount=0;playerFinishedAt=-1;allFinishedEmitted=!1;trackers=[];order=[];checkpointT=[];sample=Yy();tmpPos=new B;tmpQuat=new It;tmpEuler=new _n;playerTracker;constructor(e,t,n){this.track=e,this.karts=t,this.totalLaps=Math.max(1,Math.floor(n.laps)),this.difficulty=n.difficulty;let r=e.checkpoints;if(r.length>=2)for(let e of r)this.checkpointT.push(nd(e.t));else for(let e=0;e<12;e++)this.checkpointT.push(e/12);let i=id(24301+this.totalLaps*7),a=n.difficulty===`hard`?.75:n.difficulty===`normal`?.5:.3;for(let e of t){let t={kart:e,nextCheckpoint:0,started:!1,lapsCompleted:-1,wrongWayTimer:0,voidTimer:0,stuckTimer:0,respawnFreeze:0,emittedPlace:0,candidatePlace:0,candidateTimer:0,throttleStreak:0,aiStartBoost:!e.state.isPlayer&&i()<a,respawnCount:0};this.trackers.push(t),this.order.push(t)}this.playerTracker=this.trackers.find(e=>e.kart.state.isPlayer)??null,this.placeOnGrid(),this.sortOrder();for(let e=0;e<this.order.length;e++){let t=this.order[e];t.kart.state.place=e+1,t.emittedPlace=e+1,t.candidatePlace=e+1}}get raceTime(){return this.time}get currentPhase(){return this.phase}get started(){return this.phase===`racing`||this.phase===`complete`}get allFinished(){return this.allFinishedEmitted}startCountdown(){if(this.phase===`grid`){this.phase=`countdown`,this.countdownTimer=0,this.countdownEmitted=0;for(let e of this.trackers)e.kart.setFrozen(!0)}}update(e){switch(this.phase){case`grid`:return;case`countdown`:this.updateCountdown(e);return;case`racing`:case`complete`:this.updateRacing(e);return}}getStandings(){let e=[];for(let t of this.order){let n=t.kart.state;e.push({kartId:n.id,name:n.character.name,color:n.character.color,place:n.place,finishTime:n.finished?n.finishTime:-1,isPlayer:n.isPlayer})}return e.sort((e,t)=>e.place-t.place),e}dispose(){this.trackers.length=0,this.order.length=0}placeOnGrid(){let e=this.track.startGrid;if(e.length===0)return;let t=0;for(let n of this.trackers){let r=n.kart.state,i;r.isPlayer?i=Math.min(Fy,e.length-1):(t===Math.min(Fy,e.length-1)&&t++,i=t%e.length,t++);let a=e[i];n.kart.resetTo(a.position,a.quaternion),n.kart.setFrozen(!0),r.trackT=nd(a.t),r.lap=1,r.checkpointIndex=0,r.finished=!1,r.finishTime=0,r.wrongWay=!1,rd(0,r.trackT)>=0&&rd(0,r.trackT)<.25&&(n.started=!0,n.lapsCompleted=0,n.nextCheckpoint=1,r.checkpointIndex=1),r.raceProgress=this.computeProgress(n)}}updateCountdown(e){if(this.playerTracker){let t=this.playerTracker.kart.input.throttle;this.playerTracker.throttleStreak=t>.5?this.playerTracker.throttleStreak+e:0}this.countdownTimer+=e;let t=Iy*1;for(;this.countdownEmitted<Iy&&this.countdownTimer>=this.countdownEmitted*1;)q.emit(`race:countdown`,{count:Iy-this.countdownEmitted}),this.countdownEmitted++;this.countdownTimer>=t&&this.go()}go(){this.phase=`racing`,this.time=0;for(let e of this.trackers)e.kart.setFrozen(!1),e.stuckTimer=0;q.emit(`race:start`,{trackId:this.track.def.id});let e=this.playerTracker;if(e){let t=e.throttleStreak;t>=zy?e.kart.applyHit(`collision`,-1):t>.02&&t<=Ly?e.kart.applyBoost(.4,1,`start`):t>Ly&&t<=Ry&&e.kart.applyBoost(.2,.6,`start`)}for(let e of this.trackers)e.aiStartBoost&&e.kart.applyBoost(.3,.8,`start`)}updateRacing(e){this.time+=e;for(let t of this.trackers)this.updateTracker(t,e);this.sortOrder(),this.updatePlaces(e),this.phase===`racing`&&this.playerFinishedAt>=0&&!this.allFinishedEmitted&&(this.finishedCount>=this.trackers.length||this.time-this.playerFinishedAt>=qy)&&(this.forceFinishRemaining(),this.phase=`complete`,this.allFinishedEmitted=!0,q.emit(`race:allFinished`,{}))}updateTracker(e,t){let n=e.kart,r=n.state;if(e.respawnFreeze>0){e.respawnFreeze-=t,e.respawnFreeze<=0&&(e.respawnFreeze=0,n.setFrozen(!1));return}let i=nd(r.trackT);if(!r.finished){let t=this.checkpointT.length;for(let n=0;n<2;n++){let n=this.checkpointT[e.nextCheckpoint],a=rd(n,i);if(a<0||a>=Jy/t||(this.passCheckpoint(e),r.finished))break}}let a=this.computeProgress(e);if(a>r.raceProgress&&(r.raceProgress=a),r.finished)r.wrongWay&&(r.wrongWay=!1,q.emit(`race:wrongWay`,{kartId:r.id,wrongWay:!1}));else{let n=this.track.sample(i,this.sample),a=r.velocity.x*n.tangent.x+r.velocity.y*n.tangent.y+r.velocity.z*n.tangent.z;a<Vy?(e.wrongWayTimer+=t,e.wrongWayTimer>=By&&!r.wrongWay&&(r.wrongWay=!0,q.emit(`race:wrongWay`,{kartId:r.id,wrongWay:!0}))):a>.5&&(e.wrongWayTimer=0,r.wrongWay&&(r.wrongWay=!1,q.emit(`race:wrongWay`,{kartId:r.id,wrongWay:!1})))}let o=!1;if(r.position.y<-30?o=!0:r.surface===`void`?(e.voidTimer+=t,e.voidTimer>=Hy&&(o=!0)):e.voidTimer=0,!o&&!r.finished&&!r.isFrozen){let i=!r.isPlayer||n.input.throttle>.3||n.input.brake>.3;Math.abs(r.speed)<Wy&&i&&!r.isSpinning&&!r.isSquished?(e.stuckTimer+=t,e.stuckTimer>=Uy&&(o=!0)):e.stuckTimer=0}o&&this.respawn(e)}passCheckpoint(e){let t=e.kart.state,n=this.checkpointT.length,r=e.nextCheckpoint;if(e.nextCheckpoint=(r+1)%n,t.checkpointIndex=e.nextCheckpoint,r!==0)return;if(!e.started){e.started=!0,e.lapsCompleted=0;return}e.lapsCompleted++;let i=e.lapsCompleted+1;if(e.lapsCompleted>=this.totalLaps){this.finish(e);return}t.lap=i,q.emit(`race:lap`,{kartId:t.id,lap:i,totalLaps:this.totalLaps,isPlayer:t.isPlayer,isFinalLap:i===this.totalLaps})}finish(e){let t=e.kart.state;t.finished||(t.finished=!0,t.finishTime=this.time,t.lap=this.totalLaps+1,this.finishedCount++,t.place=this.finishedCount,e.emittedPlace=t.place,e.candidatePlace=t.place,t.wrongWay=!1,t.isPlayer&&this.playerFinishedAt<0&&(this.playerFinishedAt=this.time),q.emit(`race:finish`,{kartId:t.id,place:t.place,time:t.finishTime,isPlayer:t.isPlayer}))}forceFinishRemaining(){for(let e of this.order)e.kart.state.finished||this.finish(e)}computeProgress(e){let t=e.kart.state,n=this.checkpointT.length,r=(e.nextCheckpoint-1+n)%n,i=this.checkpointT[r],a=i+rd(i,nd(t.trackT));return e.lapsCompleted+a}sortOrder(){let e=this.order;for(let t=1;t<e.length;t++){let n=e[t],r=t-1;for(;r>=0&&this.compare(e[r],n)>0;)e[r+1]=e[r],r--;e[r+1]=n}}compare(e,t){let n=e.kart.state,r=t.kart.state;return n.finished&&r.finished?n.place-r.place:n.finished?-1:r.finished?1:r.raceProgress===n.raceProgress?n.id-r.id:r.raceProgress-n.raceProgress}updatePlaces(e){for(let t=0;t<this.order.length;t++){let n=this.order[t],r=n.kart.state,i=t+1;r.finished||(r.place=i);let a=r.place;if(a!==n.candidatePlace)n.candidatePlace=a,n.candidateTimer=0;else if(a!==n.emittedPlace&&(n.candidateTimer+=e,n.candidateTimer>=Ky||r.finished)){let e=n.emittedPlace;n.emittedPlace=a,q.emit(`race:positionChange`,{kartId:r.id,from:e,to:a,isPlayer:r.isPlayer})}}}respawn(e){let t=e.kart,n=t.state,r=this.checkpointT.length,i=(e.nextCheckpoint-1+r)%r,a=this.track.checkpoints[i],o;if(a)this.tmpPos.copy(a.position),o=Math.atan2(-a.forward.x,-a.forward.z);else{let e=this.track.sample(this.checkpointT[i],this.sample);this.tmpPos.copy(e.position),o=Math.atan2(-e.tangent.x,-e.tangent.z)}this.tmpPos.y+=.35,this.tmpEuler.set(0,o,0),this.tmpQuat.setFromEuler(this.tmpEuler),t.resetTo(this.tmpPos,this.tmpQuat),n.trackT=this.checkpointT[i],n.wrongWay=!1,e.wrongWayTimer=0,e.voidTimer=0,e.stuckTimer=0,e.respawnCount++,t.setFrozen(!0),e.respawnFreeze=Gy,q.emit(`kart:respawn`,{kartId:n.id,position:this.tmpPos.clone()})}},Zy=5.6,Qy=2.25,$y=.8,eb=2.5,tb=68,nb=80,rb=6,ib=3.4,ab=9,ob=9,sb=12*Math.PI/180,cb=.6,lb=.045,ub=5.5;function db(){return{t:0,surface:`road`,groundY:0,groundNormal:new B(0,1,0),lateral:0,halfWidth:0,wallHalfWidth:0,tangent:new B(0,0,-1),binormal:new B(1,0,0),center:new B}}var fb=class{camera;track=null;followKartId=-1;initialised=!1;yaw=0;fov=tb;roll=0;lookBackBlend=0;pos=new B;look=new B;shakeAmp=0;shakePhase=0;cine=!1;cineTime=0;cineDuration=1;cineFovFrom=50;cineFrom=new B;cineLookFrom=new B;desired=new B;desiredLook=new B;forward=new B;tmp=new B;surf=db();unsubs=[];constructor(e){this.camera=e,this.unsubs.push(q.on(`kart:collision`,e=>{e.kartId===this.followKartId&&this.shake(Xu(e.impulse*.05,.06,.45))}),q.on(`item:hit`,e=>{e.kartId===this.followKartId&&this.shake(e.item===`lightning`?.35:.65)}),q.on(`item:explosion`,e=>{let t=this.pos.distanceTo(e.position);t<e.radius*4&&this.shake(Xu(.5-t/(e.radius*8),.05,.4))}))}setTrack(e){this.track=e}snapTo(e){let t=e.state;this.followKartId=t.id,this.yaw=t.heading,this.fov=tb,this.roll=0,this.lookBackBlend=0,this.shakeAmp=0,this.computeChase(e,0,this.desired,this.desiredLook),this.pos.copy(this.desired),this.look.copy(this.desiredLook),this.initialised=!0,this.apply()}setCinematic(e,t,n,r=50){this.cine=!0,this.cineTime=0,this.cineDuration=Math.max(.01,n),this.cineFovFrom=r,this.cineFrom.copy(e),this.cineLookFrom.copy(t)}get isCinematic(){return this.cine}shake(e){this.shakeAmp=Math.max(this.shakeAmp,Y(e))}update(e,t,n){let r=t.state;(!this.initialised||this.followKartId!==r.id)&&this.snapTo(t),this.lookBackBlend=$u(this.lookBackBlend,+!!n,ob,e),this.lookBackBlend<.002?this.lookBackBlend=0:this.lookBackBlend>.998&&(this.lookBackBlend=1);let i=this.lookBackBlend,a=r.heading,o=rb;n?(a+=Math.PI,o=ab):r.isDrifting&&r.driftDirection!==0&&(a-=r.driftDirection*sb,o=ib),r.isSpinning&&(o*=.35);let s=td(this.yaw,a);this.yaw=ed(this.yaw+s*(1-Math.exp(-o*e)));let c=Math.max(1,t.topSpeed()),l=Y(Math.abs(r.speed)/c);if(this.computeChase(t,l,this.desired,this.desiredLook),this.cine){this.cineTime+=e;let t=Qu(0,1,this.cineTime/this.cineDuration),n=t*t*(3-2*t);this.pos.lerpVectors(this.cineFrom,this.desired,n),this.look.lerpVectors(this.cineLookFrom,this.desiredLook,n),this.fov=Zu(this.cineFovFrom,tb,n),this.roll=0,this.cineTime>=this.cineDuration&&(this.cine=!1,this.yaw=r.heading)}else{let t=1-Math.exp(-16*e);this.pos.lerp(this.desired,t),this.look.lerp(this.desiredLook,1-Math.exp(-22.4*e));let n=r.isBoosting?Y(.5+r.boostStrength):0,a=Zu(tb,nb,Y(l*l*.7+n*.5));this.fov=$u(this.fov,a,4,e);let o=r.steerVisual*(1-2*i),s=r.isDrifting?r.driftDirection*.35*(1-i):0;this.roll=$u(this.roll,-(o+s)*lb,5,e)}if(this.track){let e=this.track.query(this.pos,r.trackT,this.surf).groundY+cb;this.pos.y<e&&(this.pos.y=e)}this.shakeAmp>.001&&(this.shakePhase+=e*60,this.shakeAmp=$u(this.shakeAmp,0,ub,e),this.shakeAmp<.001&&(this.shakeAmp=0)),this.apply()}dispose(){for(let e of this.unsubs)e();this.unsubs.length=0,this.track=null}computeChase(e,t,n,r){let i=e.state,a=this.yaw,o=Zy+t*.9+(i.isBoosting?.45:0),s=Qy+t*.2;n.set(Math.sin(a)*o,s,Math.cos(a)*o).add(i.position);let c=i.heading;this.forward.set(-Math.sin(c),0,-Math.cos(c)),r.copy(i.position).addScaledVector(this.forward,eb*(1-2*this.lookBackBlend)),r.y+=$y}apply(){let e=this.camera;if(e.position.copy(this.pos),this.shakeAmp>0){let t=this.shakeAmp*.35,n=this.shakePhase;this.tmp.set(Math.sin(n*1.3)*t+Math.sin(n*3.7)*t*.5,Math.cos(n*1.7)*t*.8+Math.sin(n*4.3)*t*.4,Math.sin(n*2.1)*t*.3),e.position.add(this.tmp)}e.up.set(0,1,0),e.lookAt(this.look),this.roll!==0&&e.rotateZ(this.roll),Math.abs(e.fov-this.fov)>.01&&(e.fov=this.fov,e.updateProjectionMatrix())}},pb={title:{distance:5.7,height:1,fov:30,sx:0,sy:-.3},characters:{distance:5.3,height:.95,fov:30,sx:.58,sy:-.08},tracks:{distance:5.9,height:.85,fov:30,sx:0,sy:.42}},mb=1.55,hb=.32,gb=.11,_b=.22,vb=3.2,yb=1708342,bb=420,xb=7,Sb=4.5,Cb=`
varying vec3 vWorldPos;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,wb=`
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uGlow;
uniform float uTime;
varying vec3 vWorldPos;
void main() {
  vec3 d = normalize(vWorldPos);
  float h = d.y;
  // Above the horizon: horizon colour → zenith. Below: stay at the horizon colour so the
  // fogged floor (same colour) meets it without a seam.
  vec3 c = h > 0.0 ? mix(uMid, uTop, pow(h, 0.5)) : uMid;
  // Soft glow hugging the horizon, slowly breathing.
  float glow = exp(-abs(h) * 6.0) * (0.55 + 0.1 * sin(uTime * 0.35 + d.x * 2.0));
  c += uGlow * glow;
  // Faint aurora band.
  float band = exp(-pow((h - 0.22 + 0.03 * sin(uTime * 0.25 + d.x * 3.0)) * 10.0, 2.0));
  c += vec3(0.05, 0.03, 0.14) * band * (0.6 + 0.4 * sin(uTime * 0.4 + d.z * 4.0));
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Tb=`
attribute float aSeed;
uniform float uTime;
uniform float uHeight;
varying float vAlpha;
void main() {
  vec3 p = position;
  float t = uTime * (0.08 + 0.06 * aSeed);
  p.y = mod(p.y + t, uHeight);
  p.x += sin(uTime * 0.3 + aSeed * 12.0) * 0.25;
  p.z += cos(uTime * 0.27 + aSeed * 9.0) * 0.25;
  // Fade in near the floor and out near the top.
  float fade = smoothstep(0.0, 0.5, p.y) * (1.0 - smoothstep(uHeight - 1.2, uHeight, p.y));
  vAlpha = fade * (0.35 + 0.65 * fract(aSeed * 7.31));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (2.0 + 4.0 * fract(aSeed * 3.17)) * (220.0 / max(1.0, -mv.z));
  gl_Position = projectionMatrix * mv;
}`,Eb=`
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv) * 2.0;
  float a = smoothstep(1.0, 0.2, d) * vAlpha * 0.55;
  gl_FragColor = vec4(vec3(0.75, 0.82, 1.0) * a, a);
}`,Db=class{group=new Fn;kart=null;currentId=null;kartHolder=new Fn;skyMaterial;dustMaterial;rings=[];disposables=[];fog=new Un(yb,.03);background=new V(yb);envTexture=null;framing=`title`;cur={...pb.title};angle=.7;time=0;origin=new B;identity=new It;focus=new B;camPos=new B;dir=new B;right=new B;upv=new B;target=new B;worldUp=new B(0,1,0);constructor(){this.group.name=`MenuBackdrop`;let e=new po(220,32,16);this.skyMaterial=new wo({vertexShader:Cb,fragmentShader:wb,side:1,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new V(328719)},uMid:{value:new V(yb)},uGlow:{value:new V(2757968)},uTime:{value:0}}});let t=new H(e,this.skyMaterial);t.frustumCulled=!1,this.group.add(t),this.disposables.push(e,this.skyMaterial);let n=new Float32Array(1260);for(let e=0;e<420;e++){let t=Math.random()*Math.PI*2,r=Math.acos(1-Math.random()*.75);n[e*3]=190*Math.sin(r)*Math.cos(t),n[e*3+1]=190*Math.cos(r)+12,n[e*3+2]=190*Math.sin(r)*Math.sin(t)}let r=new Rr;r.setAttribute(`position`,new Cr(n,3));let i=new Di({color:14673663,size:1.4,sizeAttenuation:!1,transparent:!0,opacity:.6,depthWrite:!1,fog:!1}),a=new Mi(r,i);a.frustumCulled=!1,this.group.add(a),this.disposables.push(r,i);let o=new Bi(140,72),s=this.makeGridTexture(),c=new G({color:16777215,roughness:.3,metalness:.75,map:s,envMapIntensity:1.2}),l=new H(o,c);l.rotation.x=-Math.PI/2,l.position.y=-.005,l.receiveShadow=!0,this.group.add(l),this.disposables.push(o,c,s);let u=new G({color:1381420,metalness:.8,roughness:.22,envMapIntensity:1.4}),d=new W(mb,1.67,hb,72),f=new H(d,u);f.position.y=hb/2,f.castShadow=!0,f.receiveShadow=!0,this.group.add(f),this.disposables.push(d,u);let p=new W(2.3,2.4,.1,72),m=new H(p,u);m.position.y=.05,m.receiveShadow=!0,this.group.add(m),this.disposables.push(p),this.addRing(1.58,.33,.016,new V(.45,1.05,1.45),1,0,.95),this.addRing(2.41,.105,.014,new V(1.3,.4,1),3,.22,.85),this.addRing(3.45,.012,.012,new V(.35,.65,1.3),2,-.14,.6);let h=new Float32Array(bb*3),g=new Float32Array(bb);for(let e=0;e<bb;e++){let t=Math.sqrt(Math.random())*xb,n=Math.random()*Math.PI*2;h[e*3]=Math.cos(n)*t,h[e*3+1]=Math.random()*Sb,h[e*3+2]=Math.sin(n)*t,g[e]=Math.random()}let _=new Rr;_.setAttribute(`position`,new Cr(h,3)),_.setAttribute(`aSeed`,new Cr(g,1)),this.dustMaterial=new wo({vertexShader:Tb,fragmentShader:Eb,uniforms:{uTime:{value:0},uHeight:{value:Sb}},transparent:!0,depthWrite:!1,blending:2,fog:!1});let v=new Mi(_,this.dustMaterial);v.frustumCulled=!1,this.group.add(v),this.disposables.push(_,this.dustMaterial);let y=new us(16773340,2.6);y.position.set(3.2,6.5,4.2),y.castShadow=!0,y.shadow.mapSize.set(1024,1024),y.shadow.camera.left=-3.5,y.shadow.camera.right=3.5,y.shadow.camera.top=3.5,y.shadow.camera.bottom=-3.5,y.shadow.camera.near=.5,y.shadow.camera.far=20,y.shadow.bias=-4e-4,y.shadow.normalBias=.02,this.group.add(y,y.target);let b=new as(16777215,60,0,.55,.7,2);b.position.set(0,6.5,.5),b.target.position.set(0,hb,0),this.group.add(b,b.target);let x=new Go(4016296,722710,.55);this.group.add(x);let S=new ss(3647743,38,22,2);S.position.set(-4.2,1.9,-3.2);let C=new ss(16726712,38,22,2);C.position.set(4.2,1.5,-3.2),this.group.add(S,C),this.kartHolder.position.y=hb,this.group.add(this.kartHolder),this.focus.set(0,.74,0)}setCharacter(e){if(e.id!==this.currentId){this.currentId=e.id,this.disposeKart();try{let t=new Df(0,e,!0);t.setFrozen(!0),t.resetTo(this.origin,this.identity),t.object.traverse(e=>{let t=e;t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)}),this.kartHolder.add(t.object),this.kart=t}catch(e){console.error(`[MenuBackdrop] failed to build kart`,e),this.kart=null}}}setFraming(e,t=!1){this.framing=e,t&&Object.assign(this.cur,pb[e])}attach(e,t,n){e.add(this.group),e.fog=this.fog,e.background=this.background,n&&!this.envTexture&&this.buildEnvironment(n),e.environment=this.envTexture,Object.assign(this.cur,pb[this.framing]),t.fov=this.cur.fov,t.updateProjectionMatrix(),this.update(0,t)}detach(e){e.remove(this.group),e.fog===this.fog&&(e.fog=null),e.environment===this.envTexture&&(e.environment=null)}update(e,t){this.time+=e,this.angle+=e*gb,this.kartHolder.rotation.y+=e*_b,this.skyMaterial.uniforms.uTime.value=this.time,this.dustMaterial.uniforms.uTime.value=this.time;let n=.9+.1*Math.sin(this.time*1.7);for(let t=0;t<this.rings.length;t++){let r=this.rings[t];r.mesh.rotation.z+=e*r.speed,r.material.opacity=r.baseOpacity*n}this.kart&&(this.kart.updateVisuals(e),this.kart.object.position.copy(this.origin));let r=pb[this.framing],i=this.cur;i.distance=$u(i.distance,r.distance,vb,e),i.height=$u(i.height,r.height,vb,e),i.fov=$u(i.fov,r.fov,vb,e),i.sx=$u(i.sx,r.sx,vb,e),i.sy=$u(i.sy,r.sy,vb,e);let a=Math.sin(this.time*.45)*.1,o=this.focus;this.camPos.set(Math.sin(this.angle)*i.distance,o.y+i.height+a,Math.cos(this.angle)*i.distance),this.dir.subVectors(o,this.camPos);let s=this.dir.length();this.dir.multiplyScalar(1/Math.max(1e-6,s)),this.right.crossVectors(this.dir,this.worldUp).normalize(),this.upv.crossVectors(this.right,this.dir);let c=s*Math.tan(i.fov*Math.PI/360),l=c*Math.max(.1,t.aspect);this.target.copy(o).addScaledVector(this.right,-i.sx*l).addScaledVector(this.upv,-i.sy*c),t.position.copy(this.camPos),t.up.set(0,1,0),t.lookAt(this.target),Math.abs(t.fov-i.fov)>.01&&(t.fov=i.fov,t.updateProjectionMatrix())}dispose(){this.disposeKart();for(let e of this.disposables)e.dispose();this.disposables.length=0,this.rings.length=0,this.envTexture&&=(this.envTexture.dispose(),null),this.group.clear()}disposeKart(){if(this.kart){this.kartHolder.remove(this.kart.object);try{this.kart.dispose()}catch(e){console.warn(`[MenuBackdrop] kart dispose failed`,e)}this.kart=null}}addRing(e,t,n,r,i,a,o){let s=new Yr({color:r,toneMapped:!1,transparent:!0,opacity:o,fog:!1}),c=new Fn;c.rotation.x=Math.PI/2,c.position.y=t;let l=i===1?Math.PI*2:Math.PI*2*.62/i;for(let t=0;t<i;t++){let r=new mo(e,n,8,Math.max(24,Math.round(96*(l/(Math.PI*2)))),l),a=new H(r,s);a.rotation.z=t/i*Math.PI*2,a.layers.enable(1),c.add(a),this.disposables.push(r)}this.disposables.push(s),this.group.add(c),this.rings.push({mesh:c,material:s,speed:a,baseOpacity:o})}buildEnvironment(e){let t=null;try{t=new ec(e);let n=new Wn,r=this.skyMaterial.clone();r.uniforms.uTime={value:0};let i=new H(new po(100,24,12),r);n.add(i);let a=e=>new Yr({color:e,side:2,fog:!1}),o=new co(12,5),s=new H(o,a(10148095));s.position.set(-6,9,4),s.lookAt(0,0,0);let c=new H(o,a(16748504));c.position.set(7,7,-3),c.lookAt(0,0,0);let l=new H(o,a(16777215));l.position.set(0,12,0),l.lookAt(0,0,0),n.add(s,c,l);let u=new H(new Bi(80,24),new Yr({color:526106,fog:!1}));u.rotation.x=-Math.PI/2,n.add(u);let d=t.fromScene(n,.04,.5,300);this.envTexture=d.texture,i.geometry.dispose(),r.dispose(),o.dispose(),s.material.dispose(),c.material.dispose(),l.material.dispose(),u.geometry.dispose(),u.material.dispose()}catch(e){console.warn(`[MenuBackdrop] environment map failed`,e),this.envTexture=null}finally{t?.dispose()}}makeGridTexture(){let e=document.createElement(`canvas`);e.width=256,e.height=256;let t=e.getContext(`2d`);t&&(t.fillStyle=`#0b0a19`,t.fillRect(0,0,256,256),t.strokeStyle=`rgba(90, 100, 220, 0.55)`,t.lineWidth=2,t.beginPath(),t.moveTo(0,1),t.lineTo(256,1),t.moveTo(1,0),t.lineTo(1,256),t.stroke());let n=new Fi(e);return n.wrapS=a,n.wrapT=a,n.repeat.set(70,70),n.anisotropy=4,n.colorSpace=We,n}};function $(e,t=``,n,r){let i=document.createElement(e);return t&&(i.className=t),n!==void 0&&(i.textContent=n),r&&r.appendChild(i),i}function Ob(e){return`#`+(e>>>0&16777215).toString(16).padStart(6,`0`)}function kb(e,t){return`rgba(${e>>16&255},${e>>8&255},${e&255},${t})`}function Ab(e,t){e.classList.remove(t),e.offsetWidth,e.classList.add(t)}var jb=class{node;value=``;constructor(e){this.node=e}set(e){return e!==this.value&&(this.value=e,this.node.textContent=e,!0)}get(){return this.value}};function Mb(e,t,n){let r=$(`button`,`btn ${t}`.trim(),e);return r.type=`button`,r.addEventListener(`click`,e=>{e.stopPropagation(),n()}),r}var Nb=class{onActivate;index=0;items=[];constructor(e){this.onActivate=e}add(e){let t=this.items.length;this.items.push(e),e.addEventListener(`pointerenter`,()=>this.set(t)),t===0&&e.classList.add(`focused`)}clear(){this.items.length=0,this.index=0}get current(){return this.index}set(e){let t=this.items.length;if(t===0)return!1;let n=(e%t+t)%t;if(n===this.index&&this.items[n].classList.contains(`focused`))return!1;for(let e=0;e<t;e++)this.items[e].classList.toggle(`focused`,e===n);return this.index=n,!0}move(e){return this.set(this.index+e)}activate(){this.items.length!==0&&this.onActivate(this.index)}},Pb=14,Fb=1/30,Ib=class{canvas;ctx;layer;track=null;timer=0;dpr;constructor(e){this.dpr=Math.min(window.devicePixelRatio||1,2),this.canvas=$(`canvas`,`minimap-canvas`,void 0,e),this.canvas.width=220*this.dpr,this.canvas.height=220*this.dpr,this.canvas.style.width=`220px`,this.canvas.style.height=`220px`,this.ctx=this.canvas.getContext(`2d`),this.layer=document.createElement(`canvas`),this.layer.width=this.canvas.width,this.layer.height=this.canvas.height}setTrack(e){this.track=e,this.renderStaticLayer(),this.timer=Fb}update(e,t,n){if(this.timer+=e,this.timer<Fb)return;this.timer=0;let r=this.ctx;if(!r)return;let i=220*this.dpr;r.clearRect(0,0,i,i),r.drawImage(this.layer,0,0);let a=this.track;if(!a)return;let o=i-28*this.dpr,s=Pb*this.dpr;for(let e=0;e<2;e++)for(let i=0;i<t.length;i++){let c=t[i],l=c.state.id===n;if(e===0===l)continue;let u=a.minimap.worldToMap(c.state.position.x,c.state.position.z),d=s+u.x*o,f=s+u.y*o,p=(l?6.5:4.5)*this.dpr;r.beginPath(),r.arc(d,f,p,0,Math.PI*2),r.fillStyle=Ob(c.state.character.color),r.fill(),r.lineWidth=(l?2.5:1.2)*this.dpr,r.strokeStyle=l?`#ffffff`:`rgba(0,0,0,0.6)`,r.stroke(),l&&(r.beginPath(),r.arc(d,f,p+4*this.dpr,0,Math.PI*2),r.lineWidth=1.5*this.dpr,r.strokeStyle=`rgba(255,255,255,0.45)`,r.stroke())}}dispose(){this.canvas.remove(),this.track=null}renderStaticLayer(){let e=this.layer.getContext(`2d`);if(!e)return;let t=220*this.dpr;e.clearRect(0,0,t,t);let n=this.track;if(!n)return;let r=n.minimap,i=t-28*this.dpr,a=Pb*this.dpr,o=e=>a+e*i,s=e=>a+e*i,c=(t,n)=>{if(t.length!==0){e.beginPath(),e.moveTo(o(t[0].x),s(t[0].y));for(let n=1;n<t.length;n++)e.lineTo(o(t[n].x),s(t[n].y));n&&e.closePath()}},l=r.leftEdge,u=r.rightEdge;if(e.lineJoin=`round`,e.lineCap=`round`,l.length>1&&u.length>1){e.beginPath(),e.moveTo(o(l[0].x),s(l[0].y));for(let t=1;t<l.length;t++)e.lineTo(o(l[t].x),s(l[t].y));for(let t=u.length-1;t>=0;t--)e.lineTo(o(u[t].x),s(u[t].y));e.closePath(),e.fillStyle=`rgba(20, 22, 40, 0.85)`,e.fill(),e.lineWidth=1.5*this.dpr,e.strokeStyle=`rgba(255,255,255,0.75)`,e.stroke()}else r.points.length>1&&(c(r.points,!0),e.lineWidth=9*this.dpr,e.strokeStyle=`rgba(20, 22, 40, 0.9)`,e.stroke(),e.lineWidth=11*this.dpr,e.strokeStyle=`rgba(255,255,255,0.6)`,e.globalCompositeOperation=`destination-over`,e.stroke(),e.globalCompositeOperation=`source-over`);if(r.points.length>1){c(r.points,!0),e.setLineDash([3*this.dpr,5*this.dpr]),e.lineWidth=1*this.dpr,e.strokeStyle=`rgba(255,255,255,0.28)`,e.stroke(),e.setLineDash([]);let t=r.points[0],n=r.points[1],i=n.x-t.x,a=n.y-t.y,l=Math.hypot(i,a)||1,u=-a/l,d=i/l,f=7*this.dpr,p=o(t.x),m=s(t.y);e.beginPath(),e.moveTo(p-u*f,m-d*f),e.lineTo(p+u*f,m+d*f),e.lineWidth=3*this.dpr,e.strokeStyle=`#ffffff`,e.stroke(),e.beginPath(),e.moveTo(p-u*f,m-d*f),e.lineTo(p+u*f,m+d*f),e.setLineDash([2*this.dpr,2*this.dpr]),e.lineWidth=3*this.dpr,e.strokeStyle=`#111111`,e.stroke(),e.setLineDash([])}}},Lb={none:``,banana:`BANANA`,triple_banana:`BANANA ×3`,green_shell:`GREEN SHELL`,triple_green_shell:`GREEN ×3`,red_shell:`RED SHELL`,triple_red_shell:`RED ×3`,blue_shell:`BLUE SHELL`,mushroom:`MUSHROOM`,triple_mushroom:`MUSHROOM ×3`,golden_mushroom:`GOLDEN`,star:`STAR`,lightning:`LIGHTNING`,bob_omb:`BOB-OMB`},Rb={none:`#333`,banana:`#ffd23f`,triple_banana:`#ffd23f`,green_shell:`#3ddc5a`,triple_green_shell:`#3ddc5a`,red_shell:`#ff4040`,triple_red_shell:`#ff4040`,blue_shell:`#3f7fff`,mushroom:`#ff5a3a`,triple_mushroom:`#ff5a3a`,golden_mushroom:`#ffc800`,star:`#ffe14a`,lightning:`#ffef70`,bob_omb:`#333344`},zb=184.3,Bb=.09,Vb=79.2*1.7,Hb=class{buildIcon;rootNode;minimap;unsubs=[];visible=!1;playerId=0;itemFrame;itemIconHost;itemCount;itemLabel;iconCache=new Map;shownIcon=`none`;shownCount=0;rouletteTimer=0;rouletteVisual=!1;placeNode;placeNum;placeSuffix;lastPlace=0;lapText;timerText;speedText;gaugeFill;gaugeValue=-1;speedSmooth=0;center;wrongWay;wrongWayShown=!1;vignette;vignetteAlpha=0;vignetteApplied=-1;timed=[];boostGlow;boostGlowApplied=-1;constructor(e,t){this.buildIcon=t,this.rootNode=$(`div`,`hud hidden`,void 0,e);let n=$(`div`,`hud-item`,void 0,this.rootNode);this.itemFrame=$(`div`,`item-frame`,void 0,n),this.itemIconHost=$(`div`,`item-icon`,void 0,this.itemFrame),this.itemCount=new jb($(`div`,`item-count`,``,this.itemFrame)),this.itemLabel=new jb($(`div`,`item-label`,``,n));let r=$(`div`,`hud-topright`,void 0,this.rootNode),i=$(`div`,`hud-lap glass`,void 0,r);$(`span`,`hud-lap-label`,`LAP`,i),this.lapText=new jb($(`span`,`hud-lap-value`,``,i)),this.timerText=new jb($(`div`,`hud-timer glass`,`0:00.000`,r)),this.placeNode=$(`div`,`hud-place`,void 0,this.rootNode),this.placeNum=new jb($(`span`,`place-num`,``,this.placeNode)),this.placeSuffix=new jb($(`span`,`place-suffix`,``,this.placeNode));let a=$(`div`,`hud-speed`,void 0,this.rootNode),o=`http://www.w3.org/2000/svg`,s=document.createElementNS(o,`svg`);s.setAttribute(`viewBox`,`0 0 100 100`),s.classList.add(`gauge`);let c=document.createElementNS(o,`circle`);c.setAttribute(`cx`,`50`),c.setAttribute(`cy`,`50`),c.setAttribute(`r`,`44`),c.classList.add(`gauge-bg`),c.setAttribute(`stroke-dasharray`,`${zb} 276.5`),s.appendChild(c),this.gaugeFill=document.createElementNS(o,`circle`),this.gaugeFill.setAttribute(`cx`,`50`),this.gaugeFill.setAttribute(`cy`,`50`),this.gaugeFill.setAttribute(`r`,`44`),this.gaugeFill.classList.add(`gauge-fill`),this.gaugeFill.setAttribute(`stroke-dasharray`,`0 276.5`),s.appendChild(this.gaugeFill),a.appendChild(s);let l=$(`div`,`speed-inner`,void 0,a);this.speedText=new jb($(`div`,`speed-value`,`0`,l)),$(`div`,`speed-unit`,`km/h`,l);let u=$(`div`,`hud-minimap glass`,void 0,this.rootNode);this.minimap=new Ib(u),this.center=$(`div`,`hud-center`,void 0,this.rootNode),this.wrongWay=$(`div`,`hud-wrongway`,void 0,this.rootNode),$(`span`,`wrongway-arrow`,`⟲`,this.wrongWay),$(`span`,`wrongway-text`,`WRONG WAY`,this.wrongWay),this.vignette=$(`div`,`hud-vignette`,void 0,this.rootNode),this.boostGlow=$(`div`,`hud-boostglow`,void 0,this.rootNode),this.subscribe()}setTrack(e){this.minimap.setTrack(e)}show(){this.rootNode.classList.remove(`hidden`),this.visible=!0}hide(){this.rootNode.classList.add(`hidden`),this.visible=!1}update(e,t,n,r,i){if(!this.visible)return;let a=t.state;this.playerId=a.id;let o=a.place>0?a.place:n.length;if(o!==this.lastPlace){this.lastPlace=o;let e=ld(o);this.placeNum.set(String(o)),this.placeSuffix.set(e.slice(String(o).length)),this.placeNode.classList.toggle(`gold`,o===1),this.placeNode.classList.toggle(`silver`,o===2),this.placeNode.classList.toggle(`bronze`,o===3),Ab(this.placeNode,`punch`)}let s=Math.min(Math.max(1,a.lap),i);this.lapText.set(`${s}/${i}`),this.timerText.set(cd(r));let c=Math.abs(a.speed)*3.6;this.speedSmooth=$u(this.speedSmooth,c,12,e),this.speedText.set(String(Math.round(this.speedSmooth)));let l=Y(this.speedSmooth/Vb);Math.abs(l-this.gaugeValue)>.004&&(this.gaugeValue=l,this.gaugeFill.setAttribute(`stroke-dasharray`,`${(l*zb).toFixed(1)} 276.5`));let u=+!!a.isBoosting;u!==this.boostGlowApplied&&(this.boostGlowApplied=u,this.boostGlow.classList.toggle(`on`,u===1),this.rootNode.classList.toggle(`boosting`,u===1)),this.updateItemSlot(e,a.item,a.itemCount,a.itemRouletteActive),a.wrongWay!==this.wrongWayShown&&(this.wrongWayShown=a.wrongWay,this.wrongWay.classList.toggle(`visible`,a.wrongWay)),this.vignetteAlpha>.001&&(this.vignetteAlpha=$u(this.vignetteAlpha,0,3.5,e),this.vignetteAlpha<.001&&(this.vignetteAlpha=0)),Math.abs(this.vignetteAlpha-this.vignetteApplied)>.01&&(this.vignetteApplied=this.vignetteAlpha,this.vignette.style.opacity=this.vignetteAlpha.toFixed(2));for(let t=this.timed.length-1;t>=0;t--){let n=this.timed[t];n.ttl-=e,n.ttl<=0&&(n.node.remove(),this.timed.splice(t,1))}this.minimap.update(e,n,a.id)}dispose(){for(let e of this.unsubs)e();this.unsubs.length=0,this.minimap.dispose(),this.rootNode.remove()}subscribe(){let e=q.on.bind(q);this.unsubs.push(e(`item:rouletteTick`,e=>{!e.isPlayer&&e.kartId!==this.playerId||(this.rouletteVisual=!0,this.rouletteTimer=0,this.setIcon(this.randomItem(),!1),this.itemFrame.classList.add(`spinning`))}),e(`item:rouletteEnd`,e=>{!e.isPlayer&&e.kartId!==this.playerId||(this.rouletteVisual=!1,this.itemFrame.classList.remove(`spinning`),this.setIcon(e.item,!0))}),e(`race:countdown`,e=>{this.flashCenter(String(e.count),`hud-count`,.95)}),e(`race:start`,()=>{this.flashCenter(`GO!`,`hud-count hud-go`,1.1)}),e(`race:lap`,e=>{e.isPlayer&&(e.isFinalLap?this.flashCenter(`FINAL LAP!`,`hud-banner final`,2.4):e.lap>1&&this.flashCenter(`LAP ${e.lap}`,`hud-banner lap`,1.4))}),e(`race:positionChange`,e=>{if(!e.isPlayer)return;let t=e.to<e.from;this.flashCenter(`${t?`▲`:`▼`} ${ld(e.to).toUpperCase()}`,`hud-posflash ${t?`up`:`down`}`,1)}),e(`item:hit`,e=>{e.isPlayer&&(this.vignetteAlpha=1,Ab(this.rootNode,`hit-shake`))}),e(`race:finish`,e=>{if(!e.isPlayer)return;let t=this.flashCenter(`FINISH`,`hud-finish`,4.5);$(`div`,`hud-finish-place`,ld(e.place).toUpperCase()+` PLACE`,t)}),e(`kart:respawn`,e=>{e.kartId===this.playerId&&(this.vignetteAlpha=Math.max(this.vignetteAlpha,.6))}))}randomItem(){return Yu[Math.floor(Math.random()*Yu.length)]}updateItemSlot(e,t,n,r){if(r){this.rouletteTimer+=e,this.rouletteTimer>=Bb&&(this.rouletteTimer=0,this.rouletteVisual=!0,this.setIcon(this.randomItem(),!1),this.itemFrame.classList.add(`spinning`)),this.shownCount!==0&&(this.shownCount=0,this.itemCount.set(``));return}this.rouletteVisual?(this.rouletteVisual=!1,this.itemFrame.classList.remove(`spinning`),this.setIcon(t,!0)):t!==this.shownIcon&&this.setIcon(t,t!==`none`);let i=t===`none`||n<=1?0:n;i!==this.shownCount&&(this.shownCount=i,this.itemCount.set(i>0?`×${i}`:``))}setIcon(e,t){e===this.shownIcon&&!t||(this.shownIcon=e,this.itemIconHost.replaceChildren(),e!==`none`&&this.itemIconHost.appendChild(this.getIcon(e)),this.itemFrame.classList.toggle(`has-item`,e!==`none`),this.itemLabel.set(this.rouletteVisual?``:Lb[e]),t&&Ab(this.itemFrame,`pop`))}getIcon(e){let t=this.iconCache.get(e);if(t)return t;try{if(t=this.buildIcon(e),!(t instanceof HTMLCanvasElement))throw Error(`buildItemIcon did not return a canvas`)}catch(n){console.warn(`[HUD] item icon fallback for`,e,n),t=this.fallbackIcon(e)}return t.classList.add(`item-icon-canvas`),this.iconCache.set(e,t),t}fallbackIcon(e){let t=document.createElement(`canvas`);t.width=64,t.height=64;let n=t.getContext(`2d`);return n&&(n.fillStyle=Rb[e],n.beginPath(),n.arc(32,32,26,0,Math.PI*2),n.fill(),n.fillStyle=`#fff`,n.font=`bold 22px Impact, "Arial Narrow", sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e.replace(/^triple_/,``)[0]?.toUpperCase()??`?`,32,34)),t}flashCenter(e,t,n){let r=$(`div`,`hud-msg ${t}`,e,this.center);return r.style.setProperty(`--ttl`,`${n}s`),this.timed.push({node:r,ttl:n}),r}},Ub=[`easy`,`normal`,`hard`],Wb={easy:`EASY`,normal:`NORMAL`,hard:`HARD`},Gb={easy:`Relaxed rivals, generous rubber-banding.`,normal:`The classic Grand Prix challenge.`,hard:`Ruthless AI, near-perfect lines, no mercy.`},Kb=[{key:`speed`,label:`SPD`},{key:`acceleration`,label:`ACC`},{key:`handling`,label:`HND`},{key:`weight`,label:`WGT`},{key:`miniTurbo`,label:`MT`}],qb=4,Jb=class{characters;tracks;onStart=null;onHighlight=null;onPanelChange=null;rootNode;panels;panel=`title`;visible=!1;charCards=[];charIndex=0;charName;charTagline;trackCards=[];trackIndex=0;diffButtons=[];difficultyIndex=1;diffBlurb;startButton;trackRow=0;constructor(t,n,r){this.characters=n,this.tracks=r,this.rootNode=$(`div`,`screen menu hidden`,void 0,t);let i=$(`section`,`panel-title-screen`,void 0,this.rootNode),a=$(`div`,`logo`,void 0,i);e.split(` `).forEach((e,t)=>{let n=$(`span`,`logo-word logo-word-${t}`,void 0,a);n.dataset.text=e,n.textContent=e}),$(`div`,`logo-sub`,`ARCADE GRAND PRIX`,i),$(`span`,`press-start-text`,`PRESS ENTER / CLICK TO START`,$(`div`,`press-start`,void 0,i));let o=$(`div`,`controls-legend glass`,void 0,i);for(let[e,t]of[[`W / ↑`,`Throttle`],[`S / ↓`,`Brake / Reverse`],[`A D / ← →`,`Steer`],[`SPACE / SHIFT`,`Hop · Drift`],[`E / CTRL`,`Use item (hold BRAKE to throw back)`],[`Q`,`Look back`],[`ESC / P`,`Pause`],[`M`,`Mute`]]){let n=$(`div`,`legend-row`,void 0,o);$(`kbd`,``,e,n),$(`span`,``,t,n)}$(`div`,`version`,`v1.0 · Three.js · 100% procedural · gamepad supported`,i),i.addEventListener(`click`,()=>{this.panel===`title`&&this.goTo(`characterSelect`,!0)});let s=$(`section`,`panel-select panel-chars`,void 0,this.rootNode),c=$(`header`,`select-header`,void 0,s);$(`div`,`panel-kicker`,`STEP 1 / 2`,c),$(`h2`,`panel-title`,`CHOOSE YOUR RACER`,c);let l=$(`div`,`card-grid char-grid`,void 0,s);n.forEach((e,t)=>{let n=this.buildCharacterCard(e);n.addEventListener(`pointerenter`,()=>this.setCharacter(t)),n.addEventListener(`click`,()=>{this.charIndex===t?this.goTo(`trackSelect`,!0):this.setCharacter(t,!0)}),n.addEventListener(`dblclick`,()=>this.goTo(`trackSelect`,!0)),l.appendChild(n),this.charCards.push(n)});let u=$(`footer`,`select-footer glass`,void 0,s),d=$(`div`,`select-info`,void 0,u);this.charName=new jb($(`div`,`select-info-name`,``,d)),this.charTagline=new jb($(`div`,`select-info-tagline`,``,d));let f=$(`div`,`actions`,void 0,u);f.appendChild(Mb(`← BACK`,`ghost`,()=>this.goTo(`title`,!0))),f.appendChild(Mb(`CONTINUE →`,`primary`,()=>this.goTo(`trackSelect`,!0)));let p=$(`section`,`panel-select panel-tracks`,void 0,this.rootNode),m=$(`header`,`select-header`,void 0,p);$(`div`,`panel-kicker`,`STEP 2 / 2`,m),$(`h2`,`panel-title`,`PICK A CIRCUIT`,m);let h=$(`div`,`card-grid track-grid`,void 0,p);r.forEach((e,t)=>{let n=this.buildTrackCard(e);n.addEventListener(`pointerenter`,()=>{this.trackRow=0,this.setTrack(t)}),n.addEventListener(`click`,()=>{this.trackIndex===t&&this.trackRow===0?this.start():(this.trackRow=0,this.setTrack(t,!0))}),h.appendChild(n),this.trackCards.push(n)});let g=$(`footer`,`select-footer glass`,void 0,p),_=$(`div`,`difficulty`,void 0,g);$(`div`,`difficulty-label`,`DIFFICULTY`,_);let v=$(`div`,`segmented`,void 0,_);Ub.forEach((e,t)=>{let n=$(`button`,`seg`,Wb[e],v);n.type=`button`,n.addEventListener(`pointerenter`,()=>{this.trackRow=1,this.refreshTrackFocus()}),n.addEventListener(`click`,e=>{e.stopPropagation(),this.trackRow=1,this.setDifficulty(t,!0)}),this.diffButtons.push(n)}),this.diffBlurb=new jb($(`div`,`difficulty-blurb`,``,_));let y=$(`div`,`actions`,void 0,g);y.appendChild(Mb(`← BACK`,`ghost`,()=>this.goTo(`characterSelect`,!0))),this.startButton=Mb(`START RACE`,`primary start`,()=>this.start()),this.startButton.addEventListener(`pointerenter`,()=>{this.trackRow=2,this.refreshTrackFocus()}),y.appendChild(this.startButton),this.panels={title:i,characterSelect:s,trackSelect:p},this.setCharacter(0),this.setTrack(0),this.setDifficulty(1),this.applyPanel()}get currentPanel(){return this.panel}get highlightedCharacter(){return this.characters[this.charIndex]}show(e=`title`){this.rootNode.classList.remove(`hidden`),this.visible=!0,this.goTo(e,!1),this.onHighlight?.(this.highlightedCharacter.id)}hide(){this.rootNode.classList.add(`hidden`),this.visible=!1}dispose(){this.rootNode.remove()}handleInput(e){if(this.visible)switch(this.panel){case`title`:e.confirm&&this.goTo(`characterSelect`,!0);break;case`characterSelect`:{let t=this.characters.length;e.menuLeft?this.setCharacter((this.charIndex-1+t)%t,!0):e.menuRight?this.setCharacter((this.charIndex+1)%t,!0):e.menuUp?this.setCharacter((this.charIndex-qb+t)%t,!0):e.menuDown&&this.setCharacter((this.charIndex+qb)%t,!0),e.confirm?this.goTo(`trackSelect`,!0):e.back&&this.goTo(`title`,!0);break}case`trackSelect`:if(e.menuUp)this.trackRow=(this.trackRow+2)%3,this.refreshTrackFocus(),q.emit(`ui:move`,{});else if(e.menuDown)this.trackRow=(this.trackRow+1)%3,this.refreshTrackFocus(),q.emit(`ui:move`,{});else if(e.menuLeft||e.menuRight){let t=e.menuRight?1:-1;if(this.trackRow===0){let e=this.tracks.length;this.setTrack((this.trackIndex+t+e)%e,!0)}else this.trackRow===1?this.setDifficulty((this.difficultyIndex+t+3)%3,!0):q.emit(`ui:move`,{})}e.confirm?this.start():e.back&&this.goTo(`characterSelect`,!0)}}goTo(e,t){if(t){let t=this.panel===`title`&&e!==`title`||this.panel===`characterSelect`&&e===`trackSelect`;q.emit(t?`ui:select`:`ui:back`,{})}let n=e!==this.panel;this.panel=e,this.applyPanel(),n&&this.onPanelChange?.(e)}applyPanel(){for(let e of Object.keys(this.panels)){let t=this.panels[e],n=e===this.panel;t.classList.toggle(`active`,n),n&&(t.classList.remove(`panel-in`),t.offsetWidth,t.classList.add(`panel-in`))}this.panel===`trackSelect`&&(this.trackRow=0,this.refreshTrackFocus())}setCharacter(e,t=!1){if(e<0||e>=this.characters.length)return;let n=e!==this.charIndex;this.charIndex=e,this.charCards.forEach((t,n)=>{t.classList.toggle(`selected`,n===e),t.classList.toggle(`focused`,n===e)});let r=this.characters[e];this.charName.set(r.name.toUpperCase()),this.charTagline.set(r.tagline),n&&(t&&q.emit(`ui:move`,{}),this.onHighlight?.(r.id))}setTrack(e,t=!1){if(e<0||e>=this.tracks.length)return;let n=e!==this.trackIndex;this.trackIndex=e,this.trackCards.forEach((t,n)=>t.classList.toggle(`selected`,n===e)),this.refreshTrackFocus(),n&&t&&q.emit(`ui:move`,{})}setDifficulty(e,t=!1){let n=e!==this.difficultyIndex;this.difficultyIndex=e,this.diffButtons.forEach((t,n)=>t.classList.toggle(`selected`,n===e)),this.diffBlurb.set(Gb[Ub[e]]),this.refreshTrackFocus(),n&&t&&q.emit(`ui:move`,{})}refreshTrackFocus(){this.trackCards.forEach((e,t)=>e.classList.toggle(`focused`,this.trackRow===0&&t===this.trackIndex)),this.diffButtons.forEach((e,t)=>e.classList.toggle(`focused`,this.trackRow===1&&t===this.difficultyIndex)),this.startButton.classList.toggle(`focused`,this.trackRow===2)}start(){let e=this.tracks[this.trackIndex],t=this.characters[this.charIndex];!e||!t||(q.emit(`ui:select`,{}),this.onStart?.({characterId:t.id,trackId:e.id,difficulty:Ub[this.difficultyIndex],laps:e.laps>0?e.laps:3}))}buildCharacterCard(e){let t=$(`div`,`card char-card glass`);t.tabIndex=-1,t.style.setProperty(`--card-accent`,Ob(e.color)),t.style.setProperty(`--card-accent-2`,Ob(e.accent)),t.style.setProperty(`--card-glow`,kb(e.color,.55));let n=$(`div`,`char-swatch`,void 0,t);n.style.background=`linear-gradient(145deg, ${Ob(e.color)} 0%, ${Ob(e.accent)} 100%)`;let r=$(`div`,`char-helmet`,void 0,n);r.style.background=`radial-gradient(circle at 35% 35%, #fff 0%, ${Ob(e.driverColor)} 45%, ${Ob(e.accent)} 100%)`,$(`div`,`char-wheel char-wheel-l`,void 0,n),$(`div`,`char-wheel char-wheel-r`,void 0,n),$(`div`,`card-name`,e.name.toUpperCase(),t),$(`div`,`card-tag`,e.tagline,t);let i=$(`div`,`pill weight-${e.weightClass}`,e.weightClass.toUpperCase(),t);i.title=`Weight class`;let a=$(`div`,`stats`,void 0,t);for(let t of Kb){let n=$(`div`,`stat`,void 0,a);$(`span`,`stat-label`,t.label,n);let r=$(`div`,`stat-fill`,void 0,$(`div`,`stat-bar`,void 0,n)),i=Math.max(0,Math.min(1,e.stats[t.key]));r.style.width=`${Math.round(i*100)}%`}return t}buildTrackCard(e){let t=$(`div`,`card track-card glass`);t.tabIndex=-1;let n=e.environment;t.style.setProperty(`--card-accent`,Ob(n.skyHorizon)),t.style.setProperty(`--card-glow`,kb(n.skyHorizon,.5));let r=$(`div`,`track-art`,void 0,t);r.style.background=`linear-gradient(180deg, ${Ob(n.skyTop)} 0%, ${Ob(n.skyHorizon)} 55%, ${Ob(e.palette.ground)} 56%, ${Ob(e.palette.ground)} 100%)`;let i=$(`div`,`track-art-road`,void 0,r);i.style.background=Ob(e.palette.road),i.style.borderColor=Ob(e.palette.curb),$(`div`,`track-theme-pill pill`,e.theme.toUpperCase(),r);let a=$(`div`,`track-body`,void 0,t),o=$(`div`,`track-name-row`,void 0,a);$(`div`,`card-name`,e.name.toUpperCase(),o);let s=$(`div`,`stars`,void 0,o);for(let t=0;t<3;t++)$(`span`,t<e.difficulty?`star on`:`star`,`★`,s);$(`div`,`card-tag`,e.description,a);let c=$(`div`,`track-meta`,void 0,a);return $(`span`,`pill`,`${e.laps} LAPS`,c),$(`span`,`pill`,`${[`ROOKIE`,`PRO`,`EXPERT`][e.difficulty-1]??`PRO`}`,c),t}},Yb=56,Xb=[`#ffd23f`,`#ff3ab8`,`#37a8ff`,`#7cff6b`,`#ff7a2f`,`#ffffff`],Zb=class{onRaceAgain=null;onChangeTrack=null;onMainMenu=null;rootNode;panel;heading;subheading;table;confetti;focus;visible=!1;constructor(e){this.rootNode=$(`div`,`screen results hidden`,void 0,e),this.confetti=$(`div`,`confetti`,void 0,this.rootNode),this.panel=$(`div`,`glass panel results-panel`,void 0,this.rootNode),$(`div`,`panel-kicker`,`RACE COMPLETE`,this.panel),this.heading=new jb($(`h2`,`panel-title results-title`,``,this.panel)),this.subheading=new jb($(`div`,`results-sub`,``,this.panel)),this.table=$(`div`,`standings`,void 0,this.panel);let t=$(`div`,`actions`,void 0,this.panel);this.focus=new Nb(e=>this.activate(e));let n=Mb(`RACE AGAIN`,`primary`,()=>this.activate(0)),r=Mb(`CHANGE TRACK`,``,()=>this.activate(1)),i=Mb(`MAIN MENU`,`ghost`,()=>this.activate(2));t.append(n,r,i),this.focus.add(n),this.focus.add(r),this.focus.add(i)}show(e){this.table.replaceChildren(),this.confetti.replaceChildren();let t=e.find(e=>e.isPlayer),n=t?t.place:e.length,r=e.length>0?e[0].finishTime:0;this.heading.set(n===1?`VICTORY!`:`${ld(n).toUpperCase()} PLACE`),this.subheading.set(n===1?`Untouchable. The crowd goes wild.`:n<=3?`Podium finish. Champagne is on ice.`:n<=5?`Solid run. The podium is within reach.`:`Rough race. Time for revenge.`),this.panel.classList.toggle(`gold`,n===1),e.forEach((e,t)=>{let n=$(`div`,`standing-row`,void 0,this.table);n.style.animationDelay=`${.12+t*.09}s`,e.isPlayer&&n.classList.add(`you`),e.place<=3&&n.classList.add(`podium-${e.place}`),$(`span`,`standing-place`,ld(e.place),n);let i=$(`span`,`standing-chip`,void 0,n);i.style.background=Ob(e.color),$(`span`,`standing-name`,e.name+(e.isPlayer?`  (YOU)`:``),n);let a=e.finishTime;$(`span`,`standing-time`,!isFinite(a)||a<=0?`DNF`:t===0?cd(a):`+${(a-r).toFixed(3)}`,n)}),n<=3&&this.spawnConfetti(),this.focus.set(0),this.rootNode.classList.remove(`hidden`),this.panel.classList.remove(`panel-in`),this.panel.offsetWidth,this.panel.classList.add(`panel-in`),this.visible=!0}hide(){this.rootNode.classList.add(`hidden`),this.confetti.replaceChildren(),this.visible=!1}handleInput(e){this.visible&&(e.menuLeft||e.menuUp?this.focus.move(-1)&&q.emit(`ui:move`,{}):(e.menuRight||e.menuDown)&&this.focus.move(1)&&q.emit(`ui:move`,{}),e.confirm?this.focus.activate():e.back&&this.activate(2))}dispose(){this.rootNode.remove()}activate(e){q.emit(e===2?`ui:back`:`ui:select`,{}),e===0?this.onRaceAgain?.():e===1?this.onChangeTrack?.():this.onMainMenu?.()}spawnConfetti(){for(let e=0;e<Yb;e++){let t=$(`span`,`confetti-piece`,void 0,this.confetti);t.style.left=`${Math.random()*100}%`,t.style.background=Xb[e%Xb.length],t.style.animationDelay=`${Math.random()*2.5}s`,t.style.animationDuration=`${3+Math.random()*2.5}s`,t.style.transform=`rotate(${Math.random()*360}deg)`,t.style.width=`${6+Math.random()*8}px`,t.style.height=`${10+Math.random()*10}px`}}},Qb=class{onResume=null;onRestart=null;onQuit=null;rootNode;focus;visible=!1;constructor(e){this.rootNode=$(`div`,`screen pause hidden`,void 0,e);let t=$(`div`,`glass panel pause-panel`,void 0,this.rootNode);$(`div`,`panel-kicker`,`RACE PAUSED`,t),$(`h2`,`panel-title`,`PAUSED`,t);let n=$(`div`,`actions column`,void 0,t);this.focus=new Nb(e=>this.activate(e));let r=Mb(`RESUME`,`primary`,()=>this.activate(0)),i=Mb(`RESTART RACE`,``,()=>this.activate(1)),a=Mb(`QUIT TO MENU`,`danger`,()=>this.activate(2));n.append(r,i,a),this.focus.add(r),this.focus.add(i),this.focus.add(a),$(`div`,`panel-hint`,`ESC / P  resume   ·   ↑↓  navigate   ·   ENTER  select`,t)}show(){this.focus.set(0),this.rootNode.classList.remove(`hidden`),this.visible=!0}hide(){this.rootNode.classList.add(`hidden`),this.visible=!1}get isVisible(){return this.visible}handleInput(e){this.visible&&(e.menuUp||e.menuLeft?this.focus.move(-1)&&q.emit(`ui:move`,{}):(e.menuDown||e.menuRight)&&this.focus.move(1)&&q.emit(`ui:move`,{}),e.confirm?this.focus.activate():e.back&&(q.emit(`ui:back`,{}),this.onResume?.()))}activate(e){q.emit(`ui:select`,{}),e===0?this.onResume?.():e===1?this.onRestart?.():this.onQuit?.()}dispose(){this.rootNode.remove()}},$b=[`Hold DRIFT (Space / Shift) through a corner and release for a mini-turbo. Longer drift = bigger boost.`,`Tap the throttle just as the countdown hits 1 for a rocket start. Hold it too early and you will spin out.`,`Hold BRAKE while using a shell to throw it backwards.`,`Press Q to look behind you. Check what is coming before dropping a banana.`,`Boost pads (glowing chevrons) give a free +45% speed burst. Line them up.`,`Item odds depend on your place. Trailing racers get stars, lightning and blue shells.`,`A star makes you invincible and destroys any hazard you touch.`,`Staying on the road matters: off-road cuts your top speed almost in half.`,`Use a mushroom on the long straight, or to recover after a hit.`,`Heavy karts bump light karts around. Pick your weight class wisely.`,`Hop off jump crests for a small landing boost.`,`Press M to mute the audio at any time.`],ex=2.4,tx=class{rootNode;title;subtitle;band;bar;tipNode;tipText;tipTimer=0;tipIndex=0;progress=0;visible=!1;constructor(e){this.rootNode=$(`div`,`screen loading hidden`,void 0,e);let t=$(`div`,`loading-panel`,void 0,this.rootNode);this.band=$(`div`,`loading-band`,void 0,t);let n=$(`div`,`loading-inner`,void 0,t);$(`div`,`loading-kicker`,`NOW LOADING`,n),this.title=new jb($(`h2`,`loading-title`,``,n)),this.subtitle=new jb($(`div`,`loading-subtitle`,``,n));let r=$(`div`,`loading-track`,void 0,n);this.bar=$(`div`,`loading-bar`,void 0,r),$(`div`,`loading-bar-shimmer`,void 0,this.bar),this.tipNode=$(`div`,`loading-tip`,void 0,n),$(`span`,`loading-tip-label`,`TIP`,this.tipNode),this.tipText=new jb($(`span`,`loading-tip-text`,``,this.tipNode))}show(e){this.title.set(e.name.toUpperCase());let t=`★`.repeat(e.difficulty)+`☆`.repeat(3-e.difficulty);this.subtitle.set(`${e.laps} LAPS  ·  ${t}  ·  ${e.theme.toUpperCase()}`);let n=e.environment;this.band.style.background=`linear-gradient(90deg, ${Ob(n.skyTop)}, ${Ob(n.skyHorizon)}, ${Ob(e.palette.road)})`,this.tipIndex=Math.floor(Math.random()*$b.length),this.tipText.set($b[this.tipIndex]),this.tipTimer=0,this.setProgress(0),this.rootNode.classList.remove(`hidden`),this.visible=!0}hide(){this.rootNode.classList.add(`hidden`),this.visible=!1}setProgress(e){e=Y(e),!(Math.abs(e-this.progress)<.002)&&(this.progress=e,this.bar.style.transform=`scaleX(${e.toFixed(3)})`)}update(e){this.visible&&(this.tipTimer+=e,this.tipTimer>=ex&&(this.tipTimer=0,this.tipIndex=(this.tipIndex+1)%$b.length,this.tipText.set($b[this.tipIndex]),this.tipNode.classList.remove(`tip-in`),this.tipNode.offsetWidth,this.tipNode.classList.add(`tip-in`)))}dispose(){this.rootNode.remove()}},nx=null;function rx(){return nx&&nx.isConnected?nx:(nx=$(`div`,`toast-host`),document.body.appendChild(nx),nx)}function ix(e,t=`info`,n=4500){let r=rx();for(;r.childElementCount>=4&&r.firstElementChild;)r.removeChild(r.firstElementChild);let i=$(`div`,`toast toast-${t}`,e,r);requestAnimationFrame(()=>i.classList.add(`toast-in`)),window.setTimeout(()=>{i.classList.remove(`toast-in`),i.classList.add(`toast-out`),window.setTimeout(()=>i.remove(),400)},n)}var ax=.8,ox=8,sx=1.6,cx=8,lx=90,ux=30,dx=[];function fx(e){return e===`characterSelect`?`characters`:e===`trackSelect`?`tracks`:`title`}var px=class{container;renderer;scene=new Wn;camera;uiRoot;input;audio;particles;postfx;postfxOk=!0;backdrop;mainMenu;results;pauseMenu;loading;muteIndicator;state=`boot`;prePauseState=`racing`;race=null;pendingSettings=null;loadingElapsed=0;loadingFrames=0;loadingProgress=0;shadersReady=!1;rafId=0;lastTime=-1;elapsed=0;accumulator=0;pendingUseItem=!1;currentMusic=`none`;audioStarted=!1;disposed=!1;playerInput=Ju();unsubs=[];sunDir=new B(.4,.8,.3);tmpA=new B;tmpB=new B;tmpC=new B;speedFx=0;boostFx=0;hitFx=0;constructor(e){this.container=e,this.renderer=new qu({antialias:!0,powerPreference:`high-performance`}),this.renderer.outputColorSpace=We,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.domElement.className=`game-canvas`,e.appendChild(this.renderer.domElement),this.camera=new rs(70,1,.1,1200),this.camera.position.set(0,3,8),this.scene.add(this.camera),this.uiRoot=$(`div`,``,void 0,e),this.uiRoot.id=`ui`,this.input=new rp,this.audio=new Ev,this.particles=new fy,this.scene.add(this.particles.object),this.postfx=new Py;try{this.postfx.init(this.renderer,this.scene,this.camera)}catch(e){console.error(`[Game] PostFX init failed, using plain rendering`,e),this.postfxOk=!1}this.backdrop=new Db,this.mainMenu=new Jb(this.uiRoot,gd,Oh),this.mainMenu.onHighlight=e=>this.backdrop.setCharacter(_d(e)),this.mainMenu.onPanelChange=e=>this.onMenuPanel(e),this.mainMenu.onStart=e=>this.startRace(e),this.results=new Zb(this.uiRoot),this.results.onRaceAgain=()=>{this.race&&this.startRace(this.race.settings)},this.results.onChangeTrack=()=>this.returnToMenu(`trackSelect`),this.results.onMainMenu=()=>this.returnToMenu(`title`),this.pauseMenu=new Qb(this.uiRoot),this.pauseMenu.onResume=()=>this.resume(),this.pauseMenu.onRestart=()=>{let e=this.race?.settings;this.leavePause(),e?this.startRace(e):this.returnToMenu(`title`)},this.pauseMenu.onQuit=()=>{this.leavePause(),this.returnToMenu(`title`)},this.loading=new tx(this.uiRoot),this.muteIndicator=$(`div`,`mute-indicator`,`🔇 MUTED`,this.uiRoot),window.addEventListener(`resize`,this.onResize),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`pointerdown`,this.onGesture,{passive:!0}),window.addEventListener(`keydown`,this.onGesture),window.addEventListener(`blur`,this.onBlur),document.addEventListener(`visibilitychange`,this.onVisibility),this.onResize()}start(){this.state===`boot`&&(this.showMenu(`title`),this.lastTime=-1,this.rafId=requestAnimationFrame(this.loop))}get currentState(){return this.state}dispose(){if(!this.disposed){this.disposed=!0,cancelAnimationFrame(this.rafId),window.removeEventListener(`resize`,this.onResize),window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`pointerdown`,this.onGesture),window.removeEventListener(`keydown`,this.onGesture),window.removeEventListener(`blur`,this.onBlur),document.removeEventListener(`visibilitychange`,this.onVisibility);for(let e of this.unsubs)e();this.unsubs.length=0,this.disposeRace(),this.backdrop.detach(this.scene),this.backdrop.dispose(),this.mainMenu.dispose(),this.results.dispose(),this.pauseMenu.dispose(),this.loading.dispose(),this.muteIndicator.remove(),this.input.dispose(),this.safe(()=>this.audio.dispose()),this.safe(()=>this.particles.dispose()),this.safe(()=>this.postfx.dispose()),this.renderer.dispose(),this.renderer.domElement.remove(),this.uiRoot.remove()}}loop=e=>{if(this.disposed)return;this.rafId=requestAnimationFrame(this.loop),this.lastTime<0&&(this.lastTime=e);let t=(e-this.lastTime)/1e3;this.lastTime=e,t>.05&&(t=n),t<0&&(t=0),this.elapsed+=t;let r=this.input.update();try{this.frame(t,r)}catch(e){console.error(`[Game] frame error`,e),q.emit(`ui:error`,{})}};frame(e,t){switch(this.state){case`boot`:return;case`title`:case`characterSelect`:case`trackSelect`:this.mainMenu.handleInput(t),this.backdrop.update(e,this.camera),this.particles.update(e,dx,this.camera),this.audio.update(e,dx,-1,this.camera),this.render(e);return;case`loading`:this.frameLoading(e);return;case`countdown`:case`racing`:case`finished`:if(t.pause){this.pause(),this.render(e);return}this.simulate(e,t),this.renderRace(e,this.state===`racing`&&t.lookBack);return;case`paused`:this.pauseMenu.handleInput(t),t.pause&&this.state===`paused`&&this.resume(),this.render(e);return;case`results`:this.results.handleInput(t),this.race&&this.state===`results`?(this.simulate(e,t),this.renderRace(e,!1)):this.render(e);return}}frameLoading(e){if(this.loading.update(e),this.loadingElapsed+=e,this.loadingFrames++,!this.race&&this.loadingFrames>=2&&this.pendingSettings){let e=this.pendingSettings;try{this.buildRace(e)}catch(e){console.error(`[Game] failed to build race`,e),ix(`Could not build the race. Check the console for details.`,`error`),this.pendingSettings=null,this.loading.hide(),this.showMenu(`title`);return}this.warmShaders()}let t=this.race!==null&&(this.shadersReady||this.loadingElapsed>ox),n=this.race?t?1:.9:.12;this.loadingProgress=$u(this.loadingProgress,n,t?14:1.4,e),this.loading.setProgress(this.loadingProgress),this.race&&t&&(this.renderRace(e,!1),this.loadingElapsed>=ax&&this.loadingProgress>.985&&this.enterCountdown())}warmShaders(){let e=this.race;if(this.shadersReady=!1,!e)return;let t=this.renderer;if(typeof t.compileAsync!=`function`){this.shadersReady=!0;return}let n;try{n=t.compileAsync.call(this.renderer,this.scene,this.camera)}catch(e){console.warn(`[Game] compileAsync threw; falling back to synchronous compile`,e),this.shadersReady=!0;return}let r=()=>{this.race===e&&(this.shadersReady=!0)};n.then(r,e=>{console.warn(`[Game] compileAsync failed; falling back to synchronous compile`,e),r()})}simulate(e,n){let r=this.race;if(!r)return;n.useItem&&(this.pendingUseItem=!0),this.accumulator+=e;let i=0;for(;this.accumulator>=.008333333333333333&&i<cx;)this.step(t,r,n,this.pendingUseItem),this.pendingUseItem=!1,this.accumulator-=t,i++;i>=cx&&(this.accumulator=0)}step(e,t,n,r){let{track:i,karts:a,items:o}=t,s=a[0];if(t.playerAutoDriver)t.playerAutoDriver.update(e,i,a,o,null);else{let e=this.playerInput;e.throttle=n.throttle,e.brake=n.brake,e.steer=n.steer,e.drift=n.drift,e.useItem=r,e.useItemHeld=n.useItemHeld,e.lookBack=n.lookBack,e.pause=!1,e.confirm=!1,e.back=!1,e.menuUp=!1,e.menuDown=!1,e.menuLeft=!1,e.menuRight=!1,s.setInput(e)}for(let n=0;n<t.aiDrivers.length;n++)t.aiDrivers[n].update(e,i,a,o,s);for(let t=0;t<a.length;t++)a[t].update(e,i,a);for(let e=0;e<a.length;e++){let t=a[e],n=t.input;n.useItem&&!t.state.itemRouletteActive&&t.state.item!==`none`&&o.requestUse(t,n.brake>.5||n.lookBack)}o.update(e),t.raceManager.update(e)}renderRace(e,t){let n=this.race;if(!n){this.render(e);return}let r=n.karts[0];for(let t=0;t<n.karts.length;t++)n.karts[t].updateVisuals(e);n.track.update(e,this.elapsed),n.followCamera.update(e,r,t),this.updateSun(n,r),this.particles.update(e,n.karts,this.camera),this.audio.update(e,n.karts,r.state.id,this.camera),n.hud.update(e,r,n.karts,n.raceManager.raceTime,n.raceManager.totalLaps),this.updatePostFxFeel(e,r),this.state===`finished`&&n.resultsTimer>0&&(n.resultsTimer-=e,n.resultsTimer<=0&&this.enterResults()),this.render(e)}render(e){if(this.postfxOk)try{this.postfx.render(e);return}catch(e){console.error(`[Game] PostFX render failed; falling back to plain rendering`,e),this.postfxOk=!1,this.safe(()=>this.postfx.setEnabled(!1))}this.renderer.render(this.scene,this.camera)}updateSun(e,t){let n=t.state.position;this.tmpA.set(Math.round(n.x/2)*2,Math.round(n.y/2)*2,Math.round(n.z/2)*2),e.sun.target.position.copy(this.tmpA),e.sun.position.copy(this.tmpA).addScaledVector(this.sunDir,lx),e.fill.visible&&(e.fill.position.copy(this.camera.position),e.fill.position.y+=2,e.fill.target.position.copy(n))}updatePostFxFeel(e,t){if(!this.postfxOk)return;let n=t.state,r=Math.max(1,t.topSpeed()),i=Y((Math.abs(n.speed)-r*.55)/(r*.9)),a=n.isBoosting?Y(.45+n.boostStrength):n.isInvincible?.35:0;this.speedFx=$u(this.speedFx,i,5,e),this.boostFx=$u(this.boostFx,a,n.isBoosting?12:4,e),this.hitFx>0&&(this.hitFx=$u(this.hitFx,0,3,e),this.hitFx<.005&&(this.hitFx=0)),this.postfx.setSpeedEffect(this.speedFx),this.postfx.setBoostEffect(this.boostFx),this.postfx.setHitEffect(this.hitFx)}setState(e){if(e===this.state)return;let t=this.state;this.state=e,this.uiRoot.dataset.state=e,q.emit(`game:stateChange`,{from:t,to:e})}showMenu(e){this.results.hide(),this.pauseMenu.hide(),this.loading.hide(),this.backdrop.setCharacter(this.mainMenu.highlightedCharacter),this.backdrop.setFraming(fx(e),!0),this.backdrop.attach(this.scene,this.camera,this.renderer),this.mainMenu.show(e),this.setState(e),this.playMusic(`menu`)}onMenuPanel(e){(this.state===`title`||this.state===`characterSelect`||this.state===`trackSelect`)&&(this.setState(e),this.backdrop.setFraming(fx(e)))}returnToMenu(e){this.disposeRace(),this.showMenu(e)}startRace(e){this.disposeRace(),this.backdrop.detach(this.scene),this.mainMenu.hide(),this.results.hide(),this.pauseMenu.hide(),this.safe(()=>this.particles.reset());let t;try{t=kh(e.trackId)}catch{t=Oh[0]}if(!t){ix(`No tracks are available yet.`,`error`),this.showMenu(`title`);return}this.pendingSettings={...e,trackId:t.id},this.loadingElapsed=0,this.loadingFrames=0,this.loadingProgress=0,this.shadersReady=!1,this.loading.show(t),this.scene.background=new V(723738),this.scene.fog=null,this.setState(`loading`)}buildRace(e){let t={track:null,karts:[],items:null,followCamera:null,hud:null};try{this.buildRaceInner(e,t)}catch(e){let{hud:n,followCamera:r,items:i,karts:a,track:o}=t;n&&this.safe(()=>n.dispose()),r&&this.safe(()=>r.dispose()),i&&this.safe(()=>i.dispose());for(let e of a)this.safe(()=>e.dispose());throw o&&this.safe(()=>o.dispose()),e}}buildRaceInner(e,t){let n=kh(e.trackId),r=new Dh(n);t.track=r;let i=n.environment,a=t.karts,o;try{o=_d(e.characterId)}catch{o=gd[0]}let s=gd.filter(e=>e.id!==o.id);for(let e=s.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1)),n=s[e];s[e]=s[t],s[t]=n}a.push(new Df(0,o,!0));for(let e=1;e<8;e++){let t=s.length>0?s[(e-1)%s.length]:o;a.push(new Df(e,t,!1))}let c=e.difficulty,l=[];for(let e=1;e<a.length;e++)l.push(new T_(a[e],c,e));let u=new $g(this.particles);t.items=u,u.init(r,a);let d=new Xy(r,a,e),f=new fb(this.camera);t.followCamera=f,f.setTrack(r);let p=new Hb(this.uiRoot,Mh);t.hud=p,p.setTrack(r);let m=new us(i.sunColor,i.sunIntensity);m.castShadow=!0,m.shadow.mapSize.set(2048,2048);let h=m.shadow.camera;h.left=-30,h.right=ux,h.top=ux,h.bottom=-30,h.near=1,h.far=180,h.updateProjectionMatrix(),m.shadow.bias=-5e-4,m.shadow.normalBias=.03,this.sunDir.set(i.sunDirection.x,i.sunDirection.y,i.sunDirection.z),this.sunDir.lengthSq()<1e-6&&this.sunDir.set(.4,.8,.3),this.sunDir.y<0&&(this.sunDir.y=-this.sunDir.y),this.sunDir.y<.15&&(this.sunDir.y=.15),this.sunDir.normalize();let g=new Go(i.ambientSky,i.ambientGround,i.ambientIntensity),_=Xu(.9-i.ambientIntensity,0,.6)+Xu((1.6-i.sunIntensity)*.3,0,.3),v=new us(14279935,_);v.castShadow=!1,v.visible=_>.01;let y=i.fogDensity>0?new Un(i.fogColor,i.fogDensity):null,b=new V(i.skyHorizon);this.scene.add(r.object);for(let e of a)this.scene.add(e.object);this.scene.add(u.object),this.scene.add(m,m.target,g,v,v.target),this.scene.fog=y,this.scene.background=b;let x={settings:e,trackDef:n,track:r,karts:a,aiDrivers:l,playerAutoDriver:null,items:u,raceManager:d,followCamera:f,hud:p,sun:m,hemi:g,fill:v,fog:y,background:b,unsubs:[],resultsTimer:0};this.race=x,this.accumulator=0,this.pendingUseItem=!1,this.speedFx=0,this.boostFx=0,this.hitFx=0;for(let e of a)e.updateVisuals(0);f.snapTo(a[0]),this.updateSun(x,a[0]),x.unsubs.push(q.on(`race:start`,()=>{this.race===x&&this.state===`countdown`&&this.setState(`racing`)}),q.on(`race:lap`,e=>{this.race!==x||!e.isPlayer||e.isFinalLap&&this.playMusic(`finalLap`)}),q.on(`race:finish`,e=>{this.race!==x||!e.isPlayer||this.onPlayerFinished(x)}),q.on(`race:allFinished`,()=>{this.race===x&&(this.state===`finished`?x.resultsTimer=sx:(this.state===`racing`||this.state===`countdown`)&&this.enterResults())}),q.on(`item:hit`,e=>{this.race!==x||!e.isPlayer||(this.hitFx=1)}),q.on(`item:lightning`,()=>{this.race!==x||!this.postfxOk||this.safe(()=>this.postfx.flash(16777215,.3))}))}enterCountdown(){let e=this.race;if(!e)return;this.pendingSettings=null,this.loading.hide(),e.hud.show();let t=e.track.startGrid,n=this.tmpA.set(0,0,0),r=Math.min(t.length,8);if(r>0){for(let e=0;e<r;e++)n.add(t[e].position);n.multiplyScalar(1/r)}else n.copy(e.karts[0].state.position);let i=this.tmpB;e.karts[0].forwardDir(i),i.lengthSq()<1e-6&&i.set(0,0,-1),i.y=0,i.normalize();let a=this.tmpC.set(-i.z,0,i.x),o=n.clone().addScaledVector(i,18).addScaledVector(a,11);o.y+=6.5;let s=n.clone();s.y+=.8,e.followCamera.setCinematic(o,s,3,46),e.raceManager.startCountdown(),this.setState(`countdown`),this.playMusic(`race`)}onPlayerFinished(e){if(this.state===`racing`||this.state===`countdown`){try{e.playerAutoDriver=new T_(e.karts[0],`normal`,0)}catch(t){console.warn(`[Game] could not create auto-driver for the player`,t),e.playerAutoDriver=null}this.postfxOk&&this.safe(()=>this.postfx.flash(16777215,.35)),this.setState(`finished`),e.raceManager.allFinished&&(e.resultsTimer=sx)}}enterResults(){let e=this.race;!e||this.state===`results`||(e.hud.hide(),this.results.show(e.raceManager.getStandings()),this.setState(`results`),this.playMusic(`results`))}pause(){(this.state===`countdown`||this.state===`racing`||this.state===`finished`)&&(this.prePauseState=this.state,this.setState(`paused`),this.pauseMenu.show(),q.emit(`game:pause`,{}))}resume(){this.state===`paused`&&(this.pauseMenu.hide(),this.accumulator=0,this.pendingUseItem=!1,this.setState(this.prePauseState),q.emit(`game:resume`,{}))}leavePause(){this.pauseMenu.hide(),this.state===`paused`&&q.emit(`game:resume`,{})}disposeRace(){let e=this.race;if(e){this.race=null;for(let t of e.unsubs)t();e.unsubs.length=0,this.scene.remove(e.track.object);for(let t of e.karts)this.scene.remove(t.object);this.scene.remove(e.items.object),this.scene.remove(e.sun,e.sun.target,e.hemi,e.fill,e.fill.target),e.sun.dispose(),e.hemi.dispose(),e.fill.dispose(),this.scene.fog=null,this.safe(()=>e.items.dispose());for(let t of e.karts)this.safe(()=>t.dispose());this.safe(()=>e.track.dispose()),e.raceManager.dispose(),e.followCamera.dispose(),e.hud.dispose(),this.safe(()=>this.particles.reset()),this.postfxOk&&this.safe(()=>{this.postfx.setSpeedEffect(0),this.postfx.setBoostEffect(0),this.postfx.setHitEffect(0)}),this.accumulator=0,this.pendingUseItem=!1}}playMusic(e){this.currentMusic=e,this.safe(()=>this.audio.playMusic(e))}onGesture=()=>{this.audioStarted||(this.audioStarted=!0,window.removeEventListener(`pointerdown`,this.onGesture),window.removeEventListener(`keydown`,this.onGesture),this.audio.init().then(()=>{this.currentMusic!==`none`&&this.safe(()=>this.audio.playMusic(this.currentMusic))}).catch(e=>{console.warn(`[Game] audio init failed`,e),this.audioStarted=!1,window.addEventListener(`pointerdown`,this.onGesture,{passive:!0}),window.addEventListener(`keydown`,this.onGesture)}))};toggleMute(){let e=!this.audio.muted;this.safe(()=>this.audio.setMuted(e)),this.muteIndicator.classList.toggle(`visible`,e)}onResize=()=>{let e=Math.max(1,this.container.clientWidth||window.innerWidth),t=Math.max(1,this.container.clientHeight||window.innerHeight),n=Math.min(window.devicePixelRatio||1,2);if(this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.postfxOk)try{this.postfx.setSize(e,t,n)}catch(e){console.error(`[Game] PostFX resize failed`,e),this.postfxOk=!1}};onKeyDown=e=>{e.repeat||(e.key===`m`||e.key===`M`)&&this.toggleMute()};onBlur=()=>{(this.state===`racing`||this.state===`countdown`)&&this.pause()};onVisibility=()=>{document.hidden&&this.onBlur()};safe(e){try{e()}catch(e){console.error(`[Game]`,e)}}};function mx(){try{return document.createElement(`canvas`).getContext(`webgl2`,{failIfMajorPerformanceCaveat:!1})instanceof WebGL2RenderingContext}catch{return!1}}function hx(t,n,r){t.replaceChildren();let i=$(`div`,`glass panel fatal-panel`,void 0,$(`div`,`fatal`,void 0,t));$(`div`,`panel-kicker`,e,i),$(`h2`,`panel-title`,n,i),$(`p`,`fatal-body`,r,i);let a=$(`button`,`btn primary`,`RELOAD`,i);a.type=`button`,a.addEventListener(`click`,()=>window.location.reload())}function gx(){let e=document.getElementById(`app`)??$(`div`,``,void 0,document.body);if(e.id=`app`,!mx()){hx(e,`WEBGL2 REQUIRED`,`Turbo Kart Rush needs a browser with WebGL 2 and hardware acceleration enabled. Try the latest Chrome, Edge, Firefox or Safari, and make sure GPU acceleration is switched on.`);return}let t=0,n=(e,n)=>{console.error(e,n),t<3&&(t++,ix(e,`error`))};window.addEventListener(`error`,e=>{n(`Runtime error: ${e.message||`unknown`}`,e.error)}),window.addEventListener(`unhandledrejection`,e=>{let t=e.reason instanceof Error?e.reason.message:String(e.reason);n(`Unhandled promise rejection: ${t}`,e.reason)});try{let t=new px(e);t.start(),window.__turboKartRush=t}catch(t){console.error(`[main] failed to start game`,t),hx(e,`FAILED TO START`,`Something went wrong while starting the game. Open the developer console for details, then reload.`)}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,gx,{once:!0}):gx();