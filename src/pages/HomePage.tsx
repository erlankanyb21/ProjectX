import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../styles/HomePage.css';
import axios from 'axios';

interface Task {
    id: number;
    name: string;
    group: string;
    status: string;
    priority: number;
    quantity: number | string | null;
    deadline?: string;
    additional_info?: string;
}

const API_URL = 'https://projectxb.onrender.com/api/tasks/';

export const HomePage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            renderTasks();
        }
    }, [tasks, nameFilter, groupFilter, statusFilter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken')
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Ошибка при загрузке задач. Попробуйте позже.');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderTasks = () => {
        const filteredTasks = tasks.filter(task =>
            (task.name.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === '') &&
            (groupFilter === 'all' || task.group === groupFilter) &&
            (statusFilter === 'all' || task.status === statusFilter)
        );

        updateChart(filteredTasks);
    };

    const updateChart = (filteredTasks: Task[]) => {
        const statusCounts: { [key: string]: number } = filteredTasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        const labels = Object.keys(statusCounts);
        const data = Object.values(statusCounts);

        if (chartInstance.current) {
            chartInstance.current.data.labels = labels;
            chartInstance.current.data.datasets[0].data = data;
            chartInstance.current.update();
        } else if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Количество задач',
                        data: data,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Фильтр по названию"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <select
                    value={groupFilter}
                    onChange={(e) => setGroupFilter(e.target.value)}
                >
                    <option value="all">Все группы</option>
                    <option value="Эмиссия">Эмиссия</option>
                    <option value="Сопровождение">Сопровождение</option>
                </select>
            </div>
            <table id="taskTable">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Группировка</th>
                        <th>Статус</th>
                        <th>Приоритет</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks
                        .filter(task =>
                            (task.name.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === '') &&
                            (groupFilter === 'all' || task.group === groupFilter)
                        )
                        .map(task => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>{task.group}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>{task.quantity !== null ? task.quantity.toLocaleString() : '-'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Статистика по статусам</h2>
            <div className="chart-container">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};