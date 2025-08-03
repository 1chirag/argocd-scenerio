pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jainchirag/nodeapi'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'  // Your Jenkins Docker Hub credentials ID
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/1chirag/argocd-scenerio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    withEnv(["PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"]) {
                        dockerImage = docker.build("${IMAGE_NAME}:v${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withEnv(["PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"]) {
                        docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                            dockerImage.push()
                        }
                    }
                }
            }
        }
    }
}
