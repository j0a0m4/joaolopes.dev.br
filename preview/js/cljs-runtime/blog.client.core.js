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
var tooltip_id_21519 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21520 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21519);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21519);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21519,abbr){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21519,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21519,tooltip_21520,abbr){
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
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21519,tooltip_21520,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21519,tooltip_21520,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
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
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21519,tooltip_21520,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21519,tooltip_21520,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21520);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21519,tooltip_21520,abbr))
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
var G__21546 = cljs.core.chunk_rest(seq__21477__$1);
var G__21547 = c__5525__auto__;
var G__21548 = cljs.core.count(c__5525__auto__);
var G__21549 = (0);
seq__21477 = G__21546;
chunk__21478 = G__21547;
count__21479 = G__21548;
i__21480 = G__21549;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
var tooltip_id_21550 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21551 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21550);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21492 = goog.dom.createElement("div");
G__21492.setAttribute("id",tooltip_id_21550);

G__21492.setAttribute("role","tooltip");

(G__21492["className"] = "glossary-tooltip");

(G__21492["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21492,or__5002__auto__,tooltip_id_21550,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21476_SHARP_){
return abbr.parentNode.appendChild(p1__21476_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21492,or__5002__auto__,tooltip_id_21550,abbr,seq__21477__$1,temp__5825__auto__))
(G__21492);

return G__21492;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21550,tooltip_21551,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21551.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21551);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21551);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21550,tooltip_21551,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21550,tooltip_21551,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21497 = e.key;
var fexpr__21496 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21496.cljs$core$IFn$_invoke$arity$1 ? fexpr__21496.cljs$core$IFn$_invoke$arity$1(G__21497) : fexpr__21496.call(null, G__21497));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21551.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21551);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21551);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21550,tooltip_21551,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21550,tooltip_21551,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21551);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21550,tooltip_21551,abbr,seq__21477__$1,temp__5825__auto__))
);


var G__21564 = cljs.core.next(seq__21477__$1);
var G__21565 = null;
var G__21566 = (0);
var G__21567 = (0);
seq__21477 = G__21564;
chunk__21478 = G__21565;
count__21479 = G__21566;
i__21480 = G__21567;
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
var code_21570 = el.textContent;
var container_21571 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21570,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21570,container_21571,el){
return (function (svg){
return (container_21571["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21570,container_21571,el))
);


var G__21573 = seq__21500;
var G__21574 = chunk__21501;
var G__21575 = count__21502;
var G__21576 = (i__21503 + (1));
seq__21500 = G__21573;
chunk__21501 = G__21574;
count__21502 = G__21575;
i__21503 = G__21576;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21577 = cljs.core.chunk_rest(seq__21500__$1);
var G__21578 = c__5525__auto__;
var G__21579 = cljs.core.count(c__5525__auto__);
var G__21580 = (0);
seq__21500 = G__21577;
chunk__21501 = G__21578;
count__21502 = G__21579;
i__21503 = G__21580;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21591 = el.textContent;
var container_21592 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21591,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21591,container_21592,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21592["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21591,container_21592,el,seq__21500__$1,temp__5825__auto__))
);


var G__21593 = cljs.core.next(seq__21500__$1);
var G__21594 = null;
var G__21595 = (0);
var G__21596 = (0);
seq__21500 = G__21593;
chunk__21501 = G__21594;
count__21502 = G__21595;
i__21503 = G__21596;
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
var temp__5825__auto___21597 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21597)){
var saved_21598 = temp__5825__auto___21597;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21598));
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


var G__21604 = seq__21508;
var G__21605 = chunk__21509;
var G__21606 = count__21510;
var G__21607 = (i__21511 + (1));
seq__21508 = G__21604;
chunk__21509 = G__21605;
count__21510 = G__21606;
i__21511 = G__21607;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21508);
if(temp__5825__auto__){
var seq__21508__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21508__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21508__$1);
var G__21608 = cljs.core.chunk_rest(seq__21508__$1);
var G__21609 = c__5525__auto__;
var G__21610 = cljs.core.count(c__5525__auto__);
var G__21611 = (0);
seq__21508 = G__21608;
chunk__21509 = G__21609;
count__21510 = G__21610;
i__21511 = G__21611;
continue;
} else {
var el = cljs.core.first(seq__21508__$1);
hljs.highlightElement(el);


var G__21612 = cljs.core.next(seq__21508__$1);
var G__21613 = null;
var G__21614 = (0);
var G__21615 = (0);
seq__21508 = G__21612;
chunk__21509 = G__21613;
count__21510 = G__21614;
i__21511 = G__21615;
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
