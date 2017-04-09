/** CONFIGURATIONS **/

// Theshold for duration of entire script - fails test if script lasts longer than X (in ms)
// Script-wide timeout for all wait and waitAndFind functions (in ms)
var DefaultTimeout = 60000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";

/** HELPER VARIABLES AND FUNCTIONS **/

var assert = require('assert'),
  By = $driver.By,
  browser = $browser.manage(),
  startTime = Date.now(),
  stepStartTime = Date.now(),
  prevMsg = '',
  prevStep = 0,
  lastStep = 9999,
VARS = {};
// Uncomment and use this if you're running Se-Builder 2 and used Manual Entry variables.
// If you don't know what those are, fuggedaboutit!
// VARS = {{scriptManualEntryData}};

var log = function(thisStep, thisMsg) {
  if (thisStep > 1 || thisStep == lastStep) {
    var totalTimeElapsed = Date.now() - startTime;
    var prevStepTimeElapsed = totalTimeElapsed - stepStartTime;
    console.log('Step ' + prevStep + ': ' + prevMsg + ' FINISHED. It took ' + prevStepTimeElapsed + 'ms to complete.');
    $util.insights.set('Step ' + prevStep + ': ' + prevMsg, prevStepTimeElapsed);
    if (DefaultTimeout > 0 && totalTimeElapsed > DefaultTimeout) {
      throw new Error('Script timed out. ' + totalTimeElapsed + 'ms is longer than script timeout threshold of ' + DefaultTimeout + 'ms.');
    }
  }
  if (thisStep > 0 && thisStep != lastStep) {
    stepStartTime = Date.now() - startTime;
    console.log('Step ' + thisStep + ': ' + thisMsg + ' STARTED at ' + stepStartTime + 'ms.');
    prevMsg = thisMsg;
    prevStep = thisStep;
  }
};

function isAlertPresent() {
  try {
    var thisAlert = $browser.switchTo().alert();
    return true;
  } catch (err) { return false; }
}

function isElementSelected(el) { return $browser.findElement(el).isSelected(); }

function isTextPresentIn(text, selector) {
  return $browser.findElement(selector)
    .getText()
    .then(function (wholetext) {
      return wholetext.indexOf(text) != -1;
    })
    .catch(function(err) {
      return false;
    });
}

function isTextPresent(text) {
  return isTextPresentIn(text, By.tagName('html'));
}

/** BEGINNING OF SCRIPT **/

console.log('Starting synthetics script: nopCommerce_NR');
console.log('Default timeout is set to ' + (DefaultTimeout/1000) + ' seconds');
console.log('Variables set in this script: ', VARS);

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && (0 !== UserAgent.trim().length) && (UserAgent != 'default')) {
  $browser.addHeader('User-Agent', UserAgent);
  console.log('Setting User-Agent to ' + UserAgent);
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$browser.getCapabilities().then(function () { })

// Step 11
.then(function() {
  log(11, '$browser.get("http://nop.cs.rackspace.com/")');
  return $browser.get("http://nop.cs.rackspace.com/"); })

// Step 12
.then(function() {
  log(12, 'clickElement "Electronics"');
  return $browser.waitForAndFindElement(By.linkText("Electronics"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 13
.then(function() {
  log(13, 'clickElement "//div[@class=\'side-2\']//a[normalize-space(.)=\'Camera & photo\']"');
  return $browser.waitForAndFindElement(By.xpath("//div[@class=\'side-2\']//a[normalize-space(.)=\'Camera & photo\']"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 14
.then(function() {
  log(14, 'clickElement "input.button-2.product-box-add-to-cart-button"');
  return $browser.waitForAndFindElement(By.css("input.button-2.product-box-add-to-cart-button"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 15
.then(function() {
  log(15, 'clickElement "add-to-cart-button-14"');
  return $browser.waitForAndFindElement(By.id("add-to-cart-button-14"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 16
.then(function() {
  log(16, 'clickElement "//div[@class=\'footer-upper\']//a[.=\'Shopping cart\']"');
  return $browser.waitForAndFindElement(By.xpath("//div[@class=\'footer-upper\']//a[.=\'Shopping cart\']"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 17
.then(function() {
  log(17, 'setElementSelected "//select[@id=\'CountryId\']//option[2]"');
  return $browser.waitForAndFindElement(By.xpath("//select[@id=\'CountryId\']//option[2]"), DefaultTimeout); })
.then(function(el) { el.isSelected()
  .then(function(bool) { if (!bool) { el.click(); } }); })

// Step 18
.then(function() {
  log(18, 'setElementSelected "//select[@id=\'StateProvinceId\']//option[54]"');
  return $browser.waitForAndFindElement(By.xpath("//select[@id=\'StateProvinceId\']//option[54]"), DefaultTimeout); })
.then(function(el) { el.isSelected()
  .then(function(bool) { if (!bool) { el.click(); } }); })

// Step 19
.then(function() {
  log(19, 'setElementText "ZipPostalCode"');
  return $browser.waitForAndFindElement(By.id("ZipPostalCode"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys("78204"); })

// Step 20
.then(function() {
  log(20, 'clickElement "estimate-shipping-button"');
  return $browser.waitForAndFindElement(By.id("estimate-shipping-button"), DefaultTimeout); })
.then(function (el) { el.click(); })

.then(function() {
  log(lastStep, '');
  console.log('Browser script execution SUCCEEDED.');
}, function(err) {
  console.log ('Browser script execution FAILED.');
  throw(err);
});

/** END OF SCRIPT **/
