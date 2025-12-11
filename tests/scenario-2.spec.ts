import { test, expect } from '@playwright/test';
import { ContextSectionPage, IgaToolBarPage, MenuSectionPage } from '../src/pages/ui-controls';
import { LoginPage } from '../src/pages/ui-controls/login-page';
import { IgaTicketCreationPage } from '../src/pages/features/iga-ticket-creation-page/iga-ticket-creation-page';


test('Create new Ticket', async ({ page }) => {
    const toolBar = IgaToolBarPage.of(page.locator(`//iga-tool-bar`));
    const loginPage = LoginPage.of(page.locator(`//div[@id='kc-form-wrapper']`));
    const menuSection = MenuSectionPage.of(page.locator(`//esm-ui-menu-section`));
    const contextSection = ContextSectionPage.of(page.locator(`//esm-ui-context-section`));
    const igaTicketCreationPage = IgaTicketCreationPage.of(page.locator(`//iga-ticket-creation`));

    await test.step('Step 1: Login to the application', async () => {

        await page.goto('https://qatestenv.efectecloud-demo.com/itsm');
        await loginPage.setUserName('user1.training');
        await loginPage.setPassword('SecureRandomPassword1!');
        await loginPage.clickLoginButton();
        await loginPage.terminateSession();
    });

    await test.step('Step 2: Switch to Classic UI', async () => {

        // await page.locator(`//button[@aria-label='Classic']`).click();
        await toolBar.clickSwitchButton();
        await toolBar.verifyAgentUiButtonIsVisible();
    });

    await test.step('Step 3: Navigate to Open Tickets', async () => {

        await menuSection.expandeParentTreeItem('Service Desk Agent');
        await menuSection.selectTreeItem('06. Open Tickets');
    });

    await test.step('Step 4: Create a new Ticket', async () => {

        await contextSection.createNewTicket();
        await igaTicketCreationPage.selectTicketType('Incident');
        await igaTicketCreationPage.addSummary('Test Ticket Summary');
        await igaTicketCreationPage.selectCustomer('Admin Customer');
        await igaTicketCreationPage.selectTeam('Business Services');
        await igaTicketCreationPage.saveTicket();
        await contextSection.checkTicketCreated('Test Ticket Summary');
    });
});