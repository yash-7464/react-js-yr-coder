import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';

const Holidays = () => {
  const [holidaysData, setHolidaysData] = useState([]); // State to hold holidays data
  const [error, setError] = useState(null); // State to hold error messages

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:91/api/holidayListing.php");
      console.log('API Response:', response.data);
      
      // Ensure response is an array
      if (Array.isArray(response.data)) {
        setHolidaysData(response.data);
      } else {
        setError('Unexpected data format received.');
      }
    } catch (error) {
      setError('Error fetching data: ' + error.message);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect to initialize DataTable
  useEffect(() => {
    if (holidaysData.length) {
      const dataTable = $('#display').DataTable({
        data: holidaysData,
        columns: [
          { data: 'id' },
          { data: 'name' },
          { data: 'startDate' },
          { data: 'createOn' },
          { data: 'updateOn' },
        ],
        destroy: true, // Allows reinitialization
      });

      // Cleanup DataTable on unmount
      return () => {
        if ($.fn.dataTable.isDataTable('#display')) {
          dataTable.destroy(true);
        }
      };
    }
  }, [holidaysData]);

  return (
    <div className="container container-card">
      <div className="row">
        <div className="col-sm-6 listing-card">
          <h3 className="fw-bold text-center mb-3">Holidays</h3>
          <div>
            <Link to="/holidayForm" className="btn btn-primary mb-4">ADD</Link>
          </div>
          {error && <div className="alert alert-danger ">{error}</div>}
          <table id="display">
            <thead>
              <tr>
                <th>#Id</th>
                <th>Name</th>
                <th>Date</th>
                <th>Created On</th>
                <th>Updated On</th>
              </tr>
            </thead>
            <tbody>
              {/* DataTable will automatically populate this */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
