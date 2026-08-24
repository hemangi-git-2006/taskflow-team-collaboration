import { useEffect, useState } from "react";
import {
  FaSearch,
  FaComments,
  FaPaperPlane,
} from "react-icons/fa";

import API from "../services/api";

function AdminComments() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ===============================
  // GET CONVERSATIONS
  // ===============================

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/comments/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CONVERSATIONS:", response.data);

      // Depending on your backend response
      const data =
        response.data.conversations ||
        response.data ||
        [];

      setConversations(data);

      // Automatically select first conversation
      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }

    } catch (error) {
      console.error(
        "Error fetching conversations:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load conversations"
      );

    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    fetchConversations();
  }, []);


  // ===============================
  // SEARCH
  // ===============================

  const filteredConversations =
    conversations.filter((conversation) => {

      const searchText = search.toLowerCase();

      return (
        conversation.title
          ?.toLowerCase()
          .includes(searchText) ||

        conversation.task?.title
          ?.toLowerCase()
          .includes(searchText) ||

        conversation.project?.name
          ?.toLowerCase()
          .includes(searchText)
      );
    });


  // ===============================
  // SEND MESSAGE
  // ===============================

  const handleSendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    if (!selectedConversation) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      /*
        IMPORTANT:

        This endpoint depends on your commentRoutes.js.

        If your backend uses a different POST route,
        change "/comments" here.
      */

      const response = await API.post(
        "/comments",
        {
          conversationId:
            selectedConversation._id,

          message: message.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "MESSAGE SENT:",
        response.data
      );

      setMessage("");

      // Reload conversations/messages
      await fetchConversations();

    } catch (error) {

      console.error(
        "Error sending message:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to send message"
      );
    }
  };


  // ===============================
  // LOADING
  // ===============================

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-500">
            Loading conversations...
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <div className="mb-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Team Communication
        </h1>

        <p className="text-slate-500 mt-1">
          Communicate with your team about assigned tasks
        </p>

      </div>


      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (

        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>

      )}


      {/* ================================= */}
      {/* COMMUNICATION BOX */}
      {/* ================================= */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[650px]">


          {/* ================================= */}
          {/* LEFT - CONVERSATIONS */}
          {/* ================================= */}

          <div className="border-r border-slate-200">


            {/* Header */}

            <div className="p-5 border-b border-slate-200">

              <div className="flex items-center gap-3">

                <FaComments className="text-teal-600 text-xl" />

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    Conversations
                  </h2>

                  <p className="text-sm text-slate-500">
                    {conversations.length} conversations
                  </p>

                </div>

              </div>


              {/* Search */}

              <div className="relative mt-5">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search conversations..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
                />

              </div>

            </div>


            {/* Conversation List */}

            <div className="max-h-[550px] overflow-y-auto">

              {filteredConversations.length === 0 ? (

                <div className="p-8 text-center">

                  <FaComments className="mx-auto text-3xl text-slate-300" />

                  <p className="mt-3 text-slate-500">
                    No conversations found
                  </p>

                </div>

              ) : (

                filteredConversations.map(
                  (conversation) => {

                    const isSelected =
                      selectedConversation?._id ===
                      conversation._id;

                    return (

                      <button
                        key={conversation._id}
                        onClick={() =>
                          setSelectedConversation(
                            conversation
                          )
                        }
                        className={`w-full text-left p-5 border-b border-slate-200 transition
                          ${
                            isSelected
                              ? "bg-teal-50 border-l-4 border-l-teal-500"
                              : "hover:bg-slate-50"
                          }
                        `}
                      >

                        <div className="flex justify-between gap-3">

                          <div className="min-w-0">

                            <h3 className="font-semibold text-slate-800 truncate">

                              {conversation.title ||
                                conversation.task?.title ||
                                "Untitled Task"}

                            </h3>

                            <p className="text-sm text-slate-500 mt-1 truncate">

                              {conversation.employee?.fullName ||
                                conversation.user?.fullName ||
                                conversation.sender?.fullName ||
                                "Employee"}

                              {" → "}

                              {conversation.admin?.fullName ||
                                "Admin"}

                            </p>

                          </div>


                          {/* Status */}

                          {conversation.task?.status && (

                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">

                              {conversation.task.status}

                            </span>

                          )}

                        </div>

                      </button>

                    );

                  }
                )

              )}

            </div>

          </div>


          {/* ================================= */}
          {/* RIGHT - CHAT */}
          {/* ================================= */}

          <div className="lg:col-span-2 flex flex-col">


            {!selectedConversation ? (

              /* No conversation selected */

              <div className="flex-1 flex items-center justify-center">

                <div className="text-center">

                  <FaComments className="mx-auto text-5xl text-slate-300" />

                  <p className="mt-4 text-slate-500">
                    Select a conversation
                  </p>

                </div>

              </div>

            ) : (

              <>

                {/* ============================= */}
                {/* CHAT HEADER */}
                {/* ============================= */}

                <div className="p-5 border-b border-slate-200">

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

                    {selectedConversation.title ||
                      selectedConversation.task?.title ||
                      "Conversation"}

                  </h2>

                  <p className="text-slate-500 mt-1">

                    {selectedConversation.employee?.fullName ||
                      selectedConversation.user?.fullName ||
                      selectedConversation.sender?.fullName ||
                      "Employee"}

                    {" → "}

                    Admin

                  </p>

                </div>


                {/* ============================= */}
                {/* MESSAGES */}
                {/* ============================= */}

                <div className="flex-1 p-5 sm:p-8 space-y-5 overflow-y-auto">

                  {(
                    selectedConversation.messages ||
                    selectedConversation.comments ||
                    []
                  ).length === 0 ? (

                    <div className="flex items-center justify-center h-full">

                      <p className="text-slate-400">
                        No messages yet
                      </p>

                    </div>

                  ) : (

                    (
                      selectedConversation.messages ||
                      selectedConversation.comments ||
                      []
                    ).map(
                      (msg, index) => {

                        const currentUser =
                          JSON.parse(
                            localStorage.getItem(
                              "user"
                            )
                          );

                        const isMine =
                          msg.user?._id ===
                            currentUser?._id ||
                          msg.sender?._id ===
                            currentUser?._id ||
                          msg.author?._id ===
                            currentUser?._id;

                        return (

                          <div
                            key={
                              msg._id || index
                            }
                            className={`flex ${
                              isMine
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >

                            <div
                              className={`max-w-[80%] px-5 py-4 rounded-2xl ${
                                isMine
                                  ? "bg-teal-600 text-white rounded-tr-none"
                                  : "bg-slate-100 text-slate-700 rounded-tl-none"
                              }`}
                            >

                              <p className="font-semibold">

                                {msg.user?.fullName ||
                                  msg.sender?.fullName ||
                                  msg.author?.fullName ||
                                  (isMine
                                    ? "Admin"
                                    : "Employee")}

                              </p>


                              <p className="mt-2">
                                {msg.message ||
                                  msg.text ||
                                  msg.content}
                              </p>


                              {msg.createdAt && (

                                <p
                                  className={`text-xs mt-2 ${
                                    isMine
                                      ? "text-teal-100"
                                      : "text-slate-400"
                                  }`}
                                >

                                  {new Date(
                                    msg.createdAt
                                  ).toLocaleString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}

                                </p>

                              )}

                            </div>

                          </div>

                        );
                      }
                    )

                  )}

                </div>


                {/* ============================= */}
                {/* SEND MESSAGE */}
                {/* ============================= */}

                <div className="border-t border-slate-200 p-4 sm:p-5">

                  <div className="flex gap-3">

                    <input
                      type="text"
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      onKeyDown={(e) => {

                        if (
                          e.key === "Enter" &&
                          !e.shiftKey
                        ) {
                          e.preventDefault();
                          handleSendMessage();
                        }

                      }}
                      placeholder="Write a message..."
                      className="flex-1 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                    />


                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 sm:px-6 rounded-xl font-semibold flex items-center gap-2 transition"
                    >

                      <FaPaperPlane />

                      <span className="hidden sm:block">
                        Send
                      </span>

                    </button>

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminComments;