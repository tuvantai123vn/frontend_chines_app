import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTestHistory } from "../services/api";
import LoadingSpinner from "../components/Common/LoadingSpinner";

export default function TestHistoryList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getTestHistory();
        console.log(res.data)
        setTests(res.data.data || []);
      } catch (error) {
        console.error("Error fetching test history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Lịch sử kiểm tra
      </h1>
      {tests.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Chưa có bài kiểm tra nào.</p>
      ) : (
        <ul className="space-y-4">
          {tests.map((test) => (
            <li key={test._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-700 dark:text-white">
                    {test.testType === "MCQ" ? "Trắc nghiệm" : "Tự luận"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ngày làm: {new Date(test.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/test-detail/${test._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
