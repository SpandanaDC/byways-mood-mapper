pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'spandanadc'
        IMAGE_NAME         = 'byways-app'
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-login'
        
        // --- UPDATED CONFIGURATION ---
        // Your logs confirmed the app is running on Port 8080 inside
        CONTAINER_PORT     = '8080' 
        
        // We set this to 5000 to match your AWS Security Group settings!
        HOST_PORT          = '5000'
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
                    sh "docker push docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo '--- Deploying Application ---'
                    sh "docker stop byways-container || true"
                    sh "docker rm byways-container || true"
                    
                    // Map EC2 Port 5000 -> Container Port 8080
                    // Remember to fill in your MONGO_URI if your app needs it!
                    sh """
                        docker run -d \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        -e MONGO_URI='mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/byways' \
                        --name byways-container \
                        docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                    """
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
// End of Pipeline
