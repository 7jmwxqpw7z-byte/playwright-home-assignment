import { expect, Locator } from '@playwright/test';

export class IgaTicketCreationPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): IgaTicketCreationPage {
        return new IgaTicketCreationPage(locator);
    }

    async addSummary(summary: string): Promise<void> {
        await this.locator.locator(`//input[@aria-label='Summary']`).fill(summary);
    }

    async addDescription(description: string): Promise<void> {
        await this.locator.locator(`//textarea[@aria-label='Description']`).fill(description);
    }

    async selectTicketType(ticketType: string): Promise<void> {
        await this.locator.locator(`//span[text()='Ticket type']/ancestor::div[contains(@class,'e-ddl')]`).click();
        await this.locator.locator(`//li[@data-value='${ticketType}']']`).click();
    }

}