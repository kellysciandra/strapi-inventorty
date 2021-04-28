import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ItemsContainer, ItemsHeader} from './index.styles'
import moment from 'moment'
import { Button, Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckSquare, faEdit } from '@fortawesome/free-solid-svg-icons'

const PastOrders = () => {

    const [orders, setOrders] = useState();
    const [todaysOrder, setTodaysOrder] = useState();
    const today = new Date();
    const todaysDate = () => convertDate(today)

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:1337/orders"
        })
        .then((response) => {
            setOrders(response.data)
        })
    }, []);

    const convertToDate = (stringFromData, short) => {
        const splitTime = stringFromData.split("T");
        const dateArray = splitTime[0].split("-");
        const timeArray = splitTime[1].split(':');
    
        const year = dateArray[0];
        const month = parseInt(dateArray[1]);
        const day = dateArray[2];
    
        const hour = timeArray[0];
        const minute = timeArray[1];
        const second = timeArray[2].split("Z")[0];
    
        if (short) {
            const finalMonth = month < 10 ? `0${month}` : month;
            const dateString = finalMonth + "/" + day + "/" + year;
            return dateString;
        } else {
            const dateObj = new Date(Date.UTC(year, month, day, hour, minute, second, 0));
            return dateObj;
        }
    };

    const convertDate = (date) => {
        var momentDate = moment(date).format('L');
        return momentDate;
    };

    return <>
    <ItemsContainer>
        <ItemsHeader>Orders - {todaysDate()}</ItemsHeader>
            {
                orders ? orders.map((x) => {
                    const lastNightsOrder = convertToDate(x.date, true)
                    const todaysDate = convertDate(today)
                    
                    if (lastNightsOrder === todaysDate) {
                        return <>
                        <Card.Group>
                            <Card style={{alignItems: 'center'}}>
                                <Card.Content extra description={`${x.name} - ${x.qty}`}/>
                                <Card.Content extra>
                                        <Button size="tiny" color="red"><FontAwesomeIcon  icon={faTrash}/></Button> 
                                        <Button size="tiny" color="green"><FontAwesomeIcon icon={faCheckSquare}/></Button>
                                        <Button size="tiny" color="blue"><FontAwesomeIcon icon={faEdit}/></Button>  
                                </Card.Content>
                            </Card>
                        </Card.Group>         
                        </>
                    }
                }): null
            }

          
     
            </ItemsContainer>
    </>


};

export default PastOrders;