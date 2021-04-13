<?php

$content_title = "Ressource non Trouvée - IA Initiation";
$og_page = "404";

ob_start();?>
	<h1>IA<span>INIT (Page Introuvable!)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
<section>
	<div class="container-small"></div>
</section>
<?php $content_main = ob_get_clean();

include("template.php");
?>