<?php 
    require_once '../query.php';

    /*if (!isset($_GET["q"])) {
        echo "Non dovresti essere qui";
        exit;
    }*/

    header('Content-Type: application/json');
    
    $conn = mysqli_connect("localhost", "root", "", "test") or die("Errore: ".mysql_connect_error());
    $email = mysqli_real_escape_string($conn, $_GET["q"]);
    $query = checkEmail($email);
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    echo json_encode(array('available' => mysqli_num_rows($res) > 0 ? false : true));
    mysqli_close($conn);
?>