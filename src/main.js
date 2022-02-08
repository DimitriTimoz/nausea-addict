
chrome.storage.local.get(["blacklist"], (items) => {
    let blacklist = items.blacklist;

    blacklist.forEach(blackhost => {
        if(blackhost == window.location.host){
            console.log("blacklisted");
        }
    });
    
});





function to_short_hostname(name) {
  
    const validHostnameChars = /^[a-zA-Z0-9-.]{1,253}\.?$/g
    if (!validHostnameChars.test(value)) {
      return "unknown";
    }
  
  
    if (value.endsWith('.')) {
      value = value.slice(0, value.length - 1);
    }
    if (value.length > 253 || !value.includes('.')) {
        return "unknown";
    }

    const labels = value.split('.');
    return labels[labels.length - 2] + "." + labels[labels.length - 1];

}
