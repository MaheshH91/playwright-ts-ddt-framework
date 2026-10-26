import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/config/env.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    globalSetup: './src/utils/allureEnvSetup.ts',
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : Number(ENV.MAX_RETRY_COUNT) || 1,
    workers: process.env.CI ? 2 : undefined,
    reporter: [
        ['list'],
        // Standard interactive folder report for CI/Jenkins artifact viewer
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        // Monolithic standalone HTML report for direct email attachment
        ['html', { outputFile: 'playwright-report/index.html', open: 'never' }],
        ['json', { outputFile: 'reports/test-results.json' }],
        [
            'allure-playwright',
            {
                detail: true,
                outputFolder: 'allure-results',
                suiteTitle: true,
            },
        ],
    ],
    use: {
        baseURL: process.env.URL || ENV.BASE_URL || 'https://tutorialsninja.com/demo/',
        headless: process.env.HEADLESS !== 'false',
        viewport: { width: 1920, height: 1080 },
        actionTimeout: Number(ENV.EXPLICIT_WAIT || 10) * 1000,
        navigationTimeout: Number(ENV.PAGE_LOAD_TIMEOUT || 15) * 1000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        // Launch flags optimized for both Windows local runs and Ubuntu Linux CI containers
        launchOptions: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
            ],
        },

        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        extraHTTPHeaders: {
            'Accept-Language': 'en-US,en;q=0.9',
        },
    },
    projects: [
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
            },
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
            },
        },
    ],
});
