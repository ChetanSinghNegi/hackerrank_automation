let puppeteer = require("puppeteer");
const codes = require("./codes");
let currTab;
let { answers } = require("./codes");


(async function fn(){
    let browserOpenPromise = puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    })
    let browser=await browserOpenPromise;
    let allTabsArr = await browser.pages();
    currTab = allTabsArr[0];
    await currTab.goto("https://www.hackerrank.com/auth/login");
    await currTab.type("input[name='username']", "hwm16975@xcoxc.com", { delay: 20 });
    await currTab.type("input[name='password']", "zello@123", { delay: 20 });
    await currTab.click("button[class='ui-btn ui-btn-large ui-btn-primary auth-button ui-btn-styled']");
    await customWaitAndClick("a[href='/interview/interview-preparation-kit']");
    await customWaitAndClick("a[href='/interview/interview-preparation-kit/warmup/challenges']");
    let currPageUrl=await currTab.url();
    for(let i=0;i<answers.length;i++){
        let qObj=answers[i];
        await questionSolver(qObj.qName,qObj.soln,currPageUrl);
    }
})()

async function questionSolver(qName,soln,mainPageLink){
    await currTab.goto(mainPageLink);
    await currTab.evaluate(consoleFn,"h4[class='challengecard-title']",qName);
    await currTab.waitForSelector("a[data-attr2='Submissions']",{visible:true});
    await customWaitAndClick(".checkbox-wrap");
    await currTab.waitForSelector("div[class='custom-input theme-old size-medium']",{visible:true});
    await currTab.type("div[class='custom-input theme-old size-medium']",soln,{delay:10});
    await currTab.keyboard.down("Control");
    await currTab.keyboard.press("a");
    await currTab.keyboard.press("x");
    await currTab.click("div[class='monaco-scrollable-element editor-scrollable vs']");
    await currTab.keyboard.press("a");
    await currTab.keyboard.press("v");
    await currTab.click("button[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']");

}
function consoleFn(selector,qName){
    let qNameElem=document.querySelectorAll(selector);
    for(let i=0;i<qNameElem.length;i++){
        let currQueName=qNameElem[i].innerText.split("\n")[0];
        if(currQueName==qName){
            console.log(qName);
            return qNameElem[i].click();
        }
    }
}



async function customWaitAndClick(selector) {
    //async function also returns promise which is later utilized in main code
    try {
        await currTab.waitForSelector(selector, { visible: true });
        await currTab.click(selector);
    }
    catch {
        return new Error(err);
    }
}


//moni@123 moni roy  ffx14574@cdfaq.com
// hwm16975@xcoxc.com  moni singha1 zello@123
