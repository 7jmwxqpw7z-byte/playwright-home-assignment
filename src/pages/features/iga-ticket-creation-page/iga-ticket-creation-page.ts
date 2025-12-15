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
        await this.locator.locator(`//li[@data-value='${ticketType}']`).click();
    }

    async selectCustomer(customerName: string): Promise<void> {
        await this.locator.locator(`//div[@class="dc-inner-grid ng-star-inserted"][2]//esm-ui-dropdown-list[@data-test='reference-dropdown-7793318']`).click();
        await this.locator.locator(`//ul[@role='listbox']//li[.//span[text()='${customerName}']]`).click();
    }

    async selectTeam(teamName: string): Promise<void> {
        await this.locator.locator(`//label[text()=' Team ']/ancestor::div[contains(@class, 'e-control-wrapper')][1]`).click();
        await this.locator.locator(`//ul[@role='listbox']//li[.//span[text()='${teamName}']]`).click();
    }

    async saveTicket(): Promise<void> {
        await this.locator.locator(`//button[@data-test='save-datacard-button']`).click();
    }
}