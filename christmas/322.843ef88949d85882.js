"use strict";(self.webpackChunkchristmas_task=self.webpackChunkchristmas_task||[]).push([[322],{2322:(P,l,s)=>{s.r(l),s.d(l,{TreeModule:()=>w});var c=s(6019),m=s(26),h=s(4793),t=s(3556);const d=[{path:"",component:h.q}];let _=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[m.Bz.forChild(d)],m.Bz]}),o})();var g=s(902);const y=[{num:"1"},{num:"2"},{num:"3"},{num:"4"},{num:"5"},{num:"6"}],f=[{num:"1"},{num:"2"},{num:"3"},{num:"4"},{num:"5"},{num:"6"},{num:"7"},{num:"8"},{num:"9"},{num:"10"}];var C=s(1117);let T=(()=>{class o{constructor(e){this.storage=e}getToysToHang(){let e=[];return e=this.storage.getObject("favouritesToys")&&this.storage.getObject("favouritesToys").length>0?this.storage.getObject("favouritesToys"):this.getRandomToys(),e}getRandomToys(){let e=[];do{const n=Math.floor(Math.random()*g.P.length);e.includes(g.P[n])||e.push(g.P[n])}while(e.length<20);return e}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(C.c))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-decorate-service"]],decls:2,vars:0,template:function(e,n){1&e&&(t.TgZ(0,"p"),t._uU(1,"decorate-service works!"),t.qZA())},styles:[""]}),o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();function v(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",4),t.TgZ(1,"div",5),t.TgZ(2,"img",6),t.NdJ("draggable",function(){return!1})("mousedown",function(a){const u=t.CHM(e).index;return t.oxw().drag(a,u)}),t.qZA(),t.qZA(),t.TgZ(3,"p",7),t._uU(4),t.qZA(),t.qZA()}if(2&o){const e=r.$implicit,n=t.oxw();t.xp6(2),t.MGl("src","assets/toys/",e.num,".png",t.LSH),t.xp6(2),t.Oqu(n.getCount(e.count))}}let b=(()=>{class o{constructor(e,n){this.decorateService=e,this.cdr=n,this.toysToHang=[],this.dragActive=!1,this.pointerCursorX=0,this.pointerCursorY=0,this.toyDrag=document.getElementById("toysContainer")}mouseUp(e){1==this.dragActive&&(this.dragActive=!1)}mouseMove(e){1==this.dragActive&&(this.toyDrag.style.left=e.pageX-this.toyDrag.offsetWidth/2+"px",this.toyDrag.style.top=e.pageY-this.toyDrag.offsetHeight/2+"px")}ngOnInit(){this.toysToHang=this.decorateService.getToysToHang(),console.log(this.toysToHang)}getCount(e){return e.padStart(2,"0")}drag(e,n){e.preventDefault(),this.toyDrag=e.target,this.dragActive=!0,this.initialPrepare(),this.toyDrag.style.left=e.pageX-this.toyDrag.offsetWidth/2+"px",this.toyDrag.style.top=e.pageY-this.toyDrag.offsetHeight/2+"px";const a=document.querySelectorAll(".tree-container__toy-image");this.toyDrag.closest(".tree-container__toy-image")&&(a[n].removeChild(this.toyDrag),document.querySelector(".tree-container").append(this.toyDrag))}initialPrepare(){this.toyDrag.style.display="block",this.toyDrag.style.width=this.toyDrag.offsetWidth+"px",this.toyDrag.style.height=this.toyDrag.offsetHeight+"px",this.toyDrag.style.position="absolute",this.toyDrag.style.zIndex="9000"}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(T),t.Y36(t.sBO))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-toys-to-hang"]],hostBindings:function(e,n){1&e&&t.NdJ("mouseup",function(i){return n.mouseUp(i)},!1,t.Jf7)("mousemove",function(i){return n.mouseMove(i)},!1,t.Jf7)},inputs:{treeContainer:"treeContainer"},decls:5,vars:1,consts:[[1,"tree-container__header"],[1,"toys-to-hang"],["toysContainer",""],["class","tree-container__toy",4,"ngFor","ngForOf"],[1,"tree-container__toy"],[1,"tree-container__toy-image"],["alt","toy-image",3,"src","draggable","mousedown"],[1,"tree-container__toy-count"]],template:function(e,n){1&e&&(t.TgZ(0,"h3",0),t._uU(1,"\u0418\u0433\u0440\u0443\u0448\u043a\u0438"),t.qZA(),t.TgZ(2,"div",1,2),t.YNc(4,v,5,2,"div",3),t.qZA()),2&e&&(t.xp6(4),t.Q6J("ngForOf",n.toysToHang))},directives:[c.sg],styles:['.tree-container__toy-count[_ngcontent-%COMP%]{font-family:"Roboto",sans-serif}.tree-container__header[_ngcontent-%COMP%]{font-family:"Neucha",sans-serif}.tree-container__toy[_ngcontent-%COMP%]{transition:.5s ease-in-out}.tree-container__header[_ngcontent-%COMP%]{text-align:center;color:#fff;font-size:2.8rem;line-height:2.8rem;font-weight:400;font-style:normal;text-transform:normal}.tree-container__toy[_ngcontent-%COMP%]{width:23%;background:radial-gradient(109.56% 109.56% at 0% -2.94%,rgba(255,255,255,.8) 0%,rgba(46,181,199,.8) 100%);border-radius:10px;position:relative;padding:2%}.tree-container__toy[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.8}.tree-container__toy-image[_ngcontent-%COMP%]{width:80%;margin:1rem auto}.tree-container__toy-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.tree-container__toy-count[_ngcontent-%COMP%]{position:absolute;background:radial-gradient(109.56% 109.56% at 0% -2.94%,rgba(255,255,255,.8) 0%,rgba(230,62,62,.8) 100%);color:#fff;border-radius:50%;border:1px solid #278D9F;font-size:1.5rem;line-height:1.5rem;font-weight:400;font-style:normal;text-transform:normal;bottom:0%;right:0%;padding:3%}.toys-to-hang[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-wrap:wrap;grid-row-gap:.5rem;row-gap:.5rem}']}),o})();function x(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",6),t.NdJ("click",function(){const i=t.CHM(e).$implicit;return t.oxw().changeTree(i.num)}),t.TgZ(1,"div",7),t._UZ(2,"img",8),t.qZA(),t.qZA()}if(2&o){const e=r.$implicit;t.xp6(2),t.MGl("src","assets/tree/",e.num,".png",t.LSH)}}function M(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",9),t.NdJ("click",function(){const i=t.CHM(e).$implicit;return t.oxw().changeBg(i.num)}),t.qZA()}if(2&o){const e=r.$implicit,n=t.oxw();t.Q6J("ngStyle",n.returnBackground(e.num))}}let O=(()=>{class o{constructor(){this.bgChoice=new t.vpe,this.treeChoice=new t.vpe,this.treesToChoose=[],this.bgToChoose=[]}ngOnInit(){this.treesToChoose=y,this.bgToChoose=f}returnBackground(e){return{background:`url(assets/bg/${e}.jpg) center/cover no-repeat`}}changeBg(e){this.bgChoice.emit(e)}changeTree(e){this.treeChoice.emit(e)}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-settings-bar"]],outputs:{bgChoice:"bgChoice",treeChoice:"treeChoice"},decls:9,vars:2,consts:[[1,"general-settings"],[1,"settings-bar__header"],[1,"trees-to-choose"],["class","trees-to-choose__tree",3,"click",4,"ngFor","ngForOf"],[1,"bg-to-choose"],["class","bg-to-choose__bg",3,"ngStyle","click",4,"ngFor","ngForOf"],[1,"trees-to-choose__tree",3,"click"],[1,"trees-to-choose__image"],["alt","tree-image",3,"src"],[1,"bg-to-choose__bg",3,"ngStyle","click"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"h3",1),t._uU(2,"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0451\u043b\u043a\u0443:"),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,x,3,1,"div",3),t.qZA(),t.TgZ(5,"h3",1),t._uU(6,"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u043e\u043d:"),t.qZA(),t.TgZ(7,"div",4),t.YNc(8,M,1,1,"div",5),t.qZA(),t.qZA()),2&e&&(t.xp6(4),t.Q6J("ngForOf",n.treesToChoose),t.xp6(4),t.Q6J("ngForOf",n.bgToChoose))},directives:[c.sg,c.PC],styles:['.settings-bar__header[_ngcontent-%COMP%]{font-family:"Neucha",sans-serif}.trees-to-choose__tree[_ngcontent-%COMP%], .bg-to-choose__bg[_ngcontent-%COMP%]{transition:.5s ease-in-out}.settings-bar__header[_ngcontent-%COMP%]{text-align:center;color:#fff;font-size:2.8rem;line-height:2.8rem;font-weight:400;font-style:normal;text-transform:normal}.trees-to-choose[_ngcontent-%COMP%], .bg-to-choose[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-wrap:wrap;grid-row-gap:.5rem;row-gap:.5rem}.trees-to-choose__tree[_ngcontent-%COMP%], .bg-to-choose__bg[_ngcontent-%COMP%]{width:30%;background:radial-gradient(109.56% 109.56% at 0% -2.94%,rgba(255,255,255,.8) 0%,rgba(46,181,199,.8) 100%);border-radius:10px;padding:2%}.trees-to-choose__tree[_ngcontent-%COMP%]:hover, .bg-to-choose__bg[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.8}.bg-to-choose__bg[_ngcontent-%COMP%]{width:19%;height:5rem;padding:0}.trees-to-choose__image[_ngcontent-%COMP%]{width:80%;margin:1rem auto}.trees-to-choose__image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}']}),o})(),w=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[c.ez,_]]}),o})();t.B6R(h.q,[O,c.PC,b],[])}}]);