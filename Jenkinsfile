pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jainchirag/nodeapi'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'  // ID you gave while adding credentials in Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/1chirag/argocd-scenerio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:v${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
