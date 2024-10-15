<?php

include "api_common.php";
include "db_connection.php"; 
class holidayListing {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function listingHoliday() {
        $sql = "SELECT * FROM holidays";

        $result = mysqli_query($this->conn, $sql);

        $holidays = []; 
        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $holidays[] = $row; 
            }
        } 
        // print_r( $holidays ); exit;
        return $holidays; 
    }
}

header('Content-Type: application/json');
$holidayList = new holidayListing($conn);
$result = $holidayList->listingHoliday();

echo json_encode($result); 
?>
