import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { MdCancel } from "react-icons/md";
import { availableDays, mockBookings, mockTeachers, timeSlots } from '../data/mockData';
import { toast } from 'react-toastify';

const Booking = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [avialableTimeSolt, setAvailableTimeSlot] = useState([]);
  const [availableDay, setAvailableDays] = useState([]);

  useEffect(() => {
    const foundTeacher = mockTeachers.find(t => t.id === parseInt(teacherId));
    if (foundTeacher) {
      setTeacher(foundTeacher);
    } else {
      toast.error('المعلم غير موجود');
      navigate('/teachers');
    }
  }, [teacherId, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('booking_id')) {
      const teacherBookingsTimes = mockBookings.filter(booking => parseInt(booking.teacherId) === parseInt(teacherId) && booking.status === 'upcoming')
        .map(booking => booking.time);

      const avialableTimeSolts = timeSlots.filter(time => !teacherBookingsTimes.includes(time.value))

      setAvailableTimeSlot(avialableTimeSolts)
    } else {
      setAvailableTimeSlot(timeSlots);
    }
  }, [teacherId])

  useEffect(() => {
    if (!localStorage.getItem('booking_id')) {
      const teacherBookingsDays = mockBookings.filter(booking => parseInt(booking.teacherId) === parseInt(teacherId) && booking.status === 'upcoming')
        .map(booking => booking.date);

      const availableDay = availableDays.filter(date => !teacherBookingsDays.includes(date.date));

      setAvailableDays(availableDay);
    } else {
      setAvailableDays(availableDays);
    }
  }, [teacherId])

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('يرجى اختيار التاريخ');
      return;
    }

    if (!selectedTime) {
      toast.error('يرجى اختيار الوقت');
      return;
    }

    const isHeCanBooking = mockBookings.filter(booking => booking.date === selectedDate && booking.time === selectedTime && parseInt(teacherId) !== parseInt(booking.teacherId));
    console.log(isHeCanBooking)
    if (Boolean(isHeCanBooking.length)) {
      toast.warning(`لديك درس  ${isHeCanBooking[0].subject} عند ${isHeCanBooking[0].teacherName} في هذا الموعد`);
      return;
    }

    if (localStorage.getItem('booking_id')) {
      const { booking_id } = localStorage;

      mockBookings[parseInt(booking_id) - 1].time = selectedTime;

      mockBookings[parseInt(booking_id) - 1].date = selectedDate;

      toast.success("تم تعديل الموعد بنجاح");

      localStorage.clear()

      navigate('/bookings')

      return;
    }

    // Simulate booking process
    toast.success('تم حجز الدرس بنجاح! سيتم التواصل معك قريباً');

    const formData = {
      id: mockBookings.length + 1,
      teacherId,
      date: selectedDate,
      time: selectedTime,
      subject: teacher.subject,
      teacherName: teacher.name,
      teacherImage: teacher.image,
      price: teacher.price,
      status: 'upcoming',
      notes
    }

    mockBookings.push(formData);

    navigate('/bookings');
  };

  if (!teacher) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-xl font-semibold text-gray-600">جاري التحميل...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

      <MdCancel className='text-3xl absolute left-0 cursor-pointer' onClick={()=>navigate('/teachers')}/>

      <div className="bg-white rounded-lg shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">حجز درس خصوصي</h1>

        {/* Teacher Info */}
        <div className="border-b pb-8 mb-8">
          <div className="flex items-start space-x-6 space-x-reverse">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {teacher.name}
              </h2>
              <p className="text-lg text-primary mb-2">معلم {teacher.subject}</p>
              <p className="text-gray-600 mb-2">خبرة {teacher.experience}</p>
              <p className="text-gray-600 mb-4">
                يدرس للصفوف: {teacher.grades.join(' - ')}
              </p>

              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <span className="text-2xl font-bold text-secondary">
                  {teacher.price.toLocaleString()} ل.س
                </span>
                <span className="text-gray-500">/ الجلسة</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FiMapPin className="w-4 h-4" />
                  <span>{teacher.address}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FiPhone className="w-4 h-4" />
                  <span style={{ direction: 'ltr' }}>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">الشهادة والمؤهلات</h3>
            <p className="text-gray-600">{teacher.qualification}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">نبذة عن المعلم</h3>
            <p className="text-gray-600">{teacher.bio}</p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBooking}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                <FiCalendar className="w-5 h-5" />
                <span>اختر التاريخ</span>
              </h3>
              {/* <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              /> */}
              <select
                required
                name="date"
                id="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {
                  availableDay.map(day => (
                    <option value={day.date}>{day.date} / {day.day}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                <FiClock className="w-5 h-5" />
                <span>اختر الوقت</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {avialableTimeSolt.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => handleTimeSelect(slot.value)}
                    className={`p-3 border rounded-lg transition-colors ${selectedTime === slot.value
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:bg-primary hover:text-white'
                      }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات إضافية
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="4"
              placeholder="اكتب أي ملاحظات أو متطلبات خاصة للدرس..."
            />
          </div>

          {/* Booking Summary */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">ملخص الحجز</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>المعلم:</span>
                <span className="font-semibold">{teacher.name}</span>
              </div>
              <div className="flex justify-between">
                <span>المادة:</span>
                <span>{teacher.subject}</span>
              </div>
              {selectedDate && (
                <div className="flex justify-between">
                  <span>التاريخ:</span>
                  <span>{new Date(selectedDate).toLocaleDateString('en-US')}</span>
                </div>
              )}
              {selectedTime && (
                <div className="flex justify-between">
                  <span>الوقت:</span>
                  <span>{timeSlots.find(slot => slot.value === selectedTime)?.label}</span>
                </div>
              )}
              <hr className="my-3" />
              <div className="flex justify-between font-semibold text-lg">
                <span>المجموع:</span>
                <span className="text-secondary">{teacher.price.toLocaleString()} ل.س</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              تأكيد الحجز
            </button>
            <Link
              to="/teachers"
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              العودة للمعلمين
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
