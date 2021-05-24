<?php

    require_once '../query.php';

    session_start();

    if(!isset($_SESSION['id'])){
        echo "Effettua l'accesso e riprova, anche se...";
        exit;
    }

    if (isset($_SESSION['id'])) {
        $conn = mysqli_connect("localhost", "root", "", "test") or die("Errore: " . mysql_connect_error());

        $query = getFavouriteArtist($_SESSION['id']);
        $res = mysqli_query($conn, $query) or die("Errore: " . mysqli_error($conn));

        $json = array();
        
        if (mysqli_num_rows($res) > 0) {
            $token = $_SESSION['token'];

            while($row =  mysqli_fetch_object($res)){
                $curl = curl_init();
                curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/artists/".$row->artistID."/related-artists");
                $headers = array("Authorization: Bearer ".$token);
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
                $result = curl_exec($curl);
                $json[] = $result;
                curl_close($curl);
            }
            echo json_encode($json);
            mysqli_free_result($res);
            mysqli_close($conn);
        }
    }

?>