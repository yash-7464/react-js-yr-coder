import {useEffect, useState} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDays, faClock} from '@fortawesome/free-solid-svg-icons';
import LiveClock from './LiveClock';

const Card = () => {
  const [isCheckedInFlag, setIsCheckedInFlag] = useState (false);
  const [currentDate, setCurrentDate] = useState (new Date ().toDateString ());
  const [checkInDate, setCheckInDate] = useState (localStorage.getItem ('checkInDate'));
  const [error, setErrors] = useState ();
  const [isOnBreak, setIsOnBreak] = useState (false);
  const [breakTime, setBreakTime] = useState (parseInt (localStorage.getItem ('breakTime') || 0)); // Load break time from localStorage
  const [intervalId, setIntervalId] = useState (null);
  const [checkInTime, setCheckInTime] = useState (null);
  const id = localStorage.getItem ('userId');
  const lastLoginDate = localStorage.getItem ('lastLoginDate');
  const checkInDateDB = localStorage.getItem ('checkInDateDB');


  useEffect(() => {
    const checkInStatus = localStorage.getItem('isCheckedIn');
    const storedDate = localStorage.getItem('checkInDate');
    const storedCheckInTime = localStorage.getItem('checkInTime');
    const breakDuration = localStorage.getItem('breakTime');

     // Restore break state if on break
     const storedIsOnBreak = localStorage.getItem('isOnBreak');
     if (storedIsOnBreak === 'true') {
       handleRestoreBreak (parseInt (breakDuration));
     }

   
    if (lastLoginDate === checkInDateDB) {
      setErrors("You are already checked in for today."); // Set the error message
      setIsCheckedInFlag(false); // Disable the check-in button
    } else {
      // Regular check-in logic
      if (checkInStatus === 'true' && storedDate === currentDate) {
        setIsCheckedInFlag(true);
        setCheckInTime(new Date(storedCheckInTime));
      } else if (storedDate !== currentDate) {
        setIsCheckedInFlag(false);
        localStorage.removeItem('isCheckedIn');
        localStorage.removeItem('checkInDate');
      }
    }
  }, [currentDate, lastLoginDate, checkInDateDB]);


  useEffect (
    () => {
      const intervalId = setInterval (() => {
        const today = new Date ().toDateString ();
        if (today !== currentDate) {
          setCurrentDate (today);
        }
      }, 60000); // Check every minute

      return () => clearInterval (intervalId); // Clean up interval
    },
    [currentDate]
  );

  const handleCheckInOut = () => {

    if (isOnBreak) {
      alert("Please end the break before checking out.");
      return; // Prevent further execution if on break
  }

    const currentTime = new Date ();
    setIsCheckedInFlag (prevState => !prevState);

    if (!isCheckedInFlag) {
      setCheckInDate (currentTime.toDateString ());
      localStorage.setItem ('checkInDate', currentTime.toDateString ());
      localStorage.setItem ('checkInTime', currentTime.toISOString ());

      axios
        .post ('http://localhost:91/api/check_in_out.php', {id})
        .then (response => {
          localStorage.setItem ('isCheckedIn', 'true');
          console.log ('Checked in:', response.data);

          if (response.data.status === 0) {
            setErrors (response.data.errors);
          }
        })
        .catch (error => {
          console.error ('Error during check-in:', error);
        });
    } else {
      
      const totalHours = calculateTimeDifference (
        new Date (checkInTime),
        currentTime
      );
      let status = totalHours < 4 ? 'LWP' : 'P';

      axios
        .post ('http://localhost:91/api/check_in_out.php', {
          id,
          checkOut: true,
          checkOutTime: currentTime.toISOString (),
          status,
        })
        .then (response => {
          localStorage.setItem ('isCheckedIn', 'false');
          setIsCheckedInFlag (false);
        

          if (response.data.status === 0) {
            setErrors(response.data.errors);
          }
          
          console.log ('Checked out:', response.data);
        })
        .catch (error => {
          console.error ('Error during check-out:', error);
        });
    }
  };

  // Restore break time if already on a break
  const handleRestoreBreak = storedBreakTime => {
    setIsOnBreak (true);
    setBreakTime (storedBreakTime);

    const id = setInterval (() => {
      setBreakTime (prevTime => {
        return prevTime + 1;
      });
    }, 1000);
    setIntervalId (id); // Save interval ID to stop later
  };

  // Start Break
  const handleStartBreak = () => {
    setIsOnBreak (true);
    const breakTimeFromStorage = parseInt (
      localStorage.getItem ('breakTime') || 0
    );

    setBreakTime (breakTimeFromStorage);

    const id = setInterval (() => {
      setBreakTime (prevTime => prevTime + 1);
    }, 1000);
    setIntervalId (id); // Store interval ID to clear later

    localStorage.setItem ('isOnBreak', 'true'); // Persist break state

    const userId = localStorage.getItem ('userId');

    axios
      .post ('http://localhost:91/api/break_management.php', {
        id: userId,
        action: 'start',
        second: breakTimeFromStorage, // Pass break time to backend
      })
      .then (response => {
        console.log ('Break started:', response.data);
      })
      .catch (error => {
        console.error ('Error starting break:', error);
      });
  };

  // End Break
  const handleEndBreak = () => {
    setIsOnBreak (false);
    clearInterval (intervalId);
    setIntervalId (null);
    localStorage.removeItem ('isOnBreak');

    axios
      .post ('http://localhost:91/api/break_management.php', {
        id,
        action: 'end',
      })
      .then (response => {
        if (response.data.status === 1) {
          const breakDuration = response.data.break_duration;
          const oldBreakDuration = parseInt (
            localStorage.getItem ('breakTime') || 0
          );
          const breakDurationTime = breakDuration + oldBreakDuration;
          localStorage.setItem ('breakTime', breakDurationTime);
        } else {
          console.error (response.data.errors);
        }
      })
      .catch (error => {
        console.error ('Error during break time logging:', error);
      });
  };

  const formatTime = timeInSeconds => {
    const hours = Math.floor (timeInSeconds / 3600);
    const minutes = Math.floor (timeInSeconds % 3600 / 60);
    const seconds = timeInSeconds % 60;
    return `${hours
      .toString ()
      .padStart (
        2,
        '0'
      )}:${minutes
      .toString ()
      .padStart (2, '0')}:${seconds.toString ().padStart (2, '0')}`;
  };

  const calculateTimeDifference = (startTime, endTime) => {
    const diffMs = endTime - startTime;
    return diffMs / (1000 * 60 * 60);
  };

  return (
    <div className="container container-card">
      <h6 className="mt-5 fw-bold">Home</h6>
      <div className="row">
        <div className="col-sm-3 dash-card">
          <h6 className="mt-3 text-center">CheckIn / CheckOut</h6>
          <div className="text-center">
            <p><FontAwesomeIcon icon={faCalendarDays} /> {currentDate}</p>
            <LiveClock />

            {error ? ( 
              <p className="text-danger error-checkOut">{error}</p>
            ) : isCheckedInFlag && !isOnBreak ? (
              <button onClick={handleCheckInOut} className="btn btn-danger btn-sm check-btn">
                CheckOut
              </button>
            ) : checkInDate !== currentDate ? (
              <button onClick={handleCheckInOut} className="btn btn-primary btn-sm check-btn">
                CheckIn
              </button>
            ) : isCheckedInFlag === true ? (
              null) : (
              <p className="text-danger error-checkOut">You are already checked in for today.</p>)
           }

            
          </div>
        </div>

        <div className="col-sm-3 dash-card">
          <h6 className="mt-3 text-center">Break</h6>
          <div className="text-center">
            <p><FontAwesomeIcon icon={faClock} /> Today's Break</p>
            <p> {formatTime (breakTime)}</p>

            {isCheckedInFlag &&
              <div className="mt-4">
                {isOnBreak
                  ? <button
                      onClick={handleEndBreak}
                      className="btn btn-danger btn-sm fw-bold"
                    >
                      End Break
                    </button>
                  : <button
                      onClick={handleStartBreak}
                      className="btn btn-primary btn-sm fw-bold"
                    >
                      Start Break
                    </button>}
              </div>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
