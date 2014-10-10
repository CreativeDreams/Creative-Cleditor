<?php if(!defined('APPLICATION')) die();

$PluginInfo['CreativeCLEditor'] = array(
    'Name'                 => 'CreativeCLEditor',
    'Description'          => 'Adds a <a href="http://premiumsoftware.net/cleditor/" target="_blank">WYSIWYG Editor</a> on discussions and comments.',
    'Version'              => '1.1',
    'PluginUrl'            => 'http://www.creativedreams.eu/creative-cleditor',
    'Author'               => "Creative Dreams",
    'AuthorEmail'          => 'sandro@creativedreams.eu',
    'AuthorUrl'            => 'http://www.creativedreams.eu',
    'RequiredApplications' => array('Vanilla' => '>=2'),
    'RequiredTheme'        => FALSE,
    'RequiredPlugins'      => FALSE,
    'HasLocale'            => FALSE,
    'RegisterPermissions'  => FALSE,
    'SettingsUrl'          => FALSE,
    'SettingsPermission'   => FALSE
);

class CreativeCLEditorPlugin extends Gdn_Plugin {

    public function Setup(){
		SaveToConfig('Garden.Html.SafeStyles', FALSE);
	}

    public function OnDisable(){
        RemoveFromConfig('Garden.Html.SafeStyles');
    }

	public function PostController_Render_Before(&$Sender) {
		$this->_AddCreativeCLEditor($Sender);
	}

	public function DiscussionController_Render_Before(&$Sender) {
		$this->_AddCreativeCLEditor($Sender);
	}

	private function _AddCreativeCLEditor($Sender) {

		$Options = array('ie' => 'gt IE 6', 'notie' => TRUE);
		$Sender->RemoveJsFile('jquery.autogrow.js');

		$Sender->AddCssFile('jquery.cleditor.css', 'plugins/CreativeCLEditor', $Options);
		$Sender->AddJsFile('jquery.cleditor.js', 'plugins/CreativeCLEditor', $Options);

        $Sender->AddJsFile('cleditor_init.js', 'plugins/CreativeCLEditor', $Options);
        $Sender->AddJsFile('cleditor_plugins.js', 'plugins/CreativeCLEditor', $Options);

        $CssInfo = AssetModel::CssPath('cleditor.css', 'plugins/CreativeCLEditor');
        $CssPath = $CssInfo ? Asset($CssInfo[1]) : '';

        $Sender->Head->AddString('<script type="text/javascript">var cleditor_doc_css_file = \''.$CssPath.'\';</script>');

   }

}