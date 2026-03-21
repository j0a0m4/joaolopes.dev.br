(ns blog.unit.domain-test
  (:require [clojure.test :refer [deftest is are testing]]
            [clojure.string :as str]
            [hickory.core :as hickory]
            [hickory.select :as sel]
            [blog.domain :as domain]))

(deftest slugify-test
  (are [input expected] (= expected (domain/slugify input))
    "Hello World"                 "hello-world"
    "AI Toolkit — Part 1"         "ai-toolkit-part-1"
    "What the AI Gets Wrong"      "what-the-ai-gets-wrong"
    "Building (Things) With AI"   "building-things-with-ai"))

(deftest parse-post-test
  (testing "parses valid post"
    (let [raw {:path            "posts/Hello World.md"
               :raw-frontmatter "title: Hello World\npublished-on: \"2025-01-15\"\ncreated-on: \"2025-01-10\""
               :raw-body        "The body."
               :git-updated-on  "2025-01-20"}
          post (domain/parse-post raw)]
      (is (= "Hello World"  (get-in post [:identity :title])))
      (is (= "hello-world"  (get-in post [:identity :slug])))
      (is (= "2025-01-15"   (get-in post [:dates :published-on])))
      (is (= "2025-01-20"   (get-in post [:dates :updated-on])))
      (is (nil? (:git-updated-on post)))))
  (testing "returns nil on missing title"
    (is (nil? (domain/parse-post {:path "x.md" :raw-frontmatter "published-on: \"2025-01-15\"" :raw-body "" :git-updated-on "2025-01-15"}))))
  (testing "returns nil on missing published-on"
    (is (nil? (domain/parse-post {:path "x.md" :raw-frontmatter "title: Draft" :raw-body "" :git-updated-on "2025-01-15"})))))

(deftest parse-posts-test
  (testing "filters nil and unpublished"
    (let [raw-valid   {:path "p.md" :raw-frontmatter "title: A\npublished-on: \"2025-01-15\"" :raw-body "" :git-updated-on "2025-01-15"}
          raw-no-pub  {:path "p.md" :raw-frontmatter "title: Draft" :raw-body "" :git-updated-on "2025-01-15"}
          raw-invalid {:path "p.md" :raw-frontmatter "published-on: \"2025-01-15\"" :raw-body "" :git-updated-on "2025-01-15"}
          posts (domain/parse-posts [raw-valid raw-no-pub raw-invalid])]
      (is (= 1 (count posts)))
      (is (= "A" (get-in (first posts) [:identity :title]))))))

(deftest parse-glossary-test
  (let [raw {:path "g.md" :raw-frontmatter "title: Skill\npublish: true"
             :raw-body "A reusable unit.\n\n## Related\n- [[Agent]]" :git-updated-on "2025-01-15"}
        entry (first (domain/parse-glossary [raw]))]
    (is (= "Skill"            (:title entry)))
    (is (= "skill"            (:slug entry)))
    (is (= "A reusable unit." (:definition entry)))))

(deftest parse-diagrams-test
  (let [raw-diag {:filename "agent-loop.svg" :content "<svg/>"}
        post     {:content {:body "See ![The agent loop](/assets/agent-loop.svg) for details."}}
        diagram  (first (domain/parse-diagrams [raw-diag] [post]))]
    (is (= "agent-loop"             (:slug diagram)))
    (is (= "/assets/agent-loop.svg" (:path diagram)))
    (is (= "The agent loop"         (:alt diagram)))
    (is (= "<svg/>"                 (:content diagram)))))

(deftest parse-diagrams-fallback-alt-test
  (let [raw-diag {:filename "agent-loop.svg" :content "<svg/>"}
        diagram  (first (domain/parse-diagrams [raw-diag] []))]
    (is (= "Agent Loop" (:alt diagram)))))

(deftest enrich-series-test
  (let [p1 {:identity {:title "Part 1" :slug "part-1"} :taxonomy {:tags [] :series {:id :my-series :order 1 :title "My Series"}} :navigation {:prev nil :next nil}}
        p2 {:identity {:title "Part 2" :slug "part-2"} :taxonomy {:tags [] :series {:id :my-series :order 2 :title "My Series"}} :navigation {:prev nil :next nil}}
        p3 {:identity {:title "Part 3" :slug "part-3"} :taxonomy {:tags [] :series {:id :my-series :order 3 :title "My Series"}} :navigation {:prev nil :next nil}}
        enriched (domain/enrich-series [p1 p2 p3])]
    (is (nil?       (get-in (first enriched)  [:navigation :prev])))
    (is (= "part-2" (get-in (first enriched)  [:navigation :next :identity :slug])))
    (is (= "part-1" (get-in (second enriched) [:navigation :prev :identity :slug])))
    (is (= "part-3" (get-in (second enriched) [:navigation :next :identity :slug])))
    (is (nil?       (get-in (last enriched)   [:navigation :next])))))

(deftest group-tags-test
  (let [posts [{:identity {:slug "a"} :taxonomy {:tags [:clojure :ai]}}
               {:identity {:slug "b"} :taxonomy {:tags [:clojure]}}]
        groups (domain/group-tags posts)]
    (is (= 2 (count (get groups :clojure))))
    (is (= 1 (count (get groups :ai))))))

(deftest expand-wikilinks-test
  (let [glossary [{:title "Skill" :slug "skill" :definition "A reusable behaviour."}]
        posts    [{:content {:body "Use a [[glossary:Skill]] to reuse behaviour."}}]
        result   (domain/expand-wikilinks posts glossary)
        body     (get-in (first result) [:content :body])
        doc      (-> (str "<div>" body "</div>") hickory/parse hickory/as-hickory)
        abbr     (first (sel/select (sel/tag :abbr) doc))
        link     (first (sel/select (sel/tag :a) doc))]
    (is (some? abbr)                                          "abbr element present")
    (is (= "glossary-term" (get-in abbr [:attrs :class]))     "has glossary-term class")
    (is (str/includes? (get-in abbr [:attrs :title]) "reusable") "title contains definition")
    (is (= "/glossary/skill/" (get-in link [:attrs :href]))   "link points to glossary slug")))

(deftest normalize-date-test
  (testing "java.util.Date → ISO string"
    (let [date (java.util.Date. 1710547200000)]
      (is (= "2024-03-16" (domain/normalize-date date)))))
  (testing "string passthrough"
    (is (= "2025-01-15" (domain/normalize-date "2025-01-15"))))
  (testing "nil returns nil"
    (is (nil? (domain/normalize-date nil)))))

(deftest display-date-test
  (is (= "15 January 2025" (domain/display-date "2025-01-15")))
  (is (nil? (domain/display-date nil))))

(deftest rfc822-date-test
  (let [result (domain/rfc822-date "2025-01-15")]
    (is (re-find #"Wed, 15 Jan 2025" result) "day and date correct")
    (is (re-find #"\+0000$" result) "UTC timezone")))

(deftest group-series-test
  (let [posts [{:taxonomy {:series {:id :s1 :order 1 :title "S"}}}
               {:taxonomy {:series {:id :s1 :order 2 :title "S"}}}
               {:taxonomy {:series nil}}]
        groups (domain/group-series posts)]
    (is (= 1 (count groups)) "one series group")
    (is (= 2 (count (get groups :s1))) "two posts in series")))

(deftest group-series-empty-test
  (is (empty? (domain/group-series [])))
  (is (empty? (domain/group-series [{:taxonomy {:series nil}}]))))

(deftest validate-series-test
  (testing "inconsistent titles produce warning"
    (let [posts [{:taxonomy {:series {:id :s :order 1 :title "A"}}}
                 {:taxonomy {:series {:id :s :order 2 :title "B"}}}]
          warnings (domain/validate-series posts)]
      (is (= 1 (count warnings)))
      (is (re-find #"inconsistent titles" (first warnings)))))
  (testing "missing order produces warning"
    (let [posts [{:taxonomy {:series {:id :s :order nil :title "A"}}}]
          warnings (domain/validate-series posts)]
      (is (some #(re-find #"missing :order" %) warnings)))))
