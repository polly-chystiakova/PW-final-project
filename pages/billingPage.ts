import { expect, Locator, Page } from '@playwright/test';

export class BillingPage {
  readonly page: Page;

  readonly proceedToOrderSummaryButton: Locator;
  readonly proceedToBillingButton: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly postalCodeInput: Locator;
  readonly proceedToPaymentButton: Locator;

  readonly paymentMethodSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly CVVInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.proceedToOrderSummaryButton = page.getByTestId('proceed-1');
    this.proceedToBillingButton = page.getByTestId('proceed-2');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.countryInput = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.proceedToPaymentButton = page.getByTestId('proceed-3');

    this.paymentMethodSelect = page.getByTestId('payment-method');
    this.cardNumberInput = page.getByTestId('credit_card_number');
    this.CVVInput = page.getByTestId('cvv');
    this.expirationDateInput = page.getByTestId('expiration_date');
    this.cardHolderNameInput = page.getByTestId('card_holder_name');
    this.finishButton = page.getByTestId('finish');
    this.successMessage = page.getByTestId('payment-success-message');
  }

  async proceedToBilling(): Promise<void> {
    await this.proceedToOrderSummaryButton.click();
    await expect(this.page.locator('.login-form-1 p')).toHaveText(/you are already logged in/i);
    await this.proceedToBillingButton.click();
    await expect(this.streetInput).toBeVisible();
  }

  async fillBillingDetails({
    street,
    city,
    state,
    country,
    postalCode,
  }: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }): Promise<void> {
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countryInput.fill(country);
    await this.postalCodeInput.fill(postalCode);
    await this.proceedToPaymentButton.click();
  }

  async fillPaymentDetails({
    cardNumber,
    CVVInput,
    expirationDate,
    cardHolderName,
  }: {
    method: string;
    cardNumber: string;
    CVVInput: string;
    expirationDate: string;
    cardHolderName: string;
  }): Promise<void> {
    await this.paymentMethodSelect.selectOption('credit-card');
    await this.CVVInput.fill(CVVInput);
    await this.cardNumberInput.fill(cardNumber);
    await this.expirationDateInput.fill(expirationDate);
    await this.cardHolderNameInput.fill(cardHolderName);
  }

  async finishPayment(): Promise<void> {
    await this.finishButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}