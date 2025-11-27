pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'spandanadc'
        IMAGE_NAME         = 'byways-app'
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-login'
        // Your logs show your app uses Port 5000 internally
        CONTAINER_PORT     = '5000' 
        // We will expose it on Port 3000 so you don't have to change EC2 settings
        HOST_PORT          = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                script {
                    echo '--- Building Docker Image ---'
                    // Added 'docker.io/' to fix the "server misbehaving" error
                    sh "docker build -t docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    echo '--- Logging into Docker Hub ---'
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
                    // Added 'docker.io/' here too
                    sh "docker push docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo '--- Deploying Application ---'
                    // Stop old container
                    sh "docker stop byways-container || true"
                    sh "docker rm byways-container || true"
                    
                    // Map EC2 Port 3000 -> Container Port 5000
                    sh "docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name byways-container docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            sh "docker logout"
        }
    }
}
// End of Pipeline - Make sure this closing bracket is present!
