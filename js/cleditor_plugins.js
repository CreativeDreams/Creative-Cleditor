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