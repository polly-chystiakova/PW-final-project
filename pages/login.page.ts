import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "../fragments/header.fragment";

export class LoginPage {
    page: Page;
    readonly emailLocator: Locator;
    readonly password: Locator;
    readonly submitButton: Locator;
    readonly header: HeaderFragment;

constructor (page: Page) {
    this.page = page;
    this.emailLocator = this.page.getByTestId('email');
    this.password = this.page.getByTestId('password');
    this.submitButton = this.page.getByTestId('login-submit');
    this.header = new HeaderFragment(page);
}

async login(email: string, password: string): Promise<void> {
    await this.emailLocator.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
}
}