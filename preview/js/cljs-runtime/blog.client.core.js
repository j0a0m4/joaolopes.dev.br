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
var tooltip_id_21504 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21505 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21504);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21489 = goog.dom.createElement("div");
G__21489.setAttribute("id",tooltip_id_21504);

G__21489.setAttribute("role","tooltip");

(G__21489["className"] = "glossary-tooltip");

(G__21489["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21504,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21489,or__5002__auto__,tooltip_id_21504,abbr))
(G__21489);

return G__21489;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21505.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21505);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21505);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21491 = e.key;
var fexpr__21490 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21490.cljs$core$IFn$_invoke$arity$1 ? fexpr__21490.cljs$core$IFn$_invoke$arity$1(G__21491) : fexpr__21490.call(null, G__21491));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21505.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21505);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21505);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21505);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21504,tooltip_21505,abbr))
);


var G__21510 = seq__21477;
var G__21511 = chunk__21478;
var G__21512 = count__21479;
var G__21513 = (i__21480 + (1));
seq__21477 = G__21510;
chunk__21478 = G__21511;
count__21479 = G__21512;
i__21480 = G__21513;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21477);
if(temp__5825__auto__){
var seq__21477__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21477__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21477__$1);
var G__21514 = cljs.core.chunk_rest(seq__21477__$1);
var G__21515 = c__5525__auto__;
var G__21516 = cljs.core.count(c__5525__auto__);
var G__21517 = (0);
seq__21477 = G__21514;
chunk__21478 = G__21515;
count__21479 = G__21516;
i__21480 = G__21517;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
var tooltip_id_21518 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21519 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21518);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21494 = goog.dom.createElement("div");
G__21494.setAttribute("id",tooltip_id_21518);

G__21494.setAttribute("role","tooltip");

(G__21494["className"] = "glossary-tooltip");

(G__21494["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21494,or__5002__auto__,tooltip_id_21518,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21494,or__5002__auto__,tooltip_id_21518,abbr,seq__21477__$1,temp__5825__auto__))
(G__21494);

return G__21494;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21518,tooltip_21519,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21519.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21519);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21519);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21518,tooltip_21519,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21518,tooltip_21519,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21497 = e.key;
var fexpr__21496 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21496.cljs$core$IFn$_invoke$arity$1 ? fexpr__21496.cljs$core$IFn$_invoke$arity$1(G__21497) : fexpr__21496.call(null, G__21497));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21519.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21519);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21519);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21518,tooltip_21519,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21518,tooltip_21519,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21519);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21518,tooltip_21519,abbr,seq__21477__$1,temp__5825__auto__))
);


var G__21531 = cljs.core.next(seq__21477__$1);
var G__21532 = null;
var G__21533 = (0);
var G__21534 = (0);
seq__21477 = G__21531;
chunk__21478 = G__21532;
count__21479 = G__21533;
i__21480 = G__21534;
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

var seq__21499 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21500 = null;
var count__21501 = (0);
var i__21502 = (0);
while(true){
if((i__21502 < count__21501)){
var el = chunk__21500.cljs$core$IIndexed$_nth$arity$2(null, i__21502);
var code_21543 = el.textContent;
var container_21544 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21543,((function (seq__21499,chunk__21500,count__21501,i__21502,code_21543,container_21544,el){
return (function (svg){
return (container_21544["innerHTML"] = svg);
});})(seq__21499,chunk__21500,count__21501,i__21502,code_21543,container_21544,el))
);


var G__21548 = seq__21499;
var G__21549 = chunk__21500;
var G__21550 = count__21501;
var G__21551 = (i__21502 + (1));
seq__21499 = G__21548;
chunk__21500 = G__21549;
count__21501 = G__21550;
i__21502 = G__21551;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21499);
if(temp__5825__auto__){
var seq__21499__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21499__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21499__$1);
var G__21553 = cljs.core.chunk_rest(seq__21499__$1);
var G__21554 = c__5525__auto__;
var G__21555 = cljs.core.count(c__5525__auto__);
var G__21556 = (0);
seq__21499 = G__21553;
chunk__21500 = G__21554;
count__21501 = G__21555;
i__21502 = G__21556;
continue;
} else {
var el = cljs.core.first(seq__21499__$1);
var code_21557 = el.textContent;
var container_21558 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21557,((function (seq__21499,chunk__21500,count__21501,i__21502,code_21557,container_21558,el,seq__21499__$1,temp__5825__auto__){
return (function (svg){
return (container_21558["innerHTML"] = svg);
});})(seq__21499,chunk__21500,count__21501,i__21502,code_21557,container_21558,el,seq__21499__$1,temp__5825__auto__))
);


var G__21561 = cljs.core.next(seq__21499__$1);
var G__21562 = null;
var G__21563 = (0);
var G__21564 = (0);
seq__21499 = G__21561;
chunk__21500 = G__21562;
count__21501 = G__21563;
i__21502 = G__21564;
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
var temp__5825__auto___21576 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21576)){
var saved_21577 = temp__5825__auto___21576;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21577));
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
