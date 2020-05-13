---
hero_text: Hi, welcome to <strong>Mount Albert Methodist Church<br><br></strong>
title: Hero

---
<Hero :text="$page.frontmatter.hero_text" />
<h2>Latest News</h2>
<NewsList />

<h2>Upcoming services</h2>
<Events-EventList />