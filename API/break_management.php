<?php
include "db_connection.php"; 

class BreakManagement {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
        date_default_timezone_set('Asia/Kolkata');
    }

    public function breakStart($id, $seconds) {
        $id = mysqli_real_escape_string($this->conn, $id);
        $seconds = mysqli_real_escape_string($this->conn, $seconds); 
    
       
        $sql = "SELECT * FROM user_attendance WHERE emp_id=$id AND DATE = CURRENT_DATE()";
        $result = mysqli_query($this->conn, $sql);

        $row =  mysqli_fetch_row($result);
        
        $attendance_id =  $row[0];

        $sql = "INSERT INTO user_break_log (user_attendance_id, start_date_time, end_date_time, second) VALUES ($attendance_id, NOW(), NULL, $seconds)";
        
        if (mysqli_query($this->conn, $sql)) {
            return ["status" => 1, "message" => "Break Started Successfully"];
        } else {
            return ["status" => 0, "errors" => "Error during break start: " . mysqli_error($this->conn)];
        }
    }    


    public function breakEnd($id) {
        $id = mysqli_real_escape_string($this->conn, $id);
    
        $sql = "SELECT * FROM user_attendance WHERE emp_id=$id AND DATE = CURRENT_DATE()";
        $result = mysqli_query($this->conn, $sql);
        $row = mysqli_fetch_assoc($result); 
        $attendance_id =  $row['id'];

        $sql = "SELECT start_date_time FROM user_break_log WHERE user_attendance_id = $attendance_id AND end_date_time  IS NULL";
        $checkResult = mysqli_query($this->conn, $sql);
        

        if (mysqli_num_rows($checkResult) > 0) {
            
    
            $row = mysqli_fetch_assoc($checkResult);
           
            $startDateTime = $row['start_date_time'];
            $endDateTime = date('Y-m-d H:i:s'); 
    
         
            $duration = strtotime($endDateTime) - strtotime($startDateTime);
    
            $updateSql = "UPDATE user_break_log SET end_date_time = NOW(), second = $duration WHERE user_attendance_id = $attendance_id AND  end_date_time IS NULL";
            
            if (mysqli_query($this->conn, $updateSql)) {
                return ["status" => 1, "message" => "Break ended successfully.",  "break_duration" => $duration];
            } else {
                return ["status" => 0, "errors" => "Error during break end: " . mysqli_error($this->conn)];
            }
        } else {
            return ["status" => 0, "errors" => "You are not currently on a break."];
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

if (!$id) {
    echo json_encode(["status" => 0, "errors" => "User ID is required."]);
    exit;
}

$breakManagement = new BreakManagement($conn);

$action = $data->action ?? null;
if ($action === 'start') {
    $seconds = $data->seconds ?? 00; 
    echo json_encode($breakManagement->breakStart($id, $seconds));  
} elseif ($action === 'end') {
    echo json_encode($breakManagement->breakEnd($id));
} else {
    echo json_encode(["status" => 0, "errors" => "Invalid action."]);
}
?>
