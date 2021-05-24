<?php

    require_once '../query.php';

    session_start();

    if (isset($_SESSION['utente'])) {
        header("Location: ../Esplora/explore.php");
    exit;
    }

    if (isset($_POST['username']) && isset($_POST['password'])) {
        $conn = mysqli_connect("localhost", "root", "", "test") or die("Errore: " . mysql_connect_error());

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $loginVar = filter_var($username, FILTER_VALIDATE_EMAIL) ? "email" : "username";

        $query = loginQuery($loginVar, $username);
        $res = mysqli_query($conn, $query) or die("Errore: " . mysqli_error($conn));
        
        if (mysqli_num_rows($res) > 0) {
            $resultRow = mysqli_fetch_array($res);
            if (password_verify($_POST['password'], $resultRow['password'])) {
                $_SESSION['id'] = $resultRow['id'];
                $_SESSION['proPic'] = $resultRow['proPic'];
                $_SESSION['utente'] = $resultRow['username'];
                header("Location: ../Esplora/explore.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        $error = "Attenzione! Username/email e/o password errati.";
    }

?>

<html>

    <head>
    <meta charset="utf-8">
        <title>Senutia - Accedi</title>
        <link rel="stylesheet" href="login.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="login.js" defer></script>
    </head>

    <body>

        <nav>
            <div id="logo">
                <img src="../Immagini/logo.png" alt="">
            </div>
    
            <div id="links">
                <a href="../Home/mhw1.html" class="test">
                    Home
                </a>
                <a href="../Esplora/mhw3.html" class="test">
                    Artisti
                </a>
            </div>
        </nav>
    
        <section>
            <div id="formLogin">

                <img src="../Immagini/logo.png" alt="">

                <form name="loginForm" action="" method="POST">
                    <div class="inputBox">
                        <input type="text" name="username" class="textBox" placeholder="Username or email" autocomplete="on">
                    </div>

                    <div class="inputBox">
                        <div>
                            <input type="password" name="password" class="textBox" placeholder="Password" autocomplete="on">
                        </div>
                    </div>

                    <div id="inputAlert" class="inputAlertMessage hidden">
                        Attenzione! Inserire username/email e password.
                    </div>

                    <?php

                        if (isset($error)) {
                            echo "<div class='inputAlertMessage'>$error</div>";
                        }
                
                    ?>

                    <div>
                        <input type="submit" id="loginButton" value="Accedi">
                    </div>
                </form>
                

                <div id="containerShortcut">
                    <p>
                        <a href="../Registrazione/signup.php">Registrati</a>
                    </p>
                </div>

            </div>
        </section>

        <section id="infoView" class="hidden">
            <div>
                <p id="infoTitle">Info utili</p>
                <p><strong>Autore:</strong> Matteo Casabene</p>
                <p><strong>Matricola:</strong> O46002216</p>
                <p><strong>Anno Accademico:</strong> 2020/2021</p>
                <p><strong>Università:</strong> Università degli Studi di Catania</p>
                <p id="closeInfo">Chiudi</p>
            </div>
        </section>

        <footer>
            <div>
                <img src="../Immagini/footer.png" alt="">
            </div>

            <div>
                <p id="infoButton">
                    Info
                </p>
            </div>
        </footer>

    </body>

</html>