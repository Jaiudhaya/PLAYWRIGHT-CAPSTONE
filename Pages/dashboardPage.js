class DashboardPage {

    constructor(page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.sidebar = page.locator('.oxd-sidepanel');
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.adminMenu = page.getByRole('link', { name: 'Admin' });
        this.leaveMenu = page.getByRole('link', { name: 'Leave' });
        this.directoryMenu = page.getByRole('link', { name: 'Directory' });
        this.recruitmentMenu = page.getByRole('link', { name: 'Recruitment' });
        this.dashboardMenu = page.getByRole('link', { name: 'Dashboard' });
        this.searchBox = page.locator('input[placeholder="Search"]');
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.timeMenu = page.getByRole('link', { name: 'Time' });
        this.myInfoMenu = page.getByRole('link', { name: 'My Info' });
        this.performanceMenu = page.getByRole('link', { name: 'Performance' });
    }
}
module.exports = { DashboardPage };