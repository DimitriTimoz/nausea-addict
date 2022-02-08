
let poison_nausea=`
<style>
body {
    animation:spin 3s linear infinite;
    overflow: hidden;
}



@keyframes spin 
{ 
    0% {         
        -webkit-transform: rotate(7200deg) scale(0.0001); 
    }
    50%{
        -webkit-transform: rotate(3600deg) scale(2); 
        transform:rotate(3600deg) scale(1); 
    }
    100% { 
        -webkit-transform: rotate(7200deg) scale(0.0001); 
        transform:rotate(7200deg) scale(0.0000001); 
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
