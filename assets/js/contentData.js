/* ============================================================================
   data+  ::  contentData.js
   Exam facts, per-domain metadata + objectives, PBQ format definitions,
   curated external resources, the Exam-Mechanics and Career-Guidance readers,
   and the textbook-dense domain reading content (DATAPLUS.reading[1..5],
   appended from the lazy-loaded content modules).

   This file loads first and establishes the global DATAPLUS namespace consumed
   by quizEngine.js and app.js.

   Authored by Professor Rizwan Virani, San Jacinto College.
   ========================================================================== */
window.DATAPLUS = window.DATAPLUS || {};

/* SINGLE SOURCE OF TRUTH for every exam figure. The dashboard cards, mock-exam
   engine, scoring, analytics, readiness projection, and history readouts all
   READ from this object — no exam figure is duplicated as a literal elsewhere. */
DATAPLUS.exam = {
  code: "DAO-002",
  name: "CompTIA Data+",
  minutes: 90,
  maxQuestions: 90,
  scaleLow: 100, scaleHigh: 900, passing: 675,
  domains: 5,
  launched: "2025",
  retiredPredecessor: "DA0-001"
};

/* Per-domain metadata. `objectives` mirror the official DAO-002 exam outline. */
DATAPLUS.domainMeta = [
  { id: 1, weight: 20, color: "d1", icon: "🗄", title: "Data Concepts & Environments", sectionCount: 15,
    short: "The vocabulary of data work: database types and structures, file extensions and data types, on-premise vs. cloud infrastructure, the analyst's tooling, and core AI concepts.",
    objectives: [
      { id: "1.1", t: "Explain data concepts" },
      { id: "1.2", t: "Identify types of data sources" },
      { id: "1.3", t: "Identify infrastructure concepts" },
      { id: "1.4", t: "Identify common data analysis tools" },
      { id: "1.5", t: "Identify artificial intelligence (AI) concepts" }
    ] },
  { id: 2, weight: 22, color: "d2", icon: "🧹", title: "Data Acquisition & Preparation", sectionCount: 16,
    short: "Gathering and combining data through integration and queries, exploring a data set for missing values, duplication, redundancy and outliers, and transforming and cleansing it for analysis.",
    objectives: [
      { id: "2.1", t: "Given a scenario, use data acquisition methods" },
      { id: "2.2", t: "Given a scenario, perform data exploration to identify possible inconsistencies with a data set" },
      { id: "2.3", t: "Given a scenario, perform appropriate data transformation and cleansing techniques" }
    ] },
  { id: 3, weight: 24, color: "d3", icon: "📊", title: "Data Analysis", sectionCount: 12,
    short: "The largest domain: choosing a communication approach for the audience, selecting the correct statistical method or function, and troubleshooting analysis problems with the right tool.",
    objectives: [
      { id: "3.1", t: "Given a set of requirements, determine the appropriate communication approach for data analysis" },
      { id: "3.2", t: "Given a scenario, select the appropriate statistical method or function" },
      { id: "3.3", t: "Given a scenario, troubleshoot basic issues using the appropriate tool or method" }
    ] },
  { id: 4, weight: 20, color: "d4", icon: "📈", title: "Visualization & Reporting", sectionCount: 11,
    short: "Turning analysis into communication: choosing the right charts, maps, tables and design elements, delivering reports and dashboards by the right method, and validating reporting accuracy.",
    objectives: [
      { id: "4.1", t: "Given a scenario, use the appropriate visual elements" },
      { id: "4.2", t: "Given a scenario, use the appropriate delivery or consumption method" },
      { id: "4.3", t: "Given a scenario, troubleshoot issues using report validation techniques" }
    ] },
  { id: 5, weight: 14, color: "d5", icon: "⚖", title: "Data Governance", sectionCount: 12,
    short: "Managing data responsibly: documentation, versioning and lineage; compliance, retention and regulations; privacy and protection strategies; and quality assurance through profiling and testing.",
    objectives: [
      { id: "5.1", t: "Explain data management concepts" },
      { id: "5.2", t: "Summarize concepts related to data compliance" },
      { id: "5.3", t: "Compare and contrast data privacy and protection practices" },
      { id: "5.4", t: "Compare and contrast data quality assurance practices" }
    ] }
];

/* The five PBQ formats. `domainColor` just drives the badge tint. */
DATAPLUS.pbqFormats = [
  { id: 1, icon: "🧮", domainColor: 2, obj: "2.1", badge: "SQL QUERY BUILDER", title: "SQL Query & Join Construction",
    desc: "Read a schema and a requirement, then build the query field by field — SELECT columns, the JOIN type, the WHERE filter, GROUP BY, and the aggregate function — to return the requested result set.",
    long: "Each scenario gives you an entity-relationship exhibit and a reporting requirement. Assemble the query: choose the <b>join type</b> (inner, left, right, full), the <b>filter</b> predicate, the <b>grouping</b> key, and the correct <b>aggregate</b> (SUM, COUNT, AVG). Apply join semantics and grouping rules so the row count and totals are correct." },
  { id: 2, icon: "🧹", domainColor: 2, obj: "2.2 / 2.3", badge: "DATA CLEANSING", title: "Data Exploration & Cleansing",
    desc: "Inspect a raw data set for missing values, duplicates, redundancy, outliers, and type mismatches, then select the correct transformation — imputation, dedup, parsing, conversion, standardization — for each defect.",
    long: "You are the data preparer. Read the profiling exhibit, then declare the <b>defect</b> in each column (nulls, duplicates, outliers, bad type, inconsistent format) and choose the correct <b>remediation</b> — impute, drop, parse, recode, standardize, or convert — without destroying valid data." },
  { id: 3, icon: "📈", domainColor: 4, obj: "4.1", badge: "VISUAL SELECTION", title: "Chart & Visual Selection",
    desc: "Match the analytical goal — comparison, trend over time, part-to-whole, distribution, correlation, geospatial — to the correct visual, and pick the design elements that make it readable.",
    long: "Engineer the visualization. For each requirement — comparing categories, showing change over time, part-to-whole, distribution, relationship, or location — select the correct <b>chart type</b> and the supporting <b>design elements</b> (labels, legends, color scheme, axis), avoiding misleading or cluttered choices." },
  { id: 4, icon: "🔬", domainColor: 3, obj: "3.2", badge: "STATISTICAL METHOD", title: "Statistical Method Selection",
    desc: "Given a question and a data type, choose the right statistic — measure of central tendency or dispersion, a hypothesis test, regression, or a descriptive vs. inferential vs. predictive method.",
    long: "Select the statistical tool. For each analytical question, choose the correct <b>method</b> — mean/median/mode, range/standard deviation/z-score, t-test, chi-square, correlation, simple linear regression — and classify it as <b>descriptive, inferential, predictive, or prescriptive</b>, matching the method to the data and the question." },
  { id: 5, icon: "⚖", domainColor: 5, obj: "5.2 / 5.3", badge: "GOVERNANCE MAPPING", title: "Governance & Compliance Mapping",
    desc: "Classify data, map it to the governing regulation, and place the correct privacy and protection control — RBAC, encryption in transit/at rest, masking, anonymization, retention — on each field.",
    long: "A governance workspace. For each data element, set the <b>classification</b> (public, internal, PII, PHI), identify the governing <b>regulation</b> (GDPR, PCI DSS, HIPAA-style PHI, NIST/ISO), and choose the correct <b>protection</b> — role-based access, encryption at rest or in transit, masking, anonymization, pseudonymization, or a retention rule." }
];

/* Curated free study resources. */
DATAPLUS.resources = [
  { icon: "📄", title: "Official CompTIA Data+ DAO-002 Exam Objectives (PDF)", host: "comptia.org",
    url: "https://www.comptia.org/en-us/certifications/data/",
    desc: "The authoritative exam outline — every objective and sub-bullet CompTIA can test. Download the objectives PDF from the certification page and use it as your master checklist." },
  { icon: "🎥", title: "CompTIA Data+ Learning Resources & CertMaster", host: "comptia.org",
    url: "https://www.comptia.org/en-us/certifications/data/",
    desc: "CompTIA's own CertMaster Learn and Practice paths map directly to the DAO-002 objectives, with self-paced lessons, performance-based questions, and readiness checks." },
  { icon: "👥", title: "r/CompTIA — Community Wiki & Study Guides", host: "reddit.com/r/CompTIA",
    url: "https://www.reddit.com/r/CompTIA/wiki/index/",
    desc: "Crowd-sourced study plans, exam-day experiences, and the well-known community guides. Read recent “passed” posts for current question-style intel on Data+." },
  { icon: "🐍", title: "pandas & tidyverse Documentation", host: "pandas.pydata.org",
    url: "https://pandas.pydata.org/docs/",
    desc: "The two dominant data-wrangling libraries. The pandas (Python) and tidyverse (R) docs are the reference for the merging, filtering, grouping, reshaping, and cleansing operations the exam describes in plain English." },
  { icon: "📊", title: "Tableau & Power BI — Visualization How-To", host: "tableau.com",
    url: "https://www.tableau.com/learn/training",
    desc: "Free training that builds intuition for chart selection, dashboards, and design elements — exactly the Domain 4 visualization-and-reporting skills, shown in the BI tools the objectives name." },
  { icon: "📚", title: "NIST & ISO Data Governance References", host: "nist.gov",
    url: "https://www.nist.gov/privacy-framework",
    desc: "When a governance definition has to be exact, NIST and ISO are the source. The NIST Privacy Framework and ISO standards underpin the compliance, privacy, and quality vocabulary in Domain 5." }
];

/* ---- Reader: Exam Mechanics card ---- */
DATAPLUS.examMechanics = [
  { heading: "Format, length, and delivery", body:
    "<p>The <strong>CompTIA Data+ DAO-002</strong> is a single exam of <strong>up to 90 questions</strong> to be completed in <strong>90 minutes</strong>. It is delivered either at a Pearson VUE testing center or via OnVUE online proctoring. Because the count is a <em>maximum</em>, your particular form may contain fewer scored items; CompTIA also seeds unscored “beta” questions it is evaluating for future exams, and you cannot tell which is which — so treat every question as if it counts.</p>" +
    "<p>The exam mixes <strong>multiple-choice</strong> items (single- and multiple-response) with a handful of <strong>performance-based questions (PBQs)</strong>. PBQs are interactive tasks — building a SQL query, cleansing a messy data set, matching a chart to an analytical goal, choosing a statistical method — and they typically appear first. They are worth more and consume more time, which leads directly to the single most important time-management rule below.</p>" +
    "<div class='callout exam'><div class='lbl'>Exam tip</div>PBQs front-load the exam and can eat your clock. If a PBQ stalls you, <strong>flag it and move on</strong>. Bank the fast multiple-choice points first, then return with whatever time remains.</div>" },
  { heading: "Scoring: the 100–900 scale", body:
    "<p>Data+ is scored on a <strong>scaled range of 100 to 900</strong>, and the passing score is <strong>675</strong>. Scaled scoring is not a simple percentage: CompTIA weights items by difficulty and equates across exam forms so that no candidate is advantaged or disadvantaged by drawing a harder set. As a result you cannot reverse-engineer an exact “number correct” from 675, and CompTIA does not publish the raw-to-scaled mapping.</p>" +
    "<p>Practically, strong candidates aim to answer roughly <strong>75% or more</strong> of questions correctly to give themselves comfortable margin. There is <strong>no penalty for guessing</strong> — an unanswered question is simply wrong — so you should never leave an item blank. Eliminate obviously wrong options, make your best choice, flag it if unsure, and move on.</p>" +
    "<blockquote>This platform’s mock exam reports a scaled score using a transparent linear approximation of the 100–900 band. Use it as a <em>relative</em> readiness signal — “am I trending toward 675?” — not as a literal prediction of your official score.</blockquote>" },
  { heading: "Question styles and how to read them", body:
    "<p>CompTIA writes “best answer” questions. Often two or three options are <em>plausible</em> and only one is <em>best</em> for the scenario described. Read the <strong>last sentence first</strong> — it usually contains the actual ask (“which chart <em>best</em> shows…”, “what should the analyst do <em>first</em>…”). Words like <strong>first</strong>, <strong>best</strong>, <strong>most likely</strong>, and <strong>least</strong> are decisive; circle them mentally.</p>" +
    "<ul><li><strong>Multiple-response</strong> items tell you how many to pick (“choose two”). You must get all of them right for credit.</li><li><strong>Scenario</strong> items bury the relevant detail in a paragraph — identify the data set, the analytical goal, and the audience or constraint before looking at options.</li><li><strong>PBQs</strong> reward methodical work; partial credit is generally available, so complete every field you can even if unsure of one.</li></ul>" +
    "<div class='callout'><div class='lbl'>Strategy</div>Use the <strong>flag-and-review</strong> workflow. First pass: answer everything you know cold and flag the rest. Second pass: spend remaining minutes only on flagged items. This guarantees you never run out of time with easy points unanswered.</div>" },
  { heading: "Eligibility, cost, and renewal", body:
    "<p>There are <strong>no formal prerequisites</strong>, but CompTIA recommends roughly <strong>18–24 months</strong> of experience in a report/business analyst role, plus exposure to databases and analytics tools, and a foundation equivalent to CompTIA Tech+ or A+. The exam voucher cost varies by region (commonly in the US$250+ range). Academic and bundle discounts exist — ask your institution. There may also be funding available for a free voucher. Connect with the Program Director or your professor for more information about funding opportunities.</p>" +
    "<p>Data+ is valid for <strong>three years</strong> and participates in CompTIA’s <strong>Continuing Education (CE)</strong> program: you renew by earning continuing-education units, completing higher-level certifications, or related activities, rather than re-sitting the exam. Keeping the certification active signals to employers that your analytics skills are current.</p>" },
  { heading: "Exam-day logistics", body:
    "<p>Bring two forms of ID; for online proctoring you must show a clear workspace, a working webcam, and a stable connection. You cannot use notes, phones, or smartwatches. A simple on-screen whiteboard or provided scratch material may be available — use it to jot the formula you’ll otherwise lose under pressure (think the order of operations in a join, or the difference between mean and median under skew).</p>" +
    "<div class='callout scenario'><div class='lbl'>Mindset</div>Arrive early, breathe, and remember: the exam tests <strong>judgment</strong>, not trivia recall. Most questions are answerable by applying core principles — match the method to the data, the chart to the goal, the control to the classification — to the scenario in front of you.</div>" }
];

/* ---- Reader: Career Guidance card ---- */
DATAPLUS.careerGuidance = [
  { heading: "Where Data+ sits on the ladder", body:
    "<p><strong>Data+ is CompTIA’s foundational, vendor-neutral data-analytics certification.</strong> It validates that you can take a business question, acquire and clean the relevant data, analyze it with appropriate statistics, visualize the result, and handle it responsibly under governance rules. It sits above general IT-literacy credentials (Tech+, A+) and alongside platform-specific analytics certificates (Google Data Analytics, Microsoft Power BI Data Analyst), and below advanced data-science or specialized BI credentials.</p>" +
    "<p>For hiring managers, Data+ on a résumé is shorthand for “this person can work end-to-end with data and won’t need the analytics lifecycle explained from scratch.” It is increasingly listed as a <em>preferred</em> qualification for junior analyst roles where vendor-neutral fundamentals matter more than one tool.</p>" },
  { heading: "Why a vendor-neutral data cert matters", body:
    "<p>Most analytics hiring tests two things: can you reason about data, and can you use the team’s tools. Tool skills age quickly and differ by employer; the <em>reasoning</em> — choosing the right join, spotting an outlier, matching a chart to a goal, knowing when a mean misleads — is durable and transferable. Data+ certifies that durable layer, which is exactly why it travels well across industries and toolchains.</p>" +
    "<p>In plain terms: a Power BI shop and a Tableau shop, a SQL Server team and a Postgres team, all need the same underlying judgment. Data+ proves you have it before you ever touch their specific stack, which lowers a hiring manager’s risk.</p>" +
    "<div class='callout exam'><div class='lbl'>Why it matters</div>Vendor-neutral fundamentals are the part of an analyst’s skill set that <strong>does not expire</strong> when the company switches BI tools. Data+ is the credential that names that skill set explicitly.</div>" },
  { heading: "Roles Data+ opens", body:
    "<p>Data+ aligns with a cluster of early-career roles. It will not, by itself, make you a senior data scientist — but it credibly qualifies you for:</p>" +
    "<ul>" +
    "<li><strong>Data Analyst</strong> — acquiring, cleaning, analyzing, and visualizing data to answer business questions. The whole exam maps to this job.</li>" +
    "<li><strong>Business / Reporting Analyst</strong> — building recurring reports and dashboards, defining KPIs, and communicating to technical and non-technical audiences (Domains 3 and 4).</li>" +
    "<li><strong>Business Intelligence (BI) Analyst</strong> — modeling data and building self-service dashboards in tools like Power BI, Tableau, or Looker.</li>" +
    "<li><strong>Operations / Marketing / Financial Analyst</strong> — domain-specific analyst roles that all rest on the same acquisition, analysis, and visualization fundamentals.</li>" +
    "<li><strong>Data Governance / Quality Analyst (entry)</strong> — Domain 5 governance, compliance, and quality-assurance content underpins these roles.</li>" +
    "</ul>" },
  { heading: "Building the path beyond Data+", body:
    "<p>Treat Data+ as a launch point, not a destination. A common trajectory: <em>Data+ → hands-on analyst experience → a specialization</em>. From here, BI-minded analysts deepen into a specific platform (Microsoft Power BI Data Analyst, Tableau certifications); statistics-minded learners move toward data science (Python/R, machine learning, a graduate course or bootcamp); engineering-minded learners pursue data-engineering tracks (cloud data platforms, ETL/orchestration); and those eyeing governance work toward data-management and privacy credentials.</p>" +
    "<div class='callout scenario'><div class='lbl'>Practical advice</div>Pair the cert with a <strong>portfolio</strong> — two or three end-to-end projects that acquire real data, clean it, analyze it, and present a dashboard with a written insight. Certifications get you past résumé filters; a portfolio gets you through interviews.</div>" }
];

/* Reading content is NO LONGER bundled here. To keep this file lean and to
   load only what a student opens, each domain's dense reading sections live in
   their own module under assets/js/content/domainN.js and are fetched on demand
   by app.js the first time a Domain Study card is opened. This object is the
   shared target those modules populate: DATAPLUS.reading[N] = [ ...sections ]. */
DATAPLUS.reading = DATAPLUS.reading || {};

/* Flashcard decks are likewise lazy-loaded from assets/js/content/flashN.js
   (100 cards per domain) and populate this object: DATAPLUS.flash[N] = [ ...cards ]. */
DATAPLUS.flash = DATAPLUS.flash || {};
