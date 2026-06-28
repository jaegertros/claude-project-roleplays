# **Architecting the Wizarding World: A Comprehensive Framework for Narrative Language Model Roleplay**

## **Theoretical Foundations of Magical Reality Simulation**

Constructing a highly reactive, narrative-driven roleplaying environment using Large Language Models (LLMs) requires the synthesis of expansive fictional lore with rigorous systemic mechanics. The wizarding world, characterized by a blend of whimsical, soft magic and rigid, academic spellcasting, presents a unique computational challenge for artificial intelligence architectures. The foundational setting operates on a deeply disjointed paradigm: on one hand, magic is inherently mystical, driven by emotion, intent, psychological trauma, and abstract concepts such as the "Power of Love"; on the other, it relies heavily on systematic academic study, precise physical wand movements, and a rigidly defined lexicon of faux-Latin incantations.1

To optimize an LLM for dynamic roleplay within this setting, the underlying prompt architecture must systematically reconcile these two divergent halves. The artificial intelligence must be trained to recognize that while a student can memorize the precise incantation for a spell, the ultimate narrative efficacy of that spell is inextricably tied to their emotional state, their psychological alignment, and the physical conduit of their magic: the wand itself.1 Structuring this vast amount of information into a cohesive dataset—often formatted as highly specific JSON lorebooks or world information dictionaries—allows the AI to accurately simulate a living, breathing wizarding environment.3 When integrating tabletop roleplaying game (TTRPG) mechanics into these LLM prompts, the resulting framework provides a structured simulation that prevents the AI from hallucinating capabilities and enforces logical consequences for player actions, thereby elevating the narrative experience from open-ended storytelling to a mathematically grounded interactive game.

## **Wandlore: The Primary Conduit of Arcane Physics**

Wandlore is defined as an ancient, complex, and mysterious branch of magic that dictates the symbiotic relationship between a magical practitioner and their primary spellcasting tool.2 For LLM roleplay, wand specifications are not merely aesthetic details; they serve as hidden mechanical modifiers that shape character capabilities, dictate probability distributions in spellcasting, and influence overarching narrative outcomes. The fundamental principle of wandlore is that "the wand chooses the wizard," establishing an initial arcane attraction that evolves into a mutual, lifelong quest for experience, where the wand and wizard continuously learn from one another.5 Wands are classified as quasi-sentient magical tools, meaning they possess a distinct form of loyalty and behavioral predisposition that must be simulated by the AI.2

### **Supreme Cores and Arcane Output**

Garrick Ollivander, a central academic figure in the study of wandlore, identified three specific materials that he classified as the "Supreme Cores." These cores dictate the baseline behavior, stability, and power output of a wand. In a TTRPG or an LLM simulation, these cores can be mathematically or narratively weighted to influence spellcasting success rates, critical failure probabilities, and alignment shifts.

| Core Material | Narrative and Mechanical Characteristics | Arcane Stability and Learning Rate |
| :---- | :---- | :---- |
| Unicorn Hair | Produces the most consistent and reliable magic, making it least subject to fluctuations or blockages. Wands with this core are deeply loyal, form the strongest initial bonds, and are historically the most difficult to turn to the Dark Arts. | High consistency, low volatility, moderate learning rate.5 |
| Dragon Heartstring | Generates wands with the absolute most power, capable of highly flamboyant and destructive spells. These wands are prone to accidents if mishandled, and their inherent power means they can be easily turned to dark magic if the owner desires it. | High raw power, moderate volatility, exceptionally fast learning rate.5 |
| Phoenix Feather | The rarest core type, capable of the greatest and most diverse range of magic. These wands exhibit high initiative, occasionally acting of their own accord to protect the user or cast a spell unprompted, a trait many wizards dislike due to its unpredictability. | Exceptional magical range, high volatility, slow initial learning rate.5 |

### **Wood Types, Length, and Flexibility**

A wand is a composite artifact, drawing its complete identity from its wood, its core, and the nature of its owner, where tendencies of each may counterbalance or heavily outweigh the other.5 The physical dimensions and the specific botanical material of the wand act as secondary behavioral constraints that the LLM must track. The simulation must recognize over thirty-eight distinct wood classifications used in wandmaking, including Acacia, Alder, Apple, Ash, Aspen, Beech, Blackthorn, Black Walnut, Cedar, Cherry, Chestnut, Cypress, Dogwood, Ebony, Elder, Elm, English Oak, Fir, Hawthorn, Hazel, Holly, Hornbeam, Larch, Laurel, Maple, Pear, Pine, Poplar, Red Oak, Redwood, Rowan, Silver lime, Spruce, Sycamore, Vine, Walnut, Willow, and Yew.5

The length of the wand provides insight into the psychological profile of the caster. Most wands range precisely between nine and fourteen inches in length. Wands shorter than eight inches are exceedingly rare and typically select owners in whose character "something is lacking," representing a psychological deficiency or deeply rooted trauma.5 Conversely, wands over fifteen inches are equally rare and denote a "physical peculiarity" or an exceptionally flamboyant style of magic in the wizard.5

Wand flexibility or rigidity indicates the "degree of adaptability and willingness to change" for the wand-and-owner pair.5 Within an AI roleplaying system, a rigid or unyielding wand might apply a penalty to learning new, out-of-character spells or switching moral alignments, while a flexible, "whippy" wand might offer substantial bonuses to improvisational magic and quick adaptation in combat.

Furthermore, wand allegiance is fluid and can be altered through combat. Allegiance shifts if a wand is "properly won" in an adult duel where real power is at stake, meaning the LLM must track ownership transfers when a character is disarmed or defeated in genuine combat.5 This does not apply to casual dueling clubs, where no emotional weight or real power is attached to the loss.5 The legendary Elder Wand represents a unique edge case in this programming; it is "ruthless" and "unsentimental," holding absolute loyalty only to raw strength, meaning its allegiance shifts immediately upon the defeat of its master, regardless of the method.5 Finally, the LLM must be constrained regarding non-magical actors: if a Muggle attempts to interact with a wand, the magical core will aggressively rebel, violently repelling the user before the core itself shrivels and permanently dies.5

## **Arcane Taxonomy: Spellcasting Mechanics and Tiers**

To prevent an LLM from hallucinating capabilities or allowing novice characters to perform physically impossible magical feats, spellcasting must be categorized into definitive tiers and governed by specific rules of engagement.6 In structured TTRPG adaptations, magic is heavily regulated to ensure balanced gameplay and narrative progression.

### **Mechanical Constraints of Spellcasting**

Within a roleplaying framework, casting a spell requires two absolute prerequisites: possession of a wand (wandless magic being an advanced, highly specialized skill) and the prior acquisition and study of the spell itself.6 In d20-based or Coda-based TTRPG systems, casting involves specific skill checks. For example, the *Harry Potter RPG Core Rule Book* outlines that casting relies on a "Ranged Combat: Spells" test to determine if the spell physically hits its target, followed by a "Spellcraft" test to dictate the spell's actual efficacy and effect manifestation.6 During character creation in these structured systems, players select a limited number of Tier I spells based on their Intellect modifier, slowly expanding their repertoire through academic study, which is mechanically represented by rolling against a "Learning Target Number" over weeks of simulated time.6

### **Spell Repertoires and Semantic Triggers**

The wizarding lexicon relies on precise incantations. When programming an LLM for roleplay, utilizing a "Chain-of-Dictionary" prompting technique helps the model associate the faux-Latin incantation with its explicit semantic effect, preventing contextual errors or hallucinated magic during text generation.7 The AI must be fed a highly structured database of spells, categorized by type (Charm, Transfiguration, Curse, Hex, Jinx) to accurately adjudicate player actions.

| Spell Incantation | Magical Category | Semantic Intent and Narrative Effect |
| :---- | :---- | :---- |
| *Accio* | Charm | Summons an object to the caster; requires clear mental visualization. Cannot summon complex living creatures (except Flobberworms) or exceptionally large buildings.8 |
| *Aguamenti* | Charm | Conjures a highly pressurized jet of clear water from the wand tip.8 |
| *Alohomora* | Charm | Unlocks and opens doors or mundane physical locks.8 |
| *Arania Exumai* | Charm | Specifically designed to repel and blast away arachnids, notably Acromantulas.9 |
| *Avada Kedavra* | Unforgivable Curse | Causes instant, unblockable death. Emits a blinding flash of green light.8 |
| *Bombarda* | Charm / Combat | Generates a localized explosive force capable of shattering stone.8 |
| *Crucio* | Unforgivable Curse | Inflicts agonizing physical pain; requires genuine, deep-seated malicious intent from the caster.9 |
| *Depulso* | Charm | Banishes the target away from the caster; functions as the exact mechanical opposite of the Summoning Charm (*Accio*).9 |
| *Expecto Patronum* | Charm | Conjures a corporeal or incorporeal magical guardian driven by profound positive memories; the only known defense against Dementors.11 |
| *Expelliarmus* | Charm / Combat | Disarms the opponent by forcefully ejecting their wand from their grasp, occasionally launching the opponent backward.12 |
| *Imperio* | Unforgivable Curse | Places the victim under the complete psychological and physical control of the caster.11 |
| *Sectumsempra* | Dark Curse | Inflicts deep, slashing lacerations upon the target, as if struck by an invisible sword; invented by Severus Snape.9 |
| *Wingardium Leviosa* | Charm | Induces levitation in objects, allowing the caster to maneuver them through the air.9 |

Additional critical spells that an LLM must understand to manage daily magical life and combat include *Ascendio* (rapid upward movement), *Cave Inimicum* (warding against enemies), *Colloportus* (magically locking doors), *Confringo* (a blasting curse that uses heat/fire), *Confundo* (inducing severe confusion), *Defodio* (gouging through earth or stone), *Descendo* (forcing targets downward), *Incendio* (conjuring localized fire), *Glacius* (freezing targets), and *Petrificus Totalus* (inducing complete full-body paralysis).9

An advanced LLM prompt can utilize these exact parameters to simulate complex tactical spell combos. For example, the simulation can recognize that chaining *Glacius* (freezing) with *Diffindo* (severing) results in shattering a target for massive damage, or that using *Transformation* on an enemy followed by *Depulso* can turn them into an explosive projectile.13 This systemic synergy allows the LLM to reward players for tactical creativity rather than just relying on generic damage outputs.

## **Alchemical Synthesis and Botanical Mechanics**

Potions serve as a critical secondary magic system within the simulation, providing buffs, debuffs, and narrative solutions that do not rely on immediate wand proficiency. For a text-based generation model, potion brewing requires the tracking of specific material inventories and their corresponding phenomenological effects, functioning similarly to an expansive crafting system.15

### **Reagents and Biological Ingredients**

The world environment must be populated with specific magical flora and fauna parts. The inclusion of these items in a world info dictionary allows the AI to realistically populate apothecary shelves in Diagon Alley, greenhouse environments at Hogwarts, and the dark, damp floors of the Forbidden Forest.16

The LLM must be programmed to recognize the properties of Flora Reagents such as Aconite (also known as Wolfsbane), Asphodel, Belladonna, Bubotuber, Dittany (used for rapid wound healing), Fluxweed, Hellebore, Knotgrass, Lovage, Sneezewort, Sopohorous beans, Valerian sprigs, and Wormwood.16

Equally vital are the Fauna Reagents, which include highly dangerous materials that require skill to harvest: Acromantula venom, Armadillo bile, Ashwinder eggs (which are highly flammable if not frozen), Bezoars (stone-like masses taken from the stomachs of goats, acting as universal antidotes), Bicorn horn, Billywig parts, Boomslang skin, Doxy eggs, Dragon blood, Dragon dung, Dragon liver, Flobberworm mucus (used as a standard thickener), Jobberknoll feathers, Lacewing flies, Puffer-fish eyes, Salamander blood, Scarab beetles, Tubeworms, and Unicorn hair/horns.16

### **Documented Elixirs and Draughts**

The precise synthesis of these ingredients produces specific narrative effects. An LLM roleplay should cross-reference the following established alchemical formulas to maintain continuity and enforce preparation time, as alchemy cannot be rushed like a spoken spell.

| Potion Name | Core Effect and Composition | Narrative Application in LLM Roleplay |
| :---- | :---- | :---- |
| Amortentia | The world's most powerful love potion; it does not create actual love, but rather a deeply powerful, dangerous obsession.15 | Social manipulation, coercion, sabotage, and creating intense interpersonal conflict. |
| Veritaserum | A tasteless, odorless serum that compels the drinker to speak the absolute truth.12 | Interrogation, mystery resolution, and forcing NPC confessions. |
| Draught of Living Death | An incredibly potent sleeping potion that induces a magically suspended slumber mimicking actual death.12 | Assassination plots, deep subterfuge, or faking a character's demise. |
| Elixir to Induce Euphoria | Creates an inexplicable, irrational sense of happiness upon the drinker.15 | Counteracting the psychological trauma of Dementor attacks or deep despair. |
| Ageing Potion | Temporarily advances the physical age of the drinker, dependent on the volume consumed.15 | Disguise, espionage, or bypassing age-restricted magical wards. |
| Pepperup Potion | Instantly cures the common cold and vigorously warms the drinker, often causing steam to emit from the ears.12 | Environmental survival in harsh weather or recovering from mild magical ailments. |
| Doxycide | A black liquid sprayed from a bottle that temporarily paralyzes Doxies, allowing for their safe removal.15 | Pest control and specific creature encounter management. |
| Cure for Boils | A basic potion taught to first-years; cures boils but causes massive explosions if porcupine quills are added before taking the cauldron off the fire.15 | Introductory crafting mechanics and learning consequence-based brewing. |

When implementing potion mechanics, the AI must be explicitly instructed to consider the time scale. Unlike spellcasting, which resolves in seconds, alchemy requires hours, days, or even months (e.g., Polyjuice potion or Felix Felicis) and precise environmental conditions, adding a necessary layer of strategic planning and downtime management to the roleplay.15

## **Magizoology: Narrative Ecology and Creature Behaviors**

The inclusion of magical creatures expands the scope of the simulation beyond human-centric conflict. Magizoology introduces entities that operate on entirely different biological and behavioral logic, requiring the LLM to generate unique sensory descriptions, environmental hazards, and complex encounter dynamics.20 In the Harry Potter universe, Magizoology is the formal study of these creatures, managed heavily by the Ministry of Magic's Department for the Regulation and Control of Magical Creatures.20

### **Biological Classifications and Encounter Dynamics**

The LLM's bestiary must differentiate between Beasts, Beings, Spirits, Non-Beings, and Spirit-Beings, each presenting distinct narrative challenges and requiring different problem-solving approaches from the players.21 An expansive list of these creatures includes Centaurs, Curupira, Dwarfs, Giants, Goblins, Hags, House-Elves, Inferi (undead thralls), Mooncalves, Ogres, Trolls, Vampires, Veela, Werewolves, and Yumbos.22 However, for specific encounter generation, the AI should be detailed on the following major beasts:

1. **Acromantula:** Gigantic, eight-eyed, black-haired spiders capable of human speech, possessing a communal, highly predatory intelligence. They dwell in dense jungles or locations like the Forbidden Forest. Encounters should emphasize the terrifying clicking of massive pincers, the overwhelming numbers of the colony, and their absolute lack of empathy.20  
2. **Basilisk:** An immense serpent known as the "King of Serpents," bred from a chicken egg hatched beneath a toad. Its primary attack is its gaze, which causes instant death upon direct eye contact, or petrification if viewed indirectly through a reflection. The AI should highlight its paralyzing physical presence, the sound of massive scales scraping stone, its venomous fangs, and its lethal vulnerability to the crowing of a rooster or the scent of a weasel.25  
3. **Boggart:** A shape-shifting entity that intrinsically embodies the observer's absolute worst fear. Its true form is entirely unknown. In a narrative simulation, the AI must dynamically assess the active character's psychological profile and instantly alter the Boggart's description to match their deepest trauma. It is repelled exclusively by forced laughter via the *Riddikulus* spell.9  
4. **Dementors:** Classified as Non-Beings, these blind, cloaked creatures feed indiscriminately on human happiness, causing their immediate surroundings to freeze and generating profound, paralyzing despair. Encounters must be described using intense sensory deprivation: sudden, unnatural drops in temperature, the rattling of decaying breath, the dimming of ambient light, and the forced surfacing of the character's worst memories. Only a successfully cast corporeal Patronus can repel them.11  
5. **Hippogriff:** A proud hybrid creature with the head, wings, and talons of a giant eagle, and the body of a horse. Interactions require strict adherence to etiquette; characters must maintain eye contact, bow, and wait for the creature to return the gesture before approaching, adding a layer of social mechanics to a physical beast encounter.22  
6. **Blast-Ended Skrewts:** Aggressive, heavily armored cross-breeds created illegally by breeding Manticores and Fire Crabs. Resembling shell-less, pale lobsters, males possess venomous stingers, while females have blood-sucking suckers. They sporadically shoot explosive fire from their rears, introducing an element of chaotic environmental hazard to any scene they occupy, making them incredibly difficult to manage in Care of Magical Creatures scenarios.19  
7. **Other Notable Entities:** The simulation should also account for the mournful Augurey (whose cry signals rain or death), the deceptive Demiguise (capable of precognition and invisibility), the highly explosive Erumpent, the shape-shifting Kelpie water demon, the Hungarian Horntail dragon, and the Fwooper, a brightly colored bird whose song will eventually drive the listener to total insanity.20

## **Geopolitical Architecture and Spatial Design**

To ground the AI's generation, a strict spatial and geopolitical framework must be established. The wizarding world relies on hidden institutions, segregated societies, and complex bureaucratic structures.26 The LLM must understand the difference between mundane locations and heavily warded magical spaces.

### **Global Locations and Institutions**

The AI's spatial awareness must map out specific residential areas like The Burrow (home of the Weasleys), Godric's Hollow, Little Hangleton, Malfoy Manor, Number 4 Privet Drive, and Number 12 Grimmauld Place (the heavily protected Black family home).26 Commercial roleplay requires detailed knowledge of Diagon Alley, Knockturn Alley (for dark artifacts), Hogsmeade village, La Place Cachée in Paris, and the Leaky Cauldron acting as the primary gateway.26

Education is a cornerstone of the setting. Beyond Hogwarts School of Witchcraft and Wizardry in Scotland, the AI can simulate international scenarios at Beauxbatons (France), Durmstrang (Northern Europe), Ilvermorny (North America), Castelobruxo (Brazil), and Mahoutokoro (Japan).26

### **The Ministry of Magic**

The Ministry of Magic serves as the massive bureaucratic epicenter of the British magical community, located deep underground in London. It is accessed via a mundane, abandoned red telephone box by dialing 62442 (spelling "MAGIC" on the keypad).27 The physical structure of the Ministry provides excellent narrative hooks for bureaucratic, investigative, and political campaigns, structured specifically by underground levels.29

| Ministry Level / Department | Core Function and Associated Offices | Narrative Roleplay Potential |
| :---- | :---- | :---- |
| Level 2: Department of Magical Law Enforcement | The largest department, overseeing the Auror Office, the Misuse of Muggle Artefacts Office, the Magical Law Enforcement Squad, and the Wizengamot. | Investigating dark wizards, engaging in legal battles, and conducting police-procedural style roleplay.30 |
| Level 4: Department for the Regulation and Control of Magical Creatures | Divided explicitly into the Beast Division, Being Division, and Spirit Division. | Managing dangerous creature outbreaks, negotiating with goblin or centaur liaisons, and enforcing creature rights.30 |
| Level 9: Department of Mysteries | A highly classified sector staffed by "Unspeakables." Contains the Brain Room, Hall of Prophecy, Death Chamber, Love Chamber, Space Chamber, and Time Room. | Cosmic horror, existential research, and high-stakes espionage regarding the fundamental forces of magic.29 |
| Level 10: Courtroom Ten | The primary judicial chamber for all severe crimes against wizard-kind. | High-drama courtroom scenes, Death Eater trials, and navigating corrupt bureaucratic tribunals.29 |

Additional government structures the AI must recognize include Azkaban (the Dementor-guarded prison), Erkstag, the French Ministry of Magic, and the Magical Congress of the United States of America (MACUSA).26

## **Historical Timelines and Factional Dynamics**

Roleplay scenarios typically hinge on specific temporal eras, as the sociopolitical landscape changes drastically depending on the decade. The LLM must be anchored to a specific timeline to prevent anachronistic hallucinations.32 The canonical timeline contains numerous epochs of interest:

* **Ancient History (Pre-11th Century):** Before 100 AD, Herpo the Foul created the first known Horcrux. Circa 990 AD, Hogwarts was founded by Godric Gryffindor, Helga Hufflepuff, Rowena Ravenclaw, and Salazar Slytherin due to growing Muggle persecution. In the 11th century, Quidditch began evolving, and the tragedy of Helena Ravenclaw and the Bloody Baron occurred.33  
* **The Global Wizarding War (1920s–1945):** Dominated by the rise of Gellert Grindelwald, featuring the Obscurial attack on New York (1926) and Grindelwald's rally in Paris (1927). This era culminated in the legendary 1945 duel where Albus Dumbledore defeated Grindelwald and won the Elder Wand.34  
* **The First Wizarding War (1970–1981):** The initial, terrifying rise of Lord Voldemort. This era is characterized by extreme paranoia, where the Ministry appeared entirely ineffectual, and citizens were randomly subjugated via the Imperius Curse. It ended on November 1, 1981, with Voldemort's first downfall and the false imprisonment of Sirius Black.34  
* **The Second Wizarding War (1995–1998):** Characterized by direct insurgency and open conflict. The Ministry of Magic fell in August 1997, leading to a totalitarian regime where Muggle-borns were actively hunted. The war concluded with the Battle of Hogwarts on May 2, 1998, resulting in the final deaths of Voldemort, Bellatrix Lestrange, and Remus Lupin.34  
* **Post-War Era (2020):** Scenarios dealing with the plot to restore Voldemort via his daughter, Delphini, utilizing time-turner mechanics.34

### **Factional Affiliations**

Within these conflicts, two primary factions dictate the narrative alignment, providing rich hooks for character creation and mission design.

**The Death Eaters:** A supremacist organization adhering to a strict, brutal hierarchy.39 Voldemort sits at the absolute apex, followed by a tight Inner Circle (trusted with Horcruxes and major operations, such as Lucius Malfoy and Bellatrix Lestrange), standard marked Death Eaters, and a vast network of unmarked sympathizers, mercenaries, and Snatchers.39 Roleplaying within this faction allows for the exploration of profound moral decay, coercion via Unbreakable Vows, and brutal internal politics.39 From a psychological standpoint, many Death Eaters rationalized their abhorrent actions through pureblood supremacy, genuinely believing they were restoring the natural order and nobility of magic against Muggle corruption.41 Missions involve infiltrating the Ministry, hunting blood traitors, and attacking Order outposts.39

**The Order of the Phoenix:** A decentralized, highly dedicated underground resistance group founded by Dumbledore. They utilized heavily warded safe houses (such as the home of Andromeda and Ted Tonks), engaged in guerilla tactics, and functioned as the primary militant opposition when the Ministry became corrupted, compromised, or simply too slow to act.37 Their tactics rely on collective praxis, turning academic spells learned in the classroom into highly effective combat strategies, as seen with Dumbledore's Army.43

## **TTRPG Mechanical Frameworks for AI Simulation**

Integrating tabletop mechanics into an LLM prompt ensures that the narrative does not devolve into pure, consequence-free wish fulfillment. Different rulesets offer distinct mathematical and narrative advantages for prompt architecture. The LLM must be explicitly instructed on which ruleset to adjudicate.

### **The Coda / D20 System Approach**

If a highly simulationist, mathematically rigorous approach is desired, systems based on d20 or Coda mechanics can be implemented. The *Harry Potter RPG Core Rule Book* utilizes the Coda system, where characters generate Primary Attributes (Intellect, Nimbleness, Strength) and Secondary Attributes.6 Resolution involves rolling two six-sided dice (2d6) and adding skill modifiers against predefined Target Numbers (TN). The difficulty scale is rigid: Routine (TN 5), Standard (TN 10), Challenging (TN 15), Difficult (TN 20), and Virtually Impossible (TN 25).6

Action economy in combat is strictly enforced. Characters are allowed exactly two actions per round, categorized into Movement (e.g., walking 6 yards per action), Combat (aiming, casting), Free (dropping an object), and Full-round actions.6 Exceeding this limit incurs a cumulative mathematical penalty (-5 for the third action, \-10 for the fourth).6 While highly structured, instructing an LLM to actively track these numerical modifiers, target numbers, and action economies can increase computational overhead and risk mathematical hallucination over long context windows.

### **The Powered by the Apocalypse (PbtA) Framework**

For AI-driven narrative play, the Powered by the Apocalypse (PbtA) system is exceptionally well-suited due to its focus on narrative consequences rather than rigid mathematical tracking. In the community-acclaimed *Hogwarts: An RPG*, characters are defined by exactly five core attributes: Bravery, Cunning, Intellect, Loyalty, and Magical Skill.44

Instead of traditional hit points, this system utilizes a "Conditions" track (e.g., Scared, Angry, Stressed, Injured, Embarrassed, Jealous).45 Taking damage from a creature or failing a social roll inflicts a condition, which applies a persistent mechanical penalty to specific traits (e.g., "Scared" applies a \-2 to Bravery; "Injured" applies a \-1 to all traits).47 These conditions are only cleared via narrative resolution, such as receiving comfort from an ally or succumbing to the negative emotion (e.g., betraying a friend out of jealousy).45

LLM prompts can be effortlessly structured to monitor these qualitative conditions and adjust the tone of the output accordingly. The core "Moves" that trigger 2d6 dice rolls in this framework include:

| PbtA Move Name | Triggering Attribute | Narrative Execution and Roll Outcomes |
| :---- | :---- | :---- |
| **Stand in the Face of Danger** | Bravery | Used to attack, defend, or resist a direct physical or emotional threat. On a 10+, the character stands firm and no one is hurt. On a 7-9, the character survives but incurs a severe cost, such as taking a Condition or dropping an item. On a 6-, the character fails and suffers a Serious Consequence.12 |
| **Hide & Sneak** | Cunning | Triggered when moving undetected through the castle or past creatures. Dictates whether the character remains unseen or attracts unwanted attention.12 |
| **Help or Hinder Someone** | Loyalty | Used to assist an ally's roll or sabotage a rival's effort, inherently risking personal safety or reputation in the process.12 |
| **Get What You Seek** | Bravery / Cunning | Used for investigation, demanding answers, or acquiring hidden objects.47 |
| **Cast a Spell** | Magical Skill | Dictates spellcasting success. On a 10+, the spell executes perfectly. On a 7-9, the spell succeeds but with a complication (e.g., it doesn't last as long, or the effect isn't as powerful). On a 6-, the spell fails completely, granting 1 Experience Point but inflicting a Serious Consequence.12 |
| **Use a Magical Object** | Magical Skill | Similar to casting, but relies on an external artifact. A 7-9 result may indicate the object does something helpful but unexpected, or it breaks in the process.12 |

This streamlined approach eliminates intimidating mathematics, making it highly compatible with LLM text generation, which excels at narrating the complications of a "7-9 partial success" rather than crunching exact damage modifiers.52 Alternative narrative frameworks like Fate Accelerated, Genesys (using proprietary narrative building-block dice), and Cortex Prime also serve this function well by focusing on storytelling over simulation.48

## **Large Language Model Prompt Engineering and Lorebook Data Structures**

To effectively run a complex wizarding world roleplay, the LLM must be configured with a highly engineered Master Prompt and a dynamic injection system, such as SillyTavern's World Info or Lorebooks.55

### **Structuring the Master Prompt**

The master prompt establishes the absolute operational rules of the simulation. It must strictly separate behavioral instructions from world lore to prevent the AI from confusing operational rules with narrative facts.55 A highly optimized master prompt follows a rigid sequence:

1. **Core Identity and Role:** "You are a narrative Game Master running a dark fantasy campaign set in the wizarding world. Your tone is atmospheric, grounded, and devoid of purple prose." This defines the personality seed.55  
2. **Task and Interaction Mechanics:** Instructions detailing how to handle dice rolls, pacing, and when to pause for user input. Explicit negative constraints are vital here to prevent the AI from hijacking the user's agency: "Never narrate the user's internal thoughts. Never skip time without explicit permission. Avoid generic AI phrasing.".55  
3. **Output Format:** Defining the structure of the AI's response, ensuring it separates out-of-character (OOC) mechanical outcomes from in-character narrative prose.57

### **World Info and Lorebook Optimization**

Injecting the entirety of Harry Potter lore into a single system prompt is computationally impossible and practically detrimental, inevitably leading to context bloat and degraded reasoning. Instead, information must be structured into JSON "Lorebooks" using vectorization or exact-match keyword activation.3 For developers, data can be scraped and normalized from open-source APIs like Potter DB, transforming nested arrays of spells, characters, and potions into clean CSV or JSON tables suitable for LLM injection.58

#### **Activation Depths and Token Budgets**

A lorebook functions as a dynamic dictionary. When the user types a keyword like "Dementor", the system retrieves the specific entry for Dementors and injects it into the prompt context.56 To manage exceptionally large lorebooks (often exceeding hundreds of entries and 1 million tokens), specific engineering principles must be applied within the front-end software:

* **Context Budgeting:** Setting a maximum token limit for injected lore ensures that background information does not overwrite the active chat history or the core character cards.56 Setting the budget to roughly 20% to 40% of the total context window maintains narrative stability.63  
* **Scan Depth and Recursion:** Scan depth determines how many previous messages the engine reviews for keywords. A depth of 3 to 4 is standard.63 Recursion allows an injected lore entry to trigger *another* lore entry (e.g., triggering "Lucius Malfoy" subsequently triggers "Death Eaters"). Limiting "Max Recursion Steps" to 1 or 2 prevents cascading injections that instantly flood the token limit and crash the context.63  
* **Formatting Entries:** Modern LLMs parse structured data efficiently. Using PList formatting, Ali:Chat dialogue examples, or JSON objects for lore entries (e.g., {"faction": "Death Eaters", "leader": "Voldemort", "goals": \["Pureblood supremacy", "Ministry infiltration"\]}) uses significantly fewer tokens than sprawling narrative prose while retaining high informational density.4

#### **Character Card Architecture**

Individual character files must follow standard CCv3 JSON formats to function properly in front-ends like SillyTavern.4 To maintain narrative consistency, character cards should isolate specific traits rather than lumping them into a single paragraph:

* **Physical Attributes:** Age, Race, Hair, Skin tone, Face, Body proportions, and Outfit.66  
* **Psychological Profile:** Defining traits based on Hogwarts Houses. The AI must understand that Gryffindors value courage and determination; Slytherins value cunning, ambition, and self-preservation; Ravenclaws value wisdom and intellect; and Hufflepuffs value loyalty and hard work.67  
* **Hidden State Patterns:** Advanced prompt developers can use XML comments, regex scripts, or hidden variables within the character card to dictate allegiances, spy statuses, or dark secrets that the AI explicitly knows but the character is actively hiding from the user, generating highly nuanced, suspenseful roleplay.4

Through the meticulous combination of rigorous wandlore physics, extensive spell and potion taxonomy, narrative-driven PbtA mechanics, and deeply optimized JSON lorebook structures, a language model can successfully transcend generic text generation. It becomes capable of simulating the intricate, dangerous, and wondrous ecosystem of the wizarding world with absolute fidelity.

#### **Works cited**

1. What are instances where you think the magic system would've benefit of being a bit harder or softer? : r/Fantasy \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/Fantasy/comments/1aupb4b/what\_are\_instances\_where\_you\_think\_the\_magic/](https://www.reddit.com/r/Fantasy/comments/1aupb4b/what_are_instances_where_you_think_the_magic/)  
2. Wandlore \- Harry Potter Wiki \- Fandom, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/Wandlore](https://harrypotter.fandom.com/wiki/Wandlore)  
3. World Info / Lorebook format: : r/SillyTavernAI \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/1nxbkom/world\_info\_lorebook\_format/](https://www.reddit.com/r/SillyTavernAI/comments/1nxbkom/world_info_lorebook_format/)  
4. character-card-v3-generator | Skills... \- LobeHub, accessed May 4, 2026, [https://lobehub.com/bg/skills/davidgibbons-sillytavern-skills-character-card-v3-generator](https://lobehub.com/bg/skills/davidgibbons-sillytavern-skills-character-card-v3-generator)  
5. Wandlore – Harry Potter Lexicon, accessed May 4, 2026, [https://www.hp-lexicon.org/thing/wandlore/](https://www.hp-lexicon.org/thing/wandlore/)  
6. Harry Potter RPG Core Rule Book \- Meetthenewboss.info, accessed May 4, 2026, [https://meetthenewboss.info/kent/hogwarts/Harry%20Potter%20RPG%20Core%20Rule%20Book.pdf](https://meetthenewboss.info/kent/hogwarts/Harry%20Potter%20RPG%20Core%20Rule%20Book.pdf)  
7. Chain-of-Dictionary (CoD) \- Learn Prompting, accessed May 4, 2026, [https://learnprompting.org/docs/advanced/few\_shot/chain-of-dictionary](https://learnprompting.org/docs/advanced/few_shot/chain-of-dictionary)  
8. 200+ Harry Potter Spells: A Full Guide \- Fictionary, accessed May 4, 2026, [https://fictionary.co/journal/harry-potter-spells/](https://fictionary.co/journal/harry-potter-spells/)  
9. List of Spells cast by Harry Potter : r/harrypotter \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/harrypotter/comments/fpu83m/list\_of\_spells\_cast\_by\_harry\_potter/](https://www.reddit.com/r/harrypotter/comments/fpu83m/list_of_spells_cast_by_harry_potter/)  
10. List of spells | Harry Potter Wiki \- Fandom, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/List\_of\_spells](https://harrypotter.fandom.com/wiki/List_of_spells)  
11. Harry Potter | Your guide to all the best spells in Harry Potter | Wizarding World, accessed May 4, 2026, [https://www.harrypotter.com/features/your-guide-to-the-best-spells-in-harry-potter](https://www.harrypotter.com/features/your-guide-to-the-best-spells-in-harry-potter)  
12. Create Your Hogwarts Character | PDF | Contemporary Fantasy Novels | Harry Potter Universe \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/514258353/Hogwarts-RPG-Player-Kit](https://www.scribd.com/document/514258353/Hogwarts-RPG-Player-Kit)  
13. Everything Tier List \- Hogwarts Legacy \- Steam Community, accessed May 4, 2026, [https://steamcommunity.com/sharedfiles/filedetails/?id=2933591338](https://steamcommunity.com/sharedfiles/filedetails/?id=2933591338)  
14. Complete Harry Potter Spells List | PDF \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/254461400/Spells-Harry-Potter](https://www.scribd.com/document/254461400/Spells-Harry-Potter)  
15. List of potions | Harry Potter Wiki \- Fandom, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/List\_of\_potions](https://harrypotter.fandom.com/wiki/List_of_potions)  
16. Hp \- Potions Ingredients List \- RPG Directory, accessed May 4, 2026, [https://rpg-directory.com/index.php?showtopic=1072](https://rpg-directory.com/index.php?showtopic=1072)  
17. Category:Potion ingredients | Harry Potter Wiki \- Fandom, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/Category:Potion\_ingredients](https://harrypotter.fandom.com/wiki/Category:Potion_ingredients)  
18. Hogwarts Potion Ingredients List | PDF | Brass \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/829085883/Hogwarts-Shop-items](https://www.scribd.com/document/829085883/Hogwarts-Shop-items)  
19. Harry Potter | Our favourite Care of Magical Creatures lessons \- Wizarding World, accessed May 4, 2026, [https://www.harrypotter.com/features/our-favourite-care-of-magical-creatures-lessons](https://www.harrypotter.com/features/our-favourite-care-of-magical-creatures-lessons)  
20. Magical creatures in Harry Potter \- Wikipedia, accessed May 4, 2026, [https://en.wikipedia.org/wiki/Magical\_creatures\_in\_Harry\_Potter](https://en.wikipedia.org/wiki/Magical_creatures_in_Harry_Potter)  
21. List of creatures | Harry Potter Wiki \- Fandom, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/List\_of\_creatures](https://harrypotter.fandom.com/wiki/List_of_creatures)  
22. Magical creatures : r/HarryPotterGame \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/HarryPotterGame/comments/k3kdh9/magical\_creatures/](https://www.reddit.com/r/HarryPotterGame/comments/k3kdh9/magical_creatures/)  
23. Magical creatures \- Harry Potter Fan Zone, accessed May 4, 2026, [https://www.harrypotterfanzone.com/magical-creatures/](https://www.harrypotterfanzone.com/magical-creatures/)  
24. Every MAGICAL Creature In Harry Potter EXPLAINED in Detail \- YouTube, accessed May 4, 2026, [https://www.youtube.com/watch?v=c-5DOGbRaUE](https://www.youtube.com/watch?v=c-5DOGbRaUE)  
25. Harry Potter | Fluffy and other creatures inspired by classical mythology \- Wizarding World, accessed May 4, 2026, [https://www.harrypotter.com/features/fluffy-and-other-creatures-inspired-by-classical-mythology](https://www.harrypotter.com/features/fluffy-and-other-creatures-inspired-by-classical-mythology)  
26. Places in Harry Potter \- Wikipedia, accessed May 4, 2026, [https://en.wikipedia.org/wiki/Places\_in\_Harry\_Potter](https://en.wikipedia.org/wiki/Places_in_Harry_Potter)  
27. The Ministry of Magic | Official Harry Potter Encyclopedia \- Wizarding World, accessed May 4, 2026, [https://www.harrypotter.com/fact-file/locations/the-ministry-of-magic](https://www.harrypotter.com/fact-file/locations/the-ministry-of-magic)  
28. British Ministry of Magic \- Harry Potter Wiki \- Fandom, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/British\_Ministry\_of\_Magic](https://harrypotter.fandom.com/wiki/British_Ministry_of_Magic)  
29. History of the Ministry of Magic (+ALL Departments) \- Harry Potter Explained \- YouTube, accessed May 4, 2026, [https://www.youtube.com/watch?v=e\_ou9XiPRmI](https://www.youtube.com/watch?v=e_ou9XiPRmI)  
30. Ministry of Magic \- Harry Potter Lexicon, accessed May 4, 2026, [https://www.hp-lexicon.org/thing/ministry-of-magic/](https://www.hp-lexicon.org/thing/ministry-of-magic/)  
31. Ministry of Magic \- Wikipedia, accessed May 4, 2026, [https://en.wikipedia.org/wiki/Ministry\_of\_Magic](https://en.wikipedia.org/wiki/Ministry_of_Magic)  
32. Questions about Lorebooks for existing universes : r/SillyTavernAI \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/1piwmvq/questions\_about\_lorebooks\_for\_existing\_universes/](https://www.reddit.com/r/SillyTavernAI/comments/1piwmvq/questions_about_lorebooks_for_existing_universes/)  
33. The History of the Wizarding World Timeline \- Harry Potter Lexicon, accessed May 4, 2026, [https://www.hp-lexicon.org/timeline/master-timeline/the-history-of-the-wizarding-world/](https://www.hp-lexicon.org/timeline/master-timeline/the-history-of-the-wizarding-world/)  
34. Harry Potter universe, accessed May 4, 2026, [https://harrypotter.fandom.com/wiki/Harry\_Potter\_universe](https://harrypotter.fandom.com/wiki/Harry_Potter_universe)  
35. A Timeline of the Potter-Verse \- The Roaring Times, accessed May 4, 2026, [https://www.pitmanroaringtimes.com/2018/12/a-timeline-of-the-potter-verse/](https://www.pitmanroaringtimes.com/2018/12/a-timeline-of-the-potter-verse/)  
36. Harry Potter Timeline Of Events • For The Love of Harry, accessed May 4, 2026, [https://fortheloveofharry.com/harry-potter-timeline-of-events/](https://fortheloveofharry.com/harry-potter-timeline-of-events/)  
37. Fiery Inception \- come play\! \- The Community for the HP obsessed, accessed May 4, 2026, [https://hp-obsess.livejournal.com/10028.html](https://hp-obsess.livejournal.com/10028.html)  
38. Andromeda Black (unearthlywitches) \- Tumblr Roleplay Wiki \- Fandom, accessed May 4, 2026, [https://tumblrroleplay.fandom.com/wiki/Andromeda\_Black\_(unearthlywitches)](https://tumblrroleplay.fandom.com/wiki/Andromeda_Black_\(unearthlywitches\))  
39. The First Wizarding War: A Dark Fantasy Setting for a Harry Potter RPG \- ScreenRant, accessed May 4, 2026, [https://screenrant.com/harry-potter-dark-fantasy-rpg-wizarding-war/](https://screenrant.com/harry-potter-dark-fantasy-rpg-wizarding-war/)  
40. Harry Potter: 10 Questions About Death Eaters, Answered \- ScreenRant, accessed May 4, 2026, [https://screenrant.com/harry-potter-questions-about-death-eaters-answered/](https://screenrant.com/harry-potter-questions-about-death-eaters-answered/)  
41. How can Death Eaters see themselves as the good guys? : r/harrypotter \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/harrypotter/comments/1mk4wc0/how\_can\_death\_eaters\_see\_themselves\_as\_the\_good/](https://www.reddit.com/r/harrypotter/comments/1mk4wc0/how_can_death_eaters_see_themselves_as_the_good/)  
42. Death Eaters | Harry/Albus Potter Wiki \- Fandom, accessed May 4, 2026, [https://harryalbuspotter.fandom.com/wiki/Death\_Eaters](https://harryalbuspotter.fandom.com/wiki/Death_Eaters)  
43. Expecto Patronum: Lessons from Harry Potter for Social Justice Organizing \- Films For Action, accessed May 4, 2026, [https://www.filmsforaction.org/takeaction/expecto-patronum-lessons-from-harry-potter-for-social-justice-organizing/](https://www.filmsforaction.org/takeaction/expecto-patronum-lessons-from-harry-potter-for-social-justice-organizing/)  
44. Hogwarts Beyond School \- Hogwarts: An RPG by David Brunell-Brutman \- Itch.io, accessed May 4, 2026, [https://dbb-8.itch.io/hogwarts-rpg/devlog/139356/hogwarts-beyond-school](https://dbb-8.itch.io/hogwarts-rpg/devlog/139356/hogwarts-beyond-school)  
45. Hogwarts: An RPG by David Brunell-Brutman, accessed May 4, 2026, [https://dbb-8.itch.io/hogwarts-rpg](https://dbb-8.itch.io/hogwarts-rpg)  
46. Best "Harry Potter"-themed TTRPG system / rulebook ? : r/rpg \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/rpg/comments/y34t5s/best\_harry\_potterthemed\_ttrpg\_system\_rulebook/](https://www.reddit.com/r/rpg/comments/y34t5s/best_harry_potterthemed_ttrpg_system_rulebook/)  
47. Hogwarts RPG Character Sheet Guide | PDF | Elements Of Fiction | Fantasy \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/720153756/Hogwarts-RPG-Fillable-Character-Sheet](https://www.scribd.com/document/720153756/Hogwarts-RPG-Fillable-Character-Sheet)  
48. What are some of the most interesting storytelling-focused mechanics you have seen? Mechanics that help players create more interesting stories, roleplay better, create fun characters, lead to improvising interesting scenes, etc. : r/rpg \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/rpg/comments/w6pfq0/what\_are\_some\_of\_the\_most\_interesting/](https://www.reddit.com/r/rpg/comments/w6pfq0/what_are_some_of_the_most_interesting/)  
49. Comments 42 to 3 of 67 \- Hogwarts: An RPG by David Brunell-Brutman, accessed May 4, 2026, [https://dbb-8.itch.io/hogwarts-rpg/comments?after=2](https://dbb-8.itch.io/hogwarts-rpg/comments?after=2)  
50. Create Your Hogwarts RPG Character | PDF | Artificial Mythology \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/455980352/Hogwarts-RPG-Player-Kit](https://www.scribd.com/document/455980352/Hogwarts-RPG-Player-Kit)  
51. Hogwarts RPG Full Game PDF | PDF | Harry Potter | Contemporary Fantasy Novels \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/477561666/Hogwarts-RPG-Full-Game-pdf](https://www.scribd.com/document/477561666/Hogwarts-RPG-Full-Game-pdf)  
52. This Harry Potter TTRPG Allows Hogwarts Legacy Fans to Make Their Own Adventures \- CBR, accessed May 4, 2026, [https://www.cbr.com/harry-potter-ttrpg-hogwarts-legacy-fans/](https://www.cbr.com/harry-potter-ttrpg-hogwarts-legacy-fans/)  
53. System to use for Hogwarts themed TTRPG for daughter? : r/rpg \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/rpg/comments/a1xrdb/system\_to\_use\_for\_hogwarts\_themed\_ttrpg\_for/](https://www.reddit.com/r/rpg/comments/a1xrdb/system_to_use_for_hogwarts_themed_ttrpg_for/)  
54. What are some newer and not main stream RPG systems you would recommend? \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/rpg/comments/mn37rl/what\_are\_some\_newer\_and\_not\_main\_stream\_rpg/](https://www.reddit.com/r/rpg/comments/mn37rl/what_are_some_newer_and_not_main_stream_rpg/)  
55. How to structure your master prompt for better AI roleplay : r/SillyTavernAI \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/1qjttdl/how\_to\_structure\_your\_master\_prompt\_for\_better\_ai/](https://www.reddit.com/r/SillyTavernAI/comments/1qjttdl/how_to_structure_your_master_prompt_for_better_ai/)  
56. World Info | docs.ST.app \- SillyTavern Documentation, accessed May 4, 2026, [https://docs.sillytavern.app/usage/core-concepts/worldinfo/](https://docs.sillytavern.app/usage/core-concepts/worldinfo/)  
57. Module 2: Prompt Structure & Role Engineering | by Anil Gurindapalli | Medium, accessed May 4, 2026, [https://medium.com/@agurindapalli/module-2-prompt-structure-role-engineering-a902e8888637](https://medium.com/@agurindapalli/module-2-prompt-structure-role-engineering-a902e8888637)  
58. Accio Database \- KP Data Dev, accessed May 4, 2026, [https://kpdata.dev/blog/accio-database/](https://kpdata.dev/blog/accio-database/)  
59. Harry potter and the accessing of apis \- Dan Keefe, accessed May 4, 2026, [https://peritract.github.io/2020/05/31/harry-potter/](https://peritract.github.io/2020/05/31/harry-potter/)  
60. Public API Lists \- GitHub, accessed May 4, 2026, [https://github.com/public-api-lists/public-api-lists](https://github.com/public-api-lists/public-api-lists)  
61. How large should a lorebook be, and what's the right format for entries? \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/1rp2drp/how\_large\_should\_a\_lorebook\_be\_and\_whats\_the/](https://www.reddit.com/r/SillyTavernAI/comments/1rp2drp/how_large_should_a_lorebook_be_and_whats_the/)  
62. Rookie here, hoping you can give me pointers regarding lorebooks. : r/SillyTavernAI \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/198gr11/rookie\_here\_hoping\_you\_can\_give\_me\_pointers/](https://www.reddit.com/r/SillyTavernAI/comments/198gr11/rookie_here_hoping_you_can_give_me_pointers/)  
63. Overall, what's the best settings for Lorebooks? : r/SillyTavernAI \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/1q920pl/overall\_whats\_the\_best\_settings\_for\_lorebooks/](https://www.reddit.com/r/SillyTavernAI/comments/1q920pl/overall_whats_the_best_settings_for_lorebooks/)  
64. \[FEATURE\_REQUEST\] Max Depth for Lorebook Recursion · Issue \#2622 \- GitHub, accessed May 4, 2026, [https://github.com/SillyTavern/SillyTavern/issues/2622](https://github.com/SillyTavern/SillyTavern/issues/2622)  
65. Advanced Formatting | docs.ST.app \- SillyTavern Documentation, accessed May 4, 2026, [https://docs.sillytavern.app/usage/core-concepts/advancedformatting/](https://docs.sillytavern.app/usage/core-concepts/advancedformatting/)  
66. Character card best practices? : r/SillyTavernAI \- Reddit, accessed May 4, 2026, [https://www.reddit.com/r/SillyTavernAI/comments/1qhckxu/character\_card\_best\_practices/](https://www.reddit.com/r/SillyTavernAI/comments/1qhckxu/character_card_best_practices/)  
67. Analysis of House Traits Distribution According to Harry Potter Top Trumps Card Games, accessed May 4, 2026, [https://www.reddit.com/r/harrypotter/comments/9axll4/analysis\_of\_house\_traits\_distribution\_according/](https://www.reddit.com/r/harrypotter/comments/9axll4/analysis_of_house_traits_distribution_according/)  
68. Harry Potter | What does your Hogwarts house say about you? \- Wizarding World, accessed May 4, 2026, [https://www.harrypotter.com/features/hogwarts-house-meanings](https://www.harrypotter.com/features/hogwarts-house-meanings)  
69. Harry Potter RPG Character Creation Guide | PDF | Magician (Fantasy) \- Scribd, accessed May 4, 2026, [https://www.scribd.com/document/144365476/Harry-Potter-and-the-Roleplaying-Game](https://www.scribd.com/document/144365476/Harry-Potter-and-the-Roleplaying-Game)