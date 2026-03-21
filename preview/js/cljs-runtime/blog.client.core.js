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
var tooltip_id_21507 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21508 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21507);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21507);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21489,or__5002__auto__,tooltip_id_21507,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21489,or__5002__auto__,tooltip_id_21507,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21507,tooltip_21508,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21508.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21508);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21508);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21507,tooltip_21508,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21507,tooltip_21508,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21493 = e.key;
var fexpr__21492 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21492.cljs$core$IFn$_invoke$arity$1 ? fexpr__21492.cljs$core$IFn$_invoke$arity$1(G__21493) : fexpr__21492.call(null, G__21493));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21508.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21508);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21508);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21507,tooltip_21508,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21507,tooltip_21508,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21508);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21507,tooltip_21508,abbr))
);


var G__21517 = seq__21479;
var G__21518 = chunk__21480;
var G__21519 = count__21481;
var G__21520 = (i__21482 + (1));
seq__21479 = G__21517;
chunk__21480 = G__21518;
count__21481 = G__21519;
i__21482 = G__21520;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21479);
if(temp__5825__auto__){
var seq__21479__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21479__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21479__$1);
var G__21522 = cljs.core.chunk_rest(seq__21479__$1);
var G__21523 = c__5525__auto__;
var G__21524 = cljs.core.count(c__5525__auto__);
var G__21525 = (0);
seq__21479 = G__21522;
chunk__21480 = G__21523;
count__21481 = G__21524;
i__21482 = G__21525;
continue;
} else {
var abbr = cljs.core.first(seq__21479__$1);
var tooltip_id_21530 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21531 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21530);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21495 = goog.dom.createElement("div");
G__21495.setAttribute("id",tooltip_id_21530);

G__21495.setAttribute("role","tooltip");

(G__21495["className"] = "glossary-tooltip");

(G__21495["textContent"] = abbr.dataset.definition);

((function (seq__21479,chunk__21480,count__21481,i__21482,G__21495,or__5002__auto__,tooltip_id_21530,abbr,seq__21479__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21479,chunk__21480,count__21481,i__21482,G__21495,or__5002__auto__,tooltip_id_21530,abbr,seq__21479__$1,temp__5825__auto__))
(G__21495);

return G__21495;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21530,tooltip_21531,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21531.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21531);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21531);
}
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21530,tooltip_21531,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21530,tooltip_21531,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21498 = e.key;
var fexpr__21497 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21497.cljs$core$IFn$_invoke$arity$1 ? fexpr__21497.cljs$core$IFn$_invoke$arity$1(G__21498) : fexpr__21497.call(null, G__21498));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21531.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21531);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21531);
}
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21530,tooltip_21531,abbr,seq__21479__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21530,tooltip_21531,abbr,seq__21479__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21531);
} else {
return null;
}
});})(seq__21479,chunk__21480,count__21481,i__21482,tooltip_id_21530,tooltip_21531,abbr,seq__21479__$1,temp__5825__auto__))
);


var G__21544 = cljs.core.next(seq__21479__$1);
var G__21545 = null;
var G__21546 = (0);
var G__21547 = (0);
seq__21479 = G__21544;
chunk__21480 = G__21545;
count__21481 = G__21546;
i__21482 = G__21547;
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
var code_21548 = el.textContent;
var container_21549 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21548,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21548,container_21549,el){
return (function (svg){
return (container_21549["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21548,container_21549,el))
);


var G__21550 = seq__21500;
var G__21551 = chunk__21501;
var G__21552 = count__21502;
var G__21553 = (i__21503 + (1));
seq__21500 = G__21550;
chunk__21501 = G__21551;
count__21502 = G__21552;
i__21503 = G__21553;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21500);
if(temp__5825__auto__){
var seq__21500__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21500__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21500__$1);
var G__21566 = cljs.core.chunk_rest(seq__21500__$1);
var G__21567 = c__5525__auto__;
var G__21568 = cljs.core.count(c__5525__auto__);
var G__21569 = (0);
seq__21500 = G__21566;
chunk__21501 = G__21567;
count__21502 = G__21568;
i__21503 = G__21569;
continue;
} else {
var el = cljs.core.first(seq__21500__$1);
var code_21570 = el.textContent;
var container_21571 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21570,((function (seq__21500,chunk__21501,count__21502,i__21503,code_21570,container_21571,el,seq__21500__$1,temp__5825__auto__){
return (function (svg){
return (container_21571["innerHTML"] = svg);
});})(seq__21500,chunk__21501,count__21502,i__21503,code_21570,container_21571,el,seq__21500__$1,temp__5825__auto__))
);


var G__21574 = cljs.core.next(seq__21500__$1);
var G__21575 = null;
var G__21576 = (0);
var G__21577 = (0);
seq__21500 = G__21574;
chunk__21501 = G__21575;
count__21502 = G__21576;
i__21503 = G__21577;
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
var temp__5825__auto___21579 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21579)){
var saved_21580 = temp__5825__auto___21579;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21580));
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
