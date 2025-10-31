// Script to generate mock data from the CSV file
const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../../Tools for Conversational Analytics - Full List (1).csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV (simple parsing for this specific format)
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',');

// Function to categorize tools based on description
function categorizeTools(description, companyName) {
  const desc = description.toLowerCase();
  const name = companyName.toLowerCase();
  const categories = [];

  // Natural Language Processing / Chat interfaces
  if (desc.includes('chat with data') || desc.includes('text to sql') || desc.includes('conversational') || 
      desc.includes('ai analyst') || desc.includes('ai assistant')) {
    categories.push('natural-language');
  }

  // Semantic Layer
  if (desc.includes('semantic layer') || name.includes('cube') || name.includes('dbt')) {
    categories.push('semantic-layer');
  }

  // Business Intelligence
  if (desc.includes('dashboard') || desc.includes('bi') || desc.includes('analytics platform') || 
      desc.includes('business intelligence') || desc.includes('embedded analytic')) {
    categories.push('business-intelligence');
  }

  // Data Visualization
  if (desc.includes('dashboard') || desc.includes('visualization') || desc.includes('chart') || 
      desc.includes('notebook') || desc.includes('canvas')) {
    categories.push('data-visualization');
  }

  // Spreadsheet/Data Preparation
  if (desc.includes('spreadsheet') || desc.includes('data engineering') || desc.includes('data modelling') ||
      desc.includes('data scraping') || desc.includes('data sourcing')) {
    categories.push('data-preparation');
  }

  // Cloud/Infrastructure
  if (desc.includes('big cloud') || desc.includes('database') || desc.includes('cloud optimization') ||
      desc.includes('data observability')) {
    categories.push('data-infrastructure');
  }

  // Default to natural-language if no specific category found
  if (categories.length === 0) {
    categories.push('natural-language');
  }

  return categories;
}

// Function to determine technicality level
function getTechnicalityLevel(description, companyName) {
  const desc = description.toLowerCase();
  const name = companyName.toLowerCase();

  // High technicality - infrastructure, engineering, complex tools
  if (desc.includes('data engineering') || desc.includes('semantic layer') || desc.includes('database') ||
      desc.includes('data modelling') || desc.includes('cli') || desc.includes('open source') ||
      name.includes('duckdb') || name.includes('dremio') || name.includes('starburst')) {
    return 'High';
  }

  // Low technicality - simple chat interfaces, spreadsheets
  if (desc.includes('chat with data') || desc.includes('spreadsheet') || desc.includes('simple') ||
      desc.includes('embedded') && !desc.includes('engineering')) {
    return 'Low';
  }

  // Medium technicality - everything else
  return 'Medium';
}

// Function to create a URL-friendly slug
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Parse the CSV and create mock data
const tools = [];
const categories = new Set();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  // Simple CSV parsing (handles basic cases)
  const parts = line.split(',');
  if (parts.length < 3) continue;

  const companyName = parts[0]?.trim();
  const url = parts[1]?.trim();
  const description = parts[2]?.trim();

  // Skip empty entries
  if (!companyName || !url || companyName === 'AtriumDB') continue;

  const toolCategories = categorizeTools(description, companyName);
  const technicalityLevel = getTechnicalityLevel(description, companyName);
  
  // Add categories to our set
  toolCategories.forEach(cat => categories.add(cat));

  const tool = {
    tool_id: (i).toString(),
    tool_name: companyName,
    category: toolCategories,
    technicality_level: technicalityLevel,
    short_description: description || `${companyName} - AI analytics platform`,
    url: url.startsWith('http') ? url : `https://${url}`,
    rls: true,
    logo_path: "", // Empty for fallback to Bot icon
    slug: createSlug(companyName)
  };

  tools.push(tool);
}

// Create category definitions
const categoryDefinitions = [
  {
    category_id: "all",
    category_name: "All Tools",
    category_description: "View all available AI analytics tools across all categories"
  },
  {
    category_id: "natural-language",
    category_name: "Natural Language",
    category_description: "Tools that allow querying data using natural language, chat interfaces, and AI assistants"
  },
  {
    category_id: "semantic-layer",
    category_name: "Semantic Layer",
    category_description: "Tools that provide semantic layers and data modeling capabilities for consistent data definitions"
  },
  {
    category_id: "business-intelligence",
    category_name: "Business Intelligence",
    category_description: "Comprehensive BI platforms for enterprise analytics, dashboards, and reporting"
  },
  {
    category_id: "data-visualization",
    category_name: "Data Visualization",
    category_description: "Tools for creating charts, graphs, dashboards, and interactive visualizations"
  },
  {
    category_id: "data-preparation",
    category_name: "Data Preparation",
    category_description: "Tools for data engineering, spreadsheet analysis, and data preparation workflows"
  },
  {
    category_id: "data-infrastructure",
    category_name: "Data Infrastructure",
    category_description: "Cloud platforms, databases, and infrastructure tools for data management"
  }
];

console.log(`Parsed ${tools.length} tools with ${categories.size} unique categories`);
console.log('Categories found:', Array.from(categories));

// Generate the TypeScript file
const mockDataContent = `// Mock data generated from CSV file
// Generated on ${new Date().toISOString()}

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

export const mockCategories: MockCategory[] = ${JSON.stringify(categoryDefinitions, null, 2)};

export const mockTechnicalityLevels: MockTechnicalityLevel[] = [
  { technicality_level: "Low" },
  { technicality_level: "Medium" },
  { technicality_level: "High" }
];

export const mockTools: MockTool[] = ${JSON.stringify(tools, null, 2)};
`;

// Write the new mock data file
const outputPath = path.join(__dirname, '../lib/mockData.ts');
fs.writeFileSync(outputPath, mockDataContent);

console.log(`✅ Generated mock data with ${tools.length} tools`);
console.log(`📁 Saved to: ${outputPath}`);
console.log('\n🔧 Categories breakdown:');
categoryDefinitions.forEach(cat => {
  if (cat.category_id !== 'all') {
    const count = tools.filter(tool => tool.category.includes(cat.category_id)).length;
    console.log(`  ${cat.category_name}: ${count} tools`);
  }
});

console.log('\n📊 Technicality breakdown:');
['Low', 'Medium', 'High'].forEach(level => {
  const count = tools.filter(tool => tool.technicality_level === level).length;
  console.log(`  ${level}: ${count} tools`);
});
