<?php
// Set the desired timezone
date_default_timezone_set('asia/kolkata'); // e.g., 'America/New_York'

// Get the current timezone
$currentTimezone = date_default_timezone_get();

// Output the current timezone
echo "Current timezone: " . $currentTimezone;

// Optionally, display the current date and time for reference
echo "<br>Current date and time: " . date('Y-m-d H:i:s');
?>
