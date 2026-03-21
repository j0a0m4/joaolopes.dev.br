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
var map__21495 = temp__5825__auto__;
var map__21495__$1 = cljs.core.__destructure_map(map__21495);
var abbr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21495__$1,new cljs.core.Keyword(null,"abbr","abbr",2088591884));
var tooltip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21495__$1,new cljs.core.Keyword(null,"tooltip","tooltip",-1809677058));
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
return ((cljs.core.not(e.metaKey)) && (((cljs.core.not(e.ctrlKey)) && (((cljs.core.not(e.shiftKey)) && (((cljs.core.not(e.altKey)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),e.button)))))))));
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
var seq__21515_21630 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("abbr.glossary-term")));
var chunk__21516_21631 = null;
var count__21517_21632 = (0);
var i__21518_21633 = (0);
while(true){
if((i__21518_21633 < count__21517_21632)){
var abbr_21634 = chunk__21516_21631.cljs$core$IIndexed$_nth$arity$2(null, i__21518_21633);
var temp__5825__auto___21635 = abbr_21634.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21635)){
var link_21636 = temp__5825__auto___21635;
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
fetch(["/glossary/",slug_21637,"/"].join('')).then(((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635,abbr_21634){
return (function (p1__21514_SHARP_){
return p1__21514_SHARP_.text();
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635,abbr_21634))
).then(((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635,abbr_21634){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21637,(cljs.core.truth_(def_el)?def_el.textContent:slug_21637));
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21637,tooltip_id_21638,data_def_21639,link_21636,temp__5825__auto___21635,abbr_21634))
);
}

return div;
}
})();
goog.events.listen(abbr_21634,goog.events.EventType.CLICK,((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635,abbr_21634){
return (function (e){
var t = e.target;
if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,link_21636);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var and__5000__auto__ = (t instanceof Node);
if(and__5000__auto__){
return link_21636.contains(t);
} else {
return and__5000__auto__;
}
}
})())){
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
} else {
return null;
}
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635,abbr_21634))
);

goog.events.listen(link_21636,"keydown",((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635,abbr_21634){
return (function (e){
if(cljs.core.truth_((function (){var G__21556 = e.key;
var fexpr__21555 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21555.cljs$core$IFn$_invoke$arity$1 ? fexpr__21555.cljs$core$IFn$_invoke$arity$1(G__21556) : fexpr__21555.call(null, G__21556));
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
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21637,tooltip_id_21638,data_def_21639,tooltip_21640,link_21636,temp__5825__auto___21635,abbr_21634))
);
} else {
}
} else {
}


var G__21641 = seq__21515_21630;
var G__21642 = chunk__21516_21631;
var G__21643 = count__21517_21632;
var G__21644 = (i__21518_21633 + (1));
seq__21515_21630 = G__21641;
chunk__21516_21631 = G__21642;
count__21517_21632 = G__21643;
i__21518_21633 = G__21644;
continue;
} else {
var temp__5825__auto___21645 = cljs.core.seq(seq__21515_21630);
if(temp__5825__auto___21645){
var seq__21515_21646__$1 = temp__5825__auto___21645;
if(cljs.core.chunked_seq_QMARK_(seq__21515_21646__$1)){
var c__5525__auto___21647 = cljs.core.chunk_first(seq__21515_21646__$1);
var G__21648 = cljs.core.chunk_rest(seq__21515_21646__$1);
var G__21649 = c__5525__auto___21647;
var G__21650 = cljs.core.count(c__5525__auto___21647);
var G__21651 = (0);
seq__21515_21630 = G__21648;
chunk__21516_21631 = G__21649;
count__21517_21632 = G__21650;
i__21518_21633 = G__21651;
continue;
} else {
var abbr_21652 = cljs.core.first(seq__21515_21646__$1);
var temp__5825__auto___21653__$1 = abbr_21652.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21653__$1)){
var link_21654 = temp__5825__auto___21653__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",link_21654.getAttribute("href"))){
var slug_21655 = blog.client.core.slug_from_href(link_21654.getAttribute("href"));
var tooltip_id_21656 = ["tooltip-",slug_21655].join('');
var data_def_21657 = abbr_21652.getAttribute("data-definition");
var tooltip_21658 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21656);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21656);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

abbr_21652.appendChild(div);

if(cljs.core.seq(data_def_21657)){
blog.client.core.fill_tooltip_static_BANG_(div,slug_21655,data_def_21657);
} else {
fetch(["/glossary/",slug_21655,"/"].join('')).then(((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645){
return (function (p1__21514_SHARP_){
return p1__21514_SHARP_.text();
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645))
).then(((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21655,(cljs.core.truth_(def_el)?def_el.textContent:slug_21655));
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645))
);
}

return div;
}
})();
goog.events.listen(abbr_21652,goog.events.EventType.CLICK,((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645){
return (function (e){
var t = e.target;
if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,link_21654);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var and__5000__auto__ = (t instanceof Node);
if(and__5000__auto__){
return link_21654.contains(t);
} else {
return and__5000__auto__;
}
}
})())){
if(blog.client.core.plain_left_click_QMARK_(e)){
e.preventDefault();

if(cljs.core.truth_(tooltip_21658.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21652,tooltip_21658);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21652,tooltip_21658);
}
} else {
return null;
}
} else {
return null;
}
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645))
);

goog.events.listen(link_21654,"keydown",((function (seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645){
return (function (e){
if(cljs.core.truth_((function (){var G__21566 = e.key;
var fexpr__21565 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21565.cljs$core$IFn$_invoke$arity$1 ? fexpr__21565.cljs$core$IFn$_invoke$arity$1(G__21566) : fexpr__21565.call(null, G__21566));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21658.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21652,tooltip_21658);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21652,tooltip_21658);
}
} else {
return null;
}
});})(seq__21515_21630,chunk__21516_21631,count__21517_21632,i__21518_21633,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21515_21646__$1,temp__5825__auto___21645))
);
} else {
}
} else {
}


var G__21659 = cljs.core.next(seq__21515_21646__$1);
var G__21660 = null;
var G__21661 = (0);
var G__21662 = (0);
seq__21515_21630 = G__21659;
chunk__21516_21631 = G__21660;
count__21517_21632 = G__21661;
i__21518_21633 = G__21662;
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

var seq__21592 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21593 = null;
var count__21594 = (0);
var i__21595 = (0);
while(true){
if((i__21595 < count__21594)){
var el = chunk__21593.cljs$core$IIndexed$_nth$arity$2(null, i__21595);
var code_21663 = el.textContent;
var container_21664 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21663,((function (seq__21592,chunk__21593,count__21594,i__21595,code_21663,container_21664,el){
return (function (svg){
return (container_21664["innerHTML"] = svg);
});})(seq__21592,chunk__21593,count__21594,i__21595,code_21663,container_21664,el))
);


var G__21665 = seq__21592;
var G__21666 = chunk__21593;
var G__21667 = count__21594;
var G__21668 = (i__21595 + (1));
seq__21592 = G__21665;
chunk__21593 = G__21666;
count__21594 = G__21667;
i__21595 = G__21668;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21592);
if(temp__5825__auto__){
var seq__21592__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21592__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21592__$1);
var G__21669 = cljs.core.chunk_rest(seq__21592__$1);
var G__21670 = c__5525__auto__;
var G__21671 = cljs.core.count(c__5525__auto__);
var G__21672 = (0);
seq__21592 = G__21669;
chunk__21593 = G__21670;
count__21594 = G__21671;
i__21595 = G__21672;
continue;
} else {
var el = cljs.core.first(seq__21592__$1);
var code_21673 = el.textContent;
var container_21674 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21673,((function (seq__21592,chunk__21593,count__21594,i__21595,code_21673,container_21674,el,seq__21592__$1,temp__5825__auto__){
return (function (svg){
return (container_21674["innerHTML"] = svg);
});})(seq__21592,chunk__21593,count__21594,i__21595,code_21673,container_21674,el,seq__21592__$1,temp__5825__auto__))
);


var G__21675 = cljs.core.next(seq__21592__$1);
var G__21676 = null;
var G__21677 = (0);
var G__21678 = (0);
seq__21592 = G__21675;
chunk__21593 = G__21676;
count__21594 = G__21677;
i__21595 = G__21678;
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
var temp__5825__auto___21679 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___21679)){
var saved_21680 = temp__5825__auto___21679;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_21680));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__21616 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21617 = null;
var count__21618 = (0);
var i__21619 = (0);
while(true){
if((i__21619 < count__21618)){
var el = chunk__21617.cljs$core$IIndexed$_nth$arity$2(null, i__21619);
hljs.highlightElement(el);


var G__21681 = seq__21616;
var G__21682 = chunk__21617;
var G__21683 = count__21618;
var G__21684 = (i__21619 + (1));
seq__21616 = G__21681;
chunk__21617 = G__21682;
count__21618 = G__21683;
i__21619 = G__21684;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21616);
if(temp__5825__auto__){
var seq__21616__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21616__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21616__$1);
var G__21685 = cljs.core.chunk_rest(seq__21616__$1);
var G__21686 = c__5525__auto__;
var G__21687 = cljs.core.count(c__5525__auto__);
var G__21688 = (0);
seq__21616 = G__21685;
chunk__21617 = G__21686;
count__21618 = G__21687;
i__21619 = G__21688;
continue;
} else {
var el = cljs.core.first(seq__21616__$1);
hljs.highlightElement(el);


var G__21689 = cljs.core.next(seq__21616__$1);
var G__21690 = null;
var G__21691 = (0);
var G__21692 = (0);
seq__21616 = G__21689;
chunk__21617 = G__21690;
count__21618 = G__21691;
i__21619 = G__21692;
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
