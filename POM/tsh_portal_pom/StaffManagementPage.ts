import { Page, Browser } from '@playwright/test';

export class StaffManagementPage {
  private page: Page;
  private browser: Browser;

  constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  async login(email: string, password: string) {
    console.log('Logging in...');
    await this.page.goto('https://cms-dot-proj-shophouse-dev.as.r.appspot.com/admin/auth/login');
  
    // Maximize the browser window
    const screenSize = await this.page.evaluate(() => ({
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    }));
    await this.page.setViewportSize(screenSize);
  
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('checkbox', { name: 'Remember me' }).click();
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async navigateToUsers() {
    console.log('Navigating to Users...');
    await this.page.getByRole('link', { name: 'Settings' }).click();
    await this.page.getByRole('link', { name: 'Users' }).click();
  }

  async inviteNewUser(firstName: string, lastName: string, email: string, role: string) {
    console.log('Inviting a new user...');
    await this.page.getByRole('button', { name: 'Invite new user' }).click();
    await this.page.getByRole('textbox', { name: 'First name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  
    await this.page.locator('span').filter({ hasText: 'Select' }).nth(2).click();
    await this.page.getByLabel('Finance').getByText('Finance').click();
    await this.page.locator('div').filter({ hasText: 'Invite new userClose' }).first().click();
    await this.page.getByRole('button', { name: 'Invite user' }).click();
  }


  async registerNewUser(password: string) {
    console.log('Registering a new user...');
  
    // Handle the pop-up dialog to allow clipboard access
    this.page.on('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // Automatically accept the dialog
    });
  
    // Click the "Copy to clipboard" button to get the registration token
    await this.page.getByRole('button', { name: 'Copy to clipboard' }).click();
  
    // Retrieve the registration token from the clipboard
    const registrationToken = await this.page.evaluate(() => navigator.clipboard.readText());
  
    // Navigate to the registration page using the registration token
    await this.page.goto(`https://cms-dot-proj-shophouse-dev.as.r.appspot.com/admin/auth/register?registrationToken=${registrationToken}`);
    
    // Fill in the registration form
    await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await this.page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await this.page.getByRole('checkbox', { name: 'Keep me updated about new' }).click();
    await this.page.getByRole('button', { name: "Let's start" }).click();
  }

  // async skipOnboarding() {
  //   console.log('Skipping onboarding...');
  //   for (let i = 0; i < 4; i++) {
  //     await this.page.getByRole('button', { name: 'Skip this question' }).click();
  //   }
  // }

  async verifyProfile(firstName: string, lastName: string) {
    console.log('Verifying user profile...');
    await this.page.getByRole('button', { name: `${firstName} ${lastName}` }).click();
    await this.page.getByText('Profile').click();
    await this.page.getByRole('textbox', { name: 'Email' }).isVisible();
  }
}