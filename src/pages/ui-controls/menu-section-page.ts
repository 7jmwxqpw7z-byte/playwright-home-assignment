import { expect, Locator } from '@playwright/test';

export class MenuSectionPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): MenuSectionPage {
        return new MenuSectionPage(locator);
    }

    async useFastSearch(value: string): Promise<void> {
        await this.locator.locator(`//input[@aria-label='Find views']`).fill(value);
    }

    async expandeParentTreeItem(parentItemName: string): Promise<void> {
        await this.locator.locator(`//span[@class='node-name' and normalize-space()='${parentItemName}']`).click();
    }

    async selectTreeItem(itemName: string): Promise<void> {
        await this.locator.locator(`//div[@class='tree-nav-div ng-star-inserted' and @title='${itemName}']`).click();
    }

}