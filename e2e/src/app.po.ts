import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.deepCss('app-root ion-title')).getText();
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
