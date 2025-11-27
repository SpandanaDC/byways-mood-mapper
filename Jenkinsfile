pipeline {
    agent any

    environment {
        // --- CONFIGURATION ---
        // Your Docker Hub username
        DOCKERHUB_USERNAME = 'SpandanaDC'
        // Name you want for your image
        IMAGE_NAME         = 'byways-app'
        // The ID you created in Jenkins Credentials
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-login'
    }

    stages {
        stage('Checkout') {
            steps {
                // Get the latest code from the GitHub branch
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                script {
                    echo '--- Building Docker Image ---'
                    // This uses the "Dockerfile" in your repo
                    sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    echo '--- Logging in ---'
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    echo '--- Pushing to Docker Hub ---'
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }
        
        // OPTIONAL: Add a "Deploy" stage here later to run the app!
    }

    post {
        always {
            // cleanup to save space on EC2
            sh "docker rmi ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest || true"
            sh "docker logout"
        }
    }
}        
