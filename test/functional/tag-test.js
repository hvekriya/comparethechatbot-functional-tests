/* eslint-env mocha */

const { Builder, By, Key, until } = require("selenium-webdriver")
const chai = require("chai")
var expect = require("chai").expect

describe("Tag page tests", function() {
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

  it("The page should be tag page", function() {
    return driver
      .get("http://localhost:7777/tags")
      .then(_ => driver.getTitle())
      .then(title =>
        expect(title).to.equal("Tags | Comparethechatbot.com!")
      )
  })

  it("Click a tag to filter accordingly", function() {
    return driver
      .get("http://localhost:7777/tags")
      .then(_ => driver.findElement(By.xpath(".//*[@class='tag__link']")))
      .then(button => button.click())
      .then(_ => driver.findElement(By.className("tag__link")))
      .then(tag => tag.getAttribute("class"))
      .then(className => expect(className).to.equal("tag__link tag__link--active"))
  })
})
