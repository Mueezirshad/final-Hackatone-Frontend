"use client";

import Swal from "sweetalert2";
import api from "../services/api";

export default function DeleteButton({

    id,

    refresh,

}) {

    const handleDelete = () => {

        Swal.fire({

            title: "Delete?",

            icon: "warning",

            showCancelButton: true,

            background: "#1e293b",

            color: "#fff",

        }).then(async (result) => {

            if (result.isConfirmed) {

                await api.delete(`/assets/${id}`);

                Swal.fire({

                    icon: "success",

                    title: "Deleted",

                    background: "#1e293b",

                    color: "#fff",

                });

                refresh();

            }

        });

    };

    return (

        <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-all"
        >
            Delete
        </button>

    );

}