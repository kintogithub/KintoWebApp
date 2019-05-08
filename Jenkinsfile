pipeline {
  agent any
  environment {
    REACT_APP_GITHUB_CLIENT_ID_DEV = credentials('REACT_APP_GITHUB_CLIENT_ID_DEV')
    REACT_APP_GITHUB_CLIENT_ID_STAGING = credentials('REACT_APP_GITHUB_CLIENT_ID_STAGING')
    REACT_APP_GITHUB_CLIENT_ID_PROD = credentials('REACT_APP_GITHUB_CLIENT_ID_PROD')
    REACT_APP_BITBUCKET_CLIENT_ID_DEV = credentials('REACT_APP_BITBUCKET_CLIENT_ID_DEV')
    REACT_APP_BITBUCKET_CLIENT_ID_STAGING = credentials('REACT_APP_BITBUCKET_CLIENT_ID_STAGING')
    REACT_APP_BITBUCKET_CLIENT_ID_PROD = credentials('REACT_APP_BITBUCKET_CLIENT_ID_PROD')
    REACT_APP_AUTH_APP_ID = credentials('REACT_APP_AUTH_APP_ID')
    REACT_APP_AUTH_APP_SECRET= credentials('REACT_APP_AUTH_APP_SECRET')
  }
  stages {
    stage('Build') {
      steps {
        parallel(
          "Build": {
            script {
              GIT_COMMIT_SHORT = sh (script: 'git rev-parse --short HEAD',returnStdout: true).trim()
              env.gitTagName = "${GIT_BRANCH}".replaceAll("/", "-") + "-${GIT_COMMIT_SHORT}"
              switch(GIT_BRANCH) {
                case "dev":
                  env.REACT_APP_GITHUB_CLIENT_ID = "${REACT_APP_GITHUB_CLIENT_ID_DEV}"
                  env.REACT_APP_BITBUCKET_CLIENT_ID = "${REACT_APP_BITBUCKET_CLIENT_ID_DEV}"
                  break
                case "staging":
                  env.REACT_APP_GITHUB_CLIENT_ID = "${REACT_APP_GITHUB_CLIENT_ID_STAGING}"
                  env.REACT_APP_BITBUCKET_CLIENT_ID = "${REACT_APP_BITBUCKET_CLIENT_ID_STAGING}"
                  break
                case "master":
                  env.REACT_APP_GITHUB_CLIENT_ID = "${REACT_APP_GITHUB_CLIENT_ID_PROD}"
                  env.REACT_APP_BITBUCKET_CLIENT_ID = "${REACT_APP_BITBUCKET_CLIENT_ID_PROD}"
                  break
                default:
                  env.REACT_APP_GITHUB_CLIENT_ID = "${REACT_APP_GITHUB_CLIENT_ID_DEV}"
                  env.REACT_APP_BITBUCKET_CLIENT_ID = "${REACT_APP_BITBUCKET_CLIENT_ID_DEV}"
                  break
              }
            }
            withCredentials([string(credentialsId: 'docker_registry', variable: 'SECRET')]) {
              sh '''#!/bin/bash -xe
              echo "doing the build..."
              echo "REACT_APP_SERVER_URL=https://api.${GIT_BRANCH//\\//-}.kintohub.com" >> .env
              echo "REACT_APP_SHOW_PRODUCTION=true" >> .env
              echo "NODE_PATH=src/" >> .env
              echo "REACT_APP_URL_TYPE=append" >> .env
              echo "REACT_APP_AUTH_APP_ID=${REACT_APP_AUTH_APP_ID}" >> .env
              echo "REACT_APP_AUTH_APP_SECRET=${REACT_APP_AUTH_APP_SECRET}" >> .env
              echo "REACT_APP_GITHUB_CLIENT_ID=${REACT_APP_GITHUB_CLIENT_ID}" >> .env
              echo "REACT_APP_BITBUCKET_CLIENT_ID=${REACT_APP_BITBUCKET_CLIENT_ID}" >> .env
              cat .env
              docker login kintocloud.azurecr.io --username kintocloud --password ${SECRET}
              docker build -t kintocloud.azurecr.io/frontend:${gitTagName} .'''
            }
          },
          "Slack build started": {
            slackSend(color: '#D3D3D3', message: "Started: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]  from branch ${env.GIT_BRANCH} ")

          }
        )
      }
    }
    
    stage('Push') {
      steps {
        sh """#!/bin/bash -xe
        docker push kintocloud.azurecr.io/frontend:${env.gitTagName}
        """
      }
    }
  }

  post {
    success {
      slackSend(color: '#008000', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
}
