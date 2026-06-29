/* data+ :: content/pbqs.js — DA0-002 performance-based question database (30). */
window.DATAPLUS = window.DATAPLUS || {}; DATAPLUS.pbqs = DATAPLUS.pbqs || [];
DATAPLUS.pbqs.push(

  /* ============================================================
     FORMAT 1 — SQL QUERY BUILDER (domain 2, obj 2.1)  PBQ-01..06
     ============================================================ */
  {
    id:"PBQ-01", format:1, domain:2, obj:"2.1",
    title:"Total Revenue per Customer",
    brief:"Finance wants the total amount each customer has spent, including customers who have never placed an order (they should show as 0). Complete the query field by field.",
    exhibit:"<span class='cy'>customers</span>            <span class='cy'>orders</span>\n+--------------+    +-----------------+\n| customer_id  |--->| order_id        |\n| name         | 1:N| customer_id (FK)|\n| region       |    | amount          |\n+--------------+    +-----------------+\n\n<span class='dim'>-- Requirement: one row per customer; customers with</span>\n<span class='dim'>-- NO orders must still appear with a total of 0.</span>\n\nSELECT c.name, <span class='hl'>____</span>(o.amount) AS total\nFROM customers c\n<span class='hl'>____</span> orders o ON c.customer_id = o.customer_id\nGROUP BY <span class='hl'>____</span>;",
    fields:[
      { label:"Aggregate function for total spent", hint:"Add the dollar amounts.", options:["COUNT","SUM","AVG"], answer:1, explain:"SUM adds the amount values to give total spend. COUNT would return the number of orders, not dollars; AVG gives the mean order size, not the total." },
      { label:"JOIN type (keep customers with no orders)", hint:"Which side must always appear?", options:["INNER JOIN","LEFT JOIN","RIGHT JOIN"], answer:1, explain:"LEFT JOIN keeps every row from customers (the left table) even when no matching order exists, so zero-order customers still appear. INNER JOIN drops unmatched customers; RIGHT JOIN preserves orders, not customers." },
      { label:"GROUP BY key", hint:"One row per customer.", options:["o.amount","c.name","o.order_id"], answer:1, explain:"Grouping by c.name (the customer) collapses each customer's orders into a single aggregated row. Grouping by o.amount or o.order_id would give one row per order, defeating the per-customer rollup." },
      { label:"How will a no-order customer's total appear?", hint:"SUM over no matched rows.", options:["NULL unless wrapped in COALESCE","Always exactly 0","The row is omitted"], answer:0, explain:"With a LEFT JOIN, an unmatched customer's amount is NULL and SUM(NULL) returns NULL, so COALESCE(SUM(o.amount),0) is needed to literally show 0. The row is NOT omitted (that is the point of LEFT JOIN)." }
    ],
    summary:"Use SUM with a LEFT JOIN grouped by customer to total spend while retaining zero-order customers; wrap the SUM in COALESCE to render their total as 0 instead of NULL."
  },
  {
    id:"PBQ-02", format:1, domain:2, obj:"2.1",
    title:"Orders Only for Active Customers",
    brief:"Build a report listing every order along with the customer name, but ONLY for customers flagged active. Orders with no matching active customer must be excluded. Complete the query.",
    exhibit:"<span class='cy'>customers</span>                 <span class='cy'>orders</span>\n+----------------+      +-----------------+\n| customer_id PK |----->| order_id        |\n| name           |  1:N | customer_id FK  |\n| status         |      | amount          |\n+----------------+      | order_date      |\n                        +-----------------+\n\n<span class='dim'>-- Requirement: order_id, name for ACTIVE customers only.</span>\n\nSELECT o.order_id, c.name\nFROM orders o\n<span class='hl'>____</span> customers c ON o.customer_id = c.customer_id\nWHERE c.status = <span class='hl'>____</span>;",
    fields:[
      { label:"JOIN type", hint:"Both sides must match.", options:["LEFT JOIN","INNER JOIN","FULL OUTER JOIN"], answer:1, explain:"INNER JOIN returns only rows that match on both sides, so orders without a real customer are dropped automatically. LEFT JOIN would keep orphan orders; FULL OUTER would also keep unmatched customers." },
      { label:"WHERE predicate value", hint:"String literal, single quotes.", options:["'active'","active","1=1"], answer:0, explain:"A text status compares to a quoted string literal 'active'. Unquoted active would be parsed as a column/identifier and error; 1=1 is a tautology that filters nothing." },
      { label:"Placing status='active' in WHERE vs ON", hint:"Effect on an INNER JOIN.", options:["No difference for an INNER JOIN","WHERE secretly converts it to an outer join","ON is illegal here"], answer:0, explain:"For an INNER JOIN the filter behaves identically whether in ON or WHERE because non-matching rows are excluded either way. (The distinction only matters for OUTER joins, where a WHERE filter on the outer table can quietly cancel the outer behavior.)" }
    ],
    summary:"An INNER JOIN matched on customer_id plus WHERE status='active' returns named orders for active customers and silently drops orphan orders."
  },
  {
    id:"PBQ-03", format:1, domain:2, obj:"2.1",
    title:"Top Product Categories by Units Sold",
    brief:"Merchandising wants the number of units sold per product category, listed highest first, but only categories that sold more than 100 units. Complete the aggregation query.",
    exhibit:"<span class='cy'>products</span>              <span class='cy'>order_items</span>\n+--------------+     +------------------+\n| product_id PK|---->| product_id FK    |\n| category     | 1:N | quantity         |\n+--------------+     +------------------+\n\n<span class='dim'>-- units per category, &gt;100 only, highest first</span>\n\nSELECT p.category, SUM(oi.quantity) AS units\nFROM products p\nINNER JOIN order_items oi ON p.product_id = oi.product_id\nGROUP BY p.category\n<span class='hl'>____</span> SUM(oi.quantity) &gt; 100\nORDER BY units <span class='hl'>____</span>;",
    fields:[
      { label:"Clause that filters an aggregate", hint:"It comes after GROUP BY.", options:["WHERE","HAVING","FILTER"], answer:1, explain:"HAVING filters groups using an aggregate (SUM > 100) after grouping. WHERE filters individual rows before aggregation and cannot reference SUM(); FILTER is not a standalone clause here." },
      { label:"Sort direction for 'highest first'", hint:"Descending.", options:["ASC","DESC","RANDOM"], answer:1, explain:"DESC orders the largest unit totals first. ASC would put the smallest first; RANDOM is not a valid ORDER BY direction." },
      { label:"Could WHERE quantity > 100 replace the HAVING?", hint:"Per-row vs per-group.", options:["Yes, identical result","No — WHERE tests each row, not the group total","Only if indexed"], answer:1, explain:"WHERE quantity > 100 would keep only individual line items over 100 units, which is a different question. HAVING tests the summed total per category, which is what was asked." },
      { label:"Aggregate to count UNITS (not line rows)", hint:"Sum the quantity column.", options:["COUNT(*)","SUM(oi.quantity)","COUNT(DISTINCT oi.product_id)"], answer:1, explain:"SUM(quantity) adds the actual units. COUNT(*) counts order-item rows regardless of quantity; COUNT(DISTINCT product_id) counts how many products, not units sold." }
    ],
    summary:"GROUP BY category with SUM(quantity), filter the group total with HAVING SUM(...)>100, and ORDER BY the total DESC to rank categories by units sold."
  },
  {
    id:"PBQ-04", format:1, domain:2, obj:"2.1",
    title:"Average Salary by Department",
    brief:"HR needs the average salary for each department, rounded, but the analyst is worried about duplicate employee rows from a bad import. Build a correct, dedup-safe aggregate.",
    exhibit:"<span class='cy'>employees</span>\n+----------------+\n| emp_id  PK     |\n| dept_id        |\n| salary         |\n+----------------+\n\n<span class='dim'>NOTE: a faulty join earlier produced duplicate emp rows.</span>\n<span class='dim'>Goal: average salary per department, one number each.</span>\n\nSELECT dept_id, <span class='hl'>____</span> AS avg_salary\nFROM (SELECT <span class='hl'>____</span> emp_id, dept_id, salary FROM employees) e\nGROUP BY dept_id;",
    fields:[
      { label:"Aggregate for average salary", hint:"Mean of the column.", options:["AVG(salary)","SUM(salary)","MEDIAN(salary)"], answer:0, explain:"AVG(salary) returns the arithmetic mean per group, which is what 'average salary' means. SUM gives the total payroll; MEDIAN is not the requested statistic (and is not standard SQL)." },
      { label:"Keyword to remove duplicate employee rows", hint:"In the inner SELECT.", options:["DISTINCT","TOP","UNIQUE"], answer:0, explain:"SELECT DISTINCT in the subquery collapses identical duplicated rows so each employee is counted once before averaging. TOP limits row count, not duplicates; UNIQUE is a constraint keyword, not a SELECT modifier." },
      { label:"Why dedup BEFORE averaging matters", hint:"Effect of dupes on a mean.", options:["Duplicates skew AVG toward over-represented salaries","AVG ignores duplicates automatically","It only changes performance"], answer:0, explain:"Duplicated rows weight those salaries more heavily, biasing the mean. AVG does not auto-deduplicate, so cleaning first is required; this is a correctness issue, not just speed." }
    ],
    summary:"Deduplicate employees with a DISTINCT subquery, then GROUP BY dept_id with AVG(salary) so each department's mean is computed on one row per employee."
  },
  {
    id:"PBQ-05", format:1, domain:2, obj:"2.1",
    title:"Customers Who Never Ordered",
    brief:"Marketing wants a list of customers who have NEVER placed an order so they can be targeted with a win-back campaign. Complete the anti-join query.",
    exhibit:"<span class='cy'>customers</span>            <span class='cy'>orders</span>\n+--------------+    +-----------------+\n| customer_id  |--->| order_id        |\n| name         |    | customer_id FK  |\n+--------------+    +-----------------+\n\n<span class='dim'>-- Requirement: customers with ZERO orders.</span>\n\nSELECT c.customer_id, c.name\nFROM customers c\n<span class='hl'>____</span> orders o ON c.customer_id = o.customer_id\nWHERE o.<span class='hl'>____</span> IS NULL;",
    fields:[
      { label:"JOIN type for an anti-join", hint:"Keep all customers, even unmatched.", options:["INNER JOIN","LEFT JOIN","CROSS JOIN"], answer:1, explain:"LEFT JOIN keeps every customer and fills order columns with NULL when no order exists. INNER JOIN would only return customers WITH orders; CROSS JOIN pairs every row with every other, which is wrong." },
      { label:"Column to test for IS NULL", hint:"Should be NULL only when no order matched.", options:["c.name","o.order_id","c.customer_id"], answer:1, explain:"o.order_id (a column from the orders side) is NULL precisely when the LEFT JOIN found no matching order, isolating customers who never ordered. Testing a customers-side column would never be NULL for valid customers." },
      { label:"This pattern is called", hint:"Negative of a join.", options:["A self-join","A LEFT-JOIN anti-join (exclusion)","A natural join"], answer:1, explain:"LEFT JOIN + WHERE right-side IS NULL is the classic anti-join used to find rows with no match. A self-join joins a table to itself; a natural join matches on same-named columns." }
    ],
    summary:"A LEFT JOIN with WHERE o.order_id IS NULL is an anti-join that returns exactly the customers who have no orders."
  },
  {
    id:"PBQ-06", format:1, domain:2, obj:"2.1",
    title:"Monthly Sales Filtered by Date",
    brief:"Build a report of total sales for Q1 2024 (Jan–Mar) grouped by month. Get the filter and grouping right so partial-year noise is excluded.",
    exhibit:"<span class='cy'>orders</span>\n+----------------+\n| order_id  PK   |\n| order_date     |  (DATE)\n| amount         |\n+----------------+\n\n<span class='dim'>-- Q1 2024 only, one total per month.</span>\n\nSELECT <span class='hl'>____</span> AS mth, SUM(amount) AS sales\nFROM orders\nWHERE order_date <span class='hl'>____</span> '2024-01-01' AND order_date &lt; '2024-04-01'\nGROUP BY mth\nORDER BY mth;",
    fields:[
      { label:"Function to bucket dates by month", hint:"Pull the month part.", options:["MONTH(order_date)","ROUND(order_date)","LEN(order_date)"], answer:0, explain:"MONTH(order_date) (or equivalent DATE_TRUNC/EXTRACT) returns the month so rows group into monthly buckets. ROUND and LEN are numeric/string functions that do not extract a date part." },
      { label:"Comparison operator for the lower bound", hint:"Include Jan 1 itself.", options:["&gt; (strictly greater)","&gt;= (greater or equal)","!= (not equal)"], answer:1, explain:">= includes orders placed exactly on 2024-01-01. Using > would drop New Year's Day orders; != would exclude only that date and keep everything else, which is wrong." },
      { label:"Why use order_date < '2024-04-01' instead of <= '2024-03-31'", hint:"Think timestamps.", options:["They are always identical","< next-month-start safely includes any time on Mar 31","<= is faster"], answer:1, explain:"A half-open range (< first day of April) captures every instant of March 31, even with a time component, avoiding the off-by-one a <= '2024-03-31' can cause on datetime values. They are not always identical, and speed is not the reason." }
    ],
    summary:"Filter with a half-open date range (>= start, < next-period start), extract the month, and SUM grouped by month to produce clean Q1 monthly totals."
  },

  /* ============================================================
     FORMAT 2 — DATA CLEANSING (domain 2, obj 2.2 / 2.3)  PBQ-07..12
     ============================================================ */
  {
    id:"PBQ-07", format:2, domain:2, obj:"2.2",
    title:"Profiling a Messy Customer Table",
    brief:"You profiled an imported customer table. Diagnose each column's primary defect and choose the safest remediation that preserves valid data.",
    exhibit:"<span class='cy'>cust_id  name        age   state   email</span>\n101      Jane Smith  34    CA      jane@x.com\n102      Bob Jones   <span class='warnc'>null</span>    TX      bob@y.com\n103      A. Lee      29    <span class='warnc'>California</span> a.lee@z.com\n104      Bob Jones   <span class='warnc'>34</span>    <span class='warnc'>TX</span>      bob@y.com   <span class='dim'>(dup of 102? )</span>\n105      Mei Chen    <span class='warnc'>999</span>   NY      mei@q.com\n\n<span class='dim'>state should be a 2-letter code; age is 0-120.</span>",
    fields:[
      { label:"age = null (row 102) — best fix", hint:"Numeric, mostly complete column.", options:["Drop the whole row","Impute with the column median","Replace with 0"], answer:1, explain:"Median imputation fills the gap without discarding the row's other valid fields and resists outliers. Dropping the row loses good data; replacing with 0 invents an impossible age and skews stats." },
      { label:"state = 'California' (row 103) — defect", hint:"Compare to the rule.", options:["Inconsistent format / non-standard value","Missing value","Outlier"], answer:0, explain:"'California' violates the 2-letter-code standard, so it is a formatting/standardization defect to be recoded to 'CA'. It is present (not missing) and within a valid set (not a numeric outlier)." },
      { label:"Rows 102 and 104 — defect", hint:"Same person twice.", options:["Outlier","Duplicate record","Type mismatch"], answer:1, explain:"Identical name and email indicate a duplicate record to be deduplicated (keep one). It is not an outlier or a type problem — the values are valid, just repeated." },
      { label:"age = 999 (row 105) — best handling", hint:"Outside 0-120.", options:["Keep as-is","Treat as an invalid outlier and impute or null it","Multiply by 0.1"], answer:1, explain:"999 is impossible for human age, so flag it as an invalid outlier and impute or set to NULL for later treatment. Keeping it corrupts averages; arbitrarily rescaling fabricates data." }
    ],
    summary:"Median-impute the missing age, standardize 'California' to 'CA', dedup the repeated Bob Jones record, and treat 999 as an invalid outlier — each fix preserves the maximum amount of valid data."
  },
  {
    id:"PBQ-08", format:2, domain:2, obj:"2.3",
    title:"Type Mismatches and Bad Formats",
    brief:"A CSV loaded every column as text. Identify the conversion or parsing each field needs before analysis.",
    exhibit:"<span class='cy'>order_id  amount     order_date    phone</span>\n5001      \"$1,299.00\" 03/14/2024   (555) 867-5309\n5002      \"$45.50\"    2024-03-15   555.867.5309\n5003      \"$ 12\"      March 16 2024 5558675309\n\n<span class='dim'>All values arrived as STRING. Target types vary.</span>",
    fields:[
      { label:"amount column target", hint:"Strip symbols first.", options:["Keep as string","Remove $ and commas, then cast to DECIMAL","Cast directly to INTEGER"], answer:1, explain:"You must strip the currency symbol and thousands separators before casting to DECIMAL to keep cents accurate. A direct INTEGER cast fails on non-numeric characters and loses the fractional part." },
      { label:"order_date column problem", hint:"Three different layouts.", options:["Inconsistent date formats needing parse to a single DATE type","Missing values","Duplicates"], answer:0, explain:"The same field uses MM/DD/YYYY, ISO, and text-month forms, so each must be parsed into one canonical DATE type. Nothing is missing or duplicated here." },
      { label:"phone column best treatment", hint:"Goal: comparable values.", options:["Leave each as typed","Standardize by stripping non-digits to a uniform format","Convert to a number"], answer:1, explain:"Standardizing to digits-only (or a single mask) makes the values comparable and joinable. Leaving mixed punctuation blocks matching; storing as a numeric type drops leading zeros and the leading-paren formatting." },
      { label:"Order of operations for amount", hint:"Clean before cast.", options:["Cast first, then clean","Clean (remove symbols) first, then cast","They can be done in any order"], answer:1, explain:"Cleaning must precede casting because the cast errors on '$' and ','. Doing them in the wrong order, or assuming order is irrelevant, produces conversion failures." }
    ],
    summary:"Strip symbols and cast amount to DECIMAL, parse the three date layouts into one DATE type, and normalize phone numbers to a uniform digit pattern — cleaning always precedes type conversion."
  },
  {
    id:"PBQ-09", format:2, domain:2, obj:"2.2",
    title:"Missing-Data Strategy",
    brief:"A survey table has missing values in several columns. Choose the most appropriate handling for each based on how much is missing and the column's role.",
    exhibit:"<span class='cy'>column        missing%   notes</span>\nrespondent_id  0%        primary key\nincome         42%        skewed, key analysis var\ncomment        88%        free text, optional\nregion         3%         categorical, required\n",
    fields:[
      { label:"income (42% missing, skewed)", hint:"High missingness + skew.", options:["Mean imputation","Median imputation or model-based imputation; consider a missing-indicator","Delete every row missing income"], answer:1, explain:"With heavy skew, the median (or a model-based estimate) imputes more honestly than the mean, and a missing-indicator flag preserves the signal of absence. Mean imputation distorts a skewed variable; deleting 42% of rows discards most of the data." },
      { label:"comment (88% missing, optional)", hint:"Almost entirely empty, not core.", options:["Impute the text","Leave blank / drop the column from analysis","Fill with 'N/A' and analyze as a category"], answer:1, explain:"An 88%-empty optional free-text field carries little analytic value and should be left blank or dropped. You cannot meaningfully impute free text, and turning 'N/A' into a dominant category is misleading." },
      { label:"region (3% missing, required categorical)", hint:"Low missingness, categorical.", options:["Impute with the mode (most common region) or a separate 'Unknown' level","Impute with the mean","Drop the column"], answer:0, explain:"For a categorical column with only 3% gaps, mode imputation or an explicit 'Unknown' category is appropriate. Mean is undefined for categories, and dropping a required low-missingness column wastes good data." },
      { label:"General rule when missingness is very high", hint:"Cost vs benefit.", options:["Always impute no matter what","Imputing a mostly-empty column adds noise; consider dropping it","Always drop any column with nulls"], answer:1, explain:"Imputing a column that is mostly missing fabricates the majority of its values and injects noise, so dropping is often better. The extremes — always impute or always drop — ignore the missingness level and the column's importance." }
    ],
    summary:"Match the strategy to the column: median/model-impute the skewed key variable with a missing flag, drop the near-empty free text, mode-impute the low-missing categorical, and avoid blanket rules."
  },
  {
    id:"PBQ-10", format:2, domain:2, obj:"2.3",
    title:"Deduplication and Redundancy",
    brief:"A merged contact list has exact duplicates, fuzzy duplicates, and a redundant derived column. Decide how to handle each.",
    exhibit:"<span class='cy'>id  first   last    email            full_name</span>\n1   John    Doe     john@a.com       John Doe\n2   John    Doe     john@a.com       John Doe   <span class='warnc'>(exact dup)</span>\n3   Jon     Doe     john@a.com       Jon Doe    <span class='warnc'>(same email)</span>\n4   Mary    Lee     mary@b.com       Mary Lee\n\n<span class='dim'>full_name = first + ' ' + last (derived).</span>",
    fields:[
      { label:"Rows 1 and 2 (identical) — action", hint:"Byte-for-byte equal.", options:["Keep both","Drop one — exact duplicate","Merge into a new record"], answer:1, explain:"Identical rows are exact duplicates; keep a single copy. Keeping both inflates counts, and there is nothing to merge since the data is the same." },
      { label:"Row 3 vs row 1 (Jon vs John, same email)", hint:"Likely the same person.", options:["Definitely different people — keep both","Probable fuzzy/near duplicate — flag for matching on email","Outlier to delete"], answer:1, explain:"A shared email with a near-identical name is a classic fuzzy duplicate; flag it for entity resolution rather than blindly keeping or deleting. It is not an outlier, and assuming they are different ignores the matching key." },
      { label:"full_name column — defect type", hint:"It is computable from other columns.", options:["Redundant/derived data","Missing data","Type mismatch"], answer:0, explain:"full_name is fully derivable from first + last, so it is redundant data that can be dropped or recomputed on demand. It is present and correctly typed — the issue is duplication of information, not absence." },
      { label:"Risk of keeping the derived column", hint:"If first/last change.", options:["No risk at all","It can drift out of sync with first/last","It improves normalization"], answer:1, explain:"Storing a derived value risks update anomalies — change last name and full_name becomes stale. Far from improving normalization, redundant derived columns work against it." }
    ],
    summary:"Drop exact duplicates, flag fuzzy duplicates (same email) for entity resolution, and remove the redundant derived full_name to avoid update anomalies."
  },
  {
    id:"PBQ-11", format:2, domain:2, obj:"2.3",
    title:"Outlier Investigation",
    brief:"A sensor dataset shows extreme values. Decide which are true outliers to handle and which are legitimate, and pick the right treatment.",
    exhibit:"<span class='cy'>reading_id  temp_c   source</span>\n1           21.4     sensor-A\n2           22.1     sensor-A\n3           <span class='warnc'>-273.0</span>  sensor-A   <span class='dim'>(absolute zero?)</span>\n4           23.0     sensor-A\n5           <span class='warnc'>41.9</span>    sensor-B   <span class='dim'>(heatwave day)</span>\n6           <span class='warnc'>2200</span>    sensor-A   <span class='dim'>(F not C?)</span>\n",
    fields:[
      { label:"temp_c = -273.0 — most likely", hint:"Physically impossible reading.", options:["A valid cold reading to keep","An invalid/error value (sensor fault) to null or impute","A formatting issue"], answer:1, explain:"-273.0 °C is essentially absolute zero — an impossible ambient reading indicating a sensor fault, so null/impute it. It is not a valid reading, and the value itself is numeric, not mis-formatted." },
      { label:"temp_c = 41.9 on a heatwave day — action", hint:"Extreme but plausible.", options:["Delete as an outlier","Keep — a legitimate extreme value","Cap it at 30"], answer:1, explain:"41.9 °C is high but physically plausible during a heatwave, so it is a legitimate extreme value to retain. Deleting or capping a real reading discards true signal and biases results." },
      { label:"temp_c = 2200 — most likely cause", hint:"Way beyond Earth temps.", options:["Genuine spike","Unit error (Fahrenheit or scaling) needing conversion or removal","Missing value"], answer:1, explain:"2200 is far outside any real ambient temperature, pointing to a unit/scaling error to convert or drop. It is clearly not genuine and the cell is populated, so it is not missing." },
      { label:"Best first step before deleting any outlier", hint:"Understand the cause.", options:["Investigate the cause (domain check, source, units)","Always delete the top and bottom 1%","Ignore all outliers"], answer:0, explain:"Outliers must be investigated for root cause — error vs real event — before treatment. Blanket trimming the tails can erase valid extremes, and ignoring them lets errors corrupt the analysis." }
    ],
    summary:"Distinguish error outliers (-273 sensor fault, 2200 unit error) from a legitimate extreme (41.9 heatwave); investigate causes before deciding to impute, convert, or keep."
  },
  {
    id:"PBQ-12", format:2, domain:2, obj:"2.2",
    title:"Standardization Before Joining",
    brief:"Two tables won't join cleanly because key text fields are inconsistent. Pick the standardization step for each so the join keys match.",
    exhibit:"<span class='cy'>table_A.company</span>        <span class='cy'>table_B.company</span>\n\"Acme  Inc.\"           \"acme inc\"\n\" Globex \"             \"GLOBEX\"\n\"Initech, LLC\"         \"initech llc\"\n\n<span class='dim'>Join on company name is failing for every row.</span>",
    fields:[
      { label:"Case differences (Acme vs acme, GLOBEX)", hint:"Make comparison case-insensitive.", options:["Leave as-is","Lowercase (or uppercase) both keys","Reverse the strings"], answer:1, explain:"Folding both keys to a single case makes 'Acme' and 'acme' match. Leaving them as-is keeps the mismatch; reversing strings is meaningless for matching." },
      { label:"Leading/trailing and double spaces", hint:"' Globex ' vs 'globex'.", options:["TRIM and collapse internal whitespace","Pad with more spaces","Ignore — spaces never matter"], answer:0, explain:"TRIM removes surrounding spaces and collapsing runs of internal spaces fixes 'Acme  Inc.'. Padding worsens the problem, and spaces clearly do matter here since they break the join." },
      { label:"Punctuation ('Inc.', ',', 'LLC')", hint:"Differs across sources.", options:["Strip/normalize punctuation and suffixes","Keep all punctuation exactly","Replace letters with numbers"], answer:0, explain:"Removing or normalizing punctuation and legal suffixes aligns 'Initech, LLC' with 'initech llc'. Keeping punctuation preserves the mismatch; substituting numbers corrupts the value." },
      { label:"Overall, this set of steps is called", hint:"One umbrella term.", options:["Data standardization / normalization of keys","Data imputation","Data sampling"], answer:0, explain:"Casing, trimming, and punctuation cleanup are all standardization (key normalization) so values are comparable. Imputation fills missing values and sampling selects subsets — neither addresses inconsistent formatting." }
    ],
    summary:"Standardize join keys by folding case, trimming/collapsing whitespace, and normalizing punctuation/suffixes so inconsistent company names match across the two tables."
  },

  /* ============================================================
     FORMAT 3 — CHART / VISUAL SELECTION (domain 4, obj 4.1)  PBQ-13..18
     ============================================================ */
  {
    id:"PBQ-13", format:3, domain:4, obj:"4.1",
    title:"Trend of Monthly Revenue",
    brief:"An executive wants to see how monthly revenue has changed over the last 24 months and whether it is trending up. Choose the visualization and its key design elements.",
    exhibit:"<span class='cy'>REQUIREMENT BRIEF</span>\nGoal ........ show change over time (24 monthly points)\nVariables ... month (continuous, ordered) vs revenue ($)\nAudience .... executives, quick read\nMessage ..... is revenue trending up?\n",
    fields:[
      { label:"Best chart type", hint:"Continuous value over ordered time.", options:["Pie chart","Line chart","Stacked bar of categories"], answer:1, explain:"A line chart is the standard for a continuous metric across ordered time, making the trend's slope obvious. A pie shows part-to-whole at one moment; a category bar does not emphasize sequential change." },
      { label:"X-axis", hint:"What varies along time.", options:["Revenue","Month (time)","Region"], answer:1, explain:"Time (month) belongs on the horizontal axis so the eye reads left-to-right chronologically. Putting revenue on X would invert the relationship; region is not part of this question." },
      { label:"Y-axis baseline", hint:"Avoid exaggerating the trend.", options:["Start at zero (or clearly note a truncated axis)","Always truncate to amplify changes","No axis labels needed"], answer:0, explain:"Starting the value axis at zero (or explicitly flagging truncation) prevents visually exaggerating small changes. Truncating to amplify is misleading, and omitting axis labels makes the chart unreadable." },
      { label:"Helpful addition for 'trending up?'", hint:"Summarize direction.", options:["A trendline / moving average","A 3-D bevel effect","Rainbow colors per month"], answer:0, explain:"A trendline or moving average clarifies the overall direction beyond month-to-month noise. 3-D effects distort perception, and per-month rainbow color adds clutter without meaning." }
    ],
    summary:"Plot revenue as a line chart with time on the X-axis, a zero (or clearly truncated) Y baseline, and a trendline to answer the 'is it growing?' question cleanly."
  },
  {
    id:"PBQ-14", format:3, domain:4, obj:"4.1",
    title:"Comparing Sales Across Regions",
    brief:"A manager wants to compare total sales among 8 regions for a single quarter and rank them. Choose the visualization and design choices.",
    exhibit:"<span class='cy'>REQUIREMENT BRIEF</span>\nGoal ........ compare a value across categories\nVariables ... region (8 categories) vs total sales ($)\nTime ........ one quarter (a single snapshot)\nMessage ..... which regions sell the most?\n",
    fields:[
      { label:"Best chart type", hint:"Compare discrete categories.", options:["Line chart","Bar chart","Scatter plot"], answer:1, explain:"A bar chart compares a value across discrete categories and supports easy ranking by length. A line chart implies continuity between regions (false); a scatter plot is for relationships between two numeric variables." },
      { label:"Most readable ordering of bars", hint:"Help the ranking question.", options:["Alphabetical by region","Sorted by sales value (descending)","Random"], answer:1, explain:"Sorting bars by value makes the highest and lowest regions instantly clear. Alphabetical order forces the reader to hunt, and random order is actively confusing." },
      { label:"Is a pie chart a good alternative here?", hint:"8 slices, ranking goal.", options:["Yes, pies are best for comparisons","No — 8 slices are hard to compare and ranking is poor","Only if 3-D"], answer:1, explain:"With many slices, angle/area comparison is imprecise and ranking is hard, so a bar chart is better. Pies are part-to-whole tools, not comparison tools, and 3-D only worsens the distortion." },
      { label:"Color usage", hint:"Avoid meaningless color.", options:["One color, highlight the top region","A different bright color per bar","Color by random hue"], answer:0, explain:"A single color (optionally highlighting the standout) keeps focus on length, which encodes the value. Assigning each bar its own color implies categories differ in some encoded dimension they do not." }
    ],
    summary:"Use a value-sorted bar chart with restrained color to compare and rank the 8 regions; avoid a pie, which makes multi-category comparison imprecise."
  },
  {
    id:"PBQ-15", format:3, domain:4, obj:"4.1",
    title:"Part-to-Whole Budget Breakdown",
    brief:"A finance lead wants to show how this year's budget divides among five departments as shares of the whole. Choose the right visual and supporting elements.",
    exhibit:"<span class='cy'>REQUIREMENT BRIEF</span>\nGoal ........ show parts of a single whole (100%)\nVariables ... department (5) and its % of total budget\nMessage ..... what share does each department take?\n",
    fields:[
      { label:"Appropriate chart type", hint:"Composition of one total.", options:["Pie or 100% stacked bar","Scatter plot","Histogram"], answer:0, explain:"A pie or 100%-stacked bar communicates part-to-whole composition for a small number of categories. A scatter plot shows relationships, and a histogram shows the distribution of one numeric variable — neither is part-to-whole." },
      { label:"Why a histogram is wrong here", hint:"What does a histogram show?", options:["It only works for 2 categories","It shows distribution of a numeric variable, not category shares","It cannot use color"], answer:1, explain:"A histogram bins a continuous variable to show its distribution, which is unrelated to dividing a fixed total among named departments. The category-share question calls for a composition chart." },
      { label:"Make a pie readable", hint:"5 slices.", options:["Order slices and label each with its %","Use 12 thin slices","Explode every slice in 3-D"], answer:0, explain:"Ordering slices (e.g., largest first) and adding percentage data labels lets readers compare shares precisely. Splintering into many slices or 3-D-exploding everything harms readability." },
      { label:"If precise comparison of shares matters most", hint:"Pies are imprecise for close values.", options:["Switch to a sorted bar of the percentages","Add more slices","Remove all labels"], answer:0, explain:"When readers must compare similar shares accurately, a sorted bar of the percentages beats a pie's angle judgment. Adding slices or stripping labels both reduce clarity." }
    ],
    summary:"Show budget composition with a labeled, ordered pie or 100% stacked bar; if precise share comparison is required, prefer a sorted bar of the percentages over a pie."
  },
  {
    id:"PBQ-16", format:3, domain:4, obj:"4.1",
    title:"Distribution of Customer Ages",
    brief:"An analyst wants to understand the shape of the customer age distribution — where values cluster and whether it is skewed. Choose the visualization.",
    exhibit:"<span class='cy'>REQUIREMENT BRIEF</span>\nGoal ........ show the distribution of one numeric variable\nVariable .... customer_age (continuous)\nMessage ..... where do ages cluster? is it skewed?\n",
    fields:[
      { label:"Best chart type", hint:"Shape of one numeric variable.", options:["Histogram","Pie chart","Line chart of each customer"], answer:0, explain:"A histogram bins ages and shows the distribution's shape, modes, and skew. A pie is part-to-whole, and a per-customer line chart plots noise, not a distribution." },
      { label:"Key design parameter for a histogram", hint:"Granularity of bars.", options:["Bin width / number of bins","Slice explosion","Legend position"], answer:0, explain:"Bin width controls how the distribution's shape reads — too few bins hide structure, too many add noise. Slice explosion is a pie concept; legend position is minor for a single-series histogram." },
      { label:"To compare distribution across two groups", hint:"E.g., new vs returning.", options:["Overlaid/side-by-side histograms or box plots","One pie per customer","A single number"], answer:0, explain:"Overlaid histograms or box plots let you compare shape, center, and spread between groups. A pie per customer is nonsensical, and a single number throws away the distribution entirely." },
      { label:"What a box plot adds over a histogram", hint:"Summary stats + outliers.", options:["It shows median, quartiles, and outliers compactly","It shows exact counts per bin","It shows trend over time"], answer:0, explain:"A box plot summarizes median, IQR, and outliers in a compact form ideal for comparisons. It does not show per-bin counts (that's the histogram) and is not a time-series tool." }
    ],
    summary:"Use a histogram (with a sensible bin width) to reveal the age distribution's shape and skew, and box plots when comparing the distribution across groups."
  },
  {
    id:"PBQ-17", format:3, domain:4, obj:"4.1",
    title:"Relationship Between Ad Spend and Sales",
    brief:"A marketer wants to see whether higher ad spend is associated with higher sales across 200 campaigns. Choose the visualization and reading.",
    exhibit:"<span class='cy'>REQUIREMENT BRIEF</span>\nGoal ........ show relationship between two numeric variables\nVariables ... ad_spend ($) and sales ($), 200 campaigns\nMessage ..... does more spend go with more sales?\n",
    fields:[
      { label:"Best chart type", hint:"Two numeric variables, many points.", options:["Scatter plot","Pie chart","Single bar"], answer:0, explain:"A scatter plot maps two numeric variables to X and Y, revealing correlation, clusters, and outliers across the 200 campaigns. A pie and a single bar cannot show a paired relationship." },
      { label:"Useful overlay to summarize the relationship", hint:"Best-fit line.", options:["A trend/regression line","A pie inset","Random jitter only"], answer:0, explain:"A regression/trend line summarizes the direction and strength of the association. A pie inset is unrelated, and jitter alone (useful for overplotting) does not summarize the trend." },
      { label:"Caution when interpreting the pattern", hint:"Correlation vs causation.", options:["A strong pattern proves ad spend causes sales","Correlation does not prove causation — confounders may exist","The chart guarantees future results"], answer:1, explain:"Even a clear upward pattern only shows association; budget might track seasonality or product launches (confounders). Claiming proof of causation or guaranteed future results overstates what a scatter plot can show." },
      { label:"If many points overlap (overplotting)", hint:"Dense cloud.", options:["Use transparency, jitter, or a density/hexbin plot","Delete half the points","Switch to a pie"], answer:0, explain:"Transparency, jitter, or hex-binning reveal density where points pile up. Deleting points biases the picture, and a pie cannot represent the relationship at all." }
    ],
    summary:"A scatter plot with a regression overlay shows the ad-spend/sales relationship; remember correlation isn't causation, and use transparency or hexbin to handle overplotting."
  },
  {
    id:"PBQ-18", format:3, domain:4, obj:"4.1",
    title:"Geospatial Sales by State",
    brief:"A VP wants to see which U.S. states generate the most sales, viewed on a map. Choose the visualization and design choices that keep it honest.",
    exhibit:"<span class='cy'>REQUIREMENT BRIEF</span>\nGoal ........ show a metric varying by geographic region\nVariables ... state (geography) vs sales ($)\nMessage ..... which states are hot vs cold?\n",
    fields:[
      { label:"Best chart type", hint:"Value shaded by region.", options:["Choropleth map","Line chart","Word cloud"], answer:0, explain:"A choropleth shades each state by its sales value, ideal for geographic comparison. A line chart implies ordered time, and a word cloud conveys term frequency, not geography." },
      { label:"Color scale choice", hint:"Sequential magnitude.", options:["Sequential single-hue gradient (light to dark)","Rainbow with no order","Two clashing random colors"], answer:0, explain:"A sequential gradient maps low-to-high values to light-to-dark intuitively. A rainbow has no perceptual order and misleads; clashing random colors carry no magnitude meaning." },
      { label:"Honesty concern with raw totals on a map", hint:"Big/populous states dominate.", options:["None — raw totals are always fine","Large/populous states can dominate; consider per-capita or normalized values","Maps cannot mislead"], answer:1, explain:"Raw totals often just track population or size, so normalizing (e.g., per capita) can be fairer. Maps absolutely can mislead, so claiming raw totals are always fine is wrong." },
      { label:"Add for precise lookups", hint:"Reading exact values.", options:["Tooltips / data labels with the exact figure","A 3-D tilt","Remove the legend"], answer:0, explain:"Tooltips or labels give exact values that color shading alone cannot. A 3-D tilt distorts area perception, and removing the legend leaves the color scale unexplained." }
    ],
    summary:"Use a choropleth with a sequential color scale and value tooltips; consider normalizing (per-capita) so populous states don't falsely dominate the geographic comparison."
  },

  /* ============================================================
     FORMAT 4 — STATISTICAL METHOD SELECTION (domain 3, obj 3.2)  PBQ-19..24
     ============================================================ */
  {
    id:"PBQ-19", format:4, domain:3, obj:"3.2",
    title:"Central Tendency for Skewed Income",
    brief:"You must report a 'typical' household income, but the distribution is right-skewed by a few very high earners. Choose the right statistic and reasoning.",
    exhibit:"<span class='cy'>SUMMARY</span>\nn = 5,000 households\nmin = 18,000   max = 4,200,000\nmean = 92,400  median = 61,200\nshape: strong RIGHT skew (long high tail)\n",
    fields:[
      { label:"Best measure of a 'typical' value", hint:"Resistant to extreme highs.", options:["Mean","Median","Maximum"], answer:1, explain:"The median is robust to the long high tail and better represents a typical household than the mean, which is pulled upward by a few millionaires. The maximum is a single extreme, not a typical value." },
      { label:"Why the mean overstates 'typical' here", hint:"Effect of the high tail.", options:["The mean ignores large values","Outliers/high tail pull the mean above most households","The mean equals the mode"], answer:1, explain:"In a right-skewed distribution the high tail drags the mean above the bulk of the data (mean 92.4k > median 61.2k). The mean does not ignore large values — it is sensitive to them." },
      { label:"Best measure of spread for skewed data", hint:"Pair with the median.", options:["Standard deviation","Interquartile range (IQR)","Range (max - min)"], answer:1, explain:"The IQR (middle 50%) resists outliers and pairs naturally with the median. Standard deviation and the raw range are both inflated by the extreme high values." },
      { label:"Classify this analysis", hint:"Describing the sample you have.", options:["Descriptive statistics","Inferential statistics","Predictive modeling"], answer:0, explain:"Summarizing center and spread of the data at hand is descriptive statistics. Inferential stats generalize to a population via tests/intervals, and predictive modeling forecasts new outcomes — neither is happening here." }
    ],
    summary:"For right-skewed income, report the median with the IQR rather than mean/standard deviation; summarizing the sample this way is descriptive statistics."
  },
  {
    id:"PBQ-20", format:4, domain:3, obj:"3.2",
    title:"Comparing Two Group Means",
    brief:"A/B test: you must decide whether a new checkout page produced a higher mean order value than the old page. Pick the correct inferential method.",
    exhibit:"<span class='cy'>EXPERIMENT</span>\nGroup A (old page): n=1,200  mean order = $48.10\nGroup B (new page): n=1,180  mean order = $51.30\nQuestion: is the difference in MEANS statistically real?\nOutcome variable: order value (continuous)\n",
    fields:[
      { label:"Appropriate test", hint:"Two groups, compare means of a continuous outcome.", options:["Two-sample t-test","Chi-square test of independence","Correlation coefficient"], answer:0, explain:"A two-sample t-test compares the means of a continuous variable across two independent groups. Chi-square is for categorical counts, and a correlation measures association between two numeric variables, not a group-mean difference." },
      { label:"Null hypothesis (H0)", hint:"Default of 'no effect'.", options:["The two means are equal (no difference)","The new page is better","Order value is skewed"], answer:0, explain:"H0 states the group means are equal (no effect). 'The new page is better' is an alternative/research claim, and distribution shape is an assumption, not the hypothesis." },
      { label:"How to read a p-value of 0.02 at alpha = 0.05", hint:"Compare p to alpha.", options:["Fail to reject H0","Reject H0 — the difference is statistically significant","P-value is invalid"], answer:1, explain:"Because 0.02 < 0.05, you reject H0 and call the mean difference statistically significant. You only fail to reject when p exceeds alpha, and 0.02 is a perfectly valid p-value." },
      { label:"What significance does NOT tell you", hint:"Statistical vs practical.", options:["Whether the effect size is large/meaningful in dollars","The direction of the difference","That you compared two groups"], answer:0, explain:"A significant result can still be a tiny, business-irrelevant effect; you must check the effect size/confidence interval for practical meaning. The test does indicate direction and that two groups were compared." }
    ],
    summary:"Use a two-sample t-test to compare the two checkout pages' mean order values; reject H0 when p<alpha, then judge practical importance via effect size, not significance alone."
  },
  {
    id:"PBQ-21", format:4, domain:3, obj:"3.2",
    title:"Association Between Two Categories",
    brief:"You need to know whether subscription plan (Basic/Pro/Enterprise) is related to churn (yes/no). Both variables are categorical. Pick the method.",
    exhibit:"<span class='cy'>CONTINGENCY TABLE (counts)</span>\n            churn=Y   churn=N\nBasic         310       690\nPro           150       850\nEnterprise     40       960\nBoth variables are CATEGORICAL.\n",
    fields:[
      { label:"Correct test of association", hint:"Two categorical variables in a table.", options:["Chi-square test of independence","Two-sample t-test","Linear regression"], answer:0, explain:"Chi-square tests whether two categorical variables (plan vs churn) are independent. A t-test compares means of a numeric variable, and linear regression predicts a numeric outcome — neither fits two categoricals." },
      { label:"What chi-square compares", hint:"Observed vs ...", options:["Observed counts vs counts expected under independence","Two sample means","A slope to zero"], answer:0, explain:"Chi-square measures the gap between observed cell counts and the counts expected if the variables were independent. Comparing means or testing a slope are different (t-test/regression) procedures." },
      { label:"If p < 0.05 here, conclude", hint:"Independence assumption rejected.", options:["Plan and churn are independent","Plan and churn are associated (not independent)","Pro causes churn"], answer:1, explain:"A small p-value rejects independence, indicating plan and churn are associated. It does not say they are independent, and chi-square alone cannot establish causation (Pro 'causes' churn)." },
      { label:"Classify this method", hint:"Generalizing beyond the sample with a test.", options:["Inferential statistics","Descriptive statistics","Prescriptive analytics"], answer:0, explain:"Using a hypothesis test to infer a population relationship is inferential statistics. Descriptive stats just summarize counts, and prescriptive analytics recommends actions rather than testing association." }
    ],
    summary:"For two categorical variables, use a chi-square test of independence (observed vs expected counts); a small p-value means plan and churn are associated — an inferential, not causal, conclusion."
  },
  {
    id:"PBQ-22", format:4, domain:3, obj:"3.2",
    title:"Predicting a Numeric Outcome",
    brief:"You want to estimate house price from square footage, and later from several features. Choose the appropriate modeling methods and interpret them.",
    exhibit:"<span class='cy'>TASK</span>\nOutcome ..... price ($) — continuous\nPredictor ... square_feet (continuous); later +beds,+age\nGoal ........ estimate/forecast price from features\n",
    fields:[
      { label:"Method for one numeric predictor -> numeric outcome", hint:"Fit a straight-line relationship.", options:["Simple linear regression","Chi-square test","Mode"], answer:0, explain:"Simple linear regression models a continuous outcome from one continuous predictor as a line. Chi-square is for categorical association, and the mode is just a descriptive statistic, not a model." },
      { label:"Adding beds and age as predictors", hint:"More than one predictor.", options:["Multiple linear regression","Still simple regression","A t-test"], answer:0, explain:"Several predictors call for multiple linear regression. It is no longer 'simple' (that means one predictor), and a t-test compares means rather than modeling an outcome." },
      { label:"Interpreting a slope of 150 for square_feet", hint:"Holding others constant.", options:["Price rises ~$150 per extra sq ft, holding other features constant","Square footage causes 150% growth","The model is invalid"], answer:0, explain:"In regression, a coefficient of 150 means each additional square foot is associated with ~$150 more price, other predictors held constant. It is not a 150% growth, and a meaningful slope does not imply an invalid model." },
      { label:"Classify this analysis", hint:"Estimating future/unseen values.", options:["Predictive analytics","Descriptive analytics","Pure data cleaning"], answer:0, explain:"Building a model to estimate price for new houses is predictive analytics. Descriptive analytics only summarizes past data, and data cleaning prepares data rather than forecasting." }
    ],
    summary:"Use simple linear regression for one predictor and multiple regression for several; interpret coefficients as marginal effects holding others constant — this is predictive analytics."
  },
  {
    id:"PBQ-23", format:4, domain:3, obj:"3.2",
    title:"Spotting an Unusual Value with a Z-Score",
    brief:"A QA analyst must flag readings that are unusually far from the mean in an approximately normal process. Choose the right measure and threshold logic.",
    exhibit:"<span class='cy'>PROCESS METRIC (approx normal)</span>\nmean = 100.0   standard deviation = 5.0\nreading X = 118.0\nz = (X - mean) / sd\n",
    fields:[
      { label:"Statistic to standardize the distance from the mean", hint:"How many SDs away.", options:["Z-score","Median","Mode"], answer:0, explain:"The z-score expresses how many standard deviations a value sits from the mean, ideal for flagging unusual readings. The median and mode describe central tendency, not distance from the mean." },
      { label:"Compute z for X = 118 (mean 100, sd 5)", hint:"(118-100)/5.", options:["z = 0.6","z = 3.6","z = 18"], answer:1, explain:"(118 - 100)/5 = 3.6, so X is 3.6 SDs above the mean. 0.6 and 18 come from dividing or subtracting incorrectly." },
      { label:"Common rule for 'unusual'", hint:"In a normal-ish process.", options:["|z| > 3 is rare/anomalous","|z| > 0 is anomalous","Only z = 0 is unusual"], answer:0, explain:"Under a normal distribution, |z| > 3 captures the extreme ~0.3% tail, a standard anomaly flag. Any nonzero z is normal variation, and z = 0 is the most typical value, not unusual." },
      { label:"What standardizing enables", hint:"Across different scales.", options:["Comparing values measured on different scales/units","Removing all variation","Changing the true value"], answer:0, explain:"Z-scores put different variables on a common scale so deviations are comparable. Standardizing does not erase variation or alter the underlying measurement — it only re-expresses it." }
    ],
    summary:"Use the z-score to measure how many standard deviations a reading is from the mean; here z=3.6 exceeds the |z|>3 rule, flagging X=118 as anomalous, and z-scores enable cross-scale comparison."
  },
  {
    id:"PBQ-24", format:4, domain:3, obj:"3.2",
    title:"Choosing Descriptive vs Inferential vs Predictive",
    brief:"For each business question, classify the type of analysis and the matching method so the team uses the right tool.",
    exhibit:"<span class='cy'>QUESTIONS</span>\nQ1: What was our average ticket size last quarter?\nQ2: Do regions A and B differ in mean satisfaction?\nQ3: How many units will we sell next month?\nQ4: Given constraints, what price MAXIMIZES profit?\n",
    fields:[
      { label:"Q1 (average last quarter) — type", hint:"Summarizing past data you have.", options:["Descriptive","Inferential","Predictive"], answer:0, explain:"Reporting a past average summarizes existing data, which is descriptive. It neither generalizes via a test (inferential) nor forecasts the future (predictive)." },
      { label:"Q2 (do A and B differ in mean) — type", hint:"Testing a hypothesis about groups.", options:["Descriptive","Inferential","Prescriptive"], answer:1, explain:"Deciding whether two group means truly differ uses a hypothesis test, which is inferential. Merely describing the two averages would be descriptive, and prescriptive analytics recommends actions, not significance." },
      { label:"Q3 (units next month) — type", hint:"Forecasting an unknown future value.", options:["Descriptive","Predictive","Inferential"], answer:1, explain:"Forecasting next month's sales estimates a future outcome, which is predictive analytics. Descriptive only reports the past, and inferential tests a population claim rather than forecasting." },
      { label:"Q4 (price that maximizes profit) — type", hint:"Recommending the best action under constraints.", options:["Predictive","Prescriptive","Descriptive"], answer:1, explain:"Choosing the optimal action under constraints is prescriptive analytics (optimization). Predictive would only forecast outcomes, and descriptive would only summarize history." }
    ],
    summary:"Map each question to its analytics type: describing the past (descriptive), testing a group difference (inferential), forecasting (predictive), and optimizing an action (prescriptive)."
  },

  /* ============================================================
     FORMAT 5 — GOVERNANCE MAPPING (domain 5, obj 5.2 / 5.3)  PBQ-25..30
     ============================================================ */
  {
    id:"PBQ-25", format:5, domain:5, obj:"5.3",
    title:"Classify Fields and Assign Protections",
    brief:"A new customer table is going into the warehouse. Classify each field and assign the correct protection control before it is shared.",
    exhibit:"<span class='cy'>FIELD              SAMPLE</span>\nssn               123-45-6789\nmarketing_optin   true\nemail             jane@x.com\npublic_press_id   PR-2024-018\n",
    fields:[
      { label:"ssn classification", hint:"Directly identifies a person; highly sensitive.", options:["Public","Internal","PII (sensitive)"], answer:2, explain:"A Social Security Number is sensitive PII that uniquely identifies an individual and is regulated. It is clearly neither public nor merely internal." },
      { label:"Best protection for ssn at rest", hint:"Stored, highly sensitive identifier.", options:["No control needed","Encryption at rest plus strict RBAC (and masking on display)","Publish it openly"], answer:1, explain:"Sensitive PII like SSN needs encryption at rest, tight role-based access, and masking when displayed. Leaving it unprotected or publishing it would be a serious breach." },
      { label:"public_press_id classification", hint:"Already released to the public.", options:["PII","Public","PHI"], answer:1, explain:"A press-release identifier is intended for public release, so it is Public data. It is not personal (PII) or health (PHI) information." },
      { label:"email classification and a fitting control", hint:"Identifies a person but lower sensitivity than SSN.", options:["Public; no control","PII; RBAC and encryption in transit (mask where appropriate)","PHI; HIPAA controls"], answer:1, explain:"An email is PII warranting access control and encryption in transit, though it is lower-sensitivity than an SSN. It is not public, and unless tied to health context it is not PHI." }
    ],
    summary:"Classify by sensitivity (SSN = sensitive PII, email = PII, press id = Public) and match controls: encryption + RBAC + masking for the SSN, RBAC/transit encryption for email, none needed for public data."
  },
  {
    id:"PBQ-26", format:5, domain:5, obj:"5.2",
    title:"Map Data to the Governing Regulation",
    brief:"Several data sets must be mapped to the regulation that governs them so the right compliance controls apply.",
    exhibit:"<span class='cy'>DATA SET</span>\nA: cardholder PAN + CVV from online checkout\nB: EU residents' personal data on a web app\nC: patient diagnoses and treatment records\nD: internal cafeteria menu PDF\n",
    fields:[
      { label:"A (card numbers / CVV) — regulation/standard", hint:"Payment cards.", options:["HIPAA","PCI DSS","GDPR"], answer:1, explain:"Cardholder data (PAN/CVV) falls under the PCI DSS payment-card security standard. HIPAA governs health data and GDPR governs EU personal data — not card security specifically." },
      { label:"B (EU residents' personal data) — regulation", hint:"EU privacy law.", options:["PCI DSS","GDPR","SOX"], answer:1, explain:"Processing EU residents' personal data is governed by the GDPR. PCI DSS covers cards, and SOX addresses financial reporting controls, not personal-data privacy." },
      { label:"C (patient diagnoses/treatment) — regulation", hint:"Protected health information.", options:["GDPR only","HIPAA (PHI)","PCI DSS"], answer:1, explain:"Diagnoses and treatment records are Protected Health Information governed by HIPAA. PCI DSS is for cards; GDPR may also apply to EU patients but the health-specific regime here is HIPAA/PHI." },
      { label:"D (public cafeteria menu) — handling", hint:"No personal or regulated content.", options:["Treat as Public/internal — no special privacy regulation","Apply PCI DSS","Apply HIPAA"], answer:0, explain:"A cafeteria menu contains no personal, health, or payment data, so it is public/internal with no special privacy regulation. PCI DSS and HIPAA apply only to card and health data respectively." }
    ],
    summary:"Map data to its regime: cardholder data → PCI DSS, EU personal data → GDPR, patient health records → HIPAA/PHI, and non-personal content needs no privacy regulation."
  },
  {
    id:"PBQ-27", format:5, domain:5, obj:"5.3",
    title:"Choose the Right Privacy Technique",
    brief:"Analysts need usable data without exposing identities. For each goal, pick the technique that best balances utility and privacy.",
    exhibit:"<span class='cy'>GOAL</span>\nG1: dev/test DB must look real but reveal no real SSNs\nG2: analytics must NEVER re-identify anyone, ever\nG3: link records across systems w/o exposing real IDs,\n    but authorized parties can re-map if needed\n",
    fields:[
      { label:"G1 (realistic but fake values for dev/test)", hint:"Hide the real value behind a stand-in.", options:["Data masking","Publish raw data","Delete the column"], answer:0, explain:"Data masking replaces real values with realistic but fictitious ones so test systems work without exposing real SSNs. Publishing raw data leaks PII, and deleting the column removes the data developers need to test." },
      { label:"G2 (never re-identifiable)", hint:"Irreversible removal of identity.", options:["Anonymization","Pseudonymization","Encryption with a shared key"], answer:0, explain:"Anonymization irreversibly strips identifiers so re-identification is not possible. Pseudonymization and reversible encryption both retain a path back to the individual, violating 'never re-identify'." },
      { label:"G3 (link records, reversible only by authorized parties)", hint:"Token now, re-map later if allowed.", options:["Pseudonymization (tokenization)","Anonymization","Full public release"], answer:0, explain:"Pseudonymization replaces identifiers with consistent tokens that authorized holders of the mapping can reverse, enabling linkage with controlled re-identification. Anonymization is irreversible (breaking the re-map need), and public release exposes everyone." },
      { label:"Key difference: anonymization vs pseudonymization", hint:"Reversibility.", options:["Anonymization is irreversible; pseudonymization is reversible with a key/map","They are identical","Pseudonymization is irreversible"], answer:0, explain:"Anonymization permanently removes the ability to re-identify, while pseudonymization keeps a protected mapping that can reverse the tokenization. They are not identical, and it is anonymization (not pseudonymization) that is irreversible." }
    ],
    summary:"Match technique to goal: mask for realistic test data, anonymize when re-identification must be impossible, and pseudonymize (tokenize) when authorized parties may need to re-link records."
  },
  {
    id:"PBQ-28", format:5, domain:5, obj:"5.2",
    title:"Access Control and Least Privilege",
    brief:"Design access for a salary table containing PII. Apply role-based access and least privilege correctly across roles.",
    exhibit:"<span class='cy'>TABLE: payroll  (contains name, ssn, salary)</span>\nROLES: hr_admin, analyst, intern, auditor\nPrinciple to apply: least privilege, need-to-know\n",
    fields:[
      { label:"Model to grant access by job role", hint:"Permissions attached to roles.", options:["Role-based access control (RBAC)","Give everyone admin","Open read to all"], answer:0, explain:"RBAC assigns permissions to roles and users to roles, enforcing need-to-know. Making everyone admin or opening read access to all violates least privilege and exposes PII." },
      { label:"analyst who needs salary trends but not identities", hint:"Hide direct identifiers.", options:["Full row access including ssn","Access to a masked/aggregated view without ssn","No access at all"], answer:1, explain:"Give analysts a masked or aggregated view that excludes SSN — enough for trends, nothing more. Full access exposes unneeded PII, while zero access blocks legitimate analysis." },
      { label:"intern access level", hint:"Least privilege for a temporary, low-trust role.", options:["Same as hr_admin","Minimal or no access to PII, only what the task requires","Write access to ssn"], answer:1, explain:"An intern should get the minimum access the task requires and generally no PII. Matching hr_admin or granting write access to SSN grossly violates least privilege." },
      { label:"auditor's appropriate access", hint:"Verify controls without changing data.", options:["Read-only access (often to logs/metadata) without write","Full write to payroll","No logging of their access"], answer:0, explain:"Auditors typically need read-only access to verify controls, with their own activity logged. Granting write access or skipping logging would undermine the integrity the audit is meant to assure." }
    ],
    summary:"Use RBAC with least privilege: hr_admin full, analyst a masked/aggregated view, intern minimal/no PII, and auditor read-only with logged access."
  },
  {
    id:"PBQ-29", format:5, domain:5, obj:"5.3",
    title:"Encryption In Transit vs At Rest",
    brief:"A pipeline moves and stores sensitive data. Place the correct encryption control at each stage so data is protected end to end.",
    exhibit:"<span class='cy'>PIPELINE</span>\n[ web client ] --(1)--> [ API server ]\n      [ API server ] --(2)--> [ data warehouse (stored) ]\nGoal: protect PII the whole way through.\n",
    fields:[
      { label:"Stage (1): client -> API over the network", hint:"Data moving across a network.", options:["Encryption in transit (TLS/HTTPS)","Encryption at rest","No encryption needed"], answer:0, explain:"Data crossing a network needs encryption in transit, typically TLS/HTTPS, to prevent interception. Encryption at rest protects stored data, and 'none' leaves PII exposed on the wire." },
      { label:"Stage: PII sitting in the warehouse", hint:"Stored on disk.", options:["Encryption at rest","Encryption in transit only","Just file permissions"], answer:0, explain:"Stored PII requires encryption at rest so disk/backup theft doesn't expose it. Transit encryption doesn't protect data sitting on disk, and permissions alone don't render stolen files unreadable." },
      { label:"Do you need both controls?", hint:"Different threats.", options:["No, one is enough","Yes — transit and at-rest defend against different threats","Only at-rest matters"], answer:1, explain:"Transit encryption stops eavesdropping while at-rest encryption defends stored copies; both are needed for end-to-end protection. Choosing only one leaves a gap (sniffing or disk theft)." },
      { label:"Where do encryption keys belong", hint:"Don't store the key with the data.", options:["In a managed key store/HSM, separate from the data","In plaintext next to the database","Hard-coded in the app repo"], answer:0, explain:"Keys belong in a dedicated key-management service or HSM, segregated from the data they protect. Storing keys beside the data or hard-coding them in source nullifies the encryption." }
    ],
    summary:"Apply encryption in transit (TLS) on the network hops and encryption at rest in the warehouse — both are required — with keys held in a managed key store separate from the data."
  },
  {
    id:"PBQ-30", format:5, domain:5, obj:"5.3",
    title:"Retention, Disposal, and Data Quality Rules",
    brief:"Governance must define retention and disposal for several data types and tie quality rules to the data dictionary. Make the right calls.",
    exhibit:"<span class='cy'>DATA TYPE              RULE NEEDED</span>\ntax_records           legal minimum retention\nexpired_marketing_pii consent withdrawn\nraw_pii_after_dispose disposal method\ndata_dictionary       quality rule definition\n",
    fields:[
      { label:"tax_records retention", hint:"Driven by law, not preference.", options:["Keep forever to be safe","Retain for the legally required period, then dispose","Delete immediately after filing"], answer:1, explain:"Tax records must be kept for the legally mandated retention period and then disposed per policy. Keeping forever increases risk and cost, while deleting immediately can violate legal-hold requirements." },
      { label:"expired_marketing_pii (consent withdrawn)", hint:"Right to be forgotten / minimization.", options:["Keep using it anyway","Delete/anonymize it per the request and minimization principle","Sell it"], answer:1, explain:"When consent is withdrawn, the data must be deleted or anonymized to honor the request and data-minimization rules. Continuing to use or selling it breaches privacy law and trust." },
      { label:"Disposal method for sensitive PII", hint:"Make it unrecoverable.", options:["Move to recycle bin","Secure deletion / crypto-shredding so it is unrecoverable","Leave on old backups"], answer:1, explain:"Sensitive PII requires secure deletion or crypto-shredding so it cannot be recovered. A recycle bin is trivially reversible, and leaving copies on backups defeats disposal." },
      { label:"Role of the data dictionary in quality", hint:"Defines expected values/types.", options:["It is just documentation with no quality role","It defines field definitions, types, and valid ranges that quality rules enforce","It stores the actual records"], answer:1, explain:"The data dictionary specifies each field's meaning, type, and valid values, which data-quality rules and validation enforce. It is more than passive docs, and it describes data rather than storing the records themselves." }
    ],
    summary:"Retain tax records for the legal minimum then dispose, delete/anonymize PII when consent is withdrawn, securely (crypto-)shred sensitive PII, and use the data dictionary to define the field rules that quality checks enforce."
  }

);
