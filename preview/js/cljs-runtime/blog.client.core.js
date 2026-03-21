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
var G__21503 = el.getAttribute("href");
if((G__21503 == null)){
return null;
} else {
return G__21503.startsWith("/glossary/");
}
} else {
return and__5000__auto__;
}
});
blog.client.core.slug_from_href = (function blog$client$core$slug_from_href(href){
return clojure.string.replace(clojure.string.replace(href,/^\/glossary\//,""),/\/$/,"");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21508 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__21506_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",p1__21506_SHARP_.getAttribute("href"));
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("a[href^=\"/glossary/\"]"))));
var chunk__21509 = null;
var count__21510 = (0);
var i__21511 = (0);
while(true){
if((i__21511 < count__21510)){
var link = chunk__21509.cljs$core$IIndexed$_nth$arity$2(null, i__21511);
var slug_21619 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21620 = ["tooltip-",slug_21619].join('');
var tooltip_21621 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21620);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21620);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21619,"/"].join('')).then(((function (seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21619,tooltip_id_21620,link){
return (function (p1__21507_SHARP_){
return p1__21507_SHARP_.text();
});})(seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21619,tooltip_id_21620,link))
).then(((function (seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21619,tooltip_id_21620,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21619))," <a href=\"/glossary/",slug_21619,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21619,tooltip_id_21620,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21508,chunk__21509,count__21510,i__21511,slug_21619,tooltip_id_21620,tooltip_21621,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21621.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21621);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21621);
}
});})(seq__21508,chunk__21509,count__21510,i__21511,slug_21619,tooltip_id_21620,tooltip_21621,link))
);

goog.events.listen(link,"keydown",((function (seq__21508,chunk__21509,count__21510,i__21511,slug_21619,tooltip_id_21620,tooltip_21621,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21531 = e.key;
var fexpr__21530 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21530.cljs$core$IFn$_invoke$arity$1 ? fexpr__21530.cljs$core$IFn$_invoke$arity$1(G__21531) : fexpr__21530.call(null, G__21531));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21621.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21621);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21621);
}
} else {
return null;
}
});})(seq__21508,chunk__21509,count__21510,i__21511,slug_21619,tooltip_id_21620,tooltip_21621,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21508,chunk__21509,count__21510,i__21511,slug_21619,tooltip_id_21620,tooltip_21621,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21621);
} else {
return null;
}
});})(seq__21508,chunk__21509,count__21510,i__21511,slug_21619,tooltip_id_21620,tooltip_21621,link))
);


var G__21633 = seq__21508;
var G__21634 = chunk__21509;
var G__21635 = count__21510;
var G__21636 = (i__21511 + (1));
seq__21508 = G__21633;
chunk__21509 = G__21634;
count__21510 = G__21635;
i__21511 = G__21636;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21508);
if(temp__5825__auto__){
var seq__21508__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21508__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21508__$1);
var G__21637 = cljs.core.chunk_rest(seq__21508__$1);
var G__21638 = c__5525__auto__;
var G__21639 = cljs.core.count(c__5525__auto__);
var G__21640 = (0);
seq__21508 = G__21637;
chunk__21509 = G__21638;
count__21510 = G__21639;
i__21511 = G__21640;
continue;
} else {
var link = cljs.core.first(seq__21508__$1);
var slug_21641 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21642 = ["tooltip-",slug_21641].join('');
var tooltip_21643 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21642);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21642);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21641,"/"].join('')).then(((function (seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21641,tooltip_id_21642,link,seq__21508__$1,temp__5825__auto__){
return (function (p1__21507_SHARP_){
return p1__21507_SHARP_.text();
});})(seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21641,tooltip_id_21642,link,seq__21508__$1,temp__5825__auto__))
).then(((function (seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21641,tooltip_id_21642,link,seq__21508__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21641))," <a href=\"/glossary/",slug_21641,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21508,chunk__21509,count__21510,i__21511,div,or__5002__auto__,slug_21641,tooltip_id_21642,link,seq__21508__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21508,chunk__21509,count__21510,i__21511,slug_21641,tooltip_id_21642,tooltip_21643,link,seq__21508__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21643.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21643);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21643);
}
});})(seq__21508,chunk__21509,count__21510,i__21511,slug_21641,tooltip_id_21642,tooltip_21643,link,seq__21508__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21508,chunk__21509,count__21510,i__21511,slug_21641,tooltip_id_21642,tooltip_21643,link,seq__21508__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21538 = e.key;
var fexpr__21537 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21537.cljs$core$IFn$_invoke$arity$1 ? fexpr__21537.cljs$core$IFn$_invoke$arity$1(G__21538) : fexpr__21537.call(null, G__21538));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21643.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21643);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21643);
}
} else {
return null;
}
});})(seq__21508,chunk__21509,count__21510,i__21511,slug_21641,tooltip_id_21642,tooltip_21643,link,seq__21508__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21508,chunk__21509,count__21510,i__21511,slug_21641,tooltip_id_21642,tooltip_21643,link,seq__21508__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21643);
} else {
return null;
}
});})(seq__21508,chunk__21509,count__21510,i__21511,slug_21641,tooltip_id_21642,tooltip_21643,link,seq__21508__$1,temp__5825__auto__))
);


var G__21645 = cljs.core.next(seq__21508__$1);
var G__21646 = null;
var G__21647 = (0);
var G__21648 = (0);
seq__21508 = G__21645;
chunk__21509 = G__21646;
count__21510 = G__21647;
i__21511 = G__21648;
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

var seq__21539 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21540 = null;
var count__21541 = (0);
var i__21542 = (0);
while(true){
if((i__21542 < count__21541)){
var el = chunk__21540.cljs$core$IIndexed$_nth$arity$2(null, i__21542);
var code_21649 = el.textContent;
var container_21650 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21649,((function (seq__21539,chunk__21540,count__21541,i__21542,code_21649,container_21650,el){
return (function (svg){
return (container_21650["innerHTML"] = svg);
});})(seq__21539,chunk__21540,count__21541,i__21542,code_21649,container_21650,el))
);


var G__21651 = seq__21539;
var G__21652 = chunk__21540;
var G__21653 = count__21541;
var G__21654 = (i__21542 + (1));
seq__21539 = G__21651;
chunk__21540 = G__21652;
count__21541 = G__21653;
i__21542 = G__21654;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21539);
if(temp__5825__auto__){
var seq__21539__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21539__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21539__$1);
var G__21655 = cljs.core.chunk_rest(seq__21539__$1);
var G__21656 = c__5525__auto__;
var G__21657 = cljs.core.count(c__5525__auto__);
var G__21658 = (0);
seq__21539 = G__21655;
chunk__21540 = G__21656;
count__21541 = G__21657;
i__21542 = G__21658;
continue;
} else {
var el = cljs.core.first(seq__21539__$1);
var code_21659 = el.textContent;
var container_21660 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21659,((function (seq__21539,chunk__21540,count__21541,i__21542,code_21659,container_21660,el,seq__21539__$1,temp__5825__auto__){
return (function (svg){
return (container_21660["innerHTML"] = svg);
});})(seq__21539,chunk__21540,count__21541,i__21542,code_21659,container_21660,el,seq__21539__$1,temp__5825__auto__))
);


var G__21661 = cljs.core.next(seq__21539__$1);
var G__21662 = null;
var G__21663 = (0);
var G__21664 = (0);
seq__21539 = G__21661;
chunk__21540 = G__21662;
count__21541 = G__21663;
i__21542 = G__21664;
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
var temp__5825__auto___21665 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21665)){
var saved_21666 = temp__5825__auto___21665;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21666));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21565 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21566 = null;
var count__21567 = (0);
var i__21568 = (0);
while(true){
if((i__21568 < count__21567)){
var el = chunk__21566.cljs$core$IIndexed$_nth$arity$2(null, i__21568);
hljs.highlightElement(el);


var G__21667 = seq__21565;
var G__21668 = chunk__21566;
var G__21669 = count__21567;
var G__21670 = (i__21568 + (1));
seq__21565 = G__21667;
chunk__21566 = G__21668;
count__21567 = G__21669;
i__21568 = G__21670;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21565);
if(temp__5825__auto__){
var seq__21565__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21565__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21565__$1);
var G__21671 = cljs.core.chunk_rest(seq__21565__$1);
var G__21672 = c__5525__auto__;
var G__21673 = cljs.core.count(c__5525__auto__);
var G__21674 = (0);
seq__21565 = G__21671;
chunk__21566 = G__21672;
count__21567 = G__21673;
i__21568 = G__21674;
continue;
} else {
var el = cljs.core.first(seq__21565__$1);
hljs.highlightElement(el);


var G__21675 = cljs.core.next(seq__21565__$1);
var G__21676 = null;
var G__21677 = (0);
var G__21678 = (0);
seq__21565 = G__21675;
chunk__21566 = G__21676;
count__21567 = G__21677;
i__21568 = G__21678;
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
