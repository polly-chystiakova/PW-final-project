import { Locator, Page } from "@playwright/test";

export class HeaderFragment {
    readonly page: Page;
    readonly navHome: Locator;
    readonly navCategories: Locator;
    readonly navContact: Locator;    
    readonly navSignIn: Locator;
    readonly languageSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navHome = this.page.getByTestId('nav-home');
        this.navCategories = this.page.getByTestId('nav-categories');
        this.navContact = this.page.getByTestId('nav-contact');
        this.navSignIn = this.page.getByTestId('nav-sign-in');
        this.languageSelect = this.page.getByTestId('language-select');
    }

    async clickHome() {
        await this.navHome.click();
    }

    async clickCategories() {
        await this.navCategories.click();
    }

    async clickContact() {
        await this.navContact.click();
    }

    async clickSignIn() {
        await this.navSignIn.click();
    }

    async selectLanguage(languageCode: string) {
        await this.languageSelect.selectOption(languageCode);
    }
}
