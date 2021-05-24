<?php

    session_start();

    $client_id = 'a68eeeab630945549b8256bd1a84af98';
    $client_secret = '16b77034fd4c4fd392fdf275e679e2fe';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://accounts.spotify.com/api/token");
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    $headers = array("Authorization: Basic ".base64_encode($client_id.":".$client_secret));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    $decoded = json_decode($result);
    print_r($decoded->access_token);
    $_SESSION['token'] = $decoded->access_token;
    curl_close($curl);

?>