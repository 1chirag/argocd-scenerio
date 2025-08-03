pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jainchirag/nodeapi'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'  // Jenkins credentials ID for Docker Hub
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/1chirag/argocd-scenerio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Login to Docker Hub & Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }
        stage('Update Image Tag in Deployment File') {
            steps {
                sh '''
                    sed -i "s/{{TAG}}/$IMAGE_TAG/g" nodeapi-deployment.yaml
                    '''
                }
        }   
        stage('Print Updated Deployment File') {
             steps {
                sh 'cat nodeapi-deployment.yaml'
             }
        }
    }
}
