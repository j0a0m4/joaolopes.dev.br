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
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
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
if(cljs.core.truth_((function (){var G__21493 = e.key;
var fexpr__21492 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21492.cljs$core$IFn$_invoke$arity$1 ? fexpr__21492.cljs$core$IFn$_invoke$arity$1(G__21493) : fexpr__21492.call(null, G__21493));
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
var G__21542 = cljs.core.chunk_rest(seq__21477__$1);
var G__21543 = c__5525__auto__;
var G__21544 = cljs.core.count(c__5525__auto__);
var G__21545 = (0);
seq__21477 = G__21542;
chunk__21478 = G__21543;
count__21479 = G__21544;
i__21480 = G__21545;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
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

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21495,or__5002__auto__,tooltip_id_21546,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21495,or__5002__auto__,tooltip_id_21546,abbr,seq__21477__$1,temp__5825__auto__))
(G__21495);

return G__21495;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__){
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
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__){
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
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21547);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21546,tooltip_21547,abbr,seq__21477__$1,temp__5825__auto__))
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

var seq__21498 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21499 = null;
var count__21500 = (0);
var i__21501 = (0);
while(true){
if((i__21501 < count__21500)){
var el = chunk__21499.cljs$core$IIndexed$_nth$arity$2(null, i__21501);
var code_21563 = el.textContent;
var container_21564 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21563,((function (seq__21498,chunk__21499,count__21500,i__21501,code_21563,container_21564,el){
return (function (svg){
return (container_21564["innerHTML"] = svg);
});})(seq__21498,chunk__21499,count__21500,i__21501,code_21563,container_21564,el))
);


var G__21565 = seq__21498;
var G__21566 = chunk__21499;
var G__21567 = count__21500;
var G__21568 = (i__21501 + (1));
seq__21498 = G__21565;
chunk__21499 = G__21566;
count__21500 = G__21567;
i__21501 = G__21568;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21498);
if(temp__5825__auto__){
var seq__21498__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21498__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21498__$1);
var G__21569 = cljs.core.chunk_rest(seq__21498__$1);
var G__21570 = c__5525__auto__;
var G__21571 = cljs.core.count(c__5525__auto__);
var G__21572 = (0);
seq__21498 = G__21569;
chunk__21499 = G__21570;
count__21500 = G__21571;
i__21501 = G__21572;
continue;
} else {
var el = cljs.core.first(seq__21498__$1);
var code_21573 = el.textContent;
var container_21574 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21573,((function (seq__21498,chunk__21499,count__21500,i__21501,code_21573,container_21574,el,seq__21498__$1,temp__5825__auto__){
return (function (svg){
return (container_21574["innerHTML"] = svg);
});})(seq__21498,chunk__21499,count__21500,i__21501,code_21573,container_21574,el,seq__21498__$1,temp__5825__auto__))
);


var G__21583 = cljs.core.next(seq__21498__$1);
var G__21584 = null;
var G__21585 = (0);
var G__21586 = (0);
seq__21498 = G__21583;
chunk__21499 = G__21584;
count__21500 = G__21585;
i__21501 = G__21586;
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
var temp__5825__auto___21587 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21587)){
var saved_21588 = temp__5825__auto___21587;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21588));
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


var G__21590 = seq__21506;
var G__21591 = chunk__21507;
var G__21592 = count__21508;
var G__21593 = (i__21509 + (1));
seq__21506 = G__21590;
chunk__21507 = G__21591;
count__21508 = G__21592;
i__21509 = G__21593;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21506);
if(temp__5825__auto__){
var seq__21506__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21506__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21506__$1);
var G__21594 = cljs.core.chunk_rest(seq__21506__$1);
var G__21595 = c__5525__auto__;
var G__21596 = cljs.core.count(c__5525__auto__);
var G__21597 = (0);
seq__21506 = G__21594;
chunk__21507 = G__21595;
count__21508 = G__21596;
i__21509 = G__21597;
continue;
} else {
var el = cljs.core.first(seq__21506__$1);
hljs.highlightElement(el);


var G__21603 = cljs.core.next(seq__21506__$1);
var G__21604 = null;
var G__21605 = (0);
var G__21606 = (0);
seq__21506 = G__21603;
chunk__21507 = G__21604;
count__21508 = G__21605;
i__21509 = G__21606;
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
