(ns blog.unit.render-test
  (:require [clojure.test :refer [deftest is]]
            [hickory.core :as hickory]
            [hickory.select :as sel]
            [blog.layout :as layout]
            [blog.render :as render]))

(def config {:site-url "http://localhost" :site-title "Test" :site-desc "Test blog" :base-path ""})

(deftest svg-aria-attributes-test
  (let [_diagram {:slug "agent-loop" :path "/assets/agent-loop.svg"
                  :alt "The agent loop diagram"
                  :content "<svg xmlns=\"http://www.w3.org/2000/svg\"><circle r=\"10\"/></svg>"}
        post    {:identity {:title "Post" :slug "post"}
                 :content  {:body "![The agent loop diagram](/assets/agent-loop.svg)" :description nil}
                 :dates    {:created-on "2025-01-10" :published-on "2025-01-15" :updated-on "2025-01-20"}
                 :taxonomy {:tags [] :series nil}
                 :external {:linkedin-url nil} :navigation {:prev nil :next nil}}
        html    (render/render-post post config)
        doc     (-> html hickory/parse hickory/as-hickory)
        svg     (first (sel/select (sel/descendant (sel/class "diagram-figure") (sel/tag :svg)) doc))]
    (is (= "img" (get-in svg [:attrs :role])))
    (is (seq     (get-in svg [:attrs :aria-labelledby])))))

(def post-fixture
  {:identity   {:title "Hello World" :slug "hello-world"}
   :content    {:body "The body." :description nil}
   :dates      {:created-on "2025-01-10" :published-on "2025-01-15" :updated-on "2025-01-20"}
   :taxonomy   {:tags [] :series nil}
   :external   {:linkedin-url nil}
   :navigation {:prev nil :next nil}})

(deftest render-post-test
  (let [html (render/render-post post-fixture config)
        doc  (-> html hickory/parse hickory/as-hickory)]
    (is (= 1 (count (sel/select (sel/tag :article) doc))))))

(deftest render-index-test
  (let [posts [post-fixture]
        html (render/render-index posts config)
        doc  (-> html hickory/parse hickory/as-hickory)]
    (is (pos? (count (sel/select (sel/class "post-list") doc))))))

(deftest post-pages-test
  (let [post   {:identity {:title "Hello" :slug "hello"}
                :content  {:body "" :description nil}
                :dates    {:created-on "2025-01-10" :published-on "2025-01-15" :updated-on "2025-01-20"}
                :taxonomy {:tags [] :series nil}
                :external {:linkedin-url nil} :navigation {:prev nil :next nil}}
        pages  (render/post-pages [post] [] [] config)
        handler (get pages "/posts/hello/")]
    (is (fn? handler))
    (is (string? (handler {:uri "/posts/hello/"})))))

(deftest glossary-pages-test
  (let [entry  {:title "Skill" :slug "skill" :definition "A reusable behaviour." :related []}
        pages  (render/glossary-pages [entry] config)]
    (is (contains? pages "/glossary/"))
    (is (contains? pages "/glossary/skill/"))))

(deftest base-layout-returns-string
  (let [result (layout/base-layout [:div "content"] config)]
    (is (string? result) "base-layout must return a string")))

(deftest non-base-layouts-return-vectors
  (let [post {:identity {:title "T" :slug "s"}
              :content  {:body "" :description nil}
              :dates    {:created-on "2025-01-10" :published-on "2025-01-15" :updated-on "2025-01-20"}
              :taxonomy {:tags [] :series nil}
              :external {:linkedin-url nil} :navigation {:prev nil :next nil}}]
    (is (vector? (layout/post-layout post config))  "post-layout returns hiccup vector")
    (is (vector? (layout/index-layout [] config))   "index-layout returns hiccup vector")))

(deftest render-glossary-entry-test
  (let [entry {:title "Skill" :slug "skill" :definition "A reusable unit of agent behaviour." :related [] :publish true}
        html  (render/render-glossary-entry entry config)
        doc   (-> html hickory/parse hickory/as-hickory)]
    (is (= 1 (count (sel/select (sel/tag :article) doc))))
    (is (pos? (count (sel/select (sel/class "glossary-entry") doc))))))

(deftest base-layout-contains-no-inline-scripts
  (let [html (layout/base-layout [:div ""] config)
        doc  (-> html hickory/parse hickory/as-hickory)
        scripts (sel/select (sel/tag :script) doc)]
    (is (= 1 (count scripts))          "exactly one script tag")
    (is (= "/js/main.js" (get-in (first scripts) [:attrs :src])) "main.js bundle")))

(deftest render-markdown-headings-test
  (let [html (render/render-markdown "## Hello World\n\nSome text.")]
    (is (re-find #"<h2[^>]*>Hello World</h2>" html) "h2 rendered")
    (is (re-find #"id=\"" html) "heading has anchor id")))

(deftest render-markdown-code-blocks-test
  (let [html (render/render-markdown "```clojure\n(+ 1 2)\n```")]
    (is (re-find #"<pre>" html) "pre block")
    (is (re-find #"<code" html) "code element")
    (is (re-find #"clojure" html) "language class preserved")))

(deftest render-markdown-tables-test
  (let [html (render/render-markdown "| A | B |\n|---|---|\n| 1 | 2 |")]
    (is (re-find #"<table>" html) "table rendered")
    (is (re-find #"<th>" html) "thead present")
    (is (re-find #"<td>" html) "tbody present")))

(deftest render-markdown-inline-test
  (let [html (render/render-markdown "**bold** and *italic* and `code` and [link](http://x)")]
    (is (re-find #"<strong>bold</strong>" html))
    (is (re-find #"<em>italic</em>" html))
    (is (re-find #"<code>code</code>" html))
    (is (re-find #"<a href=\"http://x\">link</a>" html))))

(deftest extract-toc-empty-test
  (is (nil? (render/extract-toc "No headings here.\n\nJust paragraphs."))))

(deftest extract-toc-below-threshold-test
  (is (nil? (render/extract-toc "## One\n\n## Two\n\nOnly 2 h2s, threshold is 3."))))

(deftest extract-toc-meets-threshold-test
  (let [toc (render/extract-toc "## A\n\n## B\n\n## C")]
    (is (= 3 (count toc)))
    (is (every? #(= 2 (:level %)) toc))
    (is (= "A" (:text (first toc))))
    (is (= "a" (:anchor (first toc))))))

(deftest extract-toc-nested-h3-test
  (let [toc (render/extract-toc "## Top\n\n### Sub\n\n## Second\n\n### Sub2\n\n## Third")]
    (is (= 5 (count toc)))
    (is (= 2 (:level (first toc))))
    (is (= 3 (:level (second toc))))
    (is (= "sub" (:anchor (second toc))))))

(deftest extract-toc-special-chars-test
  (let [toc (render/extract-toc "## What's New?\n\n## C++ & Rust\n\n## Hello World")]
    (is (= "whats-new" (:anchor (first toc))))
    (is (= "c--rust" (:anchor (second toc))) "heading-anchor doesn't collapse consecutive hyphens")))
