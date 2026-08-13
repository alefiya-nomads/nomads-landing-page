/**
 * Verbatim copy for the Compounding RPV™ OS landing page.
 *
 * SOURCE OF TRUTH: "In Progress Deliverables 2.0_Nomads Quiz Project.docx"
 * as transcribed section-by-section into design.md's
 * "ADDENDUM: RPV Diagnostic Quiz Landing Page" (Section 2).
 *
 * Every string below is copied verbatim, unshortened. Where the source
 * doc left copy unwritten or contradicts itself, that is marked with
 * `todo: true` / a `note` field instead of inventing text — see
 * design.md addendum Section 3 for the full list of what the HTML POC
 * got wrong and why these values differ from it.
 */

export const hero = {
  eyebrow: [
    "For founders and marketing teams spending $10k+ a month on traffic who want $1.5M more a year without increasing marketing spend:",
    "You already track how many visitors you get.",
    "You've probably never known how much revenue each visitor brings in.",
    "That's your Revenue Per Visitor™. Increase how much you earn per visitor, and you can grow your revenue by $1.5M/year.",
  ],
  headlinePrefix: "What would it take to add an additional $1.5 M/year with your current",
  rotatingWords: [
    "website visitors",
    "ad spend",
    "influencer marketing budget",
    "podcast listeners",
    "LinkedIn profile views",
    "YouTube views",
  ],
  followUp:
    "Because what would change if you made an extra $1.5 million with your current marketing spend?",
  ctaLabel: "Start the Diagnostic Now",
  ctaRisk: "Takes 5 minutes. Costs nothing. You leave with your actual RPV™ number.",
  trustbar: "Preferred Partner of",
  snapshotCard: {
    title: "Your RPV Snapshot",
    currentLabel: "Current RPV",
    current: 1.9,
    potentialLabel: "Potential RPV",
    potential: 5.4,
    fillPercent: 64,
    caption: "The gap is your next $1.5M/year, on the same traffic.",
  },
};

export const notThisEconomy = {
  lines: [
    'This isn’t the economy to continue pouring money down the drain in hopes of getting "more traffic".',
    "At least not until you’re 1000% confident you know your key metrics and can make data-led decisions that’ll convert more of that traffic.",
  ],
};

export const checklistIntro = {
  heading: "Do you have what it takes to add $1.5M/year from your existing marketing spend?",
  sub: "Let's find out:",
  chip: "Check all that apply",
};

/**
 * Each scenario mirrors the docx table's 3-column structure:
 * situation (checkbox label) -> reaction (reveal, left) -> verdict (reveal, right).
 * `score` is only populated where the docx states a number explicitly.
 * `scoreLabel` carries qualitative text ("Highest score") as written.
 */
export const scenarios = [
  {
    id: "cold-ads",
    situation: "You're running cold ads straight to your website or product pages",
    reaction: {
      gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNvYmlqdzczcm54NjNvZHdha3FlNWVxamd1bXRrc2FvZ2lnZWxmOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L2ZvMotUhFJTriAGEm/giphy.gif",
      text:
        "Oopsies, Alex (your visitor) is skeptical, and he's not going to read through six website pages to find the feature, testimonial, or use case relevant to him.",
    },
    verdict: {
      todo: true,
      note:
        "Verdict copy was never written in the source doc — it only contains the author's placeholder note “If they check this box, display”. Do not invent a score/verdict here; this is an open item for Alefiya.",
    },
  },
  {
    id: "ecommerce-20-products",
    situation:
      "For E-commerce founders: You have 20+ products on your website, and your prospect is on their own to figure out which one they should buy",
    reaction: {
      text:
        "Sarah (your visitor) is confused. She asked her husband, her mum, and even her dog. In the end, she asked ChatGPT to suggest a final product and your competitor got the sale",
    },
    verdict: {
      score: 7,
      emoji: "😐",
      lines: [
        "This deserves your full attention.",
        "You didn't spend all that money on brand awareness, ads, and content to lose the customer at the very end.",
        "Ecom brands with a personalised recommendation system are adding millions from the same traffic. See how to build yours.",
      ],
      cta: "START THE DIAGNOSTIC NOW",
    },
  },
  {
    id: "cold-calls-60-percent",
    situation:
      "Pushing cold strangers to book a call through ads, LinkedIn DMs, or cold emails — then spending 60% of the call just educating them on why they should buy",
    reaction: {
      text: "“I've booked calls with 4 other companies, and will choose one after comparing pricing.” ~Your buyer",
    },
    verdict: {
      scoreLabel: "Highest score",
      note:
        "Source doc says “Highest score” as text, not a number. The HTML POC's “5/10” is unsourced — confirm the real number (or keep this qualitative) before launch.",
      emoji: "🤕",
      lines: [
        "This one is costing you the most.",
        "Until this is fixed, you're competing on price by default.",
        "One change to what happens before the call, and you're closing 6-7 out of every 10. See what that change is.",
      ],
      cta: "START THE DIAGNOSTIC NOW",
    },
  },
  {
    id: "influencer-118956-views",
    situation:
      "Your influencer campaigns pulled 118,956 views but the sales didn't even cover the creator's fee (You sent the traffic to the product page)",
    reaction: {
      text:
        '“Hmmmmm, this seems interesting.” “Maybe” “Oh, I forgot to take out the trash” ~Alex’s attention after landing on a product page he wasn’t searching for.',
    },
    verdict: {
      note: "No numeric score given in the source doc. HTML POC's “3/10” is unsourced — confirm before build.",
      emoji: "😬",
      lines: [
        "This one's urgent and worth fixing before the next campaign.",
        "An influencer builds trust but doesn't create demand.",
        "See what to put between the influencer and the product page.",
      ],
      cta: "START THE DIAGNOSTIC NOW",
    },
  },
  {
    id: "podcast-top-1-percent",
    situation:
      "For Creators & Personal Brands. Your podcast is ranked in the top 1% of charts and is getting hundreds of downloads — but your email list isn't growing at the same rate",
    reaction: {
      text:
        "Your buyer listens while driving, gymming, or fighting with his wife. How likely is he to buy a book, download a PDF, or watch a webinar while doing that?",
    },
    verdict: {
      note: "No numeric score given in the source doc. HTML POC's “4/10” is unsourced — confirm before build.",
      emoji: "😅",
      lines: [
        "Yeah, that stings a little.",
        "But hook him with something that takes less than 3 mins, and you've got 'em!",
        "See what he can do with one thumb while he's mid-commute.",
      ],
      cta: "START THE DIAGNOSTIC NOW",
    },
  },
  {
    id: "97-percent-browse-and-leave",
    situation:
      'Getting thousands of website visitors browsing through and leaving because "they\'ll come back when they\'re ready" (Spoiler: 97% of them won\'t)',
    reaction: {
      text:
        "Alex—who's read four blogs, clicked nine retargeting ads, and watched your webinar—might spend five minutes digging through your website. But Alex is just 3 out of every 100 visitors. The other 97% lurk and disappear.",
    },
    verdict: {
      score: 6,
      note: 'HTML POC shows "2/10" for this row — the doc says "Score: 6". Use 6.',
      emoji: "😢",
      lines: [
        "Yeah, that's a problem!",
        "Those lurkers need a different messaging style to hook them.",
        "🟠 Good news: The diagnostic shows you what to put in front of the 97 to convert them into future customers before they close the tab.",
      ],
      cta: "START THE DIAGNOSTIC NOW",
    },
  },
  {
    id: "speaking-gig-room",
    situation:
      'Walking off a stage to a room full of people praising, "This was incredible", and you got 12 people lining up to chat with you further',
    reaction: {
      text: "But the 192 who clapped and left are still potential clients who weren't ready yet. What did they leave with?",
    },
    verdict: {
      score: 6,
      note:
        'Unresolved contradiction in the source: the same cell also contains the separate note "Score 4 (speedometre)". Do not silently pick one — flag to Alefiya which number the gauge should show.',
      lines: [
        "You worked hard to earn that room.",
        "Most speakers walk away from 94% of the room they just warmed up.",
        "See how to turn a speaking gig into new clients every month for years to come.",
      ],
      cta: "START THE DIAGNOSTIC NOW",
    },
  },
];

export const checklistOutro = {
  ctaLabel: "SHOW ME HOW TO ADD $1.5M IN EXTRA REVENUE THIS YEAR",
  sub: "with the same monthly marketing spend",
};

export const mechanism = {
  chip: "The system",
  lines: [
    "Whether you're a SaaS, Tech, agency, course creator, law firm, architecture firm, clinic, or [insert your industry here]...",
    "Our proprietary diagnostic system: [Compounding Revenue Per Vistor ™ Operating System] was built by reverse engineering hundreds of customer journeys and figuring out what makes people go from “I don't think this is for me” to “I need this”.",
  ],
  productionNote: "LINK TO DIAGNOSTIC TO ADD THE SNAPSHOT WHEN IT'S DESIGN-READY",
};

export const problem = {
  chip: "The 97% problem",
  lines: [
    "People who are actively looking for a solution will buy anyway. But what about the rest?",
    "They make up almost 97% of your audience.",
    "Say you're selling medicine for ulcers. Out of 100 people, 3 know they have ulcers and buy immediately. 70 have stomach pain, but they don't know ulcers cause it.",
    'So when your messaging targets the problem ("medicine for ulcers"), you lose the 70 people who genuinely believe they don’t have ulcers.',
    "Even though they do.",
    "Sooo…how do you convince someone who thinks this is not for them (even though it is, yet they don’t see it yet)?",
  ],
  legend: [
    { count: 3, label: "know & buy now" },
    { count: 70, label: "have the pain, don't know the cause" },
    { count: 27, label: "not looking yet" },
  ],
};

export const proofTable = [
  {
    before:
      "An executive coach was getting 2,800 LinkedIn profile views a quarter, but fewer than 500 new subscribers a month and $0 in revenue from emails.",
    after:
      "Our Personality Peak™ quiz got 2,100 subscribers in 35 days, making the client $1,700/day for her subscription offer.",
  },
  {
    before:
      "A course creator made $70K+ from her tiny list (she believed in email potential), but her list was exhausted.",
    after: "Our Champions Challenge™ quiz fuelled a 7,306% list surge within 72 hours.",
  },
  {
    before:
      "An ecommerce business was getting 440K visits, but only 250 demo bookings. At first, that seemed fine, until they realized it added up to just a 0.044% conversion rate.",
    after: "With us, they achieved a 14% conversion rate to their demo video, generating £97,000 in 20 days.",
  },
  {
    before: "A mastermind owner tanked 27 discovery calls, and closed one client.",
    after: "Our positioning strategy (first pillar of C-RPV) closed 29 of the next 31 calls.",
  },
  {
    before:
      "A media business launch grossed $70K with a 6% email click-through rate (CTR). The client thought it was a flex until they saw our 45% CTR and hired us for their next launch.",
    after:
      "With us on board, her next launch hit $150K (double!) and the next one did HALF A MILLION DOLLARS (8X) with the same amount of traffic.",
  },
];

export const proofOutro = {
  chip: "Proof",
  // Moved here from the "97% problem" section — these were the closing
  // transition lines leading into this proof table in the docx.
  intro: "How do you convince them to buy from you?",
  introSub:
    "This question led us to develop a proprietary diagnostic system that has helped our clients get incredible results…",
  heading: "A proprietary diagnostic that's helped clients get results like these.",
  ctaLabel: "SHOW ME HOW TO CONVERT MORE OF THE 97% OF MY TRAFFIC",
  sub: "with the same monthly marketing spend",
};

export const calculator = {
  chip: "Your number",
  lines: [
    "Before you spend another dollar on traffic, find out what your current traffic is actually worth.",
    "A calculator within the diagnostic gives you two numbers.",
    "Your current Revenue Per Visitor™ — how much revenue your business generates, on average, for every person it attracts.",
    "Your potential Revenue Per Visitor™ — what that same traffic is worth once you and your team address the weak spots across four key areas.",
    "The gap between those two numbers is where your next $1.5M/year in additional revenue is sitting.",
  ],
  productionNote: "SHOW THE GIF OF THE CALCULATOR AND THE RESULTS",
  ctaLabel: "SHOW ME MY POTENTIAL RPV™",
  mock: {
    inputs: [
      { label: "Monthly visitors", value: 120000, prefix: "" },
      { label: "Monthly revenue", value: 228000, prefix: "$" },
    ],
    currentLabel: "Current RPV™",
    current: 1.9,
    potentialLabel: "Potential RPV™",
    potential: 5.4,
  },
};

export const fourAreas = {
  intro: "In under 5 minutes, the diagnostic will walk you through all four areas of Compounding RPV OS:",
  areas: [
    {
      n: "AREA 01",
      title: "Maximise Revenue per Visitor™",
      body:
        "5 metrics you need to track, obsess, and optimise if you want to add $1.5M/year to your existing revenue by scaling how much average revenue you earn per visitor.",
    },
    {
      n: "AREA 02",
      title: "Contrarian POV ™",
      body:
        "The positioning strategy we adopted from brands like Oatly, Netflix, and Apple that makes competing on price irrelevant (One client went from $8,000/month to $108,000/month by increasing their close rate from 3.7% to 93.5% with this strategy)",
    },
    {
      n: "AREA 03",
      title: "Speed to Decision ™",
      body:
        "7 buyer hesitations strangling your profit — and how to overcome them so that your buyers are empowered to make a swift *informed* decision",
    },
    {
      n: "AREA 04",
      title: "Compounding Revenue per\nEmail Subscriber ™",
      body:
        "The email metric most 7-figure teams have never tracked — and why 829 subscribers who joined via diagnosis brought 23 sales, while the same email sequence brought one sale from a list of 10,000 subs (you've never thought about email this way)",
    },
  ],
  ctaLabel: "START THE DIAGNOSTIC NOW",
};

export const workshop = {
  chip: "Unlocked after your diagnostic",
  heading: "A private on-demand workshop with Alefiya.",
  lines: [
    "Once you see your potential RPV, you'll want to show your team. The workshop doesn't just give you a structured way to share it, but also to go after the goal together.",
    "Alefiya walks you through the four key areas that take businesses from where they are to an extra $1.5M on the same traffic.",
  ],
  productionNote: "[add handdraw image]",
  closingLines: [
    "In each area, you and your team score yourselves through a set of exercises. That score tells you exactly which area is weakest and where to start.",
    "So instead of leaving with a number and a shrug, you leave with a number and a clear first step toward that $1.5M.",
    "Worth watching with your team. Bring them on!",
  ],
};

export const founder = {
  chip: "Meet the nerd",
  heading: "Wait…meet the marketing nerd behind the Compounding RPV™ OS.",
  intro: {
    hey: "Hey",
    name: "I’m Alefiya!",
    role: "Co-founder and CMO at Nomads Marketing",
  },
  paragraphs: [
    "After years of building million-dollar funnels, I realized that real, sustainable profit comes down to just two things:",
  ],
  numberedList: ["Traffic Quality", "A high-converting ecosystem"],
  paragraphs2: [
    "But even when conversion rates looked good on paper, we still depended on massive amounts of traffic just to hit sales targets.",
    "And it gets worse, nearly 70% of that traffic was gone after just a single visit.",
    'They weren’t given a chance to engage or ask questions. It felt like **we were forcing people into a decision** they hadn’t been primed for: **“Buy or Bye.”**',
    "That changed when I pitched a conversion quiz project to a client.",
    "Not the viral, BuzzFeed-style type, but intentional, insight-led quizzes that convert your visitors into warm leads and store them in a database you own: aka an email list or SMS list.",
    "However… I couldn't find a model that worked across industries.",
    "So, I ditched the typical Buzzfeed quiz funnel knowledge available on the internet and rebuilt the entire strategy from scratch.",
    "I studied hours of real sales calls, demos, and live chats from customers who didn't convert.",
    "That's how **our proprietary system: Compounding Revenue per Visitor™ OS** was born.",
    "A system that helps businesses stop losing the traffic they've already worked hard (and paid) to get by turning those visitors into decision-ready leads.",
    'In under five minutes, a cold visitor can go from "just browsing" to thinking, "This is exactly what I need."',
    "Today, I've helped brands across 15+ industries **maximize their leads and sales** from the traffic they already have.",
  ],
  video: {
    note:
      "Two private Google Drive links given as alternates in the source — not accessible for this build. Get the actual video files from Alefiya; do not guess content. Build this as a video-player frame component ready to receive a real source.",
    driveLinks: [
      "https://drive.google.com/file/d/10arnymVUHq13a0IugJM0ozrwfl4FqDIE/view?usp=sharing",
      "https://drive.google.com/file/d/1P4-VGXecPsSUD3osAW7fUEgavq2XEvCC/view?usp=sharing",
    ],
  },
  testimonials: [
    {
      // Verbatim, unchanged — kept as the single source of truth.
      quote:
        "“She saved me time, and made me so much money, and I am so so so happy that I found her.”\nOver the last two launches, I've made over a $100,000 each (the first grossed $150k and the next did half a million dollars), and a lot of the traffic from those came from email.\nAlefiya to me, she became almost like a second brain when it came to executing the entire thing.\nAnd honestly, with my hand on my heart, I can say that I am so grateful that I had her on my side because I would've lost my head trying to get all of these assets, trying to get all the data, trying to even figure out where to start. She knew exactly where to go, what to give me, and how to get me to execute other things, and that for me is everything.",
      cite: "— Lara Acosta, Forbes 30 under 30. Founder, Literally Academy",
      // Structured view of the exact same words, for the card layout below —
      // headline is the quote's own opening line, body is the remaining
      // paragraphs verbatim. Nothing here is reworded or trimmed.
      name: "Lara Acosta",
      role: "Forbes 30 under 30. Founder, Literally Academy",
      avatarSrc: "/Assets/testimonial/lara.jpg",
      headline: "She saved me time, and made me so much money, and I am so so so happy that I found her.",
      highlightPhrase: "so much money",
      body: [
        "Over the last two launches, **I've made over a $100,000 each** (the first grossed $150k and the next did half a million dollars), and a lot of the traffic from those came from email.",
        "**Alefiya to me, she became almost like a second brain** when it came to executing the entire thing.",
        "And honestly, with my hand on my heart, I can say that I am so grateful that I had her on my side because I would've lost my head trying to get all of these assets, trying to get all the data, trying to even figure out where to start. **She knew exactly where to go, what to give me,** and how to get me to execute other things, and that for me is everything.",
      ],
    },
    {
      quote:
        "Words of advice: never underestimate her.\n‘Gosh, where to even begin with Alefiya.\nA sharp marketing strategist? Check.\nA savvy business mind? Absolutely.\nGoing above and beyond for her clients? It's a value she lives by.\nBut what blows me away about Alefiya is how she's constantly innovating, refining her craft, and re-defining what it means to be a badass marketer/quiz funnel strategist/agency co-owner.\nWords of advice: never underestimate her. Bonus words of advice (cuz why not): Work with her and her team any chance you get.’",
      cite:
        "–Ryan Schwartz, founder of Empire Engineering (The marketer 8-figure giants like Amy Porterfield, Dan Martelle, and Joanna Wiebe)",
      name: "Ryan Schwartz",
      role: "Founder of Empire Engineering",
      avatarSrc: "/Assets/testimonial/ryan.jpg",
      headline: "Words of advice: never underestimate her.",
      highlightPhrase: "never underestimate her",
      body: [
        "‘Gosh, where to even begin with Alefiya.",
        "A sharp marketing strategist? Check.",
        "A savvy business mind? Absolutely.",
        "Going above and beyond for her clients? It's a value she lives by.",
        "But what blows me away about **Alefiya is how she's constantly innovating, refining her craft,** and re-defining what it means to be a badass marketer/quiz funnel strategist/agency co-owner.",
        "**Words of advice: never underestimate her.** Bonus words of advice (cuz why not): Work with her and her team any chance you get.’",
      ],
    },
  ],
};

export const curious = {
  heading: "Aren't you curious how these businesses are adding $1.5M/year in this economy?",
  stats: [
    { target: 350, suffix: "X", label: "Increase in demo conversion rate" },
    { target: 7.14, suffix: "X", decimals: 2, label: "Growth in revenue" },
    { target: 93.5, suffix: "%", decimals: 1, label: "Sales call close rate increased from 3.7% to 93.5%" },
  ],
  cases: [
    {
      company: "Golfbays",
      type: "E-commerce company",
      logoSrc: "/Assets/curious-section/golfsbay.avif",
      text: "An ecommerce brand with 440K monthly Shopify visits scaled from 0.044% web to demo conversion rate to 14% and made £97,000 in 20 days with the same ad spend.",
      caseStudyUrl: "#",
    },
    {
      company: "Lara Acosta",
      type: "Founder of Literally Academy",
      logoSrc: "/Assets/curious-section/lara.jpg",
      text: "A Forbes 30 U 30 media business that grossed $70K on launch with a 6% email CTR came back for the next one and did half a million dollars with the same traffic.",
      caseStudyUrl: "#",
    },
    {
      company: "Video Mastermind",
      type: "",
      text: "A video mastermind owner who'd sat through 27 discovery calls and closed one client. Then closed 29 of the next 31 after repositioning with a Contrarian POV — going from $8,000 to $108,000 a month.",
      caseStudyUrl: "#",
    },
  ],
};

export const footer = {
  lines: [
    "Then let's get you started with this diagnostic, so you can:",
    'Become the savvy founder who can confidently say, "Based on the data, if we optimize this metric, we\'ll add $125k/mo ($1.5M/year)" to your team.',
  ],
  signature: "Compound Revenue per Visitor™ with Alefiya Khoraki & Nomads' Team",
  ctaLabel: "START THE DIAGNOSTIC NOW",
};
