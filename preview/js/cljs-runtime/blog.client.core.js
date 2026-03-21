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
blog.client.core.show_tooltip_BANG_ = (function blog$client$core$show_tooltip_BANG_(link,tooltip){
link.setAttribute("aria-describedby",tooltip.id);

return tooltip.classList.add("visible");
});
blog.client.core.hide_tooltip_BANG_ = (function blog$client$core$hide_tooltip_BANG_(link,tooltip){
link.removeAttribute("aria-describedby");

return tooltip.classList.remove("visible");
});
blog.client.core.glossary_link_QMARK_ = (function blog$client$core$glossary_link_QMARK_(el){
var and__5000__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",el.tagName);
if(and__5000__auto__){
var G__21473 = el.getAttribute("href");
if((G__21473 == null)){
return null;
} else {
return G__21473.startsWith("/glossary/");
}
} else {
return and__5000__auto__;
}
});
blog.client.core.slug_from_href = (function blog$client$core$slug_from_href(href){
return str.replace(str.replace(href,/^\/glossary\//,""),/\/$/,"");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21478 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("a[href^=\"/glossary/\"]")));
var chunk__21479 = null;
var count__21480 = (0);
var i__21481 = (0);
while(true){
if((i__21481 < count__21480)){
var link = chunk__21479.cljs$core$IIndexed$_nth$arity$2(null, i__21481);
var slug_21547 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21548 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21547)].join('');
var tooltip_21549 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21548);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21548);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21547),"/"].join('')).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21547,tooltip_id_21548,link){
return (function (p1__21477_SHARP_){
return p1__21477_SHARP_.text();
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21547,tooltip_id_21548,link))
).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21547,tooltip_id_21548,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21547))," <a href=\"/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21547),"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21547,tooltip_id_21548,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21547,tooltip_id_21548,tooltip_21549,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21549.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21549);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21549);
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21547,tooltip_id_21548,tooltip_21549,link))
);

goog.events.listen(link,"keydown",((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21547,tooltip_id_21548,tooltip_21549,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21489 = e.key;
var fexpr__21488 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21488.cljs$core$IFn$_invoke$arity$1 ? fexpr__21488.cljs$core$IFn$_invoke$arity$1(G__21489) : fexpr__21488.call(null, G__21489));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21549.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21549);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21549);
}
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21547,tooltip_id_21548,tooltip_21549,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21547,tooltip_id_21548,tooltip_21549,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21549);
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21547,tooltip_id_21548,tooltip_21549,link))
);


var G__21556 = seq__21478;
var G__21557 = chunk__21479;
var G__21558 = count__21480;
var G__21559 = (i__21481 + (1));
seq__21478 = G__21556;
chunk__21479 = G__21557;
count__21480 = G__21558;
i__21481 = G__21559;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21478);
if(temp__5825__auto__){
var seq__21478__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21478__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21478__$1);
var G__21560 = cljs.core.chunk_rest(seq__21478__$1);
var G__21561 = c__5525__auto__;
var G__21562 = cljs.core.count(c__5525__auto__);
var G__21563 = (0);
seq__21478 = G__21560;
chunk__21479 = G__21561;
count__21480 = G__21562;
i__21481 = G__21563;
continue;
} else {
var link = cljs.core.first(seq__21478__$1);
var slug_21564 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21565 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21564)].join('');
var tooltip_21566 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21565);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21565);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21564),"/"].join('')).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21564,tooltip_id_21565,link,seq__21478__$1,temp__5825__auto__){
return (function (p1__21477_SHARP_){
return p1__21477_SHARP_.text();
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21564,tooltip_id_21565,link,seq__21478__$1,temp__5825__auto__))
).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21564,tooltip_id_21565,link,seq__21478__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21564))," <a href=\"/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21564),"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21564,tooltip_id_21565,link,seq__21478__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21564,tooltip_id_21565,tooltip_21566,link,seq__21478__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21566.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21566);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21566);
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21564,tooltip_id_21565,tooltip_21566,link,seq__21478__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21564,tooltip_id_21565,tooltip_21566,link,seq__21478__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21496 = e.key;
var fexpr__21495 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21495.cljs$core$IFn$_invoke$arity$1 ? fexpr__21495.cljs$core$IFn$_invoke$arity$1(G__21496) : fexpr__21495.call(null, G__21496));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21566.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21566);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21566);
}
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21564,tooltip_id_21565,tooltip_21566,link,seq__21478__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21564,tooltip_id_21565,tooltip_21566,link,seq__21478__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21566);
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21564,tooltip_id_21565,tooltip_21566,link,seq__21478__$1,temp__5825__auto__))
);


var G__21571 = cljs.core.next(seq__21478__$1);
var G__21572 = null;
var G__21573 = (0);
var G__21574 = (0);
seq__21478 = G__21571;
chunk__21479 = G__21572;
count__21480 = G__21573;
i__21481 = G__21574;
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

var seq__21497 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21498 = null;
var count__21499 = (0);
var i__21500 = (0);
while(true){
if((i__21500 < count__21499)){
var el = chunk__21498.cljs$core$IIndexed$_nth$arity$2(null, i__21500);
var code_21575 = el.textContent;
var container_21576 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21575,((function (seq__21497,chunk__21498,count__21499,i__21500,code_21575,container_21576,el){
return (function (svg){
return (container_21576["innerHTML"] = svg);
});})(seq__21497,chunk__21498,count__21499,i__21500,code_21575,container_21576,el))
);


var G__21579 = seq__21497;
var G__21580 = chunk__21498;
var G__21581 = count__21499;
var G__21582 = (i__21500 + (1));
seq__21497 = G__21579;
chunk__21498 = G__21580;
count__21499 = G__21581;
i__21500 = G__21582;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21497);
if(temp__5825__auto__){
var seq__21497__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21497__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21497__$1);
var G__21586 = cljs.core.chunk_rest(seq__21497__$1);
var G__21587 = c__5525__auto__;
var G__21588 = cljs.core.count(c__5525__auto__);
var G__21589 = (0);
seq__21497 = G__21586;
chunk__21498 = G__21587;
count__21499 = G__21588;
i__21500 = G__21589;
continue;
} else {
var el = cljs.core.first(seq__21497__$1);
var code_21590 = el.textContent;
var container_21591 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21590,((function (seq__21497,chunk__21498,count__21499,i__21500,code_21590,container_21591,el,seq__21497__$1,temp__5825__auto__){
return (function (svg){
return (container_21591["innerHTML"] = svg);
});})(seq__21497,chunk__21498,count__21499,i__21500,code_21590,container_21591,el,seq__21497__$1,temp__5825__auto__))
);


var G__21592 = cljs.core.next(seq__21497__$1);
var G__21593 = null;
var G__21594 = (0);
var G__21595 = (0);
seq__21497 = G__21592;
chunk__21498 = G__21593;
count__21499 = G__21594;
i__21500 = G__21595;
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
var temp__5825__auto___21596 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21596)){
var saved_21597 = temp__5825__auto___21596;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21597));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21505 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21506 = null;
var count__21507 = (0);
var i__21508 = (0);
while(true){
if((i__21508 < count__21507)){
var el = chunk__21506.cljs$core$IIndexed$_nth$arity$2(null, i__21508);
hljs.highlightElement(el);


var G__21598 = seq__21505;
var G__21599 = chunk__21506;
var G__21600 = count__21507;
var G__21601 = (i__21508 + (1));
seq__21505 = G__21598;
chunk__21506 = G__21599;
count__21507 = G__21600;
i__21508 = G__21601;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21505);
if(temp__5825__auto__){
var seq__21505__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21505__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21505__$1);
var G__21602 = cljs.core.chunk_rest(seq__21505__$1);
var G__21603 = c__5525__auto__;
var G__21604 = cljs.core.count(c__5525__auto__);
var G__21605 = (0);
seq__21505 = G__21602;
chunk__21506 = G__21603;
count__21507 = G__21604;
i__21508 = G__21605;
continue;
} else {
var el = cljs.core.first(seq__21505__$1);
hljs.highlightElement(el);


var G__21607 = cljs.core.next(seq__21505__$1);
var G__21608 = null;
var G__21609 = (0);
var G__21610 = (0);
seq__21505 = G__21607;
chunk__21506 = G__21608;
count__21507 = G__21609;
i__21508 = G__21610;
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
