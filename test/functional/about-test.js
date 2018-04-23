/* eslint-env mocha */

const { Builder, By, Key, until } = require("selenium-webdriver")
const chai = require("chai")
var expect = require("chai").expect

describe("About page tests", function() {
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

  it("The page should be about page", function() {
    return driver
      .get("http://localhost:7777/about")
      .then(_ => driver.getTitle())
      .then(title =>
        expect(title).to.equal("About | Comparethechatbot.com!")
      )
  })
})
