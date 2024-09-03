SELECT Patient.FirstName , Doctor.FirstName, Clinic.clinicName,Appointment.AppointmenDate
FROM Appointment
INNER JOIN Patient ON  Patient.PatientID = Appointment.PatientID
INNER JOIN Doctor ON  Doctor.DoctorID = Appointment.DoctorID
INNER JOIN Clinic ON  Clinic.ClinicID = Appointment.ClinicID