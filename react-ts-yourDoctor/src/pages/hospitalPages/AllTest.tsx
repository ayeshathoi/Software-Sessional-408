// page for hospital home and verify employee
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Paper, Button, Typography, Container } from '@mui/material';

import {allTest , deletetestItem} from '@/api/apiCalls';

interface Tests {
  testid: number;
  testname: string;
  price: number;
  hospital_id: number;
}

function PatientTests() {
  const [alltests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      allTest().then((res) => {
      if(res){
        setTests(res);
      }
      else {
        console.log('error');
      }
    });
  });

  const deleteTest = async (testid: number) => {
    try {
      const data = {test_id: testid}
      console.log("test id ",data);
    const res = await deletetestItem(data);
    if(res){
        alert('Test Deleted Successfully');
        navigate(`/hospitalHome`);
      }
      else {
        console.log("Error in deleting test");
      }
  }
  catch (err) {
      console.log(err);
    }
};

  return (
    <div className="mt-40 ml-40 mr-20">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Adjust the grid item width based on your layout */}
            <Paper elevation={3} className="p-4">
              <Typography variant="h6" gutterBottom>
                Tests Lists
              </Typography>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Test Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Test Price
                    </th>

                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Edit Test Price
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Delete Test
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alltests.map((tests: Tests) => (
                    <tr key={tests.testid}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Typography variant="subtitle1">
                          {tests.testname}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Typography variant="body2" color="textSecondary">
                          {tests.price}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Link
                          to={`/hospitalHome/EditTest/${tests.testid}`}
                        >
                          <Button variant="contained" color="primary">
                            Edit Price
                          </Button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => confirm('Are you sure?') && deleteTest(tests.testid)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PatientTests;
