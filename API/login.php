<?php
 include "db_connection.php";
        
 header('Content-Type: application/json');

 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-Width");

 $data = json_decode(file_get_contents("php://input"));

 $errors = [];

 if (empty($data->email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format.";
}

if (empty($data->password)) {
    $errors[] = "Password is required.";
} elseif (strlen($data->password) < 6) {
    $errors[] = "Password must be at least 6 characters.";
}

if (!empty($errors)) {
    echo json_encode(["status" => 0, "errors" => $errors]);
    return;
}

$email = mysqli_real_escape_string($conn, trim($data->email));
$password = mysqli_real_escape_string($conn, trim(md5($data->password)));

$sql = mysqli_query($conn,"SELECT * FROM registration WHERE email = '$email'");


if(mysqli_num_rows($sql) > 0){

    $row = mysqli_fetch_assoc($sql);

    $id = $row['id'];
    $db_pass = $row['password'];
    $fname = $row["first_name"];
    $lname = $row["last_name"];
    $username = $fname. " ".$lname;

    if($db_pass == $password){
        $sql = "SELECT * FROM user_attendance WHERE emp_id=$id AND DATE(check_in) = CURRENT_DATE()";
        $result = mysqli_query($conn, $sql);
        $empRecord = mysqli_fetch_assoc($result);
        $checkIn = $empRecord["date"] ?? null;

        $formattedDate = date('D M d Y', strtotime($checkIn));
        echo json_encode([
            "status" => 1,
            "success" => "Login Successful",
            "id" => $id,
            "username" => $username,
            "CheckInDate" => $formattedDate
        ]);
        
    }else {
        echo json_encode(["status" => 0, "error" => "Invalid password."]);
    }
}
else{
    $errors[] = "Email not found";
    echo json_encode(["status" => 0,  "errors" => $errors]);
}
// print_r($_SESSION);
// die;

?>