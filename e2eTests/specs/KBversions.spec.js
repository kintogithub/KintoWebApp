import Login from '../page-objects/login.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import Landing from '../page-objects/landing.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import testData from '../constants/testdata.json'

describe('kb version for Node.js', () => {
  it('Sign-up as new user and link workspace to GitHub', () => {
    Login.registerAndLogin('NB')
    WorkspaceManage.linkGithub()
    Landing.workspaceSelect.waitForVisible()
  })

  it('Create KintoBlock for language Node.js for version 11.7.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Node.js KintoBlock for version 11.7.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Node.js KintoBlock for version 11.7.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Node.js KintoBlock for version 11.7.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language Node.js for version 10.15.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Node.js KintoBlock for version 10.15.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Node.js KintoBlock for version 10.15.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Node.js KintoBlock for versio 10.15.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language Node.js for version 8.15.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs3,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Node.js KintoBlock for version 8.15.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Node.js KintoBlock for version 8.15.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Node.js KintoBlock for versio 8.15.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language Node.js for version 6.16.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs4,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Node.js KintoBlock for version 6.16.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Node.js KintoBlock for version 6.16.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Node.js KintoBlock for versio 6.16.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for java', () => {
  it('Create a KintoBlock for a language Java for 13', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Java KintoBlock for version 13 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Java KintoBlock for version 13 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Java KintoBlock for versio 13 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language Java for version 12', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Java KintoBlock for version 12 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Java KintoBlock for version 12 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Java KintoBlock for versio 12 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for Java language for version 8', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java3,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Java KintoBlock for version 8 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Java KintoBlock for version 8 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Java KintoBlock for versio 8 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for Java language for version 7', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Java KintoBlock for version 7 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Java KintoBlock for version 7 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Java KintoBlock for versio 7 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for python', () => {
  it('Create a KintoBlock for a language python version 3.7.2', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Python KintoBlock for version 3.7.2 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Python KintoBlock for version 3.7.2 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether python KintoBlock for versio 3.7.2 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language python version 3.6.8', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Python KintoBlock for version 3.6.8 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Python KintoBlock for version 3.6.8 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether python KintoBlock for versio 3.6.8 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KIntoBlock for a language for python version 3.5.6', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python3,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Python KintoBlock for version 3.5.6 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Python KintoBlock for version 3.5.6 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether python KintoBlock for versio 3.5.6 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language for python version 3.4.9', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python4,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Python KintoBlock for version 3.4.9 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Python KintoBlock for version 3.4.9 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether python KintoBlock for versio 3.4.9 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a lnguage for python version 2.7.15', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python5,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Python KintoBlock for version 2.7.15 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Python KintoBlock for version 2.7.15 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether python KintoBlock for versio 2.7.15 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for ruby', () => {
  it('Create a KintoBlock for a language ruby version 2.6.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Ruby KintoBlock for version 2.6.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Ruby KintoBlock for version 2.6.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Ruby KintoBlock for versio 2.6.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language ruby version 2.5.3', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Ruby KintoBlock for version 2.5.3 GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Ruby KintoBlock for version 2.5.3 GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Ruby KintoBlock for versio 2.5.3 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language ruby version 2.4.5', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby3,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Ruby KintoBlock for version 2.4.5 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Ruby KintoBlock for version 2.4.5 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Ruby KintoBlock for versio 2.4.5 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language ruby version 2.3.8', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby4,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the Ruby KintoBlock for version 2.3.8 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the Ruby KintoBlock for version 2.3.8 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether Ruby KintoBlock for versio 2.3.8 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for go', () => {
  it('Create a KintoBlock for a language go version 1.11.4', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the go KintoBlock for version 1.11.4 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the go KintoBlock for version 1.11.4 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether go KintoBlock for versio 1.11.4 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KIntoBlock for a language go version 1.10.7', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the go KintoBlock for version 1.10.7 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the go KintoBlock for version 1.10.7 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether go KintoBlock for versio 1.10.7 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for php', () => {
  it('Create a KintoBlock for a language php version 7.3.1-cli', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.PHP,
      testData.kbversion.PHP1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the php KintoBlock for version 7.3.1-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the php KintoBlock for version 7.3.1-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether php KintoBlock for versio 7.3.1-cli with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language php version 7.2.14-cli', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.PHP,
      testData.kbversion.PHP2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the php KintoBlock for version 7.2.14-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the php KintoBlock for version 7.2.14-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether php KintoBlock for versio 7.2.14-cli with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language php version 7.1.26-cli', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.PHP,
      testData.kbversion.PHP3,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the php KintoBlock for version 7.1.26-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the php KintoBlock for version 7.1.26-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether php KintoBlock for versio 7.1.26-cli with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KIntoBlock for a language php version 5.6.40-cli', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.PHP,
      testData.kbversion.PHP4,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the php KintoBlock for version 5.6.40-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the php KintoBlock for version 5.6.40-cli with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether php KintoBlock for versio 5.6.40-cli with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for c#.net', () => {
  it('Create a KintoBlock for a language c#.net version 2.2.103-sdk', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the c#.net KintoBlock for version 2.2.103-sdk with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the c#.net KintoBlock for version 2.2.103-sdk with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether c#.net KintoBlock for version 2.2.103-sdk with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language c#.net version 2.1.503-sdk', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the c#.net KintoBlock for version 2.1.503-sdk with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the c#.net KintoBlock for version 2.1.503-sdk with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether c#.net KintoBlock for version 2.1.503-sdk with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})

describe('kb version for elixir', () => {
  it('Create a KintoBlock for a language elixir version 1.8.0', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the elixir KintoBlock for version 1.8.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the elixir KintoBlock for version 1.8.0 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether elixir KintoBlock for versio 1.8.0 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language elixir version 1.7.4', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir2,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the elixir KintoBlock for version 1.7.4 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the elixir KintoBlock for version 1.7.4 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether elixir KintoBlock for versio 1.7.4 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KintoBlock for a language elixir version 1.6.6', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir3,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the elixir KintoBlock for version 1.6.6 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the elixir KintoBlock for version 1.6.6 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether elixir KintoBlock for versio 1.6.6 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('Create a KIntoBlock for a language elixir version 1.5.3', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir4,
      testData.kbrepo.repository1,
      testData.github.username
    )
  })

  it('should wait for the elixir KintoBlock for version 1.5.3 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the elixir KintoBlock for version 1.5.3 with GitHub repo to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether elixir KintoBlock for versio 1.5.3 with GitHub repo build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })
})
