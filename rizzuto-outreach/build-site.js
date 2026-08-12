/* ===========================================================
   Rizzuto Outreach - static site generator
   Run:  node build-site.js
   Builds: index.html, services/*, locations/*, sitemap.xml
   =========================================================== */

const fs = require('fs');
const path = require('path');

const SITE = 'https://rizzuto-outreach.vercel.app';
const EMAIL = 'johnnyrizzuto125@gmail.com';
const ROOT = __dirname;

/* ---------- data: services ---------- */

const SERVICES = [
  {
    slug: 'custom-websites',
    nav: 'Custom Websites',
    card: 'Custom Websites',
    menuNote: 'Built from scratch, not a template',
    h1: 'Websites built for <em>your</em> business.',
    metaTitle: 'Custom Website Design for Local Businesses | Rizzuto Outreach',
    metaDesc:
      'Custom websites designed and built from scratch for local businesses in South Elgin and the Fox Valley. Fast on a phone, easy to read, and built so people call you.',
    blurb:
      'Designed from scratch for your business, your photos, your words. Fast on a phone, easy to read, and built so people call you instead of bouncing.',
    bullets: [
      'Original design &mdash; no recycled template',
      'Mobile-first and genuinely fast',
      'Click-to-call, forms, and directions wired up',
      'Yours to keep, edits included'
    ],
    lede:
      'Most local business sites were built once, years ago, by somebody who never came back. Yours gets designed around how people actually find you now &mdash; on a phone, in a hurry, comparing you against two other shops.',
    featHead: 'What\'s included',
    featH2: 'What goes <em>into</em> it.',
    featSub: 'Every site is built the same careful way, then shaped around what your business actually needs.',
    feats: [
      ['Designed for you', 'We start on a blank page. Your colors, your layout, your photos. Nothing gets recolored off a shelf and handed to you as custom.'],
      ['Fast on a phone', 'Most of your visitors are on a phone with one bar. The site is built light so it loads before they give up and hit the back button.'],
      ['Written like a person', 'Real sentences about what you do, in your voice. Not four paragraphs of filler nobody reads.'],
      ['Built to get a call', 'Tap-to-call, directions, and a form that actually works are never more than a thumb away, on every screen.'],
      ['Search-ready from day one', 'Proper page structure, the technical bits Google needs, and the markup that makes your listing look right in results.'],
      ['You own it', 'It is your website. If we ever part ways, it goes with you &mdash; and small edits are part of the deal, not an invoice.']
    ],
    bandLabel: 'What you end up with',
    bandHead: 'A site that pulls its <em>weight</em>.',
    bandSub: 'Not an online business card. Something that works while you are on a job.',
    checks: [
      'A homepage that says what you do in the first three seconds',
      'A page for each service, so each one can rank on its own',
      'Photos of your actual work, sized so they load fast',
      'Reviews on the page where they change minds',
      'A contact form that lands in your inbox, not a portal',
      'Hours, address, and a map that all match your Google listing'
    ],
    faqs: [
      ['How long does a site take?', 'Most single-page builds are done inside a week once I have your photos and details. Bigger multi-page sites run two to three weeks. You see it before it goes live and you tell me what to change.'],
      ['Do I have to write anything?', 'No. Give me fifteen minutes on the phone about what you do and I will write it, then you read it over and correct anything that is not how you would say it.'],
      ['What if I already have a website?', 'Then we start with an honest look at it. Sometimes the fix is a rebuild, sometimes it is three changes and better local SEO. I will tell you which one it is, even when the answer is the cheaper one.'],
      ['What happens after it is live?', 'Small edits &mdash; hours, prices, a new photo, a new service &mdash; are part of it. You text me, it gets changed. You are not filing a ticket and waiting a week.']
    ]
  },
  {
    slug: 'local-seo',
    nav: 'Local SEO Optimization',
    card: 'Local SEO Optimization',
    menuNote: 'Get found in your own town',
    h1: 'Show up when your town is <em>searching</em>.',
    metaTitle: 'Local SEO for Small Businesses in the Fox Valley | Rizzuto Outreach',
    metaDesc:
      'Local SEO optimization for businesses in South Elgin, Elgin, St. Charles, Geneva, Batavia and Aurora. Google Business Profile, map pack rankings, and pages that rank in your town.',
    blurb:
      'Getting you found by the people already searching for what you sell &mdash; in your town, on the map, at the moment they need it.',
    bullets: [
      'Google Business Profile built out properly',
      'Location and service pages that rank',
      'Schema, speed, and technical clean-up',
      'Name, address and phone consistent everywhere'
    ],
    lede:
      'Someone three blocks away is typing what you sell into their phone right now. Local SEO is the work that decides whether they find you or the shop on the next street over.',
    featHead: 'The work',
    featH2: 'Where the work actually <em>happens</em>.',
    featSub: 'Local search is its own game. These are the pieces that actually move the map pack.',
    feats: [
      ['Your Google listing', 'Categories, services, service areas, hours, photos, questions, posts. Filled out the way Google wants it, not half-finished the way most of them sit.'],
      ['Pages that match searches', 'A page for each service and each town you serve, so there is something real for Google to rank instead of one homepage doing all the work.'],
      ['The technical side', 'Site speed, mobile layout, page structure and the schema markup that tells Google exactly what kind of business you are and where.'],
      ['Consistent details', 'Your name, address and phone written identically everywhere they appear online. Mismatches quietly hold rankings back and almost nobody checks.'],
      ['Reviews feeding rankings', 'Fresh reviews are part of how you rank locally, not just how you look. We tie the review system into this on purpose.'],
      ['Watching what lands', 'Which searches bring calls, which pages do nothing. We add where it is working and stop guessing.']
    ],
    bandLabel: 'The honest version',
    bandHead: 'Nobody can <em>promise</em> you a number one spot.',
    bandSub: 'Anyone who does is selling you something. What can be promised is that the work gets done properly and you can see it.',
    checks: [
      'Your listing complete and verified, every field filled',
      'A real page for every service you offer',
      'A real page for every town you want calls from',
      'Fast load times on a phone, checked and fixed',
      'Schema markup that validates clean',
      'A plain-English report you can actually read'
    ],
    faqs: [
      ['How long before I see a difference?', 'The listing work often shows up in weeks. Ranking pages takes longer &mdash; usually two to four months before it is clearly moving. Anyone quoting you overnight results is guessing.'],
      ['Do you guarantee first place?', 'No, and neither can anyone else. Google decides. What I guarantee is the work gets done right and you can see exactly what was done.'],
      ['Is this different from regular SEO?', 'Yes. Local SEO is about the map pack and searches with a town attached. It leans on your Google listing, your reviews and your location pages more than anything else.'],
      ['Do I need a new website first?', 'Not always. If your current site is fast and readable we can optimize what you have. If it is slow or built on something ancient, that becomes the bottleneck and we should talk about fixing it first.']
    ]
  },
  {
    slug: 'the-booster',
    nav: 'The Booster',
    card: 'The Booster',
    menuNote: 'The full system, all five parts',
    h1: 'We don\'t hand you clients. We build the thing that <em>earns</em> them.',
    metaTitle: 'The Booster | Complete Local Growth System | Rizzuto Outreach',
    metaDesc:
      'The Booster ties your website, Google listing, reviews and follow-up into one system that keeps working &mdash; so the customers searching for you in your town actually find you.',
    blurb:
      'Our flagship program. It ties the website, the listing, the reviews and the follow-up into one loop that keeps compounding &mdash; so the right customers find you without you paying for every click.',
    bullets: [
      'Every piece pointed at the same goal',
      'Set up once, tightened every month',
      'Built on what you already own',
      'Gets stronger the longer it runs'
    ],
    lede:
      'Anybody can sell you a list of names. That is not this. The Booster is the system we put in place so the customers already searching in your town end up at your door &mdash; through the searches you should be winning anyway.',
    featHead: 'Inside the Booster',
    featH2: 'The five <em>parts</em>.',
    featSub: 'Each one is worth something on its own. Together they feed each other, and that is the whole point.',
    feats: [
      ['Foundation', 'A site Google can read and a customer can use. Fast, structured, and clear about what you do and where you do it.'],
      ['Visibility', 'Your Google Business Profile filled out the way Google wants it, tied to pages built around the services and towns you actually serve.'],
      ['Proof', 'A steady flow of real reviews, asked for automatically. Ranking and trust move together, and this is the part most shops skip.'],
      ['Capture', 'Missed calls texted back, messages answered in seconds, every enquiry logged. The traffic is worthless if it slips through.'],
      ['Compound', 'We watch what is landing, add pages where the searches are, and keep tightening. It gets better the longer it runs.']
    ],
    bandLabel: 'Why it works',
    bandHead: 'Rented attention stops the second you stop <em>paying</em>.',
    bandSub: 'Ads switch off the day the card declines. A listing that ranks, a page that answers the question, and eighty real reviews keep working whether you spend anything this month or not.',
    checks: [
      'Nothing here is rented &mdash; the site, listing and reviews are yours',
      'Every part reinforces the other four',
      'One person doing all five, so nothing falls between them',
      'Reviewed monthly, adjusted where the searches actually are',
      'You can see exactly what was done and why',
      'Built to keep working when you stop paying attention to it'
    ],
    faqs: [
      ['What makes this different from just doing SEO?', 'SEO on its own gets people to look at you. The Booster also makes sure the site converts them, the reviews reassure them, and nothing gets dropped when they call. Doing one piece and ignoring the rest is where most money gets wasted.'],
      ['Do you actually send me customers?', 'No, and I will not pretend otherwise. I build and maintain the system that makes the people already searching in your town choose you. The customers are earned by the setup, not handed over in a spreadsheet.'],
      ['How long is the commitment?', 'The build is a one-time project. The monthly tightening runs month to month &mdash; if it is not worth it to you, you stop. There is no contract you need a lawyer to get out of.'],
      ['Can I start with one piece instead?', 'Absolutely. Most people start with the website or the reviews and add the rest once they see it working. I would rather you start small and stay than get talked into everything at once.']
    ]
  },
  {
    slug: 'google-reviews',
    nav: 'Google Review Packages',
    card: 'Google Review Packages',
    menuNote: 'Make asking automatic',
    h1: 'The cheapest advertising you will ever <em>run</em>.',
    metaTitle: 'Google Review Packages for Local Businesses | Rizzuto Outreach',
    metaDesc:
      'Google review systems for local businesses &mdash; one-tap review links, QR cards, automated asks after the job, and reminder sequences. Real reviews from real customers.',
    blurb:
      'Reviews are the cheapest advertising you will ever run, and most owners never ask. We make asking automatic and make the good ones easy to leave.',
    bullets: [
      'One-tap review links and QR cards',
      'Automated ask after the job is done',
      'Reminder sequence for the ones who forget',
      'Response templates so nothing sits ignored'
    ],
    lede:
      'Your happiest customers would leave you a review. They just never get asked, and by the time they think about it they are three days gone. This fixes the asking.',
    featHead: 'The setup',
    featH2: 'How the system <em>works</em>.',
    featSub: 'Set up once, then it runs in the background while you work.',
    feats: [
      ['One-tap link', 'A short link that drops the customer straight onto your review box. No searching, no hunting through Maps, no giving up halfway.'],
      ['QR cards for the counter', 'A card for the counter, the invoice, or the truck. Some people will scan a code who would never open a text.'],
      ['The automatic ask', 'A message goes out right after the job, while they still remember you were good. Timing is most of the battle.'],
      ['A polite reminder', 'One nudge for the people who meant to and forgot. That single follow-up is where a lot of reviews actually come from.'],
      ['Replies that are ready', 'Templates for the good ones and a level-headed one for the bad one, so nothing sits there ignored for a month.'],
      ['Reviews that help you rank', 'Steady, recent reviews are part of how Google decides who shows up on the map. This is not just about looking good.']
    ],
    bandLabel: 'How we do it',
    bandHead: 'Real reviews from real <em>customers</em>. Nothing else.',
    bandSub: 'No bought reviews, no fake accounts, no incentives that get your listing suspended. Bought reviews are against Google\'s rules and they get businesses wiped out. Yours will not be one of them.',
    checks: [
      'Every review comes from a real customer of yours',
      'Nothing that violates Google\'s review policy',
      'You are never asking twice or pestering anyone',
      'Bad experiences get caught before they go public',
      'You see who was asked and who replied',
      'Works on a phone in about eight seconds'
    ],
    faqs: [
      ['Can you just get me fifty reviews?', 'Not the way you mean. Bought reviews break Google\'s rules and businesses lose their whole listing over it. What I build is the system that gets your real customers leaving them steadily &mdash; which lasts.'],
      ['What if someone leaves a bad one?', 'You get a calm, professional reply ready to go. A single bad review with a good response usually helps you. It is the ignored ones and the defensive ones that hurt.'],
      ['Will my customers find it annoying?', 'One ask and one reminder, then it stops. That is it. Most people either do it or forget, and neither one gets pestered.'],
      ['How many should I expect?', 'It depends on how many customers you see and how good you are. Shops that were getting one review a month usually land somewhere between five and fifteen once asking is automatic.']
    ]
  },
  {
    slug: 'ai-automations',
    nav: 'AI Automations',
    card: 'AI Automations',
    menuNote: 'Custom for each business',
    h1: 'Stop losing people while you are on a <em>job</em>.',
    metaTitle: 'Custom AI Automations for Small Businesses | Rizzuto Outreach',
    metaDesc:
      'Custom AI automations for local businesses &mdash; missed-call text-back, instant replies to web and social messages, quote and booking follow-up, and every enquiry logged in one place.',
    blurb:
      'Custom for each business &mdash; we look at where your day leaks time, then automate that specific thing. Never a generic bot bolted on.',
    bullets: [
      'Missed-call text-back so nobody vanishes',
      'Instant replies to web and Facebook messages',
      'Quote, booking and follow-up sequences',
      'Every enquiry logged in one place'
    ],
    lede:
      'You are under a sink or on a ladder and the phone rings. They do not leave a message, they call the next name on the list. That one moment costs local businesses more than anything else on this site.',
    featHead: 'Where it helps',
    featH2: 'What we usually <em>automate</em>.',
    featSub: 'We start by finding where your day actually leaks, then build for that. This is what it tends to be.',
    feats: [
      ['Missed-call text-back', 'The second you miss a call, they get a text saying you will ring back. Most people wait instead of dialling the next shop. This one pays for itself fastest.'],
      ['Instant message replies', 'Website chat, Facebook and Instagram messages answered in seconds, any hour, with real answers to the questions you get asked every week.'],
      ['Booking and quotes', 'They pick a slot or answer a few questions and it lands on your calendar with the details already filled in.'],
      ['Follow-up that happens', 'The quote you sent nine days ago gets a nudge without you remembering. That is a lot of quietly recovered work.'],
      ['Everything in one place', 'Calls, forms, messages and quotes in one list, so nothing lives only in your head or a text thread you scrolled past.'],
      ['Built for your business', 'A dentist and a landscaper do not leak time in the same place. What gets built for you is decided after looking at your week, not picked off a menu.']
    ],
    bandLabel: 'Where the line is',
    bandHead: 'Automation should sound like <em>you</em>, not a robot.',
    bandSub: 'Nothing here is designed to trick anyone into thinking they are texting you personally. It answers fast, it is honest about what it is, and it hands off to you the moment a real answer is needed.',
    checks: [
      'Answers fast, and never pretends to be a person you are not',
      'Hands off to you the moment it is out of its depth',
      'Written in your words, not corporate filler',
      'You can switch any piece off whenever you want',
      'You see every conversation it had',
      'Set up around your actual week, not a template'
    ],
    faqs: [
      ['Is this one of those chatbots that goes in circles?', 'No. It is set up on your real answers and it hands off to you the moment it does not know. A bot that loops is worse than no bot and I will not put one on your site.'],
      ['What does it cost to run?', 'Depends what gets built. Missed-call text-back is cheap and usually the first thing to pay for itself. We price it once we know what your week actually needs.'],
      ['Do I need new phone service?', 'Usually not. Most setups work with the number you already give out. If something has to change, you will know before anything is switched.'],
      ['What if I hate it?', 'Turn it off. It is your business and your phone. Nothing here locks you into anything.']
    ]
  }
];

/* ---------- data: sample websites ---------- */

const WORK = [
  {
    name: 'Platinum Construction Group',
    tagline: 'General contracting &mdash; Batavia, IL',
    url: 'https://theplatinumexteriors.com/',
    shot: 'images/sample-platinum-construction-group.jpg',
    alt: 'Hero section of the Platinum Construction Group website',
    note:
      'Full-service contractor covering half of Chicagoland. Video hero, a page for every service and every town they cover, and a quote form that tells them what the job is before they call back.'
  },
  {
    name: 'R.B. Construction',
    tagline: 'Carpentry &amp; framing &mdash; Sandwich, IL',
    url: 'https://rb-construction-three.vercel.app/',
    shot: 'images/sample-rb-construction.jpg',
    alt: 'Hero section of the R.B. Construction website',
    note:
      'Framing and carpentry outfit working the Fox Valley. The hero puts four trades one tap away, and three of the builds come with a designer that draws the shed or garage on screen before anyone quotes it.'
  }
];

/* ---------- data: towns ---------- */

const TOWNS = [
  {
    slug: 'south-elgin',
    name: 'South Elgin',
    county: 'Kane County, Illinois',
    zip: '60177',
    lat: 41.9942,
    lng: -88.2843,
    tag: 'Home base',
    lede:
      'This is home. South Elgin sits between the Fox River and the Randall Road corridor, which means a lot of good local shops are competing against big chains a five minute drive away. Getting found on a phone is the whole ballgame here.',
    localNote:
      'A South Elgin business is usually fighting two things at once: chains along Randall with enormous ad budgets, and neighbouring towns whose businesses show up in South Elgin searches. Both are beaten the same way &mdash; a listing that is filled out properly, pages that actually name South Elgin, and more recent reviews than the shop down the road.',
    nearby: ['elgin', 'st-charles', 'bartlett', 'streamwood', 'geneva']
  },
  {
    slug: 'elgin',
    name: 'Elgin',
    county: 'Kane County, Illinois',
    zip: '60120',
    lat: 42.0354,
    lng: -88.2826,
    tag: 'Kane County',
    lede:
      'Elgin is big, spread out, and full of businesses that have been good at their trade for twenty years and invisible online for most of them. There is a lot of ground to win here simply by being the one that shows up.',
    localNote:
      'Because Elgin is large, a single homepage rarely ranks across the whole city. The businesses doing well here have separate pages for what they do, a listing with real photos and current hours, and enough recent reviews to beat the shop that stopped collecting them in 2021.',
    nearby: ['south-elgin', 'streamwood', 'bartlett', 'st-charles', 'carpentersville']
  },
  {
    slug: 'st-charles',
    name: 'St. Charles',
    county: 'Kane County, Illinois',
    zip: '60174',
    lat: 41.9142,
    lng: -88.3087,
    tag: 'Fox River',
    lede:
      'St. Charles customers look before they buy. Between the downtown stretch along the river and the neighbourhoods east and west of it, people compare two or three places online before they ever pick up the phone &mdash; so what they find decides it.',
    localNote:
      'This is a town where a dated website genuinely costs you work. Shoppers here check the site, check the reviews, and quietly rule you out without ever telling you why. A clean, fast site and a well-kept listing do more in St. Charles than almost anywhere nearby.',
    nearby: ['geneva', 'south-elgin', 'batavia', 'elgin', 'aurora']
  },
  {
    slug: 'geneva',
    name: 'Geneva',
    county: 'Kane County, Illinois',
    zip: '60134',
    lat: 41.8875,
    lng: -88.3054,
    tag: 'Fox River',
    lede:
      'Geneva draws people in from all over the area, especially around the Third Street shops. That is good for business and hard on search &mdash; you are competing for attention with visitors who do not know the town and pick whatever comes up first.',
    localNote:
      'A lot of Geneva searches come from people who are not local, which makes your listing and your photos do the heavy lifting. If the hours are wrong or the pictures are five years old, they scroll past. If it looks sharp and current, they walk in.',
    nearby: ['st-charles', 'batavia', 'south-elgin', 'aurora', 'elgin']
  },
  {
    slug: 'batavia',
    name: 'Batavia',
    county: 'Kane County, Illinois',
    zip: '60510',
    lat: 41.8503,
    lng: -88.3126,
    tag: 'Fox River',
    lede:
      'Batavia runs on word of mouth more than most towns around here, which is a real advantage &mdash; right up until the recommendation gets typed into Google and nothing good comes up.',
    localNote:
      'When somebody in Batavia gets your name from a neighbour, the first thing they do is look you up. That search is where the referral is won or lost. Making sure a recommended business looks legitimate online is the quickest win in this town.',
    nearby: ['geneva', 'st-charles', 'aurora', 'south-elgin', 'elgin']
  },
  {
    slug: 'aurora',
    name: 'Aurora',
    county: 'Kane County, Illinois',
    zip: '60506',
    lat: 41.7606,
    lng: -88.3201,
    tag: 'Largest nearby',
    lede:
      'Aurora is the biggest city in the area and easily the most competitive. Whatever you do, several other businesses do it too &mdash; and the ones winning are not necessarily better at the work, they are just easier to find.',
    localNote:
      'In a city this size, ranking city-wide is a long game, but ranking in your part of it is very winnable. We build around the neighbourhoods and services you actually want calls from instead of trying to own the whole map at once.',
    nearby: ['batavia', 'geneva', 'plano', 'st-charles', 'south-elgin', 'elgin']
  },
  {
    slug: 'bartlett',
    name: 'Bartlett',
    county: 'DuPage &amp; Cook County, Illinois',
    zip: '60103',
    lat: 41.9950,
    lng: -88.1856,
    tag: 'DuPage / Cook',
    lede:
      'Bartlett sits across three counties, which quietly matters more than it sounds. Customers searching from one side of town get shown a different set of businesses than the other side, and most local shops have no idea it is happening.',
    localNote:
      'The fix in Bartlett is being specific: naming the town properly, setting your service area to match where you will actually drive, and having pages for the neighbouring towns you already work in. Vague coverage is why good businesses here get skipped.',
    nearby: ['streamwood', 'south-elgin', 'elgin', 'st-charles', 'carpentersville']
  },
  {
    slug: 'streamwood',
    name: 'Streamwood',
    county: 'Cook County, Illinois',
    zip: '60107',
    lat: 42.0256,
    lng: -88.1784,
    tag: 'Cook County',
    lede:
      'Streamwood is dense, residential, and full of the kind of businesses people find in a hurry &mdash; which means the search happens on a phone, standing in a kitchen, deciding right then.',
    localNote:
      'Speed matters here more than polish. If your site takes six seconds on a phone, you have already lost the person. Fast pages, a listing with correct hours, and a number that is one tap away is most of the work in Streamwood.',
    nearby: ['bartlett', 'elgin', 'south-elgin', 'carpentersville', 'st-charles']
  },
  {
    slug: 'plano',
    name: 'Plano',
    county: 'Kendall County, Illinois',
    zip: '60545',
    lat: 41.6628,
    lng: -88.5370,
    tag: 'Kendall County',
    lede:
      'Plano runs on people knowing people. That works right up until somebody new moves in off the Route 34 corridor, opens their phone, and picks whichever shop actually turns up &mdash; which, in a town this size, is usually whoever bothered to fill out their Google listing.',
    localNote:
      'Small towns are the easiest place to win local search and the most commonly ignored. There are fewer businesses competing for the same searches here than in Aurora or Elgin, so a listing that is properly filled out and a handful of recent reviews can put you at the top of the map in weeks rather than months. The catch is that Plano searches also pull in businesses from Sandwich, Yorkville and Oswego &mdash; so being the most visible option in your own town is not automatic.',
    nearby: ['aurora', 'batavia', 'geneva', 'st-charles', 'south-elgin']
  },
  {
    slug: 'carpentersville',
    name: 'Carpentersville',
    county: 'Kane County, Illinois',
    zip: '60110',
    lat: 42.1211,
    lng: -88.2570,
    tag: 'Kane County',
    lede:
      'Carpentersville has a lot of hard-working businesses with almost no online footprint. That is frustrating if it is you &mdash; and a genuine opening, because the bar to be the most visible option here is lower than it is anywhere else nearby.',
    localNote:
      'In towns where few competitors have done the work, a properly filled-out listing and a handful of recent reviews can move you up the map quickly. It is the closest thing to a shortcut local search has.',
    nearby: ['elgin', 'south-elgin', 'streamwood', 'bartlett', 'st-charles']
  }
];

/* ---------- helpers ---------- */

const townBySlug = (s) => TOWNS.find((t) => t.slug === s);
const svcBySlug = (s) => SERVICES.find((x) => x.slug === s);

function head(o) {
  const b = o.base;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${o.title}</title>
<meta name="description" content="${o.desc}" />
<link rel="canonical" href="${o.url}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="#12100F" />
<meta name="author" content="Rizzuto Outreach" />
<meta name="geo.region" content="US-IL" />
<meta name="geo.placename" content="${o.place || 'South Elgin, Illinois'}" />
<meta name="geo.position" content="${o.lat || 41.9942};${o.lng || -88.2843}" />
<meta name="ICBM" content="${o.lat || 41.9942}, ${o.lng || -88.2843}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${o.url}" />
<meta property="og:title" content="${o.title}" />
<meta property="og:description" content="${o.desc}" />
<meta property="og:image" content="${SITE}/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Rizzuto Outreach &mdash; customized modern marketing" />
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="Rizzuto Outreach" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${o.title}" />
<meta name="twitter:description" content="${o.desc}" />
<meta name="twitter:image" content="${SITE}/og-image.jpg" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%2312100F'/%3E%3Ctext y='.78em' x='24' font-size='68' font-family='Georgia,serif' fill='%23C6A15B'%3ER%3C/text%3E%3C/svg%3E" />
<link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%2312100F'/%3E%3Ctext y='.78em' x='24' font-size='68' font-family='Georgia,serif' fill='%23C6A15B'%3ER%3C/text%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${b}assets/site.css" />
${o.schema || ''}
</head>
<body>`;
}

function header(o) {
  const b = o.base;
  const on = (k) => (o.active === k ? ' class="active"' : '');
  return `
<header class="hdr${o.solidHeader ? ' solid' : ''}" id="hdr">
  <div class="wrap hdr-in">
    <nav class="nav" id="nav">
      <a href="${b}index.html"${on('home')}>Home</a>

      <div class="dropdown">
        <button class="drop-btn" type="button" aria-expanded="false" aria-haspopup="true">
          Services <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="drop-menu">
${SERVICES.map(
  (s) =>
    `          <a href="${b}services/${s.slug}.html">${s.nav}<small>${s.menuNote}</small></a>`
).join('\n')}
          <span class="drop-sep"></span>
          <a href="${b}services/index.html">All services</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="drop-btn" type="button" aria-expanded="false" aria-haspopup="true">
          Locations <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="drop-menu">
${TOWNS.map((t) => `          <a href="${b}locations/${t.slug}.html">${t.name}, IL</a>`).join('\n')}
          <span class="drop-sep"></span>
          <a href="${b}locations/index.html">All service areas</a>
        </div>
      </div>

      <a href="${b}index.html#work">Our work</a>
      <a href="${b}index.html#why">Why us</a>
      <a href="${o.contactHref || '#contact'}">Contact</a>
    </nav>
    <a href="${o.contactHref || '#contact'}" class="btn btn-primary hdr-cta"><span class="cta-full">Start a project</span><span class="cta-short">Contact</span> <span class="arw">&rarr;</span></a>
    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>`;
}

function contactSection(o) {
  const b = o.base;
  const town = o.town || '';
  const selected = (s) => (o.preselect === s ? ' selected' : '');
  return `
<section class="contact${o.fromAlt ? ' from-alt' : ''}" id="contact">
  <div class="grain"></div>
  <div class="wrap">
    <div class="ct-grid">
      <div class="ct-copy reveal">
        <p class="eyebrow">Get in touch</p>
        <h2>${o.ctHead || 'Tell us what\'s <em>not</em> working.'}</h2>
        <p>${o.ctSub || 'Send a few lines about your business. You\'ll get an honest answer about what would actually move the needle &mdash; even if that answer is "you don\'t need us yet."'}</p>
        <div class="ct-links">
          <a class="ct-link" href="mailto:${EMAIL}">
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            <div><span>Email</span><strong>${EMAIL}</strong></div>
          </a>
          <a class="ct-link" href="${b}locations/index.html">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-7-10a7 7 0 0114 0c0 5.6-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
            <div><span>Serving</span><strong>${o.serving || 'South Elgin &amp; the Fox Valley, IL'}</strong></div>
          </a>
          <div class="ct-link">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            <div><span>Response time</span><strong>Same day, most days</strong></div>
          </div>
        </div>
      </div>

      <form class="form reveal" id="ctform" data-context="${o.formContext || 'Sent from the website'}" novalidate>
        <div class="frow two">
          <div class="field">
            <label for="f-name">Your name</label>
            <input type="text" id="f-name" name="name" placeholder="Jane Doe" required />
          </div>
          <div class="field">
            <label for="f-biz">Business</label>
            <input type="text" id="f-biz" name="business" placeholder="Doe Plumbing" />
          </div>
        </div>
        <div class="frow two">
          <div class="field">
            <label for="f-email">Email</label>
            <input type="email" id="f-email" name="email" placeholder="you@business.com" required />
          </div>
          <div class="field">
            <label for="f-phone">Phone</label>
            <input type="tel" id="f-phone" name="phone" placeholder="(630) 555-0142" />
          </div>
        </div>
        <div class="frow two">
          <div class="field">
            <label for="f-town">Town</label>
            <input type="text" id="f-town" name="town" value="${town}" placeholder="South Elgin" />
          </div>
          <div class="field">
            <label for="f-svc">What are you after?</label>
            <select id="f-svc" name="service">
${SERVICES.map((s) => `              <option${selected(s.slug)}>${s.card}</option>`).join('\n')}
              <option${selected('unsure')}>Not sure yet &mdash; need advice</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="f-msg">What's going on?</label>
          <textarea id="f-msg" name="message" placeholder="A couple lines about the business and what you'd like to fix."></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send it over <span class="arw">&rarr;</span></button>
        <small id="fnote">Opens your email app with everything filled in &mdash; or write us directly at ${EMAIL}</small>
      </form>
    </div>
  </div>
</section>`;
}

function footer(o) {
  const b = o.base;
  return `
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="ftr-brand">
        <b>Rizzuto <em>Outreach</em></b>
        <span class="motto">Customized modern marketing</span>
        <p>Custom websites, local SEO, Google review systems and AI automations for local businesses across the Fox Valley. Built one business at a time.</p>
      </div>
      <div>
        <h4>Services</h4>
        <div class="ftr-links">
${SERVICES.map((s) => `          <a href="${b}services/${s.slug}.html">${s.nav}</a>`).join('\n')}
        </div>
      </div>
      <div>
        <h4>Service areas</h4>
        <div class="ftr-links">
${TOWNS.slice(0, 6)
  .map((t) => `          <a href="${b}locations/${t.slug}.html">${t.name}, IL</a>`)
  .join('\n')}
          <a href="${b}locations/index.html">See all areas</a>
        </div>
      </div>
      <div>
        <h4>Contact</h4>
        <div class="ftr-links">
          <a href="mailto:${EMAIL}">${EMAIL}</a>
          <a href="${o.contactHref || '#contact'}">Start a project</a>
          <p style="margin:.4rem 0 0">South Elgin, IL<br />Mon&ndash;Fri 8am&ndash;6pm<br />Sat 9am&ndash;2pm</p>
        </div>
      </div>
    </div>
    <div class="ftr-bottom">
      <p>&copy; <span id="yr" class="num">2026</span> Rizzuto Outreach. All rights reserved.</p>
      <p>South Elgin, Illinois</p>
    </div>
  </div>
</footer>
<script src="${b}assets/site.js"></script>
</body>
</html>`;
}

function businessSchema(extra) {
  return Object.assign(
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': SITE + '/#business',
      name: 'Rizzuto Outreach',
      slogan: 'Customized modern marketing',
      url: SITE + '/',
      image: SITE + '/og-image.jpg',
      email: EMAIL,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'South Elgin',
        addressRegion: 'IL',
        postalCode: '60177',
        addressCountry: 'US'
      },
      geo: { '@type': 'GeoCoordinates', latitude: 41.9942, longitude: -88.2843 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00'
        },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' }
      ],
      sameAs: []
    },
    extra || {}
  );
}

/* HTML entities never get decoded inside a <script> block, so strip them
   before anything goes into JSON-LD or Google reads them literally. */
function deEnt(v) {
  if (typeof v === 'string') {
    return v
      .replace(/&mdash;/g, '-')
      .replace(/&ndash;/g, '-')
      .replace(/&hellip;/g, '...')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
  }
  if (Array.isArray(v)) return v.map(deEnt);
  if (v && typeof v === 'object') {
    const out = {};
    for (const k in v) out[k] = deEnt(v[k]);
    return out;
  }
  return v;
}

const ld = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(deEnt(obj), null, 2)}\n</script>`;

function crumbs(items) {
  return ld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it[0],
      item: it[1]
    }))
  });
}

function faqLd(faqs) {
  return ld({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  });
}

const faqHtml = (faqs) =>
  `<div class="faq reveal">\n` +
  faqs
    .map(
      ([q, a], i) =>
        `      <details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`
    )
    .join('\n') +
  `\n    </div>`;

const ICONS = [
  '<path d="M12 3l2.4 5.6L20 10l-4.4 3.2L17 19l-5-3-5 3 1.4-5.8L4 10l5.6-1.4z"/>',
  '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M8 5v4"/>',
  '<path d="M12 21s-7-4.4-7-10a7 7 0 0114 0c0 5.6-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/>',
  '<path d="M4 7h16M4 12h16M4 17h10"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
];

const CHECK = '<svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg>';

/* ---------- page: home ---------- */

function buildHome() {
  const o = { base: '', active: 'home' };
  const schema = [
    ld(
      businessSchema({
        alternateName: 'Rizzuto Outreach Marketing',
        description:
          'Rizzuto Outreach is a custom online marketing business serving local businesses in South Elgin and the Fox Valley. Custom websites, local SEO optimization, the Booster growth program, Google review packages, and custom AI automations.',
        areaServed: TOWNS.map((t) => ({ '@type': 'City', name: t.name + ', IL' })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Marketing Services',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.card, url: SITE + '/services/' + s.slug + '.html' }
          }))
        }
      })
    ),
    ld({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': SITE + '/#organization',
      name: 'Rizzuto Outreach',
      url: SITE + '/',
      logo: SITE + '/og-image.jpg',
      description:
        'Customized modern marketing for local businesses - custom websites, local SEO, Google review systems and AI automations.',
      email: EMAIL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'South Elgin',
        addressRegion: 'IL',
        postalCode: '60177',
        addressCountry: 'US'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: EMAIL,
        areaServed: 'US',
        availableLanguage: ['English']
      },
      sameAs: []
    })
  ].join('\n');

  const booster = svcBySlug('the-booster');

  return (
    head({
      base: '',
      title: 'Rizzuto Outreach | Customized Modern Marketing',
      desc:
        'Rizzuto Outreach builds custom websites, local SEO, Google review systems and AI automations for local businesses in South Elgin and the Fox Valley. Customized modern marketing.',
      url: SITE + '/',
      schema
    }) +
    header(o) +
    `
<main id="top">
<section class="hero on-dark">
  <div class="grain"></div>
  <div class="blob blob-a" data-par="0.14"></div>
  <div class="blob blob-b" data-par="-0.09"></div>
  <div class="float float-1"></div>
  <div class="float float-2"></div>
  <div class="wrap hero-in">
    <h1 class="rise d1">Rizzuto Outreach</h1>
    <p class="hero-tag rise d2">Customized modern marketing.</p>
    <p class="lede rise d3">Websites built for your business.</p>
    <p class="hero-sub rise d4">
      Most local businesses lose customers before the first hello &mdash; a website that
      loads slow, a Google listing nobody sees, reviews that never get asked for.
      We fix the whole thing, built around your business. Not a template with your logo on it.
    </p>
  </div>
  <a href="#work" class="scroll-cue rise d5" aria-label="Scroll to our work">See our work<i></i></a>
</section>

<section class="work" id="work">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Sample websites</p>
      <h2>Two we <em>built</em>.</h2>
      <p>Here's what the top of each one looks like. Click either to open the real site &mdash; both are live right now.</p>
    </div>
    <div class="work-grid">
${WORK.map(
  (w) => `      <a class="work-card reveal" href="${w.url}" target="_blank" rel="noopener">
        <div class="work-shot"><img src="${w.shot}" alt="${w.alt}" width="1800" height="1125" loading="lazy" /></div>
        <div class="work-body">
          <span class="tagline">${w.tagline}</span>
          <h3>${w.name}</h3>
          <p>${w.note}</p>
          <span class="work-link"><span>Visit the live site</span> <span aria-hidden="true">&rarr;</span></span>
        </div>
      </a>`
).join('\n')}
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
${[0, 1]
  .map(() => SERVICES.map((s) => `    <span>${s.card}</span>`).join('\n'))
  .join('\n')}
  </div>
</div>

<section class="services" id="services">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Our services</p>
      <h2>Our <em>custom</em> services.</h2>
      <p>No bloated retainers, no dashboard full of numbers that don't mean anything. Pick what your business actually needs &mdash; or take the whole system.</p>
    </div>

    <div class="svc-grid">
${SERVICES.filter((s) => s.slug !== 'the-booster')
  .map(
    (s, i) => `      <a class="svc reveal" href="services/${s.slug}.html">
        <span class="svc-no">0${i + 1}</span>
        <h3>${s.card}</h3>
        <p>${s.blurb}</p>
        <ul>
${s.bullets.map((x) => `          <li>${x}</li>`).join('\n')}
        </ul>
        <span class="svc-more">More on ${s.card.toLowerCase()} <span aria-hidden="true">&rarr;</span></span>
      </a>`
  )
  .join('\n')}

      <a class="svc wide reveal" href="services/the-booster.html">
        <div>
          <span class="tag">The Booster</span>
          <h3>The system that gets Google working for you.</h3>
        </div>
        <div>
          <p>${booster.blurb}</p>
          <span class="svc-more">See how the Booster works <span aria-hidden="true">&rarr;</span></span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="booster" id="booster">
  <div class="grain"></div>
  <div class="wrap">
    <div class="bo-grid">
      <div class="bo-copy reveal">
        <p class="eyebrow">The Booster</p>
        <h2>We don't hand you clients. We build the thing that <em>earns</em> them.</h2>
        <p>
          Anybody can sell you a list of names. That's not this. The Booster is the system we put
          in place so the customers already searching in your town end up at your door &mdash;
          through the searches you should be winning anyway.
        </p>
        <p>
          It's the website, the listing, the reviews and the follow-up all pointed at the same goal,
          feeding each other. Set up once, then tightened month over month.
        </p>
        <p class="bo-note">Rented attention stops the second you stop paying. Built attention keeps working.</p>
        <a href="services/the-booster.html" class="btn btn-primary">See how the Booster works <span class="arw">&rarr;</span></a>
      </div>

      <div class="bo-steps reveal">
${booster.feats
  .map(
    (f, i) => `        <div class="bo-step">
          <b>0${i + 1}</b>
          <div>
            <strong>${f[0]}</strong>
            <span>${f[1]}</span>
          </div>
        </div>`
  )
  .join('\n')}
      </div>
    </div>
  </div>
</section>

<section class="process" id="process">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">How it goes</p>
      <h2>Four steps, no <em>mystery</em>.</h2>
      <p>You'll know what's happening and what it costs before anything starts.</p>
    </div>
    <div class="steps">
      <article class="step reveal">
        <span class="n">1</span>
        <h3>We talk</h3>
        <p>Fifteen minutes. What you sell, who buys it, and what's not working right now. No pitch deck.</p>
      </article>
      <article class="step reveal">
        <span class="n">2</span>
        <h3>We look</h3>
        <p>Your site, your listing, your reviews, and the three competitors beating you on Google. You get the honest read.</p>
      </article>
      <article class="step reveal">
        <span class="n">3</span>
        <h3>We build</h3>
        <p>A flat price and a real timeline. You see it before it goes live and you say what changes.</p>
      </article>
      <article class="step reveal">
        <span class="n">4</span>
        <h3>We tighten</h3>
        <p>Live isn't finished. We keep adjusting what's working and cut what isn't, month over month.</p>
      </article>
    </div>
  </div>
</section>

<section class="why" id="why">
  <div class="wrap">
    <div class="why-grid">
      <div class="reveal">
        <p class="eyebrow">Why us</p>
        <h2>Local on <em>purpose</em>.</h2>
        <p class="why-intro">
          You get the person who builds the work, not an account manager reading a script.
          We're small on purpose &mdash; that's the whole difference, and it's why nothing
          here comes off an assembly line.
        </p>
      </div>

      <div class="why-list reveal">
        <div class="why-item">
          <div class="why-ico"><svg viewBox="0 0 24 24">${ICONS[0]}</svg></div>
          <div><h3>Built one at a time</h3><p>Every site starts empty. Your layout, your colors, your words &mdash; nothing pulled off a shelf and recolored.</p></div>
        </div>
        <div class="why-item">
          <div class="why-ico"><svg viewBox="0 0 24 24">${ICONS[1]}</svg></div>
          <div><h3>Judged on calls, not clicks</h3><p>Impressions don't pay your bills. We care whether the phone rings and the form gets filled out.</p></div>
        </div>
        <div class="why-item">
          <div class="why-ico"><svg viewBox="0 0 24 24">${ICONS[2]}</svg></div>
          <div><h3>Straight pricing</h3><p>You know the number before we start. No surprise line items, no contract you need a lawyer to leave.</p></div>
        </div>
        <div class="why-item">
          <div class="why-ico"><svg viewBox="0 0 24 24">${ICONS[3]}</svg></div>
          <div><h3>We know these towns</h3><p>Local search is its own game. Ranking in South Elgin isn't the same as ranking in Chicago, and we build for the one you're in.</p></div>
        </div>
        <div class="why-item">
          <div class="why-ico"><svg viewBox="0 0 24 24">${ICONS[4]}</svg></div>
          <div><h3>Plain English</h3><p>You'll never get a report you can't read. If we can't explain why something matters, we don't charge you for it.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
` +
    contactSection({ base: '', formContext: 'Sent from the home page' }) +
    `
</main>` +
    footer(o)
  );
}

/* ---------- page: service ---------- */

function buildService(s) {
  const o = { base: '../', active: 'services', contactHref: '#contact' };
  const url = `${SITE}/services/${s.slug}.html`;
  const schema = [
    ld({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.card,
      serviceType: s.card,
      description: s.metaDesc,
      url: url,
      provider: businessSchema(),
      areaServed: TOWNS.map((t) => ({ '@type': 'City', name: t.name + ', IL' }))
    }),
    crumbs([
      ['Home', SITE + '/'],
      ['Services', SITE + '/services/index.html'],
      [s.card, url]
    ]),
    faqLd(s.faqs)
  ].join('\n');

  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    head({ base: '../', title: s.metaTitle, desc: s.metaDesc, url, schema }) +
    header(o) +
    `
<main>
<section class="phero">
  <div class="grain"></div>
  <div class="blob blob-a" data-par="0.1"></div>
  <div class="wrap">
    <div class="crumbs"><a href="../index.html">Home</a> &nbsp;/&nbsp; <a href="index.html">Services</a> &nbsp;/&nbsp; <span>${s.card}</span></div>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
    <div class="btn-row">
      <a href="#contact" class="btn btn-primary">Get a straight answer <span class="arw">&rarr;</span></a>
      <a href="#included" class="btn btn-ghost">What's included</a>
    </div>
  </div>
</section>

<section id="included">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">${s.featHead}</p>
      <h2>${s.featH2}</h2>
      <p>${s.featSub}</p>
    </div>
    <div class="feat-grid${s.feats.length > 4 ? ' three' : ''}">
${s.feats
  .map(
    (f, i) => `      <article class="feat reveal">
        <div class="fi"><svg viewBox="0 0 24 24">${ICONS[i % ICONS.length]}</svg></div>
        <h3>${f[0]}</h3>
        <p>${f[1]}</p>
      </article>`
  )
  .join('\n')}
    </div>
  </div>
</section>

<section class="band on-dark">
  <div class="grain"></div>
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">${s.bandLabel}</p>
      <h2>${s.bandHead}</h2>
      <p>${s.bandSub}</p>
    </div>
    <div class="checks">
${s.checks
  .map((c) => `      <div class="check reveal">${CHECK}<span>${c}</span></div>`)
  .join('\n')}
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Common questions</p>
      <h2>What people ask about <em>this</em>.</h2>
    </div>
    ${faqHtml(s.faqs)}
  </div>
</section>

<section class="why">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">The rest of it</p>
      <h2>Everything else we <em>do</em>.</h2>
      <p>Each of these stands on its own. Together they're the Booster.</p>
    </div>
    <div class="svc-tabs">
${others
  .map(
    (x) => `      <a class="svc-tab reveal" href="${x.slug}.html">
        <span><b>${x.card}</b><span>${x.menuNote}</span></span>
        <i aria-hidden="true">&rarr;</i>
      </a>`
  )
  .join('\n')}
    </div>
  </div>
</section>
` +
    contactSection({
      base: '../',
      preselect: s.slug,
      fromAlt: true,
      ctHead: `Want ${s.card.toLowerCase()} for your <em>business</em>?`,
      ctSub:
        'Send a few lines about what you do and where you do it. You\'ll get an honest answer about whether this is what you actually need.',
      formContext: 'Sent from the ' + s.card + ' page'
    }) +
    `
</main>` +
    footer(o)
  );
}

/* ---------- page: services hub ---------- */

function buildServicesHub() {
  const o = { base: '../', active: 'services' };
  const url = SITE + '/services/index.html';
  const schema = [
    ld({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Rizzuto Outreach Services',
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.card,
        url: SITE + '/services/' + s.slug + '.html'
      }))
    }),
    crumbs([
      ['Home', SITE + '/'],
      ['Services', url]
    ])
  ].join('\n');

  return (
    head({
      base: '../',
      title: 'Our Custom Services | Rizzuto Outreach',
      desc:
        'Custom websites, local SEO optimization, the Booster growth system, Google review packages and custom AI automations for local businesses in the Fox Valley.',
      url,
      schema
    }) +
    header(o) +
    `
<main>
<section class="phero">
  <div class="grain"></div>
  <div class="blob blob-a" data-par="0.1"></div>
  <div class="wrap">
    <div class="crumbs"><a href="../index.html">Home</a> &nbsp;/&nbsp; <span>Services</span></div>
    <h1>Our <em>custom</em> services.</h1>
    <p class="lede">Five things, and a page on each so you can see exactly what you'd be paying for before you ever talk to us.</p>
  </div>
</section>

<section class="services">
  <div class="wrap">
    <div class="svc-grid">
${SERVICES.map(
  (s, i) => `      <a class="svc reveal" href="${s.slug}.html">
        <span class="svc-no">0${i + 1}</span>
        <h3>${s.card}</h3>
        <p>${s.blurb}</p>
        <ul>
${(s.bullets || []).map((x) => `          <li>${x}</li>`).join('\n')}
        </ul>
        <span class="svc-more">Read more <span aria-hidden="true">&rarr;</span></span>
      </a>`
).join('\n')}
    </div>
  </div>
</section>

<section class="band on-dark">
  <div class="grain"></div>
  <div class="wrap">
    <div class="sec-head center reveal">
      <p class="eyebrow">Where we work</p>
      <h2>Serving the <em>Fox Valley</em>.</h2>
      <p>Every town below has its own page with what local search looks like there.</p>
    </div>
    <div class="towns">
${TOWNS.map(
  (t) => `      <a class="town reveal" href="../locations/${t.slug}.html"><span>${t.name}<small>${t.tag}</small></span><i aria-hidden="true">&rarr;</i></a>`
).join('\n')}
    </div>
  </div>
</section>
` +
    contactSection({
      base: '../',
      ctHead: 'Not sure which one you <em>need</em>?',
      ctSub:
        'That\'s the normal starting point. Tell us about the business and we\'ll tell you which piece would move the needle first &mdash; and which ones can wait.',
      preselect: 'unsure',
      formContext: 'Sent from the services hub'
    }) +
    `
</main>` +
    footer(o)
  );
}

/* ---------- page: location ---------- */

function buildLocation(t) {
  const o = { base: '../', active: 'locations' };
  const url = `${SITE}/locations/${t.slug}.html`;
  const plain = t.name.replace(/&amp;/g, 'and');

  const faqs = [
    [
      `Do you work with businesses in ${plain}?`,
      `Yes. ${plain} is one of the towns we work in regularly, along with the rest of the Fox Valley. Email ${EMAIL} and we'll take a look at where you stand right now.`
    ],
    [
      `What does it cost to find out where I stand in ${plain}?`,
      `Nothing. We look at your site, your Google listing, your reviews and the competitors ranking above you in ${plain}, then tell you what we'd fix first. No charge and no obligation afterward.`
    ],
    [
      `How long until I show up in ${plain} searches?`,
      `Google listing work often shows movement within a few weeks. Ranking pages usually takes two to four months to clearly move. Anyone promising you overnight results in ${plain} is guessing.`
    ],
    [
      `Do I have to be based in ${plain}?`,
      `No. Plenty of businesses we work with are based one town over and want the calls from ${plain}. That's a service-area setup and it's handled differently from a storefront &mdash; done wrong, it's why a lot of businesses never appear here at all.`
    ]
  ];

  const schema = [
    ld(
      businessSchema({
        '@id': url + '#business',
        description: `Custom websites, local SEO, Google review systems and AI automations for businesses in ${plain}, Illinois.`,
        url: url,
        areaServed: {
          '@type': 'City',
          name: plain + ', IL',
          containedInPlace: { '@type': 'AdministrativeArea', name: t.county.replace(/&amp;/g, 'and') }
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Services in ${plain}, IL`,
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: `${s.card} in ${plain}, IL` }
          }))
        }
      })
    ),
    crumbs([
      ['Home', SITE + '/'],
      ['Service Areas', SITE + '/locations/index.html'],
      [plain + ', IL', url]
    ]),
    faqLd(faqs)
  ].join('\n');

  const nearby = t.nearby.map(townBySlug).filter(Boolean);

  return (
    head({
      base: '../',
      title: `Marketing &amp; Web Design in ${t.name}, IL | Rizzuto Outreach`,
      desc: `Custom websites, local SEO, Google review packages and AI automations for ${plain}, Illinois businesses. Customized modern marketing from a local shop in South Elgin.`,
      url,
      place: plain + ', Illinois',
      lat: t.lat,
      lng: t.lng,
      schema
    }) +
    header(o) +
    `
<main>
<section class="phero">
  <div class="grain"></div>
  <div class="blob blob-a" data-par="0.1"></div>
  <div class="wrap">
    <div class="crumbs"><a href="../index.html">Home</a> &nbsp;/&nbsp; <a href="index.html">Service Areas</a> &nbsp;/&nbsp; <span>${t.name}, IL</span></div>
    <h1>Marketing for ${t.name} <em>businesses</em>.</h1>
    <p class="lede">${t.lede}</p>
    <div class="btn-row">
      <a href="#contact" class="btn btn-primary">See where you stand <span class="arw">&rarr;</span></a>
      <a href="#services" class="btn btn-ghost">What we do here</a>
    </div>
  </div>
</section>

<section id="services">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">In ${t.name}</p>
      <h2>What we do for businesses <em>here</em>.</h2>
      <p>Same five services everywhere &mdash; what changes is which one you need first.</p>
    </div>
    <div class="svc-tabs">
${SERVICES.map(
  (s) => `      <a class="svc-tab reveal" href="../services/${s.slug}.html">
        <span><b>${s.card}</b><span>${s.menuNote}</span></span>
        <i aria-hidden="true">&rarr;</i>
      </a>`
).join('\n')}
    </div>
  </div>
</section>

<section class="band on-dark">
  <div class="grain"></div>
  <div class="wrap">
    <div class="bo-grid">
      <div class="bo-copy reveal">
        <p class="eyebrow">Local search in ${t.name}</p>
        <h2>What actually decides who gets the <em>call</em>.</h2>
        <p>${t.localNote}</p>
        <p class="bo-note">The business that shows up first isn't always the best one. It's the one that did this work.</p>
        <a href="../services/the-booster.html" class="btn btn-primary">See the Booster <span class="arw">&rarr;</span></a>
      </div>
      <div class="bo-steps reveal">
        <div class="bo-step"><b>01</b><div><strong>A site that loads</strong><span>Built light so it opens before a ${t.name} customer standing in their kitchen gives up on it.</span></div></div>
        <div class="bo-step"><b>02</b><div><strong>A listing that's finished</strong><span>Categories, services, hours, photos and service area set the way Google actually wants them.</span></div></div>
        <div class="bo-step"><b>03</b><div><strong>Pages that name ${t.name}</strong><span>Real pages for the services and towns you want calls from, instead of one homepage doing all the work.</span></div></div>
        <div class="bo-step"><b>04</b><div><strong>Reviews coming in steadily</strong><span>Recent reviews are part of how you rank here, not just how you look. Asking gets automated.</span></div></div>
        <div class="bo-step"><b>05</b><div><strong>Nothing dropped</strong><span>Missed calls texted back and messages answered fast, so the work you earned doesn't slip away.</span></div></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Common questions</p>
      <h2>${t.name} owners ask us&hellip;</h2>
    </div>
    ${faqHtml(faqs)}
  </div>
</section>

<section class="why">
  <div class="wrap">
    <div class="sec-head center reveal">
      <p class="eyebrow">Nearby</p>
      <h2>We also work in&hellip;</h2>
    </div>
    <div class="towns">
${nearby
  .map(
    (n) => `      <a class="town reveal" href="${n.slug}.html"><span>${n.name}<small>${n.tag}</small></span><i aria-hidden="true">&rarr;</i></a>`
  )
  .join('\n')}
      <a class="town reveal" href="index.html"><span>All areas<small>See the full list</small></span><i aria-hidden="true">&rarr;</i></a>
    </div>
    <p class="area-note reveal" style="text-align:center">Somewhere not listed? Email ${EMAIL} and ask &mdash; if we can serve it, we'll say so.</p>
  </div>
</section>
` +
    contactSection({
      base: '../',
      town: plain,
      fromAlt: true,
      serving: plain + ' &amp; the Fox Valley, IL',
      ctHead: `See where you stand in <em>${t.name}</em>.`,
      ctSub: `Send a few lines about the business. We'll look at your site, your listing and the ${plain} competitors ranking above you, then tell you straight what we'd fix first.`,
      preselect: 'unsure',
      formContext: 'Sent from the ' + plain + ', IL location page'
    }) +
    `
</main>` +
    footer(o)
  );
}

/* ---------- page: locations hub ---------- */

function buildLocationsHub() {
  const o = { base: '../', active: 'locations' };
  const url = SITE + '/locations/index.html';
  const schema = [
    ld({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Rizzuto Outreach Service Areas',
      itemListElement: TOWNS.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name.replace(/&amp;/g, 'and') + ', IL',
        url: SITE + '/locations/' + t.slug + '.html'
      }))
    }),
    crumbs([
      ['Home', SITE + '/'],
      ['Service Areas', url]
    ])
  ].join('\n');

  return (
    head({
      base: '../',
      title: 'Service Areas | Fox Valley Marketing | Rizzuto Outreach',
      desc:
        'Rizzuto Outreach serves local businesses across the Fox Valley - South Elgin, Elgin, St. Charles, Geneva, Batavia, Aurora, Bartlett, Streamwood and Carpentersville, Illinois.',
      url,
      schema
    }) +
    header(o) +
    `
<main>
<section class="phero">
  <div class="grain"></div>
  <div class="blob blob-a" data-par="0.1"></div>
  <div class="wrap">
    <div class="crumbs"><a href="../index.html">Home</a> &nbsp;/&nbsp; <span>Service Areas</span></div>
    <h1>Where we <em>work</em>.</h1>
    <p class="lede">We're based in South Elgin and work up and down the Fox Valley. Every town has its own page &mdash; local search looks different in each one, and that's not a marketing line, it's how Google works.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Service areas</p>
      <h2>Pick your <em>town</em>.</h2>
      <p>Each page covers what local search actually looks like there and what tends to move first.</p>
    </div>
    <div class="towns">
${TOWNS.map(
  (t) => `      <a class="town reveal" href="${t.slug}.html"><span>${t.name}<small>${t.tag}</small></span><i aria-hidden="true">&rarr;</i></a>`
).join('\n')}
    </div>
    <p class="area-note reveal">Not on the list? Email ${EMAIL} and ask. We work outside these towns regularly &mdash; these are just the ones we're in most.</p>
  </div>
</section>

<section class="band on-dark band-end">
  <div class="grain"></div>
  <div class="wrap">
    <div class="sec-head center reveal">
      <p class="eyebrow">Why town pages matter</p>
      <h2>Google ranks <em>places</em>, not just websites.</h2>
      <p>A single homepage trying to cover nine towns almost never ranks in any of them. A real page per town, with real content about that town, is how local businesses get found &mdash; and it's the same thing we build for you.</p>
    </div>
    <div class="checks">
      <div class="check reveal">${CHECK}<span>A page for each town you actually want calls from</span></div>
      <div class="check reveal">${CHECK}<span>Written about that town, not copy-pasted with the name swapped</span></div>
      <div class="check reveal">${CHECK}<span>Service area set to match where you'll really drive</span></div>
      <div class="check reveal">${CHECK}<span>Linked together so Google can see the whole footprint</span></div>
    </div>
  </div>
</section>
` +
    contactSection({
      base: '../',
      preselect: 'unsure',
      ctHead: 'Want this for your <em>town</em>?',
      ctSub:
        'Tell us where you are and where you want the calls coming from. We\'ll tell you what it would take to get found there.',
      formContext: 'Sent from the service areas hub'
    }) +
    `
</main>` +
    footer(o)
  );
}

/* ---------- sitemap + robots ---------- */

function buildSitemap() {
  const urls = [
    [SITE + '/', '1.0'],
    [SITE + '/services/index.html', '0.9'],
    [SITE + '/locations/index.html', '0.9'],
    ...SERVICES.map((s) => [SITE + '/services/' + s.slug + '.html', '0.8']),
    ...TOWNS.map((t) => [SITE + '/locations/' + t.slug + '.html', '0.7'])
  ];
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        ([u, p]) =>
          `  <url>\n    <loc>${u}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${p}</priority>\n  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`
  );
}

/* ---------- write ---------- */

/* Output dir: defaults to this folder (pages sit next to the source, and get
   committed). Pass a dir to build elsewhere - Vercel uses `node build-site.js dist`
   and serves dist/, so only the generator and assets need to be deployed. */
const OUT = process.argv[2] ? path.resolve(ROOT, process.argv[2]) : ROOT;

function write(rel, content) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('  wrote ' + rel);
}

function copyAssets() {
  if (OUT === ROOT) return;
  for (const dir of ['assets', 'images']) {
    const src = path.join(ROOT, dir);
    if (!fs.existsSync(src)) continue;
    const dst = path.join(OUT, dir);
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(src)) {
      fs.copyFileSync(path.join(src, f), path.join(dst, f));
      console.log('  copied ' + dir + '/' + f);
    }
  }
  /* Loose files that sit at the site root. og-image.jpg is the link-preview
     card every page points at, so it has to ship or shared links look bare. */
  for (const f of ['og-image.jpg']) {
    const src = path.join(ROOT, f);
    if (!fs.existsSync(src)) {
      console.log('  WARNING: ' + f + ' is missing - link previews will break');
      continue;
    }
    fs.copyFileSync(src, path.join(OUT, f));
    console.log('  copied ' + f);
  }
}

console.log('Building Rizzuto Outreach...');
write('index.html', buildHome());
write('services/index.html', buildServicesHub());
SERVICES.forEach((s) => write('services/' + s.slug + '.html', buildService(s)));
write('locations/index.html', buildLocationsHub());
TOWNS.forEach((t) => write('locations/' + t.slug + '.html', buildLocation(t)));
write('sitemap.xml', buildSitemap());
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
copyAssets();
console.log(`Done. ${2 + SERVICES.length + 1 + TOWNS.length} pages -> ${OUT}`);
