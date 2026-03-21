goog.provide('blog.client.core');
if((typeof blog !== 'undefined') && (typeof blog.client !== 'undefined') && (typeof blog.client.core !== 'undefined') && (typeof blog.client.core.glossary_open !== 'undefined')){
} else {
blog.client.core.glossary_open = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
blog.client.core.hide_tooltip_BANG_ = (function blog$client$core$hide_tooltip_BANG_(abbr_el,tooltip){
abbr_el.removeAttribute("aria-describedby");

tooltip.classList.remove("visible");

return cljs.core.reset_BANG_(blog.client.core.glossary_open,null);
});
blog.client.core.hide_open_glossary_tooltip_BANG_ = (function blog$client$core$hide_open_glossary_tooltip_BANG_(){
var temp__5825__auto__ = cljs.core.deref(blog.client.core.glossary_open);
if(cljs.core.truth_(temp__5825__auto__)){
var map__21491 = temp__5825__auto__;
var map__21491__$1 = cljs.core.__destructure_map(map__21491);
var abbr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21491__$1,new cljs.core.Keyword(null,"abbr","abbr",2088591884));
var tooltip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21491__$1,new cljs.core.Keyword(null,"tooltip","tooltip",-1809677058));
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip);
} else {
return null;
}
});
blog.client.core.show_tooltip_BANG_ = (function blog$client$core$show_tooltip_BANG_(abbr_el,tooltip){
blog.client.core.hide_open_glossary_tooltip_BANG_();

abbr_el.setAttribute("aria-describedby",tooltip.id);

tooltip.classList.add("visible");

return cljs.core.reset_BANG_(blog.client.core.glossary_open,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"abbr","abbr",2088591884),abbr_el,new cljs.core.Keyword(null,"tooltip","tooltip",-1809677058),tooltip], null));
});
blog.client.core.slug_from_href = (function blog$client$core$slug_from_href(href){
return clojure.string.replace(clojure.string.replace(href,/^\/glossary\//,""),/\/$/,"");
});
blog.client.core.plain_left_click_QMARK_ = (function blog$client$core$plain_left_click_QMARK_(e){
var btn = e.button;
return ((cljs.core.not(e.metaKey)) && (((cljs.core.not(e.ctrlKey)) && (((cljs.core.not(e.shiftKey)) && (((cljs.core.not(e.altKey)) && ((((void 0 === btn)) || ((((btn == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),btn)))))))))))));
});
blog.client.core.fill_tooltip_static_BANG_ = (function blog$client$core$fill_tooltip_static_BANG_(div,slug,definition_text){
while(true){
if(cljs.core.truth_(div.hasChildNodes())){
div.removeChild(div.firstChild);

continue;
} else {
}
break;
}

div.appendChild(document.createTextNode((function (){var or__5002__auto__ = definition_text;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})()));

var a = goog.dom.createElement("a");
a.setAttribute("href",["/glossary/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(slug),"/"].join(''));

a.setAttribute("class","glossary-link");

(a.textContent = "Full entry \u2192");

return div.appendChild(a);
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__21512_21608 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("abbr.glossary-term")));
var chunk__21513_21609 = null;
var count__21514_21610 = (0);
var i__21515_21611 = (0);
while(true){
if((i__21515_21611 < count__21514_21610)){
var abbr_21612 = chunk__21513_21609.cljs$core$IIndexed$_nth$arity$2(null, i__21515_21611);
var temp__5825__auto___21613 = abbr_21612.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21613)){
var link_21614 = temp__5825__auto___21613;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",link_21614.getAttribute("href"))){
var slug_21618 = blog.client.core.slug_from_href(link_21614.getAttribute("href"));
var tooltip_id_21619 = ["tooltip-",slug_21618].join('');
var data_def_21620 = abbr_21612.getAttribute("data-definition");
var tooltip_21621 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21619);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21619);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

abbr_21612.appendChild(div);

if(cljs.core.seq(data_def_21620)){
blog.client.core.fill_tooltip_static_BANG_(div,slug_21618,data_def_21620);
} else {
fetch(["/glossary/",slug_21618,"/"].join('')).then(((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21618,tooltip_id_21619,data_def_21620,link_21614,temp__5825__auto___21613,abbr_21612){
return (function (p1__21511_SHARP_){
return p1__21511_SHARP_.text();
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21618,tooltip_id_21619,data_def_21620,link_21614,temp__5825__auto___21613,abbr_21612))
).then(((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21618,tooltip_id_21619,data_def_21620,link_21614,temp__5825__auto___21613,abbr_21612){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21618,(cljs.core.truth_(def_el)?def_el.textContent:slug_21618));
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21618,tooltip_id_21619,data_def_21620,link_21614,temp__5825__auto___21613,abbr_21612))
);
}

return div;
}
})();
goog.events.listen(link_21614,goog.events.EventType.CLICK,((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21618,tooltip_id_21619,data_def_21620,tooltip_21621,link_21614,temp__5825__auto___21613,abbr_21612){
return (function (e){
if(blog.client.core.plain_left_click_QMARK_(e)){
e.preventDefault();

if(cljs.core.truth_(tooltip_21621.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21612,tooltip_21621);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21612,tooltip_21621);
}
} else {
return null;
}
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21618,tooltip_id_21619,data_def_21620,tooltip_21621,link_21614,temp__5825__auto___21613,abbr_21612))
);

goog.events.listen(link_21614,"keydown",((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21618,tooltip_id_21619,data_def_21620,tooltip_21621,link_21614,temp__5825__auto___21613,abbr_21612){
return (function (e){
if(cljs.core.truth_((function (){var G__21536 = e.key;
var fexpr__21535 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21535.cljs$core$IFn$_invoke$arity$1 ? fexpr__21535.cljs$core$IFn$_invoke$arity$1(G__21536) : fexpr__21535.call(null, G__21536));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21621.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21612,tooltip_21621);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21612,tooltip_21621);
}
} else {
return null;
}
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21618,tooltip_id_21619,data_def_21620,tooltip_21621,link_21614,temp__5825__auto___21613,abbr_21612))
);
} else {
}
} else {
}


var G__21623 = seq__21512_21608;
var G__21624 = chunk__21513_21609;
var G__21625 = count__21514_21610;
var G__21626 = (i__21515_21611 + (1));
seq__21512_21608 = G__21623;
chunk__21513_21609 = G__21624;
count__21514_21610 = G__21625;
i__21515_21611 = G__21626;
continue;
} else {
var temp__5825__auto___21627 = cljs.core.seq(seq__21512_21608);
if(temp__5825__auto___21627){
var seq__21512_21628__$1 = temp__5825__auto___21627;
if(cljs.core.chunked_seq_QMARK_(seq__21512_21628__$1)){
var c__5525__auto___21629 = cljs.core.chunk_first(seq__21512_21628__$1);
var G__21630 = cljs.core.chunk_rest(seq__21512_21628__$1);
var G__21631 = c__5525__auto___21629;
var G__21632 = cljs.core.count(c__5525__auto___21629);
var G__21633 = (0);
seq__21512_21608 = G__21630;
chunk__21513_21609 = G__21631;
count__21514_21610 = G__21632;
i__21515_21611 = G__21633;
continue;
} else {
var abbr_21634 = cljs.core.first(seq__21512_21628__$1);
var temp__5825__auto___21635__$1 = abbr_21634.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21635__$1)){
var link_21636 = temp__5825__auto___21635__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",link_21636.getAttribute("href"))){
var slug_21637 = blog.client.core.slug_from_href(link_21636.getAttribute("href"));
var tooltip_id_21638 = ["tooltip-",slug_21637].join('');
var data_def_21639 = abbr_21634.getAttribute("data-definition");
var tooltip_21640 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21638);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21638);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

abbr_21634.appendChild(div);

if(cljs.core.seq(data_def_21639)){
blog.client.core.fill_tooltip_static_BANG_(div,slug_21637,data_def_21639);
} else {
fetch(["/glossary/",slug_21637,"/"].join('')).then(((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627){
return (function (p1__21511_SHARP_){
return p1__21511_SHARP_.text();
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627))
).then(((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21637,(cljs.core.truth_(def_el)?def_el.textContent:slug_21637));
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627))
);
}

return div;
}
})();
goog.events.listen(link_21636,goog.events.EventType.CLICK,((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627){
return (function (e){
if(blog.client.core.plain_left_click_QMARK_(e)){
e.preventDefault();

if(cljs.core.truth_(tooltip_21640.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21634,tooltip_21640);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21634,tooltip_21640);
}
} else {
return null;
}
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627))
);

goog.events.listen(link_21636,"keydown",((function (seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627){
return (function (e){
if(cljs.core.truth_((function (){var G__21541 = e.key;
var fexpr__21540 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21540.cljs$core$IFn$_invoke$arity$1 ? fexpr__21540.cljs$core$IFn$_invoke$arity$1(G__21541) : fexpr__21540.call(null, G__21541));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21640.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21634,tooltip_21640);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21634,tooltip_21640);
}
} else {
return null;
}
});})(seq__21512_21608,chunk__21513_21609,count__21514_21610,i__21515_21611,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635__$1,abbr_21634,seq__21512_21628__$1,temp__5825__auto___21627))
);
} else {
}
} else {
}


var G__21649 = cljs.core.next(seq__21512_21628__$1);
var G__21650 = null;
var G__21651 = (0);
var G__21652 = (0);
seq__21512_21608 = G__21649;
chunk__21513_21609 = G__21650;
count__21514_21610 = G__21651;
i__21515_21611 = G__21652;
continue;
}
} else {
}
}
break;
}

return goog.events.listen(document,goog.events.EventType.KEYDOWN,(function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_open_glossary_tooltip_BANG_();
} else {
return null;
}
}));
});
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
blog.client.core.init_mermaid_BANG_ = (function blog$client$core$init_mermaid_BANG_(){
if((typeof mermaid !== 'undefined')){
mermaid.initialize(({"startOnLoad": false, "theme": "dark"}));

var seq__21563 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21564 = null;
var count__21565 = (0);
var i__21566 = (0);
while(true){
if((i__21566 < count__21565)){
var el = chunk__21564.cljs$core$IIndexed$_nth$arity$2(null, i__21566);
var code_21653 = el.textContent;
var container_21654 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21653,((function (seq__21563,chunk__21564,count__21565,i__21566,code_21653,container_21654,el){
return (function (svg){
return (container_21654["innerHTML"] = svg);
});})(seq__21563,chunk__21564,count__21565,i__21566,code_21653,container_21654,el))
);


var G__21659 = seq__21563;
var G__21660 = chunk__21564;
var G__21661 = count__21565;
var G__21662 = (i__21566 + (1));
seq__21563 = G__21659;
chunk__21564 = G__21660;
count__21565 = G__21661;
i__21566 = G__21662;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21563);
if(temp__5825__auto__){
var seq__21563__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21563__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21563__$1);
var G__21663 = cljs.core.chunk_rest(seq__21563__$1);
var G__21664 = c__5525__auto__;
var G__21665 = cljs.core.count(c__5525__auto__);
var G__21666 = (0);
seq__21563 = G__21663;
chunk__21564 = G__21664;
count__21565 = G__21665;
i__21566 = G__21666;
continue;
} else {
var el = cljs.core.first(seq__21563__$1);
var code_21667 = el.textContent;
var container_21668 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21667,((function (seq__21563,chunk__21564,count__21565,i__21566,code_21667,container_21668,el,seq__21563__$1,temp__5825__auto__){
return (function (svg){
return (container_21668["innerHTML"] = svg);
});})(seq__21563,chunk__21564,count__21565,i__21566,code_21667,container_21668,el,seq__21563__$1,temp__5825__auto__))
);


var G__21669 = cljs.core.next(seq__21563__$1);
var G__21670 = null;
var G__21671 = (0);
var G__21672 = (0);
seq__21563 = G__21669;
chunk__21564 = G__21670;
count__21565 = G__21671;
i__21566 = G__21672;
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
var temp__5825__auto___21673 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21673)){
var saved_21674 = temp__5825__auto___21673;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21674));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21597 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21598 = null;
var count__21599 = (0);
var i__21600 = (0);
while(true){
if((i__21600 < count__21599)){
var el = chunk__21598.cljs$core$IIndexed$_nth$arity$2(null, i__21600);
hljs.highlightElement(el);


var G__21676 = seq__21597;
var G__21677 = chunk__21598;
var G__21678 = count__21599;
var G__21679 = (i__21600 + (1));
seq__21597 = G__21676;
chunk__21598 = G__21677;
count__21599 = G__21678;
i__21600 = G__21679;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21597);
if(temp__5825__auto__){
var seq__21597__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21597__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21597__$1);
var G__21682 = cljs.core.chunk_rest(seq__21597__$1);
var G__21683 = c__5525__auto__;
var G__21684 = cljs.core.count(c__5525__auto__);
var G__21685 = (0);
seq__21597 = G__21682;
chunk__21598 = G__21683;
count__21599 = G__21684;
i__21600 = G__21685;
continue;
} else {
var el = cljs.core.first(seq__21597__$1);
hljs.highlightElement(el);


var G__21687 = cljs.core.next(seq__21597__$1);
var G__21688 = null;
var G__21689 = (0);
var G__21690 = (0);
seq__21597 = G__21687;
chunk__21598 = G__21688;
count__21599 = G__21689;
i__21600 = G__21690;
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
