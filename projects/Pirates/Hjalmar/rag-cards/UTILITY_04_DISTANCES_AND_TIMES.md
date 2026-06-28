<rag_card id="utility.distances_times" type="mechanical_lookup" entity="distances_and_travel_times" spoiler_level="player_safe" visibility="mechanical_lookup">
<card_meta>
<canonical_name>Distances and Times</canonical_name>
<aliases>distances, travel times, walking time, sailing time, within town, around island, from Sankt Hjalmar</aliases>
<retrieval_keywords>Wharf to Government House, Christianstorv, Maroon settlement, Eliza cottage, Rasmussen estate, Charlotte Amalie, San Juan, Nassau, Curaçao, Charleston</retrieval_keywords>
<content_role>Mechanical utility reference for prices, money, time, distance, schedules, weather, and tracker consistency.</content_role>
</card_meta>

<retrieval_contract>
<use_when>Use whenever Cael moves between locations, plans travel, asks how far something is, or when time must advance honestly.</use_when>
<do_not_use_when>Do not teleport characters or advance time without checking this card when movement matters.</do_not_use_when>
<player_visible>Player may see travel durations when asking or when a route choice matters.</player_visible>
<narrator_only>Use to advance the time-of-day tracker and constrain who can arrive where.</narrator_only>
<leak_discipline>Do not narrate long travel unless scene-worthy; update time and give sensory transition.</leak_discipline>
<tracker_rule>When this card changes money, time, status, inventory, or travel progress, update the tracking block exactly and consistently.</tracker_rule>
<related_cards>
- locations.index
- utility.schedules
- utility.weather
- events.scheduled_calendar
</related_cards>
<time_rule>Travel consumes campaign time. Update the time header/tracking block according to the listed duration.</time_rule>
</retrieval_contract>

<utility_content format="markdown">
## IV. DISTANCES AND TIMES

### Within the town

Walking unless noted. The town is small.

| From | To | Time |
|---|---|---|
| Wharf (Helm) | Wharf (Three Anchors) | 3 min |
| Wharf | Lind's chandlery | 2 min |
| Wharf | El Yelmo | 5 min |
| Wharf | Christianstorv (market square) | 5 min |
| Christianstorv | Mahamad House | 4 min |
| Christianstorv | Lefèvre's apothecary | 3 min |
| Christianstorv | Print shop (Hosea Penn) | 3 min |
| Christianstorv | De Lima counting house | 4 min |
| Christianstorv | Government House | 10 min |
| Christianstorv | Mission de San Yelmo | 6 min |
| Christianstorv | Joseph Tide's cooperage (Free Quarter) | 10 min |
| Christianstorv | Big Anna's smithy | 11 min |
| Wharf | Government House | 15 min |
| Wharf | Slave pen (behind Customs House) | 3 min |
| Wharf | Methodist meeting house | 12 min |
| Government House | Christianskirke | 4 min |
| Garrison (Fort Christiansborg) | Government House | 8 min |
| Garrison | Wharf | 12 min |

### Around the island

| From | To | By foot | By horse |
|---|---|---|---|
| Town | Leeward Beach (Petter's) | 30 min over the headland path | n/a |
| Town | Fort Concepción (Spanish ruin) | 20 min uphill | n/a |
| Town | Rasmussen estate (Trefoldighed) | 4 hours | 1.5 hours |
| Town | Müller estate (Tre Kilder) | 5 hours | 2 hours |
| Town | Coffee hills | 6 hours | 2.5 hours |
| Town | Eastern Cove (Skæringsbugten) | 4 hours (no road; foot only) | n/a |
| Town | Maroon settlement (Lugar Quieto) | half a day uphill (5–7 hours); longer in rain | n/a |
| Town | Eliza Free's cottage | as above (just past the main settlement) | n/a |
| Town | Hjalmars Top | full day | n/a |
| Town | Old Spanish Stones | 4 hours uphill | n/a |

### Sailing times from Sankt Hjalmar

Times for a sloop or brigantine in fair weather. Multiply by 1.3 for a slow ship; multiply by 1.5–2.0 for a beat to windward (sailing east or southeast).

| To | Direction | Time |
|---|---|---|
| Charlotte Amalie, St. Thomas | NW (downwind) | 3–4 days |
| St. Croix | NW | 3 days |
| Curaçao | SW | 6–8 days |
| Nassau, New Providence | NNW | 10 days |
| San Juan, Puerto Rico | W | 2 days |
| 1715 fleet wreck site (Florida coast) | NNW | 7 days |
| Charleston, Carolina | N | 21–28 days |
| Bermuda | NNE (against trades) | 14–18 days |
| Mosquito Coast | W | 10–12 days |
| Barbados | ESE (against trades, much harder) | 8–12 days |
| Cumaná, Tierra Firme | SW | 10–14 days |
| Cádiz, Spain | E (long beat) | 35–45 days |
| Amsterdam | NE | 50–70 days |

---
</utility_content>
</rag_card>
