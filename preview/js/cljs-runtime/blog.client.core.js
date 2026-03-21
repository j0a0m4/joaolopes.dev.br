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
var tooltip_id_21508 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21509 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21508);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21508);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21508,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21508,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21508,tooltip_21509,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21509.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21509);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21509);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21508,tooltip_21509,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21508,tooltip_21509,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21509.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21509);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21509);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21508,tooltip_21509,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21508,tooltip_21509,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21509);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21508,tooltip_21509,abbr))
);


var G__21528 = seq__21477;
var G__21529 = chunk__21478;
var G__21530 = count__21479;
var G__21531 = (i__21480 + (1));
seq__21477 = G__21528;
chunk__21478 = G__21529;
count__21479 = G__21530;
i__21480 = G__21531;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21477);
if(temp__5825__auto__){
var seq__21477__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21477__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21477__$1);
var G__21533 = cljs.core.chunk_rest(seq__21477__$1);
var G__21534 = c__5525__auto__;
var G__21535 = cljs.core.count(c__5525__auto__);
var G__21536 = (0);
seq__21477 = G__21533;
chunk__21478 = G__21534;
count__21479 = G__21535;
i__21480 = G__21536;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
var tooltip_id_21539 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21540 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21539);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21492 = goog.dom.createElement("div");
G__21492.setAttribute("id",tooltip_id_21539);

G__21492.setAttribute("role","tooltip");

(G__21492["className"] = "glossary-tooltip");

(G__21492["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21492,or__5002__auto__,tooltip_id_21539,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21492,or__5002__auto__,tooltip_id_21539,abbr,seq__21477__$1,temp__5825__auto__))
(G__21492);

return G__21492;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21539,tooltip_21540,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21540.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21540);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21540);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21539,tooltip_21540,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21539,tooltip_21540,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21494 = e.key;
var fexpr__21493 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21493.cljs$core$IFn$_invoke$arity$1 ? fexpr__21493.cljs$core$IFn$_invoke$arity$1(G__21494) : fexpr__21493.call(null, G__21494));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21540.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21540);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21540);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21539,tooltip_21540,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21539,tooltip_21540,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21540);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21539,tooltip_21540,abbr,seq__21477__$1,temp__5825__auto__))
);


var G__21553 = cljs.core.next(seq__21477__$1);
var G__21554 = null;
var G__21555 = (0);
var G__21556 = (0);
seq__21477 = G__21553;
chunk__21478 = G__21554;
count__21479 = G__21555;
i__21480 = G__21556;
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

var seq__21495 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21496 = null;
var count__21497 = (0);
var i__21498 = (0);
while(true){
if((i__21498 < count__21497)){
var el = chunk__21496.cljs$core$IIndexed$_nth$arity$2(null, i__21498);
var code_21557 = el.textContent;
var container_21558 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21557,((function (seq__21495,chunk__21496,count__21497,i__21498,code_21557,container_21558,el){
return (function (svg){
return (container_21558["innerHTML"] = svg);
});})(seq__21495,chunk__21496,count__21497,i__21498,code_21557,container_21558,el))
);


var G__21563 = seq__21495;
var G__21564 = chunk__21496;
var G__21565 = count__21497;
var G__21566 = (i__21498 + (1));
seq__21495 = G__21563;
chunk__21496 = G__21564;
count__21497 = G__21565;
i__21498 = G__21566;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21495);
if(temp__5825__auto__){
var seq__21495__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21495__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21495__$1);
var G__21567 = cljs.core.chunk_rest(seq__21495__$1);
var G__21568 = c__5525__auto__;
var G__21569 = cljs.core.count(c__5525__auto__);
var G__21570 = (0);
seq__21495 = G__21567;
chunk__21496 = G__21568;
count__21497 = G__21569;
i__21498 = G__21570;
continue;
} else {
var el = cljs.core.first(seq__21495__$1);
var code_21571 = el.textContent;
var container_21572 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21571,((function (seq__21495,chunk__21496,count__21497,i__21498,code_21571,container_21572,el,seq__21495__$1,temp__5825__auto__){
return (function (svg){
return (container_21572["innerHTML"] = svg);
});})(seq__21495,chunk__21496,count__21497,i__21498,code_21571,container_21572,el,seq__21495__$1,temp__5825__auto__))
);


var G__21574 = cljs.core.next(seq__21495__$1);
var G__21575 = null;
var G__21576 = (0);
var G__21577 = (0);
seq__21495 = G__21574;
chunk__21496 = G__21575;
count__21497 = G__21576;
i__21498 = G__21577;
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
var temp__5825__auto___21578 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21578)){
var saved_21579 = temp__5825__auto___21578;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21579));
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
