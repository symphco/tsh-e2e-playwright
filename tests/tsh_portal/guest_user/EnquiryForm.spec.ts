import { test } from '@playwright/test';
import { EnquiryFormPage } from '../../../POM/tsh_portal_pom/EnquiryFormPage';

test('Enquiry Form Test', async ({ page }) => {
  const enquiryFormPage = new EnquiryFormPage(page);

  await test.step('Navigate to the Enquiry Form page', async () => {
    console.log('Navigating to the Enquiry Form page...');
    await page.goto('https://proj-shophouse-dev.as.r.appspot.com/contact');
  });

  await test.step('Verify Global Privacy Policy content', async () => {
    console.log('Navigating to the Global Privacy Policy...');
    await enquiryFormPage.navigateToGlobalPrivacyPolicy();
    console.log('Verifying Global Privacy Policy content...');
    await enquiryFormPage.verifyPrivacyPolicyContent();
  });

  await test.step('Navigate back to the contact page', async () => {
    console.log('Navigating back to the contact page...');
    await enquiryFormPage.navigateBackToContactPage();
  });

  await test.step('Fill out the enquiry form', async () => {
    console.log('Filling out the enquiry form...');
    await enquiryFormPage.fillFirstName('Enquiry Test');
    await enquiryFormPage.fillLastName('28 April 2025');
    await enquiryFormPage.fillOrganisation('Zel Organization');
    await enquiryFormPage.fillEmail('zel.villarosav3+adminorg@gmail.com');
    await enquiryFormPage.fillQuery('Enquiry Test');
    await enquiryFormPage.fillMessage('TEST');
  });

  await test.step('Accept terms and submit the form', async () => {
    console.log('Accepting terms and submitting the form...');
    await enquiryFormPage.acceptTermsOfService();
    //await enquiryFormPage.submitForm();
  });

  await test.step('Verify success message', async () => {
    console.log('Verifying success message...');
    await enquiryFormPage.verifySuccessMessage();
  });



//WILL CREATE FLOW FOR HELPDESK ONCE I HAVE THE CREDENTIALS, AS I ONLY HAVE THE PROD CREDENTIALS



});