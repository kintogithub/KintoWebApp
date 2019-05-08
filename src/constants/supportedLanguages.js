export const languages = [
  {
    label: 'Node.js',
    value: 'node',
    languageName: 'Node.js',
    exampleRepo: 'https://github.com/kintohub/node-examples',
    dockerImageName: 'node'
  },
  {
    label: 'Java',
    value: 'java',
    languageName: 'Java',
    exampleRepo: 'https://github.com/kintohub/java-examples',
    dockerImageName: 'openjdk'
  },
  {
    label: 'Python',
    value: 'python',
    languageName: 'Python',
    exampleRepo: 'https://github.com/kintohub/python-examples',
    dockerImageName: 'python'
  },
  {
    label: 'Ruby',
    value: 'ruby',
    languageName: 'Ruby',
    exampleRepo: 'https://github.com/kintohub/ruby-examples',
    dockerImageName: 'ruby'
  },
  {
    label: 'Go',
    value: 'golang',
    languageName: 'Go',
    exampleRepo: 'https://github.com/kintohub/go-examples',
    dockerImageName: 'golang'
  },
  {
    label: 'PHP',
    value: 'php',
    languageName: 'PHP',
    exampleRepo: 'https://github.com/kintohub/php-examples',
    dockerImageName: 'php'
  },
  {
    label: 'C#.net',
    value: 'dotnet',
    languageName: 'C# 2.1.0',
    exampleRepo: 'https://github.com/kintohub/dotnet21-examples',
    dockerImageName: 'microsoft/dotnet'
  },
  {
    label: 'Elixir',
    value: 'elixir',
    languageName: 'Elixir',
    exampleRepo: 'https://github.com/kintohub/elixir-examples',
    dockerImageName: 'elixir'
  }
]

export const languageVersions = {
  node: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '11.7.0', value: '11.7.0-alpine' },
    { label: '10.15.0', value: '10.15.0-alpine' },
    { label: '8.15.0', value: '8.15.0-alpine' },
    { label: '6.16.0', value: '6.16.0-alpine' }
  ],
  ruby: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '2.6.0', value: '2.6.0-alpine' },
    { label: '2.5.3', value: '2.5.3-alpine' },
    { label: '2.4.5', value: '2.4.5-alpine' },
    { label: '2.3.8', value: '2.3.8-alpine' }
  ],
  python: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '3.7.2', value: '3.7.2-alpine' },
    { label: '3.6.8', value: '3.6.8-alpine' },
    { label: '3.5.6', value: '3.5.6-alpine' },
    { label: '3.4.9', value: '3.4.9-alpine' },
    { label: '2.7.15', value: '2.7.15-alpine' }
  ],
  java: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '13', value: '13-alpine' },
    { label: '12', value: '12-alpine' },
    { label: '8', value: '8-alpine' },
    { label: '7', value: '7-alpine' }
  ],
  golang: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '1.11.4', value: '1.11.4-alpine' },
    { label: '1.10.7', value: '1.10.7-alpine' }
  ],
  php: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '7.3.1-cli', value: '7.3.1-cli-alpine' },
    { label: '7.2.14-cli', value: '7.2.14-cli-alpine' },
    { label: '7.1.26-cli', value: '7.1.26-cli-alpine' },
    { label: '5.6.40-cli', value: '5.6.40-cli-alpine' }
  ],
  dotnet: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '2.2.103-sdk', value: '2.2.103-sdk-alpine' },
    { label: '2.1.503-sdk', value: '2.1.503-sdk-alpine' }
  ],
  elixir: [
    { label: 'no value selected', value: '', isDisabled: true },
    { label: '1.8.0', value: '1.8.0-alpine' },
    { label: '1.7.4', value: '1.7.4-alpine' },
    { label: '1.6.6', value: '1.6.6-alpine' },
    { label: '1.5.3', value: '1.5.3-alpine' }
  ]
}
