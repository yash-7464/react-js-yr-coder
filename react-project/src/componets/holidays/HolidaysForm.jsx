import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HolidaysForm = () => {
  const [startDate, setStartDate] = useState (null);
  const [endDate, setEndDate] = useState (null);
  const [data, setData] = useState ({
    holidayName: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setData ({...data, [e.target.name]: e.target.value});
  };

  const submitForm = e => {
    e.preventDefault ();
    // console.log({ ...data, startDate, endDate });

    // Format startDate and endDate to 'YYYY-MM-DD'
    const formattedStartDate = startDate
      ? startDate.toISOString ().split ('T')[0]
      : null;
    const formattedEndDate = endDate
      ? endDate.toISOString ().split ('T')[0]
      : null;

    const formData = {
      name: data.holidayName,
      startDate: formattedStartDate, // Store only date
      endDate: formattedEndDate, // Store only date
    };

    axios
      .post ('http://localhost:91/api/add_holiday.php', formData)
      .then (result => {
        // console.log (result.data.status);
        if(result.data.status == 1){
            navigate("/holidays");
        }
      });
  };

  return (
    <div className="container container-card">
      <div className="row">
        <div className="col-sm-8 holidays-card">
          <h3 className="fw-bold text-center mb-3">Add Holidays</h3>

          <form className="form" onSubmit={submitForm}>
            <div className="row mb-3">
              <label className="col-sm-6 col-form-label">Holiday Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="holidayName"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="col-sm-6 col-form-label">
                  Holiday Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate (date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control col-sm-10"
                  placeholderText="Select Holiday Start Date"
                  name="startDate"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="col-sm-6 col-form-label">
                  Holiday End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate (date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control col-sm-10"
                  placeholderText="Select Holiday End Date"
                  name="endDate"
                />
              </div>
            </div>

            <div className="text-left mt-4">
              <button type="submit" className="btn btn-primary">SAVE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HolidaysForm;
