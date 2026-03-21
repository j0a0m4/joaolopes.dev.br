(ns blog.client.core
  (:require [clojure.string :as str]
            [goog.dom :as dom]
            [goog.events :as events]
            [goog.events.EventType :as et]))

(defonce ^:private glossary-open (atom nil))

(defn- hide-tooltip! [abbr-el tooltip]
  (.removeAttribute abbr-el "aria-describedby")
  (.remove (.-classList tooltip) "visible")
  (reset! glossary-open nil))

(defn- hide-open-glossary-tooltip! []
  (when-let [{:keys [abbr tooltip]} @glossary-open]
    (hide-tooltip! abbr tooltip)))

(defn- show-tooltip! [abbr-el tooltip]
  (hide-open-glossary-tooltip!)
  (.setAttribute abbr-el "aria-describedby" (.-id tooltip))
  (.add (.-classList tooltip) "visible")
  (reset! glossary-open {:abbr abbr-el :tooltip tooltip}))

(defn- slug-from-href [href]
  (-> href (str/replace #"^/glossary/" "") (str/replace #"/$" "")))

(defn- plain-left-click? [e]
  (and (not (.-metaKey e))
       (not (.-ctrlKey e))
       (not (.-shiftKey e))
       (not (.-altKey e))
       (= 0 (.-button e))))

(defn- fill-tooltip-static! [div slug definition-text]
  (while (.hasChildNodes div)
    (.removeChild div (.-firstChild div)))
  (.appendChild div (.createTextNode js/document (or definition-text "")))
  (let [a (dom/createElement "a")]
    (.setAttribute a "href" (str "/glossary/" slug "/"))
    (.setAttribute a "class" "glossary-link")
    (set! (.-textContent a) "Full entry →")
    (.appendChild div a)))

(defn init-glossary! []
  (doseq [abbr (array-seq (.querySelectorAll js/document "abbr.glossary-term"))]
    (when-let [link (.querySelector abbr "a[href^=\"/glossary/\"]")]
      (when (not= "/glossary/" (.getAttribute link "href"))
        (let [slug       (slug-from-href (.getAttribute link "href"))
              tooltip-id (str "tooltip-" slug)
              data-def   (.getAttribute abbr "data-definition")
              tooltip    (or (dom/getElement tooltip-id)
                             (let [div (dom/createElement "div")]
                               (.setAttribute div "id" tooltip-id)
                               (.setAttribute div "role" "tooltip")
                               (aset div "className" "glossary-tooltip")
                               (.appendChild abbr div)
                               (if (seq data-def)
                                 (fill-tooltip-static! div slug data-def)
                                 (-> (js/fetch (str "/glossary/" slug "/"))
                                     (.then #(.text %))
                                     (.then (fn [html]
                                              (let [doc    (.parseFromString (js/DOMParser.) html "text/html")
                                                    def-el (.querySelector doc ".glossary-body p, .glossary-body")]
                                                (fill-tooltip-static! div slug (if def-el (.-textContent def-el) slug)))))))
                               div))]
          (events/listen abbr et/CLICK
                         (fn [e]
                           (let [t (.-target e)]
                             (when (or (= t link)
                                       (and (instance? js/Node t) (.contains link t)))
                               (when (plain-left-click? e)
                                 (.preventDefault e)
                                 (if (.contains (.-classList tooltip) "visible")
                                   (hide-tooltip! abbr tooltip)
                                   (show-tooltip! abbr tooltip)))))))
          (events/listen link "keydown"
                         (fn [e]
                           (when (#{" " "Enter"} (.-key e))
                             (.preventDefault e)
                             (if (.contains (.-classList tooltip) "visible")
                               (hide-tooltip! abbr tooltip)
                               (show-tooltip! abbr tooltip)))))))))
  (events/listen js/document et/KEYDOWN
                 (fn [e]
                   (when (= "Escape" (.-key e))
                     (hide-open-glossary-tooltip!)))))

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
