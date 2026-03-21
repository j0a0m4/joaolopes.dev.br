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
var G__21495 = el.getAttribute("href");
if((G__21495 == null)){
return null;
} else {
return G__21495.startsWith("/glossary/");
}
} else {
return and__5000__auto__;
}
});
blog.client.core.slug_from_href = (function blog$client$core$slug_from_href(href){
return clojure.string.replace(clojure.string.replace(href,/^\/glossary\//,""),/\/$/,"");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21509 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__21502_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",p1__21502_SHARP_.getAttribute("href"));
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("a[href^=\"/glossary/\"]"))));
var chunk__21510 = null;
var count__21511 = (0);
var i__21512 = (0);
while(true){
if((i__21512 < count__21511)){
var link = chunk__21510.cljs$core$IIndexed$_nth$arity$2(null, i__21512);
var slug_21598 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21599 = ["tooltip-",slug_21598].join('');
var tooltip_21600 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21599);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21599);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21598,"/"].join('')).then(((function (seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21598,tooltip_id_21599,link){
return (function (p1__21503_SHARP_){
return p1__21503_SHARP_.text();
});})(seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21598,tooltip_id_21599,link))
).then(((function (seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21598,tooltip_id_21599,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21598))," <a href=\"/glossary/",slug_21598,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21598,tooltip_id_21599,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21509,chunk__21510,count__21511,i__21512,slug_21598,tooltip_id_21599,tooltip_21600,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21600.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21600);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21600);
}
});})(seq__21509,chunk__21510,count__21511,i__21512,slug_21598,tooltip_id_21599,tooltip_21600,link))
);

goog.events.listen(link,"keydown",((function (seq__21509,chunk__21510,count__21511,i__21512,slug_21598,tooltip_id_21599,tooltip_21600,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21529 = e.key;
var fexpr__21528 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21528.cljs$core$IFn$_invoke$arity$1 ? fexpr__21528.cljs$core$IFn$_invoke$arity$1(G__21529) : fexpr__21528.call(null, G__21529));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21600.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21600);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21600);
}
} else {
return null;
}
});})(seq__21509,chunk__21510,count__21511,i__21512,slug_21598,tooltip_id_21599,tooltip_21600,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21509,chunk__21510,count__21511,i__21512,slug_21598,tooltip_id_21599,tooltip_21600,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21600);
} else {
return null;
}
});})(seq__21509,chunk__21510,count__21511,i__21512,slug_21598,tooltip_id_21599,tooltip_21600,link))
);


var G__21628 = seq__21509;
var G__21629 = chunk__21510;
var G__21630 = count__21511;
var G__21631 = (i__21512 + (1));
seq__21509 = G__21628;
chunk__21510 = G__21629;
count__21511 = G__21630;
i__21512 = G__21631;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21509);
if(temp__5825__auto__){
var seq__21509__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21509__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21509__$1);
var G__21632 = cljs.core.chunk_rest(seq__21509__$1);
var G__21633 = c__5525__auto__;
var G__21634 = cljs.core.count(c__5525__auto__);
var G__21635 = (0);
seq__21509 = G__21632;
chunk__21510 = G__21633;
count__21511 = G__21634;
i__21512 = G__21635;
continue;
} else {
var link = cljs.core.first(seq__21509__$1);
var slug_21636 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21637 = ["tooltip-",slug_21636].join('');
var tooltip_21638 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21637);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21637);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21636,"/"].join('')).then(((function (seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21636,tooltip_id_21637,link,seq__21509__$1,temp__5825__auto__){
return (function (p1__21503_SHARP_){
return p1__21503_SHARP_.text();
});})(seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21636,tooltip_id_21637,link,seq__21509__$1,temp__5825__auto__))
).then(((function (seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21636,tooltip_id_21637,link,seq__21509__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21636))," <a href=\"/glossary/",slug_21636,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21509,chunk__21510,count__21511,i__21512,div,or__5002__auto__,slug_21636,tooltip_id_21637,link,seq__21509__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21509,chunk__21510,count__21511,i__21512,slug_21636,tooltip_id_21637,tooltip_21638,link,seq__21509__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21638.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21638);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21638);
}
});})(seq__21509,chunk__21510,count__21511,i__21512,slug_21636,tooltip_id_21637,tooltip_21638,link,seq__21509__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21509,chunk__21510,count__21511,i__21512,slug_21636,tooltip_id_21637,tooltip_21638,link,seq__21509__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21555 = e.key;
var fexpr__21554 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21554.cljs$core$IFn$_invoke$arity$1 ? fexpr__21554.cljs$core$IFn$_invoke$arity$1(G__21555) : fexpr__21554.call(null, G__21555));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21638.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21638);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21638);
}
} else {
return null;
}
});})(seq__21509,chunk__21510,count__21511,i__21512,slug_21636,tooltip_id_21637,tooltip_21638,link,seq__21509__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21509,chunk__21510,count__21511,i__21512,slug_21636,tooltip_id_21637,tooltip_21638,link,seq__21509__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21638);
} else {
return null;
}
});})(seq__21509,chunk__21510,count__21511,i__21512,slug_21636,tooltip_id_21637,tooltip_21638,link,seq__21509__$1,temp__5825__auto__))
);


var G__21644 = cljs.core.next(seq__21509__$1);
var G__21645 = null;
var G__21646 = (0);
var G__21647 = (0);
seq__21509 = G__21644;
chunk__21510 = G__21645;
count__21511 = G__21646;
i__21512 = G__21647;
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

var seq__21559 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21560 = null;
var count__21561 = (0);
var i__21562 = (0);
while(true){
if((i__21562 < count__21561)){
var el = chunk__21560.cljs$core$IIndexed$_nth$arity$2(null, i__21562);
var code_21648 = el.textContent;
var container_21649 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21648,((function (seq__21559,chunk__21560,count__21561,i__21562,code_21648,container_21649,el){
return (function (svg){
return (container_21649["innerHTML"] = svg);
});})(seq__21559,chunk__21560,count__21561,i__21562,code_21648,container_21649,el))
);


var G__21650 = seq__21559;
var G__21651 = chunk__21560;
var G__21652 = count__21561;
var G__21653 = (i__21562 + (1));
seq__21559 = G__21650;
chunk__21560 = G__21651;
count__21561 = G__21652;
i__21562 = G__21653;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21559);
if(temp__5825__auto__){
var seq__21559__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21559__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21559__$1);
var G__21654 = cljs.core.chunk_rest(seq__21559__$1);
var G__21655 = c__5525__auto__;
var G__21656 = cljs.core.count(c__5525__auto__);
var G__21657 = (0);
seq__21559 = G__21654;
chunk__21560 = G__21655;
count__21561 = G__21656;
i__21562 = G__21657;
continue;
} else {
var el = cljs.core.first(seq__21559__$1);
var code_21658 = el.textContent;
var container_21659 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21658,((function (seq__21559,chunk__21560,count__21561,i__21562,code_21658,container_21659,el,seq__21559__$1,temp__5825__auto__){
return (function (svg){
return (container_21659["innerHTML"] = svg);
});})(seq__21559,chunk__21560,count__21561,i__21562,code_21658,container_21659,el,seq__21559__$1,temp__5825__auto__))
);


var G__21660 = cljs.core.next(seq__21559__$1);
var G__21661 = null;
var G__21662 = (0);
var G__21663 = (0);
seq__21559 = G__21660;
chunk__21560 = G__21661;
count__21561 = G__21662;
i__21562 = G__21663;
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
var temp__5825__auto___21664 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21664)){
var saved_21665 = temp__5825__auto___21664;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21665));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21572 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21573 = null;
var count__21574 = (0);
var i__21575 = (0);
while(true){
if((i__21575 < count__21574)){
var el = chunk__21573.cljs$core$IIndexed$_nth$arity$2(null, i__21575);
hljs.highlightElement(el);


var G__21666 = seq__21572;
var G__21667 = chunk__21573;
var G__21668 = count__21574;
var G__21669 = (i__21575 + (1));
seq__21572 = G__21666;
chunk__21573 = G__21667;
count__21574 = G__21668;
i__21575 = G__21669;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21572);
if(temp__5825__auto__){
var seq__21572__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21572__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21572__$1);
var G__21670 = cljs.core.chunk_rest(seq__21572__$1);
var G__21671 = c__5525__auto__;
var G__21672 = cljs.core.count(c__5525__auto__);
var G__21673 = (0);
seq__21572 = G__21670;
chunk__21573 = G__21671;
count__21574 = G__21672;
i__21575 = G__21673;
continue;
} else {
var el = cljs.core.first(seq__21572__$1);
hljs.highlightElement(el);


var G__21674 = cljs.core.next(seq__21572__$1);
var G__21675 = null;
var G__21676 = (0);
var G__21677 = (0);
seq__21572 = G__21674;
chunk__21573 = G__21675;
count__21574 = G__21676;
i__21575 = G__21677;
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
