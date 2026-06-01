import { expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }
    async gotoLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/', { waitUntil: 'domcontentloaded' });
    }
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.locator('.oxd-sidepanel')).toBeVisible({timeout: 20000});
    }
}

module.exports = { LoginPage };