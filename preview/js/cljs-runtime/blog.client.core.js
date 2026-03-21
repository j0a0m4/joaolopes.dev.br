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
var tooltip_id_21529 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21530 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21529);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21494 = goog.dom.createElement("div");
G__21494.setAttribute("id",tooltip_id_21529);

G__21494.setAttribute("role","tooltip");

(G__21494["className"] = "glossary-tooltip");

(G__21494["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21494,or__5002__auto__,tooltip_id_21529,abbr){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21494,or__5002__auto__,tooltip_id_21529,abbr))
(G__21494);

return G__21494;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21529,tooltip_21530,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21530.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21530);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21530);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21529,tooltip_21530,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21529,tooltip_21530,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21496 = e.key;
var fexpr__21495 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21495.cljs$core$IFn$_invoke$arity$1 ? fexpr__21495.cljs$core$IFn$_invoke$arity$1(G__21496) : fexpr__21495.call(null, G__21496));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21530.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21530);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21530);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21529,tooltip_21530,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21529,tooltip_21530,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21530);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21529,tooltip_21530,abbr))
);


var G__21538 = seq__21477;
var G__21539 = chunk__21478;
var G__21540 = count__21479;
var G__21541 = (i__21480 + (1));
seq__21477 = G__21538;
chunk__21478 = G__21539;
count__21479 = G__21540;
i__21480 = G__21541;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21477);
if(temp__5825__auto__){
var seq__21477__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21477__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21477__$1);
var G__21542 = cljs.core.chunk_rest(seq__21477__$1);
var G__21543 = c__5525__auto__;
var G__21544 = cljs.core.count(c__5525__auto__);
var G__21545 = (0);
seq__21477 = G__21542;
chunk__21478 = G__21543;
count__21479 = G__21544;
i__21480 = G__21545;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
var tooltip_id_21546 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21547 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21546);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21497 = goog.dom.createElement("div");
G__21497.setAttribute("id",tooltip_id_21546);

G__21497.setAttribute("role","tooltip");

(G__21497["className"] = "glossary-tooltip");

(G__21497["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21497,or__5002__auto__,tooltip_id_21546,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21497,or__5002__auto__,tooltip_id_21546,abbr,seq__21477__$1,temp__5825__auto__))
(G__21497);

return G__21497;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21547.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21547);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21547);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21501 = e.key;
var fexpr__21500 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21500.cljs$core$IFn$_invoke$arity$1 ? fexpr__21500.cljs$core$IFn$_invoke$arity$1(G__21501) : fexpr__21500.call(null, G__21501));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21547.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21547);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21547);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21547);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__))
);


var G__21557 = cljs.core.next(seq__21477__$1);
var G__21558 = null;
var G__21559 = (0);
var G__21560 = (0);
seq__21477 = G__21557;
chunk__21478 = G__21558;
count__21479 = G__21559;
i__21480 = G__21560;
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

var seq__21504 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21505 = null;
var count__21506 = (0);
var i__21507 = (0);
while(true){
if((i__21507 < count__21506)){
var el = chunk__21505.cljs$core$IIndexed$_nth$arity$2(null, i__21507);
var code_21562 = el.textContent;
var container_21563 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21562,((function (seq__21504,chunk__21505,count__21506,i__21507,code_21562,container_21563,el){
return (function (svg){
return (container_21563["innerHTML"] = svg);
});})(seq__21504,chunk__21505,count__21506,i__21507,code_21562,container_21563,el))
);


var G__21564 = seq__21504;
var G__21565 = chunk__21505;
var G__21566 = count__21506;
var G__21567 = (i__21507 + (1));
seq__21504 = G__21564;
chunk__21505 = G__21565;
count__21506 = G__21566;
i__21507 = G__21567;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21504);
if(temp__5825__auto__){
var seq__21504__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21504__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21504__$1);
var G__21568 = cljs.core.chunk_rest(seq__21504__$1);
var G__21569 = c__5525__auto__;
var G__21570 = cljs.core.count(c__5525__auto__);
var G__21571 = (0);
seq__21504 = G__21568;
chunk__21505 = G__21569;
count__21506 = G__21570;
i__21507 = G__21571;
continue;
} else {
var el = cljs.core.first(seq__21504__$1);
var code_21573 = el.textContent;
var container_21574 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21573,((function (seq__21504,chunk__21505,count__21506,i__21507,code_21573,container_21574,el,seq__21504__$1,temp__5825__auto__){
return (function (svg){
return (container_21574["innerHTML"] = svg);
});})(seq__21504,chunk__21505,count__21506,i__21507,code_21573,container_21574,el,seq__21504__$1,temp__5825__auto__))
);


var G__21575 = cljs.core.next(seq__21504__$1);
var G__21576 = null;
var G__21577 = (0);
var G__21578 = (0);
seq__21504 = G__21575;
chunk__21505 = G__21576;
count__21506 = G__21577;
i__21507 = G__21578;
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
var temp__5825__auto___21580 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21580)){
var saved_21581 = temp__5825__auto___21580;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21581));
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
