pipeline {
    agent any

    tools {
        // Ensure this exact name is configured under Manage Jenkins > Tools > NodeJS
        nodejs 'NodeJS 24.21.0'
    }

    parameters {
        choice(
            name: 'PROJECT',
            choices: ['all', 'chrome', 'chromium', 'firefox', 'webkit', 'edge'],
            description: 'Select target browser/project to execute'
        )
        choice(
            name: 'TAG',
            choices: ['all', '@smoke', '@regression'],
            description: 'Select test tag filter'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run tests in headless mode'
        )
        string(
            name: 'WORKERS',
            defaultValue: '2',
            description: 'Number of parallel workers'
        )
    }

    options {
        timeout(time: 45, unit: 'MINUTES')
        ansiColor('xterm')
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        CI = 'true'
        HEADLESS = "${params.HEADLESS}"
        APP_URL = '[https://tutorialsninja.com/demo/](https://tutorialsninja.com/demo/)'
    }

    stages {
        stage('Checkout Code') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    @echo off
                    echo ========================================
                    echo Installing Node.js dependencies
                    echo ========================================
                    call npm ci

                    echo ========================================
                    echo Installing Playwright browsers
                    echo ========================================
                    call npx playwright install

                    echo ========================================
                    echo Installing Playwright FFmpeg
                    echo ========================================
                    call npx playwright install ffmpeg
                '''
            }
        }

        stage('Validate Playwright Installation') {
            steps {
                bat '''
                    @echo off
                    echo ========================================
                    echo Playwright Version
                    echo ========================================
                    call npx playwright --version

                    echo ========================================
                    echo Node.js Version
                    echo ========================================
                    node --version

                    echo ========================================
                    echo npm Version
                    echo ========================================
                    call npm --version
                '''
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                script {
                    def projectArg = params.PROJECT == 'all' ? '' : "--project=${params.PROJECT}"
                    def grepArg = params.TAG == 'all' ? '' : "--grep \"${params.TAG}\""
                    def workersArg = "--workers=${params.WORKERS}"

                    echo "========================================"
                    echo "Playwright Execution Configuration"
                    echo "========================================"
                    echo "Project : ${params.PROJECT}"
                    echo "Tag     : ${params.TAG}"
                    echo "Headless: ${params.HEADLESS}"
                    echo "Workers : ${params.WORKERS}"
                    echo "URL     : ${APP_URL}"
                    echo "========================================"

                    withEnv(["URL=${APP_URL}", "HEADLESS=${HEADLESS}"]) {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            bat "call npx playwright test ${projectArg} ${grepArg} ${workersArg}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo '========================================'
            echo 'Publishing Test Reports'
            echo '========================================'

            // Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            // Playwright HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

            // Test Artifacts
            archiveArtifacts(
                artifacts: 'test-results/**, playwright-report/**, allure-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright test execution completed successfully.'
        }

        unstable {
            echo 'Playwright tests completed with failures. Review the reports.'
        }

        failure {
            echo 'Jenkins pipeline failed. Check the console output.'
        }
    }
}
