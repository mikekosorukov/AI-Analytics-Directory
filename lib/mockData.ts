// Mock data generated from CSV file
// Generated on 2025-10-31T21:19:05.234Z

export interface MockTool {
  tool_id: string;
  tool_name: string;
  category: string[];
  technicality_level: string;
  short_description: string;
  url: string;
  rls: boolean;
  logo_path: string;
  slug: string;
}

export interface MockCategory {
  category_id: string;
  category_name: string;
  category_description: string;
}

export interface MockTechnicalityLevel {
  technicality_level: string;
}

export const mockCategories: MockCategory[] = [
  {
    "category_id": "all",
    "category_name": "All Tools",
    "category_description": "View all available AI analytics tools across all categories"
  },
  {
    "category_id": "natural-language",
    "category_name": "Natural Language",
    "category_description": "Tools that allow querying data using natural language, chat interfaces, and AI assistants"
  },
  {
    "category_id": "semantic-layer",
    "category_name": "Semantic Layer",
    "category_description": "Tools that provide semantic layers and data modeling capabilities for consistent data definitions"
  },
  {
    "category_id": "business-intelligence",
    "category_name": "Business Intelligence",
    "category_description": "Comprehensive BI platforms for enterprise analytics, dashboards, and reporting"
  },
  {
    "category_id": "data-visualization",
    "category_name": "Data Visualization",
    "category_description": "Tools for creating charts, graphs, dashboards, and interactive visualizations"
  },
  {
    "category_id": "data-preparation",
    "category_name": "Data Preparation",
    "category_description": "Tools for data engineering, spreadsheet analysis, and data preparation workflows"
  },
  {
    "category_id": "data-infrastructure",
    "category_name": "Data Infrastructure",
    "category_description": "Cloud platforms, databases, and infrastructure tools for data management"
  }
];

export const mockTechnicalityLevels: MockTechnicalityLevel[] = [
  { technicality_level: "Low" },
  { technicality_level: "Medium" },
  { technicality_level: "High" }
];

export const mockTools: MockTool[] = [
  {
    "tool_id": "1",
    "tool_name": "AnswerLayer",
    "category": [
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "Semantic layer",
    "url": "https://getanswerlayer.com",
    "rls": true,
    "logo_path": "",
    "slug": "answerlayer"
  },
  {
    "tool_id": "2",
    "tool_name": "Arcwise",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Low",
    "short_description": "AI spreadsheet",
    "url": "https://arcwise.app/",
    "rls": true,
    "logo_path": "",
    "slug": "arcwise"
  },
  {
    "tool_id": "3",
    "tool_name": "Ardent AI",
    "category": [
      "natural-language",
      "data-preparation"
    ],
    "technicality_level": "High",
    "short_description": "AI assistant for data engineering",
    "url": "https://www.ardentai.io/",
    "rls": true,
    "logo_path": "",
    "slug": "ardent-ai"
  },
  {
    "tool_id": "4",
    "tool_name": "Athenic",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "AI Data Analyst",
    "url": "https://www.athenic.com/",
    "rls": true,
    "logo_path": "",
    "slug": "athenic"
  },
  {
    "tool_id": "5",
    "tool_name": "atscale",
    "category": [
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "generative semantic layer",
    "url": "https://www.atscale.com/",
    "rls": true,
    "logo_path": "",
    "slug": "atscale"
  },
  {
    "tool_id": "6",
    "tool_name": "Basedash",
    "category": [
      "business-intelligence",
      "data-visualization"
    ],
    "technicality_level": "Medium",
    "short_description": "Generating dashboards",
    "url": "https://www.basedash.com/",
    "rls": true,
    "logo_path": "",
    "slug": "basedash"
  },
  {
    "tool_id": "7",
    "tool_name": "Beans",
    "category": [
      "data-visualization"
    ],
    "technicality_level": "Medium",
    "short_description": "Data analysis canvas on the browser",
    "url": "https://thisisbeans.com/",
    "rls": true,
    "logo_path": "",
    "slug": "beans"
  },
  {
    "tool_id": "8",
    "tool_name": "BlazeSQL",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.blazesql.com/",
    "rls": true,
    "logo_path": "",
    "slug": "blazesql"
  },
  {
    "tool_id": "9",
    "tool_name": "Cube",
    "category": [
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "Semantic layer",
    "url": "https://cube.dev/",
    "rls": true,
    "logo_path": "",
    "slug": "cube"
  },
  {
    "tool_id": "10",
    "tool_name": "Databricks Genie",
    "category": [
      "business-intelligence",
      "data-infrastructure"
    ],
    "technicality_level": "Medium",
    "short_description": "Big cloud",
    "url": "https://www.databricks.com/product/business-intelligence/ai-bi-genie",
    "rls": true,
    "logo_path": "",
    "slug": "databricks-genie"
  },
  {
    "tool_id": "11",
    "tool_name": "databuddy",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "\"Chat with data",
    "url": "https://databuddy.cc",
    "rls": true,
    "logo_path": "",
    "slug": "databuddy"
  },
  {
    "tool_id": "12",
    "tool_name": "datapad",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "AI data analyst",
    "url": "https://www.datapad.io/",
    "rls": true,
    "logo_path": "",
    "slug": "datapad"
  },
  {
    "tool_id": "13",
    "tool_name": "dbt Copilot",
    "category": [
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "Semantic layer with chat on top",
    "url": "https://www.getdbt.com/product/dbt-copilot",
    "rls": true,
    "logo_path": "",
    "slug": "dbt-copilot"
  },
  {
    "tool_id": "14",
    "tool_name": "Definite",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.definite.app/",
    "rls": true,
    "logo_path": "",
    "slug": "definite"
  },
  {
    "tool_id": "15",
    "tool_name": "Dremio",
    "category": [
      "semantic-layer",
      "data-infrastructure"
    ],
    "technicality_level": "High",
    "short_description": "Database connections.and semantic layer",
    "url": "https://docs.dremio.com/current/",
    "rls": true,
    "logo_path": "",
    "slug": "dremio"
  },
  {
    "tool_id": "16",
    "tool_name": "DuckDB",
    "category": [
      "data-infrastructure"
    ],
    "technicality_level": "High",
    "short_description": "\"Database",
    "url": "https://duckdb.org/",
    "rls": true,
    "logo_path": "",
    "slug": "duckdb"
  },
  {
    "tool_id": "17",
    "tool_name": "Elvity",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "http://www.elvity.ai",
    "rls": true,
    "logo_path": "",
    "slug": "elvity"
  },
  {
    "tool_id": "18",
    "tool_name": "Explo",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "embedded customer analytic",
    "url": "https://www.explo.co/",
    "rls": true,
    "logo_path": "",
    "slug": "explo"
  },
  {
    "tool_id": "19",
    "tool_name": "Fabi",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "Data analysis Agent",
    "url": "https://www.fabi.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "fabi"
  },
  {
    "tool_id": "20",
    "tool_name": "Findly",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.findly.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "findly"
  },
  {
    "tool_id": "21",
    "tool_name": "Formula Bot",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.formulabot.com/",
    "rls": true,
    "logo_path": "",
    "slug": "formula-bot"
  },
  {
    "tool_id": "22",
    "tool_name": "Galaxy",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "IDE for data people",
    "url": "https://www.getgalaxy.io/",
    "rls": true,
    "logo_path": "",
    "slug": "galaxy"
  },
  {
    "tool_id": "23",
    "tool_name": "GoodData",
    "category": [
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "\"Semantic layer",
    "url": "https://www.gooddata.com/",
    "rls": true,
    "logo_path": "",
    "slug": "gooddata"
  },
  {
    "tool_id": "24",
    "tool_name": "graphed",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://graphed.com",
    "rls": true,
    "logo_path": "",
    "slug": "graphed"
  },
  {
    "tool_id": "25",
    "tool_name": "Hex",
    "category": [
      "data-visualization"
    ],
    "technicality_level": "Medium",
    "short_description": "Notebook-based with prompting feature",
    "url": "https://hex.tech/product/magic-ai/",
    "rls": true,
    "logo_path": "",
    "slug": "hex"
  },
  {
    "tool_id": "26",
    "tool_name": "Inconvo",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Embedded conversational analytics",
    "url": "https://inconvo.com",
    "rls": true,
    "logo_path": "",
    "slug": "inconvo"
  },
  {
    "tool_id": "27",
    "tool_name": "Insightbase",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://insightbase.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "insightbase"
  },
  {
    "tool_id": "28",
    "tool_name": "Julius AI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://julius.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "julius-ai"
  },
  {
    "tool_id": "29",
    "tool_name": "Lightdash",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data on top of dbt",
    "url": "https://www.lightdash.com/",
    "rls": true,
    "logo_path": "",
    "slug": "lightdash"
  },
  {
    "tool_id": "30",
    "tool_name": "Lumi AI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.lumi-ai.com/",
    "rls": true,
    "logo_path": "",
    "slug": "lumi-ai"
  },
  {
    "tool_id": "31",
    "tool_name": "Macro",
    "category": [
      "natural-language"
    ],
    "technicality_level": "High",
    "short_description": "AI analyst in the CLI",
    "url": "https://getmacro.com/",
    "rls": true,
    "logo_path": "",
    "slug": "macro"
  },
  {
    "tool_id": "32",
    "tool_name": "MindsDB",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://mindsdb.com/",
    "rls": true,
    "logo_path": "",
    "slug": "mindsdb"
  },
  {
    "tool_id": "33",
    "tool_name": "mito",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://trymito.io",
    "rls": true,
    "logo_path": "",
    "slug": "mito"
  },
  {
    "tool_id": "34",
    "tool_name": "Nao",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "IDE for data people",
    "url": "https://getnao.io/",
    "rls": true,
    "logo_path": "",
    "slug": "nao"
  },
  {
    "tool_id": "35",
    "tool_name": "Nobie",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Low",
    "short_description": "AI spreadsheet",
    "url": "https://nobie.com/",
    "rls": true,
    "logo_path": "",
    "slug": "nobie"
  },
  {
    "tool_id": "36",
    "tool_name": "Numerous AI",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Low",
    "short_description": "AI spreadsheet",
    "url": "https://numerous.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "numerous-ai"
  },
  {
    "tool_id": "37",
    "tool_name": "Plotly studio",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "Vibe code data apps",
    "url": "https://plotly.com/",
    "rls": true,
    "logo_path": "",
    "slug": "plotly-studio"
  },
  {
    "tool_id": "38",
    "tool_name": "PowerDrill",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://powerdrill.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "powerdrill"
  },
  {
    "tool_id": "39",
    "tool_name": "Preset",
    "category": [
      "business-intelligence"
    ],
    "technicality_level": "Medium",
    "short_description": "\"Classic BI tool",
    "url": "https://preset.io/",
    "rls": true,
    "logo_path": "",
    "slug": "preset"
  },
  {
    "tool_id": "40",
    "tool_name": "prompt BI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://promptbi.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "prompt-bi"
  },
  {
    "tool_id": "41",
    "tool_name": "Quadratic",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Low",
    "short_description": "AI spreadsheet",
    "url": "https://www.quadratichq.com/",
    "rls": true,
    "logo_path": "",
    "slug": "quadratic"
  },
  {
    "tool_id": "42",
    "tool_name": "Querri",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://querri.ai",
    "rls": true,
    "logo_path": "",
    "slug": "querri"
  },
  {
    "tool_id": "43",
    "tool_name": "Rill Data",
    "category": [
      "business-intelligence",
      "data-visualization"
    ],
    "technicality_level": "Medium",
    "short_description": "Generative dashboards",
    "url": "https://www.rilldata.com/",
    "rls": true,
    "logo_path": "",
    "slug": "rill-data"
  },
  {
    "tool_id": "44",
    "tool_name": "runQL",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://runql.com/",
    "rls": true,
    "logo_path": "",
    "slug": "runql"
  },
  {
    "tool_id": "45",
    "tool_name": "Secoda",
    "category": [
      "natural-language",
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "AI analyst on top of semantic layer",
    "url": "https://www.secoda.co/",
    "rls": true,
    "logo_path": "",
    "slug": "secoda"
  },
  {
    "tool_id": "46",
    "tool_name": "SELECT",
    "category": [
      "data-infrastructure"
    ],
    "technicality_level": "Medium",
    "short_description": "\"Snowflake cloud optimization tool",
    "url": "https://select.dev/",
    "rls": true,
    "logo_path": "",
    "slug": "select"
  },
  {
    "tool_id": "47",
    "tool_name": "Shortcut",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Low",
    "short_description": "AI spreadsheet",
    "url": "https://www.tryshortcut.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "shortcut"
  },
  {
    "tool_id": "48",
    "tool_name": "Sigma",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "\"Agentic analytics",
    "url": "https://www.sigmacomputing.com/",
    "rls": true,
    "logo_path": "",
    "slug": "sigma"
  },
  {
    "tool_id": "49",
    "tool_name": "Snowfalke cortex",
    "category": [
      "business-intelligence",
      "data-infrastructure"
    ],
    "technicality_level": "Medium",
    "short_description": "Big cloud",
    "url": "https://www.snowflake.com/en/product/features/cortex/",
    "rls": true,
    "logo_path": "",
    "slug": "snowfalke-cortex"
  },
  {
    "tool_id": "50",
    "tool_name": "Sourcetable",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Low",
    "short_description": "AI spreadsheet",
    "url": "https://sourcetable.com/",
    "rls": true,
    "logo_path": "",
    "slug": "sourcetable"
  },
  {
    "tool_id": "51",
    "tool_name": "SQL Mesh",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "High",
    "short_description": "Data modelling with autocomplete",
    "url": "https://sqlmesh.com/",
    "rls": true,
    "logo_path": "",
    "slug": "sql-mesh"
  },
  {
    "tool_id": "52",
    "tool_name": "Starburst",
    "category": [
      "natural-language",
      "data-infrastructure"
    ],
    "technicality_level": "High",
    "short_description": "database building ai analyst",
    "url": "https://www.starburst.io/",
    "rls": true,
    "logo_path": "",
    "slug": "starburst"
  },
  {
    "tool_id": "53",
    "tool_name": "Stormly",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "Product Analytics built for E-Commerce Teams",
    "url": "https://stormly.com",
    "rls": true,
    "logo_path": "",
    "slug": "stormly"
  },
  {
    "tool_id": "54",
    "tool_name": "Structify",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "Medium",
    "short_description": "Data scraping and sourcing",
    "url": "https://www.structify.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "structify"
  },
  {
    "tool_id": "55",
    "tool_name": "Sundial",
    "category": [
      "business-intelligence"
    ],
    "technicality_level": "Medium",
    "short_description": "Internal BI",
    "url": "https://sundial.so",
    "rls": true,
    "logo_path": "",
    "slug": "sundial"
  },
  {
    "tool_id": "56",
    "tool_name": "synehq",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://synehq.com",
    "rls": true,
    "logo_path": "",
    "slug": "synehq"
  },
  {
    "tool_id": "57",
    "tool_name": "Synq",
    "category": [
      "business-intelligence",
      "data-infrastructure"
    ],
    "technicality_level": "Medium",
    "short_description": "data observability",
    "url": "https://www.synq.io/",
    "rls": true,
    "logo_path": "",
    "slug": "synq"
  },
  {
    "tool_id": "58",
    "tool_name": "Tensorstax",
    "category": [
      "data-preparation"
    ],
    "technicality_level": "High",
    "short_description": "Data engineering",
    "url": "https://www.tensorstax.com/",
    "rls": true,
    "logo_path": "",
    "slug": "tensorstax"
  },
  {
    "tool_id": "59",
    "tool_name": "Terno AI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://terno.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "terno-ai"
  },
  {
    "tool_id": "60",
    "tool_name": "textQL",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://textql.com",
    "rls": true,
    "logo_path": "",
    "slug": "textql"
  },
  {
    "tool_id": "61",
    "tool_name": "ThoughtSpot",
    "category": [
      "business-intelligence"
    ],
    "technicality_level": "Medium",
    "short_description": "Agentic analytics platform",
    "url": "https://www.thoughtspot.com/",
    "rls": true,
    "logo_path": "",
    "slug": "thoughtspot"
  },
  {
    "tool_id": "62",
    "tool_name": "Turntable",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://turntable.so",
    "rls": true,
    "logo_path": "",
    "slug": "turntable"
  },
  {
    "tool_id": "63",
    "tool_name": "Vanna AI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "\"Text to SQL",
    "url": "https://vanna.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "vanna-ai"
  },
  {
    "tool_id": "64",
    "tool_name": "Waii",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "Text to SQL",
    "url": "https://www.waii.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "waii"
  },
  {
    "tool_id": "65",
    "tool_name": "Wallabi",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.wallabi.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "wallabi"
  },
  {
    "tool_id": "66",
    "tool_name": "Wisdom AI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "AI-powered analytics",
    "url": "https://askwisdom.ai",
    "rls": true,
    "logo_path": "",
    "slug": "wisdom-ai"
  },
  {
    "tool_id": "67",
    "tool_name": "Wobby",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "AI analyst",
    "url": "https://www.wobby.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "wobby"
  },
  {
    "tool_id": "68",
    "tool_name": "wren AI",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://getwren.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "wren-ai"
  },
  {
    "tool_id": "69",
    "tool_name": "Zayer",
    "category": [
      "semantic-layer"
    ],
    "technicality_level": "High",
    "short_description": "Semantic layer for agents",
    "url": "https://zayer.ai/",
    "rls": true,
    "logo_path": "",
    "slug": "zayer"
  },
  {
    "tool_id": "70",
    "tool_name": "Zenlytic",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Medium",
    "short_description": "AI data analyst",
    "url": "https://www.zenlytic.com/",
    "rls": true,
    "logo_path": "",
    "slug": "zenlytic"
  },
  {
    "tool_id": "71",
    "tool_name": "Supersimple",
    "category": [
      "natural-language"
    ],
    "technicality_level": "Low",
    "short_description": "Chat with data",
    "url": "https://www.supersimple.io/",
    "rls": true,
    "logo_path": "",
    "slug": "supersimple"
  }
];
