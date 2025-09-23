import TimetableView from '../components/ui/TimetableView'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TimetablePage=()=>{
const [schedule, setSchedule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSchedule = localStorage.getItem('timetableData');
    if (savedSchedule) {
      try {
        setSchedule(JSON.parse(savedSchedule));
      } catch (e) {
        console.error("Failed to parse saved timetable data from localStorage", e);
        localStorage.removeItem('timetableData');
        navigate('/input');
      }
    } else {
      // If there's no schedule, redirect to the form page.
      navigate('/input');
    }
  }, [navigate]);

  const handleClear = () => {
    localStorage.removeItem('timetableData');
    navigate('/input');
  };

  return (
    <div>
      <button type="button" onClick={handleClear} style={{ marginBottom: 16 }}>
        Generate New Timetable
      </button>
      <TimetableView schedule={schedule} />
    </div>
  );
}
export default TimetablePage