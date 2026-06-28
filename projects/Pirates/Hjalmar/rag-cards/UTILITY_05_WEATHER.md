<rag_card id="utility.weather" type="environment_lookup" entity="weather_tides_hurricane_season" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Weather, Tides, and Hurricane Season</canonical_name>
<aliases>weather, rain, trade winds, squall, hurricane, barometer, tides, moon, full moon</aliases>
<retrieval_keywords>northeasterly trade winds, afternoon squall, hurricane warning signs, glass falling, September 21, Day 8, full moon, tidal range, body in harbor</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use when weather, rain, wind, tides, careening, sailing conditions, atmosphere, hurricane threat, or body recovery timing matters.</use_when>
<do_not_use_when>Do not introduce a hurricane strike unless the campaign clock and event logic support it.</do_not_use_when>
<player_visible>Player may see weather as sensory description and tactical constraint.</player_visible>
<narrator_only>Use weather and tides to shape travel, ship movement, visibility, noise, and consequences.</narrator_only>
<leak_discipline>Do not use weather as filler when a sharper scene beat is available.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- events.scheduled_calendar
- locations.sea_approaches
- utility.distances_times
</related_cards>

</retrieval_contract>

<utility_content format="markdown">
## V. WEATHER

### Trade winds and daily rhythm

The northeasterly trade winds blow steadily six to ten months of the year. Daily pattern in September:

- **Dawn:** light or calm. Often the only time a man can hear himself think.
- **Mid-morning to noon:** wind building to 15 knots from the NE or ENE.
- **Afternoon:** wind 18–22 knots, often a brief squall.
- **Sunset:** wind dropping.
- **Night:** light or calm again, occasional offshore breeze in the small hours.

### Rain

September is the wet middle of hurricane season. Expect:

- Daily afternoon squalls on the windward (eastern) side of the island.
- Less rain on the leeward (western) side — the town itself sees a brief shower most afternoons rather than a sustained downpour.
- Some days bring a full afternoon's heavy rain that closes outdoor business for an hour or two.

### Hurricane season

June through November, peak August through October. Sankt Hjalmar has not taken a direct hit since 1707 but has had three close passes since.

**Warning signs the narrator may surface:**

- A long, slow swell from the southeast where the local sea has no such swell.
- Glass falling (Lefèvre keeps a barometer; Magnus Bremer keeps one).
- A hazy, red dawn — the sky bruised rather than clear.
- Cirrus cloud streaming in from the east in long high bands.
- Birds going quiet, or seabirds moving inland and uphill.
- Surf rising on the windward shore for no apparent reason.
- The cane fields restless in a wind that has not yet arrived.

A hurricane in striking distance is named in the town typically two days in advance. A hurricane that hits is named for a month after.

### Lunar and tidal notes for September 1715

- The moon is full on **September 21 (Day 8)** by the Julian calendar (which is still in use in the Danish colonies). Tides are larger around the full and the new moon.
- Tides in Sankt Hjalmar harbor are modest — typical range about three feet. Important for: careening operations, navigating shoal water at low water, and the timing of a body weighed and dropped in the harbor versus a body left in the shallows.

---
</utility_content>
</rag_card>
