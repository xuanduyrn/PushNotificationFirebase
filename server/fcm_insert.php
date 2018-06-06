<?php
  require "init.php";

  $con = mysqli_connect($host,$db_user,$db_password,$db_name);
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $token = $obj['token'];
  $Sql_Query = "insert into fcm_info (token) values ('$token')";


  if(mysqli_query($con,$Sql_Query)){
    $MSG = 'Record Successfully Inserted Into MySQL Database.' ;
    $json = json_encode($MSG);
     echo $json ;
     }
     else{
     echo 'Try Again';
     }
     mysqli_close($con);
?>
