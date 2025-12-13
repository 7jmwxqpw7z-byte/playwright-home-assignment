import { expect, Locator } from '@playwright/test';

export class LoginPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): LoginPage {
        return new LoginPage(locator);
    }

    async setUserName(userName: string): Promise<void> {
        await this.locator.locator(`//input[@id='username']`).fill(userName);
    }

    async setPassword(password: string): Promise<void> {
        await this.locator.locator(`//input[@id='password']`).fill(password);
    }
    async clickLoginButton(): Promise<void> {
        await this.locator.locator(`//input[@id='kc-login']`).click();
    }

    async terminateSession(): Promise<void> {
        await this.locator.locator(`//input[@name='kickoutButton']`).click();
    }

    async checkIfTerminateSessionIsVisible(): Promise<boolean> {
        return await this.locator.locator(`//input[@name='kickoutButton']`).isVisible();
    }
}
