import { expect } from 'chai'
import KintoBlockList from '../page-objects/kintoBlock.list.page'
import KintoBlockCreate from '../page-objects/kintoBlock.create.page'
import KintoBlockManage from '../page-objects/kintoBlock.manage.page'
import DashboardIndex from '../page-objects/dashboard.index.page'
import WorkspaceCreate from '../page-objects/workspace.create.page'
import WorkspaceManage from '../page-objects/workspace.manage.page'
import Login from '../page-objects/login.page'
import Landing from '../page-objects/landing.page'
import testData from '../constants/testdata.json'

var currentDate = new Date()
var kbName
var newCommitMade
var randomName
var readMeName
var textInGitHub

describe('KB builds - Bitbucket repo', () => {
  //TC_1265
  it('should link workspace with bitbucket', () => {
    Login.registerAndLogin('KBB')
    WorkspaceManage.linkBitbucket()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
  })

  it('should create a Nodejs KB of microservice type for version 11.7.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Nodejs KB of microservice type for version 10.15.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Nodejs KB of microservice type for version 8.15.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs3,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Nodejs KB of microservice type for version 6.16.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs4,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.NodeJsRepo
    )
  })

  it('should create a Java KB of microservice type for version 7 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Java KB of microservice type for version 8 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java3,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Java KB of microservice type for version 12 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Java KB of microservice type for version 13 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.JavaRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.7.2 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.6.8 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.5.6 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python3,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 3.4.9 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python4,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Python KB of microservice type for version 2.7.15 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python5,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.PythonRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.6.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.5.3 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.4.5 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby3,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Ruby KB of microservice type for version 2.3.8 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby4,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.RubyRepo
    )
  })

  it('should create a Go KB of microservice type for version 1.11.4 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.GoRepo
    )
  })

  it('should create a Go KB of microservice type for version 1.10.7 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.GoRepo
    )
  })

  it('should create a Csharp KB of microservice type for version 2.2.103 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.CsharpRepo
    )
  })

  it('should create a Csharp KB of microservice type for version 2.1.503 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.CsharpRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.8.0 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.7.4 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir2,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.6.6 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir3,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.ElixirRepo
    )
  })

  it('should create a Elixir KB of microservice type for version 1.5.3 using existing repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir4,
      'Existing Repositories',
      'Bitbucket',
      testData.bitbucket.organisationName,
      testData.kintoblock.ElixirRepo
    )
  })

  //TC_1267
  it('should create a workspace and link to bitbucket', () => {
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    WorkspaceCreate.open(ws)
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.form.waitForVisible()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.name.input.setValue(testData.workspace.validWorkSpaceName)
    WorkspaceCreate.submitGlobal()
    WorkspaceCreate.loadingFinished.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForExist()
    WorkspaceCreate.workspaceCongratsBtn.waitForVisible()
    WorkspaceCreate.workspaceCongratsBtn.click()
    WorkspaceManage.form.waitForVisible()
    WorkspaceManage.loadingFinished.waitForExist()
    WorkspaceManage.linkBitbucketSecondTime()
    Landing.workspaceSelect.waitForVisible()
  })

  it('should create a Nodejs KB of microservice type for version 11.7.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Nodejs KB of microservice type for version 10.15.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Nodejs KB of microservice type for version 8.15.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs3,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Nodejs KB of microservice type for version 6.16.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs4,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Java KB of microservice type for version 7 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Java KB of microservice type for version 8 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java3,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Java KB of microservice type for version 12 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Java KB of microservice type for version 13 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Java,
      testData.kbversion.Java1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Python KB of microservice type for version 3.7.2 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Python KB of microservice type for version 3.6.8 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Python KB of microservice type for version 3.5.6 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python3,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Python KB of microservice type for version 3.4.9 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python4,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Python KB of microservice type for version 2.7.15 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Python,
      testData.kbversion.Python5,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.6.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.5.3 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.4.5 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby3,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.3.8 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby4,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Go KB of microservice type for version 1.11.4 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Go KB of microservice type for version 1.10.7 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Go,
      testData.kbversion.Go2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Csharp KB of microservice type for version 2.2.103 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Csharp KB of microservice type for version 2.1.503 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.8.0 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.7.4 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir2,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.6.6 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir3,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.5.3 by pre-populating repository', () => {
    KintoBlockCreate.createMicroserviceKB(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir4,
      'Create new repository',
      'bittestcc'
    )
  })

  it('should deploy Microservice KB - NodeJS version 11.7.0', () => {
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(1)
    KintoBlockCreate.BuildRefresh(0)
  })

  // it('should wait for the NodeJs KintoBlock of version 11.7.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 11.7.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 10.15.0', () => {
    KintoBlockCreate.BuildRefresh(1)
  })

  // it('should wait for the NodeJs KintoBlock of version 10.15.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 10.15.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 8.15.0', () => {
    KintoBlockCreate.BuildRefresh(2)
  })

  // it('should wait for the NodeJs KintoBlock of version 8.15.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 8.15.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 6.16.0', () => {
    KintoBlockCreate.BuildRefresh(3)
  })

  // it('should wait for the NodeJs KintoBlock of version 6.16.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 6.16.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 7', () => {
    KintoBlockCreate.BuildRefresh(4)
  })

  // it('should wait for the Java KintoBlock of version 7 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 7 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 8', () => {
    KintoBlockCreate.BuildRefresh(5)
  })

  // it('should wait for the Java KintoBlock of version 8 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 8 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 12', () => {
    KintoBlockCreate.BuildRefresh(6)
  })

  // it('should wait for the Java KintoBlock of version 12 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 12 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 13', () => {
    KintoBlockCreate.BuildRefresh(7)
  })

  // it('should wait for the Java KintoBlock of version 13 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 13 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.7.2', () => {
    KintoBlockCreate.BuildRefresh(8)
  })

  // it('should wait for the Python KintoBlock of version 3.7.2 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.7.2 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.6.8', () => {
    KintoBlockCreate.BuildRefresh(9)
  })

  // it('should wait for the Python KintoBlock of version 3.6.8 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.6.8 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.5.6', () => {
    KintoBlockCreate.BuildRefresh(10)
  })

  // it('should wait for the Python KintoBlock of version 3.5.6 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.5.6 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.4.9', () => {
    KintoBlockCreate.BuildRefresh(11)
  })

  // it('should wait for the Python KintoBlock of version 3.4.9 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.4.9 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 2.7.15', () => {
    KintoBlockCreate.BuildRefresh(12)
  })

  // it('should wait for the Python KintoBlock of version 2.7.15 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 2.7.15 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.6.0', () => {
    KintoBlockCreate.BuildRefresh(13)
  })

  // it('should wait for the Ruby KintoBlock of version 2.6.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.6.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.5.3', () => {
    KintoBlockCreate.BuildRefresh(14)
  })

  // it('should wait for the Ruby KintoBlock of version 2.5.3 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.5.3 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.4.5', () => {
    KintoBlockCreate.BuildRefresh(15)
  })

  // it('should wait for the Ruby KintoBlock of version 2.4.5 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.4.5 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.3.8', () => {
    KintoBlockCreate.BuildRefresh(16)
  })

  // it('should wait for the Ruby KintoBlock of version 2.3.8 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Ruby KintoBlock for versio 2.3.8 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.11.4', () => {
    KintoBlockCreate.BuildRefresh(17)
  })

  // it('should wait for the Go KintoBlock of version 1.11.4 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Go KintoBlock for versio 1.11.4 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.10.7', () => {
    KintoBlockCreate.BuildRefresh(18)
  })

  // it('should wait for the Go KintoBlock of version 1.10.7 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Go KintoBlock for versio 1.10.7 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.2.103', () => {
    KintoBlockCreate.BuildRefresh(19)
  })

  // it('should wait for the Csharp KintoBlock of version 2.2.103 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Csharp KintoBlock for versio 2.2.103 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.1.503', () => {
    KintoBlockCreate.BuildRefresh(20)
  })

  // it('should wait for the Csharp KintoBlock of version 2.1.503 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Csharp KintoBlock for versio 2.1.503 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.8.0', () => {
    KintoBlockCreate.BuildRefresh(21)
  })

  // it('should wait for the Elixir KintoBlock of version 1.8.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.8.0 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.7.4', () => {
    KintoBlockCreate.BuildRefresh(22)
  })

  // it('should wait for the Elixir KintoBlock of version 1.7.4 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.7.4 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.6.6', () => {
    KintoBlockCreate.BuildRefresh(23)
  })

  // it('should wait for the Elixir KintoBlock of version 1.6.6 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.6.6 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.5.3', () => {
    KintoBlockCreate.BuildRefresh(24)
  })

  // it('should wait for the Elixir KintoBlock of version 1.5.3 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.5.3 is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 11.7.0', () => {
    Landing.workspaceSelect.waitForVisible()
    DashboardIndex.workspaceDropdown.selectByIndex(2)
    KintoBlockCreate.BuildRefresh(0)
  })

  // it('should wait for the NodeJs KintoBlock of version 11.7.0 to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 11.7.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 10.15.0', () => {
    KintoBlockCreate.BuildRefresh(1)
  })

  // it('should wait for the NodeJs KintoBlock of version 10.15.0 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 10.15.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 8.15.0', () => {
    KintoBlockCreate.BuildRefresh(2)
  })

  // it('should wait for the NodeJs KintoBlock of version 8.15.0 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 8.15.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - NodeJS version 6.16.0', () => {
    KintoBlockCreate.BuildRefresh(3)
  })

  // it('should wait for the NodeJs KintoBlock of version 6.16.0 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify NodeJs KintoBlock of version 6.16.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 7', () => {
    KintoBlockCreate.BuildRefresh(4)
  })

  // it('should wait for the Java KintoBlock of version 7 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 7 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 8', () => {
    KintoBlockCreate.BuildRefresh(5)
  })

  // it('should wait for the Java KintoBlock of version 8 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 8 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 12', () => {
    KintoBlockCreate.BuildRefresh(6)
  })

  // it('should wait for the Java KintoBlock of version 12 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 12 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Java version 13', () => {
    KintoBlockCreate.BuildRefresh(7)
  })

  // it('should wait for the Java KintoBlock of version 13 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Java KintoBlock of version 13 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.7.2', () => {
    KintoBlockCreate.BuildRefresh(8)
  })

  // it('should wait for the Python KintoBlock of version 3.7.2 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.7.2 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.6.8', () => {
    KintoBlockCreate.BuildRefresh(9)
  })

  // it('should wait for the Python KintoBlock of version 3.6.8 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.6.8 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.5.6', () => {
    KintoBlockCreate.BuildRefresh(10)
  })

  // it('should wait for the Python KintoBlock of version 3.5.6 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.5.6 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 3.4.9', () => {
    KintoBlockCreate.BuildRefresh(11)
  })

  // it('should wait for the Python KintoBlock of version 3.4.9 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 3.4.9 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Python version 2.7.15', () => {
    KintoBlockCreate.BuildRefresh(12)
  })

  // it('should wait for the Python KintoBlock of version 2.7.15 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Python KintoBlock of version 2.7.15 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.6.0', () => {
    KintoBlockCreate.BuildRefresh(13)
  })

  // it('should wait for the Ruby KintoBlock of version 2.6.0 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.6.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.5.3', () => {
    KintoBlockCreate.BuildRefresh(14)
  })

  // it('should wait for the Ruby KintoBlock of version 2.5.3 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.5.3 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.4.5', () => {
    KintoBlockCreate.BuildRefresh(15)
  })

  // it('should wait for the Ruby KintoBlock of version 2.4.5 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should verify Ruby KintoBlock of version 2.4.5 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Ruby version 2.3.8', () => {
    KintoBlockCreate.BuildRefresh(16)
  })

  // it('should wait for the Ruby KintoBlock of version 2.3.8 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Ruby KintoBlock for versio 2.3.8 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.11.4', () => {
    KintoBlockCreate.BuildRefresh(17)
  })

  // it('should wait for the Go KintoBlock of version 1.11.4 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Go KintoBlock for versio 1.11.4 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Go version 1.10.7', () => {
    KintoBlockCreate.BuildRefresh(18)
  })

  // it('should wait for the Go KintoBlock of version 1.10.7 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Go KintoBlock for versio 1.10.7 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.2.103', () => {
    KintoBlockCreate.BuildRefresh(19)
  })

  // it('should wait for the Csharp KintoBlock of version 2.2.103 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Csharp KintoBlock for versio 2.2.103 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Csharp version 2.1.503', () => {
    KintoBlockCreate.BuildRefresh(20)
  })

  // it('should wait for the Csharp KintoBlock of version 2.1.503 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Csharp KintoBlock for versio 2.1.503 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.8.0', () => {
    KintoBlockCreate.BuildRefresh(21)
  })

  // it('should wait for the Elixir KintoBlock of version 1.8.0 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.8.0 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.7.4', () => {
    KintoBlockCreate.BuildRefresh(22)
  })

  // it('should wait for the Elixir KintoBlock of version 1.7.4 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.7.4 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.6.6', () => {
    KintoBlockCreate.BuildRefresh(23)
  })

  // it('should wait for the Elixir KintoBlock of version 1.6.6 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.6.6 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should deploy Microservice KB - Elixir version 1.5.3', () => {
    KintoBlockCreate.BuildRefresh(24)
  })

  // it('should wait for the Elixir KintoBlock of version 1.5.3 with pre-populated repo to move to Running', () => {
  //   browser.pause(100000)
  // })

  it('should check whether Elixir KintoBlock for versio 1.5.3 with pre-populated repo is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should logout from KB - builds of bitbucket repos', () => {
    KintoBlockManage.logout()
  })

  it('should register and link ws to bitbucket', () => {
    Login.registerAndLogin('KBB2')
    WorkspaceManage.linkBitbucketSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
  })

  //TC_1269
  it('should create a website KB with existing repository in bitbucket organisation', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.websiteTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var kbName =
      testData.kintoblock.validKintoBlockNameWithDigit + randomName + '1i9'
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescriptionWithChar
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('Bitbucket').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('Bitbucket').click()
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validDynamicWebAppRepo
    )
    KintoBlockCreate.getExistingRepoList(
      testData.bitbucket.organisationName,
      testData.kintoblock.validDynamicWebAppRepo
    ).waitForVisible()
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.deploySuccessBtn()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 300)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  //TC_1270
  it('should verify website KB build with existing repository in bitbucket organisation is moved to processing', () => {
    browser.pause(100000)
  })

  it('should verify website KB build with existing repository in bitbucket organisation is moved to processing', () => {
    browser.pause(100000)
  })

  it('should verify website KB build with existing repository in bitbucket organisation is moved to processing', () => {
    browser.pause(100000)
  })

  it('should verify website KB build with existing repository in bitbucket organisation is moved to success', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_1271
  it('should create kintoblock of type website with new repository type', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.websiteTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    var kbName = testData.kintoblock.validKintoBlockName + 'p0d' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('bittestcc').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('bittestcc').click()
    var reponame =
      testData.kintoblock.validRepoNameWithChar + '1' + currentDate.getTime()
    KintoBlockCreate.repository.input.setValue(reponame)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  //TC_1272
  it('should generate build for Website KB created using new repository type', () => {
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.scroll(0, 300)
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the Website KB created using new repository type to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should verify website KB build with existing repository in bitbucket organisation is moved to processing', () => {
    browser.pause(100000)
  })

  it('should verify website KB build with existing repository in bitbucket organisation is moved to processing', () => {
    browser.pause(100000)
  })

  it('should check whether Website KB created using new repository type is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  it('should logout from KB website creation account', () => {
    KintoBlockManage.logout()
  })

  it('should login and link to bitbucket and github for creating KB without pre-populating', () => {
    Login.registerAndLogin('PREPOP')
    WorkspaceManage.linkBitbucketSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
  })

  it('should create a Nodejs KB of microservice type for version 11.7.0 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs1,
      'Bitbucket'
    )
  })

  it('should create a Nodejs KB of microservice type for version 10.15.0 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs2,
      'Bitbucket'
    )
  })

  it('should create a Nodejs KB of microservice type for version 8.15.0 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs3,
      'Bitbucket'
    )
  })

  it('should create a Nodejs KB of microservice type for version 6.16.0 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.NodeJs,
      testData.kbversion.Nodejs4,
      'Bitbucket'
    )
  })

  it('should create a Java KB of microservice type for version 13 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Java,
      testData.kbversion.Java1,
      'Bitbucket'
    )
  })

  it('should create a Java KB of microservice type for version 12 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Java,
      testData.kbversion.Java2,
      'Bitbucket'
    )
  })

  it('should create a Java KB of microservice type for version 8 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Java,
      testData.kbversion.Java3,
      'Bitbucket'
    )
  })

  it('should create a Java KB of microservice type for version 7 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Java,
      testData.kbversion.Java4,
      'Bitbucket'
    )
  })

  it('should create a Python KB of microservice type for version 3.7.2 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Python,
      testData.kbversion.Python1,
      'Bitbucket'
    )
  })

  it('should create a Python KB of microservice type for version 3.6.8 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Python,
      testData.kbversion.Python2,
      'Bitbucket'
    )
  })

  it('should create a Python KB of microservice type for version 3.5.6 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Python,
      testData.kbversion.Python3,
      'Bitbucket'
    )
  })

  it('should create a Python KB of microservice type for version 3.4.9 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Python,
      testData.kbversion.Python4,
      'Bitbucket'
    )
  })

  it('should create a Python KB of microservice type for version 2.7.15 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Python,
      testData.kbversion.Python5,
      'Bitbucket'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.6.0 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby1,
      'Bitbucket'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.5.3 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby2,
      'Bitbucket'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.4.5 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby3,
      'Bitbucket'
    )
  })

  it('should create a Ruby KB of microservice type for version 2.3.8 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Ruby,
      testData.kbversion.Ruby4,
      'Bitbucket'
    )
  })

  it('should create a Go KB of microservice type for version 1.11.4 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Go,
      testData.kbversion.Go1,
      'Bitbucket'
    )
  })

  it('should create a Go KB of microservice type for version 1.10.7 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Go,
      testData.kbversion.Go2,
      'Bitbucket'
    )
  })

  it('should create a Csharp KB of microservice type for version 2.2.103 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet1,
      'Bitbucket'
    )
  })

  it('should create a Csharp KB of microservice type for version 2.1.503 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Csharp,
      testData.kbversion.Csharpnet2,
      'Bitbucket'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.8.0 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir1,
      'Bitbucket'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.7.4 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir2,
      'Bitbucket'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.6.6 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir3,
      'Bitbucket'
    )
  })

  it('should create a Elixir KB of microservice type for version 1.5.3 without pre-populating repository', () => {
    KintoBlockCreate.createKBWithoutPrePopRepoResource(
      testData.kblanguage.Elixir,
      testData.kbversion.Elixir4,
      'Bitbucket'
    )
  })

  it('should logout from account creating KB with new repo of bitbucket', () => {
    KintoBlockManage.logout()
  })

  it('should login and link to bitbucket and github', () => {
    Login.registerAndLogin('KBB3')
    WorkspaceManage.linkGithub()
    WorkspaceManage.linkBitbucketSecondTime()
    Landing.workspaceSelect.waitForExist()
    Landing.workspaceSelect.waitForVisible()
  })

  //TC_1273
  it('should display organisation name as per it is selected in the organisation field of microservice KB create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    //Selecting GitHub repository source
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').click()
    browser.pause(2000)
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql('GittestCC')
    //Selecting Bitbucket repository source
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('bittestcc').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('bittestcc').click()
    browser.pause(2000)
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql('Bittestcc')
  })

  //TC_1274
  it('should display organisation name as per it is selected in the organisation field of website KB create page', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.websiteTypeOpen(ws)
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.websiteTypeIcon.waitForVisible()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Create new repository'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Create new repository').click()
    //Selecting GitHub repository
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GittestCC').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GittestCC').click()
    browser.pause(2000)
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql('GittestCC')
    //Selecting Bitbucket repository
    KintoBlockCreate.organisationDropDown.click()
    KintoBlockCreate.getOrganisationOptions('bittestcc').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('bittestcc').click()
    browser.pause(2000)
    expect(KintoBlockCreate.orgNameFromOrgField.getText()).to.eql('Bittestcc')
  })

  //TC_1275
  it('should check whether "LATEST BUILT" is updated as per new commit for KB of type microservice and other branches are not affected of new commit - 1', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.microserviceTypeOpen(ws)
    browser.alertAccept()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + 'dod' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.languageDropDown.click()
    KintoBlockCreate.getLanguageOptions(
      testData.kblanguage.NodeJs
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getLanguageOptions(testData.kblanguage.NodeJs).click()
    expect(KintoBlockCreate.selectedLanguage.getText()).to.eql(
      testData.kblanguage.NodeJs
    )
    KintoBlockCreate.versionDropDown.click()
    KintoBlockCreate.getVersionOptions('11.7.0').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getVersionOptions('11.7.0').click()
    expect(KintoBlockCreate.selectedVersion.getText()).to.eql('11.7.0')
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GitHub').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GitHub').click()
    browser.pause(2000)
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validRepoWithConsoleLogs
    )
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validRepoWithConsoleLogs
    ).waitForVisible()
    browser.keys('Tab')
    KintoBlockCreate.loadingFinished.waitForExist()
    browser.pause(2000)
    browser.scroll(0, 2000)
    KintoBlockCreate.docFormat.click()
    KintoBlockManage.getDocFormatOptions('ApiDoc').waitForVisible()
    browser.pause(2000)
    KintoBlockManage.getDocFormatOptions('ApiDoc').click()
    browser.pause(2000)
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.amazingBtn.waitForExist()
    KintoBlockManage.amazingBtn.waitForVisible()
    KintoBlockManage.amazingBtn.click()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should enable Auto Build switch and generate build in second branch of the Microservice KintoBlock', () => {
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue(
      'secondbranch'
    )
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getBuildCurrentStatus(1).waitForVisible()
    browser.scroll(0, 800)
    KintoBlockManage.autoBuildSwitch.click()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KB of type microservice to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KB of type microservice to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KB of type microservice build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_1275
  it('should do a commit in the "second branch" for KB of type microservice', () => {
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 600)
    KintoBlockManage.openRepoBtn.leftClick()
    var tabIds = browser.getTabIds()
    //Change to id according to the new scripts
    browser.switchTab(tabIds[1])
    browser.pause(3000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).waitForVisible()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).click()
    browser.pause(5000)
    KintoBlockManage.readMeEdit.waitForVisible()
    KintoBlockManage.readMeEdit.click()
    browser.pause(3000)
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.updateReadMeName.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    readMeName = testData.kintoblock.validReadMeName + randomName + 'o9d'
    KintoBlockManage.updateReadMeName.setValue(readMeName)
    textInGitHub = KintoBlockManage.commitChangesUpdateField.getAttribute(
      'placeholder'
    )
    KintoBlockManage.commitChangesBtn.click()
    browser.pause(5000)
    browser.switchTab(tabIds[0])
    browser.pause(5000)
  })

  //TC_1275
  it('should switch to "second branch" in KB manage page and generate new build for the commit for KB of type microservice', () => {
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue(
      'secondbranch'
    )
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - secondbranch')
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.pause(5000)
    KintoBlockManage.previousCommit.waitForVisible()
  })

  it('should wait for the KB of type microservice to move to PROCESSING for new commit', () => {
    browser.pause(100000)
  })

  it('should wait for the KB of type microservice to move to PROCESSING for new commit', () => {
    browser.pause(100000)
  })

  it('should check whether KB of type microservice build is moved to success or failed for new commit', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_1275
  it('should check whether "LATEST BUILT" is updated as per new commit for KB of type microservice and other branches are not affected of new commit - 2', () => {
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.not.eql(
      KintoBlockManage.getRecentCommitText(2).getText()
    )
    browser.scroll(0, 400)
    //KintoBlockManage.getBuildTextInRecentCommits(1).click()
    expect(KintoBlockManage.commitText.getText()).to.eql(textInGitHub)
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.eql(
      KintoBlockManage.getRecentCommitText(1).getText()
    )
    newCommitMade = KintoBlockManage.getRecentCommitText(1).getText()
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - master')
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.not.eql(
      newCommitMade
    )
  })

  //TC_1276
  it('should check whether "LATEST BUILT" is updated as per new commit for KB of type website and other branches are not affected of new commit - 1', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockCreate.websiteTypeOpen(ws)
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.form.waitForVisible()
    KintoBlockCreate.loadingFinished.waitForExist()
    randomName = KintoBlockCreate.randomName()
    kbName = testData.kintoblock.validKintoBlockName + '0s8' + randomName
    KintoBlockCreate.name.input.setValue(kbName)
    KintoBlockCreate.kbDisplayName.setValue(kbName)
    KintoBlockCreate.shortDescription.input.setValue(
      testData.kintoblock.validKBDescription
    )
    browser.scroll(0, 400)
    KintoBlockCreate.WebsiteTypeDropDown.click()
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getWebsiteTypeOptions('Dynamic Web App').click()
    browser.scroll(0, 1000)
    KintoBlockCreate.repoDropDown.click()
    KintoBlockCreate.getRepoTypeOptions(
      'Existing Repositories'
    ).waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getRepoTypeOptions('Existing Repositories').click()
    KintoBlockCreate.repoResourceDropDown.click()
    KintoBlockCreate.getOrganisationOptions('GitHub').waitForVisible()
    browser.pause(2000)
    KintoBlockCreate.getOrganisationOptions('GitHub').click()
    browser.pause(2000)
    KintoBlockCreate.existingRepo.waitForVisible()
    KintoBlockCreate.existingRepo.scroll()
    KintoBlockCreate.existingRepo.setValue(
      testData.kintoblock.validHelloWorldExampleRepoForWebSite
    )
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validHelloWorldExampleRepoForWebSite
    ).waitForVisible()
    KintoBlockCreate.getExistingRepoList(
      testData.github.username,
      testData.kintoblock.validHelloWorldExampleRepoForWebSite
    ).click()
    KintoBlockCreate.loadingFinished.waitForExist()
    KintoBlockCreate.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should enable Auto Build switch and generate build in second branch of the Website KintoBlock', () => {
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue(
      'newBranch'
    )
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.getBuildCurrentStatus(1).waitForVisible()
    browser.scroll(0, 800)
    KintoBlockManage.autoBuildSwitch.click()
    KintoBlockManage.submitGlobal()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
  })

  it('should wait for the KB of type website to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should wait for the KB of type website to move to PROCESSING ', () => {
    browser.pause(100000)
  })

  it('should check whether KB of type website build is moved to success or failed', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_1276
  it('should do a commit in the "second branch" for KB of type website', () => {
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.openRepoBtn.scroll(0, 500)
    KintoBlockManage.openRepoBtn.click()
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[2])
    browser.pause(3000)
    KintoBlockManage.branchsDropDownInGitHub.waitForVisible()
    KintoBlockManage.branchsDropDownInGitHub.leftClick()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).waitForVisible()
    KintoBlockManage.getBranchNameFromGitHubBranchList(2).click()
    browser.pause(5000)
    KintoBlockManage.readMeEditForHelloWorldExample.waitForVisible()
    KintoBlockManage.readMeEditForHelloWorldExample.click()
    browser.pause(3000)
    KintoBlockManage.editIconInGitHub.waitForVisible()
    KintoBlockManage.editIconInGitHub.leftClick()
    browser.pause(2000)
    expect(KintoBlockManage.editIconInGitHub.isVisible()).to.eql(false)
    KintoBlockManage.updateReadMeName.waitForVisible()
    randomName = KintoBlockCreate.randomName()
    readMeName = testData.kintoblock.validReadMeName + randomName + 's74'
    KintoBlockManage.updateReadMeName.setValue(readMeName)
    textInGitHub = KintoBlockManage.commitChangesUpdateField.getAttribute(
      'placeholder'
    )
    KintoBlockManage.commitChangesBtn.click()
    browser.pause(5000)
  })

  //TC_1276
  it('should switch to "second branch" in KB manage page and generate new build for the commit for KB of type website', () => {
    var tabIds = browser.getTabIds()
    browser.switchTab(tabIds[0])
    browser.pause(5000)
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue(
      'newBranch'
    )
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - newBranch')
    browser.scroll(0, -1000)
    KintoBlockManage.refreshCommitBtn.waitForVisible()
    KintoBlockManage.refreshCommitBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.pause(5000)
    KintoBlockManage.previousCommit.waitForVisible()
  })

  it('should wait for the KB of type website to move to PROCESSING for new commit', () => {
    browser.pause(100000)
  })

  it('should wait for the KB of type website to move to PROCESSING for new commit', () => {
    browser.pause(100000)
  })

  it('should check whether KB of type website build is moved to success or failed for new commit', () => {
    KintoBlockManage.checkForBuildSuccess(1)
  })

  //TC_1276
  it('should check whether "LATEST BUILT" is updated as per new commit for KB of type website and other branches are not affected of new commit - 2', () => {
    browser.scroll(0, 300)
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.not.eql(
      KintoBlockManage.getRecentCommitText(2).getText()
    )
    browser.scroll(0, 400)
    //KintoBlockManage.getBuildTextInRecentCommits(1).click()
    expect(KintoBlockManage.commitText.getText()).to.eql(textInGitHub)
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.eql(
      KintoBlockManage.getRecentCommitText(1).getText()
    )
    newCommitMade = KintoBlockManage.getRecentCommitText(1).getText()
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue('master')
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    expect(KintoBlockManage.title.getText()).to.eql(kbName + ' - master')
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.not.eql(
      newCommitMade
    )
  })

  //TC_1277
  it('should verify whether updated build is displayed as per new commit where ever it`s displayed', () => {
    var ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getCard(0).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    browser.scroll(0, -2000)
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTab('branch').leftClick()
    KintoBlockManage.searchFilterInBranchTagSwitcherDropDown.setValue(
      'secondbranch'
    )
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).waitForVisible()
    KintoBlockManage.getBranchNameFromBranchTagSwitcher(1).leftClick()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    var newCommit = KintoBlockManage.getRecentCommitText(1).getText()
    //LATEST SUCCESSFUL BUILT
    expect(KintoBlockManage.latestCommitText.getText().slice(0, 5)).to.eql(
      newCommit
    )
    //Branch tag switcher in KB manage page
    expect(
      KintoBlockManage.getCommitCodeFromTag(1)
        .getText()
        .slice(7, 12)
    ).to.eql(newCommit)
    //Branch tag switcher in KB tagged page
    KintoBlockManage.getTagThisBuildBtn(1).scroll(0, 500)
    KintoBlockManage.getTagThisBuildBtn(1).click()
    KintoBlockManage.tagLatestCommitPopUp.waitForVisible()
    KintoBlockManage.majorVersion.setValue('1')
    KintoBlockManage.minorVersion.setValue('2')
    KintoBlockManage.revision.setValue('3')
    KintoBlockManage.notes.setValue(testData.kintoblock.validNotes)
    KintoBlockManage.createTagBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getCommitCodeFromTag(1).waitForVisible()
    expect(
      KintoBlockManage.getCommitCodeFromTag(1)
        .getText()
        .slice(7, 12)
    ).to.include(newCommit)
    //KB list card drop down
    ws = Landing.workspaceSelect.getAttribute('data-test')
    KintoBlockList.open(ws)
    KintoBlockList.loadingFinished.waitForExist()
    KintoBlockList.getCard(0).waitForVisible()
    KintoBlockList.getkbListDropDown(0).click()
    KintoBlockList.kbListDropDown.waitForVisible()
    KintoBlockList.getViewAllBranchesAndTagsOption(0).click()
    KintoBlockList.getViewAllBranchesAndTagSearchBar(0).waitForVisible()
    KintoBlockList.getTagsListFromKbDropDown(0).click()
    KintoBlockList.getTagFromTagsList(0, 1).waitForVisible()
    expect(
      KintoBlockList.getCommitCodeFromKBDropDown(0, 1)
        .getText()
        .slice(7, 12)
    ).to.include(newCommit)
    //Documentation page
    KintoBlockList.getCommitCodeFromKBDropDown(0, 1).click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.form.waitForVisible()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.viewEndpointsBtn.waitForVisible()
    KintoBlockManage.viewEndpointsBtn.click()
    KintoBlockManage.loadingFinished.waitForExist()
    KintoBlockManage.branchTagDropDown.leftClick()
    KintoBlockManage.branchAndTagSwitcherDropDown.waitForVisible()
    KintoBlockManage.getTagFromBranchTagSwitcher(1).waitForVisible()
    expect(
      KintoBlockManage.getCommitCodeFromTag(1)
        .getText()
        .slice(7, 12)
    ).to.include(newCommit)
  })
})
