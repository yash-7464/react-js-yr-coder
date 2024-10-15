import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net'; // Import DataTables

const Listing = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const tableRef = useRef(null);
  const tableInstance = useRef(null);

  const id = localStorage.getItem('userId');

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:91/api/listing.php", { id });
      console.log('API Response:', response.data);

      if (response.data) {
        const dataArray = Object.values(response.data).map(item => [
          item.id,
          item.attendanceDate,
          item.day,
          item.check_in,
          item.check_out,
          item.totalWorkHours,
          item.totalBreakHours,
          item.status,
        ]);
        setData(dataArray); 
      } else {
        console.error('No data found in response:', response.data);
      }
    } catch (err) {
      setError(err);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [id]); 

  useEffect(() => {
    
     const dataTable = $("#display").DataTable({
        data: data, 
        paging: true, // Fix typo here
        pageLength: 50,
        columns: [
          { title: '#Id' },
          { title: 'Date' },
          { title: 'Day' },
          { title: 'Check In' },
          { title: 'Check Out' },
          { title: 'Work Hours' },
          { title: 'Break Hours' },
          { title: 'Status' },
        ],
      });
    

    return () => {
     
      if ($.fn.dataTable.isDataTable('#display')) {
        dataTable.destroy(true);
      }
    };
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container container-card">
      <div className="row">
        <div className="col-sm-12 listing-card">
          <table  id="display">
            <thead>
              <tr>
                <th>#Id</th>
                <th>Date</th>
                <th>Day</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Break Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* You can also render initial rows here if needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Listing;
