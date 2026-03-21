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
blog.client.core.slug_from_href = (function blog$client$core$slug_from_href(href){
return clojure.string.replace(clojure.string.replace(href,/^\/glossary\//,""),/\/$/,"");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21494 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__21492_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",p1__21492_SHARP_.getAttribute("href"));
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("a[href^=\"/glossary/\"]"))));
var chunk__21495 = null;
var count__21496 = (0);
var i__21497 = (0);
while(true){
if((i__21497 < count__21496)){
var link = chunk__21495.cljs$core$IIndexed$_nth$arity$2(null, i__21497);
var slug_21566 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21567 = ["tooltip-",slug_21566].join('');
var tooltip_21568 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21567);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21567);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21566,"/"].join('')).then(((function (seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21566,tooltip_id_21567,link){
return (function (p1__21493_SHARP_){
return p1__21493_SHARP_.text();
});})(seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21566,tooltip_id_21567,link))
).then(((function (seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21566,tooltip_id_21567,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21566))," <a href=\"/glossary/",slug_21566,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21566,tooltip_id_21567,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21494,chunk__21495,count__21496,i__21497,slug_21566,tooltip_id_21567,tooltip_21568,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21568.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21568);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21568);
}
});})(seq__21494,chunk__21495,count__21496,i__21497,slug_21566,tooltip_id_21567,tooltip_21568,link))
);

goog.events.listen(link,"keydown",((function (seq__21494,chunk__21495,count__21496,i__21497,slug_21566,tooltip_id_21567,tooltip_21568,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21522 = e.key;
var fexpr__21521 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21521.cljs$core$IFn$_invoke$arity$1 ? fexpr__21521.cljs$core$IFn$_invoke$arity$1(G__21522) : fexpr__21521.call(null, G__21522));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21568.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21568);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21568);
}
} else {
return null;
}
});})(seq__21494,chunk__21495,count__21496,i__21497,slug_21566,tooltip_id_21567,tooltip_21568,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21494,chunk__21495,count__21496,i__21497,slug_21566,tooltip_id_21567,tooltip_21568,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21568);
} else {
return null;
}
});})(seq__21494,chunk__21495,count__21496,i__21497,slug_21566,tooltip_id_21567,tooltip_21568,link))
);


var G__21573 = seq__21494;
var G__21574 = chunk__21495;
var G__21575 = count__21496;
var G__21576 = (i__21497 + (1));
seq__21494 = G__21573;
chunk__21495 = G__21574;
count__21496 = G__21575;
i__21497 = G__21576;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21494);
if(temp__5825__auto__){
var seq__21494__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21494__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21494__$1);
var G__21577 = cljs.core.chunk_rest(seq__21494__$1);
var G__21578 = c__5525__auto__;
var G__21579 = cljs.core.count(c__5525__auto__);
var G__21580 = (0);
seq__21494 = G__21577;
chunk__21495 = G__21578;
count__21496 = G__21579;
i__21497 = G__21580;
continue;
} else {
var link = cljs.core.first(seq__21494__$1);
var slug_21581 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21582 = ["tooltip-",slug_21581].join('');
var tooltip_21583 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21582);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21582);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21581,"/"].join('')).then(((function (seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21581,tooltip_id_21582,link,seq__21494__$1,temp__5825__auto__){
return (function (p1__21493_SHARP_){
return p1__21493_SHARP_.text();
});})(seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21581,tooltip_id_21582,link,seq__21494__$1,temp__5825__auto__))
).then(((function (seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21581,tooltip_id_21582,link,seq__21494__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21581))," <a href=\"/glossary/",slug_21581,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21494,chunk__21495,count__21496,i__21497,div,or__5002__auto__,slug_21581,tooltip_id_21582,link,seq__21494__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21494,chunk__21495,count__21496,i__21497,slug_21581,tooltip_id_21582,tooltip_21583,link,seq__21494__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21583.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21583);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21583);
}
});})(seq__21494,chunk__21495,count__21496,i__21497,slug_21581,tooltip_id_21582,tooltip_21583,link,seq__21494__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21494,chunk__21495,count__21496,i__21497,slug_21581,tooltip_id_21582,tooltip_21583,link,seq__21494__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21529 = e.key;
var fexpr__21528 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21528.cljs$core$IFn$_invoke$arity$1 ? fexpr__21528.cljs$core$IFn$_invoke$arity$1(G__21529) : fexpr__21528.call(null, G__21529));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21583.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21583);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21583);
}
} else {
return null;
}
});})(seq__21494,chunk__21495,count__21496,i__21497,slug_21581,tooltip_id_21582,tooltip_21583,link,seq__21494__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21494,chunk__21495,count__21496,i__21497,slug_21581,tooltip_id_21582,tooltip_21583,link,seq__21494__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21583);
} else {
return null;
}
});})(seq__21494,chunk__21495,count__21496,i__21497,slug_21581,tooltip_id_21582,tooltip_21583,link,seq__21494__$1,temp__5825__auto__))
);


var G__21585 = cljs.core.next(seq__21494__$1);
var G__21586 = null;
var G__21587 = (0);
var G__21588 = (0);
seq__21494 = G__21585;
chunk__21495 = G__21586;
count__21496 = G__21587;
i__21497 = G__21588;
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

var seq__21533 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21534 = null;
var count__21535 = (0);
var i__21536 = (0);
while(true){
if((i__21536 < count__21535)){
var el = chunk__21534.cljs$core$IIndexed$_nth$arity$2(null, i__21536);
var code_21592 = el.textContent;
var container_21593 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21592,((function (seq__21533,chunk__21534,count__21535,i__21536,code_21592,container_21593,el){
return (function (svg){
return (container_21593["innerHTML"] = svg);
});})(seq__21533,chunk__21534,count__21535,i__21536,code_21592,container_21593,el))
);


var G__21595 = seq__21533;
var G__21596 = chunk__21534;
var G__21597 = count__21535;
var G__21598 = (i__21536 + (1));
seq__21533 = G__21595;
chunk__21534 = G__21596;
count__21535 = G__21597;
i__21536 = G__21598;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21533);
if(temp__5825__auto__){
var seq__21533__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21533__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21533__$1);
var G__21599 = cljs.core.chunk_rest(seq__21533__$1);
var G__21600 = c__5525__auto__;
var G__21601 = cljs.core.count(c__5525__auto__);
var G__21602 = (0);
seq__21533 = G__21599;
chunk__21534 = G__21600;
count__21535 = G__21601;
i__21536 = G__21602;
continue;
} else {
var el = cljs.core.first(seq__21533__$1);
var code_21603 = el.textContent;
var container_21604 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21603,((function (seq__21533,chunk__21534,count__21535,i__21536,code_21603,container_21604,el,seq__21533__$1,temp__5825__auto__){
return (function (svg){
return (container_21604["innerHTML"] = svg);
});})(seq__21533,chunk__21534,count__21535,i__21536,code_21603,container_21604,el,seq__21533__$1,temp__5825__auto__))
);


var G__21605 = cljs.core.next(seq__21533__$1);
var G__21606 = null;
var G__21607 = (0);
var G__21608 = (0);
seq__21533 = G__21605;
chunk__21534 = G__21606;
count__21535 = G__21607;
i__21536 = G__21608;
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
var temp__5825__auto___21609 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21609)){
var saved_21610 = temp__5825__auto___21609;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21610));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21556 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21557 = null;
var count__21558 = (0);
var i__21559 = (0);
while(true){
if((i__21559 < count__21558)){
var el = chunk__21557.cljs$core$IIndexed$_nth$arity$2(null, i__21559);
hljs.highlightElement(el);


var G__21611 = seq__21556;
var G__21612 = chunk__21557;
var G__21613 = count__21558;
var G__21614 = (i__21559 + (1));
seq__21556 = G__21611;
chunk__21557 = G__21612;
count__21558 = G__21613;
i__21559 = G__21614;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21556);
if(temp__5825__auto__){
var seq__21556__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21556__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21556__$1);
var G__21615 = cljs.core.chunk_rest(seq__21556__$1);
var G__21616 = c__5525__auto__;
var G__21617 = cljs.core.count(c__5525__auto__);
var G__21618 = (0);
seq__21556 = G__21615;
chunk__21557 = G__21616;
count__21558 = G__21617;
i__21559 = G__21618;
continue;
} else {
var el = cljs.core.first(seq__21556__$1);
hljs.highlightElement(el);


var G__21619 = cljs.core.next(seq__21556__$1);
var G__21620 = null;
var G__21621 = (0);
var G__21622 = (0);
seq__21556 = G__21619;
chunk__21557 = G__21620;
count__21558 = G__21621;
i__21559 = G__21622;
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
