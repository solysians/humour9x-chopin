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
    const [selectedLog, setSelectedLog] = useState(null);

    const agent = agentsConfig.find((a) => a.id === id);

    useEffect(() => {
        if (!agent) return;

        const fetchAgentData = async () => {
            try {
                const response = await fetch(`/api/backend/character/${id}`);
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

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        try {
            // Get Oracle timestamp for user prompt
            const timestampResponse = await fetch('/api/timestamp', {
                headers: {
                    'x-callback-url': process.env.NEXT_PUBLIC_ORACLE_CALLBACK
                }
            });
            if (!timestampResponse.ok) throw new Error("Timestamp failed");
            const { timestamp: userTimestamp } = await timestampResponse.json();

            // Create user log entry
            const userLog = {
                type: 'USER_PROMPT',
                message: userInput,
                agent: id,
                timestamp: userTimestamp
            };

            // Send message to agent
            const agentResponse = await fetch(`/api/agent/${id}/message`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    'x-callback-url': process.env.NEXT_PUBLIC_ORACLE_CALLBACK
                },
                body: JSON.stringify({
                    text: userInput,
                    userId: "user",
                    userName: "User",
                }),
            });

            if (!agentResponse.ok) throw new Error("Agent response failed");
            const data = await agentResponse.json();

            // Get Oracle timestamp for agent response
            const responseTimestampRes = await fetch('/api/timestamp', {
                headers: {
                    'x-callback-url': process.env.NEXT_PUBLIC_ORACLE_CALLBACK
                }
            });
            const { timestamp: agentTimestamp } = await responseTimestampRes.json();

            // Create agent log entry
            const agentLog = {
                type: 'AGENT_RESPONSE',
                message: data[0].text,
                agent: id,
                timestamp: agentTimestamp
            };

            // Update states
            setInteractionLogs(prev => [...prev, userLog, agentLog]);
            setChatHistory(prev => [
                ...prev,
                { 
                    user: "You", 
                    text: userInput, 
                    timestamp: userTimestamp 
                },
                { 
                    user: agent.name, 
                    text: data[0].text, 
                    timestamp: agentTimestamp 
                },
            ]);
            setUserInput("");

        } catch (error) {
            console.error("Error:", error);
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
                                <div className={homeStyle.timestamp}>
                                    {formatTimestamp(msg.timestamp)}
                                </div>
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