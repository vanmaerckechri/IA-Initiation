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
	    <meta property="og:url" content="https://cvmdev.be/productions/iainit/<?=$og_page ?? ''?>">
		<meta property="og:site_name" content="IA Init">
		<meta property="og:title" content="<?=$content_title ?? ''?>">
		<meta property="og:description" content="<?=$meta_description ?? ''?>">
		<meta property="og:image:width" content="1200">
		<meta property="og:image:height" content="630">
		<meta property="og:image" content="https://cvmdev.be/productions/iainit/meta_social.png">
		<meta property="og:image:alt" content="HAL9000, IA du film 2001 l'Odyssée de l'espace">
		<!--Favicon and Color-->
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
		<link rel="icon" href="favicon.ico" type="image/x-icon">
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
					<a href="."><img src="assets/images/main_logo.svg" alt="HAL9000, IA du film 2001 l'Odyssée de l'espace"></a>
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
				<a href="https://cvmdev.be"><img src="assets/images/social-cvm.svg" alt="logo du site cvmdev.be"></a>
	    	</div>
	    </footer>
	    <script type="text/javascript" src="js/Namespaces.js"></script>
	    <script type="text/javascript" src="js/tools/DomManager.js"></script>
	    <script type="text/javascript" src="js/modules/Backtotop.js"></script>
	    <?=$content_jsClasses ?? ''?>
	</body>
</html>