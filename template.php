<!DOCTYPE html>
<html lang="fr">
<head prefix="og: https://ogp.me/ns#">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="<?=$meta_description ?? ''?>">
    <!--Facebook and Twitter-->
    <meta property="og:locale" content="fr_FR">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://cvm.one/iainit/<?=$og_page ?? ''?>">
	<meta property="og:site_name" content="IA Init">
	<meta property="og:title" content="<?=$content_title ?? ''?>">
	<meta property="og:description" content="<?=$meta_description ?? ''?>">
	<meta property="og:image:width" content="1024">
	<meta property="og:image:width" content="1024">
	<meta property="og:image" content="https://cvm.one/iainit/meta_social.png">
	<meta property="og:image:alt" content="HAL9000, IA du film 2001 l'Odyssée de l'espace">
	<!--Favicon-->
	<link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
	<link rel="manifest" href="manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<!--Stylesheet-->
	<link href="https://fonts.googleapis.com/css2?family=Lexend+Peta&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<?=$content_style ?? ''?>
    <title><?=$content_title ?? ''?></title>
</head>
<body>
	<header>
		<div class="container-large">
			<div class="mainLogo-container">
				<a href="index.php"><img src="assets/images/main_logo.svg" alt="HAL9000, IA du film 2001 l'Odyssée de l'espace"></a>
				<?=$content_h1 ?? ''?>
			</div>
		</div>
		<nav>
			<div class="container">
			</div>
		</nav>
	</header>
	<div id="main" class="main"><?=$content_main ?? ''?></div>
    <footer>
    	<div class="container-large">
    		<div>
    			<a href="https://github.com/vanmaerckechri" target="_blank" rel="noopener"><img src="assets/images/social-github.svg" alt="logo de github"></a>
				<a href="https://be.linkedin.com/in/christophe-van-maercke" target="_blank" rel="noopener"><img src="assets/images/social-linkedin.svg" alt="logo de linkedin"></a>
			</div>
			<a href="https://cvm.one"><img src="assets/images/social-cvm.svg" alt="logo du site cvm.one"></a>
    	</div>
    </footer>
    <script type="text/javascript" src="js/Namespaces.js"></script>
    <script type="text/javascript" src="js/tools/DomManager.js"></script>
    <script type="text/javascript" src="js/modules/Backtotop.js"></script>
    <?=$content_jsClasses ?? ''?>
</body>
</html>