<rag_card id="utility.schedules" type="mechanical_lookup" entity="daily_weekly_monthly_schedules" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Schedules</canonical_name>
<aliases>schedules, daily rhythm, weekly schedule, monthly schedule, market days, Council meeting, tavern hours, Mass, Sabbath</aliases>
<retrieval_keywords>fish market opens, Customs House, Helm opens, Three Anchors opens, El Yelmo opens, Council meeting, Christianskirke service, Methodist meeting, Mahamad House, packet boat</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when determining whether a place is open, who is likely present, whether a service/meeting/market is happening, or what the town is doing at a given time.</use_when>
<do_not_use_when>Do not ignore the schedule to force an NPC into a scene unless another file gives a reason.</do_not_use_when>
<player_visible>Player may see practical schedule information when asking or when arriving somewhere.</player_visible>
<narrator_only>Use to populate scenes and enforce routine.</narrator_only>
<leak_discipline>Do not over-explain schedules; show them through open doors, bells, crowds, or absence.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- events.scheduled_calendar
- locations.town_districts
- utility.distances_times
</related_cards>

</retrieval_contract>

<utility_content format="markdown">
## VI. SCHEDULES

### Daily

- **04:00–07:00** — Fishing boats out. Fish market opens to wholesalers.
- **05:00** — Mission Mass (daily).
- **06:00** — Garrison morning watch change.
- **07:00–10:00** — Fish market open to public. Wharf labor calls. Customs House opens. Shops opening.
- **09:00–15:00** — Government House office hours. De Lima counting house open. Mahamad House school hours.
- **10:00** — Helm opens. (Margriet has been awake since six prepping.)
- **12:00** — Three Anchors opens.
- **14:00–17:00** — Hot afternoon. Less foot traffic. Plantation business in the upper rooms.
- **15:00** — Customs House closes for the day.
- **16:00–18:00** — El Yelmo opens for the evening trade.
- **17:00** — Garrison evening watch change.
- **18:00** — Sun sets approximately. Lamps lit. The Mahamad House evening prayers (when called for).
- **19:00–23:00** — Taverns full. Most commerce wound down.
- **22:00** — Garrison night watch begins. Council households shutting their gates.
- **01:00** — Helm closes (Margriet's discretion). Three Anchors and El Yelmo close when the last paying customer leaves.

### Weekly

- **Sunday morning** — Christianskirke service (Pastor Bagger). Mission Mass (Father Vega, late morning).
- **Sunday afternoon** — Methodist meeting (Ezekiel Boatswain).
- **Tuesday morning** — Market in Christianstorv. Council members begin arriving in town.
- **Tuesday afternoon** — Plantation Council meeting at Government House (2 p.m.).
- **Wednesday evening** — Methodist meeting (Ezekiel Boatswain). Quaker meeting at Hosea Penn's home (smaller; mostly the Penn family and a few correspondents).
- **Friday morning** — Market in Christianstorv (smaller than Tuesday's).
- **Friday evening at sundown** — Sephardic Sabbath service at the Mahamad House.
- **Saturday morning** — Sephardic Sabbath service at the Mahamad House. De Lima's counting house closed for the Sabbath.

### Monthly

- **First Tuesday of the month** — Council meeting includes the Selskab's quarterly figures (when the books align).
- **Mid-month packet boat** — small packet vessel to Charlotte Amalie carrying mail, light cargo, and occasional passengers. The next is due Day 5–7 of Week 1.
- **End-of-month packet** — larger packet to Curaçao, mail and goods.

### Annual notes (September 1715)

- **The Tuscarora War's first phase has just ended in the Carolinas (1715).** News will arrive by ship over the coming weeks.
- **The first Jacobite Rising in Scotland is brewing.** News not yet arrived.
- **The treasure fleet wreck is six weeks old.** Salvage operations active. Henry Jennings's raid on the Spanish salvage camp is three to four months away.
- **Hurricane season is at its peak.** Captains careful with timing.

---
</utility_content>
</rag_card>
