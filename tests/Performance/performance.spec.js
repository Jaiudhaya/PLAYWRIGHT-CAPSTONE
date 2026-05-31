import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/loginPage';
import { DashboardPage } from '../../Pages/dashboardPage';
import { PerformancePage } from '../../Pages/performancePage';

test.describe.configure({ mode: 'serial' });

test.describe('Performance Module Tests', () => {
    let page;
    let context;
    let loginPage;
    let dashboardPage;
    let performancePage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        performancePage = new PerformancePage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.performanceMenu.click();
        await expect(performancePage.performanceHeading).toBeVisible();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('1.Verify Performance page opens', async () => {
        await expect(page).toHaveURL(/performance/);
    });

    test('2.Verify Employee Reviews tab visible', async () => {
        await expect(performancePage.employeeReviewsTab).toBeVisible();
    });

    test('3.Verify Employee Reviews tab clickable', async () => {
        await performancePage.employeeReviewsTab.click();
        await expect(page).toHaveURL(/searchEvaluatePerformanceReview/);
    });

    test('4.Verify Employee Name accepts input', async () => {
        await performancePage.employeeNameInput.fill('Admin');
        await expect(performancePage.employeeNameInput).toHaveValue('Admin');
    });

    test('5.Verify Search button enabled', async () => {
        await expect(performancePage.searchButton).toBeEnabled();
    });

    test('6.Verify Reset button enabled', async () => {
        await expect(performancePage.resetButton).toBeEnabled();
    });

    test('7.Verify Employee Name field remains editable', async () => {
        await performancePage.employeeNameInput.fill('Admin');
        await expect(performancePage.employeeNameInput).toHaveValue('Admin');
        await performancePage.employeeNameInput.clear();
        await performancePage.employeeNameInput.fill('OrangeHRM');
        await expect(performancePage.employeeNameInput).toHaveValue('OrangeHRM');
    });

    test('8.Verify Status dropdown selectable', async () => {
        await performancePage.statusDropdown.click();
        await performancePage.dropdownOptions.nth(1).click();
        await expect(performancePage.statusDropdown).toBeVisible();
    });

    test('9.Verify Configure menu opens', async () => {
        await performancePage.configureTab.click();
        await expect(performancePage.configureTab).toBeVisible();
    });

    test('10.Verify KPI page opens', async () => {
        await performancePage.configureTab.click();
        await performancePage.kpiTab.click();
        await expect(page).toHaveURL(/searchKpi/);
    });

    test('11.Verify Add KPI page opens', async () => {
        await performancePage.addButton.click();
        await expect(page).toHaveURL(/saveKpi/);
    });

    test('12.Verify KPI mandatory validation', async () => {
        await performancePage.saveButton.click();
        await expect(performancePage.requiredMessage).toBeVisible();
    });

    test('13.Verify KPI input accepts value', async () => {
        await performancePage.keyPerformanceIndicatorInput.fill('Automation KPI');
        await expect(performancePage.keyPerformanceIndicatorInput).toHaveValue('Automation KPI');
    });

    test('14.Verify Cancel button returns to KPI page', async () => {
        await performancePage.cancelButton.click();
        await expect(page).toHaveURL(/searchKpi/);
    });

    test('15.Verify page refresh keeps session', async () => {
        await page.reload();
        await expect(performancePage.performanceHeading).toBeVisible();
    });
});