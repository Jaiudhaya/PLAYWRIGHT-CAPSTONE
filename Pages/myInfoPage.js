class MyInfoPage {

    constructor(page) {

        this.page = page;
        this.myInfoHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.middleNameInput = page.locator('input[name="middleName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.employeeIdInput = page.locator('.oxd-input').nth(4);
        this.otherIdInput = page.locator('.oxd-input').nth(5);
        this.driverLicenseInput = page.locator('.oxd-input').nth(6);
        this.contactDetailsTab = page.getByRole('link', { name: 'Contact Details' });
        this.emergencyContactsTab = page.locator('a').filter({hasText: 'Emergency Contacts'});
        this.emergencyContactSaveButton = page.locator('form').getByRole('button', { name: 'Save' });
        this.qualificationsTab = page.getByRole('link', { name: 'Qualifications' });        
        this.street1Input = page.locator('.oxd-input').nth(1);
        this.cityInput = page.locator('.oxd-input').nth(3);
        this.selectDropdown = page.locator('.oxd-select-text');
        this.dropdownOptions = page.locator('[role="option"]');
        this.addButton = page.getByRole('button', { name: 'Add' }).first();
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.requiredMessage = page.getByText('Required').first();
        this.dependentsTab = page.getByRole('link', { name: 'Dependents' });
    }
}

module.exports = { MyInfoPage };