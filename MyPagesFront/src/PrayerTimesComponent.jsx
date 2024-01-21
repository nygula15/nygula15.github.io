import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrayerTimesComponent = () => {
  const [prayerTimesData, setPrayerTimesData] = useState(null);
  const [showTips, setShowTips] = useState({
    year: false,
    month: false,
    city: false,
    country: false,
    method: false,
  });

  const parameters = {
    year: 2024,
    month: 1,
    city: 'Tallinn',
    country: 'Estonia',
    method: 2,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.aladhan.com/v1/calendarByCity/${parameters.year}/${parameters.month}?city=${parameters.city}&country=${parameters.country}&method=${parameters.method}`
        );
        const data = response.data.data[0].meta;
        setPrayerTimesData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [parameters]);

  const parameterDescriptions = {
    year: 'A Gregorian calendar year. Example: 2014.',
    month: 'Optional. A Gregorian calendar month. Example: 8 or 08 for August. If not specified, an annual calendar will be returned.',
    city: 'A city name. Example: London',
    country: 'A country name or 2 character alpha ISO 3166 code. Examples: GB or United Kingdom',
    method: 'A prayer times calculation method. See https://aladhan.com/calculation-methods for details on each method.',
  };

  const handleToggleTip = (field) => {
    setShowTips((prevTips) => ({
      ...prevTips,
      [field]: !prevTips[field],
    }));
  };

  return (
    <div>
      <h1>Prayer Times</h1>
      {prayerTimesData ? (
        <ul>
          <li>
            Year: {prayerTimesData.year}
            <span onClick={() => handleToggleTip('year')} className="tip">
              ?
            </span>
            {showTips.year && <div className="tooltip">{parameterDescriptions.year}</div>}
          </li>
          <li>
            Month: {prayerTimesData.month}
            <span onClick={() => handleToggleTip('month')} className="tip">
              ?
            </span>
            {showTips.month && <div className="tooltip">{parameterDescriptions.month}</div>}
          </li>
          <li>
            City: {prayerTimesData.city}
            <span onClick={() => handleToggleTip('city')} className="tip">
              ?
            </span>
            {showTips.city && <div className="tooltip">{parameterDescriptions.city}</div>}
          </li>
          <li>
            Country: {prayerTimesData.country}
            <span onClick={() => handleToggleTip('country')} className="tip">
              ?
            </span>
            {showTips.country && <div className="tooltip">{parameterDescriptions.country}</div>}
          </li>
          <li>
            Method: {prayerTimesData.method}
            <span onClick={() => handleToggleTip('method')} className="tip">
              ?
            </span>
            {showTips.method && <div className="tooltip">{parameterDescriptions.method}</div>}
          </li>
        </ul>
      ) : (
        <p>Loading prayer times...</p>
      )}
    </div>
  );
};

export default PrayerTimesComponent;
