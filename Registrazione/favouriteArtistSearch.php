<?php

    $client_id = 'a68eeeab630945549b8256bd1a84af98';
    $client_secret = '16b77034fd4c4fd392fdf275e679e2fe';

    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data);

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://accounts.spotify.com/api/token");
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    $headers = array("Authorization: Basic ".base64_encode($client_id.":".$client_secret));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    curl_close($curl);


    $token = json_decode($result)->access_token;
    $data = http_build_query(array("q" => $decoded_data->key0, "type" => "artist", "limit" => "3"));
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/search?".$data);
    $headers = array("Authorization: Bearer ".$token);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    echo json_encode($result);
    curl_close($curl);

?>