class AdminPage {
    constructor(page) {
        this.page = page;
        this.adminHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.usernameInput = page.locator('.oxd-input').nth(1);
        this.userRoleDropdown = page.locator('.oxd-select-text').nth(0);
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.statusDropdown = page.locator('.oxd-select-text').nth(1);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.table = page.locator('.oxd-table');
        this.userRoleOptions = page.getByRole('option');
        this.recordsFound = page.locator('.orangehrm-horizontal-padding');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.requiredMessage = page.getByText('Required');
        this.addUserRoleDropdown = page.locator('.oxd-select-text').nth(0);
        this.addStatusDropdown = page.locator('.oxd-select-text').nth(1);
        this.addUsernameInput = page.locator('input').nth(2);
        this.passwordInput = page.locator('input[type="password"]').nth(0);
        this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
        this.dropdownOptions = page.locator('[role="option"]');
    }
}

module.exports = { AdminPage };