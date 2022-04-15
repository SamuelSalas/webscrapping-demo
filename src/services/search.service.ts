import puppeteer from 'puppeteer';

export class SearchItemService {

  async getSearchItems(name: any): Promise<any> {
    try {
      const browser: puppeteer.Browser = await puppeteer.launch();
      const page: puppeteer.Page = await browser.newPage();
      await page.goto("https://www.amazon.com.mx");
      await page.type("#twotabsearchtextbox", name);
      await page.click("#nav-search-submit-button");
      await page.waitForNavigation();

      const items = await page.$$eval("div.s-card-container", elements => {
        return elements.map(el => {
          const name: string = `${el.querySelector("h5.s-line-clamp-1 > span.a-size-base-plus")?.textContent}`;
          const subTitle: string = `${el.querySelector("h2.a-size-mini > a.a-link-normal")?.textContent}`;
          const link: string = `https://www.amazon.com.mx${el.querySelector("h2.a-size-mini > a.a-link-normal")?.getAttribute("href")}`;
          const isPrime: boolean = !!el.querySelectorAll("i.a-icon-prime").length;
          const price: string = `${el.querySelector("span.a-price > span.a-offscreen")?.textContent}`;

          return {name, subTitle, link, isPrime, price};
        })
      })
      
      return new Promise<any>((resolve, reject) => {
        resolve(items);
      });
    } catch (error) {
    }
  }
}