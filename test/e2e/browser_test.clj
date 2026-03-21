(ns e2e.browser-test
  (:require [clojure.test :refer [deftest is]]
            [etaoin.api :as e]
            [etaoin.keys :as k]
            [aux.e2e-helpers :refer [with-static-server]]))

(defn- base-url [port path]
  (str "http://127.0.0.1:" port path))

(def ^:private ci-opts
  {:args ["--headless=new" "--no-sandbox" "--disable-dev-shm-usage"]})

(deftest glossary-tooltip-accessible
  (with-static-server ["public/" 3001]
    (e/with-driver :chrome ci-opts driver
      (e/go driver (base-url 3001 "/posts/building-your-ai-toolkit/"))
      (e/wait-exists driver {:css "abbr.glossary-term"} {:timeout 10})
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
      (e/wait-exists driver {:id "nav-toggle"} {:timeout 10})
      (let [btn (e/query driver {:id "nav-toggle"})]
        (is (= "false" (e/get-element-attr driver btn "aria-expanded")))
        (e/click driver btn)
        (is (= "true" (e/get-element-attr driver btn "aria-expanded")))))))
