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
blog.client.core.click_on_tooltip_contents_QMARK_ = (function blog$client$core$click_on_tooltip_contents_QMARK_(tooltip,t){
var and__5000__auto__ = tooltip;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = (t instanceof Node);
if(and__5000__auto____$1){
return tooltip.contains(t);
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
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
var seq__21519_21591 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("abbr.glossary-term")));
var chunk__21520_21592 = null;
var count__21521_21593 = (0);
var i__21522_21594 = (0);
while(true){
if((i__21522_21594 < count__21521_21593)){
var abbr_21595 = chunk__21520_21592.cljs$core$IIndexed$_nth$arity$2(null, i__21522_21594);
var temp__5825__auto___21596 = abbr_21595.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21596)){
var link_21597 = temp__5825__auto___21596;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",link_21597.getAttribute("href"))){
var slug_21600 = blog.client.core.slug_from_href(link_21597.getAttribute("href"));
var tooltip_id_21601 = ["tooltip-",slug_21600].join('');
var data_def_21602 = abbr_21595.getAttribute("data-definition");
var tooltip_21603 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21601);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21601);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

abbr_21595.appendChild(div);

if(cljs.core.seq(data_def_21602)){
blog.client.core.fill_tooltip_static_BANG_(div,slug_21600,data_def_21602);
} else {
fetch(["/glossary/",slug_21600,"/"].join('')).then(((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21600,tooltip_id_21601,data_def_21602,link_21597,temp__5825__auto___21596,abbr_21595){
return (function (p1__21517_SHARP_){
return p1__21517_SHARP_.text();
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21600,tooltip_id_21601,data_def_21602,link_21597,temp__5825__auto___21596,abbr_21595))
).then(((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21600,tooltip_id_21601,data_def_21602,link_21597,temp__5825__auto___21596,abbr_21595){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21600,(cljs.core.truth_(def_el)?def_el.textContent:slug_21600));
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21600,tooltip_id_21601,data_def_21602,link_21597,temp__5825__auto___21596,abbr_21595))
);
}

return div;
}
})();
goog.events.listen(abbr_21595,goog.events.EventType.CLICK,((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21600,tooltip_id_21601,data_def_21602,tooltip_21603,link_21597,temp__5825__auto___21596,abbr_21595){
return (function (e){
var t = e.target;
if(cljs.core.truth_(blog.client.core.click_on_tooltip_contents_QMARK_(tooltip_21603,t))){
return null;
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = (t instanceof Node);
if(and__5000__auto__){
var and__5000__auto____$1 = abbr_21595.contains(t);
if(cljs.core.truth_(and__5000__auto____$1)){
return blog.client.core.plain_left_click_QMARK_(e);
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,abbr_21595);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,link_21597);
if(or__5002__auto____$1){
return or__5002__auto____$1;
} else {
return link_21597.contains(t);
}
}
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21603.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21595,tooltip_21603);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21595,tooltip_21603);
}
} else {
return null;
}
} else {
return null;
}
}
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21600,tooltip_id_21601,data_def_21602,tooltip_21603,link_21597,temp__5825__auto___21596,abbr_21595))
);

goog.events.listen(link_21597,"keydown",((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21600,tooltip_id_21601,data_def_21602,tooltip_21603,link_21597,temp__5825__auto___21596,abbr_21595){
return (function (e){
if(cljs.core.truth_((function (){var G__21559 = e.key;
var fexpr__21558 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21558.cljs$core$IFn$_invoke$arity$1 ? fexpr__21558.cljs$core$IFn$_invoke$arity$1(G__21559) : fexpr__21558.call(null, G__21559));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21603.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21595,tooltip_21603);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21595,tooltip_21603);
}
} else {
return null;
}
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21600,tooltip_id_21601,data_def_21602,tooltip_21603,link_21597,temp__5825__auto___21596,abbr_21595))
);
} else {
}
} else {
}


var G__21627 = seq__21519_21591;
var G__21628 = chunk__21520_21592;
var G__21629 = count__21521_21593;
var G__21630 = (i__21522_21594 + (1));
seq__21519_21591 = G__21627;
chunk__21520_21592 = G__21628;
count__21521_21593 = G__21629;
i__21522_21594 = G__21630;
continue;
} else {
var temp__5825__auto___21633 = cljs.core.seq(seq__21519_21591);
if(temp__5825__auto___21633){
var seq__21519_21635__$1 = temp__5825__auto___21633;
if(cljs.core.chunked_seq_QMARK_(seq__21519_21635__$1)){
var c__5525__auto___21640 = cljs.core.chunk_first(seq__21519_21635__$1);
var G__21641 = cljs.core.chunk_rest(seq__21519_21635__$1);
var G__21642 = c__5525__auto___21640;
var G__21643 = cljs.core.count(c__5525__auto___21640);
var G__21644 = (0);
seq__21519_21591 = G__21641;
chunk__21520_21592 = G__21642;
count__21521_21593 = G__21643;
i__21522_21594 = G__21644;
continue;
} else {
var abbr_21646 = cljs.core.first(seq__21519_21635__$1);
var temp__5825__auto___21647__$1 = abbr_21646.querySelector("a[href^=\"/glossary/\"]");
if(cljs.core.truth_(temp__5825__auto___21647__$1)){
var link_21652 = temp__5825__auto___21647__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("/glossary/",link_21652.getAttribute("href"))){
var slug_21653 = blog.client.core.slug_from_href(link_21652.getAttribute("href"));
var tooltip_id_21654 = ["tooltip-",slug_21653].join('');
var data_def_21655 = abbr_21646.getAttribute("data-definition");
var tooltip_21656 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_21654);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var div = goog.dom.createElement("div");
div.setAttribute("id",tooltip_id_21654);

div.setAttribute("role","tooltip");

(div["className"] = "glossary-tooltip");

abbr_21646.appendChild(div);

if(cljs.core.seq(data_def_21655)){
blog.client.core.fill_tooltip_static_BANG_(div,slug_21653,data_def_21655);
} else {
fetch(["/glossary/",slug_21653,"/"].join('')).then(((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21653,tooltip_id_21654,data_def_21655,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633){
return (function (p1__21517_SHARP_){
return p1__21517_SHARP_.text();
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21653,tooltip_id_21654,data_def_21655,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633))
).then(((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21653,tooltip_id_21654,data_def_21655,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633){
return (function (html){
var doc = (new DOMParser()).parseFromString(html,"text/html");
var def_el = doc.querySelector(".glossary-body p, .glossary-body");
return blog.client.core.fill_tooltip_static_BANG_(div,slug_21653,(cljs.core.truth_(def_el)?def_el.textContent:slug_21653));
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,div,or__5002__auto__,slug_21653,tooltip_id_21654,data_def_21655,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633))
);
}

return div;
}
})();
goog.events.listen(abbr_21646,goog.events.EventType.CLICK,((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21653,tooltip_id_21654,data_def_21655,tooltip_21656,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633){
return (function (e){
var t = e.target;
if(cljs.core.truth_(blog.client.core.click_on_tooltip_contents_QMARK_(tooltip_21656,t))){
return null;
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = (t instanceof Node);
if(and__5000__auto__){
var and__5000__auto____$1 = abbr_21646.contains(t);
if(cljs.core.truth_(and__5000__auto____$1)){
return blog.client.core.plain_left_click_QMARK_(e);
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
if(cljs.core.truth_((function (){var or__5002__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,abbr_21646);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,link_21652);
if(or__5002__auto____$1){
return or__5002__auto____$1;
} else {
return link_21652.contains(t);
}
}
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21656.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21646,tooltip_21656);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21646,tooltip_21656);
}
} else {
return null;
}
} else {
return null;
}
}
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21653,tooltip_id_21654,data_def_21655,tooltip_21656,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633))
);

goog.events.listen(link_21652,"keydown",((function (seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21653,tooltip_id_21654,data_def_21655,tooltip_21656,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633){
return (function (e){
if(cljs.core.truth_((function (){var G__21566 = e.key;
var fexpr__21565 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__21565.cljs$core$IFn$_invoke$arity$1 ? fexpr__21565.cljs$core$IFn$_invoke$arity$1(G__21566) : fexpr__21565.call(null, G__21566));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_21656.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr_21646,tooltip_21656);
} else {
return blog.client.core.show_tooltip_BANG_(abbr_21646,tooltip_21656);
}
} else {
return null;
}
});})(seq__21519_21591,chunk__21520_21592,count__21521_21593,i__21522_21594,slug_21653,tooltip_id_21654,data_def_21655,tooltip_21656,link_21652,temp__5825__auto___21647__$1,abbr_21646,seq__21519_21635__$1,temp__5825__auto___21633))
);
} else {
}
} else {
}


var G__21659 = cljs.core.next(seq__21519_21635__$1);
var G__21660 = null;
var G__21661 = (0);
var G__21662 = (0);
seq__21519_21591 = G__21659;
chunk__21520_21592 = G__21660;
count__21521_21593 = G__21661;
i__21522_21594 = G__21662;
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

var seq__21570 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__21571 = null;
var count__21572 = (0);
var i__21573 = (0);
while(true){
if((i__21573 < count__21572)){
var el = chunk__21571.cljs$core$IIndexed$_nth$arity$2(null, i__21573);
var code_21663 = el.textContent;
var container_21664 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21663,((function (seq__21570,chunk__21571,count__21572,i__21573,code_21663,container_21664,el){
return (function (svg){
return (container_21664["innerHTML"] = svg);
});})(seq__21570,chunk__21571,count__21572,i__21573,code_21663,container_21664,el))
);


var G__21665 = seq__21570;
var G__21666 = chunk__21571;
var G__21667 = count__21572;
var G__21668 = (i__21573 + (1));
seq__21570 = G__21665;
chunk__21571 = G__21666;
count__21572 = G__21667;
i__21573 = G__21668;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21570);
if(temp__5825__auto__){
var seq__21570__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21570__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21570__$1);
var G__21669 = cljs.core.chunk_rest(seq__21570__$1);
var G__21670 = c__5525__auto__;
var G__21671 = cljs.core.count(c__5525__auto__);
var G__21672 = (0);
seq__21570 = G__21669;
chunk__21571 = G__21670;
count__21572 = G__21671;
i__21573 = G__21672;
continue;
} else {
var el = cljs.core.first(seq__21570__$1);
var code_21673 = el.textContent;
var container_21674 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_21673,((function (seq__21570,chunk__21571,count__21572,i__21573,code_21673,container_21674,el,seq__21570__$1,temp__5825__auto__){
return (function (svg){
return (container_21674["innerHTML"] = svg);
});})(seq__21570,chunk__21571,count__21572,i__21573,code_21673,container_21674,el,seq__21570__$1,temp__5825__auto__))
);


var G__21675 = cljs.core.next(seq__21570__$1);
var G__21676 = null;
var G__21677 = (0);
var G__21678 = (0);
seq__21570 = G__21675;
chunk__21571 = G__21676;
count__21572 = G__21677;
i__21573 = G__21678;
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
var seq__21575 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__21576 = null;
var count__21577 = (0);
var i__21578 = (0);
while(true){
if((i__21578 < count__21577)){
var el = chunk__21576.cljs$core$IIndexed$_nth$arity$2(null, i__21578);
hljs.highlightElement(el);


var G__21681 = seq__21575;
var G__21682 = chunk__21576;
var G__21683 = count__21577;
var G__21684 = (i__21578 + (1));
seq__21575 = G__21681;
chunk__21576 = G__21682;
count__21577 = G__21683;
i__21578 = G__21684;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__21575);
if(temp__5825__auto__){
var seq__21575__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21575__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21575__$1);
var G__21685 = cljs.core.chunk_rest(seq__21575__$1);
var G__21686 = c__5525__auto__;
var G__21687 = cljs.core.count(c__5525__auto__);
var G__21688 = (0);
seq__21575 = G__21685;
chunk__21576 = G__21686;
count__21577 = G__21687;
i__21578 = G__21688;
continue;
} else {
var el = cljs.core.first(seq__21575__$1);
hljs.highlightElement(el);


var G__21689 = cljs.core.next(seq__21575__$1);
var G__21690 = null;
var G__21691 = (0);
var G__21692 = (0);
seq__21575 = G__21689;
chunk__21576 = G__21690;
count__21577 = G__21691;
i__21578 = G__21692;
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
