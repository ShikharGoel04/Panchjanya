document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "e7e07ed1739446638a1536a1cb32ea1f", divId: "adobe-dc-view"});
    adobeDCView.previewFile({
        content:{location: {url: "https://utkarshbharat.s3.amazonaws.com/organizer/magazine/organiser_Magazine_February_7_2021.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIFMNG5PYYJFCAERA%2F20210202%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210202T191003Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=21c6fa6a44109c313a05b21ef84ee603df2237c6397f38b7187123147d499b2e"}},
        metaData:{fileName: "Organiser 07 February 2021"}
    }, {showLeftHandPanel: false, showDownloadPDF: false, showPrintPDF: false});
});