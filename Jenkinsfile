pipeline {
    agent {
        docker {
            image 'node:18'
            args '-p 3000:3000'
        }
    }

    environment {
        NODE_ENV = 'development'
        NODE_VERSION = '18.17.0'  // Specify your Node.js version
        DOCKER_REGISTRY = 'your-registry'  // Replace with your registry
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Code Quality') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Deploy - Development') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to development environment'
            }
        }

        stage('Deploy - Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production environment'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
} 