<?php

    include "db_connection.php";
            
    header('Content-Type: application/json');

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-Width");

    $data = json_decode(file_get_contents("php://input"));

    $holidayName = mysqli_real_escape_string($conn, trim($data->name)); 
    $startDate = mysqli_real_escape_string($conn, trim($data->startDate)); 
    $endDate = mysqli_real_escape_string($conn, trim($data->endDate)); 

    $sql = "INSERT INTO holidays(name, startDate, endDate) VALUES ('$holidayName', '$startDate', '$endDate')";

    if(mysqli_query($conn, $sql)){
        echo json_encode(["status" => 1, "success" => "Record inserted successfully"]);
    } else {
        echo json_encode(["status" => 0, "error" => "Failed to insert record"]);
    }
    mysqli_close($conn);
?>