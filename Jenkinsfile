pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'spandanadc'
        IMAGE_NAME         = 'byways-app'
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-login'
        
        // Pulls the secret text 'mongo-uri' from Jenkins Credentials
        MONGO_CONNECTION_STRING = credentials('mongo-uri')

        CONTAINER_PORT     = '8080' 
        HOST_PORT          = '5000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // --- NEW STAGE: Stop the App BEFORE building to save RAM ---
        stage('Free up RAM') {
            steps {
                script {
                    echo '--- Stopping current app to free up memory ---'
                    sh "docker stop byways-container || true"
                    sh "docker rm byways-container || true"
                    // Clear unused Docker data to free up space
                    sh "docker system prune -f" 
                }
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
                    
                    // We now inject the secret variable ($MONGO_CONNECTION_STRING) directly
                    sh """
                        docker run -d \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        -e MONGO_URI="$MONGO_CONNECTION_STRING" \
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
