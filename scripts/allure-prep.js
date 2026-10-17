const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const resultsDir = path.join(rootDir, 'allure-results');
const reportHistoryDir = path.join(rootDir, 'allure-report', 'history');
const targetHistoryDir = path.join(resultsDir, 'history');
const categoriesSrc = path.join(rootDir, 'data', 'categories.json');
const categoriesDest = path.join(resultsDir, 'categories.json');

// Ensure allure-results directory exists
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

// Preserve historical trends
if (fs.existsSync(reportHistoryDir)) {
    fs.cpSync(reportHistoryDir, targetHistoryDir, { recursive: true });
    console.log('Copied allure history to allure-results/history');
}

// Copy categories definitions
if (fs.existsSync(categoriesSrc)) {
    fs.copyFileSync(categoriesSrc, categoriesDest);
    console.log('Copied categories.json to allure-results/categories.json');
}
