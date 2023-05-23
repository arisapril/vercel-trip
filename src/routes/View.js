import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function View() {
    const [data, setData] = useState([]);
    const [re, setRe] = useState(true);
    const [isEdit, setIsEdit] = useState({});
    const [name, setName] = useState("");
    const [trip, setTrip] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        view();
    }, [re]);
    
    async function view() {
        try {
            const response = await axios.get('https://weak-ruby-skunk-gown.cyclic.app/api/view');
            setData(response.data);
            let obj = {};
            response.data.map((r,index)=>{
              let id = r.id
              obj[id] = false
            })
            setIsEdit(obj);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id) => {
      setIsEdit(prev=>{
        prev[id] = !prev[id];
        return {...prev};
      })
    }

    async function handleSubmit (id){
        let response = await axios.put("https://weak-ruby-skunk-gown.cyclic.app/api/update",{trips:trip,amount:amount,names:name,idticket:id});
        alert("แก้ไขสำเร็จ");
        console.log(response);
        setRe(!re);
    }

    async function del(id) {
        try {
            const response = await axios.delete('https://weak-ruby-skunk-gown.cyclic.app/api/delete/'+id);
            alert('ลบข้อมูลสำเร็จ');
            setRe(!re);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div style={{display: 'flex', height: '50px', fontSize: '20px', backgroundColor: '#ffc77a', justifyContent: 'center', alignItems: 'center'}}>
                <label>ตารางการจองทริป</label>
            </div>
            <table style={{width: '100%', textAlign: 'center'}}>
                <tr>
                    <th>ลำดับที่</th>
                    <th>ชื่อทริป</th>
                    <th>จำนวนทริป</th>
                    <th>ชื่อคนจอง</th>
                    <th>เครื่องมือจัดการ</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>
                          {
                            isEdit[item.idticket]
                            ? 
                              <input
                                type="text"
                                style={{backgroundColor:"#F8E8EE"}}
                                onChange={(e) => setTrip(e.target.value)}
                              />
                            : item.trips
                          }
                        </td>
                        <td>
                          {
                            isEdit[item.idticket]
                            ? 
                              <input
                                type="text"
                                style={{backgroundColor:"#F8E8EE"}}
                                onChange={(e) => setAmount(e.target.value)}
                              />
                            : item.amount
                          }
                        </td>
                        <td>
                          {
                            isEdit[item.idticket]
                            ? 
                              <input
                                type="text"
                                style={{backgroundColor:"#F8E8EE"}}
                                onChange={(e) => setName(e.target.value)}
                              />
                            : item.names
                          }
                        </td>
                        <td>
                            {
                              isEdit[item.idticket]
                              ? 
                                <button className="btn btn-success " style={{marginRight:"10px"}} onClick={()=>{handleSubmit(item.idticket);}}>
                                  Submit
                                </button>
                              : null
                            }
                            <button onClick={()=>{handleEdit(item.idticket)}} type="button" style={{backgroundColor: "yellow"}}>แก้ไข</button>
                            <button onClick={()=>{del(item.idticket)}} type="button" style={{backgroundColor: "red"}}>ลบ</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}