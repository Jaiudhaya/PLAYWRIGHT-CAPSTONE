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
    }
}