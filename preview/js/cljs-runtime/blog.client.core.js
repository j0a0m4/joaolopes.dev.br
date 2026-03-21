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
var G__21476 = el.getAttribute("href");
if((G__21476 == null)){
return null;
} else {
return G__21476.startsWith("/glossary/");
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
var slug_21526 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21527 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21526)].join('');
var tooltip_21528 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21527);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21527);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21526),"/"].join('')).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21526,tooltip_id_21527,link){
return (function (p1__21477_SHARP_){
return p1__21477_SHARP_.text();
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21526,tooltip_id_21527,link))
).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21526,tooltip_id_21527,link){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21526))," <a href=\"/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21526),"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21526,tooltip_id_21527,link))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21526,tooltip_id_21527,tooltip_21528,link){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21528.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21528);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21528);
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21526,tooltip_id_21527,tooltip_21528,link))
);

goog.events.listen(link,"keydown",((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21526,tooltip_id_21527,tooltip_21528,link){
return (function (e){
if(cljs.core.truth_((function (){var G__21494 = e.key;
var fexpr__21493 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21493.cljs$core$IFn$_invoke$arity$1 ? fexpr__21493.cljs$core$IFn$_invoke$arity$1(G__21494) : fexpr__21493.call(null, G__21494));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21528.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21528);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21528);
}
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21526,tooltip_id_21527,tooltip_21528,link))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21526,tooltip_id_21527,tooltip_21528,link){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21528);
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21526,tooltip_id_21527,tooltip_21528,link))
);


var G__21541 = seq__21478;
var G__21542 = chunk__21479;
var G__21543 = count__21480;
var G__21544 = (i__21481 + (1));
seq__21478 = G__21541;
chunk__21479 = G__21542;
count__21480 = G__21543;
i__21481 = G__21544;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21478);
if(temp__5825__auto__){
var seq__21478__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21478__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21478__$1);
var G__21547 = cljs.core.chunk_rest(seq__21478__$1);
var G__21548 = c__5525__auto__;
var G__21549 = cljs.core.count(c__5525__auto__);
var G__21550 = (0);
seq__21478 = G__21547;
chunk__21479 = G__21548;
count__21480 = G__21549;
i__21481 = G__21550;
continue;
} else {
var link = cljs.core.first(seq__21478__$1);
var slug_21552 = blog.client.core.slug_from_href(link.getAttribute("href"));
var tooltip_id_21553 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21552)].join('');
var tooltip_21554 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21553);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21553);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

(div["textContent"] = "Loading...");

link.parentNode.appendChild(div);

fetch(["/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21552),"/"].join('')).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21552,tooltip_id_21553,link,seq__21478__$1,temp__5825__auto__){
return (function (p1__21477_SHARP_){
return p1__21477_SHARP_.text();
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21552,tooltip_id_21553,link,seq__21478__$1,temp__5825__auto__))
).then(((function (seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21552,tooltip_id_21553,link,seq__21478__$1,temp__5825__auto__){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return (div["innerHTML"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(def_el)?def_el.textContent:slug_21552))," <a href=\"/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug_21552),"/\" class=\"glossary-link\">Full entry \u2192</a>"].join(''));
});})(seq__21478,chunk__21479,count__21480,i__21481,div,or__5002__auto__,slug_21552,tooltip_id_21553,link,seq__21478__$1,temp__5825__auto__))
);

return div;
}
})();
link.classList.add("glossary-term");

goog.events.listen(link,goog.events.EventType.CLICK,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21552,tooltip_id_21553,tooltip_21554,link,seq__21478__$1,temp__5825__auto__){
return (function (e){
e.preventDefault();

if(cljs.core.truth_(tooltip_21554.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21554);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21554);
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21552,tooltip_id_21553,tooltip_21554,link,seq__21478__$1,temp__5825__auto__))
);

goog.events.listen(link,"keydown",((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21552,tooltip_id_21553,tooltip_21554,link,seq__21478__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__21496 = e.key;
var fexpr__21495 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21495.cljs$core$IFn$_invoke$arity$1 ? fexpr__21495.cljs$core$IFn$_invoke$arity$1(G__21496) : fexpr__21495.call(null, G__21496));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21554.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21554);
} else {
return blog.client.core.show_tooltip_BANG_(link,tooltip_21554);
}
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21552,tooltip_id_21553,tooltip_21554,link,seq__21478__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__21478,chunk__21479,count__21480,i__21481,slug_21552,tooltip_id_21553,tooltip_21554,link,seq__21478__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(link,tooltip_21554);
} else {
return null;
}
});})(seq__21478,chunk__21479,count__21480,i__21481,slug_21552,tooltip_id_21553,tooltip_21554,link,seq__21478__$1,temp__5825__auto__))
);


var G__21565 = cljs.core.next(seq__21478__$1);
var G__21566 = null;
var G__21567 = (0);
var G__21568 = (0);
seq__21478 = G__21565;
chunk__21479 = G__21566;
count__21480 = G__21567;
i__21481 = G__21568;
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
var code_21572 = el.textContent;
var container_21573 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21572,((function (seq__21497,chunk__21498,count__21499,i__21500,code_21572,container_21573,el){
return (function (svg){
return (container_21573["innerHTML"] = svg);
});})(seq__21497,chunk__21498,count__21499,i__21500,code_21572,container_21573,el))
);


var G__21574 = seq__21497;
var G__21575 = chunk__21498;
var G__21576 = count__21499;
var G__21577 = (i__21500 + (1));
seq__21497 = G__21574;
chunk__21498 = G__21575;
count__21499 = G__21576;
i__21500 = G__21577;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21497);
if(temp__5825__auto__){
var seq__21497__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21497__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21497__$1);
var G__21578 = cljs.core.chunk_rest(seq__21497__$1);
var G__21579 = c__5525__auto__;
var G__21580 = cljs.core.count(c__5525__auto__);
var G__21581 = (0);
seq__21497 = G__21578;
chunk__21498 = G__21579;
count__21499 = G__21580;
i__21500 = G__21581;
continue;
} else {
var el = cljs.core.first(seq__21497__$1);
var code_21583 = el.textContent;
var container_21584 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21583,((function (seq__21497,chunk__21498,count__21499,i__21500,code_21583,container_21584,el,seq__21497__$1,temp__5825__auto__){
return (function (svg){
return (container_21584["innerHTML"] = svg);
});})(seq__21497,chunk__21498,count__21499,i__21500,code_21583,container_21584,el,seq__21497__$1,temp__5825__auto__))
);


var G__21590 = cljs.core.next(seq__21497__$1);
var G__21591 = null;
var G__21592 = (0);
var G__21593 = (0);
seq__21497 = G__21590;
chunk__21498 = G__21591;
count__21499 = G__21592;
i__21500 = G__21593;
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
var temp__5825__auto___21594 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21594)){
var saved_21596 = temp__5825__auto___21594;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21596));
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


var G__21597 = seq__21505;
var G__21598 = chunk__21506;
var G__21599 = count__21507;
var G__21600 = (i__21508 + (1));
seq__21505 = G__21597;
chunk__21506 = G__21598;
count__21507 = G__21599;
i__21508 = G__21600;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21505);
if(temp__5825__auto__){
var seq__21505__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21505__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21505__$1);
var G__21605 = cljs.core.chunk_rest(seq__21505__$1);
var G__21606 = c__5525__auto__;
var G__21607 = cljs.core.count(c__5525__auto__);
var G__21608 = (0);
seq__21505 = G__21605;
chunk__21506 = G__21606;
count__21507 = G__21607;
i__21508 = G__21608;
continue;
} else {
var el = cljs.core.first(seq__21505__$1);
hljs.highlightElement(el);


var G__21609 = cljs.core.next(seq__21505__$1);
var G__21610 = null;
var G__21611 = (0);
var G__21612 = (0);
seq__21505 = G__21609;
chunk__21506 = G__21610;
count__21507 = G__21611;
i__21508 = G__21612;
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
