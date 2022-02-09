
let poison_nausea=`
<style>
body {
    animation:spin 3s linear infinite;
    overflow: hidden !important;
}
@keyframes spin 
{ 
    0% {         
        -webkit-transform: rotate(0deg) scale(0.0001); 
    }
    50%{
        -webkit-transform: rotate(3600deg) scale(1.5); 
        transform:rotate(3600deg) scale(1.5); 
    }
    100% { 
        -webkit-transform: rotate(7200deg) scale(0.0001); 
        transform:rotate(7200deg) scale(0.0000001); 
        filter: hue-rotate(360deg);
   } 
}
</style>
`;

const delayInMilliseconds = 1500;

chrome.storage.local.get(["blacklist"], (items) => {
    if(items.blacklist == null){
        return;
    }
    let blacklist = items.blacklist;
    let labels = window.location.host.split('.');
    let domain = labels[labels.length - 2]; 
    blacklist.forEach(blackhost => {
        if(blackhost == domain){
            window.addEventListener("load", setTimeout(() => {
                document.body.innerHTML += poison_nausea;
            }, delayInMilliseconds));
            return;
        }
    });
    
});
