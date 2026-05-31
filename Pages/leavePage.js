export class LeavePage {
    constructor(page) {
        this.page = page;

        this.leaveHeading = page.locator('.oxd-topbar-header-breadcrumb-module');

        this.applyTab = page.getByRole('link', { name: 'Apply' });

        this.myLeaveTab = page.getByRole('link', { name: 'My Leave' });

        this.entitlementsTab = page.getByText('Entitlements');

        this.reportsTab = page.getByText('Reports');

        this.configureTab = page.getByText('Configure');

        this.leaveListTab = page.getByRole('link', { name: 'Leave List' });

        this.assignLeaveTab = page.getByRole('link', { name: 'Assign Leave' });

        this.leaveTypeDropdown = page.locator('.oxd-select-text').first();

        this.fromDateInput = page.locator('input').nth(1);

        this.toDateInput = page.locator('input').nth(2);

        this.commentInput = page.locator('textarea');

        this.applyButton = page.getByRole('button', { name: 'Apply' });

        this.cancelButton = page.getByRole('button', { name: 'Cancel' });

        this.resetButton = page.getByRole('button', { name: 'Reset' });

        this.searchButton = page.getByRole('button', { name: 'Search' });

        this.requiredMessage = page.locator('.oxd-input-field-error-message').first();

        this.employeeNameInput = page.getByPlaceholder('Type for hints...');

        this.recordsFound = page.locator('.orangehrm-horizontal-padding');

        this.table = page.locator('.oxd-table');

        this.formLoader = page.locator('.oxd-form-loader');

        this.entitlementsTab =
            page.getByText('Entitlements', { exact: true });

        this.addEntitlementsOption =
            page.getByText('Add Entitlements');
    }
}