"use client";

import { useParams, useRouter } from "next/navigation";
import headerStyle from "@/app/cssComponents/Header.module.css";
import homeStyle from "@/app/cssComponents/Home.module.css";
import agentsConfig from "@/app/config/agents";
import Header from "@/app/components/Header";
import { useTheme } from "@/app/Hooks/useTheme";
import { useState, useEffect } from "react";

export default function AgentDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [display] = useState("block");
    const [theme] = useTheme();
    const dark = theme?.dark || false;
    const [agentData, setAgentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [interactionLogs, setInteractionLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null); // State to track selected log

    const agent = agentsConfig.find((a) => a.id === id);

    useEffect(() => {
        if (!agent) return;

        const fetchAgentData = async () => {
            try {
              
                const response = await fetch(`http://localhost:3001/character/${id}`);
                if (!response.ok) throw new Error("Failed to fetch agent data");
                const data = await response.json();
                setAgentData(data);
            } catch (error) {
                console.error("Error fetching agent data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgentData();
    }, [id, agent]);

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        try {
    
            const response = await fetch('/api/timestamp'); 
            const { timestamp } = await response.json();
            const date = new Date(timestamp).toLocaleDateString(); 

            // Create user log entry
            const userLog = {
                type: 'USER_PROMPT',
                message: userInput,
                date: date,
                timestamp: timestamp, 
                agent: id
            };

            // Send user input to the agent
            const agentResponse = await fetch(`http://localhost:3000/${id}/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: userInput,
                    userId: "user",
                    userName: "User  ",
                }),
            });

            if (!agentResponse.ok) throw new Error("Agent response failed");

            const data = await agentResponse.json();
            const responseText = data[0].text;

            // Create agent log entry
            const agentLog = {
                type: 'AGENT_RESPONSE',
                message: responseText,
                date: date,
                timestamp: timestamp, // Use fetched timestamp
                agent: id
            };

            // Update interaction logs and chat history
            setInteractionLogs(prev => [...prev, userLog, agentLog]);
            setChatHistory(prev => [
                ...prev,
                { user: "You", text: userInput },
                { user: agent.name, text: responseText },
            ]);
            setUserInput("");

    

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    

    
   

    if (!agent) return <h2>Agent not found!</h2>;
    if (loading) return <h2>Loading...</h2>;

    return (
        <main className={`${homeStyle.main} ${dark ? homeStyle.dark : ""}`} style={{ display }}>
            <Header />
            <div className={`${homeStyle.mainSectionContent} ${dark ? homeStyle.dark : ""}`}>
                <div className={homeStyle.agentHeader}>
                    <h1 className={homeStyle.agentName}>{agent.name}</h1>
                    <p className={homeStyle.agentRole}>{agent.role}</p>
                </div>

                {/* Chat Interface */}
                <div className={homeStyle.chatContainer}>
                    <div className={homeStyle.chatHistory}>
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`${homeStyle.message} ${msg.user === "You" ? homeStyle.userMessage : homeStyle.agentMessage}`}>
                                <strong>{msg.user}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className={homeStyle.chatInput}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>

             


                <button
                    className={`${homeStyle.goBackButton} ${dark ? homeStyle.darkButton : ""}`}
                    onClick={() => router.push("/")}
                >
                    Go Back
                </button>
            </div>
        </main>
    );
}