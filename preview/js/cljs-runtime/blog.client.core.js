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
var seq__21474 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("glossary-term")));
var chunk__21475 = null;
var count__21476 = (0);
var i__21477 = (0);
while(true){
if((i__21477 < count__21476)){
var abbr = chunk__21475.cljs$core$IIndexed$_nth$arity$2(null, i__21477);
var tooltip_id_21526 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21527 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21526);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
var link = goog.dom.createElement("a");
div.setAttribute("id",tooltip_id_21526);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.definition)," <a href=\"/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug),"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));

abbr.parentNode.appendChild(div);

return div;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21526,tooltip_21527,abbr){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21527.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21527);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21527);
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21526,tooltip_21527,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21526,tooltip_21527,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21487 = e.key;
var fexpr__21486 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21486.cljs$core$IFn$_invoke$arity$1 ? fexpr__21486.cljs$core$IFn$_invoke$arity$1(G__21487) : fexpr__21486.call(null, G__21487));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21527.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21527);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21527);
}
} else {
return null;
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21526,tooltip_21527,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21526,tooltip_21527,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21527);
} else {
return null;
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21526,tooltip_21527,abbr))
);


var G__21537 = seq__21474;
var G__21538 = chunk__21475;
var G__21539 = count__21476;
var G__21540 = (i__21477 + (1));
seq__21474 = G__21537;
chunk__21475 = G__21538;
count__21476 = G__21539;
i__21477 = G__21540;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21474);
if(temp__5825__auto__){
var seq__21474__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21474__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21474__$1);
var G__21541 = cljs.core.chunk_rest(seq__21474__$1);
var G__21542 = c__5525__auto__;
var G__21543 = cljs.core.count(c__5525__auto__);
var G__21544 = (0);
seq__21474 = G__21541;
chunk__21475 = G__21542;
count__21476 = G__21543;
i__21477 = G__21544;
continue;
} else {
var abbr = cljs.core.first(seq__21474__$1);
var tooltip_id_21545 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21546 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21545);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
var link = goog.dom.createElement("a");
div.setAttribute("id",tooltip_id_21545);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.definition)," <a href=\"/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug),"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));

abbr.parentNode.appendChild(div);

return div;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21545,tooltip_21546,abbr,seq__21474__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21546.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21546);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21546);
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21545,tooltip_21546,abbr,seq__21474__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21545,tooltip_21546,abbr,seq__21474__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21492 = e.key;
var fexpr__21491 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21491.cljs$core$IFn$_invoke$arity$1 ? fexpr__21491.cljs$core$IFn$_invoke$arity$1(G__21492) : fexpr__21491.call(null, G__21492));
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
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21545,tooltip_21546,abbr,seq__21474__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21545,tooltip_21546,abbr,seq__21474__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21546);
} else {
return null;
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21545,tooltip_21546,abbr,seq__21474__$1,temp__5825__auto__))
);


var G__21548 = cljs.core.next(seq__21474__$1);
var G__21549 = null;
var G__21550 = (0);
var G__21551 = (0);
seq__21474 = G__21548;
chunk__21475 = G__21549;
count__21476 = G__21550;
i__21477 = G__21551;
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

var seq__21493 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21494 = null;
var count__21495 = (0);
var i__21496 = (0);
while(true){
if((i__21496 < count__21495)){
var el = chunk__21494.cljs$core$IIndexed$_nth$arity$2(null, i__21496);
var code_21559 = el.textContent;
var container_21560 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21559,((function (seq__21493,chunk__21494,count__21495,i__21496,code_21559,container_21560,el){
return (function (svg){
return (container_21560["innerHTML"] = svg);
});})(seq__21493,chunk__21494,count__21495,i__21496,code_21559,container_21560,el))
);


var G__21562 = seq__21493;
var G__21563 = chunk__21494;
var G__21564 = count__21495;
var G__21565 = (i__21496 + (1));
seq__21493 = G__21562;
chunk__21494 = G__21563;
count__21495 = G__21564;
i__21496 = G__21565;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21493);
if(temp__5825__auto__){
var seq__21493__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21493__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21493__$1);
var G__21570 = cljs.core.chunk_rest(seq__21493__$1);
var G__21571 = c__5525__auto__;
var G__21572 = cljs.core.count(c__5525__auto__);
var G__21573 = (0);
seq__21493 = G__21570;
chunk__21494 = G__21571;
count__21495 = G__21572;
i__21496 = G__21573;
continue;
} else {
var el = cljs.core.first(seq__21493__$1);
var code_21574 = el.textContent;
var container_21575 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21574,((function (seq__21493,chunk__21494,count__21495,i__21496,code_21574,container_21575,el,seq__21493__$1,temp__5825__auto__){
return (function (svg){
return (container_21575["innerHTML"] = svg);
});})(seq__21493,chunk__21494,count__21495,i__21496,code_21574,container_21575,el,seq__21493__$1,temp__5825__auto__))
);


var G__21576 = cljs.core.next(seq__21493__$1);
var G__21577 = null;
var G__21578 = (0);
var G__21579 = (0);
seq__21493 = G__21576;
chunk__21494 = G__21577;
count__21495 = G__21578;
i__21496 = G__21579;
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
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21503 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21504 = null;
var count__21505 = (0);
var i__21506 = (0);
while(true){
if((i__21506 < count__21505)){
var el = chunk__21504.cljs$core$IIndexed$_nth$arity$2(null, i__21506);
hljs.highlightElement(el);


var G__21586 = seq__21503;
var G__21587 = chunk__21504;
var G__21588 = count__21505;
var G__21589 = (i__21506 + (1));
seq__21503 = G__21586;
chunk__21504 = G__21587;
count__21505 = G__21588;
i__21506 = G__21589;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21503);
if(temp__5825__auto__){
var seq__21503__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21503__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21503__$1);
var G__21601 = cljs.core.chunk_rest(seq__21503__$1);
var G__21602 = c__5525__auto__;
var G__21603 = cljs.core.count(c__5525__auto__);
var G__21604 = (0);
seq__21503 = G__21601;
chunk__21504 = G__21602;
count__21505 = G__21603;
i__21506 = G__21604;
continue;
} else {
var el = cljs.core.first(seq__21503__$1);
hljs.highlightElement(el);


var G__21605 = cljs.core.next(seq__21503__$1);
var G__21606 = null;
var G__21607 = (0);
var G__21608 = (0);
seq__21503 = G__21605;
chunk__21504 = G__21606;
count__21505 = G__21607;
i__21506 = G__21608;
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
