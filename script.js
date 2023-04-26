let puppeteer=require("puppeteer");
let currTab;
let {answers}=require("./codes");
function questionSolver(url,idx){
    return new Promise(function (resolve,reject){
        // let fullLink="https://www.hackerrank.com"+url; can do below line or this one
        let fullLink=`https://www.hackerrank.com${url}`;
        let goToQuestionPagePromise=currTab.goto(fullLink);
        goToQuestionPagePromise.then(function (){
            waitClickCheckBoxPromise=customWaitAndClickPromise(".checkbox-wrap");
            return waitClickCheckBoxPromise;
        }).then(function(){
            let waitTextBox=currTab.waitForSelector("div[class='custom-input theme-old size-medium']",{visible:true});
            return waitTextBox;
        }).then(function(){
            let codeAddedPromise=currTab.type("div[class='custom-input theme-old size-medium']",answers[idx],{delay:0});
            return codeAddedPromise;
        }).then(function(){
            let ctrlDownPromise=currTab.keyboard.down("Control");
            return ctrlDownPromise;
        }).then(function(){
            let aPressPromise=currTab.keyboard.press("a");
            return aPressPromise;
        }).then(function(){
            let xPressPromise=currTab.keyboard.press("x");
            return xPressPromise;
        }).then(function (){
            let pointerOnEditorPromise=currTab.click("div[class='monaco-scrollable-element editor-scrollable vs']");
            return pointerOnEditorPromise;
        }).then(function(){
            let aPressEditorPromise=currTab.keyboard.press("a");
            return aPressEditorPromise;
        }).then(function(){
            let vPressEditorPromise=currTab.keyboard.press("v");
            return vPressEditorPromise;
        }).then(function (){
            let submitPromise=currTab.click("button[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']");
            return submitPromise;
        })
        
    })
}
function customWaitAndClickPromise(selector){
    return new Promise(function (resolve,reject){
        let waitPromise=currTab.waitForSelector(selector,{visible:true});
        waitPromise.then(function(){
        let clickPromise=currTab.click(selector);
        return clickPromise;
    })
    .then(function (){
        resolve();
    })
    .catch(function(err){
        reject(err);
    })
    })
}

    
let browserOpenPromise=puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:["--start-maximized"]
})
browserOpenPromise.then(function (browser){
    let allTabsArrPromise=browser.pages();
    return allTabsArrPromise;
})
.then(function (allTabsArr){
    currTab=allTabsArr[0];
    let visitLoginPromise=currTab.goto("https://www.hackerrank.com/auth/login");
    return visitLoginPromise;
})
.then(function (visitPage){
    console.log(visitPage);
    let emailTypePromise=currTab.type("input[name='username']","hwm16975@xcoxc.com",{delay:200});
    return emailTypePromise;
})
.then(function (){
    let passwordTypePromise=currTab.type("input[name='password']","zello@123",{delay:200});
    return passwordTypePromise;
})
.then(function (){
    // button[data-analytics='LoginPassword']
    let loginPromise=currTab.click("button[class='ui-btn ui-btn-large ui-btn-primary auth-button ui-btn-styled']");
    return loginPromise;
})
// .then (function (){
//     let waitForIP=currTab.waitForSelector("a[href='/interview/interview-preparation-kit']",{visible:true});
//     return waitForIP;
// })
// .then (function (){
//     let goToIPPromise=currTab.click("a[href='/interview/interview-preparation-kit']");
//     return goToIPPromise;
// })
.then(function (){
    let waitClickIPPromise=customWaitAndClickPromise("a[href='/interview/interview-preparation-kit']");
    return waitClickIPPromise;
})
// .then(function(){
//     let waitForWarmUp=currTab.waitForSelector("a[data-attr1='warmup']",{visible:true});
//     return waitForWarmUp;
// })
// .then(function(){
//     let gotToWarmUp=currTab.click("a[data-attr1='warmup']");
//     return gotToWarmUp;
// })
.then(function(){
    let waitClickWarmUpPromise=customWaitAndClickPromise("a[href='/interview/interview-preparation-kit/warmup/challenges']");
    return waitClickWarmUpPromise;
})
.then(function (){
    let waitForBlockHtml=currTab.waitForSelector("a[data-attr2='warmup']",{visible:true});
    return waitForBlockHtml;
})
.then(function(){
    function consoleArray(){  //this function will run on browser's console we have to take this return value to vs code then evaluate i.e putting into an array
        let htmlBlock=document.querySelectorAll("a[data-attr2='warmup']");
        console.log(typeof htmlBlock);
        let linkArr=[];
        for(let i=0;i<htmlBlock.length;i++){
            linkArr.push(htmlBlock[i].getAttribute("href"));
        }
        // console.log(linkArr);
        return linkArr;
    }
    let linkArrPromise=currTab.evaluate(consoleArray); //consoleArray returns a array from console we have to get it using evaluate Promise and then putting it into linkArr
    return linkArrPromise;
})
.then(function (linkArr){
    let questionSolvePromise=questionSolver(linkArr[0],1);
    return questionSolvePromise;
})


//moni@123 moni roy  ffx14574@cdfaq.com
// hwm16975@xcoxc.com  moni singha1 zello@123  currentOne