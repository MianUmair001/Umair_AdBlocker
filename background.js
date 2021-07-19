var enabled = true;
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (enabled) {
      console.log("blocking:", details.url);
    }
    return { cancel: enabled };
  },
  { urls: blocked_sites },
  //{urls: ["<all_urls>"]}, /* replace with list of blacklisted urls */
  ["blocking"]
);
