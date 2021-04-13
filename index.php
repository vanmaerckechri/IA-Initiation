<?php
$url = !empty($_GET['url']) ? $_GET['url'] : "accueil";
$view = 'views/' . $url . '.php';

if (!file_exists($view))
{
    header('HTTP/1.1 404 Not Found');
    include('views/404.php');
    exit();
}
include $view;
?>