(ns blog.client.core
  (:require [goog.dom :as dom]
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

(defn- show-tooltip! [abbr tooltip]
  (.setAttribute abbr "aria-describedby" (.-id tooltip))
  (.add (.-classList tooltip) "visible"))

(defn- hide-tooltip! [abbr tooltip]
  (.removeAttribute abbr "aria-describedby")
  (.remove (.-classList tooltip) "visible"))

(defn init-glossary! []
  (doseq [abbr (array-seq (dom/getElementsByClass "glossary-term"))]
    (let [tooltip-id (str "tooltip-" (.-slug (.-dataset abbr)))
          tooltip    (or (dom/getElement tooltip-id)
                         (doto (dom/createElement "div")
                           (.setAttribute "id" tooltip-id)
                           (.setAttribute "role" "tooltip")
                           (aset "className" "glossary-tooltip")
                           (aset "textContent" (.-definition (.-dataset abbr)))
                           (#(.appendChild (.-parentNode abbr) %))))]
      (events/listen abbr et/CLICK
        (fn [e]
          ;; Let <a> link clicks navigate — only intercept clicks on abbr itself
          (when-not (= "A" (.. e -target -tagName))
            (.preventDefault e)
            (if (.contains (.-classList tooltip) "visible")
              (hide-tooltip! abbr tooltip)
              (show-tooltip! abbr tooltip)))))
      (events/listen abbr "keydown"
        (fn [e]
          (when (#{" " "Enter"} (.-key e))
            (.preventDefault e)
            (if (.contains (.-classList tooltip) "visible")
              (hide-tooltip! abbr tooltip)
              (show-tooltip! abbr tooltip)))))
      (events/listen js/document et/KEYDOWN
        (fn [e]
          (when (= "Escape" (.-key e))
            (hide-tooltip! abbr tooltip)))))))

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

(defn ^:export init []
  (init-nav!)
  (init-glossary!)
  (init-mermaid!)
  (init-scroll-restore!))
