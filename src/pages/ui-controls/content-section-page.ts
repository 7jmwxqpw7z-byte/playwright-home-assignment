import { expect, Locator } from '@playwright/test';

export class ContextSectionPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): ContextSectionPage {
        return new ContextSectionPage(locator);
    }

    async createNewTicket(): Promise<void> {
        await this.locator.locator(`//button[@id='create-new-dc']`).click();
    }

    async checkTicketCreated(summary: string): Promise<void> {
        expect(await this.locator.locator(`//esm-ui-default-attribute//span[normalize-space()='${summary}']`).isVisible()).toBeTruthy();
    }

}