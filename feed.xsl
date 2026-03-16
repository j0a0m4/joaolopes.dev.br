<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RSS Feed — ThinkLoop</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&amp;display=swap" rel="stylesheet" />
        <style>
          :root {
            --font: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            --max-width: 42rem;
            --bg: #100e17;
            --bg-alt: #191621;
            --fg: #bebebe;
            --muted: #7a7a8e;
            --border: rgba(14, 210, 247, 0.08);
            --accent: #0fb6d6;
            --accent-hover: #6bcafb;
            --sub-accent: #f4569d;
          }
          @media (prefers-color-scheme: light) {
            :root {
              --bg: #faf9fc;
              --bg-alt: #f0eef5;
              --fg: #1a1a2e;
              --muted: #5a5a72;
              --border: rgba(14, 160, 200, 0.12);
              --accent: #0a8fa8;
              --accent-hover: #067a91;
              --sub-accent: #d6366f;
            }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html {
            font-family: var(--font);
            font-size: 18px;
            line-height: 1.6;
            color: var(--fg);
            background: var(--bg);
          }
          body {
            max-width: var(--max-width);
            margin: 0 auto;
            padding: 2rem 1rem;
          }
          header { margin-bottom: 3rem; }
          nav {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            border-bottom: 1px solid var(--border);
            padding-bottom: 1rem;
          }
          nav a {
            color: var(--fg);
            text-decoration: none;
            font-weight: 600;
          }
          .nav-links { display: flex; gap: 1.5rem; }
          .nav-links a { font-weight: 400; font-size: 0.9rem; color: var(--muted); }
          .nav-links a:hover { color: var(--fg); }
          h1 {
            font-size: 1.8rem;
            line-height: 1.2;
            margin-bottom: 0.5rem;
            color: var(--accent);
          }
          .feed-description {
            color: var(--muted);
            margin-bottom: 0.5rem;
          }
          .feed-banner {
            border: 1px solid rgba(14, 210, 247, 0.15);
            border-radius: 6px;
            padding: 1rem 1.25rem;
            margin-bottom: 2rem;
            color: var(--muted);
            font-size: 0.9rem;
          }
          .feed-banner code {
            font-size: 0.85em;
            color: var(--sub-accent);
            background: var(--bg-alt);
            padding: 0.15em 0.35em;
            border-radius: 3px;
          }
          .feed-banner a { color: var(--accent); text-decoration: none; }
          .feed-banner a:hover { color: var(--accent-hover); }
          .post-list { list-style: none; }
          .post-list li {
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .post-list a {
            color: var(--fg);
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 500;
          }
          .post-list a:hover { color: var(--accent); }
          .post-list time { font-size: 0.85rem; color: var(--muted); }
          .post-list .description { font-size: 0.9rem; color: var(--muted); margin: 0; }
          footer {
            margin-top: 4rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
            font-size: 0.85rem;
            color: var(--muted);
          }
          footer a { color: var(--muted); text-decoration: none; }
          footer a:hover { color: var(--accent); }
        </style>
      </head>
      <body>
        <header>
          <nav>
            <a href="/">ThinkLoop</a>
            <span class="nav-links">
              <a href="/">Posts</a>
              <a href="/about/">About</a>
              <a href="/feed.xml">RSS</a>
            </span>
          </nav>
        </header>
        <main>
          <h1>RSS Feed</h1>
          <p class="feed-description"><xsl:value-of select="/rss/channel/description" /></p>
          <div class="feed-banner">
            This is an RSS feed. Copy the URL into your reader to subscribe.
            You can use <a href="https://netnewswire.com/">NetNewsWire</a>,
            <a href="https://feedly.com/">Feedly</a>, or any RSS app.
          </div>
          <ul class="post-list">
            <xsl:for-each select="/rss/channel/item">
              <li>
                <a>
                  <xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
                <time><xsl:value-of select="pubDate" /></time>
                <xsl:if test="description">
                  <p class="description"><xsl:value-of select="description" /></p>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ul>
        </main>
        <footer>
          <p>&#169; 2026 <a href="https://github.com/j0a0m4" target="_blank" rel="noopener noreferrer">Jo&#227;o Lopes</a></p>
          <p>Theme inspired by <a href="https://github.com/bennyxguo/Obsidian-Obsidianite" target="_blank" rel="noopener noreferrer">Obsidianite</a></p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
