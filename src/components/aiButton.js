"use client";

import api from "../services/api";

import Swal from "sweetalert2";

export default function AIButton({

    description,

}) {

    const handleAI = async () => {

        const { data } = await api.post("/ai/issue-triage", {

            description,

        });

        Swal.fire({

            title: "AI Suggestion",

            html: `<pre style="text-align:left">${data.result}</pre>`,

            background: "#1e293b",

            color: "#fff",

            width: 700,

        });

    };

    return (

        <button
            onClick={handleAI}
            className="bg-green-600 px-4 py-2 rounded"
        >

            AI Suggestion

        </button>

    );

}