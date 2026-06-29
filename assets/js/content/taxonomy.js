/* data+ :: content/taxonomy.js — DAO-002 drag-and-drop classification (8 activities). */
window.TAXONOMY = [
  {
    title: "Chart Selection by Analytical Goal",
    subtitle: "Match each chart type or scenario to the analytical goal it serves best.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "comparison", label: "Comparison" },
      { id: "trend", label: "Trend Over Time" },
      { id: "partwhole", label: "Part-to-Whole" },
      { id: "relationship", label: "Relationship" }
    ],
    items: [
      { text: "Bar chart ranking sales by region", cat: "comparison" },
      { text: "Grouped column chart comparing products", cat: "comparison" },
      { text: "Bullet chart of actual vs. target", cat: "comparison" },
      { text: "Line chart of monthly revenue", cat: "trend" },
      { text: "Area chart of website traffic by quarter", cat: "trend" },
      { text: "Sparkline of daily stock price", cat: "trend" },
      { text: "Run chart tracking defects per week", cat: "trend" },
      { text: "Pie chart of budget by department", cat: "partwhole" },
      { text: "Stacked bar chart of revenue mix", cat: "partwhole" },
      { text: "Treemap of storage usage by folder", cat: "partwhole" },
      { text: "100% stacked column of survey responses", cat: "partwhole" },
      { text: "Scatter plot of height vs. weight", cat: "relationship" },
      { text: "Bubble chart of price, sales, and margin", cat: "relationship" },
      { text: "Correlation heat map of variables", cat: "relationship" }
    ]
  },
  {
    title: "SQL Join Types",
    subtitle: "Classify each result description by the SQL join that produces it.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "inner", label: "Inner Join" },
      { id: "left", label: "Left Join" },
      { id: "right", label: "Right Join" },
      { id: "full", label: "Full Outer Join" }
    ],
    items: [
      { text: "Only rows with a match in both tables", cat: "inner" },
      { text: "Returns customers who have placed at least one order", cat: "inner" },
      { text: "Excludes any unmatched rows from either side", cat: "inner" },
      { text: "All rows from the left table plus matches", cat: "left" },
      { text: "Keeps every customer, NULLs for those with no order", cat: "left" },
      { text: "Preserves unmatched rows from the first table only", cat: "left" },
      { text: "All rows from the right table plus matches", cat: "right" },
      { text: "Keeps every product, NULLs where no sale occurred", cat: "right" },
      { text: "Preserves unmatched rows from the second table only", cat: "right" },
      { text: "Every row from both tables, matched or not", cat: "full" },
      { text: "NULLs appear on both sides for unmatched rows", cat: "full" },
      { text: "Combines all left-only and right-only records", cat: "full" },
      { text: "Used to find records missing in either table", cat: "full" }
    ]
  },
  {
    title: "Data Structure Classification",
    subtitle: "Sort each data source into its structural category.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "structured", label: "Structured" },
      { id: "semi", label: "Semi-Structured" },
      { id: "unstructured", label: "Unstructured" }
    ],
    items: [
      { text: "Relational database table", cat: "structured" },
      { text: "CSV file with fixed columns", cat: "structured" },
      { text: "Excel spreadsheet with defined headers", cat: "structured" },
      { text: "Data warehouse fact table", cat: "structured" },
      { text: "JSON document", cat: "semi" },
      { text: "XML file with nested tags", cat: "semi" },
      { text: "NoSQL key-value store", cat: "semi" },
      { text: "Web server log file", cat: "semi" },
      { text: "Email message with headers and metadata", cat: "semi" },
      { text: "Free-text body of an email", cat: "unstructured" },
      { text: "MP4 video recording", cat: "unstructured" },
      { text: "Scanned PDF of a contract", cat: "unstructured" },
      { text: "JPEG image", cat: "unstructured" },
      { text: "Audio voicemail file", cat: "unstructured" },
      { text: "Social media post text", cat: "unstructured" }
    ]
  },
  {
    title: "Data Type Classification",
    subtitle: "Classify each sample value or field by its data type.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "string", label: "String / Text" },
      { id: "numeric", label: "Numeric" },
      { id: "datetime", label: "Date / Time" },
      { id: "boolean", label: "Boolean" }
    ],
    items: [
      { text: "Customer last name 'Nguyen'", cat: "string" },
      { text: "Product SKU 'AX-2204-B'", cat: "string" },
      { text: "Email address field", cat: "string" },
      { text: "ZIP code stored as text", cat: "string" },
      { text: "Order quantity 42", cat: "numeric" },
      { text: "Unit price 19.99", cat: "numeric" },
      { text: "Temperature -3.5", cat: "numeric" },
      { text: "Account balance 10250.00", cat: "numeric" },
      { text: "2026-06-29", cat: "datetime" },
      { text: "Timestamp 14:35:02", cat: "datetime" },
      { text: "Invoice due date", cat: "datetime" },
      { text: "is_active = TRUE", cat: "boolean" },
      { text: "Subscription flag Y/N", cat: "boolean" },
      { text: "has_shipped = FALSE", cat: "boolean" }
    ]
  },
  {
    title: "Statistical Method Classification",
    subtitle: "Sort each analytical task into the type of analytics it represents.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "descriptive", label: "Descriptive" },
      { id: "inferential", label: "Inferential" },
      { id: "predictive", label: "Predictive" },
      { id: "prescriptive", label: "Prescriptive" }
    ],
    items: [
      { text: "Calculate the mean and median of sales", cat: "descriptive" },
      { text: "Summarize last quarter's revenue in a dashboard", cat: "descriptive" },
      { text: "Report the standard deviation of test scores", cat: "descriptive" },
      { text: "Build a frequency distribution of orders", cat: "descriptive" },
      { text: "Run a t-test comparing two groups", cat: "inferential" },
      { text: "Estimate a population mean from a sample", cat: "inferential" },
      { text: "Test a hypothesis with a confidence interval", cat: "inferential" },
      { text: "Generalize survey results to all customers", cat: "inferential" },
      { text: "Forecast next month's demand", cat: "predictive" },
      { text: "Score customers by churn likelihood", cat: "predictive" },
      { text: "Train a regression model on historical data", cat: "predictive" },
      { text: "Recommend the optimal inventory order quantity", cat: "prescriptive" },
      { text: "Use an optimization model to set pricing", cat: "prescriptive" },
      { text: "Suggest the best route to minimize delivery cost", cat: "prescriptive" }
    ]
  },
  {
    title: "Privacy & Protection Techniques",
    subtitle: "Classify each scenario by the data-protection technique it describes.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "masking", label: "Masking" },
      { id: "anonymization", label: "Anonymization" },
      { id: "pseudonymization", label: "Pseudonymization" },
      { id: "encryption", label: "Encryption" }
    ],
    items: [
      { text: "Showing a card number as ****-****-****-1234", cat: "masking" },
      { text: "Hiding SSN digits in a support agent's view", cat: "masking" },
      { text: "Replacing names with XXXX in a test dataset", cat: "masking" },
      { text: "Irreversibly removing all identifiers from records", cat: "anonymization" },
      { text: "Aggregating data so no individual can be re-identified", cat: "anonymization" },
      { text: "Generalizing exact ages into 10-year bands", cat: "anonymization" },
      { text: "Replacing patient names with a reversible token", cat: "pseudonymization" },
      { text: "Swapping customer IDs for codes mapped in a secure table", cat: "pseudonymization" },
      { text: "Substituting real values with re-identifiable aliases", cat: "pseudonymization" },
      { text: "Applying AES-256 to data at rest", cat: "encryption" },
      { text: "Using TLS to protect data in transit", cat: "encryption" },
      { text: "Converting plaintext to ciphertext with a key", cat: "encryption" },
      { text: "Decrypting files only with the correct private key", cat: "encryption" }
    ]
  },
  {
    title: "Cloud Service Model Classification",
    subtitle: "Sort each example into the cloud service model it represents.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "iaas", label: "IaaS" },
      { id: "paas", label: "PaaS" },
      { id: "saas", label: "SaaS" }
    ],
    items: [
      { text: "AWS EC2 virtual machines", cat: "iaas" },
      { text: "Provisioning raw compute, storage, and networking", cat: "iaas" },
      { text: "Microsoft Azure Virtual Machines", cat: "iaas" },
      { text: "Google Compute Engine instances", cat: "iaas" },
      { text: "Azure SQL Database (managed)", cat: "paas" },
      { text: "Google App Engine application runtime", cat: "paas" },
      { text: "AWS Elastic Beanstalk deployment platform", cat: "paas" },
      { text: "Heroku application hosting", cat: "paas" },
      { text: "Tableau Online", cat: "saas" },
      { text: "Salesforce CRM", cat: "saas" },
      { text: "Google Workspace (Docs, Sheets)", cat: "saas" },
      { text: "Microsoft 365 web apps", cat: "saas" },
      { text: "Power BI Service dashboards", cat: "saas" }
    ]
  },
  {
    title: "File & Storage Type Classification",
    subtitle: "Sort each example into the cloud storage type it represents.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "object", label: "Object Storage" },
      { id: "block", label: "Block Storage" },
      { id: "file", label: "File Storage" }
    ],
    items: [
      { text: "Amazon S3 bucket", cat: "object" },
      { text: "Data stored with metadata and a unique key", cat: "object" },
      { text: "Azure Blob Storage", cat: "object" },
      { text: "Flat namespace ideal for backups and media", cat: "object" },
      { text: "Google Cloud Storage bucket", cat: "object" },
      { text: "Amazon EBS volume attached to an instance", cat: "block" },
      { text: "Fixed-size blocks formatted by an OS", cat: "block" },
      { text: "SAN volume for a high-performance database", cat: "block" },
      { text: "Low-latency storage for a transactional workload", cat: "block" },
      { text: "Amazon EFS shared mount", cat: "file" },
      { text: "Hierarchical folders accessed over NFS", cat: "file" },
      { text: "Windows file share over SMB", cat: "file" },
      { text: "Shared network drive mapped by multiple users", cat: "file" }
    ]
  }
];
