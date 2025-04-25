import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWord, fetchTranslation, fetchPinyin } from '../api';

const AddVocabulary = () => {
  const navigate = useNavigate();
  const [vocabularies, setVocabularies] = useState([
    { hanzi: '', pinyin: '', meaning: '' },
  ]);
  const [message, setMessage] = useState('');
  const [debounceTimers, setDebounceTimers] = useState({});

  // Hàm xử lý thay đổi khi nhập từ
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedVocabularies = [...vocabularies];
    updatedVocabularies[index][name] = value;
    setVocabularies(updatedVocabularies);

    if (name === 'hanzi') {
      // Xóa timer cũ nếu có
      if (debounceTimers[index]) {
        clearTimeout(debounceTimers[index]);
      }

      const newTimers = { ...debounceTimers };
      newTimers[index] = setTimeout(() => {
        autoFillFromHanzi(index, value);
      }, 800); // Debounce 800ms

      setDebounceTimers(newTimers);
    }
  };

  // Tự động lấy Pinyin và nghĩa
  const autoFillFromHanzi = async (index, hanziValue) => {
    if (!hanziValue.trim()) return;

    try {
      const [meaning, pinyin] = await Promise.all([
        fetchTranslation(hanziValue),
        fetchPinyin(hanziValue),
      ]);

      const updated = [...vocabularies];
      updated[index].meaning = meaning || '';
      updated[index].pinyin = pinyin || '';
      setVocabularies(updated);
    } catch (error) {
      console.error('Lỗi khi tự động điền:', error);
    }
  };

  // Thêm dòng từ mới
  const handleAddVocabulary = () => {
    setVocabularies([...vocabularies, { hanzi: '', pinyin: '', meaning: '' }]);
  };

  // Xóa dòng
  const handleRemoveVocabulary = (index) => {
    const updated = vocabularies.filter((_, i) => i !== index);
    setVocabularies(updated);
  };

  // Submit dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filtered = vocabularies.filter(
      (item) => item.hanzi.trim() && item.meaning.trim()
    );

    if (filtered.length === 0) {
      setMessage('Vui lòng nhập ít nhất một từ vựng.');
      return;
    }

    try {
      const response = await addWord({ vocabularies: filtered });

      if (response.status === 201) {
        setMessage('Lưu từ vựng thành công!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage('Có lỗi xảy ra khi lưu!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Lỗi kết nối máy chủ.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Thêm Từ Vựng</h1>

      {message && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded shadow text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {vocabularies.map((vocabulary, index) => (
          <div key={index} className="mb-4 border p-4 rounded-xl bg-white shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="hanzi"
                placeholder="Hán tự"
                value={vocabulary.hanzi}
                onChange={(e) => handleChange(index, e)}
                className="p-2 border rounded-md w-full focus:ring-green-500"
              />
              <input
                type="text"
                name="pinyin"
                placeholder="Pinyin"
                value={vocabulary.pinyin}
                onChange={(e) => handleChange(index, e)}
                className="p-2 border rounded-md w-full focus:ring-green-500"
              />
              <input
                type="text"
                name="meaning"
                placeholder="Nghĩa tiếng Việt"
                value={vocabulary.meaning}
                onChange={(e) => handleChange(index, e)}
                className="p-2 border rounded-md w-full focus:ring-green-500"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveVocabulary(index)}
              className="text-red-500 mt-2"
            >
              Xóa dòng
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddVocabulary}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-blue-600 shadow-md"
        >
          Thêm Từ Vựng
        </button>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-green-700 shadow-md"
        >
          Lưu từ vựng
        </button>
      </form>
    </div>
  );
};

export default AddVocabulary;
