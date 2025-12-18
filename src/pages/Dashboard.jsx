import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");

  const navigate = useNavigate();






// 🗑️ Delete Job
const deleteJob = async (id) => {
  const confirmDelete = window.confirm("Delete this job?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (!error) fetchJobs();
};


  // 🔐 Get Logged-in User
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/");
    } else {
      setUser(user);
      fetchJobs();
    }
  };

  // 📥 Fetch Jobs
  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setJobs(data);
  };

  // ➕ Add Job
  const handleAddJob = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("job_applications").insert([
      {
        company,
        role,
        status,
        applied_date: appliedDate,
      },
    ]);

    if (!error) {
      setCompany("");
      setRole("");
      setAppliedDate("");
      setStatus("Applied");
      fetchJobs();
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome, <span className="font-medium">{user.email}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Add Job Form */}
        <form
          onSubmit={handleAddJob}
          className="bg-white p-6 rounded-xl shadow-md max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Add Job</h2>

          <input
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            placeholder="Job Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
          

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Add Job
          </button>
        </form>

        {/* Job List */}
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{job.company}</h3>
                <p>{job.role}</p>
                <p className="text-sm text-gray-500">
                  {job.status} | {job.applied_date}
                </p>

                
                 {/* Delete Button */}
        <button
          onClick={() => deleteJob(job.id)}
          className="text-red-600 font-bold text-lg"
        >
          ✕
        </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
