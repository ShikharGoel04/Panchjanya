var data1;
function pdfplayer(data){
    alert(data);
    console.log(data);
    data1=data;

}

document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    
    var adobeDCView = new AdobeDC.View({clientId: "e7e07ed1739446638a1536a1cb32ea1f", divId: "adobe-dc-view"});
    adobeDCView.previewFile({
        content:{location: {url: data1}}
    }, {showLeftHandPanel: false, showDownloadPDF: false, showPrintPDF: false});
});