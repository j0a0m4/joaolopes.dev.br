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
var seq__21479 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("glossary-term")));
var chunk__21480 = null;
var count__21481 = (0);
var i__21482 = (0);
while(true){
if((i__21482 < count__21481)){
var abbr = chunk__21480.cljs$core$IIndexed$_nth$arity$2(null, i__21482);
var tooltip_id_21519 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21520 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21519);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21492 = goog.dom.createElement("div");
G__21492.setAttribute("id",tooltip_id_21519);

G__21492.setAttribute("role","tooltip");

(G__21492["className"] = "glossary-tooltip");

(G__21492["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21492,or__5002__auto__,tooltip_id_21519,abbr){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21492,or__5002__auto__,tooltip_id_21519,abbr))
(G__21492);

return G__21492;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21519,tooltip_21520,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21520.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21520);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21520);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21519,tooltip_21520,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21519,tooltip_21520,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21494 = e.key;
var fexpr__21493 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21493.cljs$core$IFn$_invoke$arity$1 ? fexpr__21493.cljs$core$IFn$_invoke$arity$1(G__21494) : fexpr__21493.call(null, G__21494));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21520.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21520);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21520);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21519,tooltip_21520,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21519,tooltip_21520,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21520);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21519,tooltip_21520,abbr))
);


var G__21535 = seq__21479;
var G__21536 = chunk__21480;
var G__21537 = count__21481;
var G__21538 = (i__21482 + (1));
seq__21479 = G__21535;
chunk__21480 = G__21536;
count__21481 = G__21537;
i__21482 = G__21538;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21479);
if(temp__5825__auto__){
var seq__21479__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21479__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21479__$1);
var G__21541 = cljs.core.chunk_rest(seq__21479__$1);
var G__21542 = c__5525__auto__;
var G__21543 = cljs.core.count(c__5525__auto__);
var G__21544 = (0);
seq__21479 = G__21541;
chunk__21480 = G__21542;
count__21481 = G__21543;
i__21482 = G__21544;
continue;
} else {
var abbr = cljs.core.first(seq__21479__$1);
var tooltip_id_21545 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21546 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21545);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21497 = goog.dom.createElement("div");
G__21497.setAttribute("id",tooltip_id_21545);

G__21497.setAttribute("role","tooltip");

(G__21497["className"] = "glossary-tooltip");

(G__21497["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21497,or__5002__auto__,tooltip_id_21545,abbr,seq__21479__$1,temp__5825__auto__){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21497,or__5002__auto__,tooltip_id_21545,abbr,seq__21479__$1,temp__5825__auto__))
(G__21497);

return G__21497;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21545,tooltip_21546,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21546.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21546);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21546);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21545,tooltip_21546,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21545,tooltip_21546,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21499 = e.key;
var fexpr__21498 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21498.cljs$core$IFn$_invoke$arity$1 ? fexpr__21498.cljs$core$IFn$_invoke$arity$1(G__21499) : fexpr__21498.call(null, G__21499));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21546.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21546);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21546);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21545,tooltip_21546,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21545,tooltip_21546,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21546);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21545,tooltip_21546,abbr,seq__21479__$1,temp__5825__auto__))
);


var G__21553 = cljs.core.next(seq__21479__$1);
var G__21554 = null;
var G__21555 = (0);
var G__21556 = (0);
seq__21479 = G__21553;
chunk__21480 = G__21554;
count__21481 = G__21555;
i__21482 = G__21556;
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
var code_21557 = el.textContent;
var container_21558 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21557,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21557,container_21558,el){
return (function (svg){
return (container_21558["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21557,container_21558,el))
);


var G__21560 = seq__21500;
var G__21561 = chunk__21501;
var G__21562 = count__21502;
var G__21563 = (i__21503 + (1));
seq__21500 = G__21560;
chunk__21501 = G__21561;
count__21502 = G__21562;
i__21503 = G__21563;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21564 = cljs.core.chunk_rest(seq__21500__$1);
var G__21565 = c__5525__auto__;
var G__21566 = cljs.core.count(c__5525__auto__);
var G__21567 = (0);
seq__21500 = G__21564;
chunk__21501 = G__21565;
count__21502 = G__21566;
i__21503 = G__21567;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21568 = el.textContent;
var container_21569 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21568,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21568,container_21569,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21569["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21568,container_21569,el,seq__21500__$1,temp__5825__auto__))
);


var G__21570 = cljs.core.next(seq__21500__$1);
var G__21571 = null;
var G__21572 = (0);
var G__21573 = (0);
seq__21500 = G__21570;
chunk__21501 = G__21571;
count__21502 = G__21572;
i__21503 = G__21573;
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
var temp__5825__auto___21574 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21574)){
var saved_21575 = temp__5825__auto___21574;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21575));
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
