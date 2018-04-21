/* eslint-env mocha */

const { Builder, By, Key, until } = require("selenium-webdriver")
const chai = require("chai")
var expect = require("chai").expect

describe("FAQ page tests", function() {
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

  it("The page should be FAQ page", function() {
    return driver
      .get("http://localhost:7777/faq")
      .then(_ => driver.getTitle())
      .then(title =>
        expect(title).to.equal("FAQ | Comparethechatbot.com!")
      )
  })
})
