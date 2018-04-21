/* eslint-env mocha */

const { Builder, By, Key, until } = require("selenium-webdriver")
const chai = require("chai")
var expect = require("chai").expect

describe("News page tests", function() {
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

  it("The page should be news page", function() {
    return driver
      .get("http://localhost:7777/news")
      .then(_ => driver.getTitle())
      .then(title =>
        expect(title).to.equal("News | Comparethechatbot.com!")
      )
  })

  it("Click on a new article", function() {
    return driver
      .get("http://localhost:7777/news")
      driver.implicitly_wait(3) // since the articles are loaded via API we need wait
      .then(_ => driver.findElement(By.xpath(".//*[@class='blog-content']/h4/a")))
      .then(button => button.click())
      .then(_ =>
        driver.wait(until.titleContains("Chatbots Magazine"), 1000)
      )
  })

  it("View all articles", function() {
    return driver
      .get("http://localhost:7777/news")
      .then(_ => driver.findElement(By.id("loadBlogPosts")))
      .then(button => button.click())
      .then(_ =>
        driver.wait(until.titleIs("Chatbots Magazine"), 1000)
      )
  })
})
