import { FiTarget, FiHeart, FiUsers, FiAward } from 'react-icons/fi';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">من نحن</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            تلسكوب هي منصة إلكترونية رائدة مصممة خصيصاً لدعم وتسهيل عملية حجز الدروس الخصوصية
            لطلاب المرحلة الابتدائية في محافظة حمص، الجمهورية العربية السورية.
          </p>

          {/* Vision */}
          <div className="bg-primary bg-opacity-5 p-6 rounded-lg mb-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <FiTarget className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-gray-800">رؤيتنا</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[1.5rem]">
              نسعى لأن نكون الجسر الذي يربط بين الطلاب الطموحين والمعلمين المؤهلين، لنساهم في بناء
              جيل متعلم ومتميز يواكب التطورات التعليمية الحديثة ويحقق أحلامه الأكاديمية.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-secondary bg-opacity-5 p-6 rounded-lg mb-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <FiHeart className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-gray-800">مهمتنا</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[1.5rem]">
              توفير منصة سهلة وآمنة تمكن الطلاب وأولياء أمورهم من العثور على أفضل المعلمين المؤهلين،
              وتنظيم جداول الدروس بسهولة، ومتابعة التقدم الأكاديمي في بيئة تعليمية محفزة ومناسبة.
            </p>
          </div>

          {/* What We Offer */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <FiUsers className="w-8 h-8 text-accent text-white" />
              <h2 className="text-2xl font-bold text-gray-800">ما نقدمه</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🎓 معلمون مؤهلون</h3>
                <p className="text-gray-600 text-sm">شبكة واسعة من المعلمين المؤهلين والمعتمدين</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">📅 نظام حجز مرن</h3>
                <p className="text-gray-600 text-sm">نظام حجز سهل ومرن يناسب جميع الأوقات</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🗺️ خريطة تفاعلية</h3>
                <p className="text-gray-600 text-sm">خريطة تفاعلية لإيجاد أقرب المعلمين</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">📊 متابعة التقدم</h3>
                <p className="text-gray-600 text-sm">متابعة دقيقة للتقدم الأكاديمي</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">💰 أسعار تنافسية</h3>
                <p className="text-gray-600 text-sm">أسعار تنافسية وشفافة لجميع الخدمات</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🛠️ دعم فني</h3>
                <p className="text-gray-600 text-sm">دعم فني متواصل لحل جميع المشاكل</p>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-accent bg-opacity-5 p-6 rounded-lg mb-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <FiAward className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-gray-800">التزامنا</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[1.5rem]">
              نلتزم بتوفير تجربة تعليمية متميزة تضع الطالب في المقدمة، مع الحرص على جودة التعليم
              وسلامة البيئة التعليمية. نؤمن بأن التعليم حق لكل طفل، ونعمل جاهدين لجعل الدروس
              الخصوصية متاحة وفعالة لجميع الطلاب في محافظة حمص.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-primary bg-opacity-5 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-600">معلم مؤهل</div>
            </div>
            <div className="text-center p-6 bg-secondary bg-opacity-5 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-600">طالب مسجل</div>
            </div>
            <div className="text-center p-6 bg-accent bg-opacity-5 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">5000+</div>
              <div className="text-gray-600">درس مكتمل</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
