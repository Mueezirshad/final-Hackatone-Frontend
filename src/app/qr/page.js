"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import Swal from "sweetalert2";
import { FiPrinter, FiDownload } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";

export default function QRPage() {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [manualId, setManualId] = useState("");
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("dropdown"); // 'dropdown' or 'manual'

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data } = await api.get("/assets");
      const list = data.assets || [];
      setAssets(list);
      if (list.length > 0) {
        setSelectedAssetId(list[0]._id);
        generateQRForId(list[0]._id, true);
      }
    } catch (err) {
      console.error("Failed to load assets", err);
    }
  };

  const generateQRForId = async (assetId, silent = false) => {
    if (!assetId) return;
    try {
      setLoading(true);
      const { data } = await api.get(`/qr/${assetId}`);
      setQr(data.qr);
    } catch (error) {
      if (!silent) {
        Swal.fire({
          icon: "error",
          title: "QR Error",
          text: error.response?.data?.message || "Failed to generate QR code",
          background: "#0f172a",
          color: "#fff",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedAssetId(val);
    if (val) {
      generateQRForId(val);
    } else {
      setQr("");
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualId.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing ID",
        text: "Please enter an Asset ID first",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }
    generateQRForId(manualId.trim());
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Asset QR Code</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
            img { width: 300px; height: 300px; margin-bottom: 20px; }
            h2 { color: #333; margin: 0; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${qr}" alt="QR" />
          <h2>Asset ID: ${mode === 'dropdown' ? selectedAssetId : manualId}</h2>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const activeAsset = assets.find(a => a._id === selectedAssetId);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#0b0f19] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <div className="p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
                <BsQrCode size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">QR Generator</h1>
                <p className="text-slate-400 text-sm mt-0.5">Generate and print high-quality asset QR identification codes</p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-start">
              {/* Settings Panel */}
              <div className="md:col-span-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-6">
                
                {/* Mode Selector Toggle */}
                <div className="flex bg-slate-800/40 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => { setMode("dropdown"); setQr(""); if (selectedAssetId) generateQRForId(selectedAssetId); }}
                    className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition-all ${
                      mode === "dropdown" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Select Asset
                  </button>
                  <button
                    onClick={() => { setMode("manual"); setQr(""); }}
                    className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition-all ${
                      mode === "manual" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Enter ID Manually
                  </button>
                </div>

                {mode === "dropdown" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Choose an Asset</label>
                      <select
                        value={selectedAssetId}
                        onChange={handleSelectChange}
                        className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white transition-all outline-none cursor-pointer text-sm font-medium"
                      >
                        {assets.length === 0 ? (
                          <option value="">No assets available</option>
                        ) : (
                          assets.map((asset) => (
                            <option key={asset._id} value={asset._id}>
                              {asset.assetName} ({asset.assetCode})
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {activeAsset && (
                      <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-xl text-sm space-y-2.5">
                        <h3 className="font-semibold text-slate-300 border-b border-slate-800/80 pb-2">Asset Details</h3>
                        <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                          <span className="text-slate-400">Name:</span>
                          <span className="text-slate-200 font-medium">{activeAsset.assetName}</span>
                          <span className="text-slate-400">Code:</span>
                          <span className="text-slate-200 font-mono">{activeAsset.assetCode}</span>
                          <span className="text-slate-400">Category:</span>
                          <span className="text-slate-200">{activeAsset.category}</span>
                          <span className="text-slate-400">Location:</span>
                          <span className="text-slate-200">{activeAsset.location}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Asset MongoDB ID</label>
                      <input
                        value={manualId}
                        onChange={(e) => setManualId(e.target.value)}
                        placeholder="Paste Asset ID here..."
                        className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white font-mono text-sm transition-all outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl font-semibold shadow-md shadow-blue-500/10 disabled:opacity-55"
                    >
                      {loading ? "Generating..." : "Generate QR Code"}
                    </button>
                  </form>
                )}

              </div>

              {/* QR Display Panel */}
              <div className="md:col-span-2 flex flex-col items-center">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md w-full flex flex-col items-center text-center">
                  <h3 className="text-sm font-semibold text-slate-300 mb-4">QR Preview</h3>
                  
                  <div className="relative bg-white p-4.5 rounded-2xl shadow-xl border border-slate-200 w-full max-w-[240px] aspect-square flex items-center justify-center">
                    {loading ? (
                      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : null}

                    {qr ? (
                      <img
                        src={qr}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-400 text-xs flex flex-col items-center justify-center h-full space-y-2">
                        <span className="text-3xl">📷</span>
                        <span>Select an asset to preview code</span>
                      </div>
                    )}
                  </div>

                  {qr && (
                    <div className="flex gap-2 w-full mt-6">
                      <button
                        onClick={handlePrint}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      >
                        <FiPrinter size={14} />
                        Print QR
                      </button>
                      <a
                        href={qr}
                        download={`asset_qr_${mode === 'dropdown' ? selectedAssetId : manualId}.png`}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      >
                        <FiDownload size={14} />
                        Download
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}