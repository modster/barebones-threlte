import{s as x,n as _,k as S}from"../chunks/scheduler.5ead0948.js";import{S as j,i as k,g as f,m as d,s as q,h as g,j as h,n as v,f as u,c as y,a as m,x as $,o as E}from"../chunks/index.096152c6.js";import{d as C}from"../chunks/singletons.b97290c3.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=f("h1"),o=d(r),n=q(),i=f("p"),l=d(c)},l(e){t=g(e,"H1",{});var a=h(t);o=v(a,r),a.forEach(u),n=y(e),i=g(e,"P",{});var p=h(i);l=v(p,c),p.forEach(u)},m(e,a){m(e,t,a),$(t,o),m(e,n,a),m(e,i,a),$(i,l)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&E(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&E(l,c)},i:_,o:_,d(e){e&&(u(t),u(n),u(i))}}}function z(s,t,r){let o;return S(s,P,n=>r(0,o=n)),[o]}let F=class extends j{constructor(t){super(),k(this,t,z,w,x,{})}};export{F as component};
