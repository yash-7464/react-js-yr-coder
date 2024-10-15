<?php
include "db_connection.php"; 

class CheckInOut {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function checkIn($id) {
        $id = mysqli_real_escape_string($this->conn, $id);
        echo "Checking in user with ID: $id";

        $sql = "SELECT * FROM user_attendance WHERE emp_id=$id AND DATE(check_in) = CURRENT_DATE()";
        $result = mysqli_query($this->conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            return ["status" => 0, "errors" => "You are already checked in today."];
        }

       
        $sql = "INSERT INTO user_attendance (emp_id, date, check_in, check_out,  status) VALUES($id, CURRENT_DATE(), CURRENT_TIME(), NULL, 'p')";
     
        if (mysqli_query($this->conn, $sql)) {
           
            $lastId = mysqli_insert_id($this->conn);
            $checkInSql = "SELECT check_in FROM user_attendance WHERE id = $lastId";
            $checkInResult = mysqli_query($this->conn, $checkInSql);
            $checkInRow = mysqli_fetch_assoc($checkInResult);
        
            return [
                "status" => 1,
                "message" => "Checked in successfully.",
                "checkInDate" => $checkInRow['check_in']
            ];
        } else {
            return [
                "status" => 0,
                "errors" => "Error during check-in: " . mysqli_error($this->conn)
            ];
        }
        
    }

    public function checkOut($id, $checkOutTime) {
        $id = mysqli_real_escape_string($this->conn, $id);
        
     
        $sql = "SELECT check_in FROM user_attendance WHERE emp_id = $id AND DATE(check_in) = CURRENT_DATE()";
        $result = mysqli_query($this->conn, $sql);
    
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $checkInTime = $row['check_in'];
            $totalHours = (strtotime($checkOutTime) - strtotime($checkInTime)) / 3600; // Convert seconds to hours
    
            $status = ($totalHours < 4) ? 'LWP' : 'P'; 

            $sql = "UPDATE user_attendance SET check_out = CURRENT_TIME(), status = '$status' WHERE emp_id = $id AND DATE(check_in) = CURRENT_DATE()";
            
            if (mysqli_query($this->conn, $sql)) {
                return ["status" => 1, "message" => "Checked out successfully."];
            } else {
                return ["status" => 0, "errors" => "Error during check-out: " . mysqli_error($this->conn)];
            }
        } else {
            return ["status" => 0, "errors" => "You have not checked in today."];
        }
    }
    
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null; 
$status = $data->status ?? null; 
$checkIn = $data->checkIn ?? null;

if (!$id) {
    echo json_encode(["status" => 0, "errors" => "User ID is required."]);
    exit;
}

$checkInOut = new CheckInOut($conn);

if (isset($data->checkOut) && $data->checkOut) {
    echo json_encode($checkInOut->checkOut($id, $status));
} else {
    echo json_encode($checkInOut->checkIn($id, $checkIn));
}
?>
