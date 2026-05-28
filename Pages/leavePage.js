export class LeavePage {

    constructor(page) {
        this.page = page;
        this.leaveHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.applyButton = page.getByRole('link', { name: 'Apply' });
        this.leaveListTab = page.locator('a.oxd-topbar-body-nav-tab-item', { hasText: 'Leave List' });
        this.entitlementsTab = page.getByRole('link', { name: 'Entitlements' }); //not used
        this.reportsTab = this.reportsTab = page.getByText('Reports');
        this.configureTab = this.configureTab = page.getByText('Configure');
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.fromDateInput = page.locator('input').nth(1);
        this.toDateInput = page.locator('input').nth(2);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.locator('button:has-text("Reset")').first();
        this.table = page.locator('.oxd-table');
    }
}