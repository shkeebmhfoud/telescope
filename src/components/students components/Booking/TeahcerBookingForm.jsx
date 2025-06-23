import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import BookingSummary from './BookingSummary'

const TeahcerBookingForm = ({
    handleBooking,
    handleTimeSelect,
    availableDay,
    avialableTimeSolt,
    setNotes,
    setSelectedDate,
    selectedTime,
    notes,
    teacher,
    selectedDate,
    timeSlots
}) => {
    return (
        <form onSubmit={handleBooking}>
            <div className="grid md:grid-cols-2 gap-8 border rounded shadow-lg py-4 px-5">
                <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
                        <FiCalendar className="w-5 h-5" />
                        <span>اختر التاريخ</span>
                    </h3>
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

            <div className="mt-8 border shadow-lg rounded py-3 px-2">
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

            <BookingSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                teacher={teacher}
                timeSlots={timeSlots}
            />

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
    )
}

export default TeahcerBookingForm