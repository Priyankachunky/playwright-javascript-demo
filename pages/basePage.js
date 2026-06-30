export class BasePage {
  constructor(page, baseURL = process.env.BASE_URL || 'https://katalon-demo-cura.herokuapp.com') {
    this.page = page;
    this.baseURL = baseURL;
  }

  async goto(path = '/') {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async click(selector, options = {}) {
    await this.page.click(selector, options);
  }

  async type(selector, text, options = {}) {
    await this.page.fill(selector, text, options);
  }

  async getText(selector) {
    return this.page.locator(selector).textContent();
  }
}
