/* data+ :: content/labs.js — DA0-002 hands-on sandbox labs (20). */
window.LABS = [
  {
    "id": "Lab 01",
    "num": 1,
    "group": "DATA CONCEPTS",
    "title": "Classifying Data Structures",
    "desc": "Sort sample datasets into structured, semi-structured, and unstructured categories, then confirm where each one is best stored. You inspect schemas, classify by structure, and validate your mapping against a storage recommendation engine.",
    "objectives": [
      "Distinguish structured, semi-structured, and unstructured data by their characteristics.",
      "Match each data structure to an appropriate storage technology.",
      "Validate classifications against a sample data catalog."
    ],
    "console": {
      "host": "data-lab01",
      "boot": [
        "[SYS] Data classification sandbox online.",
        "[SYS] Sample catalog loaded: 6 datasets."
      ],
      "tasks": [
        { "id": "t1", "label": "Classify a relational sales table by structure" },
        { "id": "t2", "label": "Classify a JSON event log by structure" },
        { "id": "t3", "label": "Classify a folder of scanned PDFs" },
        { "id": "t4", "label": "List all datasets in the catalog" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Structure of a fixed-schema SQL sales table",
          "options": ["Structured", "Semi-structured", "Unstructured", "Hierarchical"],
          "correct": "Structured",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Structure of a tag-based JSON event log",
          "options": ["Structured", "Semi-structured", "Unstructured", "Tabular"],
          "correct": "Semi-structured",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CLASSIFY SCANNED DOCUMENT FOLDER",
        "placeholder": "scanned-invoices/",
        "button": "Run",
        "response": "[OUT] Folder classified as Unstructured.\n[OUT] No fixed schema or delimiters detected.\n[OUT] Recommended store: object storage / data lake.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "list datasets",
          "out": "[CAT] sales_tbl (RDBMS)\n[CAT] events.json (NoSQL)\n[CAT] scanned-invoices/ (object store)\n[CAT] clickstream.csv (flat file)",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Classification engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 02",
    "num": 2,
    "group": "DATA CONCEPTS",
    "title": "Relational vs Non-Relational Stores",
    "desc": "Compare relational and non-relational databases and decide which engine fits a given workload. You choose a store for transactional and flexible-schema scenarios, then query the engine catalog to confirm capabilities.",
    "objectives": [
      "Differentiate relational (RDBMS) from non-relational (NoSQL) data stores.",
      "Select the right store for ACID transactions versus flexible schemas.",
      "Identify common NoSQL store types and their use cases."
    ],
    "console": {
      "host": "data-lab02",
      "boot": [
        "[SYS] Database selection lab initialized.",
        "[SYS] Engines available: PostgreSQL, MongoDB, Cassandra, Redis."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick a store for ACID banking transactions" },
        { "id": "t2", "label": "Pick a store for a flexible-schema product catalog" },
        { "id": "t3", "label": "Validate a key-value caching choice" },
        { "id": "t4", "label": "List engine types and categories" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Store for ACID-compliant financial transactions",
          "options": ["MongoDB (document)", "PostgreSQL (relational)", "Redis (key-value)", "Cassandra (wide-column)"],
          "correct": "PostgreSQL (relational)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Store for a frequently-changing product catalog schema",
          "options": ["PostgreSQL (relational)", "MongoDB (document)", "MySQL (relational)", "SQLite (relational)"],
          "correct": "MongoDB (document)",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "VALIDATE CACHE STORE CHOICE",
        "placeholder": "redis",
        "button": "Run",
        "response": "[OUT] Redis selected as in-memory key-value cache.\n[OUT] Sub-millisecond reads confirmed for session data.\n[OUT] Choice valid for low-latency caching.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "list engines",
          "out": "[DB] PostgreSQL -> relational\n[DB] MongoDB -> document\n[DB] Cassandra -> wide-column\n[DB] Redis -> key-value",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Engine catalog nominal." }
      ]
    }
  },
  {
    "id": "Lab 03",
    "num": 3,
    "group": "DATA CONCEPTS",
    "title": "Identifying Data Types",
    "desc": "Assign correct data types to incoming columns so they store and compute properly. You classify columns as discrete, continuous, categorical, or temporal, then cast a raw field with the type engine.",
    "objectives": [
      "Classify values as discrete, continuous, categorical, or date/time.",
      "Distinguish nominal from ordinal categorical data.",
      "Cast a raw text column to its correct type."
    ],
    "console": {
      "host": "data-lab03",
      "boot": [
        "[SYS] Data type sandbox loaded.",
        "[SYS] Source columns staged for typing."
      ],
      "tasks": [
        { "id": "t1", "label": "Classify a customer-age column" },
        { "id": "t2", "label": "Classify a satisfaction-rating column" },
        { "id": "t3", "label": "Cast a raw order-date string to DATE" },
        { "id": "t4", "label": "List staged columns and inferred types" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Type for whole-number customer age counts",
          "options": ["Continuous", "Discrete", "Nominal", "Boolean"],
          "correct": "Discrete",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Type for a 1-to-5 satisfaction rating",
          "options": ["Nominal", "Ordinal", "Continuous", "Interval"],
          "correct": "Ordinal",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CAST RAW DATE FIELD",
        "placeholder": "CAST(order_date AS DATE)",
        "button": "Run",
        "response": "[OUT] Column order_date cast from VARCHAR to DATE.\n[OUT] 10,000 rows parsed, 0 errors.\n[OUT] Temporal type assigned.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "list columns",
          "out": "[COL] age -> integer (discrete)\n[COL] revenue -> decimal (continuous)\n[COL] region -> text (nominal)\n[COL] rating -> integer (ordinal)",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Type inference engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 04",
    "num": 4,
    "group": "DATA CONCEPTS",
    "title": "Exploring a Data Warehouse vs Data Lake",
    "desc": "Walk through a modern analytics environment and decide whether raw or modeled data belongs in a lake or a warehouse. You classify each layer, choose a schema-on-read versus schema-on-write approach, and query the environment layout.",
    "objectives": [
      "Contrast a data lake (schema-on-read) with a data warehouse (schema-on-write).",
      "Place raw, staged, and curated data in the right layer.",
      "Identify when an OLAP warehouse fits a reporting workload."
    ],
    "console": {
      "host": "data-lab04",
      "boot": [
        "[SYS] Analytics environment mapped.",
        "[SYS] Layers detected: raw, staging, curated."
      ],
      "tasks": [
        { "id": "t1", "label": "Choose the store for raw, unmodeled ingest" },
        { "id": "t2", "label": "Choose the store for governed BI reporting" },
        { "id": "t3", "label": "Validate the curated star-schema layer" },
        { "id": "t4", "label": "Show the environment layer map" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Best home for raw schema-on-read ingest",
          "options": ["Data warehouse", "Data lake", "OLTP database", "Spreadsheet"],
          "correct": "Data lake",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Best home for governed schema-on-write BI",
          "options": ["Data lake", "Data warehouse", "Message queue", "File share"],
          "correct": "Data warehouse",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "VALIDATE CURATED MODEL",
        "placeholder": "star-schema",
        "button": "Run",
        "response": "[OUT] Curated layer uses a star schema.\n[OUT] Fact table fact_sales joined to 4 dimensions.\n[OUT] Optimized for OLAP aggregation queries.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show layers",
          "out": "[ENV] raw -> data lake (object store)\n[ENV] staging -> ELT transform zone\n[ENV] curated -> data warehouse (star schema)",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Environment map nominal." }
      ]
    }
  },
  {
    "id": "Lab 05",
    "num": 5,
    "group": "DATA ACQUISITION",
    "title": "Building SQL Joins",
    "desc": "Combine customer and order tables using the correct join type to answer business questions. You choose between inner and outer joins, write a join in the query box, and inspect the table relationships.",
    "objectives": [
      "Select the correct join type for matched and unmatched rows.",
      "Write a SQL join across two related tables.",
      "Interpret primary-key to foreign-key relationships."
    ],
    "console": {
      "host": "data-lab05",
      "boot": [
        "[SYS] SQL join sandbox ready.",
        "[SYS] Tables loaded: customers, orders."
      ],
      "tasks": [
        { "id": "t1", "label": "Choose a join returning only matched rows" },
        { "id": "t2", "label": "Choose a join keeping all customers" },
        { "id": "t3", "label": "Run a join query across both tables" },
        { "id": "t4", "label": "Show table relationships" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Join returning only customers with orders",
          "options": ["LEFT JOIN", "INNER JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
          "correct": "INNER JOIN",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Join keeping all customers even with no orders",
          "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
          "correct": "LEFT JOIN",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN JOIN QUERY",
        "placeholder": "SELECT * FROM customers c JOIN orders o ON c.id = o.cust_id",
        "button": "Run",
        "response": "[OUT] Query executed across customers and orders.\n[OUT] 842 rows returned on c.id = o.cust_id.\n[OUT] Join key validated.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "describe keys",
          "out": "[KEY] customers.id = PRIMARY KEY\n[KEY] orders.cust_id = FOREIGN KEY -> customers.id",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Query engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 06",
    "num": 6,
    "group": "DATA ACQUISITION",
    "title": "Designing an ETL Pipeline",
    "desc": "Order the stages of an extract-transform-load pipeline and decide where transformation should occur. You sequence ETL versus ELT, run the pipeline, and inspect each stage's status.",
    "objectives": [
      "Order the Extract, Transform, and Load stages correctly.",
      "Distinguish ETL from ELT and when each applies.",
      "Validate a pipeline run end to end."
    ],
    "console": {
      "host": "data-lab06",
      "boot": [
        "[SYS] Pipeline orchestrator online.",
        "[SYS] Source: API feed. Target: warehouse."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the first ETL stage" },
        { "id": "t2", "label": "Choose ELT for a cloud warehouse" },
        { "id": "t3", "label": "Run the full pipeline" },
        { "id": "t4", "label": "Show pipeline stage status" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "First stage of a classic ETL pipeline",
          "options": ["Transform", "Load", "Extract", "Archive"],
          "correct": "Extract",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Pattern that loads raw then transforms in-warehouse",
          "options": ["ETL", "ELT", "CDC", "EAI"],
          "correct": "ELT",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN PIPELINE",
        "placeholder": "run pipeline daily_sales",
        "button": "Run",
        "response": "[OUT] Extract: 12,400 records pulled from API.\n[OUT] Transform: types cast, nulls handled.\n[OUT] Load: warehouse table refreshed. Pipeline OK.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show stages",
          "out": "[ETL] extract -> OK\n[ETL] transform -> OK\n[ETL] load -> OK",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Orchestrator nominal." }
      ]
    }
  },
  {
    "id": "Lab 07",
    "num": 7,
    "group": "DATA ACQUISITION",
    "title": "Data Profiling a New Source",
    "desc": "Profile a freshly ingested dataset to understand its shape before analysis. You choose the right profiling metric, run a profile scan, and review column statistics.",
    "objectives": [
      "Identify key profiling metrics: null rate, cardinality, and distribution.",
      "Detect anomalies and outliers during profiling.",
      "Summarize a source's quality before downstream use."
    ],
    "console": {
      "host": "data-lab07",
      "boot": [
        "[SYS] Data profiler loaded.",
        "[SYS] Source staged: customer_import.csv (50k rows)."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the metric measuring distinct values" },
        { "id": "t2", "label": "Pick the metric for missing data" },
        { "id": "t3", "label": "Run a profile scan" },
        { "id": "t4", "label": "Show column statistics" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Metric for the count of distinct values in a column",
          "options": ["Null rate", "Cardinality", "Skew", "Variance"],
          "correct": "Cardinality",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Metric for the percentage of missing values",
          "options": ["Cardinality", "Null rate", "Mode", "Range"],
          "correct": "Null rate",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN PROFILE SCAN",
        "placeholder": "profile customer_import.csv",
        "button": "Run",
        "response": "[OUT] 50,000 rows, 12 columns scanned.\n[OUT] email null rate 3.2%; state cardinality 51.\n[OUT] 2 outliers flagged in age column.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show stats",
          "out": "[PROF] age -> min 18, max 142 (outlier)\n[PROF] email -> 96.8% populated\n[PROF] state -> 51 distinct",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Profiler nominal." }
      ]
    }
  },
  {
    "id": "Lab 08",
    "num": 8,
    "group": "DATA ACQUISITION",
    "title": "Deduplicating and Cleansing Data",
    "desc": "Clean a messy contact list by removing duplicates and standardizing values. You choose the right cleansing technique, run a dedup pass, and inspect the cleansing report.",
    "objectives": [
      "Identify exact and fuzzy duplicate records.",
      "Apply standardization and normalization to inconsistent values.",
      "Validate a cleansed output set."
    ],
    "console": {
      "host": "data-lab08",
      "boot": [
        "[SYS] Cleansing engine ready.",
        "[SYS] Dataset: contacts.csv (8,200 rows)."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the technique to merge near-identical names" },
        { "id": "t2", "label": "Pick the technique to standardize phone formats" },
        { "id": "t3", "label": "Run the deduplication pass" },
        { "id": "t4", "label": "Show the cleansing report" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Technique to merge 'Jon Smith' and 'John Smith'",
          "options": ["Exact match", "Fuzzy matching", "Truncation", "Sampling"],
          "correct": "Fuzzy matching",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Technique to convert all phone numbers to one format",
          "options": ["Standardization", "Aggregation", "Imputation", "Encryption"],
          "correct": "Standardization",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN DEDUP PASS",
        "placeholder": "dedup contacts.csv --fuzzy",
        "button": "Run",
        "response": "[OUT] 8,200 rows scanned.\n[OUT] 612 duplicate records merged.\n[OUT] 7,588 unique contacts retained.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show report",
          "out": "[CLEAN] duplicates removed: 612\n[CLEAN] phone formats standardized: 7,588\n[CLEAN] null emails imputed: 0",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Cleansing engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 09",
    "num": 9,
    "group": "DATA ACQUISITION",
    "title": "Parsing Fields with Regex",
    "desc": "Extract structured values from messy free-text fields using regular expressions. You choose a pattern to capture a target field, run the extraction, and review parse results.",
    "objectives": [
      "Build a regular expression to capture a target pattern.",
      "Validate extracted values against expected formats.",
      "Parse semi-structured text into clean columns."
    ],
    "console": {
      "host": "data-lab09",
      "boot": [
        "[SYS] Regex parser loaded.",
        "[SYS] Source field: raw_notes (free text)."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick a pattern matching an email address" },
        { "id": "t2", "label": "Pick a pattern matching a US zip code" },
        { "id": "t3", "label": "Run the extraction job" },
        { "id": "t4", "label": "Show parse results" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Regex to capture an email address",
          "options": ["\\d{5}", "[\\w.]+@[\\w.]+\\.\\w+", "[A-Z]{2}", "^\\d+$"],
          "correct": "[\\w.]+@[\\w.]+\\.\\w+",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Regex to capture a 5-digit US zip code",
          "options": ["\\d{5}", "\\w+@\\w+", "[A-Za-z]+", "\\d{3}-\\d{4}"],
          "correct": "\\d{5}",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN EXTRACTION JOB",
        "placeholder": "extract raw_notes --pattern email",
        "button": "Run",
        "response": "[OUT] 4,310 rows scanned for pattern.\n[OUT] 3,977 emails captured into clean column.\n[OUT] 333 rows had no match (flagged).",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show results",
          "out": "[RGX] matched: 3,977\n[RGX] unmatched: 333\n[RGX] capture group: email",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Parser nominal." }
      ]
    }
  },
  {
    "id": "Lab 10",
    "num": 10,
    "group": "DATA ANALYSIS",
    "title": "Computing Descriptive Statistics",
    "desc": "Summarize a sales dataset with descriptive statistics. You choose which summary measures answer a question, run the summary, and inspect the computed values.",
    "objectives": [
      "Distinguish measures of central tendency from measures of dispersion.",
      "Select the right summary statistic for a question.",
      "Interpret a descriptive statistics report."
    ],
    "console": {
      "host": "data-lab10",
      "boot": [
        "[SYS] Stats engine online.",
        "[SYS] Dataset: monthly_sales (n=1,200)."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the measure of typical value" },
        { "id": "t2", "label": "Pick the measure of spread" },
        { "id": "t3", "label": "Run the descriptive summary" },
        { "id": "t4", "label": "Show summary table" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Measure of central tendency for typical sale value",
          "options": ["Standard deviation", "Mean", "Range", "Variance"],
          "correct": "Mean",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Measure of dispersion around the average",
          "options": ["Median", "Mode", "Standard deviation", "Mean"],
          "correct": "Standard deviation",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN DESCRIPTIVE SUMMARY",
        "placeholder": "summarize monthly_sales",
        "button": "Run",
        "response": "[OUT] n=1,200; mean=4,218; median=3,990.\n[OUT] std dev=1,105; min=210; max=18,400.\n[OUT] Summary complete.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show summary",
          "out": "[STAT] mean 4218 | median 3990 | mode 3500\n[STAT] std dev 1105 | range 18190",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Stats engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 11",
    "num": 11,
    "group": "DATA ANALYSIS",
    "title": "Choosing a Statistical Test",
    "desc": "Match analysis questions to the correct statistical test. You select tests for group comparison and association, run the chosen test, and review the result output.",
    "objectives": [
      "Select an appropriate test for comparing group means.",
      "Choose a test for association between categorical variables.",
      "Interpret a p-value against a significance threshold."
    ],
    "console": {
      "host": "data-lab11",
      "boot": [
        "[SYS] Hypothesis testing lab ready.",
        "[SYS] Sample loaded: A/B experiment results."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick a test comparing two group means" },
        { "id": "t2", "label": "Pick a test for two categorical variables" },
        { "id": "t3", "label": "Run the selected test" },
        { "id": "t4", "label": "Show test result and p-value" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Test comparing means of two independent groups",
          "options": ["Chi-square", "T-test", "Correlation", "Mode"],
          "correct": "T-test",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Test for association between two categorical fields",
          "options": ["T-test", "ANOVA", "Chi-square", "Regression"],
          "correct": "Chi-square",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN STATISTICAL TEST",
        "placeholder": "run t-test group_a group_b",
        "button": "Run",
        "response": "[OUT] Two-sample t-test executed.\n[OUT] t=2.84, p=0.005.\n[OUT] p < 0.05: reject the null hypothesis.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show result",
          "out": "[TEST] statistic t=2.84\n[TEST] p-value=0.005\n[TEST] decision: significant at alpha=0.05",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Testing engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 12",
    "num": 12,
    "group": "DATA ANALYSIS",
    "title": "Central Tendency and Dispersion",
    "desc": "Investigate a skewed income dataset and pick the measures that describe it honestly. You choose the robust central measure, run a distribution analysis, and inspect quartiles.",
    "objectives": [
      "Choose mean versus median for skewed distributions.",
      "Quantify spread with range, IQR, and standard deviation.",
      "Detect skew from summary statistics."
    ],
    "console": {
      "host": "data-lab12",
      "boot": [
        "[SYS] Distribution analyzer online.",
        "[SYS] Dataset: household_income (right-skewed)."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the robust center for skewed income" },
        { "id": "t2", "label": "Pick the spread measure resistant to outliers" },
        { "id": "t3", "label": "Run the distribution analysis" },
        { "id": "t4", "label": "Show quartile breakdown" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Best center measure for right-skewed income",
          "options": ["Mean", "Median", "Sum", "Variance"],
          "correct": "Median",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Spread measure least affected by outliers",
          "options": ["Range", "Standard deviation", "Interquartile range", "Mean"],
          "correct": "Interquartile range",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN DISTRIBUTION ANALYSIS",
        "placeholder": "analyze household_income",
        "button": "Run",
        "response": "[OUT] Distribution is right-skewed (skew=1.7).\n[OUT] mean=72,400 > median=54,000.\n[OUT] Median recommended as typical value.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show quartiles",
          "out": "[DIST] Q1=38,000 | Q2=54,000 | Q3=81,000\n[DIST] IQR=43,000",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Analyzer nominal." }
      ]
    }
  },
  {
    "id": "Lab 13",
    "num": 13,
    "group": "DATA ANALYSIS",
    "title": "Troubleshooting a Slow Query",
    "desc": "Diagnose why an analytical query is running slowly and apply the right fix. You choose an optimization, run the tuned query, and inspect the execution plan.",
    "objectives": [
      "Read an execution plan to locate a bottleneck.",
      "Apply indexing and filtering to speed up a query.",
      "Validate performance improvement after tuning."
    ],
    "console": {
      "host": "data-lab13",
      "boot": [
        "[SYS] Query tuner loaded.",
        "[SYS] Slow query detected: 14.2s runtime."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the fix for a full table scan on a filter" },
        { "id": "t2", "label": "Pick the fix to avoid returning all columns" },
        { "id": "t3", "label": "Run the tuned query" },
        { "id": "t4", "label": "Show the execution plan" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Fix for a full scan caused by an unindexed WHERE column",
          "options": ["Add an index", "Add more rows", "Remove the WHERE", "Use SELECT *"],
          "correct": "Add an index",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Fix to reduce payload from SELECT *",
          "options": ["Select only needed columns", "Add a CROSS JOIN", "Drop the index", "Disable caching"],
          "correct": "Select only needed columns",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN TUNED QUERY",
        "placeholder": "EXPLAIN ANALYZE SELECT id, total FROM orders WHERE region='EU'",
        "button": "Run",
        "response": "[OUT] Index scan on region used.\n[OUT] Runtime dropped 14.2s -> 0.3s.\n[OUT] 47x speedup confirmed.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "explain plan",
          "out": "[PLAN] before: Seq Scan on orders (cost=high)\n[PLAN] after: Index Scan using idx_region",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Tuner nominal." }
      ]
    }
  },
  {
    "id": "Lab 14",
    "num": 14,
    "group": "VISUALIZATION",
    "title": "Choosing the Right Chart",
    "desc": "Match analysis goals to the chart type that communicates them best. You pick charts for trend and composition questions, render the chart, and review the visual catalog.",
    "objectives": [
      "Match chart types to comparison, trend, distribution, and composition goals.",
      "Avoid chart types that misrepresent the data.",
      "Render a chart appropriate to a stakeholder question."
    ],
    "console": {
      "host": "data-lab14",
      "boot": [
        "[SYS] Visualization studio online.",
        "[SYS] Dataset: quarterly_revenue."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick a chart for revenue trend over time" },
        { "id": "t2", "label": "Pick a chart for share of total by category" },
        { "id": "t3", "label": "Render the chosen chart" },
        { "id": "t4", "label": "List available chart types" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Chart for revenue trend across 12 months",
          "options": ["Pie chart", "Line chart", "Scatter plot", "Heat map"],
          "correct": "Line chart",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Chart for each product's share of total sales",
          "options": ["Line chart", "Histogram", "Pie chart", "Box plot"],
          "correct": "Pie chart",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RENDER CHART",
        "placeholder": "render line quarterly_revenue",
        "button": "Run",
        "response": "[OUT] Line chart rendered for quarterly_revenue.\n[OUT] X-axis = quarter, Y-axis = revenue.\n[OUT] Trend visible and labeled.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "list charts",
          "out": "[VIZ] line -> trend over time\n[VIZ] bar -> category comparison\n[VIZ] pie -> composition\n[VIZ] scatter -> correlation",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Studio nominal." }
      ]
    }
  },
  {
    "id": "Lab 15",
    "num": 15,
    "group": "VISUALIZATION",
    "title": "Building an Executive Dashboard",
    "desc": "Assemble a single-screen dashboard that surfaces the right KPIs for executives. You choose layout and KPI elements, publish the dashboard, and inspect the panel manifest.",
    "objectives": [
      "Select KPIs that align to executive decision-making.",
      "Apply layout principles for at-a-glance reading.",
      "Publish and validate a dashboard."
    ],
    "console": {
      "host": "data-lab15",
      "boot": [
        "[SYS] Dashboard builder ready.",
        "[SYS] Data sources connected: sales, support, finance."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the top-left element for highest priority" },
        { "id": "t2", "label": "Pick the element for a single headline metric" },
        { "id": "t3", "label": "Publish the dashboard" },
        { "id": "t4", "label": "Show the panel manifest" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Where to place the most important KPI",
          "options": ["Bottom-right", "Top-left", "Center footer", "Hidden tab"],
          "correct": "Top-left",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Element best for one headline number",
          "options": ["KPI card", "Pivot table", "Scatter plot", "Tree map"],
          "correct": "KPI card",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "PUBLISH DASHBOARD",
        "placeholder": "publish exec_overview",
        "button": "Run",
        "response": "[OUT] Dashboard exec_overview published.\n[OUT] 6 panels, refresh every 15 min.\n[OUT] Shared with executive group.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show panels",
          "out": "[DASH] KPI card: MRR\n[DASH] line: revenue trend\n[DASH] bar: pipeline by stage\n[DASH] gauge: CSAT",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Builder nominal." }
      ]
    }
  },
  {
    "id": "Lab 16",
    "num": 16,
    "group": "VISUALIZATION",
    "title": "Design Elements and Color",
    "desc": "Apply visual design and accessibility principles to a report. You choose accessible color and labeling settings, apply the theme, and review the design audit.",
    "objectives": [
      "Apply color choices that are accessible and not misleading.",
      "Use clear labels, titles, and consistent scales.",
      "Validate a report against an accessibility audit."
    ],
    "console": {
      "host": "data-lab16",
      "boot": [
        "[SYS] Design studio online.",
        "[SYS] Report theme: default."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick a colorblind-safe palette" },
        { "id": "t2", "label": "Pick the correct axis baseline" },
        { "id": "t3", "label": "Apply the accessible theme" },
        { "id": "t4", "label": "Show the design audit" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Palette safe for colorblind viewers",
          "options": ["Red-green pair", "Colorblind-safe (blue-orange)", "Rainbow", "Neon mix"],
          "correct": "Colorblind-safe (blue-orange)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Baseline that avoids exaggerating differences on a bar chart",
          "options": ["Start at zero", "Start at the minimum value", "Truncated axis", "Logarithmic only"],
          "correct": "Start at zero",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY ACCESSIBLE THEME",
        "placeholder": "apply theme accessible",
        "button": "Run",
        "response": "[OUT] Accessible theme applied.\n[OUT] Contrast ratio 4.6:1 (passes WCAG AA).\n[OUT] Axis baselines set to zero.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show audit",
          "out": "[DESIGN] contrast: pass (4.6:1)\n[DESIGN] colorblind-safe: yes\n[DESIGN] axis baseline: zero",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Design studio nominal." }
      ]
    }
  },
  {
    "id": "Lab 17",
    "num": 17,
    "group": "VISUALIZATION",
    "title": "Diagnosing a Slow Report",
    "desc": "Find out why a BI report takes too long to load and apply the right remedy. You choose a performance fix, refresh the report, and inspect the load profile.",
    "objectives": [
      "Identify causes of slow report rendering.",
      "Apply aggregation, extracts, and filtering to improve load time.",
      "Validate report performance after tuning."
    ],
    "console": {
      "host": "data-lab17",
      "boot": [
        "[SYS] Report performance monitor online.",
        "[SYS] Report load time: 22s."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the fix for live querying millions of rows" },
        { "id": "t2", "label": "Pick the fix for too many visuals on one page" },
        { "id": "t3", "label": "Refresh the tuned report" },
        { "id": "t4", "label": "Show the load profile" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Fix for slow live queries on a huge fact table",
          "options": ["Use a pre-aggregated extract", "Add more visuals", "Disable filters", "Query row by row"],
          "correct": "Use a pre-aggregated extract",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Fix for a page crowded with redundant visuals",
          "options": ["Reduce visuals per page", "Add a second copy", "Increase resolution", "Remove all filters"],
          "correct": "Reduce visuals per page",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "REFRESH TUNED REPORT",
        "placeholder": "refresh sales_report --extract",
        "button": "Run",
        "response": "[OUT] Pre-aggregated extract loaded.\n[OUT] Load time 22s -> 1.8s.\n[OUT] Report performance restored.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show profile",
          "out": "[PERF] data fetch: 1.2s (was 19s)\n[PERF] render: 0.6s\n[PERF] visuals on page: 6",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Monitor nominal." }
      ]
    }
  },
  {
    "id": "Lab 18",
    "num": 18,
    "group": "DATA GOVERNANCE",
    "title": "Classifying and Protecting PII",
    "desc": "Identify sensitive fields and apply the correct protection control to each. You choose masking and access controls, apply protections, and review the compliance report.",
    "objectives": [
      "Classify fields as PII, sensitive, or public.",
      "Match masking, encryption, and RBAC to each field.",
      "Validate protections against a compliance baseline."
    ],
    "console": {
      "host": "data-lab18",
      "boot": [
        "[SYS] Governance console online.",
        "[SYS] Table loaded: customer_master."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the control to show only last 4 of an SSN" },
        { "id": "t2", "label": "Pick the control limiting access by job role" },
        { "id": "t3", "label": "Apply protections to the table" },
        { "id": "t4", "label": "Show the compliance report" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Control that reveals only the last 4 digits of an SSN",
          "options": ["Data masking", "Full encryption", "Deletion", "Compression"],
          "correct": "Data masking",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Control that grants column access by job role",
          "options": ["Public sharing", "Role-based access control", "Anonymization", "Backup"],
          "correct": "Role-based access control",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY PROTECTIONS",
        "placeholder": "apply protections customer_master",
        "button": "Run",
        "response": "[OUT] SSN column masked (xxx-xx-1234).\n[OUT] email encrypted at rest (AES-256).\n[OUT] RBAC policy bound to analyst role.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show compliance",
          "out": "[GOV] PII fields protected: 4/4\n[GOV] masking: SSN, DOB\n[GOV] encryption: email, phone\n[GOV] RBAC: enforced",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Governance console nominal." }
      ]
    }
  },
  {
    "id": "Lab 19",
    "num": 19,
    "group": "DATA GOVERNANCE",
    "title": "Building a Data Dictionary and Lineage",
    "desc": "Document a dataset with a data dictionary and trace its lineage from source to report. You choose what a dictionary entry must include, publish the dictionary, and inspect the lineage graph.",
    "objectives": [
      "Define the fields a data dictionary entry requires.",
      "Trace lineage from source system to final report.",
      "Validate metadata completeness."
    ],
    "console": {
      "host": "data-lab19",
      "boot": [
        "[SYS] Metadata catalog online.",
        "[SYS] Asset: fact_sales."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the required dictionary attribute" },
        { "id": "t2", "label": "Pick the lineage start point" },
        { "id": "t3", "label": "Publish the data dictionary" },
        { "id": "t4", "label": "Show the lineage graph" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Attribute every data dictionary entry must include",
          "options": ["Column name and data type", "User password", "Server uptime", "Disk model"],
          "correct": "Column name and data type",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Where data lineage tracing begins",
          "options": ["Final dashboard", "Source system of record", "Email archive", "User's laptop"],
          "correct": "Source system of record",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "PUBLISH DATA DICTIONARY",
        "placeholder": "publish dictionary fact_sales",
        "button": "Run",
        "response": "[OUT] 14 columns documented.\n[OUT] Each entry: name, type, description, owner.\n[OUT] Dictionary published to catalog.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show lineage",
          "out": "[LIN] CRM source -> ETL stage -> fact_sales -> exec dashboard\n[LIN] 4 hops, fully traced",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Catalog nominal." }
      ]
    }
  },
  {
    "id": "Lab 20",
    "num": 20,
    "group": "DATA GOVERNANCE",
    "title": "Running a Data Quality Health Check",
    "desc": "Assess a dataset against the core data quality dimensions and report its health. You choose which dimension a check targets, run the health check, and review the scorecard.",
    "objectives": [
      "Define the core data quality dimensions (accuracy, completeness, consistency, timeliness, uniqueness).",
      "Map a quality rule to the dimension it measures.",
      "Interpret a data quality scorecard."
    ],
    "console": {
      "host": "data-lab20",
      "boot": [
        "[SYS] Data quality engine online.",
        "[SYS] Dataset: orders_warehouse."
      ],
      "tasks": [
        { "id": "t1", "label": "Pick the dimension for missing required values" },
        { "id": "t2", "label": "Pick the dimension for duplicate records" },
        { "id": "t3", "label": "Run the quality health check" },
        { "id": "t4", "label": "Show the quality scorecard" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Dimension measured by a not-null check on required fields",
          "options": ["Completeness", "Timeliness", "Accuracy", "Validity"],
          "correct": "Completeness",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Dimension measured by a duplicate-record check",
          "options": ["Consistency", "Uniqueness", "Timeliness", "Accuracy"],
          "correct": "Uniqueness",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN QUALITY HEALTH CHECK",
        "placeholder": "healthcheck orders_warehouse",
        "button": "Run",
        "response": "[OUT] Completeness 98.1% | Uniqueness 99.4%.\n[OUT] Consistency 96.7% | Timeliness 100%.\n[OUT] Overall quality score: 98.0%.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "show scorecard",
          "out": "[DQ] completeness: 98.1%\n[DQ] uniqueness: 99.4%\n[DQ] consistency: 96.7%\n[DQ] timeliness: 100%",
          "task": "t4"
        },
        { "cmd": "show status", "out": "Quality engine nominal." }
      ]
    }
  }
];
