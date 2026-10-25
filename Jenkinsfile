pipeline {
    agent any

    tools {
        nodejs 'NodeJS 26.4.0' // Match your configured Jenkins tool name
    }

    parameters {
        choice(
            name: 'PROJECT',
            choices: ['all', 'chromium', 'firefox', 'edge'],
            description: 'Target browser/project to execute'
        )
        choice(
            name: 'TAG',
            choices: ['all', '@smoke', '@regression'],
            description: 'Test tag filter'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
        string(
            name: 'WORKERS',
            defaultValue: '2',
            description: 'Number of parallel workers'
        )
        string(
            name: 'RECIPIENTS',
            defaultValue: 'qa-team@example.com, mahesh.holkar@example.com',
            description: 'Comma-separated recipient email addresses'
        )
    }

    options {
        timeout(time: 45, unit: 'MINUTES')
        ansiColor('xterm')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        HEADLESS = "${params.HEADLESS}"
        APP_URL = 'https://tutorialsninja.com/demo/'
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
                    npm ci
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                script {
                    def projectArg = params.PROJECT == 'all' ? '' : "--project=${params.PROJECT}"
                    def grepArg = params.TAG == 'all' ? '' : "--grep ${params.TAG}"
                    def workersArg = "--workers=${params.WORKERS}"

                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        bat """
                            set URL=${APP_URL}
                            npx playwright test ${projectArg} ${grepArg} ${workersArg}
                        """
                    }
                }
            }
        }

        stage('Zip Report for Email Attachment') {
            steps {
                script {
                    // Compress HTML report folder so it can be emailed as an attachment
                    bat '''
                        powershell -Command "if (Test-Path 'playwright-report') { Compress-Archive -Path 'playwright-report\\*' -DestinationPath 'playwright-report.zip' -Force }"
                    '''
                }
            }
        }
    }

    post {
        always {
            // 1. Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            // 2. Playwright Native HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

            // 3. Archive Artifacts
            archiveArtifacts artifacts: 'test-results/**, playwright-report/**, playwright-report.zip', allowEmptyArchive: true

            // 4. Send Email Notification via Email Extension Plugin
            script {
                def buildColor = currentBuild.currentResult == 'SUCCESS' ? '#28a745' : (currentBuild.currentResult == 'UNSTABLE' ? '#ffc107' : '#dc3545')
                def subjectText = "Playwright Automation Execution - ${currentBuild.currentResult}: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}]"

                def emailBody = """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 20px; }
                        .container { border: 1px solid #e0e0e0; border-radius: 8px; max-width: 650px; margin: auto; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                        .header { background-color: ${buildColor}; color: white; padding: 18px 24px; font-size: 18px; font-weight: bold; }
                        .content { padding: 24px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
                        td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
                        td.label { font-weight: 600; width: 35%; color: #555; background-color: #fafafa; }
                        .button { display: inline-block; padding: 10px 20px; background-color: #007acc; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 14px; }
                        .footer { background-color: #f7f9fa; padding: 12px 24px; font-size: 12px; color: #777; text-align: center; border-top: 1px solid #e0e0e0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">Execution Status: ${currentBuild.currentResult}</div>
                        <div class="content">
                            <p>Hello Team,</p>
                            <p>The Playwright TypeScript E2E Test Suite run has completed. Details are below:</p>
                            <table>
                                <tr><td class="label">Project</td><td>Playwright TypeScript POM Framework</td></tr>
                                <tr><td class="label">Job Name</td><td>${env.JOB_NAME}</td></tr>
                                <tr><td class="label">Build Number</td><td>#${env.BUILD_NUMBER}</td></tr>
                                <tr><td class="label">Browser Executed</td><td>${params.PROJECT}</td></tr>
                                <tr><td class="label">Tag Filter</td><td>${params.TAG}</td></tr>
                                <tr><td class="label">Headless Mode</td><td>${params.HEADLESS}</td></tr>
                                <tr><td class="label">Execution Duration</td><td>${currentBuild.durationString - ' and counting'}</td></tr>
                            </table>
                            <p style="margin-top: 20px;">
                                <a href="${env.BUILD_URL}Playwright_20Test_20Report/" class="button">View Playwright HTML Report</a>
                                &nbsp;
                                <a href="${env.BUILD_URL}allure/" class="button" style="background-color: #f39c12;">View Allure Report</a>
                            </p>
                        </div>
                        <div class="footer">
                            Automated notification sent from Jenkins Build Server.
                        </div>
                    </div>
                </body>
                </html>
                """

                emailext(
                    to: params.RECIPIENTS,
                    subject: subjectText,
                    body: emailBody,
                    mimeType: 'text/html',
                    attachmentsPattern: 'playwright-report.zip'
                )
            }
        }
    }
}
