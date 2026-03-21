(ns blog.integration.pages-test
  (:require [clojure.test :refer [deftest is]]
            [hickory.core :as hickory]
            [hickory.select :as sel]
            [blog.pages :as pages]
            [blog.system :as system]
            [blog.io.memory :refer [map->MemorySource]]
            [aux.fixtures :as fixtures]))

(deftest get-pages-produces-expected-routes
  (let [sys   (-> (system/load-config!)
                  (assoc :io (map->MemorySource fixtures/memory-source-opts)))
        pages (pages/get-pages! sys)]
    (is (contains? pages "/posts/hello-world/"))
    (is (contains? pages "/"))
    (is (contains? pages "/glossary/"))
    (is (contains? pages "/feed.xml"))
    (is (contains? pages "/sitemap.xml"))))

(deftest post-page-renders-correctly
  (let [sys     (-> (system/load-config!)
                    (assoc :io (map->MemorySource fixtures/memory-source-opts)))
        pages   (pages/get-pages! sys)
        handler (get pages "/posts/hello-world/")
        doc     (-> (handler {:uri "/posts/hello-world/"}) hickory/parse hickory/as-hickory)]
    (is (= 1 (count (sel/select (sel/tag :article) doc))))))
