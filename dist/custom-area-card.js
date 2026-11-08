var v2=Object.defineProperty;var x2=Object.getOwnPropertyDescriptor;var m=(L,H,C,V)=>{for(var M=V>1?void 0:V?x2(H,C):H,r=L.length-1,e;r>=0;r--)(e=L[r])&&(M=(V?e(H,C,M):e(M))||M);return V&&M&&v2(H,C,M),M};var s1="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var c1="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M7 7H9V9H7V7M7 11H9V13H7V11M7 15H9V17H7V15M17 17H11V15H17V17M17 13H11V11H17V13M17 9H11V7H17V9Z";var O1="M4,9H20V11H4V9M4,13H14V15H4V13Z";var h1="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.9 21.11 2 20 2M4 6L6 4H10.9L4 10.9V6M4 13.7L13.7 4H18.6L4 18.6V13.7M20 18L18 20H13.1L20 13.1V18M20 10.3L10.3 20H5.4L20 5.4V10.3Z";var U=globalThis,G=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V1=Symbol(),g1=new WeakMap,b=class{constructor(H,C,V){if(this._$cssResult$=!0,V!==V1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=H,this.t=C}get styleSheet(){let H=this.o,C=this.t;if(G&&H===void 0){let V=C!==void 0&&C.length===1;V&&(H=g1.get(C)),H===void 0&&((this.o=H=new CSSStyleSheet).replaceSync(this.cssText),V&&g1.set(C,H))}return H}toString(){return this.cssText}},f1=L=>new b(typeof L=="string"?L:L+"",void 0,V1),T=(L,...H)=>{let C=L.length===1?L[0]:H.reduce((V,M,r)=>V+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(M)+L[r+1],L[0]);return new b(C,L,V1)},k1=(L,H)=>{if(G)L.adoptedStyleSheets=H.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of H){let V=document.createElement("style"),M=U.litNonce;M!==void 0&&V.setAttribute("nonce",M),V.textContent=C.cssText,L.appendChild(V)}},L1=G?L=>L:L=>L instanceof CSSStyleSheet?(H=>{let C="";for(let V of H.cssRules)C+=V.cssText;return f1(C)})(L):L;var{is:n2,defineProperty:l2,getOwnPropertyDescriptor:Z2,getOwnPropertyNames:S2,getOwnPropertySymbols:u2,getPrototypeOf:s2}=Object,Q=globalThis,B1=Q.trustedTypes,c2=B1?B1.emptyScript:"",O2=Q.reactiveElementPolyfillSupport,F=(L,H)=>L,R={toAttribute(L,H){switch(H){case Boolean:L=L?c2:null;break;case Object:case Array:L=L==null?L:JSON.stringify(L)}return L},fromAttribute(L,H){let C=L;switch(H){case Boolean:C=L!==null;break;case Number:C=L===null?null:Number(L);break;case Object:case Array:try{C=JSON.parse(L)}catch{C=null}}return C}},z=(L,H)=>!n2(L,H),P1={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:z};Symbol.metadata??=Symbol("metadata"),Q.litPropertyMetadata??=new WeakMap;var n=class extends HTMLElement{static addInitializer(H){this._$Ei(),(this.l??=[]).push(H)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(H,C=P1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(H)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(H,C),!C.noAccessor){let V=Symbol(),M=this.getPropertyDescriptor(H,V,C);M!==void 0&&l2(this.prototype,H,M)}}static getPropertyDescriptor(H,C,V){let{get:M,set:r}=Z2(this.prototype,H)??{get(){return this[C]},set(e){this[C]=e}};return{get:M,set(e){let i=M?.call(this);r?.call(this,e),this.requestUpdate(H,i,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(H){return this.elementProperties.get(H)??P1}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let H=s2(this);H.finalize(),H.l!==void 0&&(this.l=[...H.l]),this.elementProperties=new Map(H.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let C=this.properties,V=[...S2(C),...u2(C)];for(let M of V)this.createProperty(M,C[M])}let H=this[Symbol.metadata];if(H!==null){let C=litPropertyMetadata.get(H);if(C!==void 0)for(let[V,M]of C)this.elementProperties.set(V,M)}this._$Eh=new Map;for(let[C,V]of this.elementProperties){let M=this._$Eu(C,V);M!==void 0&&this._$Eh.set(M,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(H){let C=[];if(Array.isArray(H)){let V=new Set(H.flat(1/0).reverse());for(let M of V)C.unshift(L1(M))}else H!==void 0&&C.push(L1(H));return C}static _$Eu(H,C){let V=C.attribute;return V===!1?void 0:typeof V=="string"?V:typeof H=="string"?H.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(H=>this.enableUpdating=H),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(H=>H(this))}addController(H){(this._$EO??=new Set).add(H),this.renderRoot!==void 0&&this.isConnected&&H.hostConnected?.()}removeController(H){this._$EO?.delete(H)}_$E_(){let H=new Map,C=this.constructor.elementProperties;for(let V of C.keys())this.hasOwnProperty(V)&&(H.set(V,this[V]),delete this[V]);H.size>0&&(this._$Ep=H)}createRenderRoot(){let H=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return k1(H,this.constructor.elementStyles),H}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(H=>H.hostConnected?.())}enableUpdating(H){}disconnectedCallback(){this._$EO?.forEach(H=>H.hostDisconnected?.())}attributeChangedCallback(H,C,V){this._$AK(H,V)}_$ET(H,C){let V=this.constructor.elementProperties.get(H),M=this.constructor._$Eu(H,V);if(M!==void 0&&V.reflect===!0){let r=(V.converter?.toAttribute!==void 0?V.converter:R).toAttribute(C,V.type);this._$Em=H,r==null?this.removeAttribute(M):this.setAttribute(M,r),this._$Em=null}}_$AK(H,C){let V=this.constructor,M=V._$Eh.get(H);if(M!==void 0&&this._$Em!==M){let r=V.getPropertyOptions(M),e=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:R;this._$Em=M;let i=e.fromAttribute(C,r.type);this[M]=i??this._$Ej?.get(M)??i,this._$Em=null}}requestUpdate(H,C,V,M=!1,r){if(H!==void 0){let e=this.constructor;if(M===!1&&(r=this[H]),V??=e.getPropertyOptions(H),!((V.hasChanged??z)(r,C)||V.useDefault&&V.reflect&&r===this._$Ej?.get(H)&&!this.hasAttribute(e._$Eu(H,V))))return;this.C(H,C,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(H,C,{useDefault:V,reflect:M,wrapped:r},e){V&&!(this._$Ej??=new Map).has(H)&&(this._$Ej.set(H,e??C??this[H]),r!==!0||e!==void 0)||(this._$AL.has(H)||(this.hasUpdated||V||(C=void 0),this._$AL.set(H,C)),M===!0&&this._$Em!==H&&(this._$Eq??=new Set).add(H))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let H=this.scheduleUpdate();return H!=null&&await H,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[M,r]of this._$Ep)this[M]=r;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[M,r]of V){let{wrapped:e}=r,i=this[M];e!==!0||this._$AL.has(M)||i===void 0||this.C(M,void 0,r,i)}}let H=!1,C=this._$AL;try{H=this.shouldUpdate(C),H?(this.willUpdate(C),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(C)):this._$EM()}catch(V){throw H=!1,this._$EM(),V}H&&this._$AE(C)}willUpdate(H){}_$AE(H){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(H)),this.updated(H)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(H){return!0}update(H){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(H){}firstUpdated(H){}};n.elementStyles=[],n.shadowRootOptions={mode:"open"},n[F("elementProperties")]=new Map,n[F("finalized")]=new Map,O2?.({ReactiveElement:n}),(Q.reactiveElementVersions??=[]).push("2.1.2");var o1=globalThis,y1=L=>L,K=o1.trustedTypes,w1=K?K.createPolicy("lit-html",{createHTML:L=>L}):void 0,D1="$lit$",c=`lit$${Math.random().toFixed(9).slice(2)}$`,_1="?"+c,h2=`<${_1}>`,f=document,D=()=>f.createComment(""),_=L=>L===null||typeof L!="object"&&typeof L!="function",a1=Array.isArray,g2=L=>a1(L)||typeof L?.[Symbol.iterator]=="function",M1=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,b1=/-->/g,T1=/>/g,h=RegExp(`>|${M1}(?:([^\\s"'>=/]+)(${M1}*=${M1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),F1=/'/g,R1=/"/g,N1=/^(?:script|style|textarea|title)$/i,d1=L=>(H,...C)=>({_$litType$:L,strings:H,values:C}),p=d1(1),G2=d1(2),Q2=d1(3),l=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E1=new WeakMap,g=f.createTreeWalker(f,129);function W1(L,H){if(!a1(L)||!L.hasOwnProperty("raw"))throw Error("invalid template strings array");return w1!==void 0?w1.createHTML(H):H}var f2=(L,H)=>{let C=L.length-1,V=[],M,r=H===2?"<svg>":H===3?"<math>":"",e=E;for(let i=0;i<C;i++){let t=L[i],o,d,a=-1,x=0;for(;x<t.length&&(e.lastIndex=x,d=e.exec(t),d!==null);)x=e.lastIndex,e===E?d[1]==="!--"?e=b1:d[1]!==void 0?e=T1:d[2]!==void 0?(N1.test(d[2])&&(M=RegExp("</"+d[2],"g")),e=h):d[3]!==void 0&&(e=h):e===h?d[0]===">"?(e=M??E,a=-1):d[1]===void 0?a=-2:(a=e.lastIndex-d[2].length,o=d[1],e=d[3]===void 0?h:d[3]==='"'?R1:F1):e===R1||e===F1?e=h:e===b1||e===T1?e=E:(e=h,M=void 0);let s=e===h&&L[i+1].startsWith("/>")?" ":"";r+=e===E?t+h2:a>=0?(V.push(o),t.slice(0,a)+D1+t.slice(a)+c+s):t+c+(a===-2?i:s)}return[W1(L,r+(L[C]||"<?>")+(H===2?"</svg>":H===3?"</math>":"")),V]},N=class L{constructor({strings:H,_$litType$:C},V){let M;this.parts=[];let r=0,e=0,i=H.length-1,t=this.parts,[o,d]=f2(H,C);if(this.el=L.createElement(o,V),g.currentNode=this.el.content,C===2||C===3){let a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(M=g.nextNode())!==null&&t.length<i;){if(M.nodeType===1){if(M.hasAttributes())for(let a of M.getAttributeNames())if(a.endsWith(D1)){let x=d[e++],s=M.getAttribute(a).split(c),$=/([.?@])?(.*)/.exec(x);t.push({type:1,index:r,name:$[2],strings:s,ctor:$[1]==="."?e1:$[1]==="?"?t1:$[1]==="@"?i1:P}),M.removeAttribute(a)}else a.startsWith(c)&&(t.push({type:6,index:r}),M.removeAttribute(a));if(N1.test(M.tagName)){let a=M.textContent.split(c),x=a.length-1;if(x>0){M.textContent=K?K.emptyScript:"";for(let s=0;s<x;s++)M.append(a[s],D()),g.nextNode(),t.push({type:2,index:++r});M.append(a[x],D())}}}else if(M.nodeType===8)if(M.data===_1)t.push({type:2,index:r});else{let a=-1;for(;(a=M.data.indexOf(c,a+1))!==-1;)t.push({type:7,index:r}),a+=c.length-1}r++}}static createElement(H,C){let V=f.createElement("template");return V.innerHTML=H,V}};function B(L,H,C=L,V){if(H===l)return H;let M=V!==void 0?C._$Co?.[V]:C._$Cl,r=_(H)?void 0:H._$litDirective$;return M?.constructor!==r&&(M?._$AO?.(!1),r===void 0?M=void 0:(M=new r(L),M._$AT(L,C,V)),V!==void 0?(C._$Co??=[])[V]=M:C._$Cl=M),M!==void 0&&(H=B(L,M._$AS(L,H.values),M,V)),H}var r1=class{constructor(H,C){this._$AV=[],this._$AN=void 0,this._$AD=H,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(H){let{el:{content:C},parts:V}=this._$AD,M=(H?.creationScope??f).importNode(C,!0);g.currentNode=M;let r=g.nextNode(),e=0,i=0,t=V[0];for(;t!==void 0;){if(e===t.index){let o;t.type===2?o=new W(r,r.nextSibling,this,H):t.type===1?o=new t.ctor(r,t.name,t.strings,this,H):t.type===6&&(o=new A1(r,this,H)),this._$AV.push(o),t=V[++i]}e!==t?.index&&(r=g.nextNode(),e++)}return g.currentNode=f,M}p(H){let C=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(H,V,C),C+=V.strings.length-2):V._$AI(H[C])),C++}},W=class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(H,C,V,M){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=H,this._$AB=C,this._$AM=V,this.options=M,this._$Cv=M?.isConnected??!0}get parentNode(){let H=this._$AA.parentNode,C=this._$AM;return C!==void 0&&H?.nodeType===11&&(H=C.parentNode),H}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(H,C=this){H=B(this,H,C),_(H)?H===A||H==null||H===""?(this._$AH!==A&&this._$AR(),this._$AH=A):H!==this._$AH&&H!==l&&this._(H):H._$litType$!==void 0?this.$(H):H.nodeType!==void 0?this.T(H):g2(H)?this.k(H):this._(H)}O(H){return this._$AA.parentNode.insertBefore(H,this._$AB)}T(H){this._$AH!==H&&(this._$AR(),this._$AH=this.O(H))}_(H){this._$AH!==A&&_(this._$AH)?this._$AA.nextSibling.data=H:this.T(f.createTextNode(H)),this._$AH=H}$(H){let{values:C,_$litType$:V}=H,M=typeof V=="number"?this._$AC(H):(V.el===void 0&&(V.el=N.createElement(W1(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===M)this._$AH.p(C);else{let r=new r1(M,this),e=r.u(this.options);r.p(C),this.T(e),this._$AH=r}}_$AC(H){let C=E1.get(H.strings);return C===void 0&&E1.set(H.strings,C=new N(H)),C}k(H){a1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,V,M=0;for(let r of H)M===C.length?C.push(V=new L(this.O(D()),this.O(D()),this,this.options)):V=C[M],V._$AI(r),M++;M<C.length&&(this._$AR(V&&V._$AB.nextSibling,M),C.length=M)}_$AR(H=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);H!==this._$AB;){let V=y1(H).nextSibling;y1(H).remove(),H=V}}setConnected(H){this._$AM===void 0&&(this._$Cv=H,this._$AP?.(H))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(H,C,V,M,r){this.type=1,this._$AH=A,this._$AN=void 0,this.element=H,this.name=C,this._$AM=M,this.options=r,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=A}_$AI(H,C=this,V,M){let r=this.strings,e=!1;if(r===void 0)H=B(this,H,C,0),e=!_(H)||H!==this._$AH&&H!==l,e&&(this._$AH=H);else{let i=H,t,o;for(H=r[0],t=0;t<r.length-1;t++)o=B(this,i[V+t],C,t),o===l&&(o=this._$AH[t]),e||=!_(o)||o!==this._$AH[t],o===A?H=A:H!==A&&(H+=(o??"")+r[t+1]),this._$AH[t]=o}e&&!M&&this.j(H)}j(H){H===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,H??"")}},e1=class extends P{constructor(){super(...arguments),this.type=3}j(H){this.element[this.name]=H===A?void 0:H}},t1=class extends P{constructor(){super(...arguments),this.type=4}j(H){this.element.toggleAttribute(this.name,!!H&&H!==A)}},i1=class extends P{constructor(H,C,V,M,r){super(H,C,V,M,r),this.type=5}_$AI(H,C=this){if((H=B(this,H,C,0)??A)===l)return;let V=this._$AH,M=H===A&&V!==A||H.capture!==V.capture||H.once!==V.once||H.passive!==V.passive,r=H!==A&&(V===A||M);M&&this.element.removeEventListener(this.name,this,V),r&&this.element.addEventListener(this.name,this,H),this._$AH=H}handleEvent(H){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,H):this._$AH.handleEvent(H)}},A1=class{constructor(H,C,V){this.element=H,this.type=6,this._$AN=void 0,this._$AM=C,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(H){B(this,H)}};var k2=o1.litHtmlPolyfillSupport;k2?.(N,W),(o1.litHtmlVersions??=[]).push("3.3.3");var I1=(L,H,C)=>{let V=C?.renderBefore??H,M=V._$litPart$;if(M===void 0){let r=C?.renderBefore??null;V._$litPart$=M=new W(H.insertBefore(D(),r),r,void 0,C??{})}return M._$AI(L),M};var p1=globalThis,v=class extends n{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let H=super.createRenderRoot();return this.renderOptions.renderBefore??=H.firstChild,H}update(H){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(H),this._$Do=I1(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return l}};v._$litElement$=!0,v.finalized=!0,p1.litElementHydrateSupport?.({LitElement:v});var B2=p1.litElementPolyfillSupport;B2?.({LitElement:v});(p1.litElementVersions??=[]).push("4.2.2");var q=L=>(H,C)=>{C!==void 0?C.addInitializer(()=>{customElements.define(L,H)}):customElements.define(L,H)};var P2={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:z},y2=(L=P2,H,C)=>{let{kind:V,metadata:M}=C,r=globalThis.litPropertyMetadata.get(M);if(r===void 0&&globalThis.litPropertyMetadata.set(M,r=new Map),V==="setter"&&((L=Object.create(L)).wrapped=!0),r.set(C.name,L),V==="accessor"){let{name:e}=C;return{set(i){let t=H.get.call(this);H.set.call(this,i),this.requestUpdate(e,t,L,!0,i)},init(i){return i!==void 0&&this.C(e,void 0,L,i),i}}}if(V==="setter"){let{name:e}=C;return function(i){let t=this[e];H.call(this,i),this.requestUpdate(e,t,L,!0,i)}}throw Error("Unsupported decorator location: "+V)};function k(L){return(H,C)=>typeof C=="object"?y2(L,H,C):((V,M,r)=>{let e=M.hasOwnProperty(r);return M.constructor.createProperty(r,V),e?Object.getOwnPropertyDescriptor(M,r):void 0})(L,H,C)}function y(L){return k({...L,state:!0,attribute:!1})}var w=L=>L??A;var $1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},U1=L=>(...H)=>({_$litDirective$:L,values:H}),X=class{constructor(H){}get _$AU(){return this._$AM._$AU}_$AT(H,C,V){this._$Ct=H,this._$AM=C,this._$Ci=V}_$AS(H,C){return this.update(H,C)}update(H,C){return this.render(...C)}};var G1="important",w2=" !"+G1,Q1=U1(class extends X{constructor(L){if(super(L),L.type!==$1.ATTRIBUTE||L.name!=="style"||L.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(L){return Object.keys(L).reduce((H,C)=>{let V=L[C];return V==null?H:H+`${C=C.includes("-")?C:C.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${V};`},"")}update(L,[H]){let{style:C}=L.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(H)),this.render(H);for(let V of this.ft)H[V]==null&&(this.ft.delete(V),V.includes("-")?C.removeProperty(V):C[V]=null);for(let V in H){let M=H[V];if(M!=null){this.ft.add(V);let r=typeof M=="string"&&M.endsWith(w2);V.includes("-")||r?C.setProperty(V,r?M.slice(0,-11):M,r?G1:""):C[V]=M}}return l}});var b2=["ha-tile-container","ha-tile-icon","ha-tile-info","hui-card-features"],z1,K1;async function m1(L,H){return customElements.get(H)||((await window.loadCardHelpers()).createCardElement(L),await customElements.whenDefined(H)),customElements.get(H)}function q1(){return z1??=(async()=>{await m1({type:"area",area:"_"},"hui-area-card"),customElements.get("hui-image")||await m1({type:"picture",image:""},"hui-picture-card"),await Promise.all(b2.map(L=>customElements.whenDefined(L)))})(),z1}function j1(){return K1??=(async()=>{let L=await m1({type:"area",area:"_"},"hui-area-card");customElements.get("hui-card-features-editor")||await L.getConfigElement(),await customElements.whenDefined("hui-card-features-editor")})(),K1}var Y={en:{name:"Custom area card",description:"The area card, with individually selected sensors in the details line.",sensors:"Sensors",sensors_helper:"Shown in the details line in this order. Unavailable sensors are hidden.",aggregated_sensors:"Aggregated sensors",aggregated_sensors_helper:"Each entry combines several sensors into one value, shown after the sensors above. Only sensors with the same unit as the first are combined.",aggregate:"Aggregation",aggregate_sum:"Sum",aggregate_min:"Minimum",aggregate_max:"Maximum",aggregate_avg:"Average",aggregate_median:"Median"},de:{name:"Benutzerdefinierte Bereichskarte",description:"Die Bereichskarte, mit einzeln ausgew\xE4hlten Sensoren in der Detailzeile.",sensors:"Sensoren",sensors_helper:"Werden in dieser Reihenfolge in der Detailzeile angezeigt. Nicht verf\xFCgbare Sensoren werden ausgeblendet.",aggregated_sensors:"Aggregierte Sensoren",aggregated_sensors_helper:"Jeder Eintrag fasst mehrere Sensoren zu einem Wert zusammen, angezeigt nach den Sensoren oben. Es werden nur Sensoren mit derselben Einheit wie der erste zusammengefasst.",aggregate:"Aggregation",aggregate_sum:"Summe",aggregate_min:"Minimum",aggregate_max:"Maximum",aggregate_avg:"Durchschnitt",aggregate_median:"Median"}};function Z(L,H){let C=(L||"en").toLowerCase();return(Y[C]??Y[C.split("-")[0]]??Y.en)[H]??Y.en[H]}var Y1="16:9",v1=["motion","moisture"];var J1=new Set(["unavailable","unknown"]),T2=2,X1=L=>Array.isArray(L)&&L.every(H=>typeof H=="string");function x1(L){if(L.sensors!==void 0&&!X1(L.sensors))throw new Error("sensors must be a list of entity IDs");let H=L.aggregated_sensors;if(H!==void 0&&(!Array.isArray(H)||!H.every(C=>C&&typeof C=="object"&&X1(C.entities)&&(C.aggregate===void 0||J.includes(C.aggregate)))))throw new Error(`aggregated_sensors must be a list of {entities: [entity IDs], aggregate: ${J.join(" | ")}}`)}function C2(L){if(!L.area)throw new Error("Specify an area");x1(L);let H=L.display_type||(L.show_camera?"camera":"picture"),C=H==="compact"?L.vertical:!1,V=L.tap_action;L.navigation_path&&!V&&(V={action:"navigate",navigation_path:L.navigation_path});let M=L.image_tap_action;return H==="camera"&&!M&&(M={action:"more-info"}),{...L,vertical:C,display_type:H,tap_action:V||{action:"none"},image_tap_action:M}}function H2(L){let H=Object.values(L.areas)[0],C=[H?.temperature_entity_id,H?.humidity_entity_id].filter(V=>!!V);return{type:"custom:custom-area-card",area:H?.area_id||"",...C.length?{sensors:C}:{}}}var I=L=>L!==void 0&&L.action!=="none";function n1(L,H,{domain:C,deviceClasses:V,exclude:M}){let r=new Set(Array.isArray(C)?C:[C]),e=V?new Set(V):void 0;return Object.values(L.entities).filter(i=>{let t=i.entity_id,o=L.states[t];return!o||M?.includes(t)||!r.has(t.split(".")[0])||e&&!e.has(o.attributes.device_class||"none")||i.hidden||i.entity_category?!1:(i.area_id??(i.device_id?L.devices[i.device_id]?.area_id:null))===H}).map(i=>i.entity_id)}function V2(L,H){return n1(L,H,{domain:"camera"})[0]}var L2=(L,H,C,V)=>n1(L,H,{domain:"binary_sensor",deviceClasses:C,exclude:V});function M2(L,H,C){return H?H.map(V=>C.map(M=>L.states[M]).find(M=>M?.attributes.device_class===V&&M.state==="on")).filter(V=>!!V):[]}function F2(L,H){if(H?.length)return H.map(C=>L.states[C]).filter(C=>C&&!J1.has(C.state)).map(C=>L.formatEntityState(C)).filter(Boolean).join(" \xB7 ")}var J=["sum","min","max","avg","median"],l1="avg";function R2(L,H){switch(H){case"sum":return L.reduce((C,V)=>C+V,0);case"min":return Math.min(...L);case"max":return Math.max(...L);case"avg":return L.reduce((C,V)=>C+V,0)/L.length;case"median":{let C=[...L].sort((M,r)=>M-r),V=Math.floor(C.length/2);return C.length%2?C[V]:(C[V-1]+C[V])/2}}}function E2(L,H){let C,V=[];for(let r of H.entities){let e=L.states[r];if(!e||J1.has(e.state)||e.state.trim()==="")continue;let i=Number(e.state);Number.isFinite(i)&&(C??=e,e.attributes.unit_of_measurement===C.attributes.unit_of_measurement&&V.push(i))}if(!C)return;let M=R2(V,H.aggregate??l1);return L.entities[C.entity_id]?.display_precision==null&&(M=Math.round(M*10)/10),L.formatEntityState(C,String(M))}function r2(L,H){let C=F2(L,H.sensors),V=H.aggregated_sensors?.length?H.aggregated_sensors.map(M=>E2(L,M)):void 0;if(!(C===void 0&&V===void 0))return[C,...V??[]].filter(Boolean).join(" \xB7 ")}function S(L){let H,C;return(...V)=>(H&&H.length===V.length&&V.every((M,r)=>M===H[r])||(H=V,C=L(...V)),C)}var D2=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white","primary-text","secondary-text","disabled"]),e2=L=>D2.has(L)?`var(--${L}-color)`:L,C1=L=>L.vertical?"bottom":L.features_position||"bottom";function Z1(L){let H=L.features??[];if(C1(L)!=="inline")return{inline:[],below:H,columns:1};let C=H.slice(1);return{inline:H.slice(0,1),below:C,columns:Math.min(C.length,T2)}}function t2(L){let{below:H,columns:C}=Z1(L);return Math.ceil(H.length/Math.max(C,1))}function i2(L){return 1+((L?.display_type||"picture")==="compact"?L?.vertical?1:0:2)+(L?t2(L):0)}function A2(L){let H=6,C=6,V=1,M=L?C1(L):"bottom",r=L?.features?.length||0;return L&&r&&(M==="inline"&&(C=12,H=12),V+=t2(L)),L?.vertical&&(V++,C=3),(L?.display_type||"picture")!=="compact"&&(V+=M==="inline"&&r>0?3:2),{columns:H,rows:V,min_columns:C,min_rows:V}}function o2(L){let H=L.display_type||(L.show_camera?"camera":"picture"),C=!!L.vertical&&H==="compact",V={camera_view:"auto",alert_classes:v1,display_type:H,content_layout:C?"vertical":"horizontal",...L};return delete V.show_camera,L.navigation_path&&!L.tap_action&&(V.tap_action={action:"navigate",navigation_path:L.navigation_path}),(!V.features_position||C)&&(V.features_position="bottom"),V}function a2(L,H){let C={features:H,...L};if(C.features||delete C.features,delete C.show_camera,C.tap_action&&C.navigation_path&&delete C.navigation_path,C.display_type!=="camera"&&delete C.camera_view,C.image_tap_action&&(C.display_type==="compact"||C.display_type!=="camera"&&C.image_tap_action.action==="more-info")&&delete C.image_tap_action,C.content_layout&&(C.vertical=C.content_layout==="vertical",delete C.content_layout),Array.isArray(C.sensors)&&C.sensors.length===0&&delete C.sensors,Array.isArray(C.aggregated_sensors)){let V=C.aggregated_sensors.filter(M=>M?.entities?.length);V.length?C.aggregated_sensors=V:delete C.aggregated_sensors}return C}function d2(L,H,C){if(!H)return[];let V=n1(L,H,{domain:"binary_sensor",exclude:C}).map(M=>L.states[M].attributes.device_class).filter(M=>!!M);return[...new Set(V)]}var p2={entity_id:"entity",area_id:"area"};function H1(L,H,C){L.dispatchEvent(new CustomEvent(H,{detail:C,bubbles:!0,composed:!0}))}var O=class extends v{constructor(){super(...arguments);this._loaded=!1;this._featureContext=S((C,V)=>({area_id:C,exclude_entities:V}));this._schema=S((C,V,M,r)=>[{name:"area",selector:{area:{}}},{name:"content",flatten:!0,type:"expandable",iconPath:O1,schema:[{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"color",selector:{ui_color:{}}},{name:"display_type",required:!0,selector:{select:{options:["compact","icon","picture","camera"].map(e=>({value:e,label:C(`ui.panel.lovelace.editor.card.area.display_type_options.${e}`)})),mode:"dropdown"}}},...M==="compact"?[{name:"content_layout",required:!0,selector:{select:{mode:"dropdown",options:["horizontal","vertical"].map(e=>({value:e,label:C(`ui.panel.lovelace.editor.card.area.content_layout_options.${e}`)}))}}}]:[],...M==="camera"?[{name:"camera_view",selector:{select:{options:["auto","live"].map(e=>({value:e,label:C(`ui.panel.lovelace.editor.card.generic.camera_view_options.${e}`)})),mode:"dropdown"}}}]:[]]},{name:"alert_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:r}}},{name:"sensors",selector:{entity:{multiple:!0,reorder:!0,filter:{domain:"sensor"}}}},{name:"aggregated_sensors",selector:{object:{multiple:!0,reorder:!0,fields:{entities:{label:Z(V,"sensors"),required:!0,selector:{entity:{multiple:!0,filter:{domain:"sensor"}}}},aggregate:{label:Z(V,"aggregate"),required:!0,default:l1,selector:{select:{mode:"dropdown",options:J.map(e=>({value:e,label:Z(V,`aggregate_${e}`)}))}}}}}}}]},{name:"interactions",type:"expandable",flatten:!0,iconPath:s1,schema:[{name:"tap_action",selector:{ui_action:{default_action:"none",actions:["navigate","url","perform-action","none"]}},context:p2},...M!=="compact"?[{name:"image_tap_action",selector:{ui_action:{default_action:M==="camera"?"more-info":"none",actions:M==="camera"?["more-info","navigate","url","perform-action","none"]:["navigate","url","perform-action","none"]}},context:p2}]:[]]}]);this._featuresSchema=S((C,V)=>[{name:"features_position",required:!0,selector:{select:{mode:"box",options:["bottom","inline"].map(M=>({label:C(`ui.panel.lovelace.editor.card.tile.features_position_options.${M}`),description:C(`ui.panel.lovelace.editor.card.tile.features_position_options.${M}_description`),value:M,image:{src:`/static/images/form/tile_features_position_${M}.svg`,src_dark:`/static/images/form/tile_features_position_${M}_dark.svg`,flip_rtl:!0},disabled:V&&M==="inline"}))}}}]);this._binaryOptions=S((C,V,M,r)=>{let e=this.hass,i=d2(e,V,M);return[...new Set([...i,...r])].map(t=>({value:t,label:e.localize(`component.binary_sensor.entity_component.${t}.name`)||t})).sort((t,o)=>t.label.localeCompare(o.label,e.locale.language,{sensitivity:"base"}))});this._computeHelper=C=>{switch(C.name){case"alert_classes":return this._config?.display_type==="compact"?this.hass.localize("ui.panel.lovelace.editor.card.area.alert_classes_helper"):void 0;case"sensors":case"aggregated_sensors":return Z(this.hass.locale.language,`${C.name}_helper`);default:return}};this._computeLabel=C=>{let V=this.hass.localize;switch(C.name){case"area":return V("ui.panel.lovelace.editor.card.area.name");case"sensors":case"aggregated_sensors":return Z(this.hass.locale.language,C.name);case"name":case"camera_view":case"content":case"interactions":case"tap_action":return V(`ui.panel.lovelace.editor.card.generic.${C.name}`);case"features_position":return V(`ui.panel.lovelace.editor.card.tile.${C.name}`);default:return V(`ui.panel.lovelace.editor.card.area.${C.name}`)}}}connectedCallback(){super.connectedCallback(),this._loaded||j1().then(()=>this._loaded=!0,C=>console.error("custom-area-card: could not load editor components",C))}setConfig(C){x1(C);let V=C.display_type||(C.show_camera?"camera":"picture");this._config={...C,display_type:V},delete this._config.show_camera}render(){if(!this.hass||!this._config||!this._loaded)return A;let C=this._config,V=C.display_type||"picture",M=!!C.vertical&&V==="compact",r=o2(C),e=this._schema(this.hass.localize,this.hass.locale.language,V,this._binaryOptions(this.hass.entities,C.area,C.exclude_entities,C.alert_classes||v1)),i=this._featureContext(C.area,C.exclude_entities),t=!!(C.area&&this.hass.areas[C.area]);return p`
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${e}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${c1}></ha-svg-icon>
        <h3 slot="header">
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.features")}
        </h3>
        <div class="content">
          ${t?p`
                <ha-form
                  class="features-form"
                  .hass=${this.hass}
                  .data=${r}
                  .schema=${this._featuresSchema(this.hass.localize,M)}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
              `:A}
          <hui-card-features-editor
            .hass=${this.hass}
            .context=${i}
            .features=${C.features??[]}
            @features-changed=${this._featuresChanged}
            @edit-detail-element=${this._editDetailElement}
          ></hui-card-features-editor>
        </div>
      </ha-expansion-panel>
    `}_valueChanged(C){C.stopPropagation(),H1(this,"config-changed",{config:a2(C.detail.value,this._config.features)})}_featuresChanged(C){C.stopPropagation();let V=C.detail.features,M={...this._config,features:V};V.length===0&&delete M.features,H1(this,"config-changed",{config:M})}_editDetailElement(C){C.stopPropagation();let V=C.detail.subElementConfig.index;H1(this,"edit-sub-element",{config:this._config.features[V],saveConfig:M=>this._updateFeature(V,M),context:this._featureContext(this._config.area,this._config.exclude_entities),type:"feature"})}_updateFeature(C,V){let M=[...this._config.features];M[C]=V,H1(this,"config-changed",{config:{...this._config,features:M}})}};O.styles=T`
    ha-form {
      display: block;
      margin-bottom: 24px;
    }
    .features-form {
      margin-bottom: 8px;
    }
    ha-expansion-panel {
      display: block;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-border-radius-md);
      --ha-card-border-radius: var(--ha-border-radius-md);
    }
    ha-expansion-panel .content {
      padding: 12px;
    }
    ha-expansion-panel > *[slot="header"] {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }
    ha-expansion-panel ha-svg-icon {
      color: var(--secondary-text-color);
    }
  `,m([k({attribute:!1})],O.prototype,"hass",2),m([y()],O.prototype,"_config",2),m([y()],O.prototype,"_loaded",2),O=m([q("custom-area-card-editor")],O);var S1="custom-area-card",u=class extends v{constructor(){super(...arguments);this._loaded=!1;this._featureContext=S((C,V)=>({area_id:C,exclude_entities:V}));this._alertEntityIds=S((C,V,M,r)=>L2(this.hass,V,M,r));this._cameraEntity=S((C,V)=>V2(this.hass,V))}static async getConfigElement(){return document.createElement("custom-area-card-editor")}static getStubConfig(C){return H2(C)}setConfig(C){this._config=C2(C)}getCardSize(){return i2(this._config)}getGridOptions(){return A2(this._config)}connectedCallback(){super.connectedCallback(),this._loaded||q1().then(()=>this._loaded=!0,C=>console.error(`${S1}: could not load card components`,C))}get _hasImageAction(){return this._config?.display_type==="compact"?!1:I(this._config?.image_tap_action)||I(this._config?.tap_action)}_fireAction(C,V){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:C,action:V},bubbles:!0,composed:!0}))}_handleAction(C){this._fireAction(this._config,C.detail.action)}_handleImageAction(){let C=this._config;if(!I(C.image_tap_action)){this._fireAction(C,"tap");return}let V=C.display_type==="camera"?this._cameraEntity(this.hass.entities,C.area):void 0;this._fireAction({entity:V,tap_action:C.image_tap_action},"tap")}_handleImageKeyDown(C){(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),this._handleImageAction())}_alerts(){let{area:C,alert_classes:V,exclude_entities:M}=this._config;return V?M2(this.hass,V,this._alertEntityIds(this.hass.entities,C,V,M)):[]}_renderAlertBadge(){let[C]=this._alerts();return C?p`
      <ha-tile-badge class="alert-badge">
        <ha-state-icon .hass=${this.hass} .stateObj=${C}></ha-state-icon>
      </ha-tile-badge>
    `:A}_renderAlerts(){let C=this._alerts();return C.length===0?A:p`
      <div class="alerts">
        ${C.map(V=>p`
            <div class="alert">
              <ha-state-icon .hass=${this.hass} .stateObj=${V}></ha-state-icon>
            </div>
          `)}
      </div>
    `}_renderHeader(C,V){let M=this._config,r=this.hass.areas[V],e=C==="camera"?this._cameraEntity(this.hass.entities,V):void 0,t=this.layout==="grid"||this.layout==="panel"?void 0:M.aspect_ratio||Y1,o=this._hasImageAction;return p`
      <div class="header">
        <div
          class="picture"
          role=${w(o?"button":void 0)}
          tabindex=${w(o?"0":void 0)}
          @click=${o?this._handleImageAction:void 0}
          @keydown=${o?this._handleImageKeyDown:void 0}
        >
          ${(C==="picture"||C==="camera")&&(e||r.picture)?p`
                <hui-image
                  .hass=${this.hass}
                  .cameraImage=${e}
                  .cameraView=${M.camera_view}
                  .image=${r.picture||void 0}
                  fit-mode="cover"
                  .aspectRatio=${t}
                ></hui-image>
              `:p`
                <ha-aspect-ratio .aspectRatio=${t}>
                  <div class="icon-container">
                    ${r.icon?p`<ha-icon .icon=${r.icon}></ha-icon>`:A}
                  </div>
                </ha-aspect-ratio>
              `}
        </div>
        ${this._renderAlerts()}
      </div>
    `}render(){if(!this._config||!this.hass||!this._loaded)return A;let C=this._config,V=C.area?this.hass.areas[C.area]:void 0;if(!V)return p`
        <hui-warning>${this.hass.localize("ui.card.area.area_not_found")}</hui-warning>
      `;let M=C.display_type||"picture",r=C1(C),e=Z1(C),i=e.inline.length>0||e.below.length>0,t=this._featureContext(C.area,C.exclude_entities),o=V.icon||void 0,d=C.color?e2(C.color):void 0,a=M==="compact"&&this.layout==="grid"&&C.grid_options?.rows!=="auto";return p`
      <ha-card
        style=${Q1({"--tile-color":d})}
        role=${w(i?"group":void 0)}
        aria-labelledby=${w(i?"name":void 0)}
      >
        ${M==="compact"?A:this._renderHeader(M,V.area_id)}
        <ha-tile-container
          .featurePosition=${r}
          .vertical=${!!C.vertical}
          .fixedInfoHeight=${a}
          .interactive=${I(C.tap_action)}
          @action=${this._handleAction}
        >
          <ha-tile-icon slot="icon" .icon=${o} .iconPath=${o?void 0:h1}>
            ${M==="compact"?this._renderAlertBadge():A}
          </ha-tile-icon>
          <ha-tile-info
            slot="info"
            class=${w(C.vertical&&a?"twoline":void 0)}
            .secondary=${r2(this.hass,C)}
          >
            <span slot="primary" id="name">${C.name||V.name?.trim()}</span>
          </ha-tile-info>
          ${e.inline.length>0?p`
                <hui-card-features
                  slot="features-inline"
                  .hass=${this.hass}
                  .context=${t}
                  .color=${C.color}
                  .features=${e.inline}
                  .position=${r}
                ></hui-card-features>
              `:A}
          ${e.below.length>0?p`
                <hui-card-features
                  slot="features"
                  .columns=${e.columns}
                  .hass=${this.hass}
                  .context=${t}
                  .color=${C.color}
                  .features=${e.below}
                  .position=${"bottom"}
                ></hui-card-features>
              `:A}
        </ha-tile-container>
      </ha-card>
    `}};u.styles=T`
    :host {
      --tile-color: var(--state-icon-color);
    }
    ha-card:has(ha-tile-container[focused]) {
      --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
      --shadow-focus: 0 0 0 1px var(--tile-color);
      border-color: var(--tile-color);
      box-shadow: var(--shadow-default), var(--shadow-focus);
    }
    ha-card {
      height: 100%;
      transition:
        box-shadow 180ms ease-in-out,
        border-color 180ms ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    ha-tile-icon {
      --tile-icon-color: var(--tile-color);
    }
    .header {
      flex: 1;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg));
      border-end-end-radius: 0;
      border-end-start-radius: 0;
      position: relative;
      z-index: 1;
    }
    .picture {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
      pointer-events: none;
    }
    .picture[role="button"] {
      pointer-events: auto;
      cursor: pointer;
    }
    .picture[role="button"]:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .picture hui-image {
      height: 100%;
    }
    .picture .icon-container {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      --mdc-icon-size: var(--ha-space-12);
      color: var(--tile-color);
    }
    .picture .icon-container::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background-color: var(--tile-color);
      opacity: 0.12;
    }
    .header + ha-tile-container {
      height: auto;
      flex: none;
    }
    ha-tile-badge {
      position: absolute;
      top: 3px;
      right: 3px;
      inset-inline-end: 3px;
      inset-inline-start: initial;
    }
    hui-card-features {
      --feature-color: var(--tile-color);
    }
    .alert-badge {
      --tile-badge-background-color: var(--orange-color);
    }
    .alerts {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      gap: var(--ha-space-2);
      padding: var(--ha-space-2);
      pointer-events: none;
      z-index: 1;
    }
    .alert {
      background-color: var(--orange-color);
      border-radius: var(--ha-border-radius-lg);
      width: var(--ha-space-6);
      height: var(--ha-space-6);
      padding: 2px;
      box-sizing: border-box;
      --mdc-icon-size: var(--ha-space-4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    ha-tile-info.twoline {
      /* two wrapped lines inside the 32px ha-tile-container reserves */
      --_tile-info-fixed-primary-line-height: var(--ha-space-4);
    }
    ha-tile-info.twoline > [slot="primary"] {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: normal;
      overflow-wrap: anywhere;
    }
  `,m([k({attribute:!1})],u.prototype,"hass",2),m([k({attribute:!1})],u.prototype,"layout",2),m([y()],u.prototype,"_config",2),m([y()],u.prototype,"_loaded",2),u=m([q(S1)],u);var m2=document.documentElement.lang||navigator.language,u1=window;u1.customCards=u1.customCards||[];u1.customCards.push({type:S1,name:Z(m2,"name"),description:Z(m2,"description"),preview:!0,documentationURL:"https://github.com/Lukas0610/ha-custom-area-card"});console.info("%c CUSTOM-AREA-CARD %c 0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{u as CustomAreaCard};
