chrome.storage.sync.get(["state"]).then((result) => {
  let iconState = result.state ? "active" : "inactive";
  chrome.action.setIcon({ path: `/images/${iconState}-icon.png` }, () => {});
});


chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get(["state"]).then((result) => {
    const newState = !result.state;
    let iconState = newState ? "active" : "inactive";
    chrome.action.setIcon({ path: `/images/${iconState}-icon.png` }, () => {});
    chrome.storage.sync.set({ state: newState });
  });
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
  chrome.storage.sync.get(["state"]).then((result) => {
    result.state === true && chrome.tabs.remove(tab.id).then(showItsTimeToStopVideo());
  });
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
