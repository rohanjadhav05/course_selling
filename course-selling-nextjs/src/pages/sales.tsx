import { getCourseSales } from '@/service/AdminService';
import { Sales } from '@/service/HomeService';
import { drawerState } from '@/store/atoms/course';
import { Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

const sales = () => {
  
    const [sales, setSales] = useState([]);
    const router = useRouter();
    const drawerValue = useRecoilValue(drawerState);
    
    useEffect(() => {
        getSales();
    },[]);

    function getSales(){
        getCourseSales().then(response => {
                const result = response.data;
                if(result.status == 'success'){
                    setSales(result.data);
                }
                else{
                    toast.error("Failed");
                }
            }).catch(err => {
                console.error(err);
            })
    }

    function calculate(){
        var total : number = 0;
        sales.map((c : Sales) => {
            total += c.totalAmount;
        })
        return total;
    }

  return (
    <div id = "sales" style={{ paddingTop:100, marginLeft: drawerValue ? 250 : 0}}>
        <div>
             <h2 style={{textAlign:'center'}}>Admin Portal - View Sales</h2>
        <TableContainer component={Paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" style={{padding:30}}>
            <TableHead>
                <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold', padding:'8px' }}>Name</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold', padding:'8px' }}>No Of Students</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold', padding:'8px' }}>Amount Per Course&nbsp;</TableCell>
                </TableRow>
                <TableRow>

                </TableRow>
            </TableHead>
            <TableBody>
                {sales.map((c : Sales) => (
                <TableRow
                    key={c.courseName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center" style={{ padding:'8px' }}>{c.courseName}</TableCell>
                    <TableCell align="center" style={{ padding:'8px' }}>{c.noOfStudents}</TableCell>
                    <TableCell align="center" style={{ padding:'8px' }}>{c.totalAmount} INR</TableCell>
                    </TableRow>
                    
                ))
                }
            </TableBody>
        </Table>
      </TableContainer>
        </div>
        <Card variant="outlined" style={{ maxWidth: 300, margin: 'auto', marginTop: 20 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                Total Amount Generated
                </Typography>
                <Typography variant="h4" style={{ marginTop: 10 }}>
                Rs {calculate()}
                </Typography>
            </CardContent>
        </Card>
        <br />
        <br/>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 40 }}>
            <Button  variant="outlined"
            color="inherit"
            onClick={() => {
                router.back();
            }}>Back</Button>
        </div>
    </div>
  )
}

export default sales