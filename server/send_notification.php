<?php
  require "init.php";
  $title = $_POST['title'];
  $message = $_POST['message'];
  $path_to_fcm = 'https://fcm.googleapis.com/fcm/send';
  $server_key = 'AAAALC2Wgmo:APA91bGGBkSOl2Pv_xXp41iY8bAH4TXNmpnrJHN9DRPoSMMKVlXjVqoZPqhaNVrFG9vZoyMRMPDp6c0Rv5t0PJsZEuskzOsvYO0ADb8Vi8vIe7xX6l6IA4LeDrTHlyZvI2CMWFDq6nkZ';
  $sql = "select token from fcm_info";
  $result = mysqli_query($con,$sql);
  $row = mysqli_fetch_row($result);
  $key = $row[0];

  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  $Sql_Query = "INSERT INTO fcm_notifi (title, message) VALUES ('$title','$message')";

  if(mysqli_query($con,$Sql_Query)){
    $MSG = 'Record Successfully Inserted Into MySQL Database.' ;
    $json = json_encode($MSG);
      echo $json ;
    }
    else{
      echo 'Try Again';
    }


  $headers = array(
    'Authorization:key=' .$server_key,
    'Content-Type:application/json'
  );
  $fields = array ('to'=>$key,
                  'notification'=> array('title'=>$title, 'message'=>$message));

  $payload = json_encode($fields);
  $curl_session = curl_init();
  curl_setopt( $curl_session,CURLOPT_URL, $path_to_fcm );
  curl_setopt( $curl_session,CURLOPT_POST, true );
  curl_setopt( $curl_session,CURLOPT_HTTPHEADER, $headers );
  curl_setopt( $curl_session,CURLOPT_RETURNTRANSFER, true );
  curl_setopt( $curl_session,CURLOPT_SSL_VERIFYPEER, false );
  curl_setopt( $curl_session,CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4 );
  curl_setopt( $curl_session,CURLOPT_POSTFIELDS, $payload );

  $result = curl_exec($curl_session);
  curl_close($curl_session);
  mysqli_close($con);
?>
