import { Page } from '@playwright/test';

export class EnquiryFormPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators as getters
  private get firstNameInput() {
    return this.page.locator('input[name="firstName"]');
  }

  private get lastNameInput() {
    return this.page.locator('input[name="lastName"]');
  }

  private get organisationInput() {
    return this.page.locator('input[name="organisation"]');
  }

  private get emailInput() {
    return this.page.locator('input[name="email"]');
  }

  private get queryInput() {
    return this.page.locator('input[name="query"]');
  }

  private get messageTextarea() {
    return this.page.locator('textarea[name="message"]');
  }

  private get termsOfServiceLink() {
    return this.page.getByRole('link', { name: 'Terms of Service' });
  }

  private get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  private get successMessage() {
    return this.page.getByText('Thank you for your message!');
  }

  // Methods

  // Scroll to the middle of the page
  async scrollToMiddle() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
  }

  // Scroll to the bottom of the page
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async navigateToGlobalPrivacyPolicy() {
    await this.page.getByRole('link', { name: 'Global Privacy Policy' }).click();
  }
  
  async verifyPrivacyPolicyContent() {
    await this.page.getByRole('heading', { name: 'Privacy Policy' }).isVisible();
    await this.page.getByRole('heading', { name: 'Introduction' }).isVisible();
    await this.page.getByText('Welcome to [Your Event Space').isVisible();
    await this.page.getByRole('heading', { name: 'Information We Collect' }).isVisible();
    await this.page.getByRole('heading', { name: 'Non-Personal Information' }).isVisible();
  }
  
  async navigateBackToContactPage() {
    await this.page.goto('https://proj-shophouse-dev.as.r.appspot.com/contact');
  }

  
  async fillFirstName(firstName: string) {
    await this.scrollToMiddle(); // Scroll before interacting with the field
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
  }

  async fillOrganisation(organisation: string) {
    await this.organisationInput.click();
    await this.organisationInput.fill(organisation);
  }

  async fillEmail(email: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async fillQuery(query: string) {
    await this.queryInput.click();
    await this.queryInput.fill(query);
  }

  async fillMessage(message: string) {
    await this.messageTextarea.click();
    await this.messageTextarea.fill(message);
    await this.scrollToBottom(); // Scroll to the bottom after filling the message
  }

  async acceptTermsOfService() {
    await this.termsOfServiceLink.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await this.successMessage.isVisible();
  }
}