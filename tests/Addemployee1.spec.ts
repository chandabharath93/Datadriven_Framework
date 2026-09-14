import { test, expect } from '@playwright/test';
//import browser from '@playwright/test'
import myexcel from 'xlsx';
//import myjson from 'fs';

test.describe("Test scenario on Adding employees", () => 
    {

      let page:any;
      let context:any;

      function readexcel(fpath: string, sname: string) 
       {
        const WB = myexcel.readFile(fpath);
        const WS: any = WB.Sheets[sname];

        const exceldata = myexcel.utils.sheet_to_json(WS, {header: 1});
        return exceldata;
        
       }
       test.beforeAll("Login to the application", async ({browser}) => 
         {

        context = await browser.newContext();
        page = await context.newPage();  
         });

    test("Test case on adding one employee", async({})=>
       {
        await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php")
        const empdata:any= readexcel("./Exceldata/Empdata.xlsx", "Login");
        await page.locator("//input[@name='txtUserName']").fill(empdata[1][0])
        await page.locator("//input[@type='password']").fill(empdata[1][1])
        await page.locator("//input[@value='Login']").click()

       })
    
    });
