---
hero_text: Welcome to <strong>Mount Albert Methodist Church<br><br></strong>
hero_subtitle: our regular service is at 10am every Sunday
title: Hero

---
<Hero :text="$page.frontmatter.hero_text" :subtitle="$page.frontmatter.hero_subtitle" />
<h2>Latest News</h2>
<NewsList />

<h2>Upcoming services</h2>
<Events-EventList />