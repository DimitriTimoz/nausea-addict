
let blacklist = [];

chrome.storage.local.get("blacklist", (items) => {
    if(items.blacklist == null){
        return;
    }
    blacklist = items.blacklist;
    update_list(blacklist);

    
});

let submit_btn  = document.getElementById('add-blacklist-submit');
submit_btn.addEventListener("click", add_host);

async function add_host()  {
    let hostname = document.getElementById('add-blacklist-host').value;
    if(isValidHostname(hostname)){
        let labels = hostname.split('.');
        hostname = labels[labels.length - 2];
        if (blacklist.includes(hostname)){
            alert(hostname + " is already blacklisted")
            return;
        }
        blacklist.push(hostname);
        chrome.storage.local.set({ "blacklist": blacklist }, function(){
            console.log("blacklist updated " + hostname);
        }); 
        update_list(blacklist);
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


function update_list(list) {
        
    const container = document.getElementById("blacklist-container");
    container.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        const host = list[i];
        let host_element = document.createElement("div");

        let host_remove = document.createElement("span");
        host_remove.innerHTML = '+';
        host_remove.classList.add("remove-host-btn");
        host_remove.id = "remove-host-" + i;
        host_remove.onclick = (el) => {
            let id = el.target.id.split("-")[2];
            removeEl(blacklist, id);
        }
        let host_name_element = document.createElement("span");
        host_name_element.innerHTML = host;

        host_element.appendChild(host_name_element);
        host_element.appendChild(host_remove);
        container.appendChild(host_element);
    
    }
}

function removeEl(list, id) {
    blacklist.splice( parseFloat(id), 1);
    chrome.storage.local.set({ "blacklist": blacklist }, function(){
        console.log(blacklist);
        update_list(blacklist)
    });          

}