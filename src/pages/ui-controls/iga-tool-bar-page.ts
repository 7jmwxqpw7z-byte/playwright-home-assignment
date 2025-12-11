import { expect, Locator } from '@playwright/test';

export class IgaToolBarPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): IgaToolBarPage {
        return new IgaToolBarPage(locator);
    }

    async clickSwitchButton(): Promise<void> {
        await this.locator.locator("//button[@aria-label='Classic']").click();
    }

    async verifyAgentUiButtonIsVisible(): Promise<void> {
        expect(await this.locator.locator("//button[.//span[normalize-space()=' AGENT UI ']]").isVisible());
    }

}