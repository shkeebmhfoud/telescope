import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import TeacherMap from '../components/TeacherMap';
import { mockTeachers, subjects, grades } from '../data/mockData';
import { toast } from 'react-toastify';

const Teachers = () => {
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const navigate = useNavigate();

  const applyFilters = () => {
    let filtered = mockTeachers;

    if (subjectFilter) {
      filtered = filtered.filter(teacher => teacher.subjectKey === subjectFilter);
    }

    if (gradeFilter) {
      filtered = filtered.filter(teacher =>
        teacher.grades.includes(parseInt(gradeFilter))
      );
    }

    setFilteredTeachers(filtered);
  };

  const clearFilters = () => {
    setSubjectFilter('');
    setGradeFilter('');
    setFilteredTeachers(mockTeachers);
    toast.info('تم إلغاء جميع الفلاتر');
  };

  const handleTeacherSelect = (teacherId) => {
    navigate(`/booking/${teacherId}`);
  };

  useEffect(() => {
    applyFilters();
  }, [subjectFilter, gradeFilter]);

  useEffect(() => {
    if (localStorage.filter) {
      setSubjectFilter(localStorage.filter);
      localStorage.clear();
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">المعلمون المتاحون</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <FiFilter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">فلترة النتائج</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المادة
            </label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">جميع المواد</option>
              {subjects.map((subject) => (
                <option key={subject.key} value={subject.key}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الصف
            </label>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">جميع الصفوف</option>
              {grades.map((grade) => (
                <option key={grade.value} value={grade.value}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء الفلاتر
            </button>
          </div>

          <div className="flex items-end">
            <div className="w-full bg-primary text-white px-6 py-3 rounded-lg text-center">
              {filteredTeachers.length} معلم متاح
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
          <span>🗺️</span>
          <span>خريطة المعلمين</span>
        </h2>
        <TeacherMap
          teachers={filteredTeachers}
          onTeacherSelect={handleTeacherSelect}
        />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">قائمة المعلمين</h2>

          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-500">
                جرب تغيير الفلاتر للعثور على معلمين آخرين
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {teacher.name}
                      </h3>
                      <p className="text-primary">{teacher.subject}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>الخبرة: {teacher.experience}</p>
                    <p>الصفوف: {teacher.grades.join(', ')}</p>
                    <p>{teacher.qualification}</p>
                    <p className="font-semibold text-secondary text-lg">
                      {teacher.price.toLocaleString()} ل.س / الجلسة
                    </p>
                  </div>

                  <button
                    onClick={() => handleTeacherSelect(teacher.id)}
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    حجز درس
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Teachers;
