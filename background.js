let state = true;

chrome.action.onClicked.addListener(() => {
  state = !state;
  /**
   * TODO: Toggle activation indicator of the extension
   */
  let iconState = state ? "active" : "inactive";
  chrome.action.setIcon({ path: `/images/${iconState}-icon.png` }, () => {});
});

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  chrome.tabs.get(tabId).then((tab) => {
    isPornUrl(tab.url) && betterThanPorn(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  changeInfo.url && isPornUrl(changeInfo.url) && betterThanPorn(tab);
});

/**
 * Check if the url could potentially lead to a porn site
 * @param {string} url The url that need to be checked
 */
function isPornUrl(url) {
  // TODO: Currently it's a simple regex, next improvement is to make this an dictionary look up
  const regex = /tinhte\.|facebook./;
  return url.match(regex) !== null;
}

/**
 * Close the porn tab and do something better than porn
 * TODO: make the better thing random
 * @param {tab} tab The current porn tab
 */
function betterThanPorn(tab) {
  state === true && chrome.tabs.remove(tab.id).then(showItsTimeToStopVideo());
}

/**
 * Open a new tab and show the masterpiece from the one and only FilthyFrank
 */
function showItsTimeToStopVideo() {
  chrome.tabs.create({
    url: "https://www.youtube.com/watch?v=2k0SmqbBIpQ",
    active: true,
  });
}
