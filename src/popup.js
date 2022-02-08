
let blacklist = [];

chrome.storage.local.get("blacklist", (items) => {
    blacklist = items.blacklist;

    
});

let submit_btn  = document.getElementById('add-blacklist-submit');
submit_btn.addEventListener("click", add_host);

function add_host()  {
    let hostname = document.getElementById('add-blacklist-host').value;
    if(isValidHostname(hostname)){
        let labels = hostname.split('.');
        hostname = labels[labels.length - 2];
        blacklist.push(hostname);
        chrome.storage.local.set({ "blacklist": blacklist }, function(){
            console.log("blacklist updated " + hostname);
        }); 
    }else{
        console.log("invalid hostname");
    }
    
   
}


function isValidHostname(value) {
    if (typeof value !== 'string') return false
  
    const validHostnameChars = /^[a-zA-Z0-9-.]{1,253}\.?$/g
    if (!validHostnameChars.test(value)) {
      return false
    }
  
    if (value.endsWith('.')) {
      value = value.slice(0, value.length - 1)
    }
  
    if (value.length > 253 || !value.includes('.')) {
      return false
    }
    
    const labels = value.split('.')
    labels.forEach(label => {
        if (label.length < 2){
            return false
        }
    });
    return true
  }