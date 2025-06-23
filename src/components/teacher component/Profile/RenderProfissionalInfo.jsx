import { FiAward, FiBookOpen, FiDollarSign } from 'react-icons/fi'
import { grades, teacherSubjects } from '../../../data/teacherMockData'

const RenderProfissionalInfo = (
    {
        formData,
        isEditing,
        handleGradeChange,
        handleInputChange,
    }
) => {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiBookOpen className="w-4 h-4 inline ml-2" />
                        المادة التي تدرسها
                    </label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    >
                        {teacherSubjects.map((subject) => (
                            <option key={subject.key} value={subject.key}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiDollarSign className="w-4 h-4 inline ml-2" />
                        تكلفة الجلسة (ليرة سورية)
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        سنوات الخبرة
                    </label>
                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    >
                        <option value="1">سنة واحدة</option>
                        <option value="2">سنتان</option>
                        <option value="3">3 سنوات</option>
                        <option value="4">4 سنوات</option>
                        <option value="5">5 سنوات</option>
                        <option value="6-10">6-10 سنوات</option>
                        <option value="10+">أكثر من 10 سنوات</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiAward className="w-4 h-4 inline ml-2" />
                        المؤهل العلمي
                    </label>
                    <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    الصفوف التي تدرس لها
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {grades.map((grade) => (
                        <button
                            key={grade.value}
                            type="button"
                            onClick={() => isEditing && handleGradeChange(parseInt(grade.value))}
                            disabled={!isEditing}
                            className={`p-3 border-2 rounded-lg transition-all duration-300 text-sm font-medium ${formData.grades.includes(parseInt(grade.value))
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                : 'border-gray-200 text-gray-700'
                                } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'hover:border-emerald-300'}`}
                        >
                            {grade.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    نبذة عنك
                </label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                        }`}
                    placeholder="اكتب نبذة مختصرة عن خبرتك وأسلوب التدريس..."
                />
            </div>
        </div>
    )
}

export default RenderProfissionalInfo