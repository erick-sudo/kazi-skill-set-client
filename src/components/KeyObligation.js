import React from "react";

function KeyObligations() {
    return (
        <div className="max-w-lg m-4 p-2 rounded-md shadow-lg">
            <h2 className="font-bold text-center">Available Job Categories</h2>
            <ul className="ml-3 marker:text-white list-disc list-inside p-2 rounded-md">
                <li>Health</li>
                <li>Education</li>
                <li>Building and Construction</li>
                <li>Software Services</li>
                <li>Employee Supervision</li>
                <li>Social Services</li>
                <ul>
                    <li>Cleaning</li>
                    <li>Hospitality</li>
                    <li>Security Services</li>
                    <li>Events Management</li>
                    <li>Gardening and Landscaping</li>
                </ul>
            </ul>
        </div>
    )
}

export default KeyObligations;