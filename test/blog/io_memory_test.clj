(ns blog.io-memory-test
  (:require [clojure.test :refer [deftest is]]
            [blog.ports.io :as ports]
            [blog.io.memory :refer [map->MemorySource]]))

(deftest memory-source-returns-fixture-data
  (let [source (map->MemorySource {:posts    [{:raw-body "hello"}]
                                   :glossary []
                                   :pages    []
                                   :diagrams []})]
    (is (= [{:raw-body "hello"}] (ports/read-posts! source)))
    (is (= []                    (ports/read-glossary! source)))
    (is (= []                    (ports/read-pages! source)))
    (is (= []                    (ports/read-diagrams! source)))))
