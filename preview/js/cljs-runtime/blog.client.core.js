goog.provide('blog.client.core');
blog.client.core.init_nav_BANG_ = (function blog$client$core$init_nav_BANG_(){
var temp__5825__auto__ = goog.dom.getElement("nav-toggle");
if(cljs.core.truth_(temp__5825__auto__)){
var btn = temp__5825__auto__;
var temp__5825__auto____$1 = goog.dom.getElement("nav-menu");
if(cljs.core.truth_(temp__5825__auto____$1)){
var nav = temp__5825__auto____$1;
return goog.events.listen(btn,goog.events.EventType.CLICK,(function (_){
var expanded_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("true",btn.getAttribute("aria-expanded"));
btn.setAttribute("aria-expanded",cljs.core.str.cljs$core$IFn$_invoke$arity$1((!(expanded_QMARK_))));

if(expanded_QMARK_){
return nav.classList.remove("open");
} else {
return nav.classList.add("open");
}
}));
} else {
return null;
}
} else {
return null;
}
});
blog.client.core.show_tooltip_BANG_ = (function blog$client$core$show_tooltip_BANG_(abbr,tooltip){
abbr.setAttribute("aria-describedby",tooltip.id);

return tooltip.classList.add("visible");
});
blog.client.core.hide_tooltip_BANG_ = (function blog$client$core$hide_tooltip_BANG_(abbr,tooltip){
abbr.removeAttribute("aria-describedby");

return tooltip.classList.remove("visible");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21477 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("glossary-term")));
var chunk__21478 = null;
var count__21479 = (0);
var i__21480 = (0);
while(true){
if((i__21480 < count__21479)){
var abbr = chunk__21478.cljs$core$IIndexed$_nth$arity$2(null, i__21480);
var tooltip_id_21504 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21505 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21504);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21504);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21504,abbr){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21504,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21505.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21505);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21505);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21493 = e.key;
var fexpr__21492 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21492.cljs$core$IFn$_invoke$arity$1 ? fexpr__21492.cljs$core$IFn$_invoke$arity$1(G__21493) : fexpr__21492.call(null, G__21493));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21505.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21505);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21505);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21505);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr))
);


var G__21508 = seq__21477;
var G__21509 = chunk__21478;
var G__21510 = count__21479;
var G__21511 = (i__21480 + (1));
seq__21477 = G__21508;
chunk__21478 = G__21509;
count__21479 = G__21510;
i__21480 = G__21511;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21477);
if(temp__5825__auto__){
var seq__21477__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21477__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21477__$1);
var G__21512 = cljs.core.chunk_rest(seq__21477__$1);
var G__21513 = c__5525__auto__;
var G__21514 = cljs.core.count(c__5525__auto__);
var G__21515 = (0);
seq__21477 = G__21512;
chunk__21478 = G__21513;
count__21479 = G__21514;
i__21480 = G__21515;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
var tooltip_id_21516 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21517 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21516);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21495 = goog.dom.createElement("div");
G__21495.setAttribute("id",tooltip_id_21516);

G__21495.setAttribute("role","tooltip");

(G__21495["className"] = "glossary-tooltip");

(G__21495["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21495,or__5002__auto__,tooltip_id_21516,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21495,or__5002__auto__,tooltip_id_21516,abbr,seq__21477__$1,temp__5825__auto__))
(G__21495);

return G__21495;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21516,tooltip_21517,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21517.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21517);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21517);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21516,tooltip_21517,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21516,tooltip_21517,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21497 = e.key;
var fexpr__21496 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21496.cljs$core$IFn$_invoke$arity$1 ? fexpr__21496.cljs$core$IFn$_invoke$arity$1(G__21497) : fexpr__21496.call(null, G__21497));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21517.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21517);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21517);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21516,tooltip_21517,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21516,tooltip_21517,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21517);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21516,tooltip_21517,abbr,seq__21477__$1,temp__5825__auto__))
);


var G__21520 = cljs.core.next(seq__21477__$1);
var G__21521 = null;
var G__21522 = (0);
var G__21523 = (0);
seq__21477 = G__21520;
chunk__21478 = G__21521;
count__21479 = G__21522;
i__21480 = G__21523;
continue;
}
} else {
return null;
}
}
break;
}
});
blog.client.core.init_mermaid_BANG_ = (function blog$client$core$init_mermaid_BANG_(){
if((typeof mermaid !== 'undefined')){
mermaid.initialize(({"startOnLoad": false, "theme": "dark"}));

var seq__21500 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21501 = null;
var count__21502 = (0);
var i__21503 = (0);
while(true){
if((i__21503 < count__21502)){
var el = chunk__21501.cljs$core$IIndexed$_nth$arity$2(null, i__21503);
var code_21524 = el.textContent;
var container_21525 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21524,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21524,container_21525,el){
return (function (svg){
return (container_21525["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21524,container_21525,el))
);


var G__21526 = seq__21500;
var G__21527 = chunk__21501;
var G__21528 = count__21502;
var G__21529 = (i__21503 + (1));
seq__21500 = G__21526;
chunk__21501 = G__21527;
count__21502 = G__21528;
i__21503 = G__21529;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21531 = cljs.core.chunk_rest(seq__21500__$1);
var G__21532 = c__5525__auto__;
var G__21533 = cljs.core.count(c__5525__auto__);
var G__21534 = (0);
seq__21500 = G__21531;
chunk__21501 = G__21532;
count__21502 = G__21533;
i__21503 = G__21534;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21535 = el.textContent;
var container_21536 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21535,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21535,container_21536,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21536["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21535,container_21536,el,seq__21500__$1,temp__5825__auto__))
);


var G__21539 = cljs.core.next(seq__21500__$1);
var G__21540 = null;
var G__21541 = (0);
var G__21542 = (0);
seq__21500 = G__21539;
chunk__21501 = G__21540;
count__21502 = G__21541;
i__21503 = G__21542;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
blog.client.core.init_scroll_restore_BANG_ = (function blog$client$core$init_scroll_restore_BANG_(){
var temp__5825__auto___21543 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21543)){
var saved_21548 = temp__5825__auto___21543;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21548));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init = (function blog$client$core$init(){
blog.client.core.init_nav_BANG_();

blog.client.core.init_glossary_BANG_();

blog.client.core.init_mermaid_BANG_();

return blog.client.core.init_scroll_restore_BANG_();
});
goog.exportSymbol('blog.client.core.init', blog.client.core.init);

//# sourceMappingURL=blog.client.core.js.map
