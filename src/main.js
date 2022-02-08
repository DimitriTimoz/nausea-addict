
let poison_nausea=`
<style>
body {
    -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation:spin 2s linear infinite;
    overflow: hidden;
}
@-moz-keyframes spin
{ 
    100% {
      -moz-transform: rotate(360deg); 
    } 
}
@-webkit-keyframes spin 
{ 
    100% {
        -webkit-transform: rotate(360deg); 
        -webkit-filter: hue-rotate(360deg);
    } 
}
@keyframes spin 
{ 
    100% { 
        -webkit-transform: rotate(360deg); 
        -webkit-filter: hue-rotate(360deg);
        transform:rotate(360deg); 
        filter: hue-rotate(360deg);
        
        
    } 
}


</style>
`;
var delayInMilliseconds = 1500; //1.5 seconds

window.addEventListener("load", setTimeout(() => {
    
    chrome.storage.local.get(["blacklist"], (items) => {
        let blacklist = items.blacklist;
        if(items.blacklist == null){
            return;
        }
        let labels = window.location.host.split('.');
        let domain = labels[labels.length - 2]; 
        blacklist.forEach(blackhost => {

            if(blackhost == domain){
                document.body.innerHTML += poison_nausea;
                return;
            }
        });
        
    });
}, delayInMilliseconds));
