import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/features/tasks/usersSlice";
import { db } from "../utils/firebase.config";

const Chat = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { users, isLoading, isError, error } = useSelector(
    (state) => state.allUsers
  );
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const messagesEndRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Update current user's online status
  useEffect(() => {
    if (!currentUser?.uid) return;

    const userStatusRef = doc(db, "status", currentUser.uid);
    const unsubscribe = onSnapshot(userStatusRef, (doc) => {
      if (doc.exists()) {
        setOnlineUsers((prev) => ({
          ...prev,
          [currentUser.uid]: doc.data().state === "online",
        }));
      }
    });

    // Set user as online
    setDoc(userStatusRef, {
      state: "online",
      lastChanged: serverTimestamp(),
    });

    // Set user as offline when they disconnect
    const handleBeforeUnload = () => {
      setDoc(userStatusRef, {
        state: "offline",
        lastChanged: serverTimestamp(),
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Set user as offline when component unmounts
      setDoc(userStatusRef, {
        state: "offline",
        lastChanged: serverTimestamp(),
      });
    };
  }, [currentUser?.uid]);

  // Listen to other users' online status
  useEffect(() => {
    if (!currentUser?.uid) return;

    const statusRef = collection(db, "status");
    const q = query(statusRef, where("state", "==", "online"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const onlineStatus = {};
      snapshot.forEach((doc) => {
        onlineStatus[doc.id] = true;
      });
      setOnlineUsers(onlineStatus);
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  // Fetch all users using Redux
  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchUsers());
    }
  }, [currentUser?.uid, dispatch]);

  // Show error toast if there's an error fetching users
  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);

  // Fetch messages for selected user
  useEffect(() => {
    if (!selectedUser) return;

    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("participants", "array-contains", currentUser?.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (msg) =>
            (msg.senderId === currentUser?.uid &&
              msg.receiverId === selectedUser.uid) ||
            (msg.senderId === selectedUser.uid &&
              msg.receiverId === currentUser?.uid)
        );
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser?.uid]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser?.uid,
        receiverId: selectedUser.uid,
        senderName: currentUser?.displayName,
        receiverName: selectedUser.displayName,
        timestamp: serverTimestamp(),
        participants: [currentUser?.uid, selectedUser.uid],
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Users List */}
      <div className="w-1/4 border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.uid}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedUser?.uid === user.uid ? "bg-primary/10" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?name=User&background=random"
                  }
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    onlineUsers[user.uid] ? "bg-green-500" : "bg-gray-400"
                  }`}
                  title={onlineUsers[user.uid] ? "Online" : "Offline"}
                />
              </div>
              <div>
                <p className="font-medium">{user.displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      selectedUser.photoURL ||
                      "https://ui-avatars.com/api/?name=User&background=random"
                    }
                    alt={selectedUser.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      onlineUsers[selectedUser.uid]
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                    title={onlineUsers[selectedUser.uid] ? "Online" : "Offline"}
                  />
                </div>
                <div>
                  <p className="font-medium">{selectedUser.displayName}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === currentUser?.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === currentUser?.uid
                        ? "bg-primary text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp?.toDate().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 p-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
