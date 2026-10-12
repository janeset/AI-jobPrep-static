// Roles: prep driven by real job postings for AI engineering roles. This file holds the parts that
// grow as postings are added: the role definitions, the shared skill catalog and the postings.
// Lessons, questions, quiz and projects live in roles-learn.js; the pages in roleview.js.
//
// Postings with `local: true` belong to the optional Toronto & KW job market and only show when that
// setting is on (Roles > Postings or Companies).
//
// Adding a posting: append to POSTINGS below with its role, then list the skill ids it asks for
// under `required` (must-haves and core duties) and `preferred` (nice-to-haves). Add a new skill
// to SKILLS only when no existing one fits, and a new lesson only for real gaps.
// A skill's `learn` entries are [trackId, topicId] pairs: "ai" / "cloud" tracks or "roles" lessons.

const ROLE_DEFS = [
  {
    id: "ai", name: "AI Engineer", short: "AI",
    tagline: "Build production AI systems: RAG, agents, evals and model integration inside real products",
    baseline: ["llm-apis", "prompting-context", "structured", "rag", "agents", "evals", "ai-safety", "llmops", "finetune", "backend", "testing", "ai-coding"],
  },
];

const SKILL_AREAS = ["AI systems", "Data & integration", "Platform & delivery", "Engineering practice"];

const SKILLS = [
  // AI systems
  { id: "llm-apis", area: "AI systems", name: "LLM APIs & model integration", learn: [["ai", "apis"], ["ai", "foundations"]] },
  { id: "prompting-context", area: "AI systems", name: "Prompt & context engineering", learn: [["ai", "prompting"], ["ai", "tokenization"]] },
  { id: "structured", area: "AI systems", name: "Structured outputs & validation", learn: [["ai", "structured"]] },
  { id: "rag", area: "AI systems", name: "RAG, embeddings & vector search", learn: [["ai", "embeddings"], ["ai", "vectorstores"], ["ai", "rag"]] },
  { id: "hybrid-rerank", area: "AI systems", name: "Hybrid retrieval & reranking", learn: [["roles", "permrag"], ["ai", "vectorstores"]] },
  { id: "perm-rag", area: "AI systems", name: "Permission-aware retrieval & enterprise search", learn: [["roles", "permrag"]] },
  { id: "agents", area: "AI systems", name: "Tool use & agent workflows", learn: [["ai", "tools"], ["ai", "agents"]] },
  { id: "agent-prod", area: "AI systems", name: "Production agents: memory, human review, failure handling", learn: [["roles", "entagents"]] },
  { id: "evals", area: "AI systems", name: "AI evaluation (automated & human)", learn: [["ai", "evals"]] },
  { id: "ai-safety", area: "AI systems", name: "AI security, guardrails & prompt-injection defence", learn: [["ai", "safety"], ["roles", "entagents"]] },
  { id: "selfhost", area: "AI systems", name: "Local / self-hosted model serving", learn: [["roles", "selfhost"]] },
  { id: "model-gateway", area: "AI systems", name: "Model gateways, routing & capacity testing", learn: [["roles", "selfhost"], ["ai", "llmops"]] },
  { id: "llmops", area: "AI systems", name: "LLMOps: cost, latency & caching", learn: [["ai", "llmops"]] },
  { id: "finetune", area: "AI systems", name: "Fine-tuning & model customization", learn: [["ai", "customization"]] },
  // Data & integration
  { id: "sql", area: "Data & integration", name: "SQL, schema design & safe migrations", learn: [["roles", "pgvector"], ["cloud", "databases"]] },
  { id: "pgvector", area: "Data & integration", name: "PostgreSQL + pgvector", learn: [["roles", "pgvector"]] },
  { id: "integration", area: "Data & integration", name: "REST, SOAP, GraphQL & event integration", learn: [["roles", "integration"], ["cloud", "messaging"]] },
  { id: "data-pipelines", area: "Data & integration", name: "Data pipelines, sync & indexing", learn: [["roles", "integration"], ["cloud", "data"]] },
  { id: "mfg", area: "Data & integration", name: "Manufacturing systems: CAD/PDM, PLM, ERP, MES", learn: [["roles", "mfgdata"]] },
  { id: "openusd", area: "Data & integration", name: "OpenUSD, Omniverse & digital twins", learn: [["roles", "mfgdata"]] },
  // Platform & delivery
  { id: "identity", area: "Platform & delivery", name: "Identity, auth & access control (OAuth, OIDC, SSO)", learn: [["cloud", "iam"]] },
  { id: "secrets", area: "Platform & delivery", name: "Secrets & key management", learn: [["cloud", "security"]] },
  { id: "networking", area: "Platform & delivery", name: "Networking: VNet / VPC, DNS, private endpoints", learn: [["cloud", "networking"]] },
  { id: "containers", area: "Platform & delivery", name: "Containers & registries", learn: [["cloud", "containers"]] },
  { id: "kubernetes", area: "Platform & delivery", name: "Kubernetes", learn: [["cloud", "kubernetes"]] },
  { id: "openshift", area: "Platform & delivery", name: "Red Hat OpenShift", learn: [["cloud", "kubernetes"]] },
  { id: "serverless", area: "Platform & delivery", name: "Serverless & managed app platforms", learn: [["cloud", "serverless"]] },
  { id: "iac", area: "Platform & delivery", name: "Infrastructure as code (Terraform)", learn: [["cloud", "devops"]] },
  { id: "cicd", area: "Platform & delivery", name: "CI/CD (GitHub Actions, GitLab CI)", learn: [["roles", "cicd"], ["cloud", "devops"]] },
  { id: "observability", area: "Platform & delivery", name: "Observability: logs, metrics, traces, alerts", learn: [["roles", "aiobs"], ["cloud", "operations"]] },
  { id: "gpu", area: "Platform & delivery", name: "GPU workloads & AI capacity planning", learn: [["roles", "selfhost"]] },
  { id: "architecture", area: "Platform & delivery", name: "Architecture, reliability & disaster recovery", learn: [["cloud", "architecture"]] },
  { id: "governance", area: "Platform & delivery", name: "Governance, cost & landing zones", learn: [["cloud", "governance"], ["cloud", "operations"]] },
  // Engineering practice
  { id: "ai-frontend", area: "Engineering practice", name: "React + TypeScript frontends for AI", learn: [["roles", "aifrontend"]] },
  { id: "backend", area: "Engineering practice", name: "Backend APIs: Python + .NET/C# or Node.js", learn: [["roles", "aifrontend"], ["roles", "integration"]] },
  { id: "testing", area: "Engineering practice", name: "Automated testing: unit, integration, load, AI evals", learn: [["roles", "cicd"], ["ai", "evals"]] },
  { id: "ai-coding", area: "Engineering practice", name: "AI coding assistants in daily work", learn: [["roles", "aicoding"]] },
  { id: "collaboration", area: "Engineering practice", name: "Design reviews, docs & evidence-based decisions", learn: [["roles", "behavioral"]] },
];

// Words and phrases that signal each skill in a posting's text. The in-app "Add posting" form uses
// them to suggest skills (you confirm each one); search uses them too. Lowercase; short terms
// match whole words only.
const SKILL_KEYWORDS = {
  "llm-apis": ["llm", "large language model", "openai", "gpt", "claude", "anthropic", "gemini", "llama", "generative ai", "genai", "gen ai", "foundation model"],
  "prompting-context": ["prompt engineering", "prompting", "prompt design", "context engineering", "few-shot", "chain-of-thought"],
  "structured": ["structured output", "json schema", "function calling", "pydantic", "output validation"],
  "rag": ["rag", "retrieval-augmented", "retrieval augmented", "embeddings", "vector database", "vector search", "vector store", "semantic search", "pinecone", "weaviate", "qdrant", "chroma", "faiss", "milvus"],
  "hybrid-rerank": ["hybrid search", "hybrid retrieval", "reranking", "re-ranking", "reranker", "bm25", "elasticsearch", "opensearch"],
  "perm-rag": ["enterprise search", "permission-aware", "document-level security", "access control lists", "acl"],
  "agents": ["agent", "agents", "agentic", "tool use", "tool calling", "langchain", "langgraph", "llamaindex", "semantic kernel", "autogen", "crewai", "mcp", "model context protocol"],
  "agent-prod": ["human-in-the-loop", "human in the loop", "agent memory", "multi-agent", "orchestration", "workflow automation"],
  "evals": ["evaluation", "evals", "eval framework", "llm-as-a-judge", "benchmark", "red teaming", "ragas", "model quality"],
  "ai-safety": ["guardrails", "prompt injection", "responsible ai", "ai safety", "ai security", "content safety", "pii", "hallucination"],
  "selfhost": ["self-hosted", "on-prem", "on-premises", "vllm", "ollama", "tgi", "triton", "hugging face", "huggingface", "open-source models", "open-weight", "local models"],
  "model-gateway": ["model gateway", "ai gateway", "litellm", "load testing", "capacity testing", "model routing", "rate limiting"],
  "llmops": ["llmops", "mlops", "latency", "token cost", "caching", "model monitoring", "mlflow", "weights & biases"],
  "finetune": ["fine-tuning", "fine tuning", "fine-tune", "lora", "peft", "rlhf", "model training", "pytorch", "tensorflow"],
  "sql": ["sql", "postgresql", "postgres", "mysql", "sql server", "schema design", "database migrations", "relational database"],
  "pgvector": ["pgvector"],
  "integration": ["rest api", "restful", "soap", "graphql", "grpc", "webhooks", "event-driven", "kafka", "service bus", "event hub", "rabbitmq", "integration", "apis"],
  "data-pipelines": ["data pipeline", "etl", "elt", "data ingestion", "airflow", "databricks", "spark", "data factory", "dbt", "snowflake", "indexing"],
  "mfg": ["manufacturing", "cad", "pdm", "plm", "erp", "mes", "bom", "solidworks", "sap"],
  "openusd": ["openusd", "omniverse", "digital twin"],
  "identity": ["entra", "active directory", "oauth", "oidc", "openid", "saml", "sso", "rbac", "iam", "authentication", "authorization"],
  "secrets": ["key vault", "secrets manager", "secrets management", "kms", "hashicorp vault", "encryption"],
  "networking": ["vnet", "vpc", "networking", "dns", "private endpoint", "private link", "load balancer", "firewall", "subnets", "tcp/ip"],
  "containers": ["docker", "container", "containers", "containerization", "acr", "ecr", "container registry"],
  "kubernetes": ["kubernetes", "k8s", "aks", "eks", "gke", "helm"],
  "openshift": ["openshift", "aro", "red hat"],
  "serverless": ["serverless", "lambda", "app service", "container apps", "fargate", "cloud run"],
  "iac": ["terraform", "bicep", "arm templates", "cloudformation", "pulumi", "infrastructure as code", "iac", "ansible"],
  "cicd": ["ci/cd", "cicd", "continuous integration", "continuous delivery", "github actions", "gitlab", "jenkins", "pipelines", "devops"],
  "observability": ["observability", "monitoring", "logging", "tracing", "opentelemetry", "prometheus", "grafana", "datadog", "splunk"],
  "gpu": ["gpu", "gpus", "cuda", "nvidia", "a100", "h100", "capacity planning", "inference infrastructure"],
  "architecture": ["architecture", "high availability", "disaster recovery", "scalability", "reliability", "well-architected", "distributed systems", "system design"],
  "governance": ["governance", "landing zone", "finops", "cost optimization", "compliance", "soc 2", "iso 27001"],
  "ai-frontend": ["react", "typescript", "next.js", "nextjs", "frontend", "front-end", "angular", "vue"],
  "backend": ["python", "c#", ".net", "node.js", "nodejs", "fastapi", "django", "flask", "java", "spring", "golang", "backend", "back-end", "microservices"],
  "testing": ["testing", "unit tests", "integration tests", "pytest", "test automation", "tdd", "load testing", "qa"],
  "ai-coding": ["copilot", "cursor", "claude code", "codex", "ai coding", "ai-assisted development", "ai assistants"],
  "collaboration": ["documentation", "design reviews", "stakeholders", "cross-functional", "mentoring", "communication skills", "collaborate", "agile", "scrum"],
};

const POSTINGS = [
  {
    id: "eclipse-ai-swe", role: "ai", tier: 3, local: true,
    company: "Eclipse Automation", title: "AI Software Engineer",
    location: "Cambridge, ON", mode: "On-site", pay: "$130,000 - $155,000", seniority: "5+ years",
    added: "2026-10-06", link: "https://jobs.dayforcehcm.com/en-CA/eclipse/CANDIDATEPORTAL",
    summary: "Custom automated-manufacturing builder running a multi-year digital transformation. About 70-80% of the role is AI systems (agents, retrieval, evaluation, model integration); the rest is full-stack, APIs, data pipelines and enterprise integration. Works from the Principal AI Architect's direction and owns implementation and delivery.",
    required: ["llm-apis", "rag", "agents", "agent-prod", "structured", "prompting-context", "evals", "ai-frontend", "backend", "identity", "sql", "integration", "data-pipelines", "testing", "cicd", "containers", "observability", "ai-coding", "collaboration"],
    preferred: ["selfhost", "model-gateway", "gpu", "pgvector", "hybrid-rerank", "perm-rag", "openshift", "kubernetes", "secrets", "iac", "mfg", "openusd", "ai-safety"],
    prep: [
      "Lead with a production AI story: what you built, how you evaluated it, and what changed when real users hit it.",
      "Be ready to sketch an engineering knowledge assistant: permission-aware RAG over PDM/PLM documents, plus agent actions behind human approval.",
      "Know the manufacturing vocabulary (BOM, ECO, revisions, PLM vs ERP vs MES) well enough to ask good questions about their data.",
      "Prepare evidence-driven stories: a prototype or benchmark that changed a decision, and a time testing disproved your assumption.",
      "Show how you use Claude Code / Codex / Cursor day to day with review, tests and security still in place.",
      "Hiring note from the posting: every application is reviewed by a person, not AI. Write the resume and cover letter for a human reader and map them to the posting's own wording.",
    ],
  },
];
