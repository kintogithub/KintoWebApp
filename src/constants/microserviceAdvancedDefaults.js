import { WEBAPP } from 'constants/websiteTypes'

export const advancedDefaults = {
  webAppDefault: {
    port: '80',
    buildCommand: 'npm install',
    runCommand: 'npm start',
    language: 'node'
  },
  node: {
    port: '80',
    buildCommand: 'npm install',
    runCommand: 'npm run prod'
  },
  dotnet: {
    port: '80',
    buildCommand: 'dotnet restore && dotnet publish -c Release -o ./',
    runCommand: 'dotnet sample/sample.dll'
  },
  java: {
    port: '80',
    buildCommand: 'mvn clean compile assembly:single',
    runCommand: 'java -jar ./target/start-jar-with-dependencies.jar'
  },
  python: {
    port: '80',
    buildCommand: 'pip install -r requirements.txt',
    runCommand: 'flask run --port 80 --host 0.0.0.0'
  },
  ruby: {
    port: '80',
    buildCommand: 'bundle install && bundle package --all',
    runCommand: 'bundle exec ruby app.rb'
  },
  golang: {
    port: '80',
    buildCommand: 'go get -d -v ./... && go install -v ./...',
    runCommand: 'app'
  },
  php: {
    port: '80',
    buildCommand: 'composer install --no-interaction',
    runCommand: 'php -S 0.0.0.0:80'
  },
  elixir: {
    port: '80',
    buildCommand:
      'mix local.hex --force  && mix local.rebar --force && mix deps.get && mix compile',
    runCommand: 'mix run --no-halt'
  },
  noLanguage: {
    port: '',
    buildCommand: '',
    runCommand: ''
  }
}

export const getDefaults = type => {
  // till there is the option to choose language for a website block
  if (type === WEBAPP) {
    return advancedDefaults.webAppDefault
  } else if (type) {
    return advancedDefaults[type]
  } else {
    return
  }
}

export const getVersionBuildConfig = (key, kintoBlock) => {
  if (kintoBlock) {
    return kintoBlock.version && kintoBlock.version.versionBuildConfigData
      ? kintoBlock.version.versionBuildConfigData[key]
      : advancedDefaults[kintoBlock.language][key]
  } else {
    return advancedDefaults['node'][key]
  }
}
