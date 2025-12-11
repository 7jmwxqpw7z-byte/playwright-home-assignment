import test, { expect } from '@playwright/test'

test('Create new Ticket', async ({ page }) => {
    await page.goto('https://qatestenv.efectecloud-demo.com/itsm');
    await page.locator(`//input[@id='username']`).fill('user1.training');
    await page.locator(`//input[@id='password']`).fill('SecureRandomPassword1!');
    await page.locator(`//input[@id='kc-login']`).click();
    await page.locator(`//input[@type='button' and @value='Terminate the other session']`).click();

    await page.locator(`//button[@aria-label='Classic']`).click();
    expect(await page.locator("//button[.//span[normalize-space()=' AGENT UI ']]").isVisible());
    await page.locator(`//span[@class='node-name' and normalize-space()='Service Desk Agent']`).click();
    expect(await page.locator("//div[@class='tree-nav-div ng-star-inserted' and @title='06. Open Tickets']").isVisible());
    await page.locator(`//div[@class='tree-nav-div ng-star-inserted' and @title='06. Open Tickets']`).click();
    expect(await page.locator("//button[@id='create-new-dc']").isVisible());
    await page.locator(`//button[@id='create-new-dc']`).click();

    await page.locator(`//input[@data-test='simple-input-7792739']`).fill('Test Ticket Summary');
    await page.locator(`//label[.//span[normalize-space()='Ticket type']]/parent::div[@role='combobox']`).click();
    await page.locator(`//li[@data-value='Incident']`).click();
    await page.locator(`//label[normalize-space()='Customer']`).click();
    await page.locator(`//div[contains(@class,'item-template')]//span[normalize-space()='Admin Customer']/parent::div`).click();
    await page.locator(`//label[contains(@class,'e-float-text') and normalize-space()='Team']`).click();
    await page.locator(`//div[@id='reference-dropdown-option-7795676-10203063']`).click();

    await page.locator(`//button[.//span[normalize-space()='Save']]`).click();

    expect(await page.locator(`//esm-ui-default-attribute//span[normalize-space()='Test Ticket Summary']`).isVisible()); // Verify that the ticket is created

});
