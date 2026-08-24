import { useEffect, useState } from "react";
import API from "../services/api";

function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  // Get comments
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/task/${taskId}`);
      setComments(res.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchComments();
    }
  }, [taskId]);

  // Add comment
const handleAddComment = async (e) => {
  e.preventDefault();

  if (!message.trim()) return;

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await API.post("/comments", {
      task: taskId,
      user: user._id,
      message: message,
    });

    setComments((prev) => [...prev, res.data.comment]);
    setMessage("");

  } catch (error) {
    console.log("Error adding comment:", error);
  }
};

  return (
    <div className="bg-white rounded-xl p-5 shadow">

      <h2 className="text-lg font-semibold mb-4">
        Comments
      </h2>

      {/* Comments */}
      <div className="space-y-4 mb-5">

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b pb-3"
            >
              <div className="flex justify-between">

                <p className="font-medium">
                  {comment.user?.fullName}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>

              </div>

              <p className="text-gray-600 mt-1">
                {comment.message}
              </p>
            </div>
          ))
        )}

      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleAddComment}
        className="flex gap-2"
      >

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>

      </form>

    </div>
  );
}

export default CommentSection;