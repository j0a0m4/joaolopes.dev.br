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
blog.client.core.show_tooltip_BANG_ = (function blog$client$core$show_tooltip_BANG_(abbr,tooltip){
abbr.setAttribute("aria-describedby",tooltip.id);

return tooltip.classList.add("visible");
});
blog.client.core.hide_tooltip_BANG_ = (function blog$client$core$hide_tooltip_BANG_(abbr,tooltip){
abbr.removeAttribute("aria-describedby");

return tooltip.classList.remove("visible");
});
blog.client.core.init_glossary_BANG_ = (function blog$client$core$init_glossary_BANG_(){
var seq__19981 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("glossary-term")));
var chunk__19982 = null;
var count__19983 = (0);
var i__19984 = (0);
while(true){
if((i__19984 < count__19983)){
var abbr = chunk__19982.cljs$core$IIndexed$_nth$arity$2(null, i__19984);
var tooltip_id_20005 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_20006 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_20005);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__19991 = goog.dom.createElement("div");
G__19991.setAttribute("id",tooltip_id_20005);

G__19991.setAttribute("role","tooltip");

(G__19991["className"] = "glossary-tooltip");

(G__19991["textContent"] = abbr.dataset.definition);

((function (seq__19981,chunk__19982,count__19983,i__19984,G__19991,or__5002__auto__,tooltip_id_20005,abbr){
return (function (p1__19980_SHARP_){
return abbr.parentNode.appendChild(p1__19980_SHARP_);
});})(seq__19981,chunk__19982,count__19983,i__19984,G__19991,or__5002__auto__,tooltip_id_20005,abbr))
(G__19991);

return G__19991;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20005,tooltip_20006,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_20006.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_20006);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_20006);
}
}
});})(seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20005,tooltip_20006,abbr))
);

goog.events.listen(abbr,"keydown",((function (seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20005,tooltip_20006,abbr){
return (function (e){
if(cljs.core.truth_((function (){var G__19993 = e.key;
var fexpr__19992 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__19992.cljs$core$IFn$_invoke$arity$1 ? fexpr__19992.cljs$core$IFn$_invoke$arity$1(G__19993) : fexpr__19992.call(null, G__19993));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_20006.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_20006);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_20006);
}
} else {
return null;
}
});})(seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20005,tooltip_20006,abbr))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20005,tooltip_20006,abbr){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_20006);
} else {
return null;
}
});})(seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20005,tooltip_20006,abbr))
);


var G__20007 = seq__19981;
var G__20008 = chunk__19982;
var G__20009 = count__19983;
var G__20010 = (i__19984 + (1));
seq__19981 = G__20007;
chunk__19982 = G__20008;
count__19983 = G__20009;
i__19984 = G__20010;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__19981);
if(temp__5825__auto__){
var seq__19981__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19981__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__19981__$1);
var G__20011 = cljs.core.chunk_rest(seq__19981__$1);
var G__20012 = c__5525__auto__;
var G__20013 = cljs.core.count(c__5525__auto__);
var G__20014 = (0);
seq__19981 = G__20011;
chunk__19982 = G__20012;
count__19983 = G__20013;
i__19984 = G__20014;
continue;
} else {
var abbr = cljs.core.first(seq__19981__$1);
var tooltip_id_20015 = ["tooltip-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(abbr.dataset.slug)].join('');
var tooltip_20016 = (function (){var or__5002__auto__ = goog.dom.getElement(tooltip_id_20015);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__19994 = goog.dom.createElement("div");
G__19994.setAttribute("id",tooltip_id_20015);

G__19994.setAttribute("role","tooltip");

(G__19994["className"] = "glossary-tooltip");

(G__19994["textContent"] = abbr.dataset.definition);

((function (seq__19981,chunk__19982,count__19983,i__19984,G__19994,or__5002__auto__,tooltip_id_20015,abbr,seq__19981__$1,temp__5825__auto__){
return (function (p1__19980_SHARP_){
return abbr.parentNode.appendChild(p1__19980_SHARP_);
});})(seq__19981,chunk__19982,count__19983,i__19984,G__19994,or__5002__auto__,tooltip_id_20015,abbr,seq__19981__$1,temp__5825__auto__))
(G__19994);

return G__19994;
}
})();
goog.events.listen(abbr,goog.events.EventType.CLICK,((function (seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20015,tooltip_20016,abbr,seq__19981__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",e.target.tagName)){
return null;
} else {
e.preventDefault();

if(cljs.core.truth_(tooltip_20016.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_20016);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_20016);
}
}
});})(seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20015,tooltip_20016,abbr,seq__19981__$1,temp__5825__auto__))
);

goog.events.listen(abbr,"keydown",((function (seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20015,tooltip_20016,abbr,seq__19981__$1,temp__5825__auto__){
return (function (e){
if(cljs.core.truth_((function (){var G__19996 = e.key;
var fexpr__19995 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [" ",null,"Enter",null], null), null);
return (fexpr__19995.cljs$core$IFn$_invoke$arity$1 ? fexpr__19995.cljs$core$IFn$_invoke$arity$1(G__19996) : fexpr__19995.call(null, G__19996));
})())){
e.preventDefault();

if(cljs.core.truth_(tooltip_20016.classList.contains("visible"))){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_20016);
} else {
return blog.client.core.show_tooltip_BANG_(abbr,tooltip_20016);
}
} else {
return null;
}
});})(seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20015,tooltip_20016,abbr,seq__19981__$1,temp__5825__auto__))
);

goog.events.listen(document,goog.events.EventType.KEYDOWN,((function (seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20015,tooltip_20016,abbr,seq__19981__$1,temp__5825__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("Escape",e.key)){
return blog.client.core.hide_tooltip_BANG_(abbr,tooltip_20016);
} else {
return null;
}
});})(seq__19981,chunk__19982,count__19983,i__19984,tooltip_id_20015,tooltip_20016,abbr,seq__19981__$1,temp__5825__auto__))
);


var G__20017 = cljs.core.next(seq__19981__$1);
var G__20018 = null;
var G__20019 = (0);
var G__20020 = (0);
seq__19981 = G__20017;
chunk__19982 = G__20018;
count__19983 = G__20019;
i__19984 = G__20020;
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

var seq__19997 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("language-mermaid")));
var chunk__19998 = null;
var count__19999 = (0);
var i__20000 = (0);
while(true){
if((i__20000 < count__19999)){
var el = chunk__19998.cljs$core$IIndexed$_nth$arity$2(null, i__20000);
var code_20021 = el.textContent;
var container_20022 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_20021,((function (seq__19997,chunk__19998,count__19999,i__20000,code_20021,container_20022,el){
return (function (svg){
return (container_20022["innerHTML"] = svg);
});})(seq__19997,chunk__19998,count__19999,i__20000,code_20021,container_20022,el))
);


var G__20023 = seq__19997;
var G__20024 = chunk__19998;
var G__20025 = count__19999;
var G__20026 = (i__20000 + (1));
seq__19997 = G__20023;
chunk__19998 = G__20024;
count__19999 = G__20025;
i__20000 = G__20026;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__19997);
if(temp__5825__auto__){
var seq__19997__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19997__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__19997__$1);
var G__20027 = cljs.core.chunk_rest(seq__19997__$1);
var G__20028 = c__5525__auto__;
var G__20029 = cljs.core.count(c__5525__auto__);
var G__20030 = (0);
seq__19997 = G__20027;
chunk__19998 = G__20028;
count__19999 = G__20029;
i__20000 = G__20030;
continue;
} else {
var el = cljs.core.first(seq__19997__$1);
var code_20031 = el.textContent;
var container_20032 = el.parentNode;
mermaid.render(["mermaid-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand_int((99999)))].join(''),code_20031,((function (seq__19997,chunk__19998,count__19999,i__20000,code_20031,container_20032,el,seq__19997__$1,temp__5825__auto__){
return (function (svg){
return (container_20032["innerHTML"] = svg);
});})(seq__19997,chunk__19998,count__19999,i__20000,code_20031,container_20032,el,seq__19997__$1,temp__5825__auto__))
);


var G__20033 = cljs.core.next(seq__19997__$1);
var G__20034 = null;
var G__20035 = (0);
var G__20036 = (0);
seq__19997 = G__20033;
chunk__19998 = G__20034;
count__19999 = G__20035;
i__20000 = G__20036;
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
var temp__5825__auto___20037 = sessionStorage.getItem("scrollY");
if(cljs.core.truth_(temp__5825__auto___20037)){
var saved_20038 = temp__5825__auto___20037;
setTimeout((function (){
return window.scrollTo((0),parseInt(saved_20038));
}),(50));
} else {
}

return goog.events.listen(window,goog.events.EventType.BEFOREUNLOAD,(function (){
return sessionStorage.setItem("scrollY",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.scrollY));
}));
});
blog.client.core.init_highlight_BANG_ = (function blog$client$core$init_highlight_BANG_(){
if((typeof hljs !== 'undefined')){
var seq__20001 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("pre code")));
var chunk__20002 = null;
var count__20003 = (0);
var i__20004 = (0);
while(true){
if((i__20004 < count__20003)){
var el = chunk__20002.cljs$core$IIndexed$_nth$arity$2(null, i__20004);
hljs.highlightElement(el);


var G__20039 = seq__20001;
var G__20040 = chunk__20002;
var G__20041 = count__20003;
var G__20042 = (i__20004 + (1));
seq__20001 = G__20039;
chunk__20002 = G__20040;
count__20003 = G__20041;
i__20004 = G__20042;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__20001);
if(temp__5825__auto__){
var seq__20001__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20001__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__20001__$1);
var G__20043 = cljs.core.chunk_rest(seq__20001__$1);
var G__20044 = c__5525__auto__;
var G__20045 = cljs.core.count(c__5525__auto__);
var G__20046 = (0);
seq__20001 = G__20043;
chunk__20002 = G__20044;
count__20003 = G__20045;
i__20004 = G__20046;
continue;
} else {
var el = cljs.core.first(seq__20001__$1);
hljs.highlightElement(el);


var G__20047 = cljs.core.next(seq__20001__$1);
var G__20048 = null;
var G__20049 = (0);
var G__20050 = (0);
seq__20001 = G__20047;
chunk__20002 = G__20048;
count__20003 = G__20049;
i__20004 = G__20050;
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
