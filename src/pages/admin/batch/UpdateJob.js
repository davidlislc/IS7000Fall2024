import React, { useState, useEffect } from "react";
import axios from "axios";
import { setAuthToken } from "./AuthToken"; // Correct import
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./Api";

const UpdateJob = () => {
    const [formData, setFormData] = useState({
        id: "", // ID that should be static and not changeable
        name: "",
        job: "",
        runDate: "",
        batchStatus: "PENDING", // Default status
        user: "",
    });

    const navigate = useNavigate(); // Navigation hook

    useEffect(() => {
        // Assume id is fetched from the selected job details or passed from another component
        // For example, get the job id through props or some parent component state
        const jobId = "existing-job-id"; // Replace with logic to fetch current job ID
        setFormData((prev) => ({
            ...prev,
            id: jobId, // Static and not editable
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Format the runDate to yyyy/mm/dd (if necessary)
            const formattedDate = formData.runDate.replace(/-/g, "/");

            const payload = {
                ...formData,
                runDate: formattedDate, // Ensure the correct date format
            };

            // Config for API call
            const config = {
                headers: {
                    Authorization: Bearer ${setAuthToken()}, // Get token from setAuthToken function
                    "Content-Type": "application/json",
                },
            };

            // Send POST request to the API
            const response = await axios.post(apiUrl, payload, config);

            if (response.status === 201) {
                alert("Job successfully updated!");
                console.log("Job response:", response.data);

                // Reset form after successful submission
                setFormData({
                    id: formData.id, // Keep the same id, no new UUID needed
                    name: "",
                    job: "",
                    runDate: "",
                    batchStatus: "PENDING",
                    user: "",
                });
            } else {
                alert("Failed to update the job. Please try again.");
            }
        } catch (error) {
            console.error("Error updating job:", error);
            alert("Failed to update the job. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-semibold text-center mb-6">Update Batch</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* ID Field (Read-Only and hidden) */}
                    <div className="form-group">
                        <label htmlFor="id" className="block text-lg font-medium text-gray-700">ID</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            readOnly
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter batch name"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Job Field */}
                    <div className="form-group">
                        <label htmlFor="job" className="block text-lg font-medium text-gray-700">Job</label>
                        <input
                            type="text"
                            id="job"
                            name="job"
                            value={formData.job}
                            onChange={handleChange}
                            required
                            placeholder="Enter job description"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Run Date Field */}
                    <div className="form-group">
                        <label htmlFor="runDate" className="block text-lg font-medium text-gray-700">Run Date</label>
                        <input
                            type="date"
                            id="runDate"
                            name="runDate"
                            value={formData.runDate}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Batch Status Dropdown */}
                    <div className="form-group">
                        <label htmlFor="batchStatus" className="block text-lg font-medium text-gray-700">Batch Status</label>
                        <select
                            id="batchStatus"
                            name="batchStatus"
                            value={formData.batchStatus}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </div>

                    {/* User Field */}
                    <div className="form-group">
                        <label htmlFor="user" className="block text-lg font-medium text-gray-700">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            required
                            placeholder="Enter user name"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Submit and Back Buttons */}
                    <div className="form-buttons flex justify-between items-center">
                        <button
                            type="button"
                            className="back-button px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="save-button px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJob;