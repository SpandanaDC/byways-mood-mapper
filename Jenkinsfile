pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'SpandanaDC'
        IMAGE_NAME         = 'byways-app'
        DOCKERHUB_CREDENTIALS_ID = 'docker-hub-login'
        // The port your app runs on (internal and external)
        APP_PORT           = '3000' 
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
                    sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo '--- Deploying Application ---'
                    // 1. Stop and remove the old container (ignore errors if it doesn't exist yet)
                    sh "docker stop byways-container || true"
                    sh "docker rm byways-container || true"
                    
                    // 2. Run the new container
                    // -d = Detached mode (runs in background)
                    // -p = Map port 3000 on server to 3000 in container
                    // --name = Name it so we can stop it easily next time
                    sh "docker run -d -p ${APP_PORT}:${APP_PORT} --name byways-container ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            // Clean up the image to save space, but DO NOT stop the running container!
            sh "docker logout"
        }
    }
}
