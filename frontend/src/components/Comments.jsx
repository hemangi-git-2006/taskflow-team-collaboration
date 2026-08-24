import { useEffect, useState } from "react";
import API from "../services/api";

function Comments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Get comments
  const getComments = async () => {
    try {
      const res = await API.get(`/comments/task/${taskId}`);
      setComments(res.data);
    } catch (error) {
      console.log("Error getting comments:", error);
    }
  };

  useEffect(() => {
    if (taskId) {
      getComments();
    }
  }, [taskId]);

  // Add comment
  const handleComment = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      await API.post("/comments", {
        task: taskId,
        user: user._id,
        message: message,
      });

      setMessage("");

      getComments();
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 mt-4">

      <h2 className="text-xl font-bold mb-4">
        Comments
      </h2>

      {/* Comments */}
      <div className="space-y-3 mb-5">

        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-slate-100 rounded-lg p-3"
            >
              <p className="font-semibold">
                {comment.user?.fullName}
              </p>

            <p className="text-gray-600 mt-1">
  {comment.message}
</p>

<button
  onClick={() => handleDeleteComment(comment._id)}
  className="text-red-500 text-sm mt-2 hover:text-red-700"
>
  Delete
</button>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}

      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleComment}
        className="flex gap-3"
      >

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white px-5 rounded-lg hover:bg-teal-700"
        >
          Send
        </button>

      </form>

    </div>
  );
}

export default Comments;