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
var tooltip_id_21506 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21507 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21506);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21506);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21489,or__5002__auto__,tooltip_id_21506,abbr){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21489,or__5002__auto__,tooltip_id_21506,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21506,tooltip_21507,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21507.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21507);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21507);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21506,tooltip_21507,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21506,tooltip_21507,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21507.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21507);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21507);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21506,tooltip_21507,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21506,tooltip_21507,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21507);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21506,tooltip_21507,abbr))
);


var G__21517 = seq__21479;
var G__21518 = chunk__21480;
var G__21519 = count__21481;
var G__21520 = (i__21482 + (1));
seq__21479 = G__21517;
chunk__21480 = G__21518;
count__21481 = G__21519;
i__21482 = G__21520;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21479);
if(temp__5825__auto__){
var seq__21479__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21479__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21479__$1);
var G__21526 = cljs.core.chunk_rest(seq__21479__$1);
var G__21527 = c__5525__auto__;
var G__21528 = cljs.core.count(c__5525__auto__);
var G__21529 = (0);
seq__21479 = G__21526;
chunk__21480 = G__21527;
count__21481 = G__21528;
i__21482 = G__21529;
continue;
} else {
var abbr = cljs.core.first(seq__21479__$1);
var tooltip_id_21531 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21532 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21531);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21492 = goog.dom.createElement("div");
G__21492.setAttribute("id",tooltip_id_21531);

G__21492.setAttribute("role","tooltip");

(G__21492["className"] = "glossary-tooltip");

(G__21492["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21492,or__5002__auto__,tooltip_id_21531,abbr,seq__21479__$1,temp__5825__auto__){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21492,or__5002__auto__,tooltip_id_21531,abbr,seq__21479__$1,temp__5825__auto__))
(G__21492);

return G__21492;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21531,tooltip_21532,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21532.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21532);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21532);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21531,tooltip_21532,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21531,tooltip_21532,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21494 = e.key;
var fexpr__21493 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21493.cljs$core$IFn$_invoke$arity$1 ? fexpr__21493.cljs$core$IFn$_invoke$arity$1(G__21494) : fexpr__21493.call(null, G__21494));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21532.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21532);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21532);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21531,tooltip_21532,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21531,tooltip_21532,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21532);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21531,tooltip_21532,abbr,seq__21479__$1,temp__5825__auto__))
);


var G__21539 = cljs.core.next(seq__21479__$1);
var G__21540 = null;
var G__21541 = (0);
var G__21542 = (0);
seq__21479 = G__21539;
chunk__21480 = G__21540;
count__21481 = G__21541;
i__21482 = G__21542;
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

var seq__21498 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21499 = null;
var count__21500 = (0);
var i__21501 = (0);
while(true){
if((i__21501 < count__21500)){
var el = chunk__21499.cljs$core$IIndexed$_nth$arity$2(null, i__21501);
var code_21556 = el.textContent;
var container_21557 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21556,((function (seq__21498,chunk__21499,count__21500,i__21501,code_21556,container_21557,el){
return (function (svg){
return (container_21557["innerHTML"] = svg);
});})(seq__21498,chunk__21499,count__21500,i__21501,code_21556,container_21557,el))
);


var G__21558 = seq__21498;
var G__21559 = chunk__21499;
var G__21560 = count__21500;
var G__21561 = (i__21501 + (1));
seq__21498 = G__21558;
chunk__21499 = G__21559;
count__21500 = G__21560;
i__21501 = G__21561;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21498);
if(temp__5825__auto__){
var seq__21498__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21498__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21498__$1);
var G__21562 = cljs.core.chunk_rest(seq__21498__$1);
var G__21563 = c__5525__auto__;
var G__21564 = cljs.core.count(c__5525__auto__);
var G__21565 = (0);
seq__21498 = G__21562;
chunk__21499 = G__21563;
count__21500 = G__21564;
i__21501 = G__21565;
continue;
} else {
var el = cljs.core.first(seq__21498__$1);
var code_21566 = el.textContent;
var container_21567 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21566,((function (seq__21498,chunk__21499,count__21500,i__21501,code_21566,container_21567,el,seq__21498__$1,temp__5825__auto__){
return (function (svg){
return (container_21567["innerHTML"] = svg);
});})(seq__21498,chunk__21499,count__21500,i__21501,code_21566,container_21567,el,seq__21498__$1,temp__5825__auto__))
);


var G__21568 = cljs.core.next(seq__21498__$1);
var G__21569 = null;
var G__21570 = (0);
var G__21571 = (0);
seq__21498 = G__21568;
chunk__21499 = G__21569;
count__21500 = G__21570;
i__21501 = G__21571;
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
var temp__5825__auto___21572 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21572)){
var saved_21573 = temp__5825__auto___21572;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21573));
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
