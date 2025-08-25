import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle button with custom image or close icon */}
      <button
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "transparent",
          padding: 0,
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? (
          <AiOutlineClose size={30} color="#0997e8" />
        ) : (
          <img
            src="/botimage.png" // your custom icon image path (placed in public folder)
            alt="Open Chatbot"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </button>

      {/* Chatbot iframe */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            borderRadius: 8,
            overflow: "hidden",
            zIndex: 1000,
            backgroundColor: "#fff",
          }}
        >
          <iframe
            title="Yoga Chatbot"
            src="https://widget.botsonic.com/CDN/index.html?service-base-url=https%3A%2F%2Fapi-bot.writesonic.com&token=66c83fe6-7df4-4ce2-8c28-e92628b9c3ae&base-origin=https%3A%2F%2Fbot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https%3A%2F%2Fbot.writesonic.com%2Fbots%2Fd392f968-bb8f-4812-80f2-ebadf7771162%2Fconnect"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ borderRadius: 8 }}
            allow="microphone"
          />
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;
