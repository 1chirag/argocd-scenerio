pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jainchirag/nodeapi'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/1chirag/argocd-scenerio.git'
            }
        }

        stage('Determine Image Tag') {
            steps {
                script {
                    // Get latest numeric tag from Docker Hub
                    def output = sh(
                        script: '''
                            curl -s https://registry.hub.docker.com/v1/repositories/jainchirag/nodeapi/tags \
                            | grep -o '"name": *"v[0-9]\\+"' \
                            | sed 's/.*"v\\([0-9]\\+\\)"/\\1/' \
                            | sort -n \
                            | tail -1
                        ''',
                        returnStdout: true
                    ).trim()

                    def lastVersion = output.isInteger() ? output.toInteger() : 0
                    env.IMAGE_TAG = "v${lastVersion + 1}"
                    echo "Using image tag: ${env.IMAGE_TAG}"
                }
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
    }
}
