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
var tooltip_id_21512 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21513 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21512);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21512);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21489,or__5002__auto__,tooltip_id_21512,abbr){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21489,or__5002__auto__,tooltip_id_21512,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21512,tooltip_21513,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21513.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21513);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21513);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21512,tooltip_21513,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21512,tooltip_21513,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21493 = e.key;
var fexpr__21492 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21492.cljs$core$IFn$_invoke$arity$1 ? fexpr__21492.cljs$core$IFn$_invoke$arity$1(G__21493) : fexpr__21492.call(null, G__21493));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21513.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21513);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21513);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21512,tooltip_21513,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21512,tooltip_21513,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21513);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21512,tooltip_21513,abbr))
);


var G__21522 = seq__21479;
var G__21523 = chunk__21480;
var G__21524 = count__21481;
var G__21525 = (i__21482 + (1));
seq__21479 = G__21522;
chunk__21480 = G__21523;
count__21481 = G__21524;
i__21482 = G__21525;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21479);
if(temp__5825__auto__){
var seq__21479__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21479__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21479__$1);
var G__21527 = cljs.core.chunk_rest(seq__21479__$1);
var G__21528 = c__5525__auto__;
var G__21529 = cljs.core.count(c__5525__auto__);
var G__21530 = (0);
seq__21479 = G__21527;
chunk__21480 = G__21528;
count__21481 = G__21529;
i__21482 = G__21530;
continue;
} else {
var abbr = cljs.core.first(seq__21479__$1);
var tooltip_id_21534 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21535 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21534);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21494 = goog.dom.createElement("div");
G__21494.setAttribute("id",tooltip_id_21534);

G__21494.setAttribute("role","tooltip");

(G__21494["className"] = "glossary-tooltip");

(G__21494["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21494,or__5002__auto__,tooltip_id_21534,abbr,seq__21479__$1,temp__5825__auto__){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21494,or__5002__auto__,tooltip_id_21534,abbr,seq__21479__$1,temp__5825__auto__))
(G__21494);

return G__21494;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21534,tooltip_21535,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21535.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21535);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21535);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21534,tooltip_21535,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21534,tooltip_21535,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21496 = e.key;
var fexpr__21495 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21495.cljs$core$IFn$_invoke$arity$1 ? fexpr__21495.cljs$core$IFn$_invoke$arity$1(G__21496) : fexpr__21495.call(null, G__21496));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21535.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21535);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21535);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21534,tooltip_21535,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21534,tooltip_21535,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21535);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21534,tooltip_21535,abbr,seq__21479__$1,temp__5825__auto__))
);


var G__21548 = cljs.core.next(seq__21479__$1);
var G__21549 = null;
var G__21550 = (0);
var G__21551 = (0);
seq__21479 = G__21548;
chunk__21480 = G__21549;
count__21481 = G__21550;
i__21482 = G__21551;
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
var code_21552 = el.textContent;
var container_21553 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21552,((function (seq__21498,chunk__21499,count__21500,i__21501,code_21552,container_21553,el){
return (function (svg){
return (container_21553["innerHTML"] = svg);
});})(seq__21498,chunk__21499,count__21500,i__21501,code_21552,container_21553,el))
);


var G__21555 = seq__21498;
var G__21556 = chunk__21499;
var G__21557 = count__21500;
var G__21558 = (i__21501 + (1));
seq__21498 = G__21555;
chunk__21499 = G__21556;
count__21500 = G__21557;
i__21501 = G__21558;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21498);
if(temp__5825__auto__){
var seq__21498__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21498__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21498__$1);
var G__21559 = cljs.core.chunk_rest(seq__21498__$1);
var G__21560 = c__5525__auto__;
var G__21561 = cljs.core.count(c__5525__auto__);
var G__21562 = (0);
seq__21498 = G__21559;
chunk__21499 = G__21560;
count__21500 = G__21561;
i__21501 = G__21562;
continue;
} else {
var el = cljs.core.first(seq__21498__$1);
var code_21563 = el.textContent;
var container_21564 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21563,((function (seq__21498,chunk__21499,count__21500,i__21501,code_21563,container_21564,el,seq__21498__$1,temp__5825__auto__){
return (function (svg){
return (container_21564["innerHTML"] = svg);
});})(seq__21498,chunk__21499,count__21500,i__21501,code_21563,container_21564,el,seq__21498__$1,temp__5825__auto__))
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
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21504 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21505 = null;
var count__21506 = (0);
var i__21507 = (0);
while(true){
if((i__21507 < count__21506)){
var el = chunk__21505.cljs$core$IIndexed$_nth$arity$2(null, i__21507);
hljs.highlightElement(el);


var G__21576 = seq__21504;
var G__21577 = chunk__21505;
var G__21578 = count__21506;
var G__21579 = (i__21507 + (1));
seq__21504 = G__21576;
chunk__21505 = G__21577;
count__21506 = G__21578;
i__21507 = G__21579;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21504);
if(temp__5825__auto__){
var seq__21504__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21504__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21504__$1);
var G__21581 = cljs.core.chunk_rest(seq__21504__$1);
var G__21582 = c__5525__auto__;
var G__21583 = cljs.core.count(c__5525__auto__);
var G__21584 = (0);
seq__21504 = G__21581;
chunk__21505 = G__21582;
count__21506 = G__21583;
i__21507 = G__21584;
continue;
} else {
var el = cljs.core.first(seq__21504__$1);
hljs.highlightElement(el);


var G__21585 = cljs.core.next(seq__21504__$1);
var G__21586 = null;
var G__21587 = (0);
var G__21588 = (0);
seq__21504 = G__21585;
chunk__21505 = G__21586;
count__21506 = G__21587;
i__21507 = G__21588;
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
blog.client.core.init = (function blog$client$core$init(){
blog.client.core.init_nav_BANG_();

blog.client.core.init_glossary_BANG_();

blog.client.core.init_mermaid_BANG_();

blog.client.core.init_highlight_BANG_();

return blog.client.core.init_scroll_restore_BANG_();
});
goog.exportSymbol('blog.client.core.init', blog.client.core.init);

//# sourceMappingURL=blog.client.core.js.map
