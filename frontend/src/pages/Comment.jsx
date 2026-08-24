import { useEffect, useState } from "react";
import API from "../services/api";


function Comment() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [message, setMessage] = useState("");

    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    // =========================
    // Get conversations
    // =========================

    const fetchConversations = async () => {
        try {
            const res = await API.get("/comments/conversations");

            setConversations(res.data);

            if (res.data.length > 0) {
                setSelectedConversation(res.data[0]);
            }
        } catch (error) {
            console.log("Error fetching conversations:", error);
        }
    };
    useEffect(() => {
      const fetchConversations = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await API.get("/comments/conversations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CONVERSATIONS:", response.data);

    setConversations(response.data);
  } catch (error) {
    console.error(
      "Error fetching conversations:",
      error.response?.data || error.message
    );
  }
};

        fetchConversations();
    }, []);
    // =========================
    // Send Message
    // =========================

    const handleSend = async () => {
        if (!message.trim() || !selectedConversation) return;

        try {
            await API.post("/comments", {
                task: selectedConversation.task._id,
                user: user._id,
                message: message,
            });

            setMessage("");

            fetchConversations();

        } catch (error) {
            console.log("Error sending message:", error);
        }
    };




    return (
        <div className="min-h-screen bg-slate-100">

      
    
            {/* ========================= */}
            {/* MAIN CONTENT */}
            {/* ========================= */}

          <main className="min-h-screen p-6">

                {/* Header */}

                <div className="mb-6">

                    <h1 className="text-4xl font-bold text-slate-800">
                        Team Communication
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Communicate with your team about assigned tasks
                    </p>

                </div>

                {/* Search */}

                <div className="bg-white rounded-2xl shadow p-5 mb-6">

                    <input
                        type="text"
                        placeholder="🔍 Search conversations..."
                        className="
              w-full
              border
              border-slate-200
              rounded-xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-teal-500
            "
                    />

                </div>

                {/* ========================= */}
                {/* CHAT AREA */}
                {/* ========================= */}

                <div
                    className="
            bg-white
            rounded-2xl
            shadow
            overflow-hidden
            grid
            grid-cols-1
            lg:grid-cols-3
            min-h-[650px]
          "
                >

                    {/* ========================= */}
                    {/* CONVERSATION LIST */}
                    {/* ========================= */}

                    <div className="border-r border-slate-200">

                        <div className="p-6 border-b">

                            <h2 className="text-xl font-bold">
                                Conversations
                            </h2>

                            <p className="text-slate-500 mt-1">
                                {conversations.length} tasks
                            </p>

                        </div>

                        <div>

                            {conversations.length === 0 ? (

                                <div className="p-6 text-center text-slate-400">
                                    No conversations found
                                </div>

                            ) : (

                                conversations.map((conversation) => (

                                    <button
                                        key={conversation.task._id}
                                        onClick={() =>
                                            setSelectedConversation(conversation)
                                        }
                                        className={`
                      w-full
                      text-left
                      p-6
                      border-b
                      transition

                      ${selectedConversation?.task?._id ===
                                                conversation.task._id
                                                ? "bg-teal-50 border-l-4 border-teal-500"
                                                : "hover:bg-slate-50"
                                            }
                    `}
                                    >

                                        <div className="flex justify-between">

                                            <h3 className="font-semibold text-lg">
                                                {conversation.task.title}
                                            </h3>

                                            <span className="text-sm">
                                                {conversation.task.status}
                                            </span>

                                        </div>

                                        <p className="text-sm text-slate-500 mt-2">

                                            {conversation.task.createdBy?.fullName}

                                            {" → "}

                                            {conversation.task.assignedTo?.fullName}

                                        </p>

                                    </button>

                                ))

                            )}

                        </div>

                    </div>

                    {/* ========================= */}
                    {/* CHAT WINDOW */}
                    {/* ========================= */}

                    <div className="lg:col-span-2 flex flex-col">

                        {selectedConversation ? (

                            <>

                                {/* Chat Header */}

                                <div className="p-6 border-b">

                                    <h2 className="text-2xl font-bold">
                                        {selectedConversation.task.title}
                                    </h2>

                                    <p className="text-slate-500 mt-1">

                                        {selectedConversation.task.createdBy?.fullName}

                                        {" → "}

                                        {selectedConversation.task.assignedTo?.fullName}

                                    </p>

                                </div>

                                {/* Messages */}

                                <div className="flex-1 p-6 space-y-4 overflow-y-auto">

                                    {selectedConversation.comments?.length === 0 ? (

                                        <div className="h-full flex items-center justify-center">

                                            <div className="text-center text-slate-400">

                                                <div className="text-5xl mb-4">
                                                    💬
                                                </div>

                                                <p className="text-lg">
                                                    No messages yet
                                                </p>

                                                <p className="text-sm mt-1">
                                                    Start the conversation
                                                </p>

                                            </div>

                                        </div>

                                    ) : (

                                        selectedConversation.comments.map(
                                            (comment) => (

                                                <div
                                                    key={comment._id}
                                                    className={`
                            flex
                            ${comment.user?._id === user?._id
                                                            ? "justify-end"
                                                            : "justify-start"
                                                        }
                          `}
                                                >

                                                    <div
                                                        className={`
                              max-w-[70%]
                              px-5
                              py-3
                              rounded-2xl

                              ${comment.user?._id === user?._id
                                                                ? "bg-teal-600 text-white"
                                                                : "bg-slate-100 text-slate-800"
                                                            }
                            `}
                                                    >

                                                        <p className="font-semibold text-sm">
                                                            {comment.user?.fullName}
                                                        </p>

                                                        <p className="mt-1">
                                                            {comment.message}
                                                        </p>

                                                        <p className="text-xs opacity-70 mt-2">

                                                            {new Date(
                                                                comment.createdAt
                                                            ).toLocaleString()}

                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                                {/* Message Input */}

                                <div className="p-5 border-t flex gap-3">

                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSend();
                                            }
                                        }}
                                        placeholder="Write a message..."
                                        className="
                      flex-1
                      border
                      border-slate-200
                      rounded-xl
                      px-5
                      py-4
                      outline-none
                      focus:ring-2
                      focus:ring-teal-500
                    "
                                    />

                                    <button
                                        onClick={handleSend}
                                        className="
                      bg-teal-600
                      hover:bg-teal-700
                      text-white
                      px-8
                      rounded-xl
                      font-semibold
                    "
                                    >
                                        Send
                                    </button>

                                </div>

                            </>

                        ) : (

                            <div className="flex items-center justify-center h-full text-slate-400">

                                Select a conversation

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Comment;