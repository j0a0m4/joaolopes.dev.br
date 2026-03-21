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
var seq__21475 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("glossary-term")));
var chunk__21476 = null;
var count__21477 = (0);
var i__21478 = (0);
while(true){
if((i__21478 < count__21477)){
var abbr = chunk__21476.cljs$core$IIndexed$_nth$arity$2(null, i__21478);
var tooltip_id_21516 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21517 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21516);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21516);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21475,chunk__21476,count__21477,i__21478,G__21489,or__5002__auto__,tooltip_id_21516,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21475,chunk__21476,count__21477,i__21478,G__21489,or__5002__auto__,tooltip_id_21516,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21516,tooltip_21517,abbr){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21516,tooltip_21517,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21516,tooltip_21517,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21516,tooltip_21517,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21516,tooltip_21517,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21517);
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21516,tooltip_21517,abbr))
);


var G__21521 = seq__21475;
var G__21522 = chunk__21476;
var G__21523 = count__21477;
var G__21524 = (i__21478 + (1));
seq__21475 = G__21521;
chunk__21476 = G__21522;
count__21477 = G__21523;
i__21478 = G__21524;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21475);
if(temp__5825__auto__){
var seq__21475__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21475__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21475__$1);
var G__21525 = cljs.core.chunk_rest(seq__21475__$1);
var G__21526 = c__5525__auto__;
var G__21527 = cljs.core.count(c__5525__auto__);
var G__21528 = (0);
seq__21475 = G__21525;
chunk__21476 = G__21526;
count__21477 = G__21527;
i__21478 = G__21528;
continue;
} else {
var abbr = cljs.core.first(seq__21475__$1);
var tooltip_id_21529 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21530 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21529);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21492 = goog.dom.createElement("div");
G__21492.setAttribute("id",tooltip_id_21529);

G__21492.setAttribute("role","tooltip");

(G__21492["className"] = "glossary-tooltip");

(G__21492["textContent"] = abbr.dataset.definition);

((function (seq__21475,chunk__21476,count__21477,i__21478,G__21492,or__5002__auto__,tooltip_id_21529,abbr,seq__21475__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21475,chunk__21476,count__21477,i__21478,G__21492,or__5002__auto__,tooltip_id_21529,abbr,seq__21475__$1,temp__5825__auto__))
(G__21492);

return G__21492;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21529,tooltip_21530,abbr,seq__21475__$1,temp__5825__auto__){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21529,tooltip_21530,abbr,seq__21475__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21529,tooltip_21530,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21497 = e.key;
var fexpr__21496 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21496.cljs$core$IFn$_invoke$arity$1 ? fexpr__21496.cljs$core$IFn$_invoke$arity$1(G__21497) : fexpr__21496.call(null, G__21497));
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21529,tooltip_21530,abbr,seq__21475__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21529,tooltip_21530,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21530);
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21529,tooltip_21530,abbr,seq__21475__$1,temp__5825__auto__))
);


var G__21547 = cljs.core.next(seq__21475__$1);
var G__21548 = null;
var G__21549 = (0);
var G__21550 = (0);
seq__21475 = G__21547;
chunk__21476 = G__21548;
count__21477 = G__21549;
i__21478 = G__21550;
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
var code_21556 = el.textContent;
var container_21557 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21556,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21556,container_21557,el){
return (function (svg){
return (container_21557["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21556,container_21557,el))
);


var G__21558 = seq__21500;
var G__21559 = chunk__21501;
var G__21560 = count__21502;
var G__21561 = (i__21503 + (1));
seq__21500 = G__21558;
chunk__21501 = G__21559;
count__21502 = G__21560;
i__21503 = G__21561;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21562 = cljs.core.chunk_rest(seq__21500__$1);
var G__21563 = c__5525__auto__;
var G__21564 = cljs.core.count(c__5525__auto__);
var G__21565 = (0);
seq__21500 = G__21562;
chunk__21501 = G__21563;
count__21502 = G__21564;
i__21503 = G__21565;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21566 = el.textContent;
var container_21567 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21566,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21566,container_21567,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21567["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21566,container_21567,el,seq__21500__$1,temp__5825__auto__))
);


var G__21568 = cljs.core.next(seq__21500__$1);
var G__21569 = null;
var G__21570 = (0);
var G__21571 = (0);
seq__21500 = G__21568;
chunk__21501 = G__21569;
count__21502 = G__21570;
i__21503 = G__21571;
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
var seq__21508 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21509 = null;
var count__21510 = (0);
var i__21511 = (0);
while(true){
if((i__21511 < count__21510)){
var el = chunk__21509.cljs$core$IIndexed$_nth$arity$2(null, i__21511);
hljs.highlightElement(el);


var G__21579 = seq__21508;
var G__21580 = chunk__21509;
var G__21581 = count__21510;
var G__21582 = (i__21511 + (1));
seq__21508 = G__21579;
chunk__21509 = G__21580;
count__21510 = G__21581;
i__21511 = G__21582;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21508);
if(temp__5825__auto__){
var seq__21508__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21508__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21508__$1);
var G__21583 = cljs.core.chunk_rest(seq__21508__$1);
var G__21584 = c__5525__auto__;
var G__21585 = cljs.core.count(c__5525__auto__);
var G__21586 = (0);
seq__21508 = G__21583;
chunk__21509 = G__21584;
count__21510 = G__21585;
i__21511 = G__21586;
continue;
} else {
var el = cljs.core.first(seq__21508__$1);
hljs.highlightElement(el);


var G__21587 = cljs.core.next(seq__21508__$1);
var G__21588 = null;
var G__21589 = (0);
var G__21590 = (0);
seq__21508 = G__21587;
chunk__21509 = G__21588;
count__21510 = G__21589;
i__21511 = G__21590;
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
