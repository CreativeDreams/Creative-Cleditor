//==================================================================================================
//                                          SETTINGS
//==================================================================================================
var cleditor_config = {
    width:      "100%", // width not including margins, borders or padding
    height:     "auto", // height not including margins, borders or padding ('auto' - will activate the autogrow)
    controls: // controls to add to the toolbar
                "bold italic underline strikethrough subscript superscript | font size " +
                "style | color highlight removeformat | bullets numbering | outdent " +
                "indent | alignleft center alignright justify | undo redo | " +
                "rule image link unlink | cut copy paste pastetext | print source",
    colors: // colors in the color popup
                "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                "666 900 C60 C93 990 090 399 33F 60C 939 " +
                "333 600 930 963 660 060 366 009 339 636 " +
                "000 300 630 633 330 030 033 006 309 303",
    fonts: // font names in the font popup
                "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
    sizes:      "1,2,3,4,5,6,7",     // sizes in the font size popup
    styles: // styles in the style popup
                [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
                ["Header 3", "<h3>"],  ["Header 4","<h4>"],  ["Header 5","<h5>"],
                ["Header 6","<h6>"]],
    useCSS:     false, // use CSS to style HTML when possible (not supported in ie)
    docType:    "<!DOCTYPE html>", // Document type contained within the editor
    docCSSFile: "", // CSS file used to style the document contained within the editor
    bodyStyle:  "margin:4px; font:10pt Arial,Verdana; cursor:text" // style to assign to document body contained within the editor
}
//==================================================================================================

// Merge the new config with the default config
$.extend($.cleditor.defaultOptions,cleditor_config);

$(function(){

    // Smoother initialization
    $('.cleditorMain').css('visibility','hidden');
    $('.EditCommentForm textarea.TextBox,.CommentForm textarea.TextBox').css('display','none');

    $.cleditor.defaultOptions.docCSSFile = cleditor_doc_css_file;

    // if there is no css define for the content the the css of the content will equal than the container (.cleditorMain)
    if($.cleditor.defaultOptions.docCSSFile==''){

        $('body').append('<div id="cleditorMainTmp" class="cleditorMain" style="display: none;"></div>');

        var bodyStyle = 'background: transparent !important; cursor:text !important; margin: 0 !important; padding: 0 !important;';
        bodyStyle += ' font-size: '+$('.cleditorMain').css('font-size')+';';
        bodyStyle += ' font-family: '+$('.cleditorMain').css('font-family').replace(/\"/g, "'")+';';
        bodyStyle += ' font-weigth: '+$('.cleditorMain').css('font-weight')+';';
        bodyStyle += ' font-style: '+$('.cleditorMain').css('font-style')+';';
        bodyStyle += ' line-height: '+$('.cleditorMain').css('line-height')+';';
        bodyStyle += ' color: '+$('.cleditorMain').css('color')+';';
        $.cleditor.defaultOptions.bodyStyle = bodyStyle;

        $('#cleditorMainTmp').remove();
    }

    // Attach the editor to comment boxes.
    $("textarea.BodyBox").livequery(function() {
        var frm = $(this).closest("form");

        ed = $(this).cleditor()[0];
        this.editor = ed; // Support other plugins!
        $(frm).bind("clearCommentForm", {editor:ed}, function(e) {
            frm.find("textarea").hide();
            e.data.editor.clear();
        });

        // Autogrow
        var iframe_aux = frm.find("iframe");
        $(iframe_aux).load(function() {
            if($.cleditor.defaultOptions.height=='auto')
                $(iframe_aux).height($(iframe_aux).contents().find("body").height() + parseInt($(iframe_aux).css('padding-top')) + parseInt($(iframe_aux).css('padding-bottom')) + parseInt($(iframe_aux).contents().find("body").css('line-height')));
            frm.find(".cleditorMain").css('visibility','visible');
        });
        if($.cleditor.defaultOptions.height=='auto'){
            $(ed).bind("change",function(){
                var iframe_aux = frm.find("iframe");
                if($(iframe_aux).height()!=$(iframe_aux).contents().find("body").height() + parseInt($(iframe_aux).contents().find("body").css('line-height')))
                    $(iframe_aux).height($(iframe_aux).contents().find("body").height() + parseInt($(iframe_aux).css('padding-top')) + parseInt($(iframe_aux).css('padding-bottom')) + parseInt($(iframe_aux).contents().find("body").css('line-height')));
            });
            $(window).bind("resize.cleditor", function () {
                var iframe_aux = frm.find("iframe");
                $(iframe_aux).height($(iframe_aux).contents().find("body").height() + parseInt($(iframe_aux).css('padding-top')) + parseInt($(iframe_aux).css('padding-bottom')) + parseInt($(iframe_aux).contents().find("body").css('line-height')));
            });
            $('.cleditorButton[title="Show Source"]').click(function(){
                var iframe_aux = frm.find("iframe");
                var new_content_height = $(iframe_aux).contents().find("body").height() + parseInt($(iframe_aux).contents().find("body").css('line-height'));
                if(new_content_height>0 && $(iframe_aux).height()!=new_content_height)
                    $(iframe_aux).height($(iframe_aux).contents().find("body").height() + parseInt($(iframe_aux).css('padding-top')) + parseInt($(iframe_aux).css('padding-bottom')) + parseInt($(iframe_aux).contents().find("body").css('line-height')));
            });
        }
    });

});