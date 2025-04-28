import { test } from '@playwright/test';
import { StaffManagementPage } from '../../../POM/tsh_portal_pom/StaffManagementPage';

test('Staff Management Test', async ({ page, browser }) => {
  const staffManagementPage = new StaffManagementPage(page, browser);

  await test.step('Login as admin', async () => {
    console.log('Step: Login as admin');
    await staffManagementPage.login('temp_admin1@symph.co', 'AdminTester123!');
  });

  await test.step('Navigate to Users section', async () => {
    console.log('Step: Navigate to Users section');
    await staffManagementPage.navigateToUsers();
  });

  await test.step('Invite a new user', async () => {
    console.log('Step: Invite a new user');
    await staffManagementPage.inviteNewUser(
      'Zel',
      'Finance6 28April2025',
      'zel.villarosav7+Finance6@gmail.com',
      'Finance'
    );
  });

  await test.step('Register the invited user', async () => {
    console.log('Step: Register the invited user');
    await staffManagementPage.registerNewUser('P@ssw0rd!');
  });

//   await test.step('Skip onboarding', async () => {
//     console.log('Step: Skip onboarding');
//     await staffManagementPage.skipOnboarding();
//   });

  await test.step('Verify user profile', async () => {
    console.log('Step: Verify user profile');
    await staffManagementPage.verifyProfile('ZF', 'Zel Finance Test6');
  });
});

