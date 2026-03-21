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

((function (seq__21475,chunk__21476,count__21477,i__21478,G__21489,or__5002__auto__,tooltip_id_21512,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21475,chunk__21476,count__21477,i__21478,G__21489,or__5002__auto__,tooltip_id_21512,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21512,tooltip_21513,abbr){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21512,tooltip_21513,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21512,tooltip_21513,abbr){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21512,tooltip_21513,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21512,tooltip_21513,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21513);
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21512,tooltip_21513,abbr))
);


var G__21528 = seq__21475;
var G__21529 = chunk__21476;
var G__21530 = count__21477;
var G__21531 = (i__21478 + (1));
seq__21475 = G__21528;
chunk__21476 = G__21529;
count__21477 = G__21530;
i__21478 = G__21531;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21475);
if(temp__5825__auto__){
var seq__21475__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21475__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21475__$1);
var G__21532 = cljs.core.chunk_rest(seq__21475__$1);
var G__21533 = c__5525__auto__;
var G__21534 = cljs.core.count(c__5525__auto__);
var G__21535 = (0);
seq__21475 = G__21532;
chunk__21476 = G__21533;
count__21477 = G__21534;
i__21478 = G__21535;
continue;
} else {
var abbr = cljs.core.first(seq__21475__$1);
var tooltip_id_21541 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21542 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21541);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21494 = goog.dom.createElement("div");
G__21494.setAttribute("id",tooltip_id_21541);

G__21494.setAttribute("role","tooltip");

(G__21494["className"] = "glossary-tooltip");

(G__21494["textContent"] = abbr.dataset.definition);

((function (seq__21475,chunk__21476,count__21477,i__21478,G__21494,or__5002__auto__,tooltip_id_21541,abbr,seq__21475__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21475,chunk__21476,count__21477,i__21478,G__21494,or__5002__auto__,tooltip_id_21541,abbr,seq__21475__$1,temp__5825__auto__))
(G__21494);

return G__21494;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21541,tooltip_21542,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21542.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21542);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21542);
}
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21541,tooltip_21542,abbr,seq__21475__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21541,tooltip_21542,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21499 = e.key;
var fexpr__21498 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21498.cljs$core$IFn$_invoke$arity$1 ? fexpr__21498.cljs$core$IFn$_invoke$arity$1(G__21499) : fexpr__21498.call(null, G__21499));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21542.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21542);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21542);
}
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21541,tooltip_21542,abbr,seq__21475__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21541,tooltip_21542,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21542);
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21541,tooltip_21542,abbr,seq__21475__$1,temp__5825__auto__))
);


var G__21555 = cljs.core.next(seq__21475__$1);
var G__21556 = null;
var G__21557 = (0);
var G__21558 = (0);
seq__21475 = G__21555;
chunk__21476 = G__21556;
count__21477 = G__21557;
i__21478 = G__21558;
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
var code_21568 = el.textContent;
var container_21569 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21568,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21568,container_21569,el){
return (function (svg){
return (container_21569["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21568,container_21569,el))
);


var G__21574 = seq__21500;
var G__21575 = chunk__21501;
var G__21576 = count__21502;
var G__21577 = (i__21503 + (1));
seq__21500 = G__21574;
chunk__21501 = G__21575;
count__21502 = G__21576;
i__21503 = G__21577;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21578 = cljs.core.chunk_rest(seq__21500__$1);
var G__21579 = c__5525__auto__;
var G__21580 = cljs.core.count(c__5525__auto__);
var G__21581 = (0);
seq__21500 = G__21578;
chunk__21501 = G__21579;
count__21502 = G__21580;
i__21503 = G__21581;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21582 = el.textContent;
var container_21583 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21582,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21582,container_21583,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21583["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21582,container_21583,el,seq__21500__$1,temp__5825__auto__))
);


var G__21588 = cljs.core.next(seq__21500__$1);
var G__21589 = null;
var G__21590 = (0);
var G__21591 = (0);
seq__21500 = G__21588;
chunk__21501 = G__21589;
count__21502 = G__21590;
i__21503 = G__21591;
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
var temp__5825__auto___21592 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21592)){
var saved_21593 = temp__5825__auto___21592;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21593));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21506 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21507 = null;
var count__21508 = (0);
var i__21509 = (0);
while(true){
if((i__21509 < count__21508)){
var el = chunk__21507.cljs$core$IIndexed$_nth$arity$2(null, i__21509);
hljs.highlightElement(el);


var G__21595 = seq__21506;
var G__21596 = chunk__21507;
var G__21597 = count__21508;
var G__21598 = (i__21509 + (1));
seq__21506 = G__21595;
chunk__21507 = G__21596;
count__21508 = G__21597;
i__21509 = G__21598;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21506);
if(temp__5825__auto__){
var seq__21506__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21506__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21506__$1);
var G__21603 = cljs.core.chunk_rest(seq__21506__$1);
var G__21604 = c__5525__auto__;
var G__21605 = cljs.core.count(c__5525__auto__);
var G__21606 = (0);
seq__21506 = G__21603;
chunk__21507 = G__21604;
count__21508 = G__21605;
i__21509 = G__21606;
continue;
} else {
var el = cljs.core.first(seq__21506__$1);
hljs.highlightElement(el);


var G__21607 = cljs.core.next(seq__21506__$1);
var G__21608 = null;
var G__21609 = (0);
var G__21610 = (0);
seq__21506 = G__21607;
chunk__21507 = G__21608;
count__21508 = G__21609;
i__21509 = G__21610;
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
