<?php
include 'init.php';
$conn = new mysqli($host,$db_user,$db_password,$db_name);
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM fcm_notifi";
$result = $conn->query($sql);
if ($result->num_rows >0) {
 while($row[] = $result->fetch_assoc()) {
 $item = $row;
 $json = json_encode($item);
 }
} else {
 echo "No Results Found.";
}
 echo $json;
 $conn->close();
?>
