import { Link, useNavigate } from 'react-router-dom';
import { FiBook, FiCalendar, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { subjects } from '../data/mockData';
import header_image_1 from '../data/images/header_image_1.jpg'
import header_image_3 from '../data/images/header_image_3.png'
import middle_image from '../data/images/middle_image.jpg'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <section style={
        {
          backgroundImage: `url("${header_image_1}")`
          , backgroundSize: '100% 100%'
          , backgroundRepeat: 'no-repeat'
          , backgroundAttachment: 'fixed'
        }
      } className="home-header text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              مرحباً بك في تلسكوب
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              منصتك للتعلم مع أفضل المعلمين في حمص
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/teachers"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>ابحث عن معلم الآن</span>
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center"
              >
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            لماذا تختار تلسكوب؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBook className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">معلمون مؤهلون</h3>
              <p className="text-gray-600">
                معلمون معتمدون وذوو خبرة في جميع المواد الدراسية
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">جدولة مرنة</h3>
              <p className="text-gray-600">
                احجز الدروس في الأوقات التي تناسبك
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="w-8 h-8 text-accent text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">قريب منك</h3>
              <p className="text-gray-600">
                ابحث عن المعلمين القريبين من موقعك
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={
        {
          backgroundImage: `url("${middle_image}")`,
          backgroundSize: '100% 100%',
          backgroundAttachment: 'fixed'
        }
      } className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={
            {
              textShadow:'0 0 10px orange'
            }
          } className="text-4xl font-bold text-center mb-12 text-accent">
            المواد الدراسية المتاحة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <Link
                onClick={() => {
                  navigate('/teachers')
                  localStorage.setItem('filter', subject.key)
                  window.scrollTo(0, 0);
                }}
                key={subject.key}
                className="flex items-center flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center group cursor-pointer"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  <img src={subject.icon} className='w-[60px]' alt="" />
                </div>
                <h3 className="font-semibold text-gray-800">{subject.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">معلم مؤهل</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">طالب مسجل</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-gray-600">درس مكتمل</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">4.8</div>
              <div className="text-gray-600">تقييم المنصة</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        backgroundImage: `url("${header_image_3}")`
        , backgroundSize: '100% 100%'
        , backgroundAttachment: 'fixed'
      }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ابدأ رحلتك التعليمية اليوم
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف الطلاب الذين يحققون نتائج ممتازة مع تلسكوب
          </p>
          <Link
            to="/register"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 space-x-reverse"
          >
            <span>إنشاء حساب مجاني</span>
            <FiArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
