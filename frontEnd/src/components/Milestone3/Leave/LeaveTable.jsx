import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultButton from '../../UI/DefaultButton';
import moment from 'moment';

function LeaveTable({ setRequestLeaveVisibility, setEditLeaveVisibility }) {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:8081/leaves');
                // Sorting the leaves based on status
                const sortedLeaves = response.data.sort((a, b) => {
                    const statusOrder = {
                        "Pending": 1,
                        "Approved": 2,
                        "Denied": 3
                    };
                    return statusOrder[a.leaveStatus] - statusOrder[b.leaveStatus];
                });
                setLeaves(sortedLeaves);
            } catch (error) {
                console.error('Error fetching leaves:', error);
            }
        };

        fetchLeaves();
    }, []);
    const handleAdd = () => {
        setRequestLeaveVisibility(true);
    };

    const formatDateToDateTime = (date) => {
        return moment.utc(date).local().format('YYYY-MM-DD');
    };


    return (
        <div className="leaveDiv">
            <table className="leaveTable">
                <thead>
                    <tr>
                        <th className="leaveTable">Employee No.</th>
                        <th className="leaveTable">Name</th>
                        <th className="leaveTable">Department</th>
                        <th className="leaveTable">Start Date and Time</th>
                        <th className="leaveTable">End Date and Time</th>
                        <th className="leaveTable">Leave Type</th>
                        <th className="leaveTable">Superior</th>
                        <th className="leaveTable">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.employeeNumber}</td>
                                <td>{leave.employeeName}</td>
                                <td>{leave.department}</td>
                                <td>{formatDateToDateTime(leave.startLeave)}</td>
                                <td>{formatDateToDateTime(leave.endLeave)}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.superiorName}</td>
                                <td>{leave.leaveStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td id="empty-list-label" colSpan={8} className="border-black border border-solid border-collapse">No leaves found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='add-button-container' onClick={handleAdd}>
                <DefaultButton label="Request Leave" classLabel="requestLeaveButton" />
            </div>
        </div>
    );
}   

LeaveTable.propTypes = {
    setRequestLeaveVisibility: PropTypes.func.isRequired,
    setEditLeaveVisibility: PropTypes.func.isRequired
};

export default LeaveTable;
