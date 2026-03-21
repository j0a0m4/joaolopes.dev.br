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
var map__21494 = temp__5825__auto__;
var map__21494__$1 = cljs.core.__destructure_map(map__21494);
var abbr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21494__$1,new cljs.core.Keyword(null,"abbr","abbr",2088591884));
var tooltip = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21494__$1,new cljs.core.Keyword(null,"tooltip","tooltip",-1809677058));
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
var seq__21513_21625 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("abbr.glossary-term")));
var chunk__21514_21626 = null;
var count__21515_21627 = (0);
var i__21516_21628 = (0);
while(true){
if((i__21516_21628 < count__21515_21627)){
var abbr_21629 = chunk__21514_21626.cljs$core$IIndexed$_nth$arity$2(null, i__21516_21628);
var temp__5825__auto___21630 = abbr_21629.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21630)){
var link_21631 = temp__5825__auto___21630;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",link_21631.getAttribute("href"))){
var slug_21632 = blog.client.core.slug_from_href(link_21631.getAttribute("href"));
var tooltip_id_21633 = ["tooltip-",slug_21632].join('');
var data_def_21634 = abbr_21629.getAttribute("data-definition");
var tooltip_21635 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21633);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21633);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

abbr_21629.appendChild(div);

if(cljs.core.seq(data_def_21634)){
blog.client.core.fill_tooltip_static_BANG_(div,slug_21632,data_def_21634);
} else {
fetch(["/glossary/",slug_21632,"/"].join('')).then(((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21632,tooltip_id_21633,data_def_21634,link_21631,temp__5825__auto___21630,abbr_21629){
return (function (p1__21512_SHARP_){
return p1__21512_SHARP_.text();
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21632,tooltip_id_21633,data_def_21634,link_21631,temp__5825__auto___21630,abbr_21629))
).then(((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21632,tooltip_id_21633,data_def_21634,link_21631,temp__5825__auto___21630,abbr_21629){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21632,(cljs.core.truth_(def_el)?def_el.textContent:slug_21632));
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21632,tooltip_id_21633,data_def_21634,link_21631,temp__5825__auto___21630,abbr_21629))
);
}

return div;
}
})();
goog.events.listen(link_21631,goog.events.EventType.CLICK,((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21632,tooltip_id_21633,data_def_21634,tooltip_21635,link_21631,temp__5825__auto___21630,abbr_21629){
return (function (e){
if(blog.client.core.plain_left_click_QMARK_(e)){
e.preventDefault();

if(cljs.core.truth_(tooltip_21635.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21629,tooltip_21635);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21629,tooltip_21635);
}
} else {
return null;
}
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21632,tooltip_id_21633,data_def_21634,tooltip_21635,link_21631,temp__5825__auto___21630,abbr_21629))
);

goog.events.listen(link_21631,"keydown",((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21632,tooltip_id_21633,data_def_21634,tooltip_21635,link_21631,temp__5825__auto___21630,abbr_21629){
return (function (e){
if(cljs.core.truth_((function (){var G__21554 = e.key;
var fexpr__21553 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21553.cljs$core$IFn$_invoke$arity$1 ? fexpr__21553.cljs$core$IFn$_invoke$arity$1(G__21554) : fexpr__21553.call(null, G__21554));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21635.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21629,tooltip_21635);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21629,tooltip_21635);
}
} else {
return null;
}
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21632,tooltip_id_21633,data_def_21634,tooltip_21635,link_21631,temp__5825__auto___21630,abbr_21629))
);
} else {
}
} else {
}


var G__21641 = seq__21513_21625;
var G__21642 = chunk__21514_21626;
var G__21643 = count__21515_21627;
var G__21644 = (i__21516_21628 + (1));
seq__21513_21625 = G__21641;
chunk__21514_21626 = G__21642;
count__21515_21627 = G__21643;
i__21516_21628 = G__21644;
continue;
} else {
var temp__5825__auto___21645 = cljs.core.seq(seq__21513_21625);
if(temp__5825__auto___21645){
var seq__21513_21646__$1 = temp__5825__auto___21645;
if(cljs.core.chunked_seq_QMARK_(seq__21513_21646__$1)){
var c__5525__auto___21647 = cljs.core.chunk_first(seq__21513_21646__$1);
var G__21648 = cljs.core.chunk_rest(seq__21513_21646__$1);
var G__21649 = c__5525__auto___21647;
var G__21650 = cljs.core.count(c__5525__auto___21647);
var G__21651 = (0);
seq__21513_21625 = G__21648;
chunk__21514_21626 = G__21649;
count__21515_21627 = G__21650;
i__21516_21628 = G__21651;
continue;
} else {
var abbr_21652 = cljs.core.first(seq__21513_21646__$1);
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
fetch(["/glossary/",slug_21655,"/"].join('')).then(((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645){
return (function (p1__21512_SHARP_){
return p1__21512_SHARP_.text();
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645))
).then(((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21655,(cljs.core.truth_(def_el)?def_el.textContent:slug_21655));
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,div,or__5002__auto__,slug_21655,tooltip_id_21656,data_def_21657,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645))
);
}

return div;
}
})();
goog.events.listen(link_21654,goog.events.EventType.CLICK,((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645){
return (function (e){
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
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645))
);

goog.events.listen(link_21654,"keydown",((function (seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645){
return (function (e){
if(cljs.core.truth_((function (){var G__21562 = e.key;
var fexpr__21561 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21561.cljs$core$IFn$_invoke$arity$1 ? fexpr__21561.cljs$core$IFn$_invoke$arity$1(G__21562) : fexpr__21561.call(null, G__21562));
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
});})(seq__21513_21625,chunk__21514_21626,count__21515_21627,i__21516_21628,slug_21655,tooltip_id_21656,data_def_21657,tooltip_21658,link_21654,temp__5825__auto___21653__$1,abbr_21652,seq__21513_21646__$1,temp__5825__auto___21645))
);
} else {
}
} else {
}


var G__21659 = cljs.core.next(seq__21513_21646__$1);
var G__21660 = null;
var G__21661 = (0);
var G__21662 = (0);
seq__21513_21625 = G__21659;
chunk__21514_21626 = G__21660;
count__21515_21627 = G__21661;
i__21516_21628 = G__21662;
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

var seq__21566 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21567 = null;
var count__21568 = (0);
var i__21569 = (0);
while(true){
if((i__21569 < count__21568)){
var el = chunk__21567.cljs$core$IIndexed$_nth$arity$2(null, i__21569);
var code_21663 = el.textContent;
var container_21664 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21663,((function (seq__21566,chunk__21567,count__21568,i__21569,code_21663,container_21664,el){
return (function (svg){
return (container_21664["innerHTML"] = svg);
});})(seq__21566,chunk__21567,count__21568,i__21569,code_21663,container_21664,el))
);


var G__21665 = seq__21566;
var G__21666 = chunk__21567;
var G__21667 = count__21568;
var G__21668 = (i__21569 + (1));
seq__21566 = G__21665;
chunk__21567 = G__21666;
count__21568 = G__21667;
i__21569 = G__21668;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21566);
if(temp__5825__auto__){
var seq__21566__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21566__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21566__$1);
var G__21669 = cljs.core.chunk_rest(seq__21566__$1);
var G__21670 = c__5525__auto__;
var G__21671 = cljs.core.count(c__5525__auto__);
var G__21672 = (0);
seq__21566 = G__21669;
chunk__21567 = G__21670;
count__21568 = G__21671;
i__21569 = G__21672;
continue;
} else {
var el = cljs.core.first(seq__21566__$1);
var code_21673 = el.textContent;
var container_21674 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21673,((function (seq__21566,chunk__21567,count__21568,i__21569,code_21673,container_21674,el,seq__21566__$1,temp__5825__auto__){
return (function (svg){
return (container_21674["innerHTML"] = svg);
});})(seq__21566,chunk__21567,count__21568,i__21569,code_21673,container_21674,el,seq__21566__$1,temp__5825__auto__))
);


var G__21675 = cljs.core.next(seq__21566__$1);
var G__21676 = null;
var G__21677 = (0);
var G__21678 = (0);
seq__21566 = G__21675;
chunk__21567 = G__21676;
count__21568 = G__21677;
i__21569 = G__21678;
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
var seq__21581 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21582 = null;
var count__21583 = (0);
var i__21584 = (0);
while(true){
if((i__21584 < count__21583)){
var el = chunk__21582.cljs$core$IIndexed$_nth$arity$2(null, i__21584);
hljs.highlightElement(el);


var G__21681 = seq__21581;
var G__21682 = chunk__21582;
var G__21683 = count__21583;
var G__21684 = (i__21584 + (1));
seq__21581 = G__21681;
chunk__21582 = G__21682;
count__21583 = G__21683;
i__21584 = G__21684;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21581);
if(temp__5825__auto__){
var seq__21581__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21581__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21581__$1);
var G__21685 = cljs.core.chunk_rest(seq__21581__$1);
var G__21686 = c__5525__auto__;
var G__21687 = cljs.core.count(c__5525__auto__);
var G__21688 = (0);
seq__21581 = G__21685;
chunk__21582 = G__21686;
count__21583 = G__21687;
i__21584 = G__21688;
continue;
} else {
var el = cljs.core.first(seq__21581__$1);
hljs.highlightElement(el);


var G__21689 = cljs.core.next(seq__21581__$1);
var G__21690 = null;
var G__21691 = (0);
var G__21692 = (0);
seq__21581 = G__21689;
chunk__21582 = G__21690;
count__21583 = G__21691;
i__21584 = G__21692;
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
