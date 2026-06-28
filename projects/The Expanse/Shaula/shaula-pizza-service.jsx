import { useState, useEffect, useCallback, useRef } from "react";

const INGREDIENTS = {
  base: { name: "Flatbread", emoji: "🫓", color: "#D4A574" },
  sauce: { name: "Tomato Sauce", emoji: "🍅", color: "#C0392B" },
  cheese: { name: "Millet Cheese", emoji: "🧀", color: "#F4D03F" },
  oil: { name: "Marigold Oil", emoji: "🫒", color: "#7D8A2E" },
  veg: { name: "Roasted Veg", emoji: "🥕", color: "#E67E22" },
  greens: { name: "Pickled Greens", emoji: "🥬", color: "#27AE60" },
  protein: { name: "Sliced Protein", emoji: "🥩", color: "#A0522D" },
  bean: { name: "Bean Paste", emoji: "🫘", color: "#8B4513" },
};

const CHARACTERS = [
  {
    name: "Kit",
    title: "Sergeant Solano",
    order: ["base", "sauce", "cheese", "oil"],
    quote: "Plain. Nothing extra.",
    perfectQuote: "...bist. That is — acceptable pizza.",
    okQuote: "I have eaten worse in the Marines.",
    badQuote: "Surveyor. This is — not food.",
    color: "#5B7FA5",
  },
  {
    name: "Naima",
    title: "Captain Tessek",
    order: ["base", "sauce", "cheese"],
    quote: "Minimal. Do not — overwork it.",
    perfectQuote: "Bist, surveyor. You can cook and fly.",
    okQuote: "Acceptable. Like your landings.",
    badQuote: "I would not let you fly after making this.",
    color: "#8B6F5C",
  },
  {
    name: "Leksi",
    title: "Engineer Volkov",
    order: ["base", "sauce", "cheese", "veg", "protein", "oil"],
    quote: "Everything. Pallas style. One plate.",
    perfectQuote: "Setara mi — that is REAL food, beratna!",
    okQuote: "Bist. Needs more — but bist.",
    badQuote: "On Pallas we would send this back. Twice.",
    color: "#C0855C",
  },
  {
    name: "Aanya",
    title: "Doctor Voltaire",
    order: ["base", "sauce", "cheese", "greens", "oil"],
    quote: "Greens. Oil. Precise, please.",
    perfectQuote: "...that is — a good pizza, Caleb.",
    okQuote: "Edible. I am grading generously.",
    badQuote: "I am putting this in your chart.",
    color: "#6B8E8E",
  },
  {
    name: "Mags",
    title: "Dr. Hwang-Adelakun",
    order: ["base", "sauce", "cheese", "cheese", "veg"],
    quote: "Extra cheese. Roasted vegetables. I am — monitoring my patient's cooking.",
    perfectQuote: "Best pizza I have had in 23 years on this site.",
    okQuote: "Medically adequate. I am noting that.",
    badQuote: "I am prescribing you — cooking lessons.",
    color: "#7B6B8E",
  },
  {
    name: "Femi",
    title: "Safety Director Adelakun",
    order: ["base", "sauce", "cheese", "protein"],
    quote: "Just pizza. I am eating and leaving.",
    perfectQuote: "...surveyor. This is — not what I expected. Taki.",
    okQuote: "The form says — adequate.",
    badQuote: "I am filing an incident report on this pizza.",
    color: "#5C6B5C",
  },
  {
    name: "Ife",
    title: "Clerk Adeyemi",
    order: ["base", "sauce", "cheese", "veg", "greens", "oil"],
    quote: "I — whatever you recommend? I have never — had pizza.",
    perfectQuote: "Caleb! This is — this is FOOD! Real food!",
    okQuote: "It is — good? I think it is good. Is it good?",
    badQuote: "I — bist. I am sure it is fine. Taki.",
    color: "#D4849A",
  },
  {
    name: "Adina",
    title: "Safety Officer Femi-Lopez",
    order: ["base", "sauce", "cheese", "bean", "oil"],
    quote: "Bean paste. Oil. Do not — tell my father I ordered differently than him.",
    perfectQuote: "Caleb. Bist. You are — forgiven for one thing today.",
    okQuote: "The pizza is adequate. Like your safety awareness.",
    badQuote: "Papa was right to be suspicious of contractors.",
    color: "#8E7B5C",
  },
  {
    name: "Yara",
    title: "Pallas Eng — Solano",
    order: ["base", "sauce", "cheese", "protein", "oil"],
    quote: "Yusra's cousin's boyfriend's pizza. Pressure is ON.",
    perfectQuote: "Okay. I will tell Yusra's aunt you can cook.",
    okQuote: "You are — lucky my cousin likes you.",
    badQuote: "I am comming Yusra's aunt immediately.",
    color: "#A07858",
  },
  {
    name: "Maja",
    title: "Pallas Eng — Kovačević",
    order: ["base", "sauce", "cheese", "greens", "veg"],
    quote: "Vegetables. And — make it good, tumang.",
    perfectQuote: "Five points. All of them — for the pizza.",
    okQuote: "Three points. Room for improvement.",
    badQuote: "Minus two points. Reconsider your choices.",
    color: "#7899A0",
  },
  {
    name: "Regular",
    title: "Azorana Diner",
    order: ["base", "sauce", "cheese", "oil"],
    quote: "The special, please.",
    perfectQuote: "Hey — this is actually good.",
    okQuote: "Bist. Food is food.",
    badQuote: "I will stick to the stew next time.",
    color: "#888780",
  },
  {
    name: "Regular",
    title: "Azorana Diner",
    order: ["base", "sauce", "cheese", "protein", "veg"],
    quote: "The special. Extra toppings.",
    perfectQuote: "Beryl — who IS this guy?",
    okQuote: "Not bad for a contractor.",
    badQuote: "Beryl, are you — letting contractors cook now?",
    color: "#888780",
  },
];

const BERYL_COMMENTS = {
  fast: [
    "Faster than I expected, surveyor.",
    "Bist. You work quick.",
    "That speed is — acceptable.",
  ],
  slow: [
    "Surveyor. My grandmother moved faster. On Ceres. At 0.3 g.",
    "The diner is aging, surveyor.",
    "I said dinner service, not breakfast tomorrow.",
  ],
  perfect: [
    "Bist. That is — a pizza.",
    "Suki's oil on my dough. It works.",
    "The cheese held. Taki, Yusra.",
  ],
  wrong: [
    "Surveyor. That is not what they ordered.",
    "Read the ticket. Then cook. In that order.",
    "Did you — file this pizza the way you file your reports?",
  ],
  noBase: [
    "Surveyor. You are putting sauce on — nothing.",
    "The base goes FIRST. This is not — advanced.",
  ],
};

const YUSRA_COMMENTS = [
  "The sauce needs — thirty more seconds.",
  "Caleb. The cheese crumbles, it does not slice.",
  "Bist. That one is — correct.",
  "You are — doing the thing where you rush.",
  "The oil goes LAST, Caleb. Last.",
];

export default function PizzaService() {
  const [gameState, setGameState] = useState("menu"); 
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPizza, setCurrentPizza] = useState([]);
  const [score, setScore] = useState({ perfect: 0, ok: 0, bad: 0 });
  const [totalServed, setTotalServed] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [berylComment, setBerylComment] = useState(null);
  const [yusraComment, setYusraComment] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [orderTimer, setOrderTimer] = useState(0);
  const [orderQueue, setOrderQueue] = useState([]);
  const [servedResults, setServedResults] = useState([]);
  const [round, setRound] = useState(0);
  const timerRef = useRef(null);
  const orderTimerRef = useRef(null);

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const startGame = useCallback(() => {
    const queue = shuffleArray(CHARACTERS);
    setOrderQueue(queue);
    setOrders([]);
    setCurrentOrder(null);
    setCurrentPizza([]);
    setScore({ perfect: 0, ok: 0, bad: 0 });
    setTotalServed(0);
    setFeedback(null);
    setBerylComment(null);
    setYusraComment(null);
    setServedResults([]);
    setRound(0);
    setTimeLeft(180);
    setGameState("playing");
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setGameState("results");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (currentOrder) return;
    if (round >= CHARACTERS.length) {
      clearInterval(timerRef.current);
      setGameState("results");
      return;
    }
    const timer = setTimeout(() => {
      const nextChar = orderQueue[round];
      if (nextChar) {
        setCurrentOrder(nextChar);
        setCurrentPizza([]);
        setOrderTimer(30);
        setFeedback(null);
        if (Math.random() > 0.6) {
          setYusraComment(YUSRA_COMMENTS[Math.floor(Math.random() * YUSRA_COMMENTS.length)]);
          setTimeout(() => setYusraComment(null), 3000);
        }
      }
    }, round === 0 ? 500 : 1500);
    return () => clearTimeout(timer);
  }, [gameState, currentOrder, round, orderQueue]);

  useEffect(() => {
    if (!currentOrder || gameState !== "playing") return;
    orderTimerRef.current = setInterval(() => {
      setOrderTimer((t) => {
        if (t <= 1) {
          clearInterval(orderTimerRef.current);
          servePizza(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(orderTimerRef.current);
  }, [currentOrder, gameState]);

  const addIngredient = (key) => {
    if (!currentOrder || gameState !== "playing") return;
    if (currentPizza.length === 0 && key !== "base") {
      const c = BERYL_COMMENTS.noBase[Math.floor(Math.random() * BERYL_COMMENTS.noBase.length)];
      setBerylComment(c);
      setTimeout(() => setBerylComment(null), 2500);
      return;
    }
    setCurrentPizza((p) => [...p, key]);
  };

  const servePizza = (timedOut = false) => {
    clearInterval(orderTimerRef.current);
    if (!currentOrder) return;

    const order = currentOrder.order;
    const pizza = currentPizza;

    let quality;
    if (timedOut && pizza.length === 0) {
      quality = "bad";
    } else {
      const orderStr = order.join(",");
      const pizzaStr = pizza.join(",");
      if (orderStr === pizzaStr) {
        quality = "perfect";
      } else {
        const orderSet = {};
        order.forEach((i) => (orderSet[i] = (orderSet[i] || 0) + 1));
        const pizzaSet = {};
        pizza.forEach((i) => (pizzaSet[i] = (pizzaSet[i] || 0) + 1));
        let matches = 0;
        let total = 0;
        const allKeys = new Set([...Object.keys(orderSet), ...Object.keys(pizzaSet)]);
        allKeys.forEach((k) => {
          const o = orderSet[k] || 0;
          const p = pizzaSet[k] || 0;
          matches += Math.min(o, p);
          total += Math.max(o, p);
        });
        const accuracy = total > 0 ? matches / total : 0;
        if (accuracy >= 0.75 && pizza.includes("base") && pizza.includes("sauce")) {
          quality = "ok";
        } else {
          quality = "bad";
        }
      }
    }

    const speedBonus = orderTimer > 20 ? "fast" : orderTimer < 8 ? "slow" : null;

    let quote;
    if (quality === "perfect") quote = currentOrder.perfectQuote;
    else if (quality === "ok") quote = currentOrder.okQuote;
    else quote = currentOrder.badQuote;

    const result = {
      name: currentOrder.name,
      title: currentOrder.title,
      quality,
      quote,
      color: currentOrder.color,
      timeLeft: orderTimer,
    };

    setServedResults((r) => [...r, result]);
    setScore((s) => ({ ...s, [quality]: s[quality] + 1 }));
    setTotalServed((t) => t + 1);
    setFeedback(result);

    if (speedBonus) {
      const comments = BERYL_COMMENTS[speedBonus];
      setBerylComment(comments[Math.floor(Math.random() * comments.length)]);
    } else if (quality === "bad") {
      const comments = BERYL_COMMENTS.wrong;
      setBerylComment(comments[Math.floor(Math.random() * comments.length)]);
    } else if (quality === "perfect") {
      const comments = BERYL_COMMENTS.perfect;
      setBerylComment(comments[Math.floor(Math.random() * comments.length)]);
    }

    setTimeout(() => {
      setFeedback(null);
      setBerylComment(null);
      setCurrentOrder(null);
      setCurrentPizza([]);
      setRound((r) => r + 1);
    }, 2500);
  };

  const getGrade = () => {
    const { perfect, ok, bad } = score;
    const total = perfect + ok + bad;
    if (total === 0) return { grade: "F", desc: "You did not serve a single pizza.", narrative: "bad" };
    const pct = ((perfect * 3 + ok * 1.5) / (total * 3)) * 100;
    if (pct >= 90) return { grade: "S", desc: "Beryl asked if you want a permanent kitchen slot.", narrative: "perfect" };
    if (pct >= 75) return { grade: "A", desc: "Beryl nodded. That is — the highest compliment she gives.", narrative: "great" };
    if (pct >= 60) return { grade: "B", desc: "Beryl said 'bist.' The kitchen survived.", narrative: "good" };
    if (pct >= 40) return { grade: "C", desc: "Beryl looked at you the way she looks at bad dough.", narrative: "ok" };
    if (pct >= 20) return { grade: "D", desc: "Beryl took the spatula from your hands.", narrative: "bad" };
    return { grade: "F", desc: "Beryl asked you to leave her kitchen. Forever.", narrative: "terrible" };
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (gameState === "menu") {
    return (
      <div style={{
        fontFamily: "'Courier New', monospace",
        background: "linear-gradient(135deg, #1a1410 0%, #2a1f18 50%, #1a1410 100%)",
        color: "#E8DCC8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ fontSize: 48, marginBottom: 8, filter: "grayscale(0.3)" }}>🍕</div>
          <h1 style={{ fontSize: 28, fontWeight: "bold", letterSpacing: 2, margin: "0 0 4px 0", color: "#F4D03F" }}>
            BERYL'S KITCHEN
          </h1>
          <p style={{ fontSize: 12, letterSpacing: 4, color: "#A09880", margin: "0 0 24px 0" }}>
            DINNER SERVICE — DAY 5
          </p>
          <div style={{
            background: "rgba(244,208,63,0.08)",
            border: "1px solid rgba(244,208,63,0.2)",
            borderRadius: 8,
            padding: "20px",
            marginBottom: 24,
            textAlign: "left",
            fontSize: 13,
            lineHeight: 1.8,
          }}>
            <p style={{ margin: "0 0 12px 0", color: "#F4D03F", fontWeight: "bold" }}>KITCHEN RULES</p>
            <p style={{ margin: "0 0 8px 0" }}>▸ Orders arrive. Read the ticket. Cook what they asked for.</p>
            <p style={{ margin: "0 0 8px 0" }}>▸ Base goes FIRST. Always. Beryl will yell.</p>
            <p style={{ margin: "0 0 8px 0" }}>▸ Click ingredients in order. Then hit SERVE.</p>
            <p style={{ margin: "0 0 8px 0" }}>▸ Speed matters. Accuracy matters more.</p>
            <p style={{ margin: "0 0 8px 0" }}>▸ 30 seconds per order. 3 minutes total service.</p>
            <p style={{ margin: 0, color: "#A09880", fontStyle: "italic" }}>▸ Beryl is watching. Yusra is watching. Do not embarrass yourself.</p>
          </div>
          <button
            onClick={startGame}
            style={{
              background: "#C0392B",
              color: "#FFF",
              border: "none",
              padding: "14px 48px",
              fontSize: 16,
              fontFamily: "'Courier New', monospace",
              letterSpacing: 3,
              cursor: "pointer",
              borderRadius: 4,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#E74C3C"; e.target.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.target.style.background = "#C0392B"; e.target.style.transform = "scale(1)"; }}
          >
            START SERVICE
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "results") {
    const { grade, desc, narrative } = getGrade();
    const gradeColors = { S: "#F4D03F", A: "#27AE60", B: "#3498DB", C: "#E67E22", D: "#C0392B", F: "#8B0000" };
    return (
      <div style={{
        fontFamily: "'Courier New', monospace",
        background: "linear-gradient(135deg, #1a1410 0%, #2a1f18 50%, #1a1410 100%)",
        color: "#E8DCC8",
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <h1 style={{ fontSize: 24, letterSpacing: 2, color: "#F4D03F", margin: "0 0 4px 0" }}>SERVICE COMPLETE</h1>
        <p style={{ fontSize: 12, color: "#A09880", letterSpacing: 3, margin: "0 0 24px 0" }}>BERYL'S KITCHEN — DAY 5</p>

        <div style={{
          fontSize: 72,
          fontWeight: "bold",
          color: gradeColors[grade],
          textShadow: `0 0 30px ${gradeColors[grade]}40`,
          margin: "0 0 8px 0",
        }}>
          {grade}
        </div>
        <p style={{ fontSize: 14, color: "#A09880", margin: "0 0 24px 0", textAlign: "center", maxWidth: 400 }}>{desc}</p>

        <div style={{ display: "flex", gap: 32, marginBottom: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "#27AE60", fontWeight: "bold" }}>{score.perfect}</div>
            <div style={{ fontSize: 11, color: "#A09880", letterSpacing: 2 }}>PERFECT</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "#E67E22", fontWeight: "bold" }}>{score.ok}</div>
            <div style={{ fontSize: 11, color: "#A09880", letterSpacing: 2 }}>OKAY</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "#C0392B", fontWeight: "bold" }}>{score.bad}</div>
            <div style={{ fontSize: 11, color: "#A09880", letterSpacing: 2 }}>BAD</div>
          </div>
        </div>

        <div style={{
          width: "100%",
          maxWidth: 500,
          background: "rgba(244,208,63,0.05)",
          border: "1px solid rgba(244,208,63,0.15)",
          borderRadius: 8,
          padding: "16px",
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 12, color: "#F4D03F", letterSpacing: 2, margin: "0 0 12px 0" }}>SERVICE LOG</p>
          {servedResults.map((r, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: i < servedResults.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <div>
                <span style={{ color: r.color, fontWeight: "bold", fontSize: 13 }}>{r.name}</span>
                <span style={{ color: "#A09880", fontSize: 11, marginLeft: 8 }}>{r.title}</span>
              </div>
              <div style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 3,
                background: r.quality === "perfect" ? "rgba(39,174,96,0.2)" : r.quality === "ok" ? "rgba(230,126,34,0.2)" : "rgba(192,57,43,0.2)",
                color: r.quality === "perfect" ? "#27AE60" : r.quality === "ok" ? "#E67E22" : "#C0392B",
              }}>
                {r.quality.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          width: "100%",
          maxWidth: 500,
          background: "rgba(192,57,43,0.08)",
          border: "1px solid rgba(192,57,43,0.2)",
          borderRadius: 8,
          padding: "16px",
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 12, color: "#C0392B", margin: "0 0 8px 0" }}>NARRATIVE CONSEQUENCE</p>
          <p style={{ fontSize: 13, color: "#E8DCC8", margin: 0, lineHeight: 1.6 }}>
            {narrative === "perfect" && "The kitchen is quiet. Beryl sets down her spatula. Yusra is leaning on the prep counter looking at you with — the thing in her eyes. Every plate came back clean. Ife is asking Yenetta if she can come back next week. Femi ate two. Kit almost smiled. Naima said bist and meant it. You have earned something tonight that is not in any contract."}
            {narrative === "great" && "Beryl tips her chin at you across the kitchen. One nod. The plates came back mostly clean. Yusra's sauce held. The millet cheese worked. Your guests are talking at their tables — cross-corporate, cross-crew, cross-everything — and nobody is thinking about the forms."}
            {narrative === "good" && "The kitchen survived. Beryl had to step in twice. Yusra covered for you on the sauce timing once. Most of the pizzas landed. A few did not. But — the room is full, the tables are warm, and Ife is eating tier-three food for the first time in fourteen months. That counts."}
            {narrative === "ok" && "Beryl took the spatula from you for the last three orders. Yusra's mouth went flat. The regulars got better pizza than your guests because Beryl made theirs. But — people ate. People talked. The evening happened. It was not the evening you planned."}
            {narrative === "bad" && "Beryl asked you to step out of the kitchen. Yusra finished service alone. You watched from the dining room while your guests ate pizza you did not make. Kit looked at you once and looked away. Mags wrote something in her notepad. The evening happened — without you in the kitchen."}
            {narrative === "terrible" && "Beryl closed the kitchen early. Yusra did not look at you. The millet cheese went unused. Yenetta served the backup cheese on Beryl's standard flatbread and called it the special. Your guests ate. They were kind about it. That was worse than if they had not been."}
          </p>
        </div>

        <button
          onClick={() => {
            setGameState("menu");
            setServedResults([]);
          }}
          style={{
            background: "transparent",
            color: "#F4D03F",
            border: "1px solid #F4D03F",
            padding: "10px 32px",
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 2,
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          SERVICE AGAIN
        </button>
        <button
          onClick={() => sendPrompt(
            narrative === "perfect" || narrative === "great"
              ? `[The dinner service went brilliantly. Grade: ${grade}. ${score.perfect} perfect, ${score.ok} okay, ${score.bad} bad. Continue the evening — the heart-shaped pizzas and the private table with Yusra.]`
              : narrative === "good" || narrative === "ok"
              ? `[The dinner service went okay. Grade: ${grade}. ${score.perfect} perfect, ${score.ok} okay, ${score.bad} bad. Beryl had to help. Continue the evening — Caleb is a little humbled but the heart-shaped pizzas are next.]`
              : `[The dinner service went poorly. Grade: ${grade}. ${score.perfect} perfect, ${score.ok} okay, ${score.bad} bad. Continue the evening — Caleb needs to recover from this.]`
          )}
          style={{
            background: "#C0392B",
            color: "#FFF",
            border: "none",
            padding: "10px 32px",
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 2,
            cursor: "pointer",
            borderRadius: 4,
            marginTop: 8,
          }}
        >
          CONTINUE THE EVENING →
        </button>
      </div>
    );
  }

  // PLAYING STATE
  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      background: "linear-gradient(135deg, #1a1410 0%, #2a1f18 50%, #1a1410 100%)",
      color: "#E8DCC8",
      minHeight: "100vh",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        padding: "8px 12px",
        background: "rgba(244,208,63,0.08)",
        borderRadius: 6,
        border: "1px solid rgba(244,208,63,0.15)",
      }}>
        <div>
          <span style={{ fontSize: 11, color: "#A09880", letterSpacing: 2 }}>SERVICE </span>
          <span style={{ fontSize: 16, color: "#F4D03F", fontWeight: "bold" }}>{formatTime(timeLeft)}</span>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
          <span style={{ color: "#27AE60" }}>✓ {score.perfect}</span>
          <span style={{ color: "#E67E22" }}>~ {score.ok}</span>
          <span style={{ color: "#C0392B" }}>✗ {score.bad}</span>
        </div>
        <div>
          <span style={{ fontSize: 11, color: "#A09880", letterSpacing: 2 }}>SERVED </span>
          <span style={{ fontSize: 16, color: "#E8DCC8", fontWeight: "bold" }}>{totalServed}/{CHARACTERS.length}</span>
        </div>
      </div>

      {/* Order Ticket */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "14px",
        marginBottom: 12,
        minHeight: 100,
      }}>
        {currentOrder ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ color: currentOrder.color, fontWeight: "bold", fontSize: 16 }}>{currentOrder.name}</span>
                <span style={{ color: "#A09880", fontSize: 11, marginLeft: 8 }}>{currentOrder.title}</span>
              </div>
              <div style={{
                fontSize: 18,
                fontWeight: "bold",
                color: orderTimer > 15 ? "#27AE60" : orderTimer > 7 ? "#E67E22" : "#C0392B",
              }}>
                {orderTimer}s
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#E8DCC8", margin: "0 0 10px 0", fontStyle: "italic", lineHeight: 1.5 }}>
              "{currentOrder.quote}"
            </p>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: "#A09880", letterSpacing: 1, marginRight: 4, alignSelf: "center" }}>WANTS:</span>
              {currentOrder.order.map((ing, i) => (
                <span key={i} style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 3,
                  background: `${INGREDIENTS[ing].color}20`,
                  color: INGREDIENTS[ing].color,
                  border: `1px solid ${INGREDIENTS[ing].color}40`,
                }}>
                  {INGREDIENTS[ing].emoji} {INGREDIENTS[ing].name}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: 20, color: "#A09880", fontSize: 13 }}>
            {round >= CHARACTERS.length ? "Service complete..." : "Next order incoming..."}
          </div>
        )}
      </div>

      {/* Your Pizza */}
      <div style={{
        background: "rgba(212,165,116,0.08)",
        border: "1px solid rgba(212,165,116,0.2)",
        borderRadius: 8,
        padding: "12px",
        marginBottom: 12,
        minHeight: 48,
      }}>
        <span style={{ fontSize: 10, color: "#A09880", letterSpacing: 2 }}>YOUR PIZZA: </span>
        {currentPizza.length === 0 ? (
          <span style={{ fontSize: 12, color: "#5C5546", fontStyle: "italic" }}> empty — add ingredients below</span>
        ) : (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
            {currentPizza.map((ing, i) => (
              <span key={i} style={{
                fontSize: 18,
                transition: "all 0.2s",
                animation: "pop 0.3s ease-out",
              }}>
                {INGREDIENTS[ing].emoji}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 6,
        marginBottom: 12,
      }}>
        {Object.entries(INGREDIENTS).map(([key, ing]) => (
          <button
            key={key}
            onClick={() => addIngredient(key)}
            disabled={!currentOrder}
            style={{
              background: `${ing.color}15`,
              border: `1px solid ${ing.color}40`,
              borderRadius: 6,
              padding: "10px 4px",
              cursor: currentOrder ? "pointer" : "not-allowed",
              opacity: currentOrder ? 1 : 0.4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "all 0.15s",
              fontFamily: "'Courier New', monospace",
            }}
            onMouseEnter={(e) => { if (currentOrder) { e.target.style.background = `${ing.color}30`; e.target.style.transform = "scale(1.05)"; }}}
            onMouseLeave={(e) => { e.target.style.background = `${ing.color}15`; e.target.style.transform = "scale(1)"; }}
          >
            <span style={{ fontSize: 22 }}>{ing.emoji}</span>
            <span style={{ fontSize: 9, color: ing.color, letterSpacing: 0.5 }}>{ing.name}</span>
          </button>
        ))}
      </div>

      {/* Serve / Clear */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => servePizza(false)}
          disabled={!currentOrder || currentPizza.length === 0}
          style={{
            flex: 2,
            background: currentOrder && currentPizza.length > 0 ? "#27AE60" : "#333",
            color: "#FFF",
            border: "none",
            padding: "14px",
            fontSize: 15,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 3,
            cursor: currentOrder && currentPizza.length > 0 ? "pointer" : "not-allowed",
            borderRadius: 6,
            fontWeight: "bold",
            transition: "all 0.2s",
          }}
        >
          🍕 SERVE
        </button>
        <button
          onClick={() => setCurrentPizza([])}
          disabled={!currentOrder || currentPizza.length === 0}
          style={{
            flex: 1,
            background: "rgba(192,57,43,0.2)",
            color: "#C0392B",
            border: "1px solid rgba(192,57,43,0.3)",
            padding: "14px",
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 2,
            cursor: currentOrder && currentPizza.length > 0 ? "pointer" : "not-allowed",
            borderRadius: 6,
            opacity: currentOrder && currentPizza.length > 0 ? 1 : 0.4,
          }}
        >
          CLEAR
        </button>
      </div>

      {/* Feedback area */}
      <div style={{ minHeight: 80 }}>
        {feedback && (
          <div style={{
            background: feedback.quality === "perfect" ? "rgba(39,174,96,0.12)" : feedback.quality === "ok" ? "rgba(230,126,34,0.12)" : "rgba(192,57,43,0.12)",
            border: `1px solid ${feedback.quality === "perfect" ? "rgba(39,174,96,0.3)" : feedback.quality === "ok" ? "rgba(230,126,34,0.3)" : "rgba(192,57,43,0.3)"}`,
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 6,
            animation: "fadeIn 0.3s ease-out",
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: "bold",
              color: feedback.quality === "perfect" ? "#27AE60" : feedback.quality === "ok" ? "#E67E22" : "#C0392B",
              marginBottom: 4,
            }}>
              {feedback.quality === "perfect" ? "★ PERFECT" : feedback.quality === "ok" ? "~ OKAY" : "✗ WRONG"}
            </div>
            <p style={{ fontSize: 12, color: "#E8DCC8", margin: 0, fontStyle: "italic" }}>
              <span style={{ color: feedback.color, fontWeight: "bold" }}>{feedback.name}:</span> "{feedback.quote}"
            </p>
          </div>
        )}
        {berylComment && (
          <div style={{
            background: "rgba(244,208,63,0.08)",
            border: "1px solid rgba(244,208,63,0.15)",
            borderRadius: 6,
            padding: "8px 14px",
            marginBottom: 6,
          }}>
            <p style={{ fontSize: 12, color: "#F4D03F", margin: 0 }}>
              <span style={{ fontWeight: "bold" }}>Beryl:</span> "{berylComment}"
            </p>
          </div>
        )}
        {yusraComment && (
          <div style={{
            background: "rgba(93,202,165,0.08)",
            border: "1px solid rgba(93,202,165,0.15)",
            borderRadius: 6,
            padding: "8px 14px",
          }}>
            <p style={{ fontSize: 12, color: "#5DCAA5", margin: 0 }}>
              <span style={{ fontWeight: "bold" }}>Yusra:</span> "{yusraComment}"
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
