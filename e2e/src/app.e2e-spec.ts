import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have title', () => {
    page.navigateTo();
    expect(page.getTitle()).toContain('Promise to Pay');
  });

  it('should be blank', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('The world is your oyster.');
  });
});
