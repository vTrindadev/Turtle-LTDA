document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('attendance-form');
    const checkInBtn = document.getElementById('check-in');
    const checkOutBtn = document.getElementById('check-out');
    const attendanceLog = document.getElementById('attendance-log');
  
    checkInBtn.addEventListener('click', function() {
      registerAttendance('entrada');
    });
  
    checkOutBtn.addEventListener('click', function() {
      registerAttendance('saída');
    });
  
    function registerAttendance(type) {
      const employeeName = document.getElementById('employee-name').value;
      const currentTime = new Date().toLocaleTimeString();
  
      const entry = `<p>${employeeName} registrou ${type} às ${currentTime}</p>`;
      attendanceLog.insertAdjacentHTML('beforeend', entry);
      form.reset();
    }
  });