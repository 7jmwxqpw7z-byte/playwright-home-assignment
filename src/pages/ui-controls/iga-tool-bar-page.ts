import { expect, Locator } from '@playwright/test';

export class IgaToolBarPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): IgaToolBarPage {
        return new IgaToolBarPage(locator);
    }

    async clickSwitchButton(): Promise<void> {
        await this.locator.locator("//div[@data-test='header']//button[@aria-label='Classic']").click();
    }

    async verifyAgentUiButtonIsVisible(): Promise<void> {
        expect(await this.locator.locator("//button[.//span[normalize-space()=' AGENT UI ']]").isVisible());
    }

    async verifyClassicUiButtonIsVisible(): Promise<void> {
        expect(await this.locator.locator("//div[@data-test='header']//button[@aria-label='Classic']").isVisible());
    }

    async clickTooltipBeacon(): Promise<void> {
        await this.locator.locator("//div[@data-usln='current-tooltip-beacon']//div[@class='sc-1ip13jh-0 bRLngr']").click();
    }

    async changeFocus(): Promise<void> {
        await this.locator.locator(`//a[@data-test="header-logo"]`).focus();
    }
}