class DashboardPage {
    constructor(page) {
        
        this.page = page;
        this.sidebar = page.locator('.oxd-sidepanel');
        this.adminMenu = page.getByRole('link', { name: 'Admin' });
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.leaveMenu = page.getByRole('link', { name: 'Leave' });
        this.timeMenu = page.getByRole('link', { name: 'Time' });
        this.recruitmentMenu = page.getByRole('link', { name: 'Recruitment' });
        this.myInfoMenu = page.getByRole('link', { name: 'My Info' });
        this.performanceMenu = page.getByRole('link', { name: 'Performance' });
        this.searchBox = page.locator('input[placeholder="Search"]');
        this.directoryMenu = page.getByRole('link', { name: 'Directory' });
    }
    async isDashboardLoaded() {
        await this.page.waitForURL('**/dashboard/index', { timeout: 15000 });
        return this.sidebar.isVisible();
    }

    async clickMenu(menu) {
        await menu.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { DashboardPage };