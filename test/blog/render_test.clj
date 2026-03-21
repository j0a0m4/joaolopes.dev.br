(ns blog.render-test
  (:require [clojure.test :refer [deftest is testing]]
            [hickory.core :as hickory]
            [hickory.select :as sel]
            [blog.layout :as layout]
            [blog.render :as render]))

(def config {:site-url "http://localhost" :site-title "Test" :site-desc "Test blog" :base-path ""})

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

(deftest base-layout-contains-no-inline-scripts
  (let [html (layout/base-layout [:div ""] config)
        doc  (-> html hickory/parse hickory/as-hickory)
        scripts (sel/select (sel/tag :script) doc)]
    (is (= 1 (count scripts))          "exactly one script tag")
    (is (= "/js/main.js" (get-in (first scripts) [:attrs :src])) "main.js bundle")))
