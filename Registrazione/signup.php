<?php

    require_once '../query.php';

    session_start();

    if (!empty($_SESSION['id'])) {
        header("Location: ../Esplora/explore.php");
        exit;
    }

    $error = array();

    if(!empty($_POST['username']) && !empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['passwordCheck'])){
        $conn = mysqli_connect("localhost", "root", "", "test") or die("Errore: ".mysql_connect_error());

        if(!preg_match("/^[a-zA-Z0-9_]{1,16}$/", $_POST['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $query = checkUsername($username);
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Username già utilizzato";
            }
        }

        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $query = checkEmail($email);
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }

        if (strlen($_POST["password"]) < 8) {
            $error[] = "Lunghezza password insufficiente";
        }

        if (!preg_match("/[@$!%*?&]/", $_POST['password'])) {
            $errors[] = "La password deve contenere almeno un carattere speciale";
        }

        if (!preg_match("/[A-Z]/", $_POST['password'])) {
            $errors[] = "La password deve contenere almeno un carattere maiuscolo";
        }

        if (strcmp($_POST["password"], $_POST["passwordCheck"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        if(!empty($_POST['proPic'])){
            $proPic = mysqli_real_escape_string($conn, $_POST['proPic']);
        }
        else{
            $imgPath = "../Immagini/listen.png";
            $proPic = mysqli_real_escape_string($conn, $imgPath);
        }

        if (count($error) == 0){
            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = insertQuery($username, $email, $password, $proPic);
            $res = mysqli_query($conn, $query);
            if($res){
                $_SESSION['utente'] = $_POST['username'];
                $_SESSION['proPic'] = $_POST['proPic'];
                $_SESSION['id'] = mysqli_insert_id($conn);
                echo "../Login/login.php";
                mysqli_close($conn);
                exit;
            }
            else{
                $error[] = "Impossibile raggiungere il database";
            }
        }
        mysqli_close($conn);
    }
    else{
        $error[] = "Ci sono campi vuoti";
    }
?>

<html>
    <head>
        <meta charset="utf-8">
        <title>Senutia - Accedi</title>
        <link rel="stylesheet" href="signup.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="signup.js" defer></script>
        <script src="search.js" defer></script>
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

            <div id="registrationPage">

                <h1>
                    CREA ACCOUNT
                </h1>

                
                <form id="formRegistration" method="POST">
                    <div id="firstPage">
   
                        <div class="inputBox">
                            <p class="inputError hidden"></p>
                            <input type="text" name="username" class="textBox" placeholder="Scegli un nome utente"
                            <?php 
                                if(!empty($_POST["username"])){
                                    echo "value=".$_POST["username"];
                                }
                            ?>>
                        </div>
    
                        <div class="inputBox">
                            <p class="inputError hidden"></p>
                            <input type="text" name="email" class="textBox" placeholder="Inserisci la tua email"
                            <?php 
                                if(!empty($_POST["email"])){
                                    echo "value=".$_POST["email"];
                                }
                            ?>>
                        </div>
    
                        <div class="inputBox">
                            <div>
                                <p class="inputError hidden"></p>
                                <input type="password" name="password" class="textBox" placeholder="Password" autocomplete="on">
                            </div>
                        </div>
    
                        <div class="inputBox">
                            <div>
                                <p class="inputError hidden"></p>
                                <input type="password" name="passwordCheck" class="textBox" placeholder="Ripeti la password" autocomplete="on">
                            </div>
                        </div>

                        <div class="goToSecondPage">
                            <p>
                                 Avanti
                            </p>
                        </div>

                        <div id="containerShortcut">
                            <p>
                                Hai già un account?
                                <a href="../Login/login.php">Accedi</a>
                            </p>
                        </div>
                            
                    </div>

                    <div id="secondPage" class="hidden">

                        <div id="searchParagraph">
                            <p>
                                Scegli i tuoi artisti preferiti:
                            </p>
                            
                            <div id="spotifySearch">
                                <div class="inputBox">
                                    <input type="text" name="search" id="artistSearch" class="textBox" placeholder="Cerca" autocomplete="off">
                                </div>
                                <div><img src="../Immagini/searchWhite.png" alt=""></div>
                            </div>
                        </div>

                        

                        <div id="artistList">
                            <div id="searchResult">
                                <div class="artist">
                                    
                                </div>
                            </div>

                            <p id="choices" class="hidden">Le tue scelte:</p>

                            <div id="favouriteArtists">
                                
                            </div>
                            <p id="maxArtistError" class="hidden"></p>
                        </div>

                        <div class="pageSelection">
                            <div class="goToFirstPage">
                                <p>
                                     Indietro
                                </p>
                            </div>

                            <div class="goToThirdPage">
                                <p>
                                     Avanti
                                </p>
                            </div>
                        </div>

                    </div>

                    <div id="thirdPage" class="hidden">
                        <div>
                            <p>
                                Scegli un'immagine di profilo:
                            </p>
                        </div>

                        <div class="inputBox">
                            <input type="text" name="proPic" class="textBox" placeholder="Inserisci l'url a un'immagine">
                        </div>

                        <div id="checkboxContainer">
                            <div id="checkbox">
                                <div id="tick" class=""></div>
                            </div>
                            Accetto i&nbsp;<em>termini di servizio</em>
                        </div>
                        <p id="agreementError" class="hidden"></p>

                        <div class="pageSelection">
                            <div class="goBackToSecondPage">
                                <p>
                                     Indietro
                                </p>
                            </div>

                            <div>
                                <input type="submit" id="registerButton" value="Registrati">
                            </div>  
                        </div>

                    </div>
                        
                </form>
                

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