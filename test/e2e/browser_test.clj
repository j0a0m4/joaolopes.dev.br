(ns e2e.browser-test
  (:require [clojure.test :refer [deftest is]]
            [etaoin.api :as e]
            [aux.e2e-helpers :refer [with-static-server]]))

(defn- base-url [port path]
  (str "http://localhost:" port path))

(def ^:private ci-args
  ["--headless" "--no-sandbox" "--disable-dev-shm-usage"])

(deftest glossary-tooltip-accessible
  (with-static-server ["public/" 3001]
    (e/with-chrome-headless [driver {:args ci-args}]
      (e/go driver (base-url 3001 "/posts/building-your-ai-toolkit-cli-mcp-skills-and-what-goes-where/"))
      (let [term (e/query driver {:css "abbr.glossary-term"})]
        (is (not (e/visible? driver {:css ".glossary-tooltip.visible"})))
        (e/click driver term)
        (is (e/visible? driver {:css ".glossary-tooltip.visible"}))
        (is (seq (e/get-element-attr driver term "aria-describedby")))
        (e/key-press driver e/escape)
        (is (not (e/visible? driver {:css ".glossary-tooltip.visible"})))))))

(deftest nav-toggle-accessible
  (with-static-server ["public/" 3001]
    (e/with-chrome-headless [driver {:args (conj ci-args "--window-size=390,844")}]
      (e/go driver (base-url 3001 "/"))
      (let [btn (e/query driver {:id "nav-toggle"})]
        (is (= "false" (e/get-element-attr driver btn "aria-expanded")))
        (e/click driver btn)
        (is (= "true" (e/get-element-attr driver btn "aria-expanded")))))))
