import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart } from 'recharts'
import { generateMockData, RechartsDevtools } from '@recharts/devtools';
const data = generateMockData(6, 823);
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-10'>
        <div className='col-span-1'>
          <Sidebar />

        </div>
        <div className='col-span-4 p-5'>
          <div className='grid md:grid-cols-3 gap-5'>

            {/* Total Books */}
            <div className='bg-blue-900 text-white p-5 rounded shadow flex items-center justify-around'>
              <FontAwesomeIcon icon={faBook} className='text-4xl' />
              <div className='text-center'>
                <p>Total number of Books</p>
                <h2 className='text-3xl font-bold'>100 +</h2>
              </div>
            </div>

            {/* Total Users */}
            <div className='bg-green-700 text-white p-5 rounded shadow flex items-center justify-around'>
              <FontAwesomeIcon icon={faUsers} className='text-4xl' />
              <div className='text-center'><p>Total Number of Users</p>
                <h2 className='text-3xl font-bold'>100 +</h2>
              </div>
            </div>

            {/* Total Employees */}
            <div className='bg-yellow-500 text-white p-5 rounded shadow flex items-center justify-around'>
              <FontAwesomeIcon icon={faUserTie} className='text-4xl' />
              <div className='text-center'><p>Total number of Employee</p>
                <h2 className='text-3xl font-bold'>100 +</h2>
              </div>
            </div>

          </div>
          {/* {grid chart-title} */}
          <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div className='font-bold'>
              Book Purchase Ratio
            </div>
            <div className='font-bold'>
              Growth Ratio(Yearly)
            </div>
          </div>
          {/* {grid chart} */}
          <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div>
              {/* { Book Purchase Ratio-barchart} */}
              <ResponsiveContainer width={'100%'} height={'300'}>
                <BarChart

                  responsive
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="label" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  <Bar fill='#8884d8' dataKey="x" radius={[10, 10, 0, 0]} />
                  <Bar fill='#82ca9d' dataKey="y" radius={[10, 10, 0, 0]} />
                  <RechartsDevtools />
                </BarChart>

              </ResponsiveContainer>
            </div>
            <div>
              {/* {Growth Ratio(Yearly)} */}
              <ResponsiveContainer>
                <PieChart responsive >
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                    stroke="white"

                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    stroke="white"
                    label

                  />
                  <Tooltip />
                  <RechartsDevtools />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard