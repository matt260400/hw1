<?php

    session_start();
    
    $conn = mysqli_connect("localhost", "root", "", "test") or die("Errore: " . mysql_connect_error());
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data);
    $id = mysqli_real_escape_string($conn, $_SESSION['id']);

    foreach($decoded_data as $dato){
        $escapeDato = mysqli_real_escape_string($conn, $dato);
        $query = "INSERT into favouriteIDs values('$id', '$escapeDato')";
        mysqli_query($conn, $query);
    }
    mysqli_close($conn);

?>