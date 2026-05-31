class RecruitmentPage {
    
    constructor(page) {
        this.page = page;
        this.recruitmentHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.candidatesTab = page.locator('.oxd-topbar-body-nav-tab-item').filter({hasText: 'Candidates'});
        this.vacanciesTab = page.locator('.oxd-topbar-body-nav-tab-item').filter({hasText: 'Vacancies'});
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.candidateNameInput = page.locator('input').nth(1);
        this.vacancyDropdown = page.locator('.oxd-select-text').first();
        this.hiringManagerInput = page.locator('input').nth(2);
        this.statusDropdown = page.locator('.oxd-select-text').nth(1);
        this.jobTitleDropdown = page.locator('.oxd-select-text').nth(2);
        this.dropdownOptions = page.locator('[role="option"]');
        this.table = page.locator('.oxd-table');
        this.recordsFound = page.locator('.orangehrm-horizontal-padding');
        this.addCandidateHeading = page.getByText('Add Candidate');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.middleNameInput = page.locator('input[name="middleName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.emailInput = page.locator('input').nth(4);
        this.contactInput = page.locator('input').nth(5);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.requiredMessage = page.locator('.oxd-input-group__message').first();
        this.profileName = page.locator('.orangehrm-edit-candidate-name');
        this.notesTextarea = page.locator('textarea').last();
    }
}

module.exports = { RecruitmentPage };