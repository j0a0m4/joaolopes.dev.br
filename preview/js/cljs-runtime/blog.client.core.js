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

((function (seq__21475,chunk__21476,count__21477,i__21478,G__21489,or__5002__auto__,tooltip_id_21523,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21475,chunk__21476,count__21477,i__21478,G__21489,or__5002__auto__,tooltip_id_21523,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21523,tooltip_21524,abbr){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21523,tooltip_21524,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21523,tooltip_21524,abbr){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21523,tooltip_21524,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21523,tooltip_21524,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21524);
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21523,tooltip_21524,abbr))
);


var G__21538 = seq__21475;
var G__21539 = chunk__21476;
var G__21540 = count__21477;
var G__21541 = (i__21478 + (1));
seq__21475 = G__21538;
chunk__21476 = G__21539;
count__21477 = G__21540;
i__21478 = G__21541;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21475);
if(temp__5825__auto__){
var seq__21475__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21475__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21475__$1);
var G__21542 = cljs.core.chunk_rest(seq__21475__$1);
var G__21543 = c__5525__auto__;
var G__21544 = cljs.core.count(c__5525__auto__);
var G__21545 = (0);
seq__21475 = G__21542;
chunk__21476 = G__21543;
count__21477 = G__21544;
i__21478 = G__21545;
continue;
} else {
var abbr = cljs.core.first(seq__21475__$1);
var tooltip_id_21546 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21547 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21546);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21495 = goog.dom.createElement("div");
G__21495.setAttribute("id",tooltip_id_21546);

G__21495.setAttribute("role","tooltip");

(G__21495["className"] = "glossary-tooltip");

(G__21495["textContent"] = abbr.dataset.definition);

((function (seq__21475,chunk__21476,count__21477,i__21478,G__21495,or__5002__auto__,tooltip_id_21546,abbr,seq__21475__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21475,chunk__21476,count__21477,i__21478,G__21495,or__5002__auto__,tooltip_id_21546,abbr,seq__21475__$1,temp__5825__auto__))
(G__21495);

return G__21495;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21546,tooltip_21547,abbr,seq__21475__$1,temp__5825__auto__){
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21546,tooltip_21547,abbr,seq__21475__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21546,tooltip_21547,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21497 = e.key;
var fexpr__21496 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21496.cljs$core$IFn$_invoke$arity$1 ? fexpr__21496.cljs$core$IFn$_invoke$arity$1(G__21497) : fexpr__21496.call(null, G__21497));
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
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21546,tooltip_21547,abbr,seq__21475__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21546,tooltip_21547,abbr,seq__21475__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21547);
} else {
return null;
}
});})(seq__21475,chunk__21476,count__21477,i__21478,tooltip_id_21546,tooltip_21547,abbr,seq__21475__$1,temp__5825__auto__))
);


var G__21564 = cljs.core.next(seq__21475__$1);
var G__21565 = null;
var G__21566 = (0);
var G__21567 = (0);
seq__21475 = G__21564;
chunk__21476 = G__21565;
count__21477 = G__21566;
i__21478 = G__21567;
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
var code_21571 = el.textContent;
var container_21572 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21571,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21571,container_21572,el){
return (function (svg){
return (container_21572["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21571,container_21572,el))
);


var G__21579 = seq__21500;
var G__21580 = chunk__21501;
var G__21581 = count__21502;
var G__21582 = (i__21503 + (1));
seq__21500 = G__21579;
chunk__21501 = G__21580;
count__21502 = G__21581;
i__21503 = G__21582;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21584 = cljs.core.chunk_rest(seq__21500__$1);
var G__21585 = c__5525__auto__;
var G__21586 = cljs.core.count(c__5525__auto__);
var G__21587 = (0);
seq__21500 = G__21584;
chunk__21501 = G__21585;
count__21502 = G__21586;
i__21503 = G__21587;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21590 = el.textContent;
var container_21591 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21590,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21590,container_21591,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21591["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21590,container_21591,el,seq__21500__$1,temp__5825__auto__))
);


var G__21596 = cljs.core.next(seq__21500__$1);
var G__21597 = null;
var G__21598 = (0);
var G__21599 = (0);
seq__21500 = G__21596;
chunk__21501 = G__21597;
count__21502 = G__21598;
i__21503 = G__21599;
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
var temp__5825__auto___21600 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21600)){
var saved_21601 = temp__5825__auto___21600;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21601));
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


var G__21607 = seq__21504;
var G__21608 = chunk__21505;
var G__21609 = count__21506;
var G__21610 = (i__21507 + (1));
seq__21504 = G__21607;
chunk__21505 = G__21608;
count__21506 = G__21609;
i__21507 = G__21610;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21504);
if(temp__5825__auto__){
var seq__21504__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21504__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21504__$1);
var G__21611 = cljs.core.chunk_rest(seq__21504__$1);
var G__21612 = c__5525__auto__;
var G__21613 = cljs.core.count(c__5525__auto__);
var G__21614 = (0);
seq__21504 = G__21611;
chunk__21505 = G__21612;
count__21506 = G__21613;
i__21507 = G__21614;
continue;
} else {
var el = cljs.core.first(seq__21504__$1);
hljs.highlightElement(el);


var G__21615 = cljs.core.next(seq__21504__$1);
var G__21616 = null;
var G__21617 = (0);
var G__21618 = (0);
seq__21504 = G__21615;
chunk__21505 = G__21616;
count__21506 = G__21617;
i__21507 = G__21618;
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
