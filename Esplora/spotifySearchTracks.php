<?php

    session_start();

    if(!isset($_SESSION['id'])){
        echo "Effettua l'accesso e riprova, anche se...";
        exit;
    }

    if (isset($_SESSION['id'])) {
        $data = file_get_contents('php://input');
        $decoded_data = json_decode($data);

        $token = $_SESSION['token'];
        $data = http_build_query(array("q" => $decoded_data->key0, "type" => "track", "limit" => "10"));
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/search?".$data);
        $headers = array("Authorization: Bearer ".$token);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        echo json_encode($result);
        curl_close($curl);
    }

?>