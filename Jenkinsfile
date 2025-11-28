pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'spandanadc'
        IMAGE_NAME         = 'byways-app'
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-login'
        
        // Pulls the secret text 'mongo-uri' from Jenkins Credentials
        MONGO_CONNECTION_STRING = credentials('mongo-uri')

        // Internal Port (Vite runs on 8080 inside container)
        CONTAINER_PORT     = '8080' 
        // External Port (Your AWS Security Group allows 5000)
        HOST_PORT          = '5000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // --- STAGE 1: Stop the App FIRST to save RAM ---
        stage('Free up RAM') {
            steps {
                script {
                    echo '--- Stopping current app to free up memory ---'
                    // Ignore errors if container doesn't exist yet
                    sh "docker stop byways-container || true"
                    sh "docker rm byways-container || true"
                }
            }
        }

        // --- STAGE 2: Build with --no-cache to see NEW code ---
        stage('Build Image') {
            steps {
                script {
                    echo '--- Building Docker Image (Forcing New Code) ---'
                    // The --no-cache flag tells Docker: "Don't be lazy! Read files again!"
                    sh "docker build --no-cache -t docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
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
                    
                    // Run the container with the correct ports and database key
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
            // Clean up messy image layers to save disk space
            sh "docker image prune -f"
        }
    }
}
// End of Pipeline