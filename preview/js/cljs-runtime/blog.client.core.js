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
var seq__21510 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__21505_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",p1__21505_SHARP_.getAttribute("href"));
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("a[href^=\"/glossary/\"]"))));
var chunk__21511 = null;
var count__21512 = (0);
var i__21513 = (0);
while(true){
if((i__21513 < count__21512)){
var link = chunk__21511.cljs$core$IIndexed$_nth$arity$2(null, i__21513);
var slug_21585 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21586 = ["tooltip-",slug_21585].join('');
var tooltip_21587 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21586);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21586);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21585,"/"].join('')).then(((function (seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21585,tooltip_id_21586,link){
return (function (p1__21506_SHARP_){
return p1__21506_SHARP_.text();
});})(seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21585,tooltip_id_21586,link))
).then(((function (seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21585,tooltip_id_21586,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21585))," <a href=\"/glossary/",slug_21585,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21585,tooltip_id_21586,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21510,chunk__21511,count__21512,i__21513,slug_21585,tooltip_id_21586,tooltip_21587,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21587.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21587);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21587);
}
});})(seq__21510,chunk__21511,count__21512,i__21513,slug_21585,tooltip_id_21586,tooltip_21587,link))
);

goog.events.listen(link,"keydown",((function (seq__21510,chunk__21511,count__21512,i__21513,slug_21585,tooltip_id_21586,tooltip_21587,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21539 = e.key;
var fexpr__21538 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21538.cljs$core$IFn$_invoke$arity$1 ? fexpr__21538.cljs$core$IFn$_invoke$arity$1(G__21539) : fexpr__21538.call(null, G__21539));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21587.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21587);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21587);
}
} else {
return null;
}
});})(seq__21510,chunk__21511,count__21512,i__21513,slug_21585,tooltip_id_21586,tooltip_21587,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21510,chunk__21511,count__21512,i__21513,slug_21585,tooltip_id_21586,tooltip_21587,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21587);
} else {
return null;
}
});})(seq__21510,chunk__21511,count__21512,i__21513,slug_21585,tooltip_id_21586,tooltip_21587,link))
);


var G__21605 = seq__21510;
var G__21606 = chunk__21511;
var G__21607 = count__21512;
var G__21608 = (i__21513 + (1));
seq__21510 = G__21605;
chunk__21511 = G__21606;
count__21512 = G__21607;
i__21513 = G__21608;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21510);
if(temp__5825__auto__){
var seq__21510__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21510__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21510__$1);
var G__21609 = cljs.core.chunk_rest(seq__21510__$1);
var G__21610 = c__5525__auto__;
var G__21611 = cljs.core.count(c__5525__auto__);
var G__21612 = (0);
seq__21510 = G__21609;
chunk__21511 = G__21610;
count__21512 = G__21611;
i__21513 = G__21612;
continue;
} else {
var link = cljs.core.first(seq__21510__$1);
var slug_21613 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21614 = ["tooltip-",slug_21613].join('');
var tooltip_21615 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21614);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21614);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21613,"/"].join('')).then(((function (seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21613,tooltip_id_21614,link,seq__21510__$1,temp__5825__auto__){
return (function (p1__21506_SHARP_){
return p1__21506_SHARP_.text();
});})(seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21613,tooltip_id_21614,link,seq__21510__$1,temp__5825__auto__))
).then(((function (seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21613,tooltip_id_21614,link,seq__21510__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21613))," <a href=\"/glossary/",slug_21613,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21510,chunk__21511,count__21512,i__21513,div,or__5002__auto__,slug_21613,tooltip_id_21614,link,seq__21510__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21510,chunk__21511,count__21512,i__21513,slug_21613,tooltip_id_21614,tooltip_21615,link,seq__21510__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21615.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21615);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21615);
}
});})(seq__21510,chunk__21511,count__21512,i__21513,slug_21613,tooltip_id_21614,tooltip_21615,link,seq__21510__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21510,chunk__21511,count__21512,i__21513,slug_21613,tooltip_id_21614,tooltip_21615,link,seq__21510__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21556 = e.key;
var fexpr__21555 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21555.cljs$core$IFn$_invoke$arity$1 ? fexpr__21555.cljs$core$IFn$_invoke$arity$1(G__21556) : fexpr__21555.call(null, G__21556));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21615.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21615);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21615);
}
} else {
return null;
}
});})(seq__21510,chunk__21511,count__21512,i__21513,slug_21613,tooltip_id_21614,tooltip_21615,link,seq__21510__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21510,chunk__21511,count__21512,i__21513,slug_21613,tooltip_id_21614,tooltip_21615,link,seq__21510__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21615);
} else {
return null;
}
});})(seq__21510,chunk__21511,count__21512,i__21513,slug_21613,tooltip_id_21614,tooltip_21615,link,seq__21510__$1,temp__5825__auto__))
);


var G__21640 = cljs.core.next(seq__21510__$1);
var G__21641 = null;
var G__21642 = (0);
var G__21643 = (0);
seq__21510 = G__21640;
chunk__21511 = G__21641;
count__21512 = G__21642;
i__21513 = G__21643;
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

var seq__21561 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21562 = null;
var count__21563 = (0);
var i__21564 = (0);
while(true){
if((i__21564 < count__21563)){
var el = chunk__21562.cljs$core$IIndexed$_nth$arity$2(null, i__21564);
var code_21644 = el.textContent;
var container_21645 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21644,((function (seq__21561,chunk__21562,count__21563,i__21564,code_21644,container_21645,el){
return (function (svg){
return (container_21645["innerHTML"] = svg);
});})(seq__21561,chunk__21562,count__21563,i__21564,code_21644,container_21645,el))
);


var G__21646 = seq__21561;
var G__21647 = chunk__21562;
var G__21648 = count__21563;
var G__21649 = (i__21564 + (1));
seq__21561 = G__21646;
chunk__21562 = G__21647;
count__21563 = G__21648;
i__21564 = G__21649;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21561);
if(temp__5825__auto__){
var seq__21561__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21561__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21561__$1);
var G__21650 = cljs.core.chunk_rest(seq__21561__$1);
var G__21651 = c__5525__auto__;
var G__21652 = cljs.core.count(c__5525__auto__);
var G__21653 = (0);
seq__21561 = G__21650;
chunk__21562 = G__21651;
count__21563 = G__21652;
i__21564 = G__21653;
continue;
} else {
var el = cljs.core.first(seq__21561__$1);
var code_21654 = el.textContent;
var container_21655 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21654,((function (seq__21561,chunk__21562,count__21563,i__21564,code_21654,container_21655,el,seq__21561__$1,temp__5825__auto__){
return (function (svg){
return (container_21655["innerHTML"] = svg);
});})(seq__21561,chunk__21562,count__21563,i__21564,code_21654,container_21655,el,seq__21561__$1,temp__5825__auto__))
);


var G__21656 = cljs.core.next(seq__21561__$1);
var G__21657 = null;
var G__21658 = (0);
var G__21659 = (0);
seq__21561 = G__21656;
chunk__21562 = G__21657;
count__21563 = G__21658;
i__21564 = G__21659;
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
var temp__5825__auto___21660 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21660)){
var saved_21664 = temp__5825__auto___21660;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21664));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21571 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21572 = null;
var count__21573 = (0);
var i__21574 = (0);
while(true){
if((i__21574 < count__21573)){
var el = chunk__21572.cljs$core$IIndexed$_nth$arity$2(null, i__21574);
hljs.highlightElement(el);


var G__21665 = seq__21571;
var G__21666 = chunk__21572;
var G__21667 = count__21573;
var G__21668 = (i__21574 + (1));
seq__21571 = G__21665;
chunk__21572 = G__21666;
count__21573 = G__21667;
i__21574 = G__21668;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21571);
if(temp__5825__auto__){
var seq__21571__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21571__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21571__$1);
var G__21669 = cljs.core.chunk_rest(seq__21571__$1);
var G__21670 = c__5525__auto__;
var G__21671 = cljs.core.count(c__5525__auto__);
var G__21672 = (0);
seq__21571 = G__21669;
chunk__21572 = G__21670;
count__21573 = G__21671;
i__21574 = G__21672;
continue;
} else {
var el = cljs.core.first(seq__21571__$1);
hljs.highlightElement(el);


var G__21673 = cljs.core.next(seq__21571__$1);
var G__21674 = null;
var G__21675 = (0);
var G__21676 = (0);
seq__21571 = G__21673;
chunk__21572 = G__21674;
count__21573 = G__21675;
i__21574 = G__21676;
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
