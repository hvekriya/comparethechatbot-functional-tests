/* eslint-env mocha */

const { Builder, By, Key, until } = require("selenium-webdriver")
const chai = require("chai")
var expect = require("chai").expect

describe("Home page tests", function() {
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

  it("The page should be home page", function() {
    return driver
      .get("http://localhost:7777")
      .then(_ => driver.getTitle())
      .then(title =>
        expect(title).to.equal("Chatbots | Comparethechatbot.com!")
      )
  })
  it("Go to a specifc chatbot page", function() {
    return driver
      .get("http://localhost:7777")
      .then(_ => driver.findElement(By.linkText("Alexa")))
      .then(chatbotBtn => chatbotBtn.click())
      .then(_ =>
        driver.wait(until.titleIs("Alexa | Comparethechatbot.com!"), 1000)
      )
  })
  it("Add a chatbot to compare", function() {
    return driver
      .get("http://localhost:7777")
      .then(_ => driver.findElement(By.id("addToCompare")))
      .then(addToCompareBtn => addToCompareBtn.click())
      .then(_ =>
            driver.wait(until.titleIs("Chatbots | Comparethechatbot.com!"), 1000)
          )
      .then(_ => driver.findElement(By.className("flash__text")))
      .then(flash => flash.getText())
      .then(message => expect(message).to.contain("Successfully added")
      )
  })
})
