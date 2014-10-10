//==================================================================================================
//                                    CLEDITOR PLUGINS
//
// You can add here the javascript code of your cleditor plugins
// For more information please view:
// http://premiumsoftware.net/cleditor/plugins
//==================================================================================================

//==================================================================================================
//                                      QUOTE BUTTON
//==================================================================================================

$.cleditor.buttons.quote = {
    name: "quote",
    image: "quote.gif",
    //css: {
        //backgroundImage: URL,
        //backgroundPosition: "-768px center"
    //},
    title: "Quote",
    command: "indent",
    buttonClick: function(e, data) {
        var elem = getParentOfRange(data.editor);
        while(elem && elem.tagName != 'BODY') {
            if(elem.tagName == 'BLOCKQUOTE') {
                data.command = "outdent";
                break;
            }
        elem = elem.parentNode;
        }
    }
};

// getParent Element of Range
function getParentOfRange(editor) {
    var r = getRange(editor);
    if ($.browser.msie) return r.parentElement()
    return r.commonAncestorContainer
}

// getRange - gets the current text range object
function getRange(editor) {
    if ($.browser.msie) return getSelection(editor).createRange();
    return getSelection(editor).getRangeAt(0);
}

// getSelection - gets the current text range object
function getSelection(editor) {
    if ($.browser.msie) return editor.doc.selection;
    return editor.$frame[0].contentWindow.getSelection();
}

// Add the button to the default controls after the strikethrough button
$.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace("strikethrough", "strikethrough quote");


//==================================================================================================
//                                      IMAGE UPLOAD BUTTON
//==================================================================================================

// Define the image_upload button
$.cleditor.buttons.image_upload = {
    name: "image_upload",
    css: {
        //backgroundImage: URL,
        backgroundPosition: "-552px center"
    },
    title: "Insert Image",
    command: "inserthtml",
    popupName: "image_upload",
    popupClass: "cleditorPrompt",
    popupContent: '<label>Local Image:</label><br><input id="local_image" type="button" value="Browse" style="float: left;"><div id="image_upload_loader" style="float: left; margin-left: 10px; padding-top: 3px;"></div><br>&nbsp;<div style="clear: both; border-bottom: 1px dotted #ccc; margin: 10px 0;"></div><label>Enter URL:<br /><input type="text" value="http://" style="width:200px" /></label><br /><input id="server_image" type="button" value="Submit" />',
    buttonClick: imageUploadButton
};

// Hides the image upload wrapper
$(function(){
    $('.ImageUploadWrapper').hide();

    // Adds this class so that the popup doesn't close when browsing the images
    $('.ImageUploadWrapper').addClass('cleditorPrompt');

    // Add the button to the default controls replacing the old image button for the new image upload button
    if($('.ImageUploadWrapper').length)
        $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace("image", "image_upload");

});

// Handle the image_upload button click event
function imageUploadButton(e, data) {

    // Wire up the submit button click event
    $("#server_image")
    .unbind("click")
    .bind("click", function(e) {

        // Get the editor
        var editor = data.editor;

        // Get the entered name
        var name = $(data.popup).find(":text").val();

        // Insert some html into the document
        var html = '<img src="' + name + '">';
        editor.execCommand(data.command, html, null, data.button);

        // Hide the popup and set focus back to the editor
        editor.hidePopups();
        editor.focus();

    });

    $("#local_image")
    .unbind("click")
    .bind("click", function(e) {

        // Put the image loader on the popup
        $('#imageupload_loading').appendTo('#image_upload_loader');

        // Get the editor
        var editor = data.editor;

        // Trigger the imageupload button
        $('#btn_imageupload').trigger('click');

        $(editor).bind('change', function() {
            // Hide the popup and set focus back to the editor
            editor.hidePopups();
            editor.focus();
    	});

    });

}