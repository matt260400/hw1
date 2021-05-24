<?php
    session_start();
    session_destroy();

    $_SESSION['utente'] = '';

    header("Location: Login\login.php");

?>