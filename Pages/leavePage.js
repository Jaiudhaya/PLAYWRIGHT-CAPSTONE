class LeavePage {

    constructor(page) {

        this.page = page;
        this.leaveHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.applyTab = page.getByRole('link', { name: 'Apply' });
        this.myLeaveTab = page.getByRole('link', { name: 'My Leave' });
        this.entitlementsTab = page.getByRole('link', { name: 'Entitlements' });
        this.reportsTab = page.getByRole('link', { name: 'Reports' });
        this.configureTab = page.getByRole('link', { name: 'Configure' });
        this.leaveListTab = page.getByRole('link', { name: 'Leave List' });
        this.assignLeaveTab = page.getByRole('link', { name: 'Assign Leave' });
        this.dropdowns = page.locator('.oxd-select-text');
        this.employeeInput = page.getByPlaceholder('Type for hints...').first();
        this.dateInputs = page.locator('input[placeholder="yyyy-dd-mm"]');
        this.commentTextarea = page.locator('textarea');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.applyButton = page.getByRole('button', { name: 'Apply' });
        this.dropdownOptions = page.locator('[role="option"]');
        this.emailInput = page.locator('input[placeholder*="Email"]');
    }
}

module.exports = { LeavePage };