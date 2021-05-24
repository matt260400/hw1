<?php

    session_start();

    if (empty($_SESSION['id'])) {
        header("Location: ../Login/login.php");
        exit;
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Senutia - Esplora</title>
        <link rel="stylesheet" href="exploreMain.css">
        <link rel="stylesheet" href="exploreMainPage.css">
        <link rel="stylesheet" href="exploreSearch.css">
        <link rel="stylesheet" href="exploreLyrics.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="exploreMainPage.js" defer></script>
        <script src="exploreSearch.js" defer></script>
        <script src="exploreLyrics.js" defer></script>
    </head>

    <body>
        <section id="mainPage">
            <nav id="navbar">
                <form id="searchBar" method="post">
                    <input type="text" id="search" name="search" class="textBox" placeholder="Cerca brani, artisti e album" autocomplete="on">
                </form>
                <div id="profile">
                    <div class="proPicUsername">
                        <p id="proPicImage">
                            <img src= <?php echo $_SESSION['proPic'];?> alt="">
                        </p>

                        <?php
                            echo "<p>".$_SESSION['utente']."</p>";
                        ?>
                        <div id="triangle" class="triangleUp">
                            
                        </div>
                    </div>

                    <div id="rapidSettings" class="hideSettings">
                        <a href="../logout.php">Logout</a>
                        <p><img src="../Immagini/link.png" alt=""></p>
                    </div>
                </div>
            </nav>

            <div class="line"></div>

            <section id="mainPageContent">
                <div id="loadingGIF" class="hidden">
                    <img src="../Immagini/loading.gif" alt="">
                    <p>
                        Attendi mentre carichiamo la tua bellissima <sup>[nessuna fonte]</sup> homepage!
                    </p>
                </div>

                <div id="customContents">
                    <h1>Ecco alcuni brani dai tuoi artisti preferiti:</h1>

                    <div id="favouriteArtistsTopTracks">

                    </div>

                    <div id="scroll">
                        <div title="Scorri a sinistra" id="scrollButtonLeft" class="arrow"></div>
                        <div title="Scorri a destra" id="scrollButtonRight" class="arrow"></div>
                    </div>

                    <div class="line"></div>

                    <h1>Ecco alcuni album dai tuoi artisti preferiti:</h1>

                    <div id="favouriteArtistsAlbums">

                    </div>

                    <div class="line"></div>

                    <h1>Artisti che potrebbero piacerti:</h1>

                    <div id="suggestedArtists">

                    </div>

                </div>

                <div id="searchResultsSpotify" class="hidden">
                    <div id="albumSearchResult" class="">
                            <h1 class="type">Album</h1>
                            <div class="resultsCard">
                                                
                            </div>
                        </div>

                    <div id="trackSearchResult" class="">
                            <div class="line"></div>
                            <h1 class="type">Brani</h1>
                            <div class="resultsCard">

                            </div>
                        </div>

                    <div id="artistSearchResult" class="">
                        <div class="line"></div>
                        <h1 class="type">Artisti</h1>
                        <div class="resultsCard">
                            
                        </div>
                    </div>

                    <div id="searchInfo">
                        <div>
                            <p>Search powered by</p>
                            <img src="../Immagini/spotifyLogoLink.png" alt="">
                        </div>
                    </div>
                </div>

                <div id="lyrics" class="">

                </div>
            </section>
        
        </section>

        <section id="sidebar">
            <div id="sidebarContents">

                <div id="siteName">
                    Senutia
                </div>

                <div class="line"></div>

                <a href="../Home/mhw1.html">
                    <img src="../Immagini/home.png" alt="">
                    <span>Home</span>
                </a>

                <a href="../Esplora/explore.php" class="pagina_attuale">
                    <img src="../Immagini/artist.png" alt="">
                    <span>Artisti</span>
                </a>

                <a>
                    <img src="../Immagini/white_heart.png" alt="">
                    <span>Preferiti</span>
                </a>

                <div class="line"></div>

            </div>
        </section>

    </body>
</html>