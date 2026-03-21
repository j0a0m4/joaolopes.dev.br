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
var G__21491 = el.getAttribute("href");
if((G__21491 == null)){
return null;
} else {
return G__21491.startsWith("/glossary/");
}
} else {
return and__5000__auto__;
}
});
blog.client.core.slug_from_href = (function blog$client$core$slug_from_href(href){
return clojure.string.replace(clojure.string.replace(href,/^\/glossary\//,""),/\/$/,"");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21501 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__21499_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",p1__21499_SHARP_.getAttribute("href"));
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("a[href^=\"/glossary/\"]"))));
var chunk__21502 = null;
var count__21503 = (0);
var i__21504 = (0);
while(true){
if((i__21504 < count__21503)){
var link = chunk__21502.cljs$core$IIndexed$_nth$arity$2(null, i__21504);
var slug_21589 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21590 = ["tooltip-",slug_21589].join('');
var tooltip_21591 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21590);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21590);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21589,"/"].join('')).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21589,tooltip_id_21590,link){
return (function (p1__21500_SHARP_){
return p1__21500_SHARP_.text();
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21589,tooltip_id_21590,link))
).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21589,tooltip_id_21590,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21589))," <a href=\"/glossary/",slug_21589,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21589,tooltip_id_21590,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21589,tooltip_id_21590,tooltip_21591,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21591.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21591);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21591);
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21589,tooltip_id_21590,tooltip_21591,link))
);

goog.events.listen(link,"keydown",((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21589,tooltip_id_21590,tooltip_21591,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21528 = e.key;
var fexpr__21527 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21527.cljs$core$IFn$_invoke$arity$1 ? fexpr__21527.cljs$core$IFn$_invoke$arity$1(G__21528) : fexpr__21527.call(null, G__21528));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21591.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21591);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21591);
}
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21589,tooltip_id_21590,tooltip_21591,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21589,tooltip_id_21590,tooltip_21591,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21591);
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21589,tooltip_id_21590,tooltip_21591,link))
);


var G__21597 = seq__21501;
var G__21598 = chunk__21502;
var G__21599 = count__21503;
var G__21600 = (i__21504 + (1));
seq__21501 = G__21597;
chunk__21502 = G__21598;
count__21503 = G__21599;
i__21504 = G__21600;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21501);
if(temp__5825__auto__){
var seq__21501__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21501__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21501__$1);
var G__21601 = cljs.core.chunk_rest(seq__21501__$1);
var G__21602 = c__5525__auto__;
var G__21603 = cljs.core.count(c__5525__auto__);
var G__21604 = (0);
seq__21501 = G__21601;
chunk__21502 = G__21602;
count__21503 = G__21603;
i__21504 = G__21604;
continue;
} else {
var link = cljs.core.first(seq__21501__$1);
var slug_21605 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21606 = ["tooltip-",slug_21605].join('');
var tooltip_21607 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21606);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21606);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21605,"/"].join('')).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21605,tooltip_id_21606,link,seq__21501__$1,temp__5825__auto__){
return (function (p1__21500_SHARP_){
return p1__21500_SHARP_.text();
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21605,tooltip_id_21606,link,seq__21501__$1,temp__5825__auto__))
).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21605,tooltip_id_21606,link,seq__21501__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21605))," <a href=\"/glossary/",slug_21605,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21605,tooltip_id_21606,link,seq__21501__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21605,tooltip_id_21606,tooltip_21607,link,seq__21501__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21607.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21607);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21607);
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21605,tooltip_id_21606,tooltip_21607,link,seq__21501__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21605,tooltip_id_21606,tooltip_21607,link,seq__21501__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21538 = e.key;
var fexpr__21537 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21537.cljs$core$IFn$_invoke$arity$1 ? fexpr__21537.cljs$core$IFn$_invoke$arity$1(G__21538) : fexpr__21537.call(null, G__21538));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21607.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21607);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21607);
}
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21605,tooltip_id_21606,tooltip_21607,link,seq__21501__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21605,tooltip_id_21606,tooltip_21607,link,seq__21501__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21607);
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21605,tooltip_id_21606,tooltip_21607,link,seq__21501__$1,temp__5825__auto__))
);


var G__21610 = cljs.core.next(seq__21501__$1);
var G__21611 = null;
var G__21612 = (0);
var G__21613 = (0);
seq__21501 = G__21610;
chunk__21502 = G__21611;
count__21503 = G__21612;
i__21504 = G__21613;
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

var seq__21540 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21541 = null;
var count__21542 = (0);
var i__21543 = (0);
while(true){
if((i__21543 < count__21542)){
var el = chunk__21541.cljs$core$IIndexed$_nth$arity$2(null, i__21543);
var code_21618 = el.textContent;
var container_21619 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21618,((function (seq__21540,chunk__21541,count__21542,i__21543,code_21618,container_21619,el){
return (function (svg){
return (container_21619["innerHTML"] = svg);
});})(seq__21540,chunk__21541,count__21542,i__21543,code_21618,container_21619,el))
);


var G__21620 = seq__21540;
var G__21621 = chunk__21541;
var G__21622 = count__21542;
var G__21623 = (i__21543 + (1));
seq__21540 = G__21620;
chunk__21541 = G__21621;
count__21542 = G__21622;
i__21543 = G__21623;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21540);
if(temp__5825__auto__){
var seq__21540__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21540__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21540__$1);
var G__21628 = cljs.core.chunk_rest(seq__21540__$1);
var G__21629 = c__5525__auto__;
var G__21630 = cljs.core.count(c__5525__auto__);
var G__21631 = (0);
seq__21540 = G__21628;
chunk__21541 = G__21629;
count__21542 = G__21630;
i__21543 = G__21631;
continue;
} else {
var el = cljs.core.first(seq__21540__$1);
var code_21636 = el.textContent;
var container_21637 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21636,((function (seq__21540,chunk__21541,count__21542,i__21543,code_21636,container_21637,el,seq__21540__$1,temp__5825__auto__){
return (function (svg){
return (container_21637["innerHTML"] = svg);
});})(seq__21540,chunk__21541,count__21542,i__21543,code_21636,container_21637,el,seq__21540__$1,temp__5825__auto__))
);


var G__21638 = cljs.core.next(seq__21540__$1);
var G__21639 = null;
var G__21640 = (0);
var G__21641 = (0);
seq__21540 = G__21638;
chunk__21541 = G__21639;
count__21542 = G__21640;
i__21543 = G__21641;
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
var temp__5825__auto___21642 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21642)){
var saved_21643 = temp__5825__auto___21642;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21643));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21567 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21568 = null;
var count__21569 = (0);
var i__21570 = (0);
while(true){
if((i__21570 < count__21569)){
var el = chunk__21568.cljs$core$IIndexed$_nth$arity$2(null, i__21570);
hljs.highlightElement(el);


var G__21653 = seq__21567;
var G__21654 = chunk__21568;
var G__21655 = count__21569;
var G__21656 = (i__21570 + (1));
seq__21567 = G__21653;
chunk__21568 = G__21654;
count__21569 = G__21655;
i__21570 = G__21656;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21567);
if(temp__5825__auto__){
var seq__21567__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21567__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21567__$1);
var G__21657 = cljs.core.chunk_rest(seq__21567__$1);
var G__21658 = c__5525__auto__;
var G__21659 = cljs.core.count(c__5525__auto__);
var G__21660 = (0);
seq__21567 = G__21657;
chunk__21568 = G__21658;
count__21569 = G__21659;
i__21570 = G__21660;
continue;
} else {
var el = cljs.core.first(seq__21567__$1);
hljs.highlightElement(el);


var G__21661 = cljs.core.next(seq__21567__$1);
var G__21662 = null;
var G__21663 = (0);
var G__21664 = (0);
seq__21567 = G__21661;
chunk__21568 = G__21662;
count__21569 = G__21663;
i__21570 = G__21664;
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
