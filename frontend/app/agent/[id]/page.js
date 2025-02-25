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

        if (agent.id === "journalist") {
            const fetchAgentData = async () => {
                try {
                    const response = await fetch("http://localhost:3001/character");
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
        } else {
            setLoading(false);
        }
    }, [id, agent]);

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        try {
            // Fetch the current timestamp from an API route
            const response = await fetch('/api/timestamp'); // Create this API route
            const { timestamp } = await response.json();
            const date = new Date(timestamp).toLocaleDateString(); // Format date from timestamp

            // Create user log entry
            const userLog = {
                type: 'USER_PROMPT',
                message: userInput,
                date: date,
                timestamp: timestamp, // Use fetched timestamp
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

            // Log both user and agent messages to the /logs endpoint
            await logToChopin(userLog);
            await logToChopin(agentLog);

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

   // Update logToChopin function in AgentDetail.js
   const logToChopin = async (log) => {
    try {
      const jwt = localStorage.getItem("chopin_token");
      const address = localStorage.getItem("wallet_address");
  
      const chopinLog = {
        type: log.type,
        content: log.message,
        metadata: {
          agent: log.agent,
          address: address,
          timestamp: log.timestamp,
          date: log.date,
          chain: "celestia"
        }
      };
  
      const response = await fetch("http://localhost:4000/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(chopinLog),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to log message: ${await response.text()}`);
      }
  
    } catch (error) {
      console.error("Error logging to Chopin:", error);
    }
  };

  
// app/components/AgentDetail.js (new functions)
const handleLogSelection = (log) => {
    setSelectedLog(log);
  };
  
  const sendSelectedLog = async () => {
    if (!selectedLog) return;
  
    try {
      const jwt = localStorage.getItem("chopin_token");
      const address = localStorage.getItem("wallet_address");
  
      // Structure for Celestia submission
      const celestiaLog = {
        type: "CELESTIA_SUBMISSION",
        content: selectedLog.message,
        metadata: {
          agent: selectedLog.agent,
          address: address,
          timestamp: Date.now(),
          verified: true // Mark as user-approved
        }
      };
  
      const response = await fetch("http://localhost:4000/_chopin/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(celestiaLog),
      });
  
      if (!response.ok) throw new Error("Celestia submission failed");
      
      alert("Successfully submitted to Celestia!");
      setSelectedLog(null);
  
    } catch (error) {
      console.error("Celestia submission error:", error);
      alert("Failed to submit to Celestia");
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

                {/* Interaction Logs */}
                <div className={homeStyle.logSection}>
                    <h3>Interaction Logs</h3>
                    <div className={homeStyle.logList}>
                        {interactionLogs.map((log, index) => (
                            <div key={index} className={`${homeStyle.logEntry} ${log.type === 'USER_PROMPT' ? homeStyle.userLog : ''} ${log.type === 'AGENT_RESPONSE' ? homeStyle.agentLog : ''}`}>
                                <div className={homeStyle.logHeader} onClick={() => handleLogSelection(log)}>
                                    <span className={homeStyle.logType}>{log.type}</span>
                                    <span className={homeStyle.logTimestamp}>
                                        {new Date(log.timestamp).toLocaleTimeString()} on {log.date}
                                    </span>
                                </div>
                                <div className={homeStyle.logMessage}>
                                    {log.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Log Section */}
                {selectedLog && (
                    <div className={homeStyle.selectedLogSection}>
                        <h4>Selected Log</h4>
                        <div>
                            <strong>{selectedLog.type}:</strong> {selectedLog.message}
                        </div>
                        <button onClick={sendSelectedLog}>Send Selected Log to Celestia</button>
                    </div>
                )}

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