/* eslint-env mocha */

const { Builder, By, Key, until } = require("selenium-webdriver")
const chai = require("chai")
var expect = require("chai").expect

describe("Logout tests", function() {
  this.timeout(50000)
  let driver

  before(function() {
    return new Builder()
      .forBrowser("chrome")
      .build()
      .then(d => {
        driver = d
      })
  })
  after(function() {
    return driver.quit()
  })

  it("Logout", function() {
    return driver
      .get("http://localhost:7777/login")
      .then(_ => driver.findElement(By.name("email")))
      .then(email => email.sendKeys("test@test.com"))
      .then(_ => driver.findElement(By.name("password")))
      .then(password => password.sendKeys("test"))
      .then(_ => driver.findElement(By.className("button")))
      .then(button => button.click())
      .then(_ =>
        driver.wait(until.titleIs("Chatbots | Comparethechatbot.com!"), 1000)
      )
      .then(_ => driver.findElement(By.className("logout")))
      .then(logout => logout.click())
      .then(_ =>
        driver.wait(until.titleIs("Chatbots | Comparethechatbot.com!"), 1000)
      )
      .then(_ => driver.findElement(By.className("flash__text")))
      .then(flash => flash.getText())
      .then(message => expect(message).to.contain("You are now logged out! 👋"))
  })
})
