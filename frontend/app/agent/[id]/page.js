"use client";

import { useParams, useRouter } from "next/navigation";
import headerStyle from "@/app/cssComponents/Header.module.css"; 
import homeStyle from "@/app/cssComponents/Home.module.css"; 
import agentsConfig from "@/app/config/agents"; 
import Header from "@/app/components/Header";
import { useTheme } from "@/app/Hooks/useTheme";
import { useState, useEffect } from "react";

export default function AgentDetail() {
    const { id } = useParams(); // Get the dynamic agent ID from the URL
    const router = useRouter();
    const [display, setDisplay] = useState("block"); // Define display state
    const [theme] = useTheme(); // Destructure correctly
    const dark = theme?.dark || false;
    const [agentData, setAgentData] = useState(null); // State to store fetched agent data
    const [loading, setLoading] = useState(true); // Loading state
    const [userInput, setUserInput] = useState(""); // State for user input
    const [chatHistory, setChatHistory] = useState([]); // State to store chat history

    // Find the agent in your static config
    const agent = agentsConfig.find((a) => a.id === id);

    // Fetch agent data only for the Journalist
    useEffect(() => {
        if (!agent) return;

        if (agent.id === "journalist") {
            const fetchAgentData = async () => {
                try {
                    const response = await fetch("http://localhost:3001/character");
                    if (!response.ok) {
                        throw new Error("Failed to fetch agent data");
                    }
                    const data = await response.json();
                    setAgentData(data);
                } catch (error) {
                    console.error("Error fetching agent data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAgentData();
        } else {
            setLoading(false);
        }
    }, [id, agent]); // Ensure dependencies are correctly set

    // Function to send user input to the backend and get the agent's response
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        try {
            const response = await fetch(`http://localhost:3000/${id}/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: userInput,
                    userId: "user",
                    userName: "User",
                }),
            });

            const data = await response.json();
            setChatHistory((prev) => [
                ...prev,
                { user: "You", text: userInput },
                { user: agent.name, text: data[0].text },
            ]);
            setUserInput(""); // Clear input after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!agent) {
        return <h2>Agent not found!</h2>;
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <main className={`${homeStyle.main} ${dark ? homeStyle.dark : ""}`} style={{ display }}>
            <Header />
            <div className={`${homeStyle.mainSectionContent} ${dark ? homeStyle.dark : ""}`}>

                </div>
                <div>
                <h1 className={homeStyle.agentName}>{agent.name}</h1>
                <p className={homeStyle.agentRole}>Role: {agent.role}</p>

                {/* Display fetched agent data only for Journalist
                {agent.id === "journalist" && agentData && (
                    <div className={homeStyle.agentDetails}>
                      
                      
                 </div>
                )} */}

                {/* Chat Interface */}
                <div className={homeStyle.chatContainer}>
                    <div className={homeStyle.chatHistory}>
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={msg.user === "You" ? homeStyle.userMessage : homeStyle.agentMessage}>
                                <strong>{msg.user}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className={homeStyle.chatInput}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Fixed event
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
                <div className={homeStyle.mainSectionContent} > {/* Improved Button */}
                <button 
                    className={`${homeStyle.goBackButton} ${dark ? homeStyle.darkButton : ""}`} 
                    onClick={() => router.push("/")}
                >
                    Go Back
                </button></div>

               
            </div>
        </main>
    );
}
