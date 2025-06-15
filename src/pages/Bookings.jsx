import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiEdit, FiX, FiRepeat } from 'react-icons/fi';
import { mockBookings, timeSlots } from '../data/mockData';
import { toast } from 'react-toastify';

const Bookings = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('upcoming');

  const getBookingsByStatus = (status) => {
    return mockBookings.filter(booking => booking.status === status);
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { color: 'bg-blue-100 text-blue-800', text: 'قادم' },
      completed: { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'ملغي' }
    };
    return badges[status] || badges.upcoming;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const slot = timeSlots.find(slot => slot.value === timeString);
    return slot ? slot.label : timeString;
  };

  const handleCancelBooking = (bookingId) => {
    toast.success('تم إلغاء الحجز بنجاح');
    mockBookings[parseInt(bookingId) - 1].status = 'cancelled'
    setActiveTab('cancelled')
  };

  const handleRescheduleBooking = (bookingId) => {
    toast.info('سيتم تحويلك لصفحة إعادة الجدولة');
    localStorage.setItem('booking_id', bookingId);
    navigate('/booking/' + mockBookings[parseInt(bookingId) - 1].teacherId)
  };

  const handleBookAgain = (teacherId) => {
    toast.info('سيتم تحويلك لصفحة الحجز');
    navigate('/booking/' + teacherId);
  };

  const tabs = [
    { id: 'upcoming', name: 'الحجوزات القادمة', count: getBookingsByStatus('upcoming').length },
    { id: 'completed', name: 'الحجوزات المكتملة', count: getBookingsByStatus('completed').length },
    { id: 'cancelled', name: 'الحجوزات المُلغاة', count: getBookingsByStatus('cancelled').length }
  ];

  const renderBookingCard = (booking) => {
    const statusBadge = getStatusBadge(booking.status);

    return (
      <div key={booking.id} className={`bg-white rounded-lg shadow-sm p-6 border-r-4 ${booking.status === 'upcoming' ? 'border-primary' :
        booking.status === 'completed' ? 'border-secondary' :
          'border-gray-400'
        }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 space-x-reverse flex-1">
            <img
              src={booking.teacherImage}
              alt={booking.teacherName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {booking.teacherName}
              </h3>
              <p className="text-primary mb-2">{booking.subject}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FiCalendar className="w-4 h-4" />
                  <span>{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FiClock className="w-4 h-4" />
                  <span>{formatTime(booking.time)}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FiDollarSign className="w-4 h-4" />
                  <span>{booking.price.toLocaleString()} ل.س</span>
                </div>
              </div>

              {booking.notes && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>ملاحظات:</strong> {booking.notes}
                </p>
              )}

              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                {statusBadge.text}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2">
            {booking.status === 'upcoming' && (
              <>
                <button
                  onClick={() => handleRescheduleBooking(booking.id)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                >
                  <FiEdit className="w-4 h-4" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                >
                  <FiX className="w-4 h-4" />
                  <span>إلغاء</span>
                </button>
              </>
            )}

            {booking.status === 'completed' && (
              <>
                <button
                  onClick={() => handleBookAgain(booking.teacherId)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                >
                  <FiRepeat className="w-4 h-4" />
                  <span>حجز مرة أخرى</span>
                </button>
              </>
            )}

            {booking.status === 'cancelled' && (
              <button
                onClick={() => handleBookAgain(booking.teacherId)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
              >
                <FiRepeat className="w-4 h-4" />
                <span>حجز مرة أخرى</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">حجوزاتي</h1>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8 space-x-reverse border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.name}
              {tab.count > 0 && (
                <span className={`mr-2 inline-block px-2 py-1 text-xs rounded-full ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {getBookingsByStatus(activeTab).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">
              {activeTab === 'upcoming' ? '📅' :
                activeTab === 'completed' ? '✅' : '❌'}
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {activeTab === 'upcoming' ? 'لا توجد حجوزات قادمة' :
                activeTab === 'completed' ? 'لا توجد حجوزات مكتملة' :
                  'لا توجد حجوزات ملغية'}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'upcoming' ? 'ابدأ في حجز دروسك الأولى!' :
                activeTab === 'completed' ? 'لم تكمل أي دروس بعد' :
                  'لم تلغِ أي حجوزات'}
            </p>
            {activeTab === 'upcoming' && (
              <Link
                to="/teachers"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                احجز درساً الآن
              </Link>
            )}
          </div>
        ) : (
          getBookingsByStatus(activeTab).map(renderBookingCard)
        )}
      </div>

      {/* Summary Stats */}
      {activeTab === 'upcoming' && getBookingsByStatus('upcoming').length > 0 && (
        <div className="mt-8 bg-primary bg-opacity-5 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">ملخص الحجوزات القادمة</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {getBookingsByStatus('upcoming').length}
              </div>
              <div className="text-gray-600 text-sm">درس قادم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {getBookingsByStatus('upcoming').reduce((sum, booking) => sum + booking.price, 0).toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">ل.س - إجمالي التكلفة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {new Set(getBookingsByStatus('upcoming').map(b => b.subject)).size}
              </div>
              <div className="text-gray-600 text-sm">مادة مختلفة</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
