import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/config/env.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : Number(ENV.MAX_RETRY_COUNT) || 1,
    workers: process.env.CI ? 2 : undefined,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
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
        baseURL: ENV.BASE_URL.endsWith('/') ? ENV.BASE_URL : `${ENV.BASE_URL}/`,
        headless: ENV.HEADLESS,
        viewport: { width: 1920, height: 1080 },
        actionTimeout: Number(ENV.EXPLICIT_WAIT) * 1000,
        navigationTimeout: Number(ENV.PAGE_LOAD_TIMEOUT) * 1000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        // Custom headers to prevent server-side redirect triggers
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        extraHTTPHeaders: {
            'Accept-Language': 'en-US,en;q=0.9',
        }
    },
    projects: [
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome', // Launches locally installed Google Chrome
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
            name: 'edge',
            use: { ...devices['Desktop Edge'], channel: 'msedge' },
        }
    ]
});
