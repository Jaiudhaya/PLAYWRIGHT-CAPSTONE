export class TimePage {

    constructor(page) {

        this.page = page;
        this.timeHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.timesheetsTab = page.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Timesheets' });
        this.attendanceTab = page.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Attendance' });
        this.reportsTab = page.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Reports' });
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.viewButton = page.locator('.orangehrm-paper-container').getByRole('button', { name: 'View' }).first();
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.requiredMessage = page.getByText('Required').first();
        this.projectNameInput = page.getByPlaceholder('Type for hints...');
        this.jobTitleDropdown = page.locator('.oxd-select-text').first();
        this.subUnitDropdown = page.locator('.oxd-select-text').nth(1);
        this.dropdownOptions = page.locator('[role="option"]');
    }
}

module.exports = { TimePage };