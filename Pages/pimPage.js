export class PimPage {

    constructor(page) {
        this.page = page;
        this.pimHeading = page.locator('.oxd-topbar-header-breadcrumb-module');;
        this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.employeeIdInput = page.locator('.oxd-input').nth(1);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.employeeListTable = page.locator('.oxd-table');
        this.recordsFoundText = page.locator('text=Records Found');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.requiredMessage = page.getByText('Required').first();
        this.middleNameInput = page.locator('input[name="middleName"]');
        this.employeeIdAddInput = page.locator('.orangehrm-employee-form input').nth(4);
        this.createLoginDetailsToggle = page.locator('.oxd-switch-input');
        this.usernameAddInput = page.locator('.oxd-form-row input').nth(5);
        this.passwordAddInput = page.locator('input[type="password"]').first();
        this.confirmPasswordAddInput = page.locator('input[type="password"]').last();
    }
}