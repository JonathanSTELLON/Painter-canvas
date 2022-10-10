<?php

$pic = $_POST['image'];

$pic = str_replace('data:image/png;base64,', '', $pic);
$pic = str_replace(' ', '+', $pic);
$fileData = base64_decode($pic);

// Sauvegarde

if(!file_exists('pics')){
    mkdir('pics', 0777, true);
}

$fileName = "pics/" . uniqid('pic', false) .'.png';
file_put_contents($fileName, $fileData);

echo $fileName;