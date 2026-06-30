import { test, expect } from '@playwright/test';
import { AppointmentPage } from '../pages/appointmentPage.js';

test.describe('CURA appointment flow', () => {
  test('handles the current appointment form behavior', async ({ page }) => {
    const appointmentPage = new AppointmentPage(page);

    await appointmentPage.open();
    await expect(page).toHaveTitle(/CURA Healthcare Service/i);
    await expect(page.locator('#btn-make-appointment')).toBeVisible();

    await appointmentPage.goToLogin();

    const loginFormVisible = await page.locator('#txt-username').isVisible().catch(() => false);
    if (loginFormVisible) {
      await expect(page.locator('#txt-username')).toBeVisible();
      await expect(page.locator('#txt-password')).toBeVisible();
      await expect(page.locator('#btn-login')).toBeVisible();
      await page.fill('#txt-username', 'John Doe');
      await page.fill('#txt-password', 'ThisIsNotAPassword');
      await page.click('#btn-login');
    }

    await expect(page.locator('h2')).toContainText('Make Appointment');
    await expect(page.locator('#combo_facility')).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Medicare' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Medicaid' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'None' })).toBeVisible();

    await appointmentPage.selectFacility('Tokyo CURA Healthcare Center');
    await appointmentPage.toggleReadmission();
    await appointmentPage.selectProgram('Medicare');
    await appointmentPage.enterVisitDate('30/06/2026');
    const comment = 'Patient experiencing fever, headache and body pain for 3 days.';
    await appointmentPage.enterComment(comment);

    await appointmentPage.bookAppointment();
    await expect(page.locator('h2')).toContainText('Make Appointment');
    await expect(page.locator('#btn-book-appointment')).toBeVisible();
    await expect(page.locator('#combo_facility')).toHaveValue('Tokyo CURA Healthcare Center');
    await expect(page.getByRole('checkbox', { name: 'Apply for hospital readmission' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Medicare' })).toBeChecked();

    await appointmentPage.openMenu();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await appointmentPage.logout();

    await expect(page.locator('#btn-make-appointment')).toBeVisible();
  });
});
