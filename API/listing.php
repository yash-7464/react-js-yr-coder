<?php
include "db_connection.php"; 

class ListingData {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Function to get all dates of the current month
    private function getAllDatesOfCurrentMonth() {
        $currentYear = date('Y');
        $currentMonth = date('m');
        
        // Get the number of days in the current month
        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $currentMonth, $currentYear);
        
        $dates = [];
        
        // Loop through each day of the current month
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $dates[] = sprintf("%04d-%02d-%02d", $currentYear, $currentMonth, $day); // Format: YYYY-MM-DD
        }
        
        return $dates;
    }

    private function getDayName($date) {
        $dateTime = new DateTime($date); // Create a DateTime object
        return $dateTime->format('l'); // Return the full name of the day (e.g., Monday)
    }

    public function Listing($id) {
        $id = mysqli_real_escape_string($this->conn, $id);
    
        // Fetch all the dates of the current month
        $currentMonthDates = $this->getAllDatesOfCurrentMonth();

      
    
        $sql = "SELECT c.id, c.emp_id, c.date, c.check_in, c.check_out, c.status, 
                       e.user_attendance_id as break_id, e.start_date_time, e.end_date_time, e.second
                FROM user_attendance AS c 
                LEFT JOIN user_break_log AS e ON c.id = e.user_attendance_id
                WHERE c.emp_id = $id ORDER BY c.date DESC";
    
        $result = mysqli_query($this->conn, $sql);
    
        // Prepare array to hold attendance data by date
        $attendanceData = [];
        
        // Populate attendance data by date
        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $date = $row['date'];
                
                // Add break seconds if this date already exists
                if (isset($attendanceData[$date])) {
                    $attendanceData[$date]['second'] += $row['second'];
                } else {
                    $attendanceData[$date] = $row;
                    $attendanceData[$date]['second'] = $row['second'] ?? 0; // Ensure break seconds are set
                }
            }
        }
    
        // Prepare final output array with all dates of the current month
        $dataByDate = [];
        $id = 1;
        $dayName="";
        foreach ($currentMonthDates as $date) {
            if (isset($attendanceData[$date])) {
                $row = $attendanceData[$date];
    
                // Handle check-in and check-out times
                $checkIn = $row['check_in'] ? new DateTime($row['check_in']) : null;
                $checkOut = $row['check_out'] ? new DateTime($row['check_out']) : null;
    
                // Calculate work hours
                if ($checkIn && $checkOut) {
                    $workInterval = $checkOut->diff($checkIn);
                    $hours = $workInterval->h;
                    $minutes = $workInterval->i;
                    $workHours = sprintf("%02d:%02d", $hours, $minutes); 
                } else {
                    $workHours = '00:00'; 
                }
    
                // Calculate break hours
                $breakSecond = $row['second'] ?? 0;
                if ($breakSecond > 0) {
                    $breakHours = gmdate("H:i", $breakSecond); // Convert seconds to HH:MM format
                } else {
                    $breakHours = '00:00';
                }

                $dayName = $this->getDayName($date);
                // echo $dayName; die;

                
    
                $dataByDate[$date] = [
                    'id' => $id,
                    'userId' => $row['emp_id'],
                    'date' => $row['date'],
                    'day' => $this->getDayName($date),
                    'check_in' => $row['check_in'] ?? 'NA',
                    'check_out' => $row['check_out'] ?? 'NA',
                    'status' => $row['status'] ?? 'NA',
                    'totalWorkHours' => $workHours,
                    'totalBreakHours' => $breakHours,
                    'attendanceDate' => $date,
                ];
            } else {
                // No data exists for this date, populate default values
                $dataByDate[$date] = [
                    'id' => $id,
                    'userId' => null, 
                    'date' => $date,
                    'day' => $this->getDayName($date),
                    'check_in' => "-",
                    'check_out' => "-",
                    'status' => $this->getDayName($date) == "Saturday" ||  $this->getDayName($date) == "Sunday" ? "WO" : "NA",
                    'totalWorkHours' => '0',
                    'totalBreakHours' => '0',
                    'attendanceDate' => $date,
                ];
            }
            $id++;
        }
    
        // $dayNm = $this->getDayName($date);
        // echo $dayNm; die;
        // Return the populated data
        return $dataByDate;
    }
    
 
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

if (!$id) {
    echo json_encode(['error' => 'id is required']);
    exit;
}

$ListingData = new ListingData($conn);
$response = $ListingData->Listing($id);

// Return response as JSON
echo json_encode($response);
?>
