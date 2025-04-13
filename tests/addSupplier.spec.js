import { test, expect } from '@playwright/test';
import { AddSupplierPage } from '../e2e/pages/addSupplierPage';



test.only('Add Supplier', async ({ page }) => {

   //Create an object for the Add Supplier page
    const supplierPage_obj = new AddSupplierPage(page);

   // Step 1: Login
   await supplierPage_obj.login();
   
   //Step 2: Add Supplier - Fill the Connection Settings
   await supplierPage_obj.addSupplier_ConnectionSettings();

   //Step 3: Add Supplier - Fill the Inventory Settings
   await supplierPage_obj.addSupplier_InventorySettings();

   //Step 4: Add Supplier - Fill the Product Settings
   await supplierPage_obj.addSupplier_ProductSettings();

   //Step 5: Add Supplier - Save Supplier
   await supplierPage_obj.addSupplier_SaveSupplier();

   //Step 6: Add Automatic Sync
   await supplierPage_obj.addSupplier_AutomaticSync();


}, 180_000);

