"use client";

import { useEffect, useState } from "react";

import api from "../../../../services/api";

export default function PublicAssetPage({

    params,

}) {

    const [asset, setAsset] = useState(null);

    useEffect(() => {

        fetchAsset();

    }, []);

    const fetchAsset = async () => {

        const { data } = await api.get(

            `/public/asset/${params.assetCode}`

        );

        setAsset(data.asset);

    };

    if (!asset) {

        return (

            <div className="h-screen flex justify-center items-center">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

            <div className="bg-slate-800 p-8 rounded-lg w-96">

                <h1 className="text-3xl font-bold mb-5">

                    {asset.assetName}

                </h1>

                <p>

                    Asset Code : {asset.assetCode}

                </p>

                <p>

                    Category : {asset.category}

                </p>

                <p>

                    Location : {asset.location}

                </p>

                <p>

                    Manufacturer : {asset.manufacturer}

                </p>

                <p>

                    Model : {asset.model}

                </p>

            </div>

        </div>

    );

}