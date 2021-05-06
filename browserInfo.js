//initialize variables
var ua = navigator.userAgent;
var browserVersion = navigator.appVersion;
var browserName  = navigator.appName;
var browserFullVersion  = ''+parseFloat(navigator.appVersion); 
var browserMajorVersion = parseInt(navigator.appVersion,10);
var nameOffset, verOffset, ix;

// Determine browser name from userAgent string
// Set human readable browser name, full version nuumber, and major version number
function getBrowserbrowserFullVersion(){
    // Opera 15+
    if ((verOffset=ua.indexOf("OPR/"))!=-1) {
    browserName = "Opera";
    browserFullVersion = ua.substring(verOffset+4);
    }
    // Older Opera
    else if ((verOffset=ua.indexOf("Opera"))!=-1) {
    browserName = "Opera";
    browserFullVersion = ua.substring(verOffset+6);
    if ((verOffset=ua.indexOf("Version"))!=-1) 
        browserFullVersion = ua.substring(verOffset+8);
    }
    // Older IE
    else if ((verOffset=ua.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        browserFullVersion = ua.substring(verOffset+5);
    }
    // Newer IE
    else if ((verOffset=ua.indexOf("Trident"))!=-1){
        browserName = "Microsoft Internet Explorer";
        verOffset = ua.indexOf("rv");
        browserFullVersion = ua.substring(verOffset+3);
    }
    // Edge
    else if ((verOffset=ua.indexOf("Edge"))!=-1){
        browserName = "Microsoft Edge";
        browserFullVersion = ua.substring(verOffset+5);
    }
    // Chrome
    else if ((verOffset=ua.indexOf("Chrome"))!=-1) {
        browserName = "Google Chrome";
        browserFullVersion = ua.substring(verOffset+7);
    }
    // Safari 
    else if ((verOffset=ua.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        browserFullVersion = ua.substring(verOffset+7);
        if ((verOffset=ua.indexOf("Version"))!=-1){ 
            browserFullVersion = ua.substring(verOffset+8);
        }
    }
    // Firefox 
    else if ((verOffset=ua.indexOf("Firefox"))!=-1) {
        browserName = "Mozilla Firefox";
        browserFullVersion = ua.substring(verOffset+8);
    }
    // Other/unknown browsers
    else if ( (nameOffset=ua.lastIndexOf(' ')+1) < 
                (verOffset=ua.lastIndexOf('/')) ) 
    {
    browserName = ua.substring(nameOffset,verOffset);
    browserFullVersion = ua.substring(verOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
    }

    // Trim browserFullVersion at semicolon/space/parenthesis if needed
    if ((ix=browserFullVersion.indexOf(";"))!=-1)
        browserFullVersion=browserFullVersion.substring(0,ix);
    if ((ix=browserFullVersion.indexOf(" "))!=-1)
        browserFullVersion=browserFullVersion.substring(0,ix);
    if ((ix=browserFullVersion.indexOf(")"))!=-1)
        browserFullVersion=browserFullVersion.substring(0,ix);
    
    // parse major/full version number
    browserMajorVersion = parseInt(''+browserFullVersion,10);
    if (isNaN(browserMajorVersion)) {
    browserFullVersion  = '' + parseFloat(navigator.appVersion); 
    browserMajorVersion = parseInt(navigator.appVersion,10);
    }

    return browserName, browserFullVersion, browserMajorVersion;
}

// Wrangle together all needed info
// Compile into an output message
// Push data to the DOM
function getBrowserInfo(){
    var outputMessage = "";
    var width = window.innerWidth;
    var height = window.innerHeight;
    browserName, browserFullVersion, browserMajorVersion = getBrowserbrowserFullVersion();

    // compile outputMessage string
    outputMessage =  "You are using version " + browserFullVersion;
    outputMessage += " of the " + browserName;
    outputMessage += " browser to view this page in a browser whose ";
    outputMessage += "inner window is " + width + " pixels wide and ";
    outputMessage += height + " pixels tall.";

    // print outputMessage to browserInfoReadout <p> tag's innerHTML
    document.getElementById("browserInfoReadout").innerHTML = outputMessage;
    document.getElementById("browserName").innerHTML = browserName + " " + browserFullVersion;
}