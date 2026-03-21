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
var tooltip_id_21534 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21535 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21534);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21534);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21474,chunk__21475,count__21476,i__21477,G__21489,or__5002__auto__,tooltip_id_21534,abbr){
return (function (p1__21473_SHARP_){
return abbr.parentNode.appendChild(p1__21473_SHARP_);
});})(seq__21474,chunk__21475,count__21476,i__21477,G__21489,or__5002__auto__,tooltip_id_21534,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21534,tooltip_21535,abbr){
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
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21534,tooltip_21535,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21534,tooltip_21535,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
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
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21534,tooltip_21535,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21534,tooltip_21535,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21535);
} else {
return null;
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21534,tooltip_21535,abbr))
);


var G__21547 = seq__21474;
var G__21548 = chunk__21475;
var G__21549 = count__21476;
var G__21550 = (i__21477 + (1));
seq__21474 = G__21547;
chunk__21475 = G__21548;
count__21476 = G__21549;
i__21477 = G__21550;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21474);
if(temp__5825__auto__){
var seq__21474__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21474__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21474__$1);
var G__21551 = cljs.core.chunk_rest(seq__21474__$1);
var G__21552 = c__5525__auto__;
var G__21553 = cljs.core.count(c__5525__auto__);
var G__21554 = (0);
seq__21474 = G__21551;
chunk__21475 = G__21552;
count__21476 = G__21553;
i__21477 = G__21554;
continue;
} else {
var abbr = cljs.core.first(seq__21474__$1);
var tooltip_id_21555 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21556 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21555);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21492 = goog.dom.createElement("div");
G__21492.setAttribute("id",tooltip_id_21555);

G__21492.setAttribute("role","tooltip");

(G__21492["className"] = "glossary-tooltip");

(G__21492["textContent"] = abbr.dataset.definition);

((function (seq__21474,chunk__21475,count__21476,i__21477,G__21492,or__5002__auto__,tooltip_id_21555,abbr,seq__21474__$1,temp__5825__auto__){
return (function (p1__21473_SHARP_){
return abbr.parentNode.appendChild(p1__21473_SHARP_);
});})(seq__21474,chunk__21475,count__21476,i__21477,G__21492,or__5002__auto__,tooltip_id_21555,abbr,seq__21474__$1,temp__5825__auto__))
(G__21492);

return G__21492;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21555,tooltip_21556,abbr,seq__21474__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21556.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21556);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21556);
}
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21555,tooltip_21556,abbr,seq__21474__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21555,tooltip_21556,abbr,seq__21474__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21499 = e.key;
var fexpr__21498 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21498.cljs$core$IFn$_invoke$arity$1 ? fexpr__21498.cljs$core$IFn$_invoke$arity$1(G__21499) : fexpr__21498.call(null, G__21499));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21556.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21556);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21556);
}
} else {
return null;
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21555,tooltip_21556,abbr,seq__21474__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21555,tooltip_21556,abbr,seq__21474__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21556);
} else {
return null;
}
});})(seq__21474,chunk__21475,count__21476,i__21477,tooltip_id_21555,tooltip_21556,abbr,seq__21474__$1,temp__5825__auto__))
);


var G__21565 = cljs.core.next(seq__21474__$1);
var G__21566 = null;
var G__21567 = (0);
var G__21568 = (0);
seq__21474 = G__21565;
chunk__21475 = G__21566;
count__21476 = G__21567;
i__21477 = G__21568;
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
var code_21589 = el.textContent;
var container_21590 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21589,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21589,container_21590,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21590["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21589,container_21590,el,seq__21500__$1,temp__5825__auto__))
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
var temp__5825__auto___21598 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21598)){
var saved_21599 = temp__5825__auto___21598;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21599));
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


var G__21606 = seq__21504;
var G__21607 = chunk__21505;
var G__21608 = count__21506;
var G__21609 = (i__21507 + (1));
seq__21504 = G__21606;
chunk__21505 = G__21607;
count__21506 = G__21608;
i__21507 = G__21609;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21504);
if(temp__5825__auto__){
var seq__21504__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21504__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21504__$1);
var G__21610 = cljs.core.chunk_rest(seq__21504__$1);
var G__21611 = c__5525__auto__;
var G__21612 = cljs.core.count(c__5525__auto__);
var G__21613 = (0);
seq__21504 = G__21610;
chunk__21505 = G__21611;
count__21506 = G__21612;
i__21507 = G__21613;
continue;
} else {
var el = cljs.core.first(seq__21504__$1);
hljs.highlightElement(el);


var G__21614 = cljs.core.next(seq__21504__$1);
var G__21615 = null;
var G__21616 = (0);
var G__21617 = (0);
seq__21504 = G__21614;
chunk__21505 = G__21615;
count__21506 = G__21616;
i__21507 = G__21617;
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
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21512 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21513 = null;
var count__21514 = (0);
var i__21515 = (0);
while(true){
if((i__21515 < count__21514)){
var el = chunk__21513.cljs$core$IIndexed$_nth$arity$2(null, i__21515);
hljs.highlightElement(el);


var G__21618 = seq__21512;
var G__21619 = chunk__21513;
var G__21620 = count__21514;
var G__21621 = (i__21515 + (1));
seq__21512 = G__21618;
chunk__21513 = G__21619;
count__21514 = G__21620;
i__21515 = G__21621;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21512);
if(temp__5825__auto__){
var seq__21512__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21512__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21512__$1);
var G__21623 = cljs.core.chunk_rest(seq__21512__$1);
var G__21624 = c__5525__auto__;
var G__21625 = cljs.core.count(c__5525__auto__);
var G__21626 = (0);
seq__21512 = G__21623;
chunk__21513 = G__21624;
count__21514 = G__21625;
i__21515 = G__21626;
continue;
} else {
var el = cljs.core.first(seq__21512__$1);
hljs.highlightElement(el);


var G__21627 = cljs.core.next(seq__21512__$1);
var G__21628 = null;
var G__21629 = (0);
var G__21630 = (0);
seq__21512 = G__21627;
chunk__21513 = G__21628;
count__21514 = G__21629;
i__21515 = G__21630;
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
