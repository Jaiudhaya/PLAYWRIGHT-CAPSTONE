class PerformancePage {

    constructor(page) {

        this.page = page;
        this.performanceHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.configureTab = page.getByText('Configure');
        this.manageReviewsTab = page.getByText('Manage Reviews');
        this.myReviewsTab = page.getByText('My Reviews');
        this.employeeReviewsTab = page.getByText('Employee Reviews');
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.statusDropdown = page.locator('.oxd-select-text').first();
        this.dropdownOptions = page.locator('[role="option"]');
        this.kpiTab = page.getByRole('menuitem', { name: 'KPIs' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.keyPerformanceIndicatorInput = page.locator('.oxd-input').nth(1);
        this.requiredMessage = page.getByText('Required').first();
    }
}

module.exports = { PerformancePage };