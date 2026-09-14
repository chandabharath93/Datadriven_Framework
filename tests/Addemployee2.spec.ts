import { test, expect } from '@playwright/test';
//import { readFileSync } from 'fs';
//import browser from '@playwright/test'
import myexcel from 'xlsx';
import myjson from 'fs';

test.describe("Test scenario on Adding employees", async() => 
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

        context = await browser.newContext({
          recordVideo : {
            dir : "./Testvideo"
          }
        });
        page = await context.newPage();  
         });

    test("Test case on adding one employee", async({})=>
       {
         test.setTimeout(4000000)
        await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php")
        const empdata:any= readexcel("./Exceldata/Empdata.xlsx", "Login");
        const jsondata:any= JSON.parse(myjson.readFileSync("./EmpJson/Empjson1.json",'utf-8'))
        await page.locator(jsondata.XUN).fill(empdata[1][0])
        await page.locator(jsondata.XPWD).fill(empdata[1][1])
        await page.locator(jsondata.XSUB).click()
        await page.waitForTimeout(1000)
        await page.screenshot({path: './Testproof/Afterlogin.jpg'})
        await page.locator(jsondata.XPIM).hover();
        await page.locator(jsondata.XADDEMP).click();
        
        const Allemployessdata:any= readexcel("./Exceldata/Empdata1.xlsx", "Empinfo");
        //console.log("The number of employees are "+ Allemployessdata.length)
        //console.log("The last employee first name is " + Allemployessdata[6][1])
        
        for(let i=1;  i<=Allemployessdata.length; i++)
         {
        const employeeframe = page.frameLocator(jsondata.XFRAME);
        await employeeframe.locator(jsondata.XEMP).fill(String(Allemployessdata[i][0]))
        await employeeframe.locator(jsondata.XFIRST).fill(Allemployessdata[i][1])
        await employeeframe.locator(jsondata.XLAST).fill(Allemployessdata[i][2])
        await employeeframe.locator(jsondata.XMID).fill(Allemployessdata[i][3])
        await employeeframe.locator(jsondata.XNICK).fill(Allemployessdata[i][4])
        await employeeframe.locator(jsondata.XPHOTO).setInputFiles("./Emphoto/"+Allemployessdata[i][1]+".jpg");
        await page.screenshot({path: './Testproof/' + Allemployessdata[i][1]+ '_beforesave.jpg'})
        await employeeframe.locator(jsondata.XSAVE).click();
        await page.screenshot({path: './Testproof/' + Allemployessdata[i][1]+ '_aftersave.jpg'})
        await page.waitForTimeout(1000);
        await employeeframe.locator(jsondata.XBACK).click();
        console.log("Employee with name" + Allemployessdata[i][1]+ " ," + "added successfully") 
         }


       })
    
    });
