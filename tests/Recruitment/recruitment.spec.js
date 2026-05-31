import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { RecruitmentPage } from '../../Pages/recruitmentPage';

test.describe('Recruitment Module Tests', () => {
    let page;
    let context;
    let loginPage;
    let dashboardPage;
    let recruitmentPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        recruitmentPage = new RecruitmentPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.recruitmentMenu.click();
        await expect(recruitmentPage.recruitmentHeading).toBeVisible();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify Recruitment page opens', async () => {
        await expect(recruitmentPage.recruitmentHeading).toBeVisible();
    });

    test('2.Verify Candidates tab visible', async () => {
        await expect(recruitmentPage.candidatesTab).toBeVisible();
    });

    test('3.Verify Candidates tab clickable', async () => {
        await recruitmentPage.candidatesTab.click();
    });

    // test('4.Verify Vacancies tab visible', async () => {
    //     await expect(recruitmentPage.vacanciesTab).toBeVisible();
    // });

    test('5.Verify Vacancies tab clickable', async () => {
        await recruitmentPage.vacanciesTab.click();
    });

    test('6.Verify Candidate Name accepts input', async () => {
        await recruitmentPage.candidatesTab.click();
        await recruitmentPage.candidateNameInput.fill('John');
        await expect(recruitmentPage.candidateNameInput).toHaveValue('John');
    });

    test('7.Verify Hiring Manager accepts input', async () => {
        await recruitmentPage.hiringManagerInput.fill('Admin');
        await expect(recruitmentPage.hiringManagerInput).toHaveValue('Admin');
    });

    test('8.Verify Vacancy dropdown opens', async () => {
        await recruitmentPage.vacancyDropdown.click();
        await expect(recruitmentPage.dropdownOptions.first()).toBeVisible();
        await page.keyboard.press('Escape');
    });

    test('9.Verify Status dropdown opens', async () => {
        await recruitmentPage.statusDropdown.click();
        await expect(recruitmentPage.dropdownOptions.first()).toBeVisible();
        await page.keyboard.press('Escape');
    });

    test('10.Verify Job Title dropdown opens', async () => {
        await recruitmentPage.jobTitleDropdown.click();
        await expect(recruitmentPage.dropdownOptions.first()).toBeVisible();
        await page.keyboard.press('Escape');
    });

    test('11.Verify Reset button enabled', async () => {
        await expect(recruitmentPage.resetButton).toBeEnabled();
    });

    test('12.Verify Search button enabled', async () => {
        await expect(recruitmentPage.searchButton).toBeEnabled();
    });

    test('13.Verify Add Candidate page opens', async () => {
        await recruitmentPage.addButton.click();
        await expect(recruitmentPage.addCandidateHeading).toBeVisible();
        await recruitmentPage.cancelButton.click();
    });

    test('14.Verify First Name accepts input', async () => {
        await recruitmentPage.addButton.click();
        await recruitmentPage.firstNameInput.fill('John');
        await expect(recruitmentPage.firstNameInput).toHaveValue('John');
        await recruitmentPage.cancelButton.click();
    });

    test('15.Verify Last Name accepts input', async () => {
        await recruitmentPage.addButton.click();
        await recruitmentPage.lastNameInput.fill('Smith');
        await expect(recruitmentPage.lastNameInput).toHaveValue('Smith');
        await recruitmentPage.cancelButton.click();
    });

    test('16.Verify Email accepts input', async () => {
        await recruitmentPage.addButton.click();
        await recruitmentPage.emailInput.fill('test@test.com');
        await expect(recruitmentPage.emailInput).toHaveValue('test@test.com');
        await recruitmentPage.cancelButton.click();
    });

    test('17.Verify Contact Number accepts input', async () => {
        await recruitmentPage.addButton.click();
        await recruitmentPage.contactInput.fill('9876543210');
        await expect(recruitmentPage.contactInput).toHaveValue('9876543210');
        await recruitmentPage.cancelButton.click();
    });

    test('18.Verify candidate notes field', async () => {
        await recruitmentPage.addButton.click();
        await recruitmentPage.notesTextarea.fill('Automation testing notes');
        await expect(recruitmentPage.notesTextarea).toHaveValue('Automation testing notes');
    });

    test('19. Verify Candidate vacancy dropdown retains selection', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate');
        await expect(page).toHaveURL(/addCandidate/);
        await recruitmentPage.vacancyDropdown.click();
        await recruitmentPage.dropdownOptions.nth(1).click();
        await expect(recruitmentPage.vacancyDropdown).not.toContainText('-- Select --');
    });
});

//WORKS :)