<?php

    function loginQuery($loginVar, $username){
        $query = "select * from users where $loginVar = '$username'";
        return $query;
    }

    function insertQuery($name, $email, $password, $proPic){
        $query = "insert into users(username, email, password, proPic) values('$name', '$email','$password', '$proPic')";
        return $query;
    }

    function checkUsername($username){
        $query = "SELECT username FROM users WHERE username = '$username'";
        return $query;
    }

    function checkEmail($email){
        $query = "SELECT email FROM users WHERE email = '$email'";
        return $query;
    }

    function getFavouriteArtist($id){
        $query = "SELECT artistID from favouriteIDs WHERE userID = '$id'";
        return $query;
    }

?>