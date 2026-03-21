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
var G__21492 = el.getAttribute("href");
if((G__21492 == null)){
return null;
} else {
return G__21492.startsWith("/glossary/");
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
var slug_21582 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21583 = ["tooltip-",slug_21582].join('');
var tooltip_21584 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21583);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21583);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21582,"/"].join('')).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21582,tooltip_id_21583,link){
return (function (p1__21500_SHARP_){
return p1__21500_SHARP_.text();
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21582,tooltip_id_21583,link))
).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21582,tooltip_id_21583,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21582))," <a href=\"/glossary/",slug_21582,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21582,tooltip_id_21583,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21582,tooltip_id_21583,tooltip_21584,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21584.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21584);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21584);
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21582,tooltip_id_21583,tooltip_21584,link))
);

goog.events.listen(link,"keydown",((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21582,tooltip_id_21583,tooltip_21584,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21531 = e.key;
var fexpr__21530 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21530.cljs$core$IFn$_invoke$arity$1 ? fexpr__21530.cljs$core$IFn$_invoke$arity$1(G__21531) : fexpr__21530.call(null, G__21531));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21584.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21584);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21584);
}
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21582,tooltip_id_21583,tooltip_21584,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21582,tooltip_id_21583,tooltip_21584,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21584);
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21582,tooltip_id_21583,tooltip_21584,link))
);


var G__21626 = seq__21501;
var G__21627 = chunk__21502;
var G__21628 = count__21503;
var G__21629 = (i__21504 + (1));
seq__21501 = G__21626;
chunk__21502 = G__21627;
count__21503 = G__21628;
i__21504 = G__21629;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21501);
if(temp__5825__auto__){
var seq__21501__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21501__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21501__$1);
var G__21631 = cljs.core.chunk_rest(seq__21501__$1);
var G__21632 = c__5525__auto__;
var G__21633 = cljs.core.count(c__5525__auto__);
var G__21634 = (0);
seq__21501 = G__21631;
chunk__21502 = G__21632;
count__21503 = G__21633;
i__21504 = G__21634;
continue;
} else {
var link = cljs.core.first(seq__21501__$1);
var slug_21635 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21636 = ["tooltip-",slug_21635].join('');
var tooltip_21637 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21636);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21636);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",slug_21635,"/"].join('')).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21635,tooltip_id_21636,link,seq__21501__$1,temp__5825__auto__){
return (function (p1__21500_SHARP_){
return p1__21500_SHARP_.text();
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21635,tooltip_id_21636,link,seq__21501__$1,temp__5825__auto__))
).then(((function (seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21635,tooltip_id_21636,link,seq__21501__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21635))," <a href=\"/glossary/",slug_21635,"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21501,chunk__21502,count__21503,i__21504,div,or__5002__auto__,slug_21635,tooltip_id_21636,link,seq__21501__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21635,tooltip_id_21636,tooltip_21637,link,seq__21501__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21637.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21637);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21637);
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21635,tooltip_id_21636,tooltip_21637,link,seq__21501__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21635,tooltip_id_21636,tooltip_21637,link,seq__21501__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21540 = e.key;
var fexpr__21539 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21539.cljs$core$IFn$_invoke$arity$1 ? fexpr__21539.cljs$core$IFn$_invoke$arity$1(G__21540) : fexpr__21539.call(null, G__21540));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21637.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21637);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21637);
}
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21635,tooltip_id_21636,tooltip_21637,link,seq__21501__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21501,chunk__21502,count__21503,i__21504,slug_21635,tooltip_id_21636,tooltip_21637,link,seq__21501__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21637);
} else {
return null;
}
});})(seq__21501,chunk__21502,count__21503,i__21504,slug_21635,tooltip_id_21636,tooltip_21637,link,seq__21501__$1,temp__5825__auto__))
);


var G__21645 = cljs.core.next(seq__21501__$1);
var G__21646 = null;
var G__21647 = (0);
var G__21648 = (0);
seq__21501 = G__21645;
chunk__21502 = G__21646;
count__21503 = G__21647;
i__21504 = G__21648;
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

var seq__21549 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21550 = null;
var count__21551 = (0);
var i__21552 = (0);
while(true){
if((i__21552 < count__21551)){
var el = chunk__21550.cljs$core$IIndexed$_nth$arity$2(null, i__21552);
var code_21649 = el.textContent;
var container_21650 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21649,((function (seq__21549,chunk__21550,count__21551,i__21552,code_21649,container_21650,el){
return (function (svg){
return (container_21650["innerHTML"] = svg);
});})(seq__21549,chunk__21550,count__21551,i__21552,code_21649,container_21650,el))
);


var G__21651 = seq__21549;
var G__21652 = chunk__21550;
var G__21653 = count__21551;
var G__21654 = (i__21552 + (1));
seq__21549 = G__21651;
chunk__21550 = G__21652;
count__21551 = G__21653;
i__21552 = G__21654;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21549);
if(temp__5825__auto__){
var seq__21549__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21549__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21549__$1);
var G__21655 = cljs.core.chunk_rest(seq__21549__$1);
var G__21656 = c__5525__auto__;
var G__21657 = cljs.core.count(c__5525__auto__);
var G__21658 = (0);
seq__21549 = G__21655;
chunk__21550 = G__21656;
count__21551 = G__21657;
i__21552 = G__21658;
continue;
} else {
var el = cljs.core.first(seq__21549__$1);
var code_21659 = el.textContent;
var container_21660 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21659,((function (seq__21549,chunk__21550,count__21551,i__21552,code_21659,container_21660,el,seq__21549__$1,temp__5825__auto__){
return (function (svg){
return (container_21660["innerHTML"] = svg);
});})(seq__21549,chunk__21550,count__21551,i__21552,code_21659,container_21660,el,seq__21549__$1,temp__5825__auto__))
);


var G__21661 = cljs.core.next(seq__21549__$1);
var G__21662 = null;
var G__21663 = (0);
var G__21664 = (0);
seq__21549 = G__21661;
chunk__21550 = G__21662;
count__21551 = G__21663;
i__21552 = G__21664;
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
var seq__21572 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21573 = null;
var count__21574 = (0);
var i__21575 = (0);
while(true){
if((i__21575 < count__21574)){
var el = chunk__21573.cljs$core$IIndexed$_nth$arity$2(null, i__21575);
hljs.highlightElement(el);


var G__21667 = seq__21572;
var G__21668 = chunk__21573;
var G__21669 = count__21574;
var G__21670 = (i__21575 + (1));
seq__21572 = G__21667;
chunk__21573 = G__21668;
count__21574 = G__21669;
i__21575 = G__21670;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21572);
if(temp__5825__auto__){
var seq__21572__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21572__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21572__$1);
var G__21671 = cljs.core.chunk_rest(seq__21572__$1);
var G__21672 = c__5525__auto__;
var G__21673 = cljs.core.count(c__5525__auto__);
var G__21674 = (0);
seq__21572 = G__21671;
chunk__21573 = G__21672;
count__21574 = G__21673;
i__21575 = G__21674;
continue;
} else {
var el = cljs.core.first(seq__21572__$1);
hljs.highlightElement(el);


var G__21675 = cljs.core.next(seq__21572__$1);
var G__21676 = null;
var G__21677 = (0);
var G__21678 = (0);
seq__21572 = G__21675;
chunk__21573 = G__21676;
count__21574 = G__21677;
i__21575 = G__21678;
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
