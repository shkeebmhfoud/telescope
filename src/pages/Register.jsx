import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiCalendar, FiMapPin } from 'react-icons/fi';
import { grades } from '../data/mockData';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    grade: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('يرجى إدخال الاسم الكامل');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('يرجى إدخال البريد الإلكتروني');
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error('يرجى إدخال رقم الهاتف');
      return false;
    }

    if (!formData.birthDate) {
      toast.error('يرجى إدخال تاريخ الميلاد');
      return false;
    }

    if (!formData.gender) {
      toast.error('يرجى اختيار الجنس');
      return false;
    }

    if (!formData.grade) {
      toast.error('يرجى اختيار الصف');
      return false;
    }

    if (!formData.address.trim()) {
      toast.error('يرجى إدخال العنوان');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
      return false;
    }

    if (!formData.agreeToTerms) {
      toast.error('يرجى الموافقة على شروط الخدمة وسياسة الخصوصية');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      toast.success('تم إنشاء الحساب بنجاح! مرحباً بك في تلسكوب');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  // Calculate age from birth date
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
            <span className="text-3xl">🔭</span>
            <span className="text-3xl font-bold text-primary">تلسكوب</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">إنشاء حساب جديد</h2>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                المعلومات الشخصية
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="أدخل بريدك الإلكتروني"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+963 944 123 456"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ الميلاد *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  {formData.birthDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      العمر: {calculateAge(formData.birthDate)} سنة
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الجنس *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الصف الدراسي *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">اختر الصف</option>
                    {grades.map((grade) => (
                      <option key={grade.value} value={grade.value}>
                        {grade.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 pt-3 pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="أدخل عنوانك الكامل (المحافظة، المدينة، الحي، الشارع...)"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                معلومات الأمان
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="أدخل كلمة مرور قوية"
                      minLength="6"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-600 mb-1">قوة كلمة المرور:</div>
                      <div className="flex space-x-1 space-x-reverse">
                        <div className={`h-1 flex-1 rounded ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded ${/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تأكيد كلمة المرور *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                        }`}
                      placeholder="أعد إدخال كلمة المرور"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">كلمة المرور غير متطابقة</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                  required
                />
                <label className="mr-3 block text-sm text-gray-900">
                  أوافق على{' '}
                  <Link to="/terms" className="text-primary hover:text-blue-700 underline">
                    شروط الخدمة
                  </Link>
                  {' '}و{' '}
                  <Link to="/privacy" className="text-primary hover:text-blue-700 underline">
                    سياسة الخصوصية
                  </Link>
                  {' '}الخاصة بمنصة تلسكوب
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>جاري إنشاء الحساب...</span>
                  </div>
                ) : (
                  'إنشاء الحساب'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="mt-2 text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-blue-700 transition-colors"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
