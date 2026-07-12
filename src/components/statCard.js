export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">

      <h3 className="text-gray-400 text-sm">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}