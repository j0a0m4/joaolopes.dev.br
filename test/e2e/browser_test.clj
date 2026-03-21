(ns e2e.browser-test
  (:require [clojure.test :refer [deftest is]]
            [etaoin.api :as e]
            [etaoin.keys :as k]
            [aux.e2e-helpers :refer [with-static-server]]))

(defn- base-url [port path]
  (str "http://localhost:" port path))

(def ^:private ci-opts
  {:args ["--headless=new" "--no-sandbox" "--disable-dev-shm-usage"]})

(deftest glossary-tooltip-accessible
  ;; Diagnostic: verify build artifact is accessible
  (println "CWD:" (System/getProperty "user.dir"))
  (println "public/ exists?" (.exists (java.io.File. "public")))
  (println "index.html exists?" (.exists (java.io.File. "public/posts/building-your-ai-toolkit/index.html")))
  (with-static-server ["public/" 3001]
    ;; Diagnostic: verify Jetty is serving
    (try
      (println "Server response bytes:" (count (slurp "http://localhost:3001/")))
      (catch Exception e (println "SERVER CONNECT FAILED:" (.getMessage e))))
    (e/with-driver :chrome ci-opts driver
      ;; Diagnostic: can Chrome navigate to ANY URL?
      (e/go driver "https://example.com")
      (println "example.com URL:" (e/get-url driver))
      ;; Now try the local server
      (e/go driver (base-url 3001 "/posts/building-your-ai-toolkit/"))
      (println "blog URL:" (e/get-url driver))
      (e/wait-visible driver {:css "abbr.glossary-term"} {:timeout 10})
      (let [term (e/query driver {:css "abbr.glossary-term"})]
        (is (not (e/visible? driver {:css ".glossary-tooltip.visible"})))
        (e/click driver term)
        (is (e/visible? driver {:css ".glossary-tooltip.visible"}))
        (is (seq (e/get-element-attr driver term "aria-describedby")))
        (e/fill-active driver k/escape)
        (is (not (e/visible? driver {:css ".glossary-tooltip.visible"})))))))

(deftest nav-toggle-accessible
  (with-static-server ["public/" 3001]
    (e/with-driver :chrome (assoc ci-opts :size [390 844]) driver
      (e/go driver (base-url 3001 "/"))
      ;; Wait for DOM ready
      (e/wait-visible driver {:id "nav-toggle"} {:timeout 10})
      (let [btn (e/query driver {:id "nav-toggle"})]
        (is (= "false" (e/get-element-attr driver btn "aria-expanded")))
        (e/click driver btn)
        (is (= "true" (e/get-element-attr driver btn "aria-expanded")))))))
