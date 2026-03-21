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
var tooltip_id_21523 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21524 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21523);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21523);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21523,abbr){
return (function (p1__21475_SHARP_){
return abbr.parentNode.appendChild(p1__21475_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21523,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21523,tooltip_21524,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21524.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21524);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21524);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21523,tooltip_21524,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21523,tooltip_21524,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21524.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21524);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21524);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21523,tooltip_21524,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21523,tooltip_21524,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21524);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21523,tooltip_21524,abbr))
);


var G__21535 = seq__21477;
var G__21536 = chunk__21478;
var G__21537 = count__21479;
var G__21538 = (i__21480 + (1));
seq__21477 = G__21535;
chunk__21478 = G__21536;
count__21479 = G__21537;
i__21480 = G__21538;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21477);
if(temp__5825__auto__){
var seq__21477__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21477__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21477__$1);
var G__21539 = cljs.core.chunk_rest(seq__21477__$1);
var G__21540 = c__5525__auto__;
var G__21541 = cljs.core.count(c__5525__auto__);
var G__21542 = (0);
seq__21477 = G__21539;
chunk__21478 = G__21540;
count__21479 = G__21541;
i__21480 = G__21542;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
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

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21497,or__5002__auto__,tooltip_id_21545,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21475_SHARP_){
return abbr.parentNode.appendChild(p1__21475_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21497,or__5002__auto__,tooltip_id_21545,abbr,seq__21477__$1,temp__5825__auto__))
(G__21497);

return G__21497;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21545,tooltip_21546,abbr,seq__21477__$1,temp__5825__auto__){
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
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21545,tooltip_21546,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21545,tooltip_21546,abbr,seq__21477__$1,temp__5825__auto__){
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
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21545,tooltip_21546,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21545,tooltip_21546,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21546);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21545,tooltip_21546,abbr,seq__21477__$1,temp__5825__auto__))
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

var seq__21500 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21501 = null;
var count__21502 = (0);
var i__21503 = (0);
while(true){
if((i__21503 < count__21502)){
var el = chunk__21501.cljs$core$IIndexed$_nth$arity$2(null, i__21503);
var code_21560 = el.textContent;
var container_21561 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21560,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21560,container_21561,el){
return (function (svg){
return (container_21561["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21560,container_21561,el))
);


var G__21562 = seq__21500;
var G__21563 = chunk__21501;
var G__21564 = count__21502;
var G__21565 = (i__21503 + (1));
seq__21500 = G__21562;
chunk__21501 = G__21563;
count__21502 = G__21564;
i__21503 = G__21565;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21567 = cljs.core.chunk_rest(seq__21500__$1);
var G__21568 = c__5525__auto__;
var G__21569 = cljs.core.count(c__5525__auto__);
var G__21570 = (0);
seq__21500 = G__21567;
chunk__21501 = G__21568;
count__21502 = G__21569;
i__21503 = G__21570;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21571 = el.textContent;
var container_21572 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21571,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21571,container_21572,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21572["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21571,container_21572,el,seq__21500__$1,temp__5825__auto__))
);


var G__21573 = cljs.core.next(seq__21500__$1);
var G__21574 = null;
var G__21575 = (0);
var G__21576 = (0);
seq__21500 = G__21573;
chunk__21501 = G__21574;
count__21502 = G__21575;
i__21503 = G__21576;
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
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21508 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21509 = null;
var count__21510 = (0);
var i__21511 = (0);
while(true){
if((i__21511 < count__21510)){
var el = chunk__21509.cljs$core$IIndexed$_nth$arity$2(null, i__21511);
hljs.highlightElement(el);


var G__21582 = seq__21508;
var G__21583 = chunk__21509;
var G__21584 = count__21510;
var G__21585 = (i__21511 + (1));
seq__21508 = G__21582;
chunk__21509 = G__21583;
count__21510 = G__21584;
i__21511 = G__21585;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21508);
if(temp__5825__auto__){
var seq__21508__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21508__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21508__$1);
var G__21586 = cljs.core.chunk_rest(seq__21508__$1);
var G__21587 = c__5525__auto__;
var G__21588 = cljs.core.count(c__5525__auto__);
var G__21589 = (0);
seq__21508 = G__21586;
chunk__21509 = G__21587;
count__21510 = G__21588;
i__21511 = G__21589;
continue;
} else {
var el = cljs.core.first(seq__21508__$1);
hljs.highlightElement(el);


var G__21590 = cljs.core.next(seq__21508__$1);
var G__21591 = null;
var G__21592 = (0);
var G__21593 = (0);
seq__21508 = G__21590;
chunk__21509 = G__21591;
count__21510 = G__21592;
i__21511 = G__21593;
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
