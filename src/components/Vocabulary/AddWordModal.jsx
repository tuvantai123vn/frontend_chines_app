import { useState } from "react";
import { motion } from "framer-motion";
import { addVocabulary, getWordMeaning } from "../../services/api";
import { toastHelper } from "../../utils/ToastContainer";
import AnimatedButton from "../Common/AnimatedButton";

export default function AddWordModal({ isOpen, onClose, onSubmit }) {
  const [hanziList, setHanziList] = useState([{ hanzi: "", pinyin: "", meaning: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPinyinAndMeaning = async (hanzi) => {
    try {
      const res = await getWordMeaning({ params: { hanzi } });
      return {
        hanzi,
        pinyin: res.data.pinyin || "",
        meaning: res.data.meaning || "",
      };
    } catch {
      toastHelper.error(`Không thể lấy nghĩa cho "${hanzi}"`);
      return { hanzi, pinyin: "", meaning: "" };
    }
  };

  const handlePaste = async (e, index) => {
    const pasted = e.clipboardData.getData("text/plain");
    const lines = pasted.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines.length <= 1) return;

    e.preventDefault();
    const updatedList = [...hanziList];
    const pastedWords = await Promise.all(lines.map(fetchPinyinAndMeaning));
    updatedList.splice(index, 1, ...pastedWords);
    setHanziList(updatedList);
  };

  const handleChange = (index, field, value) => {
    const updated = [...hanziList];
    updated[index][field] = value;
    setHanziList(updated);
  };

  const handleBlur = async (index) => {
    const hanzi = hanziList[index]?.hanzi?.trim();
    if (!hanzi) return;

    const updated = [...hanziList];
    const fetched = await fetchPinyinAndMeaning(hanzi);
    updated[index] = { ...updated[index], ...fetched };
    setHanziList(updated);
  };

  const handleAddRow = () => {
    setHanziList([...hanziList, { hanzi: "", pinyin: "", meaning: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...hanziList];
    updated.splice(index, 1);
    setHanziList(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validWords = hanziList.filter((w) => w.hanzi && w.pinyin && w.meaning);
    if (validWords.length === 0) {
      toastHelper.error("Bạn cần nhập ít nhất 1 từ hợp lệ");
      return;
    }

    setIsLoading(true);
    try {
      const res = await addVocabulary(validWords);
      toastHelper.success(res.data.message || "Thêm từ thành công!");
      onSubmit();
      onClose();
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message || "Đã xảy ra lỗi";

      if (status === 409 || status === 400) {
        toastHelper.error(msg);
      } else {
        toastHelper.error("Thêm từ thất bại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Thêm nhiều từ</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
                  <th className="p-2">Chữ Hán</th>
                  <th className="p-2">Pinyin</th>
                  <th className="p-2">Nghĩa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {hanziList.map((item, index) => (
                  <tr key={index} className="border-t dark:border-gray-600">
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.hanzi}
                        onChange={(e) => handleChange(index, "hanzi", e.target.value)}
                        onPaste={(e) => handlePaste(e, index)}
                        onBlur={() => handleBlur(index)}
                        placeholder="Nhập Hán tự"
                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.pinyin}
                        onChange={(e) => handleChange(index, "pinyin", e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.meaning}
                        onChange={(e) => handleChange(index, "meaning", e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="p-2">
                      {hanziList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="text-red-500 hover:underline text-sm"
                        >
                          Xóa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleAddRow}
              className="text-blue-500 hover:underline text-sm"
            >
              + Thêm dòng
            </button>

            <div className="flex gap-3">
              <AnimatedButton
                type="button"
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                Hủy
              </AnimatedButton>
              <AnimatedButton
                type="submit"
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isLoading ? "Đang thêm..." : "Thêm tất cả"}
              </AnimatedButton>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
