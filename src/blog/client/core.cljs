(ns blog.client.core
  (:require [clojure.string :as str]
            [goog.dom :as dom]
            [goog.events :as events]
            [goog.events.EventType :as et]))

(defn init-nav! []
  (when-let [btn (dom/getElement "nav-toggle")]
    (when-let [nav (dom/getElement "nav-menu")]
      (events/listen btn et/CLICK
                     (fn [_]
                       (let [expanded? (= "true" (.getAttribute btn "aria-expanded"))]
                         (.setAttribute btn "aria-expanded" (str (not expanded?)))
                         (if expanded?
                           (.remove (.-classList nav) "open")
                           (.add    (.-classList nav) "open"))))))))

(defn- show-tooltip! [link tooltip]
  (.setAttribute link "aria-describedby" (.-id tooltip))
  (.add (.-classList tooltip) "visible"))

(defn- hide-tooltip! [link tooltip]
  (.removeAttribute link "aria-describedby")
  (.remove (.-classList tooltip) "visible"))

(defn- slug-from-href [href]
  (-> href (str/replace #"^/glossary/" "") (str/replace #"/$" "")))

(defn init-glossary! []
  (doseq [link (->> (array-seq (.querySelectorAll js/document "a[href^=\"/glossary/\"]"))
                    (filter #(not= "/glossary/" (.getAttribute % "href"))))]
    (let [slug       (slug-from-href (.getAttribute link "href"))
          tooltip-id (str "tooltip-" slug)
          tooltip    (or (dom/getElement tooltip-id)
                         (let [div (dom/createElement "div")]
                           (.setAttribute div "id" tooltip-id)
                           (.setAttribute div "role" "tooltip")
                           (aset div "className" "glossary-tooltip")
                           (aset div "textContent" "Loading...")
                           (.appendChild (.-parentNode link) div)
                           ;; Fetch definition from the glossary page
                           (-> (js/fetch (str "/glossary/" slug "/"))
                               (.then #(.text %))
                               (.then (fn [html]
                                        (let [doc (.parseFromString (js/DOMParser.) html "text/html")
                                              def-el (.querySelector doc ".glossary-body p, .glossary-body")]
                                          (aset div "innerHTML"
                                                (str (if def-el (.-textContent def-el) slug)
                                                     " <a href=\"/glossary/" slug
                                                     "/\" class=\"glossary-link\">Full entry →</a>"))))))
                           div))]
      (.add (.-classList link) "glossary-term")
      (events/listen link et/CLICK
                     (fn [e]
                       (.preventDefault e)
                       (if (.contains (.-classList tooltip) "visible")
                         (hide-tooltip! link tooltip)
                         (show-tooltip! link tooltip))))
      (events/listen link "keydown"
                     (fn [e]
                       (when (#{" " "Enter"} (.-key e))
                         (.preventDefault e)
                         (if (.contains (.-classList tooltip) "visible")
                           (hide-tooltip! link tooltip)
                           (show-tooltip! link tooltip)))))
      (events/listen js/document et/KEYDOWN
                     (fn [e]
                       (when (= "Escape" (.-key e))
                         (hide-tooltip! link tooltip)))))))

(defn init-mermaid! []
  (when (exists? js/mermaid)
    (.initialize js/mermaid #js {:startOnLoad false :theme "dark"})
    (doseq [el (array-seq (dom/getElementsByClass "language-mermaid"))]
      (let [code      (.-textContent el)
            container (.-parentNode el)]
        (.render js/mermaid (str "mermaid-" (rand-int 99999)) code
                 (fn [svg] (aset container "innerHTML" svg)))))))

(defn init-scroll-restore! []
  (when-let [saved (.. js/sessionStorage (getItem "scrollY"))]
    (js/setTimeout #(js/window.scrollTo 0 (js/parseInt saved)) 50))
  (events/listen js/window et/BEFOREUNLOAD
                 #(.. js/sessionStorage (setItem "scrollY" (str (.-scrollY js/window))))))

(defn init-highlight! []
  (when (exists? js/hljs)
    (doseq [el (array-seq (.querySelectorAll js/document "pre code"))]
      (.highlightElement js/hljs el))))

(defn ^:export init []
  (init-nav!)
  (init-glossary!)
  (init-mermaid!)
  (init-highlight!)
  (init-scroll-restore!))
