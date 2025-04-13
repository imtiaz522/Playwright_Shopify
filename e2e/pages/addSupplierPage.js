import { test, expect } from '@playwright/test';
exports.AddSupplierPage = class AddSupplierPage {

    //Object Identifiers    
    constructor(page) {
        this.page = page;
        this.staging_url = 'https://admin.shopify.com/store/e2e-staging-test/apps/supply-master-staging/supply-master';
        this.iframe_obj = page.locator('iframe[name="app-iframe"]').contentFrame();
    }

    async login() {
        //Go to URL
        await this.page.goto(this.staging_url);

        //Enter email id
        await this.page.locator("//input[@name='account[email]']").fill('opstacktest@gmail.com');
        await this.page.getByRole('button', { name: 'Continue with email' }).click();

        //Enter Password
        const passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill('opstackmarbles');

        //Click on Login button
        await this.page.getByRole('button', { name: 'Log in' }).click();

        //await this.page.pause();
        const supplyMasterStaging_obj = this.page.locator('//*[@id="AppFrameScrollable"]/div/div/div/div/div/div/embedded-app/div');

        await supplyMasterStaging_obj.waitFor({ timeout: 150000 });

        // As shopify throws 404 upon multiple logins, I am trying to refresh or renavigate to the app
        await this.page.goto(this.staging_url);

        // Wait for the Add Supplier button
        const myLocator = this.iframe_obj.getByRole('button', { name: 'Add Supplier' });
        await myLocator.waitFor({ timeout: 150000 });
    }

    async addSupplier_ConnectionSettings() {

        // Click on Add Supplier button 
        await this.iframe_obj.getByRole('button', { name: 'Add Supplier' }).click();

        // Fill all the details in the Connection Settings tab
        await this.iframe_obj.locator('#selectSupplierType').selectOption('ssactivewear');
        await this.iframe_obj.getByRole('textbox', { name: 'Supplier Name*' }).fill('S&S Canada Test');
        await this.iframe_obj.getByRole('textbox', { name: 'Username*' }).click();
        await this.iframe_obj.getByRole('textbox', { name: 'Username*' }).fill('415530');
        await this.iframe_obj.getByRole('textbox', { name: 'Username*' }).press('Tab');
        await this.iframe_obj.getByText('Supplier NameUsernameThe').click();
        await this.iframe_obj.getByRole('textbox', { name: 'API Key*' }).click();
        await this.iframe_obj.getByRole('textbox', { name: 'API Key*' }).fill('d8ea9d20-d8db-4095-ba86-cdfecb1545ba');
        await this.iframe_obj.getByLabel('Country').selectOption('CA');

        // Test connection button object
        const testconnection_btn_obj = this.iframe_obj.getByRole('button', { name: 'Test Credentials' });
        await testconnection_btn_obj.waitFor({ timeout: 15000 });

        //Click on the Test Connection button              
        await testconnection_btn_obj.click();

        //await expect(this.iframe_obj.getByText('Test connection successful!')).toHaveText('Test connection successful!');

    }

    async addSupplier_InventorySettings() {

        // Fill the details in Inventory Settings

        await this.iframe_obj.getByRole('button', { name: 'Next Step' }).click();
        await this.iframe_obj.locator('#PolarisSelect1').selectOption('ON');
        await this.iframe_obj.locator('#PolarisSelect2').selectOption('BC');
        await this.iframe_obj.getByRole('spinbutton', { name: 'Adjustment Quantity' }).click();
        await this.iframe_obj.getByRole('spinbutton', { name: 'Adjustment Quantity' }).fill('16');

    }

    async addSupplier_ProductSettings() {

        //fill the details in the Product Settings
        await this.iframe_obj.getByRole('button', { name: 'Next Step' }).click();
        await this.iframe_obj.locator('.Polaris-Checkbox__Backdrop').first().click();
        await this.iframe_obj.getByRole('button', { name: 'Add Field' }).click();
        await this.iframe_obj.locator('#PolarisSelect23').selectOption('specs');
        await this.iframe_obj.locator('#PolarisSelect24').selectOption('metafield');
        await this.iframe_obj.getByRole('textbox', { name: 'Metafield' }).click();
        await this.iframe_obj.getByRole('textbox', { name: 'Metafield' }).fill('test');
        await this.iframe_obj.locator('body').click();
        await this.iframe_obj.getByRole('button', { name: 'Add Field' }).click();
        await this.iframe_obj.locator('#PolarisSelect25').selectOption('variant.colorSwatchImage');
        await this.iframe_obj.locator('#PolarisSelect26').selectOption('variant.metafields');
        await this.iframe_obj.locator('#metafieldKey-10').click();
        await this.iframe_obj.locator('#metafieldKey-10').fill('Variant color Swatch');
        await this.iframe_obj.locator('body').click();
    }

    async addSupplier_SaveSupplier() {

        //Click on the Save Supplier button
        await this.iframe_obj.getByRole('button', { name: 'Save Supplier' }).nth(1).click();
    }

    async addSupplier_AutomaticSync() {
        
        //Fill the details in Automatic Sync and go to home page
        await this.iframe_obj.getByRole('tab', { name: 'Automatic Sync' }).click();
        await this.iframe_obj.getByLabel('Frequency of Automatic Sync').selectOption('daily');
        await this.iframe_obj.getByLabel('Action on Unavailable Products').selectOption('ARCHIVE');
        await this.iframe_obj.getByLabel('Update Settings').selectOption('ALL_FIELDS_WITH_IMAGES');
        await this.iframe_obj.getByRole('button', { name: 'Save Supplier' }).click();
        await this.iframe_obj.getByRole('button', { name: 'Home' }).click();

    }


}