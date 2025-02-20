"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Use navigation for App Router
import agentsConfig from "../config/agents"; 
import style from "../cssComponents/Home.module.css";

export default function AI_Agent() {
    const router = useRouter();

    return (
        <div className={style["ai-agent-container"]}>
            <h2 className={style["ai-agent-header"]}>AI AGENTS</h2>

            <ul className={style["ai-agent-list"]}>
                {agentsConfig.map((agent) => (
                    <li
                        key={agent.id}
                        className={style["ai-agent-item"]}
                        onClick={() => router.push(`/agent/${agent.id}`)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${agent.name}`}
                    >
                        {agent.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}