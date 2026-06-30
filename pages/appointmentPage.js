import { BasePage } from './basePage.js';

export class AppointmentPage extends BasePage {
  constructor(page, baseURL) {
    super(page, baseURL);
    this.pageHeading = 'h2';
    this.facilitySelect = '#combo_facility';
    this.readmissionCheckbox = '#chk_hospotal_readmission';
    this.programRadios = {
      medicare: 'input[name="programs"][value="Medicare"]',
      medicaid: 'input[name="programs"][value="Medicaid"]',
      none: 'input[name="programs"][value="None"]'
    };
    this.visitDateInput = '#txt_visit_date';
    this.commentTextarea = '#txt_comment';
    this.bookButton = '#btn-book-appointment';
    this.confirmationHeading = 'h2';
    this.confirmationSummary = '.well';
    this.menuToggle = '#menu-toggle';
    this.menuList = '#sidebar-wrapper';
    this.logoutLink = 'a[href="authenticate.php?logout"]';
    this.homeMenuLink = 'a[href="./"]';
    this.historyMenuLink = 'a[href="history.php#history"]';
    this.profileMenuLink = 'a[href="profile.php#profile"]';
  }

  async open() {
    await this.goto('/');
  }

  async goToLogin() {
    await this.click('#btn-make-appointment');
  }

  async selectFacility(value) {
    await this.page.selectOption(this.facilitySelect, value);
  }

  async toggleReadmission() {
    await this.page.check(this.readmissionCheckbox);
  }

  async selectProgram(program) {
    await this.page.check(this.programRadios[program.toLowerCase()]);
  }

  async enterVisitDate(date) {
    await this.page.fill(this.visitDateInput, date);
  }

  async enterComment(comment) {
    await this.page.fill(this.commentTextarea, comment);
  }

  async bookAppointment() {
    await this.page.click(this.bookButton);
  }

  async openMenu() {
    await this.page.click(this.menuToggle);
  }

  async logout() {
    await this.page.click(this.logoutLink);
  }

  async getSelectedFacility() {
    return this.page.locator(this.facilitySelect).inputValue();
  }

  async isReadmissionChecked() {
    return this.page.locator(this.readmissionCheckbox).isChecked();
  }

  async getConfirmationText() {
    return this.page.locator(this.confirmationSummary).textContent();
  }

  async getPageTitle() {
    return this.page.title();
  }
}
