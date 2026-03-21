(ns aux.fixtures)

(def post-fixture
  {:path            "posts/Hello World.md"
   :raw-frontmatter "title: Hello World\npublished-on: \"2025-01-15\"\ncreated-on: \"2025-01-10\"\ntags:\n  - clojure"
   :raw-body        "The body of the post.\n\n![The agent loop](/assets/agent-loop.svg)"
   :git-updated-on  "2025-01-20"})

(def glossary-fixture
  {:path            "glossary/Skill.md"
   :raw-frontmatter "title: Skill\npublish: true"
   :raw-body        "A reusable unit of agent behaviour.\n\n## Related\n- [[Agent]]"
   :git-updated-on  "2025-01-18"})

(def diagram-fixture
  {:filename "agent-loop.svg"
   :content  "<svg xmlns=\"http://www.w3.org/2000/svg\"><circle r=\"10\"/></svg>"})

(def memory-source-opts
  {:posts    [post-fixture]
   :glossary [glossary-fixture]
   :pages    []
   :diagrams [diagram-fixture]})
