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
var tooltip_id_21531 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21532 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21531);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21494 = goog.dom.createElement("div");
G__21494.setAttribute("id",tooltip_id_21531);

G__21494.setAttribute("role","tooltip");

(G__21494["className"] = "glossary-tooltip");

(G__21494["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21494,or__5002__auto__,tooltip_id_21531,abbr){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21494,or__5002__auto__,tooltip_id_21531,abbr))
(G__21494);

return G__21494;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21531,tooltip_21532,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21532.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21532);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21532);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21531,tooltip_21532,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21531,tooltip_21532,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__21496 = e.key;
var fexpr__21495 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21495.cljs$core$IFn$_invoke$arity$1 ? fexpr__21495.cljs$core$IFn$_invoke$arity$1(G__21496) : fexpr__21495.call(null, G__21496));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21532.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21532);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21532);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21531,tooltip_21532,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21531,tooltip_21532,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21532);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21531,tooltip_21532,abbr))
);


var G__21544 = seq__21477;
var G__21545 = chunk__21478;
var G__21546 = count__21479;
var G__21547 = (i__21480 + (1));
seq__21477 = G__21544;
chunk__21478 = G__21545;
count__21479 = G__21546;
i__21480 = G__21547;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21477);
if(temp__5825__auto__){
var seq__21477__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21477__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21477__$1);
var G__21548 = cljs.core.chunk_rest(seq__21477__$1);
var G__21549 = c__5525__auto__;
var G__21550 = cljs.core.count(c__5525__auto__);
var G__21551 = (0);
seq__21477 = G__21548;
chunk__21478 = G__21549;
count__21479 = G__21550;
i__21480 = G__21551;
continue;
} else {
var abbr = cljs.core.first(seq__21477__$1);
var tooltip_id_21552 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_21553 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21552);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__21497 = goog.dom.createElement("div");
G__21497.setAttribute("id",tooltip_id_21552);

G__21497.setAttribute("role","tooltip");

(G__21497["className"] = "glossary-tooltip");

(G__21497["textContent"] = abbr.dataset.definition);

((function (seq__21477,chunk__21478,count__21479,i__21480,G__21497,or__5002__auto__,tooltip_id_21552,abbr,seq__21477__$1,temp__5825__auto__){
return (function (p1__21474_SHARP_){
return abbr.parentNode.appendChild(p1__21474_SHARP_);
});})(seq__21477,chunk__21478,count__21479,i__21480,G__21497,or__5002__auto__,tooltip_id_21552,abbr,seq__21477__$1,temp__5825__auto__))
(G__21497);

return G__21497;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21552,tooltip_21553,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_21553.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21553);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21553);
}
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21552,tooltip_21553,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21552,tooltip_21553,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21503 = e.key;
var fexpr__21502 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21502.cljs$core$IFn$_invoke$arity$1 ? fexpr__21502.cljs$core$IFn$_invoke$arity$1(G__21503) : fexpr__21502.call(null, G__21503));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21553.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21553);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_21553);
}
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21552,tooltip_21553,abbr,seq__21477__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21552,tooltip_21553,abbr,seq__21477__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_21553);
} else {
return null;
}
});})(seq__21477,chunk__21478,count__21479,i__21480,tooltip_id_21552,tooltip_21553,abbr,seq__21477__$1,temp__5825__auto__))
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

var seq__21504 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21505 = null;
var count__21506 = (0);
var i__21507 = (0);
while(true){
if((i__21507 < count__21506)){
var el = chunk__21505.cljs$core$IIndexed$_nth$arity$2(null, i__21507);
var code_21573 = el.textContent;
var container_21574 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21573,((function (seq__21504,chunk__21505,count__21506,i__21507,code_21573,container_21574,el){
return (function (svg){
return (container_21574["innerHTML"] = svg);
});})(seq__21504,chunk__21505,count__21506,i__21507,code_21573,container_21574,el))
);


var G__21576 = seq__21504;
var G__21577 = chunk__21505;
var G__21578 = count__21506;
var G__21579 = (i__21507 + (1));
seq__21504 = G__21576;
chunk__21505 = G__21577;
count__21506 = G__21578;
i__21507 = G__21579;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21504);
if(temp__5825__auto__){
var seq__21504__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21504__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21504__$1);
var G__21582 = cljs.core.chunk_rest(seq__21504__$1);
var G__21583 = c__5525__auto__;
var G__21584 = cljs.core.count(c__5525__auto__);
var G__21585 = (0);
seq__21504 = G__21582;
chunk__21505 = G__21583;
count__21506 = G__21584;
i__21507 = G__21585;
continue;
} else {
var el = cljs.core.first(seq__21504__$1);
var code_21595 = el.textContent;
var container_21596 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21595,((function (seq__21504,chunk__21505,count__21506,i__21507,code_21595,container_21596,el,seq__21504__$1,temp__5825__auto__){
return (function (svg){
return (container_21596["innerHTML"] = svg);
});})(seq__21504,chunk__21505,count__21506,i__21507,code_21595,container_21596,el,seq__21504__$1,temp__5825__auto__))
);


var G__21598 = cljs.core.next(seq__21504__$1);
var G__21599 = null;
var G__21600 = (0);
var G__21601 = (0);
seq__21504 = G__21598;
chunk__21505 = G__21599;
count__21506 = G__21600;
i__21507 = G__21601;
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
var temp__5825__auto___21602 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21602)){
var saved_21603 = temp__5825__auto___21602;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21603));
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
