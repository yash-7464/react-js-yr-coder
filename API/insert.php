<?php
//  session_start();
    include "db_connection.php";
        
    header('Content-Type: application/json');

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-Width");

    $data = json_decode(file_get_contents("php://input"));


    $errors = [];
    
    // Check for empty or missing fields
    if (empty($data->first_name)) {
        $errors[] = "First name is required.";
    }
    
    if (empty($data->last_name)) {
        $errors[] = "Last name is required.";
    }
    
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

    // Sanitize and process input data
    $first_name = mysqli_real_escape_string($conn, trim($data->first_name));
    $last_name = mysqli_real_escape_string($conn, trim($data->last_name));
    $email = mysqli_real_escape_string($conn, trim($data->email));
    $password = mysqli_real_escape_string($conn, trim($data->password));
    $password = md5(trim($password));
    
    $sql = "INSERT INTO registration (first_name, last_name, email, password) VALUES ('$first_name', '$last_name', '$email', '$password')";

    if (mysqli_query($conn, $sql)) {
        // Get the last inserted user ID
        $userId = mysqli_insert_id($conn);

        
        // Store user ID in session variable
        // $_SESSION['id'] = $userId;
        // $_SESSION['username'] = "$first_name $last_name";

        echo json_encode(["status" => 1, "success" => "Record inserted successfully"]);
    } else {
        echo json_encode(["status" => 0, "error" => "Failed to insert record"]);
    }

    mysqli_close($conn);
    
?>